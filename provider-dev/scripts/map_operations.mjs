#!/usr/bin/env node

// Populates stackql_resource_name, stackql_method_name, stackql_verb and
// stackql_object_key in provider-dev/config/all_services.csv from the split
// service specs in provider-dev/source. Deterministic and re-runnable on
// spec refreshes; review the CSV diff after running - a method moving
// resource or a resource renamed is a breaking change to review, not noise.
// Manual mapping decisions are applied as rules here, never as hand-edits
// to the CSV.
//
// The mechanical derivation is lib/mapping.mjs (path-derived resources,
// action nodes hoisted onto their readable ancestor as EXEC, overloads
// suffixed _by_<param>, signature clashes demoted to EXEC); RESOURCE_RULES
// and METHOD_RULES below are the exceptions, each with its reason.
//
// Validates before writing: every CSV row mapped or skipped with a reason,
// every spec operation present in the CSV, (service, resource, method)
// unique, unique required-parameter signatures per (resource, sqlVerb), every
// rule used. Fails without writing on violations.
//
// Usage: npm run map-operations [-- --report] [-- --notes]
//   --report prints every derived mapping without writing
//   --notes  prints the overload / clash resolutions the derivation made

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { REPO_ROOT, SOURCE_DIR, CONFIG_DIR, HTTP_VERBS, makeServiceResolver, parseCsv, csvField, pathParams } from './lib/spec_helpers.mjs';
import { mapService } from './lib/mapping.mjs';
import { RESOURCE_RULES, METHOD_RULES } from './lib/mapping_rules.mjs';

const csvPath = path.join(CONFIG_DIR, 'all_services.csv');
const report = process.argv.includes('--report');
const showNotes = process.argv.includes('--notes');

const specFiles = fs.existsSync(SOURCE_DIR) ? fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.yaml')).sort() : [];
if (specFiles.length === 0) {
  console.error(`Error: no service specs in ${SOURCE_DIR} - run make split first`);
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error(`Error: ${csvPath} not found - run the generate-mappings (analyze) step first (make mappings)`);
  process.exit(1);
}

const resolver = makeServiceResolver();
const errors = [];
const notes = [];
const mapped = new Map(); // `${filename}::${path}::${verb}` -> mapping
const opsInSpec = new Set();
for (const filename of specFiles) {
  const service = filename.replace(/\.yaml$/, '');
  const doc = yaml.load(fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf8'));
  const specKey = doc.info?.['x-stackQL-sourceSpec'];
  if (!specKey) { errors.push(`${filename}: no info.x-stackQL-sourceSpec (re-run make split)`); continue; }
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) if (pathItem[verb]) opsInSpec.add(`${filename}::${pathKey}::${verb}`);
  }
  try {
    const { rows, notes: n } = mapService(doc, service, specKey === 'authored' ? null : specKey, resolver, { resourceRules: RESOURCE_RULES, methodRules: METHOD_RULES });
    for (const [k, v] of rows) mapped.set(`${filename}::${k}`, v);
    notes.push(...n);
  } catch (err) {
    errors.push(err.message);
  }
}

// every rule must have matched something (a stale rule hides a rename)
const norm = (p) => p.replace(/\{[^}]+\}/g, '{}');
for (const r of RESOURCE_RULES) {
  const hit = [...mapped.entries()].some(([k]) => { const [f, p] = k.split('::'); return (!r.service || `${r.service}.yaml` === f) && r.re.test(norm(p).replace(/(\/\{\})+$/, '')); });
  if (!hit) errors.push(`RESOURCE_RULES entry ${r.re} (${r.resource}) matched no operation`);
}
for (const r of METHOD_RULES) {
  const hit = [...mapped.keys()].some((k) => { const [f, p, v] = k.split('::'); return v === r.verb && (!r.service || `${r.service}.yaml` === f) && r.re.test(norm(p)); });
  if (!hit) errors.push(`METHOD_RULES entry ${r.verb} ${r.re} matched no operation`);
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) { console.error(`Missing expected CSV column: ${required}`); process.exit(1); }
}

const seenKeys = new Set();
const stats = { select: 0, insert: 0, update: 0, delete: 0, exec: 0, skipped: 0 };
const skipsByReason = {};
for (const row of rows.slice(1)) {
  const key = `${row[col.filename]}::${row[col.path]}::${row[col.verb]}`;
  seenKeys.add(key);
  const m = mapped.get(key);
  if (!m) { errors.push(`${key}: not found in ${SOURCE_DIR}`); continue; }
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
  row[col.stackql_object_key] = m.objectKey || '';
  stats[m.sqlVerb]++;
}
for (const key of opsInSpec) if (!seenKeys.has(key)) errors.push(`in spec but not in CSV: ${key}`);

// (service, resource, method) unique; names are SQL identifiers
const methodSeen = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  for (const ident of [resource, row[col.stackql_method_name]]) {
    if (!/^[a-z][a-z0-9_]*$/.test(ident)) errors.push(`${service}: '${ident}' is not a lower snake_case identifier (${row[col.path]} ${row[col.verb]})`);
  }
  const methodKey = `${service}.${resource}.${row[col.stackql_method_name]}`;
  if (methodSeen.has(methodKey)) errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${row[col.path]}:${row[col.verb]})`);
  methodSeen.set(methodKey, `${row[col.path]}:${row[col.verb]}`);
}

if (report) {
  console.log('service,resource,method,verb,objectKey,httpVerb,path');
  for (const row of rows.slice(1)) {
    console.log([row[col.filename].replace(/\.yaml$/, ''), row[col.stackql_resource_name], row[col.stackql_method_name], row[col.stackql_verb], row[col.stackql_object_key], row[col.verb], row[col.path]].join(','));
  }
}
if (showNotes || report) for (const n of notes) console.log(`note: ${n}`);
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
if (report) { console.log('\n(report only - nothing written)'); process.exit(0); }

fs.writeFileSync(csvPath, rows.map((r) => r.map(csvField).join(',')).join('\n') + '\n');

const resourcesByService = new Map();
for (const row of rows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
}
const totalResources = [...resourcesByService.values()].reduce((n, s) => n + s.size, 0);
console.log(`Mapped: select ${stats.select}, insert ${stats.insert}, update ${stats.update}, delete ${stats.delete}, exec ${stats.exec}; skipped ${stats.skipped}${stats.skipped ? ` (${Object.entries(skipsByReason).sort().map(([k, v]) => `${k}: ${v}`).join(', ')})` : ''}`);
console.log(`${resourcesByService.size} services, ${totalResources} resources; ${notes.length} overload / clash resolutions (--notes lists them)`);
void pathParams;
void REPO_ROOT;
