#!/usr/bin/env node

// Maintains provider-dev/config/all_services.csv, the provider's durable
// dictionary of operation -> stackql_resource_name, stackql_method_name,
// stackql_verb and stackql_object_key, keyed by filename::operationId. The
// CSV is the source of truth for every operation it maps: a mapped row is
// never rewritten, so a name, once in the dictionary, ships unchanged in
// every later build until someone edits that row.
//
// `make mappings` runs provider-utils `analyze` first, which appends a row
// (with blank stackql_* columns) for each operationId the CSV does not have
// yet. This script then:
//   - keeps every mapped row as it is (a row is mapped when
//     stackql_resource_name is set: skip_this_resource, or a resource with a
//     method and a SQL verb);
//   - names each unmapped row with the deterministic derivation:
//     lib/mapping.mjs (path-derived resources, action nodes hoisted onto
//     their readable ancestor as EXEC, overloads suffixed _by_<param>,
//     signature clashes demoted to EXEC) and the exceptions in
//     lib/mapping_rules.mjs (RESOURCE_RULES, METHOD_RULES, skip codes);
//   - carries the names over when the vendor renamed an operationId but kept
//     its path and verb;
//   - updates path and verb of a mapped row whose operation moved (the
//     generator looks rows up by filename::path::verb);
//   - drops rows whose operation is no longer in provider-dev/source, and the
//     duplicate rows analyze appends for skip_this_resource entries (it treats
//     a row without a method as unmapped), and lists what it dropped.
//
// To rename a resource or method, edit its row in the CSV. To have the rules
// name an operation again, blank its stackql_resource_name.
//
// Validates before writing, whatever named a row (the rules or a hand edit):
// every spec operation in the CSV, names lower snake_case, (service,
// resource, method) unique, required-parameter signatures unique per
// (service, resource, SQL verb), every rule matching some operation. Fails
// without writing on violations. Review the CSV diff after a run: a renamed
// or moved method is a breaking change.
//
// Usage: npm run map-operations [-- --report] [-- --notes]
//   --report prints the mapping (and where it differs from the rules)
//            without writing
//   --notes  prints the overload / clash resolutions the derivation made

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { SOURCE_DIR, CONFIG_DIR, HTTP_VERBS, makeServiceResolver, makeResolver, parseCsv, csvField } from './lib/spec_helpers.mjs';
import { mapService, requiredSignature } from './lib/mapping.mjs';
import { RESOURCE_RULES, METHOD_RULES } from './lib/mapping_rules.mjs';

const SKIP = 'skip_this_resource';
const csvPath = path.join(CONFIG_DIR, 'all_services.csv');
const report = process.argv.includes('--report');
const showNotes = process.argv.includes('--notes');

const specFiles = fs.existsSync(SOURCE_DIR) ? fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith('.yaml')).sort() : [];
if (specFiles.length === 0) {
  console.error(`Error: no service specs in ${SOURCE_DIR} - run make split first`);
  process.exit(1);
}
if (!fs.existsSync(csvPath)) {
  console.error(`Error: ${csvPath} not found - run make mappings (provider-utils analyze creates it on the first build)`);
  process.exit(1);
}

// ---- the spec operations and what the rules would name them ------------------
const resolver = makeServiceResolver();
const errors = [];
const notes = [];
const derived = new Map(); // filename::path::verb -> mapping from the rules
const specOps = new Map(); // filename::operationId -> { filename, pathKey, verb, signature }
for (const filename of specFiles) {
  const service = filename.replace(/\.yaml$/, '');
  const doc = yaml.load(fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf8'));
  const specKey = doc.info?.['x-stackQL-sourceSpec'];
  if (!specKey) { errors.push(`${filename}: no info.x-stackQL-sourceSpec (re-run make split)`); continue; }
  const resolve = makeResolver(doc);
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      if (!op.operationId) { errors.push(`${filename}: ${verb.toUpperCase()} ${pathKey} has no operationId (the dictionary key)`); continue; }
      const key = `${filename}::${op.operationId}`;
      if (specOps.has(key)) { errors.push(`${filename}: operationId ${op.operationId} is used twice`); continue; }
      specOps.set(key, { filename, pathKey, verb, signature: requiredSignature(resolve, pathKey, op) });
    }
  }
  try {
    const { rows, notes: n } = mapService(doc, service, specKey === 'authored' ? null : specKey, resolver, { resourceRules: RESOURCE_RULES, methodRules: METHOD_RULES });
    for (const [k, v] of rows) derived.set(`${filename}::${k}`, v);
    notes.push(...n);
  } catch (err) {
    errors.push(err.message);
  }
}

// every rule must match an operation of the specs (a stale rule hides a rename)
const norm = (p) => p.replace(/\{[^}]+\}/g, '{}');
for (const r of RESOURCE_RULES) {
  const hit = [...derived.keys()].some((k) => { const [f, p] = k.split('::'); return (!r.service || `${r.service}.yaml` === f) && r.re.test(norm(p).replace(/(\/\{\})+$/, '')); });
  if (!hit) errors.push(`RESOURCE_RULES entry ${r.re} (${r.resource}) matched no operation`);
}
for (const r of METHOD_RULES) {
  const hit = [...derived.keys()].some((k) => { const [f, p, v] = k.split('::'); return v === r.verb && (!r.service || `${r.service}.yaml` === f) && r.re.test(norm(p)); });
  if (!hit) errors.push(`METHOD_RULES entry ${r.verb} ${r.re} matched no operation`);
}

// ---- merge the dictionary with the spec ---------------------------------------
const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0];
const col = Object.fromEntries(header.map((h, i) => [h, i]));
for (const required of ['filename', 'path', 'verb', 'operationId', 'stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key']) {
  if (!(required in col)) { console.error(`Missing expected CSV column: ${required}`); process.exit(1); }
}
const keyOf = (row) => `${row[col.filename]}::${row[col.operationId]}`;
const isMapped = (row) => {
  const resource = row[col.stackql_resource_name];
  return resource === SKIP || Boolean(resource && row[col.stackql_method_name] && row[col.stackql_verb]);
};
const names = (row) => ['stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key'].map((c) => row[col[c]]);
const setNames = (row, values) => {
  ['stackql_resource_name', 'stackql_method_name', 'stackql_verb', 'stackql_object_key'].forEach((c, i) => { row[col[c]] = values[i]; });
};

const kept = [];
const seen = new Set();
const removed = []; // rows whose operation is gone
const duplicates = [];
const moved = [];
for (const row of rows.slice(1)) {
  if (!row[col.operationId]) { errors.push(`${row[col.filename]} ${row[col.verb]} ${row[col.path]}: row has no operationId`); continue; }
  const key = keyOf(row);
  if (seen.has(key)) { duplicates.push(key); continue; }
  seen.add(key);
  const op = specOps.get(key);
  if (!op) { removed.push(row); continue; }
  if (row[col.path] !== op.pathKey || row[col.verb] !== op.verb) {
    moved.push(`${key}: ${row[col.verb]} ${row[col.path]} -> ${op.verb} ${op.pathKey}`);
    row[col.path] = op.pathKey;
    row[col.verb] = op.verb;
  }
  kept.push(row);
}

// An operationId renamed upstream (same file, path and verb) keeps its names.
const removedByPath = new Map(removed.filter(isMapped).map((r) => [`${r[col.filename]}::${r[col.path]}::${r[col.verb]}`, r]));
const renamedIds = [];
const added = [];
for (const row of kept) {
  if (isMapped(row)) continue;
  const pathKey = `${row[col.filename]}::${row[col.path]}::${row[col.verb]}`;
  const previous = removedByPath.get(pathKey);
  if (previous) {
    setNames(row, names(previous));
    removed.splice(removed.indexOf(previous), 1);
    renamedIds.push(`${previous[col.operationId]} -> ${row[col.operationId]} (${row[col.filename]})`);
    continue;
  }
  const m = derived.get(pathKey);
  if (!m) { errors.push(`${keyOf(row)}: no derivation for ${pathKey}`); continue; }
  if (m.resource === SKIP) setNames(row, [SKIP, '', '', '']);
  else setNames(row, [m.resource, m.method, m.sqlVerb, m.objectKey || '']);
  added.push(`${keyOf(row)} -> ${m.resource === SKIP ? `${SKIP} (${m.skip})` : `${m.resource}.${m.method} (${m.sqlVerb})`}`);
}
for (const key of specOps.keys()) if (!seen.has(key)) errors.push(`in the spec but not in the CSV: ${key} (make mappings runs analyze to add it)`);

// ---- validate the dictionary, whatever named each row -------------------------
const methodSeen = new Map();
const sigSeen = new Map();
for (const row of kept) {
  const [resource, method, sqlVerb] = names(row);
  if (resource === SKIP) continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  const where = `${row[col.verb]} ${row[col.path]}`;
  for (const ident of [resource, method]) {
    if (!/^[a-z][a-z0-9_]*$/.test(ident)) errors.push(`${service}: '${ident}' is not a lower snake_case identifier (${where})`);
  }
  if (!['select', 'insert', 'update', 'replace', 'delete', 'exec'].includes(sqlVerb)) errors.push(`${service}.${resource}.${method}: unknown stackql_verb '${sqlVerb}' (${where})`);
  const methodKey = `${service}.${resource}.${method}`;
  if (methodSeen.has(methodKey)) errors.push(`duplicate method ${methodKey} (${methodSeen.get(methodKey)} and ${where})`);
  methodSeen.set(methodKey, where);
  if (sqlVerb !== 'exec') {
    const signature = specOps.get(keyOf(row))?.signature ?? '';
    const sigKey = `${service}.${resource}.${sqlVerb}::${signature}`;
    if (sigSeen.has(sigKey)) errors.push(`${service}.${resource}: ${sqlVerb} methods ${sigSeen.get(sigKey)} and ${method} have the same required parameters [${signature}] - make one EXEC or give them different resources`);
    else sigSeen.set(sigKey, method);
  }
}

// ---- report / write -----------------------------------------------------------
const changes = [
  ...added.map((a) => `added ${a}`),
  ...renamedIds.map((r) => `operationId renamed upstream, names kept: ${r}`),
  ...moved.map((m) => `moved, names kept: ${m}`),
  ...removed.map((r) => `removed (no longer in the spec): ${keyOf(r)} was ${r[col.stackql_resource_name] === SKIP ? SKIP : `${r[col.stackql_resource_name]}.${r[col.stackql_method_name]}`}`),
];

if (report) {
  console.log('service,resource,method,verb,objectKey,httpVerb,path');
  for (const row of kept) {
    console.log([row[col.filename].replace(/\.yaml$/, ''), ...names(row), row[col.verb], row[col.path]].join(','));
  }
  // where the dictionary and the rules disagree: hand edits, or names
  // derived by an older version of the rules
  const drift = [];
  for (const row of kept) {
    const m = derived.get(`${row[col.filename]}::${row[col.path]}::${row[col.verb]}`);
    if (!m) continue;
    const fromRules = m.resource === SKIP ? [SKIP, '', '', ''] : [m.resource, m.method, m.sqlVerb, m.objectKey || ''];
    if (names(row).join('|') !== fromRules.join('|')) drift.push(`${keyOf(row)}: ${names(row).filter(Boolean).join(' ')} (rules: ${fromRules.filter(Boolean).join(' ')})`);
  }
  // The rules read provider-dev/source as it is: after `make build` the
  // specs are normalized (bare arrays wrapped), so objectKey differs for
  // those reads. `make split` first gives the comparison a full build makes.
  console.log(`\n${drift.length} row(s) differ from what the rules derive on provider-dev/source as it is now (run make split first for an exact comparison)${drift.length ? ':' : ''}`);
  for (const d of drift) console.log(`  ${d}`);
  for (const c of changes) console.log(`would be ${c}`);
}
if (showNotes || report) for (const n of notes) console.log(`note: ${n}`);
if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
if (report) { console.log('\n(report only - nothing written)'); process.exit(0); }

fs.writeFileSync(csvPath, [header, ...kept].map((r) => r.map(csvField).join(',')).join('\n') + '\n');

for (const c of changes) console.log(c);
if (duplicates.length) console.log(`dropped ${duplicates.length} duplicate row(s) analyze re-appended (rows without a method, such as ${SKIP})`);

const stats = { select: 0, insert: 0, update: 0, replace: 0, delete: 0, exec: 0, skipped: 0 };
const resourcesByService = new Map();
for (const row of kept) {
  const [resource, , sqlVerb] = names(row);
  if (resource === SKIP) { stats.skipped++; continue; }
  stats[sqlVerb]++;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!resourcesByService.has(service)) resourcesByService.set(service, new Set());
  resourcesByService.get(service).add(resource);
}
const totalResources = [...resourcesByService.values()].reduce((n, s) => n + s.size, 0);
console.log(`Dictionary: ${kept.length - added.length} operation(s) kept, ${added.length} added, ${removed.length} removed`);
console.log(`Mapped: select ${stats.select}, insert ${stats.insert}, update ${stats.update}, replace ${stats.replace}, delete ${stats.delete}, exec ${stats.exec}; skipped ${stats.skipped}`);
console.log(`${resourcesByService.size} services, ${totalResources} resources`);
