#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the split
// service specs in provider-dev/source. Deterministic and re-runnable on
// spec refreshes; review the CSV diff after running. Manual mapping decisions
// are applied as rules here, never as hand-edits to the CSV.
//
// Mapping conventions (see CLAUDE.md):
//   GET collection/search    -> SELECT  <resource>.list / <resource>.search
//   GET single               -> SELECT  <resource>.get
//   POST create              -> INSERT  <resource>.create
//   PUT/PATCH edit           -> UPDATE  <resource>.update (Jira PUT carries
//                                partial-update semantics on most resources)
//   DELETE                   -> DELETE  <resource>.delete
//   POST/PUT actions, bulk   -> EXEC    <resource>.<snake(operationId)>
//   POST reads (body params) -> EXEC    (StackQL cannot route SELECT WHERE
//                                params into request bodies - any-sdk gap)
//
// Resource names are the full static path chain, snake_cased with the last
// token pluralized (issue_comments, project_roles, board_sprints) - stable
// across spec refreshes and collision-free by construction. RESOURCE_RULES
// applies explicit overrides where the mechanical name is wrong.
//
// Validates before writing: every CSV row mapped or skipped with a reason,
// (resource, method) unique per service, and unique required-path-param
// signatures per (resource, sqlVerb). Fails without writing on violations.
//
// Usage: npm run map-operations [-- --out other.csv]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import pluralize from 'pluralize';
import {
  HTTP_VERBS, camelToSnake, stripPathPrefix, pathParams, makeResolver,
  classifyEnvelope, skipReason
} from './lib/spec_helpers.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const sourceDir = path.join(repoRoot, 'provider-dev', 'source');
const csvPath = path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv');

// Trailing static segments that name an action on the parent resource
// (POST/PUT/DELETE become EXEC; the segment is removed from the resource name)
const ACTION_SEGMENTS = new Set([
  'archive', 'unarchive', 'restore', 'trash', 'move', 'rank', 'assignee',
  'notify', 'transitions', 'cancel', 'validate', 'swap', 'close', 'start',
  'complete', 'duplicate', 'copy', 'default', 'reorder', 'migrate', 'replace',
  'export', 'purge', 'delete', 'expression', 'eval', 'evaluate', 'sanitize',
  'sanitise'
]);

// Explicit resource-name overrides, matched on the prefix-stripped path with
// params normalized to {}. First match wins; add rules here as services come
// online - never edit the CSV.
const RESOURCE_RULES = [
  // the cursor-based issue search is the primary issues.search; keep it on
  // the issues resource rather than a "search_jqls" resource
  { re: /^search\/jql$/, resource: 'issues' },
  { re: /^search\/approximate-count$/, resource: 'issues' },
  { re: /^expression\//, resource: 'expressions' },
  // issue bulk operation reads are distinct selectable resources; the bulk
  // mutations are exec methods on the issues resource
  { verb: 'get', re: /^bulk\/issues\/fields$/, resource: 'bulk_editable_fields' },
  { verb: 'get', re: /^bulk\/issues\/transition$/, resource: 'bulk_available_transitions' },
  { re: /^bulk\/issues\//, resource: 'issues' },
  { re: /^bulk\/queue\/\{\}$/, resource: 'bulk_operation_progress' },
  // issue bulk create/fetch and archive export are exec methods on issues
  { re: /^issue\/bulk(fetch)?$/, resource: 'issues' },
  { re: /^issues\/archive\/export$/, resource: 'issues' },
  // /issue/{key}/changelog[/list] and the cross-issue bulk fetch
  { re: /^issue\/\{\}\/changelog/, resource: 'issue_changelogs' },
  { re: /^changelog\/bulkfetch$/, resource: 'issue_changelogs' },
  // cross-issue reads by id list live on their entity resources
  { re: /^comment\/list$/, resource: 'issue_comments' },
  { re: /^worklog\/list$/, resource: 'issue_worklogs' },
  { re: /^worklog\/deleted$/, resource: 'worklogs_deleted' },
  { re: /^worklog\/updated$/, resource: 'worklogs_updated' },
  { re: /^issue\/properties(\/|$)/, resource: 'issue_properties' },
  // createmeta: issue types for a project, then fields per issue type
  { re: /^issue\/createmeta\/\{\}\/issuetypes\/\{\}$/, resource: 'issue_createmeta_fields' },
  // the paginated project search is the primary projects read
  { re: /^project\/search$/, resource: 'projects' },
  // GET /board/filter/{filterId} lists the boards containing a filter
  { verb: 'get', re: /^board\/filter\/\{\}$/, resource: 'boards' }
];

// Method-name overrides for cases the generic rules cannot express, matched
// on (verb, stripped path). First match wins.
// method: null means snake_case(operationId)
const METHOD_RULES = [
  { verb: 'get', re: /^search\/jql$/, method: 'search', sqlVerb: 'select', objectKey: '$.issues' },
  { verb: 'post', re: /^search\/jql$/, method: 'search_post', sqlVerb: 'exec' },
  { verb: 'post', re: /^search\/approximate-count$/, method: 'count_approximate', sqlVerb: 'exec' },
  // /issue/properties/* are asynchronous bulk property mutations across
  // issues, not entity CRUD (the per-issue CRUD is /issue/{key}/properties)
  { verb: 'put', re: /^issue\/properties(\/|$)/, method: null, sqlVerb: 'exec' },
  { verb: 'delete', re: /^issue\/properties\/\{\}$/, method: null, sqlVerb: 'exec' },
  { verb: 'post', re: /^issue\/properties(\/|$)/, method: null, sqlVerb: 'exec' },
  // boards-for-filter is a second paginated list on boards; opId method name
  // keeps it distinct from boards.list
  { verb: 'get', re: /^board\/filter\/\{\}$/, method: null, sqlVerb: 'select', objectKey: '$.values' }
];

function normalizePath(pathKey) {
  return stripPathPrefix(pathKey).replace(/\{[^}]+\}/g, '{}');
}

// ---------------------------------------------------------------------------
// Index every operation in the split service specs
// ---------------------------------------------------------------------------

const ops = new Map(); // `${filename}::${path}::${verb}` -> { op, resolve }
const specFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.yaml')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no service specs in ${sourceDir} - run npm run split first`);
  process.exit(1);
}
for (const filename of specFiles) {
  const spec = yaml.load(fs.readFileSync(path.join(sourceDir, filename), 'utf8'));
  const resolve = makeResolver(spec);
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      if (!pathItem[verb]) continue;
      ops.set(`${filename}::${pathKey}::${verb}`, { op: pathItem[verb], pathItem, resolve });
    }
  }
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

function deriveResource(pathKey, verb) {
  const norm = normalizePath(pathKey);
  for (const rule of RESOURCE_RULES) {
    if ((!rule.verb || rule.verb === verb) && rule.re.test(norm)) {
      return { resource: rule.resource, hint: trailingActionHint(pathKey, verb) };
    }
  }
  const segs = stripPathPrefix(pathKey).split('/').filter(Boolean);
  const lastSeg = segs[segs.length - 1] || '';
  let staticSegs = segs.filter((s) => !s.startsWith('{')).map(camelToSnake);
  let hint = null;
  const lastStatic = staticSegs[staticSegs.length - 1];
  // action segments name a method, not a resource, for mutating verbs
  if (verb !== 'get' && !lastSeg.startsWith('{') && ACTION_SEGMENTS.has(lastStatic) && staticSegs.length > 1) {
    hint = lastStatic;
    staticSegs = staticSegs.slice(0, -1);
  }
  if (staticSegs.length === 0) return { resource: null, hint };
  const last = staticSegs[staticSegs.length - 1];
  const resource = [...staticSegs.slice(0, -1), pluralize(last)].join('_');
  return { resource, hint };
}

function trailingActionHint(pathKey, verb) {
  if (verb === 'get') return null;
  const segs = stripPathPrefix(pathKey).split('/').filter(Boolean);
  const lastSeg = segs[segs.length - 1] || '';
  if (lastSeg.startsWith('{')) return null;
  const lastStatic = camelToSnake(lastSeg);
  return ACTION_SEGMENTS.has(lastStatic) ? lastStatic : null;
}

function mapOperation(filename, pathKey, verb) {
  const entry = ops.get(`${filename}::${pathKey}::${verb}`);
  if (!entry) return { error: `operation not found in ${sourceDir}` };
  const { op, resolve } = entry;

  const skip = skipReason(pathKey, op);
  if (skip) return { resource: 'skip_this_resource', method: '', sqlVerb: '', objectKey: '', skip };

  const norm = normalizePath(pathKey);
  const methodRule = METHOD_RULES.find((r) => r.verb === verb && r.re.test(norm));
  const { resource, hint } = deriveResource(pathKey, verb);
  if (!resource) return { error: `cannot derive a resource name for ${verb} ${pathKey} - add a RESOURCE_RULE` };

  const opId = camelToSnake(op.operationId);
  if (methodRule) {
    return { resource, method: methodRule.method || opId, sqlVerb: methodRule.sqlVerb, objectKey: methodRule.objectKey || '' };
  }

  const { envelope, key } = classifyEnvelope(op, resolve);
  const lastSegIsParam = /\}$/.test(pathKey);

  if (verb === 'get') {
    const isCollection = ['issues-wrapper', 'values-wrapper', 'keyed-object', 'bare-array'].includes(envelope);
    if (isCollection) {
      const isSearch = /(^|\/)search$/.test(normalizePath(pathKey));
      return { resource, method: isSearch ? 'search' : 'list', sqlVerb: 'select', objectKey: key };
    }
    if (lastSegIsParam) return { resource, method: 'get', sqlVerb: 'select', objectKey: '' };
    // static-ending single-object read (config/meta reads, keyed maps)
    return { resource, method: opId, sqlVerb: 'select', objectKey: '' };
  }

  if (verb === 'delete') {
    if (lastSegIsParam) return { resource, method: 'delete', sqlVerb: 'delete', objectKey: '' };
    // static-ending DELETE is an action (remove vote/watcher, bulk delete)
    return { resource, method: opId, sqlVerb: 'exec', objectKey: '' };
  }

  if (verb === 'put' || verb === 'patch') {
    if (hint) return { resource, method: opId, sqlVerb: 'exec', objectKey: '' };
    return { resource, method: 'update', sqlVerb: 'update', objectKey: '' };
  }

  // post
  if (hint) return { resource, method: opId, sqlVerb: 'exec', objectKey: '' };
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c));
  const looksLikeCreate = !lastSegIsParam && codes.some((c) => c === '201' || c === '200');
  const isBodyRead = ['issues-wrapper', 'values-wrapper', 'keyed-object', 'bare-array'].includes(envelope)
    || /^(search|match|parse|picker|list|map|query)/.test(normalizePath(pathKey).split('/').pop() || '');
  if (isBodyRead) return { resource, method: opId, sqlVerb: 'exec', objectKey: '' };
  if (looksLikeCreate && /create|add/i.test(op.operationId)) {
    return { resource, method: 'create', sqlVerb: 'insert', objectKey: '' };
  }
  return { resource, method: opId, sqlVerb: 'exec', objectKey: '' };
}

// ---------------------------------------------------------------------------
// CSV read/transform/write (RFC 4180, preserves column order)
// ---------------------------------------------------------------------------

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else { field += c; }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field); field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
    } else { field += c; }
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

function csvField(v) {
  return /[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) {
    console.error(`Missing expected CSV column: ${required}`);
    process.exit(1);
  }
}

const errors = [];
const seenKeys = new Set();
const stats = { select: 0, insert: 0, update: 0, delete: 0, exec: 0, skipped: 0 };
const skipsByReason = {};

for (const row of rows.slice(1)) {
  const filename = row[col.filename], pathKey = row[col.path], verb = row[col.verb];
  seenKeys.add(`${filename}::${pathKey}::${verb}`);
  const m = mapOperation(filename, pathKey, verb);
  if (m.error) {
    errors.push(`${filename} ${verb} ${pathKey}: ${m.error}`);
    continue;
  }
  row[col.stackql_resource_name] = m.resource;
  if (m.resource === 'skip_this_resource') {
    stats.skipped++;
    skipsByReason[m.skip] = (skipsByReason[m.skip] || 0) + 1;
    row[col.stackql_method_name] = '';
    row[col.stackql_verb] = '';
    row[col.stackql_object_key] = '';
    continue;
  }
  row[col.stackql_method_name] = m.method;
  row[col.stackql_verb] = m.sqlVerb;
  row[col.stackql_object_key] = m.objectKey;
  stats[m.sqlVerb]++;
}

// every spec operation must have a CSV row (else generate-provider misses it)
for (const key of ops.keys()) {
  if (!seenKeys.has(key)) errors.push(`in spec but not in CSV: ${key}`);
}

// ---------------------------------------------------------------------------
// Consistency checks
// ---------------------------------------------------------------------------

const methodSeen = new Map();
const sigSeen = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) {
    errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  }
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);

  const sqlVerb = row[col.stackql_verb];
  if (sqlVerb === 'exec') continue;
  // signature = required inputs: path params plus required query params
  const entry = ops.get(`${row[col.filename]}::${row[col.path]}::${row[col.verb]}`);
  const requiredQuery = [...(entry?.pathItem?.parameters || []), ...(entry?.op.parameters || [])]
    .map((p) => entry.resolve(p))
    .filter((p) => p && p.in === 'query' && p.required)
    .map((p) => p.name);
  const sig = [...pathParams(row[col.path]), ...requiredQuery].sort().join(',');
  const sigKey = `${service}.${resource}.${sqlVerb}::${sig}`;
  if (sigSeen.has(sigKey)) {
    errors.push(`signature clash on ${service}.${resource} ${sqlVerb} [${sig}] (${sigSeen.get(sigKey)} and ${row[col.stackql_method_name]})`);
  }
  sigSeen.set(sigKey, row[col.stackql_method_name]);
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const outArgIdx = process.argv.indexOf('--out');
const outPath = outArgIdx !== -1 ? path.resolve(process.argv[outArgIdx + 1]) : csvPath;
const out = rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n';
fs.writeFileSync(outPath, out);

// summary
const resourcesByService = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
}
console.log(`Mapped: select ${stats.select}, insert ${stats.insert}, update ${stats.update}, delete ${stats.delete}, exec ${stats.exec}; skipped ${stats.skipped} (${Object.entries(skipsByReason).map(([k, v]) => `${k}: ${v}`).join(', ')})`);
console.log('Resources per service:');
for (const [service, resources] of [...resourcesByService.entries()].sort()) {
  console.log(`  ${service}: ${resources.size}`);
}
