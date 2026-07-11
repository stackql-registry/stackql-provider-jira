#!/usr/bin/env node

// Builds the endpoint inventory (provider-dev/config/endpoint_inventory.csv)
// across both cleaned Jira specs: one row per operation with the response
// envelope style, pagination scheme, deprecation/experimental flags, proposed
// service (from provider-dev/config/service_names.json), a draft resource and
// StackQL verb, and a skip reason where the operation is not mapped.
//
// The envelope and pagination classifications drive stackql_object_key and
// pagination config decisions downstream; the proposed resource/verb columns
// are groundwork drafts - map_operations.mjs produces the authoritative
// mapping. Fails without writing if any tag lacks a service mapping.
//
// Skip reasons:
//   deprecated_legacy_search - the offset-based /rest/api/3/search issue
//     search (GET and POST), deprecated by Atlassian; the cursor-based
//     /rest/api/3/search/jql endpoints are the mapped replacement
//   deprecated_superseded - deprecated /rest/agile/1.0 issue-read endpoints
//     with an identical current replacement under /rest/software/1.0
//   multipart_upload - requires multipart/form-data with no JSON request
//     alternative (attachment upload); out of scope for v1
//   app_context_api - operations callable only by Connect/Forge apps
//     ("(apps)" tags), not with site-level basic auth
//
// Usage: npm run build-inventory

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const cleanedDir = path.join(repoRoot, 'provider-dev', 'downloaded', 'cleaned');
const serviceNamesPath = path.join(repoRoot, 'provider-dev', 'config', 'service_names.json');
const outPath = path.join(repoRoot, 'provider-dev', 'config', 'endpoint_inventory.csv');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];
const PAGINATION_MARKERS = ['startAt', 'maxResults', 'total', 'isLast', 'nextPage', 'nextPageToken', 'self', 'first', 'last', 'size'];

// POST paths whose last segment is a read (query) rather than a mutation
const POST_READ_SEGMENTS = new Set(['search', 'jql', 'list', 'map', 'match', 'parse', 'picker', 'query', 'id']);
// POST/PUT paths whose last segment is an action rather than entity CRUD
const ACTION_SEGMENTS = new Set([
  'archive', 'unarchive', 'restore', 'trash', 'move', 'rank', 'assignee', 'notify',
  'transitions', 'cancel', 'validate', 'evaluate', 'eval', 'sanitize', 'sanitise',
  'copy', 'swap', 'close', 'start', 'complete', 'duplicate', 'clone', 'default',
  'reorder', 'migrate', 'replace', 'export', 'purge', 'delete', 'changelog', 'expression'
]);

const serviceNames = JSON.parse(fs.readFileSync(serviceNamesPath, 'utf8'));

// ---------------------------------------------------------------------------
// Schema helpers
// ---------------------------------------------------------------------------

function makeResolver(spec) {
  return function resolve(schema, depth = 0) {
    if (!schema || depth > 10) return schema;
    if (schema.$ref) {
      const parts = schema.$ref.replace(/^#\//, '').split('/');
      let node = spec;
      for (const p of parts) node = node?.[p];
      return resolve(node, depth + 1);
    }
    return schema;
  };
}

function success2xx(op) {
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c)).sort();
  for (const code of codes) {
    const content = op.responses[code].content;
    const json = content?.['application/json'];
    if (json?.schema) return { code, schema: json.schema };
  }
  return { code: codes[0] || null, schema: null };
}

function classifyEnvelope(op, resolve) {
  const { schema } = success2xx(op);
  if (!schema) return { envelope: 'none', key: '' };
  const s = resolve(schema);
  if (!s) return { envelope: 'none', key: '' };
  if (s.type === 'array' || (s.items && !s.properties)) return { envelope: 'bare-array', key: '' };
  const props = s.properties || {};
  const arrayProps = Object.entries(props)
    .filter(([, v]) => { const r = resolve(v); return r && (r.type === 'array' || (r.items && !r.properties)); })
    .map(([k]) => k);
  if (arrayProps.includes('issues')) return { envelope: 'issues-wrapper', key: '$.issues' };
  if (arrayProps.includes('values')) return { envelope: 'values-wrapper', key: '$.values' };
  const hasPageMarkers = Object.keys(props).some((k) => ['startAt', 'maxResults', 'total', 'isLast', 'nextPage'].includes(k));
  if (hasPageMarkers && arrayProps.length > 0) {
    const key = arrayProps.find((k) => !PAGINATION_MARKERS.includes(k));
    if (key) return { envelope: 'keyed-object', key: `$.${key}` };
  }
  // collection wrapped under a single key with no pagination markers
  if (arrayProps.length === 1 && Object.keys(props).length === 1) {
    return { envelope: 'keyed-object', key: `$.${arrayProps[0]}` };
  }
  return { envelope: 'single', key: '' };
}

function classifyPagination(op, pathItem, resolve) {
  const params = [...(pathItem.parameters || []), ...(op.parameters || [])]
    .map((p) => resolve(p))
    .filter((p) => p && p.in === 'query')
    .map((p) => p.name);
  const { schema } = success2xx(op);
  const props = schema ? (resolve(schema)?.properties || {}) : {};
  if (params.includes('nextPageToken') || 'nextPageToken' in props) return 'nextPageToken';
  if ('isLast' in props || 'nextPage' in props) return 'isLast-hybrid';
  if (params.includes('startAt') && params.includes('maxResults')) return 'offset';
  if (params.includes('maxResults') && ('total' in props || 'startAt' in props)) return 'offset';
  return 'none';
}

// ---------------------------------------------------------------------------
// Draft resource / verb proposals (authoritative mapping is map_operations.mjs)
// ---------------------------------------------------------------------------

function camelToSnake(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-. ]/g, '_').toLowerCase();
}

function pathSegments(pathKey) {
  const stripped = pathKey
    .replace(/^\/rest\/api\/3\//, '')
    .replace(/^\/rest\/agile\/1\.0\//, '')
    .replace(/^\/rest\/software\/1\.0\//, '');
  return stripped.split('/').filter(Boolean);
}

function proposeResource(pathKey) {
  const segs = pathSegments(pathKey).filter((s) => !s.startsWith('{'));
  return segs.map(camelToSnake).join('_') || '(root)';
}

function proposeVerb(verb, pathKey, op) {
  const segs = pathSegments(pathKey);
  const last = segs[segs.length - 1] || '';
  const lastStatic = [...segs].reverse().find((s) => !s.startsWith('{')) || '';
  if (verb === 'get') return 'select';
  if (verb === 'delete') return 'delete';
  if (verb === 'put' || verb === 'patch') {
    return ACTION_SEGMENTS.has(lastStatic) && !last.startsWith('{') ? 'exec' : 'update';
  }
  // post
  if (POST_READ_SEGMENTS.has(lastStatic)) return 'select';
  if (ACTION_SEGMENTS.has(lastStatic)) return 'exec';
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c));
  if (codes.length > 0 && codes.every((c) => c === '204')) return 'exec';
  return 'insert';
}

function skipReason(specName, verb, pathKey, op) {
  const tag = (op.tags || [])[0] || '';
  if (specName === 'jira-platform-v3' && pathKey === '/rest/api/3/search') return 'deprecated_legacy_search';
  if (specName === 'jira-software-agile' && op.deprecated && pathKey.startsWith('/rest/agile/1.0/')) {
    return 'deprecated_superseded';
  }
  const mediaTypes = Object.keys(op.requestBody?.content || {});
  if (mediaTypes.length > 0 && mediaTypes.every((m) => m.includes('multipart') || m.includes('octet-stream'))) {
    return 'multipart_upload';
  }
  if (/\(apps\)$/.test(tag)) return 'app_context_api';
  return '';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const rows = [];
const errors = [];
const stats = {
  bySpec: {}, byEnvelope: {}, byPagination: {}, byDisposition: {}, byService: {}
};
const bump = (obj, key) => { obj[key] = (obj[key] || 0) + 1; };

const specFiles = fs.readdirSync(cleanedDir).filter((f) => f.endsWith('.json')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no cleaned specs in ${cleanedDir} - run npm run clean-specs first`);
  process.exit(1);
}

for (const specFile of specFiles) {
  const specName = specFile.replace(/\.json$/, '');
  const spec = JSON.parse(fs.readFileSync(path.join(cleanedDir, specFile), 'utf8'));
  const resolve = makeResolver(spec);
  const tagMap = serviceNames[specName];
  if (!tagMap) {
    errors.push(`no service_names.json entry for spec ${specName}`);
    continue;
  }

  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const tag = (op.tags || [])[0] || '';
      const service = tagMap[tag] || tagMap['*'];
      if (!service) {
        errors.push(`unmapped tag "${tag}" (${verb} ${pathKey})`);
        continue;
      }
      const { envelope, key } = classifyEnvelope(op, resolve);
      const pagination = classifyPagination(op, pathItem, resolve);
      const skip = skipReason(specName, verb, pathKey, op);
      const pathParams = (pathKey.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1)).join(';');

      rows.push({
        spec: specName,
        tags: (op.tags || []).join(';'),
        method: verb,
        path: pathKey,
        operation_id: op.operationId,
        path_params: pathParams,
        envelope,
        envelope_key: key,
        pagination,
        deprecated: op.deprecated ? 'y' : 'n',
        experimental: op['x-experimental'] === true ? 'y' : 'n',
        proposed_service: service,
        proposed_resource: proposeResource(pathKey),
        proposed_verb: skip ? '' : proposeVerb(verb, pathKey, op),
        skip_reason: skip
      });

      bump(stats.bySpec, specName);
      bump(stats.byEnvelope, envelope);
      bump(stats.byPagination, pagination);
      bump(stats.byDisposition, skip ? `skipped: ${skip}` : 'mapped');
      if (!skip) bump(stats.byService, service);
    }
  }
}

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const columns = Object.keys(rows[0]);
const csvField = (v) => (/[",\n\r]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
const csv = [columns.join(',')]
  .concat(rows.map((r) => columns.map((c) => csvField(r[c] ?? '')).join(',')))
  .join('\n') + '\n';
fs.writeFileSync(outPath, csv);

console.log(`Endpoint inventory written to ${outPath} (${rows.length} operations)\n`);
const printStats = (title, obj) => {
  console.log(title);
  for (const [k, v] of Object.entries(obj).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
};
printStats('By spec:', stats.bySpec);
printStats('\nBy envelope style:', stats.byEnvelope);
printStats('\nBy pagination scheme:', stats.byPagination);
printStats('\nBy disposition:', stats.byDisposition);
printStats('\nMapped operations by proposed service:', stats.byService);
