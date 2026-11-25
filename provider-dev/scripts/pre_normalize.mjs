#!/usr/bin/env node

// Provider-specific spec surgery applied to provider-dev/source before the
// generic provider-utils normalize pass. Each pass is numbered, counted,
// idempotent, and validates its own preconditions; the run fails without
// writing on any error.
//
// Typical passes (see the skill's normalize-and-generate.md):
//   - remove a non-JSON request media type declared before application/json
//     (any-sdk binds the body to the first declared type)
//   - remove deprecated query parameters that duplicate body properties
//     (an INSERT column binds to the query parameter first, body arrives empty)
//   - inject a response schema where the vendor declares none so a binding
//     exists (a 201 with no content on a query endpoint)
//   - rewrite a bare-array request body to its single-item object form
//     (paired with a request transform in post_process.mjs)
//   - drop a camelCase duplicate of a snake_case property that would collide
//     under snake_case_aliases
//   - declare an undocumented-but-real query parameter so WHERE pushes it down
//
// The generic OpenAPI 3.1 -> 3.0 lowering (type arrays, numeric exclusive
// bounds, 3.1.2) already ran in record_spec_pin.mjs; a derived-archetype
// build that bypasses the pin can enable LOWER_31_CONSTRUCTS below.
//
// Usage: npm run pre-normalize [-- --dry-run]

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { REPO_ROOT, HTTP_VERBS } from './lib/spec_helpers.mjs';

const sourceDir = path.join(REPO_ROOT, 'provider-dev', 'source');
const dryRun = process.argv.includes('--dry-run');

// ---------------------------------------------------------------------------
// Reusable pass builders. Each returns (doc, filename, errors) => count.
// ---------------------------------------------------------------------------

function forEachOperation(doc, fn) {
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) if (pathItem[verb]) fn(pathItem[verb], pathKey, verb, pathItem);
  }
}

// Keep only application/json on request bodies that also declare another
// media type first.
export function preferJsonRequestBody() {
  return (doc) => {
    let n = 0;
    forEachOperation(doc, (op) => {
      const content = op.requestBody?.content;
      if (!content) return;
      const types = Object.keys(content);
      const json = types.find((t) => t.includes('json'));
      if (json && types[0] !== json) {
        op.requestBody.content = { [json]: content[json] };
        n++;
      }
    });
    return n;
  };
}

// Remove query parameters whose names duplicate a request-body property on
// the same operation (matched by regex on the path when given).
export function dropQueryParamsDuplicatingBody(pathRe = /.*/) {
  return (doc) => {
    let n = 0;
    forEachOperation(doc, (op, pathKey) => {
      if (!pathRe.test(pathKey) || !op.requestBody || !op.parameters) return;
      const json = Object.values(op.requestBody.content || {})[0];
      const props = new Set(Object.keys(json?.schema?.properties || {}));
      const before = op.parameters.length;
      op.parameters = op.parameters.filter((p) => !(p.in === 'query' && props.has(p.name)));
      n += before - op.parameters.length;
    });
    return n;
  };
}

// Inject a response schema on operations matching pathRe/verb that declare a
// 2xx with no content.
export function injectResponseSchema(pathRe, verb, code, schema) {
  return (doc, filename, errors) => {
    let n = 0;
    forEachOperation(doc, (op, pathKey, v) => {
      if (v !== verb || !pathRe.test(pathKey)) return;
      const resp = op.responses?.[code];
      if (!resp) { errors.push(`${filename}: ${verb.toUpperCase()} ${pathKey} has no ${code} response to inject into`); return; }
      if (resp.content) return; // already typed
      resp.content = { 'application/json': { schema: JSON.parse(JSON.stringify(schema)) } };
      n++;
    });
    return n;
  };
}

// Rewrite a bare-array request body to its single-item object form; pair with
// a request transform ('[{{ . }}]') in post_process.mjs.
export function bareArrayBodyToItem(pathRe, verb) {
  return (doc, filename, errors) => {
    let n = 0;
    forEachOperation(doc, (op, pathKey, v) => {
      if (v !== verb || !pathRe.test(pathKey)) return;
      const json = op.requestBody?.content?.['application/json'];
      if (!json?.schema) return;
      if (json.schema.type === 'array' && json.schema.items) { json.schema = json.schema.items; n++; }
      else if (json.schema.type !== 'object' && !json.schema.$ref) errors.push(`${filename}: ${verb.toUpperCase()} ${pathKey} body is neither an array nor an object`);
    });
    return n;
  };
}

// Drop a camelCase property that duplicates a snake_case sibling in every
// schema (they would collide under snake_case_aliases).
export function dropCamelDuplicates() {
  const toSnake = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const walk = (node, visit) => {
    if (Array.isArray(node)) { node.forEach((v) => walk(v, visit)); return; }
    if (!node || typeof node !== 'object') return;
    visit(node);
    for (const v of Object.values(node)) walk(v, visit);
  };
  return (doc) => {
    let n = 0;
    walk(doc, (o) => {
      if (!o.properties || typeof o.properties !== 'object') return;
      for (const k of Object.keys(o.properties)) {
        const snake = toSnake(k);
        if (snake !== k && snake in o.properties) { delete o.properties[k]; n++; }
      }
    });
    return n;
  };
}

// Declare an (undocumented) query parameter on matching operations.
export function declareQueryParam(pathRe, verb, param) {
  return (doc) => {
    let n = 0;
    forEachOperation(doc, (op, pathKey, v) => {
      if (v !== verb || !pathRe.test(pathKey)) return;
      op.parameters = op.parameters || [];
      if (op.parameters.some((p) => p.in === 'query' && p.name === param.name)) return;
      op.parameters.push({ in: 'query', required: false, schema: { type: 'string' }, ...param });
      n++;
    });
    return n;
  };
}

// ---------------------------------------------------------------------------
// The pass list. Every entry: { name, run: (doc, filename, errors) => count }
// ---------------------------------------------------------------------------

// Jira's asynchronous operations (field and priority deletes, bulk issue
// property writes, project deletion, scheme associations, ...) answer only
// 303 See Other with Location: /rest/api/3/task/{taskId}. The engine's HTTP
// client follows a 303 with a GET, so the body the caller receives is the
// task progress (200). Declare that as the 200 response, keeping the 303.
export function followedRedirectAs200() {
  return (doc) => {
    let n = 0;
    forEachOperation(doc, (op) => {
      const codes = Object.keys(op.responses || {});
      if (codes.some((c) => /^2/.test(c)) || !op.responses['303']) return;
      const r303 = op.responses['303'];
      op.responses['200'] = {
        description: 'The 303 See Other redirect to the task (GET /rest/api/3/task/{taskId}) is followed; the body is the task progress.',
        ...(r303.content ? { content: JSON.parse(JSON.stringify(r303.content)) } : {})
      };
      n++;
    });
    return n;
  };
}

// stackql applies a WHERE equality both as the query parameter of the same
// name and as a filter on a column of that name (measured, stackql v1.1.959;
// NOTES.md). Jira's response objects carry an `expand` property listing the
// expansions the object offers - metadata, never data - while 27 reads take
// an `expand` query parameter (WHERE expand = 'description,lead'). With both
// present the rows are filtered against the metadata string and none
// survive. The metadata property is removed from response schemas (it is
// described "Expand options ..." / "The expand options available ...";
// Version describes it as "Use expand to include ..."). Request beans that
// take expand as a body field (bulk fetch, search requests) keep it.
const EXPAND_METADATA = /^(Expand options that include|The expand options available)/;
const EXPAND_METADATA_SCHEMAS = new Set(['Version']);
export function dropExpandMetadata() {
  return (doc) => {
    let n = 0;
    for (const [name, schema] of Object.entries(doc.components?.schemas || {})) {
      const e = schema?.properties?.expand;
      if (!e) continue;
      if (EXPAND_METADATA.test(e.description || '') || EXPAND_METADATA_SCHEMAS.has(name)) { delete schema.properties.expand; n++; }
    }
    return n;
  };
}

// Comment.body and Worklog.comment are Atlassian Document Format documents
// declared with no type at all. stackql sends a typeless body attribute as a
// string, which the API rejects ("Comment body is not valid!", measured
// live). Typed as an object with additionalProperties, the engine sends the
// JSON the statement supplies as an object, and the column reads back as
// JSON (json_extract(body, '$.content[0]...')). The provider does not model
// ADF structure.
const ADF_RE = /Atlassian Document Format/;
export function typeAdfProperties() {
  return (doc) => {
    let n = 0;
    for (const schema of Object.values(doc.components?.schemas || {})) {
      for (const p of Object.values(schema?.properties || {})) {
        if (!p || p.type || p.$ref || p.oneOf || p.anyOf || p.allOf || p.items) continue;
        if (!ADF_RE.test(p.description || '')) continue;
        p.type = 'object';
        p.additionalProperties = true;
        n++;
      }
    }
    return n;
  };
}

// An entity property write (PUT .../{entity}/properties/{propertyKey}: issue,
// comment, worklog, project, user, issue type, dashboard item, board,
// sprint) takes the property's value as the whole request body, declared
// with an empty schema, so no column can carry it. The body is declared as
// {value: <any JSON object>}; post_process (rule 9) attaches the request
// transform that sends .value as the raw body. UPDATE ... SET value = '{...}'.
export const ENTITY_PROPERTY_PUT = /\/\{[^}]+\}\/properties\/\{propertyKey\}$/;
export function entityPropertyValueBody() {
  return (doc, filename, errors) => {
    let n = 0;
    forEachOperation(doc, (op, pathKey, verb) => {
      if (verb !== 'put' || !ENTITY_PROPERTY_PUT.test(pathKey)) return;
      const json = op.requestBody?.content?.['application/json'];
      if (!json) { errors.push(`${filename}: PUT ${pathKey} has no JSON request body`); return; }
      if (json.schema?.properties?.value) return; // already applied
      if (json.schema && Object.keys(json.schema).length > 0) { errors.push(`${filename}: PUT ${pathKey} request body is typed - expected the empty schema`); return; }
      json.schema = { type: 'object', required: ['value'], properties: { value: { type: 'object', additionalProperties: true, description: 'The value of the property: any JSON object. Sent as the request body.' } } };
      delete json.example;
      n++;
    });
    return n;
  };
}

const PASSES = [
  { name: '1. prefer application/json request bodies', run: preferJsonRequestBody() },
  { name: '2. async 303-only operations: the followed redirect is the 200', run: followedRedirectAs200() },
  { name: '3. drop the expand metadata property from response schemas', run: dropExpandMetadata() },
  { name: '4. type the ADF document properties as JSON objects', run: typeAdfProperties() },
  { name: '5. entity property writes: the value as a body column', run: entityPropertyValueBody() }
];

const files = fs.existsSync(sourceDir) ? fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort() : [];
if (files.length === 0) {
  console.error(`Error: no service specs in ${sourceDir} - run make split first`);
  process.exit(1);
}

const pending = [];
const errors = [];
const totals = {};
for (const f of files) {
  const fp = path.join(sourceDir, f);
  const doc = yaml.load(fs.readFileSync(fp, 'utf8'));
  for (const pass of PASSES) {
    const n = pass.run(doc, f, errors) || 0;
    totals[pass.name] = (totals[pass.name] || 0) + n;
  }
  pending.push({ fp, doc });
}
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
if (!dryRun) {
  for (const { fp, doc } of pending) fs.writeFileSync(fp, yaml.dump(doc, { lineWidth: -1, noRefs: true }));
}
console.log(`pre_normalize: ${PASSES.length} pass(es) over ${files.length} service specs${dryRun ? ' (dry run)' : ''}`);
for (const [k, v] of Object.entries(totals)) console.log(`  ${k}: ${v}`);
