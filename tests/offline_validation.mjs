#!/usr/bin/env node

// Offline validation of the generated provider against the local file
// registry - no network, no server. Runs SHOW SERVICES / SHOW RESOURCES /
// SHOW METHODS and DESCRIBE EXTENDED and asserts the expected surface:
//   - the exact service list
//   - for EVERY service, that the resources stackql shows are exactly the
//     resources provider-dev/config/all_services.csv maps (the generated
//     provider and the committed mapping contract cannot drift apart)
//   - exact resource lists for the flagship services
//   - verbs and required params on representative resources
//   - the x-stackQL-envVar behaviour of the gateway cloud_id variable, and
//     the site variable of atlassian_tenant
//   - snake_case columns, the expand metadata column removed, the
//     permission rows, the label rows, the scalar value column
// Exit 1 on any failure.
//
// Usage: node tests/offline_validation.mjs
// Binary resolution: $STACKQL, ./stackql(.exe), then PATH.
// Note: `--output json` renders scalars as strings.

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROVIDER_NAME, CLOUD_ID_ENV_VAR, parseCsv } from '../provider-dev/scripts/lib/spec_helpers.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const regPath = path.join(repoRoot, 'provider-dev', 'openapi').replace(/\\/g, '/');
const registry = JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });
const CONCURRENCY = 8;

// ---------------------------------------------------------------------------
// Expectations. Exact sorted lists - a regeneration that adds or renames a
// service or a flagship resource must update these deliberately.
// ---------------------------------------------------------------------------

const EXPECTED_SERVICES = [
  'agile', 'atlassian_tenant', 'dashboards', 'fields', 'filters', 'issue_attributes', 'issue_types', 'issues', 'jql',
  'notifications', 'permissions', 'plans', 'projects', 'screens', 'system', 'users', 'workflows'
];

const EXPECTED_RESOURCES = {
  issues: [
    'adf_limit_reports', 'attachment_archive_entries', 'attachment_archive_raw_entries', 'attachment_settings', 'attachments',
    'bulk_editable_fields', 'bulk_tasks', 'bulk_transitions', 'changelogs', 'comment_properties', 'comments', 'create_meta_fields',
    'create_meta_issue_types', 'deleted_worklogs', 'edit_meta', 'events', 'issues', 'labels', 'limit_reports', 'link_types',
    'links', 'picker_suggestions', 'properties', 'redaction_jobs', 'remote_links', 'transitions', 'updated_worklogs', 'votes',
    'watchers', 'worklog_properties', 'worklogs'
  ],
  agile: [
    'board_backlog_issue_counts', 'board_backlog_issues', 'board_configurations', 'board_features', 'board_issue_counts',
    'board_issues_without_epic', 'board_projects', 'board_properties', 'board_quick_filters', 'board_reports', 'board_versions',
    'boards', 'epics', 'filter_boards', 'issue_estimations', 'issues', 'sprint_properties', 'sprints'
  ],
  atlassian_tenant: ['info']
};

// ---------------------------------------------------------------------------

function findBinary() {
  if (process.env.STACKQL && fs.existsSync(process.env.STACKQL)) return process.env.STACKQL;
  for (const name of ['stackql', 'stackql.exe']) {
    const local = path.join(repoRoot, name);
    if (fs.existsSync(local)) return local;
  }
  return 'stackql'; // PATH
}
const bin = findBinary();

// the developer's own ATLASSIAN_* variables must not leak into the assertions
const CLEAN_ENV = { [CLOUD_ID_ENV_VAR]: undefined };

function runSql(sql, envOverrides = {}) {
  return new Promise((resolve) => {
    const env = { ...process.env };
    for (const [k, v] of Object.entries({ ...CLEAN_ENV, ...envOverrides })) { if (v === undefined) delete env[k]; else env[k] = v; }
    const child = spawn(bin, [`--registry=${registry}`, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
    let stdout = '', stderr = '';
    child.stdout.on('data', (d) => (stdout += d));
    child.stderr.on('data', (d) => (stderr += d));
    child.on('close', (code) => {
      let rows = [];
      try { rows = JSON.parse(stdout) ?? []; } catch { rows = []; }
      resolve({ code, rows, stdout, stderr });
    });
    child.on('error', (err) => resolve({ code: -1, rows: [], stdout: '', stderr: String(err) }));
  });
}

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  [${String(note).slice(0, 240)}]`}`);
}
const names = (rows, key = 'name') => rows.map((x) => x[key]).sort();
const methodsByName = (rows) => Object.fromEntries(rows.map((m) => [m.MethodName, m]));
const required = (m) => String(m?.RequiredParams || '').split(',').map((s) => s.trim()).filter(Boolean);
const P = PROVIDER_NAME;

console.log(`stackql: ${bin}`);
console.log(`registry: ${regPath}`);

// --- the mapping contract: service -> resources with at least one mapped method
const csvRows = parseCsv(fs.readFileSync(path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv'), 'utf8'));
const col = Object.fromEntries(csvRows[0].map((h, i) => [h, i]));
const contract = new Map();
for (const row of csvRows.slice(1)) {
  const resource = row[col.stackql_resource_name];
  if (!resource || resource === 'skip_this_resource') continue;
  const service = row[col.filename].replace(/\.yaml$/, '');
  if (!contract.has(service)) contract.set(service, new Set());
  contract.get(service).add(resource);
}

// --- services
let r = await runSql(`SHOW SERVICES IN ${P}`);
check(`SHOW SERVICES (${EXPECTED_SERVICES.length})`, JSON.stringify(names(r.rows)) === JSON.stringify([...EXPECTED_SERVICES].sort()), r.stderr || JSON.stringify(names(r.rows)));
check('the mapping contract covers the same services', JSON.stringify([...contract.keys()].sort()) === JSON.stringify([...EXPECTED_SERVICES].sort()), JSON.stringify([...contract.keys()].sort()));

// --- resources of every service against the mapping contract
const shown = new Map();
const queue = [...EXPECTED_SERVICES];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length > 0) {
    const svc = queue.shift();
    const res = await runSql(`SHOW RESOURCES IN ${P}.${svc}`);
    shown.set(svc, { names: names(res.rows), stderr: res.stderr });
  }
}));
const drifted = [];
let resourceTotal = 0;
for (const svc of EXPECTED_SERVICES) {
  const expected = [...(contract.get(svc) || [])].sort();
  const got = shown.get(svc)?.names || [];
  resourceTotal += got.length;
  if (JSON.stringify(expected) !== JSON.stringify(got)) drifted.push(`${svc}: expected ${expected.length}, shown ${got.length} ${shown.get(svc)?.stderr || ''}`);
}
check(`SHOW RESOURCES matches all_services.csv for all ${EXPECTED_SERVICES.length} services (${resourceTotal} resources)`, drifted.length === 0, drifted.join('; '));
for (const [svc, expected] of Object.entries(EXPECTED_RESOURCES)) {
  const got = shown.get(svc)?.names || [];
  check(`SHOW RESOURCES IN ${P}.${svc} (${expected.length})`, JSON.stringify(got) === JSON.stringify([...expected].sort()), JSON.stringify(got));
}

// --- the gateway cloud_id variable (x-stackQL-envVar)
r = await runSql(`SHOW METHODS IN ${P}.issues.issues`);
const unset = methodsByName(r.rows);
check(`cloud_id is required when ${CLOUD_ID_ENV_VAR} is unset`, r.rows.length > 0 && Object.values(unset).every((m) => required(m).includes('cloud_id')), r.stderr || JSON.stringify(unset));
r = await runSql(`SHOW METHODS IN ${P}.issues.issues`, { [CLOUD_ID_ENV_VAR]: 'offline-validation' });
const im = methodsByName(r.rows);
check(`cloud_id is optional when ${CLOUD_ID_ENV_VAR} is set`, r.rows.length > 0 && !Object.values(im).some((m) => required(m).includes('cloud_id')), r.stderr || JSON.stringify(im));

// --- the issues resource: search, keyed read, lifecycle, actions
check('issues.issues verbs', im.search?.SQLVerb === 'SELECT' && im.get?.SQLVerb === 'SELECT' && im.create?.SQLVerb === 'INSERT' && im.update?.SQLVerb === 'UPDATE' && im.delete?.SQLVerb === 'DELETE', JSON.stringify(Object.keys(im)));
check('issues.issues.get requires issue_id_or_key; search requires nothing', required(im.get).includes('issue_id_or_key') && required(im.search).length === 0, JSON.stringify({ get: im.get, search: im.search }));
check('issue actions are EXEC on issues', ['transition', 'assign', 'notify', 'archive', 'unarchive', 'bulk_create', 'bulk_transition', 'bulk_delete'].every((m) => im[m]?.SQLVerb === 'EXEC'), JSON.stringify(Object.keys(im)));
r = await runSql(`DESCRIBE EXTENDED ${P}.issues.issues`);
let cols = names(r.rows);
check('issues.issues columns: id, key, fields (JSON), no expand metadata', ['id', 'key', 'fields', 'changelog', 'rendered_fields'].every((c) => cols.includes(c)) && !cols.includes('expand') && !cols.includes('renderedFields'), JSON.stringify(cols));

// --- comments: ADF body as JSON
r = await runSql(`DESCRIBE EXTENDED ${P}.issues.comments`);
cols = r.rows;
const body = cols.find((c) => c.name === 'body');
check('issues.comments: body is a JSON object column', !!body && /object|json/i.test(String(body.type)), JSON.stringify(cols.map((c) => `${c.name}:${c.type}`)));

// --- projects
r = await runSql(`SHOW METHODS IN ${P}.projects.projects`, { [CLOUD_ID_ENV_VAR]: 'x' });
const pm = methodsByName(r.rows);
check('projects.projects lifecycle + EXEC actions', pm.list?.SQLVerb === 'SELECT' && pm.get?.SQLVerb === 'SELECT' && pm.create?.SQLVerb === 'INSERT' && pm.update?.SQLVerb === 'UPDATE' && pm.delete?.SQLVerb === 'DELETE' && ['archive', 'restore', 'delete_async'].every((m) => pm[m]?.SQLVerb === 'EXEC'), JSON.stringify(Object.keys(pm)));
r = await runSql(`DESCRIBE EXTENDED ${P}.projects.projects`);
cols = names(r.rows);
check('projects.projects columns: snake_case, no expand metadata', ['id', 'key', 'name', 'project_type_key', 'lead', 'is_private'].every((c) => cols.includes(c)) && !cols.includes('projectTypeKey') && !cols.includes('expand'), JSON.stringify(cols));

// --- permission rows and label rows and the scalar value column
r = await runSql(`DESCRIBE EXTENDED ${P}.permissions.my_permissions`);
cols = names(r.rows);
check('permissions.my_permissions: one row per permission (no permissions map column)', ['key', 'name', 'type', 'have_permission'].every((c) => cols.includes(c)) && !cols.includes('permissions'), JSON.stringify(cols));
r = await runSql(`SHOW METHODS IN ${P}.permissions.my_permissions`, { [CLOUD_ID_ENV_VAR]: 'x' });
check('permissions.my_permissions.get requires permissions', required(methodsByName(r.rows).get).includes('permissions'), JSON.stringify(r.rows));
r = await runSql(`DESCRIBE EXTENDED ${P}.issues.labels`);
check('issues.labels: a label column', names(r.rows).includes('label'), JSON.stringify(names(r.rows)));
r = await runSql(`DESCRIBE EXTENDED ${P}.projects.valid_project_keys`);
check('projects.valid_project_keys: a single value column', JSON.stringify(names(r.rows)) === JSON.stringify(['value']), JSON.stringify(names(r.rows)));

// --- atlassian_tenant: the site variable, no cloud_id
r = await runSql(`SHOW METHODS IN ${P}.atlassian_tenant.info`);
const tm = methodsByName(r.rows);
check('atlassian_tenant.info.get: requires site, not cloud_id', tm.get?.SQLVerb === 'SELECT' && required(tm.get).includes('site') && !required(tm.get).includes('cloud_id'), JSON.stringify(r.rows));
r = await runSql(`DESCRIBE EXTENDED ${P}.atlassian_tenant.info`);
check('atlassian_tenant.info: cloud_id column', JSON.stringify(names(r.rows)) === JSON.stringify(['cloud_id']), JSON.stringify(names(r.rows)));

// --- agile
r = await runSql(`SHOW METHODS IN ${P}.agile.sprints`, { [CLOUD_ID_ENV_VAR]: 'x' });
const sm = methodsByName(r.rows);
check('agile.sprints: UPDATE is the partial update, replace / move_issues / swap are EXEC', sm.update?.SQLVerb === 'UPDATE' && sm.create?.SQLVerb === 'INSERT' && sm.delete?.SQLVerb === 'DELETE' && ['replace', 'move_issues', 'swap'].every((m) => sm[m]?.SQLVerb === 'EXEC'), JSON.stringify(Object.keys(sm)));
r = await runSql(`DESCRIBE EXTENDED ${P}.agile.boards`);
cols = names(r.rows);
check('agile.boards columns', ['id', 'name', 'type', 'location'].every((c) => cols.includes(c)), JSON.stringify(cols));

// --- users
r = await runSql(`DESCRIBE EXTENDED ${P}.users.myself`);
cols = names(r.rows);
check('users.myself columns (snake_case)', ['account_id', 'account_type', 'display_name', 'time_zone'].every((c) => cols.includes(c)) && !cols.includes('accountId'), JSON.stringify(cols));
r = await runSql(`SHOW METHODS IN ${P}.users.users`, { [CLOUD_ID_ENV_VAR]: 'x' });
const um = methodsByName(r.rows);
check('users.users: list (search) and get (account_id) route apart', um.list?.SQLVerb === 'SELECT' && required(um.get).includes('account_id') && required(um.list).length === 0, JSON.stringify(r.rows));

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
