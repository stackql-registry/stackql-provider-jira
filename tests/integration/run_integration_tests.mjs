#!/usr/bin/env node

// Integration tests: run the generated provider (local file registry)
// against the mock Jira API and assert row-level results and wire calls for
// each archetype present in the provider:
//   - OAuth2 client credentials: the token request and the bearer header;
//     a wrong secret is surfaced
//   - the gateway cloud_id variable: resolved from ATLASSIAN_CLOUD_ID, a WHERE
//     value beats it, unset is refused
//   - the atlassian_tenant service: the site variable, the cloud ID answer,
//     an unknown site surfaced
//   - offset pagination synthesized from PageBean pages without nextPage
//     (startAt sent back), offset pages with total only (comments), token
//     pagination in the query (Jira Software lists) and in the body (JQL
//     search), LIMIT pushed down as maxResults
//   - the JQL search: POST body with the default fields, json_extract over
//     the fields column
//   - expand as a request parameter (the expand metadata column removed),
//     the permission map as rows with the required permissions parameter
//   - bare arrays, a page of strings (labels), a bare-text scalar (value)
//   - INSERT / UPDATE / DELETE lifecycles with their exact wire bodies (the
//     fields object, the ADF comment body as an object), EXEC actions
//     (transition), POST partial update (sprints), a 303 redirect followed
//   - the vendor's 404 error body surfaced
//
// The vendor server templates are https-only and cannot address the mock,
// so harness.mjs materialises a TEST COPY of provider-dev/openapi in
// tests/integration/.registry-tmp (gitignored, recreated each run) with the
// gateway, site and token URLs rewritten to the mock (server variables and
// x-stackQL-envVar preserved), and spawns stackql asynchronously.
//
// Requires a stackql binary: $STACKQL, ./stackql, or `stackql` on PATH.
// Usage: node tests/integration/run_integration_tests.mjs [--verbose]

import {
  startMockServer, CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN, CLOUD_ID, OTHER_CLOUD_ID, SITE, ACCOUNT_ID
} from './mock_jira_server.mjs';
import { buildTestRegistry, registryArg, makeRunSql, findStackql } from './harness.mjs';
import { PROVIDER_NAME } from '../../provider-dev/scripts/lib/spec_helpers.mjs';

const verbose = process.argv.includes('--verbose');
const t0 = Date.now();
const PROVIDER_ENV = { ATLASSIAN_CLIENT_ID: CLIENT_ID, ATLASSIAN_CLIENT_SECRET: CLIENT_SECRET, ATLASSIAN_CLOUD_ID: CLOUD_ID };

const results = [];
function check(name, cond, note = '') {
  results.push({ name, pass: !!cond, note });
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && note ? `  [${String(note).slice(0, 240)}]` : ''}`);
}

const { server, port, log, state } = await startMockServer();
const registry = registryArg(buildTestRegistry(port));
const runSql = makeRunSql(registry, PROVIDER_ENV, { verbose });
console.log(`mock Jira API on 127.0.0.1:${port}, stackql: ${findStackql()}`);

const since = (mark) => log.slice(mark);
const apiCalls = (mark, method, p) => since(mark).filter((e) => e.kind === 'api' && e.method === method && e.path === p);
const wire = (mark) => JSON.stringify(since(mark).map((e) => `${e.method} ${e.path} ${JSON.stringify(e.query)} ${e.raw || ''}`.trim()));
const P = PROVIDER_NAME;
const ADF = (text) => JSON.stringify({ type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text }] }] });

try {
  // ------------------------------------------------------------------ meta
  let r = await runSql(`SHOW SERVICES IN ${P}`);
  check('SHOW SERVICES lists the 17 services', r.rows && r.rows.length === 17, r.err || `got ${r.rows?.length}`);

  // ---------------------------------------------- auth + gateway + identity
  let mark = log.length;
  r = await runSql(`SELECT account_id, account_type, display_name FROM ${P}.users.myself`);
  check('myself: one row, snake_case columns', r.rows?.length === 1 && r.rows[0].account_id === ACCOUNT_ID && r.rows[0].account_type === 'app', r.err || JSON.stringify(r.rows));
  const token = since(mark).filter((e) => e.kind === 'token');
  check('token request: client credentials grant with the configured client', token.length === 1 && token[0].body?.grant_type === 'client_credentials' && (token[0].body?.client_id === CLIENT_ID || /^Basic /.test(token[0].authorization || '')), JSON.stringify(token.map((t) => ({ ...t.body, client_secret: t.body?.client_secret ? '***' : undefined }))));
  const me = apiCalls(mark, 'GET', '/rest/api/3/myself');
  check('bearer token sent through the gateway', me.length === 1 && me[0].authorization === `Bearer ${ACCESS_TOKEN}`, wire(mark));
  check('cloud_id resolved from ATLASSIAN_CLOUD_ID', me[0]?.cloudId === CLOUD_ID, me[0]?.cloudId);

  r = await runSql(`SELECT account_id FROM ${P}.users.myself`, { ATLASSIAN_CLIENT_SECRET: 'wrong-secret' });
  check('wrong client secret is surfaced', r.err && /401|token|denied|oauth|Unauthorized/i.test(r.err), r.err || JSON.stringify(r.rows));

  mark = log.length;
  r = await runSql(`SELECT account_id FROM ${P}.users.myself WHERE cloud_id = '${OTHER_CLOUD_ID}'`);
  check('WHERE cloud_id beats ATLASSIAN_CLOUD_ID', apiCalls(mark, 'GET', '/rest/api/3/myself')[0]?.cloudId === OTHER_CLOUD_ID, wire(mark));

  r = await runSql(`SELECT account_id FROM ${P}.users.myself`, { ATLASSIAN_CLOUD_ID: undefined });
  check('cloud_id unset and no WHERE value is refused', !!r.err || (r.rows || []).length === 0, r.err || JSON.stringify(r.rows));

  // the cloud ID without ATLASSIAN_CLOUD_ID (the docs' two SQL forms)
  mark = log.length;
  r = await runSql(`SET "$.params_by_provider.jira" = '{"cloud_id": "${CLOUD_ID}"}'; SELECT account_id FROM ${P}.users.myself`, { ATLASSIAN_CLOUD_ID: undefined });
  check('SET "$.params_by_provider.jira" supplies cloud_id (no ATLASSIAN_CLOUD_ID)', r.rows?.length === 1 && apiCalls(mark, 'GET', '/rest/api/3/myself')[0]?.cloudId === CLOUD_ID, r.err || wire(mark));
  mark = log.length;
  r = await runSql(`SELECT p.key FROM ${P}.atlassian_tenant.info t INNER JOIN ${P}.projects.projects p ON p.cloud_id = t.cloud_id WHERE t.site = '${SITE}'`, { ATLASSIAN_CLOUD_ID: undefined });
  check('a join from atlassian_tenant.info feeds cloud_id (no ATLASSIAN_CLOUD_ID)', r.rows?.length === 3 && apiCalls(mark, 'GET', '/rest/api/3/project/search')[0]?.cloudId === CLOUD_ID, r.err || wire(mark));

  r = await runSql(`SELECT version, deployment_type, build_number FROM ${P}.system.server_info`);
  check('server_info: one object row (not exploded by its arrays)', r.rows?.length === 1 && r.rows[0].deployment_type === 'Cloud', r.err || JSON.stringify(r.rows));

  // ------------------------------------------------------------ tenant info
  mark = log.length;
  r = await runSql(`SELECT cloud_id FROM ${P}.atlassian_tenant.info WHERE site = '${SITE}'`);
  check('atlassian_tenant.info answers the cloud ID for a site', r.rows?.length === 1 && r.rows[0].cloud_id === CLOUD_ID, r.err || JSON.stringify(r.rows));
  check('tenant_info routed through the site server variable', since(mark).some((e) => e.kind === 'site' && e.site === SITE && e.path === '/_edge/tenant_info'), wire(mark));
  r = await runSql(`SELECT cloudId FROM ${P}.atlassian_tenant.info WHERE site = '${SITE}'`);
  check('the wire name cloudId also resolves', r.rows?.length === 1 && Object.values(r.rows[0])[0] === CLOUD_ID, r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT cloud_id FROM ${P}.atlassian_tenant.info WHERE site = 'no-such-site'`);
  check('an unknown site is surfaced (404)', r.err && /404/.test(r.err), r.err || JSON.stringify(r.rows));

  // ------------------------------------------- offset pagination (PageBean)
  mark = log.length;
  r = await runSql(`SELECT id, key, name FROM ${P}.projects.projects WHERE max_results = 2`);
  const projectPages = apiCalls(mark, 'GET', '/rest/api/3/project/search');
  check('projects: every page read (3 rows over 2 pages of 2)', r.rows?.length === 3, r.err || JSON.stringify(r.rows));
  check('projects: the synthesized next startAt is sent back', projectPages.length === 2 && projectPages[1].query.startAt === '2' && projectPages[0].query.startAt === undefined, wire(mark));

  mark = log.length;
  r = await runSql(`SELECT name FROM ${P}.issue_attributes.priorities WHERE max_results = 2`);
  const prioPages = apiCalls(mark, 'GET', '/rest/api/3/priority/search');
  check('priorities: 5 rows over 3 pages', r.rows?.length === 5 && prioPages.length === 3 && prioPages.map((c) => c.query.startAt || '0').join(',') === '0,2,4', r.err || wire(mark));

  mark = log.length;
  r = await runSql(`SELECT name FROM ${P}.issue_attributes.priorities LIMIT 2`);
  const limited = apiCalls(mark, 'GET', '/rest/api/3/priority/search');
  check('LIMIT pushed down as maxResults', limited[0]?.query.maxResults === '2' && r.rows?.length === 2, r.err || wire(mark));

  mark = log.length;
  r = await runSql(`SELECT key, name FROM ${P}.projects.projects ORDER BY name DESC LIMIT 2`);
  const ordered = apiCalls(mark, 'GET', '/rest/api/3/project/search');
  check('ORDER BY pushed as orderBy (prefix syntax) with LIMIT', ordered[0]?.query.orderBy === '-name' && ordered[0]?.query.maxResults === '2' && JSON.stringify(r.rows?.map((x) => x.name)) === JSON.stringify(['StackQL UAT', 'Operations']), r.err || wire(mark));
  mark = log.length;
  r = await runSql(`SELECT key FROM ${P}.projects.projects ORDER BY key LIMIT 1 OFFSET 1`);
  check('OFFSET pushed as startAt', apiCalls(mark, 'GET', '/rest/api/3/project/search')[0]?.query.startAt === '1' && r.rows?.length === 1 && r.rows[0].key === 'OPS', r.err || wire(mark));
  mark = log.length;
  r = await runSql(`SELECT name, release_date FROM ${P}.projects.versions WHERE project_id_or_key = 'SQLUAT' ORDER BY release_date DESC`);
  check('ORDER BY on a column whose name is not the sort key is sorted locally, not pushed', !r.err && apiCalls(mark, 'GET', '/rest/api/3/project/SQLUAT/version')[0]?.query.orderBy === undefined, r.err || wire(mark));

  // --------------------------------------------------------- expand column
  mark = log.length;
  r = await runSql(`SELECT key, description FROM ${P}.projects.projects WHERE expand = 'description'`);
  check('expand is a request parameter (rows not filtered on it)', r.rows?.length === 3 && r.rows.some((x) => x.description === 'Smoke project'), r.err || JSON.stringify(r.rows));
  check('expand sent on the wire', apiCalls(mark, 'GET', '/rest/api/3/project/search')[0]?.query.expand === 'description', wire(mark));

  r = await runSql(`SELECT id, key, name FROM ${P}.projects.projects WHERE project_id_or_key = 'SQLUAT'`);
  check('projects.get by key routes to the keyed read', r.rows?.length === 1 && r.rows[0].id === '10001', r.err || JSON.stringify(r.rows));

  // ------------------------------------------------------- permission rows
  mark = log.length;
  r = await runSql(`SELECT key, have_permission FROM ${P}.permissions.my_permissions WHERE permissions = 'DELETE_ISSUES,CREATE_ISSUES' AND project_key = 'SQLUAT'`);
  check('my_permissions: one row per permission', r.rows?.length === 2 && r.rows.map((x) => x.key).sort().join(',') === 'CREATE_ISSUES,DELETE_ISSUES', r.err || JSON.stringify(r.rows));
  check('the required permissions parameter is sent', apiCalls(mark, 'GET', '/rest/api/3/mypermissions')[0]?.query.permissions === 'DELETE_ISSUES,CREATE_ISSUES', wire(mark));

  // ------------------------------------------- bare array, strings, scalar
  r = await runSql(`SELECT id, name FROM ${P}.issue_types.issue_types`);
  check('issue_types: bare array wrapped into rows', r.rows?.length === 3 && r.rows.some((x) => x.name === 'Task'), r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT label FROM ${P}.issues.labels`);
  check('labels: a page of strings as label rows', r.rows?.length === 3 && r.rows.map((x) => x.label).includes('stackql-smoke'), r.err || JSON.stringify(r.rows));
  r = await runSql(`SELECT value FROM ${P}.projects.valid_project_keys WHERE key = 'abc'`);
  check('valid_project_keys: bare-text scalar as a value row', r.rows?.length === 1 && r.rows[0].value === 'ABC1', r.err || JSON.stringify(r.rows));

  // ------------------------------------------------------------ JQL search
  mark = log.length;
  r = await runSql(`SELECT key, json_extract(fields, '$.summary') AS summary, json_extract(fields, '$.status.name') AS status FROM ${P}.issues.issues WHERE jql = 'project = SQLUAT ORDER BY key'`);
  const searches = apiCalls(mark, 'POST', '/rest/api/3/search/jql');
  check('JQL search: 3 issues with fields', r.rows?.length === 3 && r.rows.every((x) => x.key && x.summary), r.err || JSON.stringify(r.rows));
  check('JQL search: POST body carries jql and the default fields', searches[0]?.body?.jql === 'project = SQLUAT ORDER BY key' && JSON.stringify(searches[0]?.body?.fields) === '["*navigable"]', wire(mark));
  check('JQL search: nextPageToken sent back in the body', searches.length === 2 && !!searches[1].body?.nextPageToken, wire(mark));
  mark = log.length;
  r = await runSql(`SELECT key FROM ${P}.issues.issues WHERE jql = 'project = SQLUAT' LIMIT 2`);
  check('JQL search: LIMIT pushed into the body as maxResults', apiCalls(mark, 'POST', '/rest/api/3/search/jql')[0]?.body?.maxResults === 2 && r.rows?.length === 2, r.err || wire(mark));

  // -------------------------------------------------------- issue lifecycle
  mark = log.length;
  r = await runSql(`INSERT INTO ${P}.issues.issues (fields) SELECT '{"project": {"key": "SQLUAT"}, "summary": "stackql-smoke integration", "issuetype": {"name": "Task"}, "labels": ["stackql-smoke"]}' RETURNING id, key`);
  const created = apiCalls(mark, 'POST', '/rest/api/3/issue');
  const newKey = r.rows?.[0]?.key;
  check('issue INSERT ... RETURNING key', !!newKey && /^SQLUAT-\d+$/.test(newKey), r.err || JSON.stringify(r.rows));
  check('issue INSERT sends fields as an object', typeof created[0]?.body?.fields === 'object' && created[0].body.fields.summary === 'stackql-smoke integration' && Array.isArray(created[0].body.fields.labels), wire(mark));

  r = await runSql(`SELECT key, json_extract(fields, '$.summary') AS summary FROM ${P}.issues.issues WHERE issue_id_or_key = '${newKey}'`);
  check('issue get by key', r.rows?.length === 1 && r.rows[0].summary === 'stackql-smoke integration', r.err || JSON.stringify(r.rows));

  mark = log.length;
  r = await runSql(`UPDATE ${P}.issues.issues SET fields = '{"summary": "stackql-smoke integration (updated)"}' WHERE issue_id_or_key = '${newKey}'`);
  const updated = apiCalls(mark, 'PUT', `/rest/api/3/issue/${newKey}`);
  check('issue UPDATE sends PUT with the fields object', !r.err && updated[0]?.body?.fields?.summary === 'stackql-smoke integration (updated)', r.err || wire(mark));

  mark = log.length;
  r = await runSql(`EXEC ${P}.issues.issues.transition @issue_id_or_key = '${newKey}', @transition = '{"id": "31"}'`);
  const tr = apiCalls(mark, 'POST', `/rest/api/3/issue/${newKey}/transitions`);
  check('EXEC transition posts {transition: {id}}', !r.err && tr[0]?.body?.transition?.id === '31', r.err || wire(mark));
  check('the transition took effect', state.issues.get(newKey)?.fields.status.name === 'Done', JSON.stringify(state.issues.get(newKey)?.fields.status));

  // comments: ADF body, offset pages with total only
  for (let i = 1; i <= 3; i++) {
    r = await runSql(`INSERT INTO ${P}.issues.comments (issue_id_or_key, body) SELECT '${newKey}', '${ADF(`comment ${i}`)}'`);
  }
  const commentPosts = since(0).filter((e) => e.kind === 'api' && e.method === 'POST' && e.path === `/rest/api/3/issue/${newKey}/comment`);
  check('comment INSERT sends the ADF body as an object', commentPosts.length === 3 && commentPosts.every((c) => c.body?.body?.type === 'doc'), JSON.stringify(commentPosts.map((c) => c.raw)));
  mark = log.length;
  r = await runSql(`SELECT id, json_extract(body, '$.content[0].content[0].text') AS text FROM ${P}.issues.comments WHERE issue_id_or_key = '${newKey}'`);
  const commentPages = apiCalls(mark, 'GET', `/rest/api/3/issue/${newKey}/comment`);
  check('comments: 3 rows over 2 pages (total-driven offset)', r.rows?.length === 3 && commentPages.length === 2 && commentPages[1].query.startAt === '2', r.err || wire(mark));
  const commentId = r.rows?.[0]?.id;
  mark = log.length;
  r = await runSql(`UPDATE ${P}.issues.comments SET body = '${ADF('edited')}' WHERE issue_id_or_key = '${newKey}' AND id = '${commentId}'`);
  check('comment UPDATE sends the ADF body', !r.err && apiCalls(mark, 'PUT', `/rest/api/3/issue/${newKey}/comment/${commentId}`)[0]?.body?.body?.type === 'doc', r.err || wire(mark));
  r = await runSql(`DELETE FROM ${P}.issues.comments WHERE issue_id_or_key = '${newKey}' AND id = '${commentId}'`);
  check('comment DELETE', !r.err && !state.comments.has(commentId), r.err);

  mark = log.length;
  r = await runSql(`DELETE FROM ${P}.issues.issues WHERE issue_id_or_key = '${newKey}'`);
  check('issue DELETE', !r.err && apiCalls(mark, 'DELETE', `/rest/api/3/issue/${newKey}`).length === 1 && !state.issues.has(newKey), r.err || wire(mark));

  r = await runSql(`SELECT key FROM ${P}.issues.issues WHERE issue_id_or_key = 'SQLUAT-999'`);
  check('the vendor 404 error body is surfaced', r.err && /404/.test(r.err) && /Issue does not exist/.test(r.err), r.err || JSON.stringify(r.rows));

  // ------------------------------------------------------ version lifecycle
  mark = log.length;
  r = await runSql(`INSERT INTO ${P}.projects.versions (name, project_id, description) SELECT 'stackql-smoke-v1', 10001, 'integration' RETURNING id, name`);
  const vId = r.rows?.[0]?.id;
  const vPost = apiCalls(mark, 'POST', '/rest/api/3/version');
  check('version INSERT: snake columns to camelCase wire, typed number', !!vId && vPost[0]?.body?.projectId === 10001 && vPost[0]?.body?.name === 'stackql-smoke-v1', r.err || wire(mark));
  mark = log.length;
  r = await runSql(`UPDATE ${P}.projects.versions SET description = 'updated', released = true WHERE id = '${vId}'`);
  const vPut = apiCalls(mark, 'PUT', `/rest/api/3/version/${vId}`);
  check('version UPDATE: typed boolean on the wire', !r.err && vPut[0]?.body?.released === true && vPut[0]?.body?.description === 'updated', r.err || wire(mark));
  r = await runSql(`SELECT id, name, released FROM ${P}.projects.versions WHERE project_id_or_key = 'SQLUAT'`);
  check('versions list by project', r.rows?.some((x) => x.id === vId), r.err || JSON.stringify(r.rows));
  r = await runSql(`DELETE FROM ${P}.projects.versions WHERE id = '${vId}'`);
  check('version DELETE', !r.err && !state.versions.has(vId), r.err);

  // ------------------------------------------- entity property: raw value
  mark = log.length;
  r = await runSql(`UPDATE ${P}.projects.project_properties SET value = '{"by": "stackql", "n": 2}' WHERE project_id_or_key = 'SQLUAT' AND property_key = 'stackql-smoke-p'`);
  const propPut = apiCalls(mark, 'PUT', '/rest/api/3/project/SQLUAT/properties/stackql-smoke-p');
  check('property UPDATE sends the value as the raw body', !r.err && propPut[0]?.raw === '{"by":"stackql","n":2}', r.err || wire(mark));
  r = await runSql(`SELECT key, value FROM ${P}.projects.project_properties WHERE project_id_or_key = 'SQLUAT' AND property_key = 'stackql-smoke-p'`);
  check('property reads back', r.rows?.length === 1 && /stackql/.test(JSON.stringify(r.rows[0].value)), r.err || JSON.stringify(r.rows));
  r = await runSql(`DELETE FROM ${P}.projects.project_properties WHERE project_id_or_key = 'SQLUAT' AND property_key = 'stackql-smoke-p'`);
  check('property DELETE', !r.err && !state.properties.has('SQLUAT/stackql-smoke-p'), r.err);

  // -------------------------------------------------- 303 redirect followed
  mark = log.length;
  r = await runSql(`DELETE FROM ${P}.fields.fields WHERE id = 'customfield_10099'`);
  check('async DELETE: 303 followed to the task', !r.err && apiCalls(mark, 'DELETE', '/rest/api/3/field/customfield_10099').length === 1 && apiCalls(mark, 'GET', '/rest/api/3/task/10100').length === 1, r.err || wire(mark));

  // ------------------------------------------------------------------ agile
  mark = log.length;
  r = await runSql(`SELECT id, name, type FROM ${P}.agile.boards`);
  const boardPages = apiCalls(mark, 'GET', '/rest/agile/1.0/board');
  check('agile boards: offset pagination (3 rows, 2 pages)', r.rows?.length === 3 && boardPages.length === 2 && boardPages[1].query.startAt === '2', r.err || wire(mark));
  mark = log.length;
  r = await runSql(`SELECT key FROM ${P}.agile.board_issues WHERE board_id = '1'`);
  const bi = apiCalls(mark, 'GET', '/rest/software/1.0/board/1/issue');
  check('board issues: nextPageToken in the query', r.rows?.length === state.issues.size && bi.length === 2 && bi[1].query.nextPageToken === 'tok-2', r.err || wire(mark));
  mark = log.length;
  r = await runSql(`INSERT INTO ${P}.agile.sprints (name, origin_board_id, goal) SELECT 'stackql-smoke sprint', 1, 'integration' RETURNING id, state`);
  const sprintId = r.rows?.[0]?.id;
  check('sprint INSERT ... RETURNING', !!sprintId && apiCalls(mark, 'POST', '/rest/agile/1.0/sprint')[0]?.body?.originBoardId === 1, r.err || wire(mark));
  mark = log.length;
  r = await runSql(`UPDATE ${P}.agile.sprints SET goal = 'changed' WHERE sprint_id = '${sprintId}'`);
  check('sprint UPDATE is the POST partial update', !r.err && apiCalls(mark, 'POST', `/rest/agile/1.0/sprint/${sprintId}`)[0]?.body?.goal === 'changed', r.err || wire(mark));
  r = await runSql(`DELETE FROM ${P}.agile.sprints WHERE sprint_id = '${sprintId}'`);
  check('sprint DELETE', !r.err && !state.sprints.has(String(sprintId)), r.err);
} finally {
  server.close();
}

const failed = results.filter((x) => !x.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (failed.length) {
  console.log('FAILED:');
  for (const f of failed) console.log(`  - ${f.name}`);
  process.exit(1);
}
