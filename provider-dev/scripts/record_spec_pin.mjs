#!/usr/bin/env node

// Fetches the upstream Jira Cloud OpenAPI documents (SPECS in
// lib/spec_helpers.mjs: the platform REST API v3 and the Jira Software
// REST API), applies the deterministic fix classes, validates each with
// @apidevtools/swagger-parser, redacts credential-shaped example values,
// verifies every document against provider-dev/config/spec_pin.json and only
// then writes the snapshots into provider-dev/downloaded/.
//
// All or nothing: a download, fix, validation or pin failure on any document
// writes nothing.
//
// - No pin recorded: record it (first fetch).
// - Pin matches: nothing changes on disk (the pin keeps its fetched date, so
//   an unchanged upstream leaves the working tree clean).
// - Pin mismatch: fail without writing, unless --update (a reviewed refresh;
//   run the skill's spec_diff.mjs on the old and new snapshot and record the
//   summary in NOTES.md).
//
// The pin records the raw upstream sha256 (drift is always compared against
// upstream) plus the sanitized sha256 of the file on disk, the per-class fix
// counts and the redaction counts. A fix class absent from a snapshot counts
// 0; add a class when a refresh introduces a new construct (never hand-edit
// the snapshot).
//
// Usage: node provider-dev/scripts/record_spec_pin.mjs [--update] [--from-dir <dir>]
//   --from-dir reads <dir>/<file> instead of downloading (offline re-pin of a
//   previously downloaded pair, used when reviewing a refresh)

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import SwaggerParser from '@apidevtools/swagger-parser';
import { SPECS, DOWNLOAD_DIR, CONFIG_DIR } from './lib/spec_helpers.mjs';

const args = process.argv.slice(2);
const update = args.includes('--update');
const fromDir = args.includes('--from-dir') ? args[args.indexOf('--from-dir') + 1] : null;
const PIN_FILE = path.join(CONFIG_DIR, 'spec_pin.json');

// ---------------------------------------------------------------------------
// Deterministic fix classes. Each walks the document, rewrites in place and
// returns a count. The generic classes cover the JSON Schema 2020-12 and
// OpenAPI 3.1 leaks that swagger-parser (3.0 validation) and stackql's
// loader reject; both Jira documents are OpenAPI 3.0.1 and count 0 on them
// today. The vendor classes are specific to the Jira documents.
// ---------------------------------------------------------------------------

const SCALAR_PREFERENCE = ['string', 'integer', 'number', 'boolean', 'object', 'array'];

function walk(node, visit) {
  if (Array.isArray(node)) { node.forEach((v) => walk(v, visit)); return; }
  if (!node || typeof node !== 'object') return;
  visit(node);
  for (const v of Object.values(node)) walk(v, visit);
}

// Every JSON content entry of every 2xx response.
function forEachSuccessContent(doc, fn) {
  for (const pathItem of Object.values(doc.paths || {})) {
    for (const verb of ['get', 'post', 'put', 'patch', 'delete']) {
      const op = pathItem[verb];
      if (!op) continue;
      for (const [code, resp] of Object.entries(op.responses || {})) {
        if (!/^2/.test(code)) continue;
        for (const [mediaType, content] of Object.entries(resp.content || {})) {
          if (mediaType.includes('json') && content && typeof content === 'object') fn(content, op);
        }
      }
    }
  }
}

// A JSON Schema for a JSON value (deterministic: properties in the order
// the example states them, array items merged across elements).
function inferSchema(value) {
  if (value === null) return { type: 'string', nullable: true };
  if (Array.isArray(value)) {
    const items = value.map(inferSchema).reduce((acc, s) => (acc ? mergeSchemas(acc, s) : s), null);
    return { type: 'array', items: items || { type: 'object' } };
  }
  switch (typeof value) {
    case 'boolean': return { type: 'boolean' };
    case 'number': return Number.isInteger(value) ? { type: 'integer', format: 'int64' } : { type: 'number' };
    case 'string': return { type: 'string' };
    case 'object': {
      const properties = {};
      for (const [k, v] of Object.entries(value)) properties[k] = inferSchema(v);
      return { type: 'object', properties };
    }
    default: return { type: 'string' };
  }
}

function mergeSchemas(a, b) {
  if (a.type === 'object' && b.type === 'object') {
    const properties = { ...a.properties };
    for (const [k, v] of Object.entries(b.properties || {})) properties[k] = properties[k] ? mergeSchemas(properties[k], v) : v;
    return { type: 'object', properties };
  }
  if (a.type === 'array' && b.type === 'array') return { type: 'array', items: mergeSchemas(a.items, b.items) };
  if (a.nullable && !b.nullable) return b;
  return a;
}

const FIX_CLASSES = [
  { name: 'type_null_to_nullable', apply: (doc) => { let n = 0; walk(doc, (o) => { if (o.type === 'null') { delete o.type; o.nullable = true; n++; } }); return n; } },
  {
    name: 'type_array_lowered',
    apply: (doc) => {
      let n = 0;
      walk(doc, (o) => {
        if (!Array.isArray(o.type)) return;
        const members = o.type.filter((t) => t !== 'null');
        const pick = SCALAR_PREFERENCE.find((t) => members.includes(t));
        if (!pick) throw new Error(`type array ${JSON.stringify(o.type)} has no usable member`);
        if (o.type.includes('null')) o.nullable = true;
        o.type = pick;
        n++;
      });
      return n;
    }
  },
  {
    name: 'numeric_exclusive_bounds',
    apply: (doc) => {
      let n = 0;
      walk(doc, (o) => {
        for (const [excl, bound] of [['exclusiveMinimum', 'minimum'], ['exclusiveMaximum', 'maximum']]) {
          if (typeof o[excl] === 'number') { o[bound] = o[excl]; o[excl] = true; n++; }
        }
      });
      return n;
    }
  },
  { name: 'property_names_removed', apply: (doc) => { let n = 0; walk(doc, (o) => { if ('propertyNames' in o) { delete o.propertyNames; n++; } }); return n; } },
  { name: 'schema_dialect_key_removed', apply: (doc) => { let n = 0; walk(doc, (o) => { if (typeof o.$schema === 'string') { delete o.$schema; n++; } }); return n; } },
  { name: 'const_to_enum', apply: (doc) => { let n = 0; walk(doc, (o) => { if ('const' in o && !('enum' in o)) { o.enum = [o.const]; delete o.const; n++; } }); return n; } },
  {
    // Atlassian serialises the document with the top-level tags in a stable
    // order today; sorting them keeps the sanitized hash independent of it
    // (the OVH build measured an unstable order on its vendor's documents).
    name: 'top_level_tags_sorted',
    apply: (doc) => {
      if (!Array.isArray(doc.tags)) return 0;
      const before = JSON.stringify(doc.tags.map((t) => t.name));
      doc.tags.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      return before === JSON.stringify(doc.tags.map((t) => t.name)) ? 0 : 1;
    }
  },
  {
    // The Jira Software document declares 22 JSON success responses with an
    // `example` (a JSON string) and no `schema`, so every consumer sees an
    // untyped body. The schema is synthesized from the vendor's own example:
    // objects -> properties, arrays -> items merged across elements,
    // integers -> integer, other numbers -> number, null -> nullable string.
    name: 'response_schema_from_example',
    apply: (doc) => {
      let n = 0;
      forEachSuccessContent(doc, (content) => {
        if (content.schema || typeof content.example !== 'string') return;
        let value;
        try { value = JSON.parse(content.example); } catch { return; }
        content.schema = { ...inferSchema(value), description: 'Synthesized from the vendor example (fix class response_schema_from_example).' };
        n++;
      });
      return n;
    }
  },
  {
    // Jira Software's board property reads declare a JSON success response
    // with neither schema nor example. They return the same shapes as every
    // other entity property read in the platform document: the key list
    // ({keys: [{self, key}]}) and one property ({key, value}).
    name: 'property_response_schema_injected',
    apply: (doc) => {
      let n = 0;
      for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
        const op = pathItem.get;
        if (!op) continue;
        for (const [code, resp] of Object.entries(op.responses || {})) {
          if (!/^2/.test(code)) continue;
          const content = resp.content?.['application/json'];
          if (!content || content.schema || content.example !== undefined) continue;
          if (/\/properties$/.test(pathKey)) {
            content.schema = { type: 'object', description: 'The keys of the entity properties (fix class property_response_schema_injected).', properties: { keys: { type: 'array', items: { type: 'object', properties: { self: { type: 'string', description: 'The URL of the property.' }, key: { type: 'string', description: 'The key of the property.' } } } } } };
            n++;
          } else if (/\/properties\/\{propertyKey\}$/.test(pathKey)) {
            content.schema = { type: 'object', description: 'An entity property (fix class property_response_schema_injected).', properties: { key: { type: 'string', description: 'The key of the property.' }, value: { description: 'The value of the property (any JSON).' } } };
            n++;
          }
        }
      }
      return n;
    }
  },
  {
    // GET /rest/api/3/issue/{issueIdOrKey}/remotelink answers an array of
    // remote links, or one link when the globalId query parameter is given;
    // the document says oneOf [array of X, X]. Lowered to the array (the
    // row-bearing form); a single link still projects one row.
    name: 'array_or_item_response_lowered',
    apply: (doc) => {
      let n = 0;
      forEachSuccessContent(doc, (content) => {
        const s = content.schema;
        if (!s || !Array.isArray(s.oneOf) || s.oneOf.length !== 2) return;
        const arr = s.oneOf.find((x) => x.type === 'array' && x.items?.$ref);
        const item = s.oneOf.find((x) => x.$ref);
        if (arr && item && arr.items.$ref === item.$ref) { content.schema = arr; n++; }
      });
      return n;
    }
  },
  {
    // A parameter the vendor documents as required but does not flag: its
    // description ends "Required." (GET /rest/api/3/user and DELETE
    // .../watchers accountId), or its x-changes history records the change
    // to required (GET /rest/api/3/mypermissions permissions, required since
    // 2019-02-01; the API answers 400 without it). Conditional wording
    // ("Required, unless ...") is left alone.
    name: 'documented_required_parameter_flagged',
    apply: (doc) => {
      let n = 0;
      for (const pathItem of Object.values(doc.paths || {})) {
        for (const verb of ['get', 'post', 'put', 'patch', 'delete']) {
          for (const p of pathItem[verb]?.parameters || []) {
            const changedToRequired = (p['x-changes'] || []).some((c) => c.type === 'required');
            if (!p.required && (changedToRequired || /(^|\.\s+)Required\.\s*$/.test((p.description || '').trim()))) { p.required = true; n++; }
          }
        }
      }
      return n;
    }
  },
  {
    // Every operation repeats the vendor's internal data-classification
    // annotation (x-atlassian-data-security-policy); it carries no API
    // semantics and is about a sixth of the platform document.
    name: 'data_security_policy_removed',
    apply: (doc) => {
      let n = 0;
      for (const pathItem of Object.values(doc.paths || {})) {
        for (const op of Object.values(pathItem)) {
          if (op && typeof op === 'object' && 'x-atlassian-data-security-policy' in op) { delete op['x-atlassian-data-security-policy']; n++; }
        }
      }
      return n;
    }
  }
];

// ---------------------------------------------------------------------------
// Deterministic redaction of credential-shaped example values (they trip
// GitHub push protection on every artifact that embeds them).
// ---------------------------------------------------------------------------

const REDACTIONS = [
  { name: 'slack_webhook_url_example', re: /https:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9/]+/g, replacement: 'https://hooks.slack.com/services/EXAMPLE' },
  { name: 'github_token_example', re: /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g, replacement: 'ghp_EXAMPLE' },
  { name: 'aws_access_key_example', re: /\bAKIA[0-9A-Z]{16}\b/g, replacement: 'AKIAEXAMPLEEXAMPLE00' },
  { name: 'bearer_jwt_example', re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g, replacement: 'eyJEXAMPLE.EXAMPLE.EXAMPLE' },
  { name: 'atlassian_api_token_example', re: /\bATATT[A-Za-z0-9_=-]{20,}\b/g, replacement: 'ATATT_EXAMPLE' }
];

const HTTP = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'];
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');

async function download(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`GET ${url} answered ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------------------------------------------------------------------------
// 1-3. Fetch, fix, validate, redact every document (in memory)
// ---------------------------------------------------------------------------

const targets = [];
for (const s of SPECS) {
  let content;
  try {
    content = fromDir ? fs.readFileSync(path.join(fromDir, s.file)) : await download(s.url);
  } catch (err) {
    console.error(`Fetch failed for ${s.key}, nothing written: ${err.message}`);
    process.exit(1);
  }
  let spec;
  try {
    spec = JSON.parse(content.toString('utf8'));
  } catch (err) {
    console.error(`${s.key}: document could not be parsed, nothing written: ${err.message}`);
    process.exit(1);
  }
  const fixes = {};
  try {
    for (const cls of FIX_CLASSES) fixes[cls.name] = cls.apply(spec);
  } catch (err) {
    console.error(`${s.key}: fix class failed, nothing written: ${err.message}`);
    process.exit(1);
  }
  try {
    await SwaggerParser.validate(structuredClone(spec));
  } catch (err) {
    console.error(`${s.key}: validation FAILED, nothing written: ${err.message}`);
    process.exit(1);
  }
  const pathKeys = Object.keys(spec.paths || {});
  let operations = 0;
  for (const p of pathKeys) for (const v of HTTP) if (spec.paths[p][v]) operations++;
  let sanitized = JSON.stringify(spec, null, 2) + '\n';
  const redactions = {};
  for (const r of REDACTIONS) {
    const matches = sanitized.match(r.re);
    if (matches) { redactions[r.name] = matches.length; sanitized = sanitized.replace(r.re, r.replacement); }
  }
  targets.push({
    ...s, content, sanitized, fixes, redactions, operations, paths: pathKeys.length,
    sha256: sha(content), sanitizedSha256: sha(sanitized),
    specVersion: spec.info?.version, openapi: spec.openapi, title: spec.info?.title
  });
  console.log(`${s.key}: ${spec.info?.title} - openapi ${spec.openapi}, version ${spec.info?.version}, ${pathKeys.length} paths, ${operations} operations - validated OK`);
}

// ---------------------------------------------------------------------------
// 4. Pin verification
// ---------------------------------------------------------------------------

let pin = { specs: {} };
const firstPin = !fs.existsSync(PIN_FILE);
if (!firstPin) pin = JSON.parse(fs.readFileSync(PIN_FILE, 'utf8'));
const drift = [];
for (const t of targets) {
  const existing = pin.specs?.[t.key];
  t.status = !existing ? 'pinned' : existing.sha256 === t.sha256 ? 'unchanged' : 'updated';
  if (!firstPin && !existing) drift.push(`${t.key}: not in the pin`);
  if (t.status === 'updated') drift.push(`${t.key}: upstream content changed (pinned ${existing.sha256.slice(0, 12)}..., fetched ${t.sha256.slice(0, 12)}...)`);
}
for (const key of Object.keys(pin.specs || {})) {
  if (!targets.some((t) => t.key === key)) drift.push(`${key}: pinned but no longer in SPECS`);
}
if (drift.length > 0 && !update) {
  console.error(`Spec pin verification FAILED, nothing written (${drift.length} difference(s)):`);
  for (const d of drift) console.error(`  ${d}`);
  console.error('Re-run with --update (make refresh-spec) to accept the refresh, then diff the snapshots and record the summary in NOTES.md.');
  process.exit(1);
}

// a matching pin whose snapshot is present and identical needs no write
const allUnchanged = targets.every((t) => t.status === 'unchanged' && fs.existsSync(path.join(DOWNLOAD_DIR, t.file)) && sha(fs.readFileSync(path.join(DOWNLOAD_DIR, t.file))) === t.sanitizedSha256);
if (allUnchanged && drift.length === 0) {
  console.log(`Pin verified: ${targets.length} documents unchanged upstream (${targets.map((t) => `${t.key} ${t.sha256.slice(0, 12)}...`).join(', ')})`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// 5. Write the snapshots and the pin
// ---------------------------------------------------------------------------

const today = new Date().toISOString().slice(0, 10);
const specs = {};
fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
for (const t of targets) {
  fs.writeFileSync(path.join(DOWNLOAD_DIR, t.file), t.sanitized);
  const existing = pin.specs?.[t.key];
  specs[t.key] = {
    url: t.url,
    filename: t.file,
    title: t.title,
    spec_version: t.specVersion,
    openapi: t.openapi,
    paths: t.paths,
    operations: t.operations,
    sha256: t.sha256,
    sanitized_sha256: t.sanitizedSha256,
    fixes: t.fixes,
    redactions: t.redactions,
    bytes: t.content.length,
    fetched: t.status === 'unchanged' && existing?.fetched ? existing.fetched : today
  };
}
for (const key of Object.keys(pin.specs || {})) {
  if (!specs[key]) {
    const stale = path.join(DOWNLOAD_DIR, pin.specs[key].filename);
    if (fs.existsSync(stale)) fs.rmSync(stale);
  }
}
fs.mkdirSync(path.dirname(PIN_FILE), { recursive: true });
fs.writeFileSync(PIN_FILE, JSON.stringify({ specs }, null, 2) + '\n');
for (const t of targets) {
  const applied = Object.entries(t.fixes).filter(([, n]) => n > 0).map(([k, n]) => `${k}=${n}`).join(', ') || 'none';
  const red = Object.entries(t.redactions).map(([k, n]) => `${k}=${n}`).join(', ') || 'none';
  console.log(`  ${t.file}: ${t.status} (upstream sha256 ${t.sha256.slice(0, 12)}..., ${t.content.length} bytes; fixes: ${applied}; redactions: ${red})`);
}
for (const d of drift) console.log(`  accepted: ${d}`);
console.log(`Snapshots under ${path.relative(process.cwd(), DOWNLOAD_DIR)}, pin recorded in ${path.relative(process.cwd(), PIN_FILE)}`);
