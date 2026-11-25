#!/usr/bin/env node

// Mock Jira Cloud API for integration-testing the generated provider without
// a site. Serves the wire shapes the real API produces (captured from a
// trial site through the API gateway on 2026-11-25 and redacted):
//
//   - the OAuth2 token endpoint (client credentials, form or basic client
//     authentication) and bearer enforcement on every gateway call, with the
//     gateway's 401 body
//   - the gateway prefix /ex/jira/<cloud id>; an unknown cloud id is a 404
//   - the public site endpoint /_edge/tenant_info (no credential), reached
//     as /_site/<site>/_edge/tenant_info because the test registry rewrites
//     the https://{site}.atlassian.net server template to the mock
//   - PageBean pages ({startAt, maxResults, total, isLast, values}) WITHOUT
//     nextPage, as most live PageBean reads answer; token pages
//     ({issues, nextPageToken, isLast}); offset pages with total only
//     (comments); bare arrays; a page of strings (labels); a bare-text scalar
//   - the issue, comment, version and sprint lifecycles with mutable stores,
//     transitions, the 204 empty bodies, a 303 redirect to a task
//   - the vendor's error envelope ({errorMessages, errors})
//
// Every request is appended to `log` (method, path relative to the gateway
// or site root, query, headers, parsed body, raw body) so the runner can
// assert wire calls.
//
// Exports startMockServer() for the test runner; also runnable standalone:
//   node tests/integration/mock_jira_server.mjs [port]

import http from 'http';
import { URL } from 'url';

export const CLIENT_ID = 'mock-client-id';
export const CLIENT_SECRET = 'mock-client-secret';
export const ACCESS_TOKEN = 'mock-access-token';
export const CLOUD_ID = '11111111-2222-4333-8444-555555555555';
export const OTHER_CLOUD_ID = '99999999-8888-4777-8666-555555555555';
export const SITE = 'acme';
export const ACCOUNT_ID = '712020:00000000-1111-2222-3333-444444444444';
export const PROJECT_KEY = 'SQLUAT';

const errorBody = (msg, errors = {}) => ({ errorMessages: [msg], errors });

function makeState() {
  const projects = [
    { id: '10000', key: 'KAN', name: 'Kanban', projectTypeKey: 'software', description: 'Team board', style: 'classic', isPrivate: false },
    { id: '10001', key: 'SQLUAT', name: 'StackQL UAT', projectTypeKey: 'software', description: 'Smoke project', style: 'classic', isPrivate: false },
    { id: '10002', key: 'OPS', name: 'Operations', projectTypeKey: 'business', description: 'Ops work', style: 'classic', isPrivate: false }
  ];
  const statuses = { todo: { id: '10000', name: 'To Do', statusCategory: { key: 'new' } }, doing: { id: '3', name: 'In Progress', statusCategory: { key: 'indeterminate' } }, done: { id: '10001', name: 'Done', statusCategory: { key: 'done' } } };
  const issues = new Map();
  let n = 0;
  for (const [summary, status] of [['First seeded issue', 'todo'], ['Second seeded issue', 'doing'], ['Third seeded issue', 'done']]) {
    n++;
    issues.set(`SQLUAT-${n}`, { id: String(20000 + n), key: `SQLUAT-${n}`, fields: { summary, status: statuses[status], issuetype: { id: '10003', name: 'Task' }, project: { id: '10001', key: 'SQLUAT' }, labels: [], created: `2026-11-0${n}T10:00:00.000+0000`, description: null } });
  }
  return {
    projects, statuses, issues, nextIssue: n + 1,
    comments: new Map(), nextComment: 30000,
    versions: new Map([['40000', { id: '40000', name: 'v1.0', projectId: 10001, released: false, archived: false, description: 'seed' }]]), nextVersion: 40001,
    sprints: new Map([['5', { id: 5, name: 'Sprint 1', state: 'active', originBoardId: 1, goal: '' }]]), nextSprint: 6,
    priorities: ['Highest', 'High', 'Medium', 'Low', 'Lowest'].map((name, i) => ({ id: String(i + 1), name, statusColor: '#000000', isDefault: name === 'Medium' })),
    boards: [1, 2, 3].map((id) => ({ id, name: `Board ${id}`, type: id === 1 ? 'kanban' : 'scrum' })),
    fieldDeletes: 0,
    properties: new Map()
  };
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------

function send(res, status, body, headers = {}) {
  const h = { 'Content-Type': 'application/json;charset=UTF-8', ...headers };
  if (body === undefined || body === null) { res.writeHead(status, h); res.end(); return; }
  const text = typeof body === 'string' ? body : JSON.stringify(body);
  res.writeHead(status, h);
  res.end(text);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (c) => { data += c; });
    req.on('end', () => resolve(data));
  });
}

function parseBody(raw, contentType) {
  if (!raw) return null;
  if ((contentType || '').includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(raw));
  try { return JSON.parse(raw); } catch { return raw; }
}

// a PageBean page: no nextPage, as most live PageBean reads answer
function pageBean(all, query, key = 'values', defaultMax = 50) {
  const startAt = parseInt(query.startAt || '0', 10);
  const maxResults = parseInt(query.maxResults || String(defaultMax), 10);
  const values = all.slice(startAt, startAt + maxResults);
  return { maxResults, startAt, total: all.length, isLast: startAt + values.length >= all.length, [key]: values };
}

function issueView(issue, query) {
  const wanted = query.fields ? query.fields.split(',') : null;
  const fields = wanted ? Object.fromEntries(Object.entries(issue.fields).filter(([k]) => wanted.includes(k))) : issue.fields;
  return { expand: 'renderedFields,names,schema,operations,editmeta,changelog,versionedRepresentations', id: issue.id, key: issue.key, self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/issue/${issue.id}`, fields };
}

function projectView(p, query) {
  const expand = (query.expand || '').split(',');
  const out = { expand: 'description,lead,issueTypes,url,projectKeys,permissions,insight', self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/project/${p.id}`, id: p.id, key: p.key, name: p.name, projectTypeKey: p.projectTypeKey, style: p.style, isPrivate: p.isPrivate, simplified: false };
  if (expand.includes('description')) out.description = p.description;
  if (expand.includes('lead')) out.lead = { accountId: ACCOUNT_ID, displayName: 'stackql' };
  return out;
}

// ---------------------------------------------------------------------------
// Routes: [method, regex on the path below /ex/jira/<cloud id>, handler]
// ---------------------------------------------------------------------------

function routes(state) {
  const A = '/rest/api/3';
  const AG = '/rest/agile/1.0';
  const SW = '/rest/software/1.0';
  const findProject = (k) => state.projects.find((p) => p.key === k || p.id === k);
  return [
    ['GET', new RegExp(`^${A}/myself$`), () => [200, { self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/user?accountId=${ACCOUNT_ID}`, accountId: ACCOUNT_ID, accountType: 'app', displayName: 'stackql', active: true, timeZone: 'Etc/UTC', locale: 'en_US' }]],
    ['GET', new RegExp(`^${A}/serverInfo$`), () => [200, { baseUrl: `https://${SITE}.atlassian.net`, version: '1001.0.0-SNAPSHOT', versionNumbers: [1001, 0, 0], deploymentType: 'Cloud', buildNumber: 100296, serverTitle: 'Jira', defaultLocale: { locale: 'en_US' }, serverTimeZone: 'Etc/UTC' }]],
    ['GET', new RegExp(`^${A}/mypermissions$`), (m, q) => {
      if (!q.permissions) return [400, errorBody("The 'permissions' query parameter is required.")];
      const permissions = Object.fromEntries(q.permissions.split(',').map((k) => [k, { id: '1', key: k, name: k, type: 'PROJECT', description: k, havePermission: true }]));
      return [200, { permissions }];
    }],
    // projects
    ['GET', new RegExp(`^${A}/project/search$`), (m, q) => [200, { self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/project/search`, ...pageBean(state.projects.map((p) => projectView(p, q)), q) }]],
    ['GET', new RegExp(`^${A}/project/([^/]+)$`), (m, q) => { const p = findProject(m[1]); return p ? [200, projectView(p, q)] : [404, errorBody('No project could be found with key \'' + m[1] + '\'.')]; }],
    ['POST', new RegExp(`^${A}/project$`), (m, q, body) => {
      const id = String(10000 + state.projects.length);
      state.projects.push({ id, key: body.key, name: body.name, projectTypeKey: body.projectTypeKey, description: body.description || '', style: 'classic', isPrivate: false });
      return [201, { self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/project/${id}`, id: Number(id), key: body.key }];
    }],
    ['PUT', new RegExp(`^${A}/project/([^/]+)$`), (m, q, body) => { const p = findProject(m[1]); if (!p) return [404, errorBody('No project')]; Object.assign(p, body); return [200, projectView(p, { expand: 'description' })]; }],
    ['DELETE', new RegExp(`^${A}/project/([^/]+)$`), (m) => { const i = state.projects.findIndex((p) => p.key === m[1] || p.id === m[1]); if (i < 0) return [404, errorBody('No project')]; state.projects.splice(i, 1); return [204, null]; }],
    ['GET', new RegExp(`^${A}/projectvalidate/validProjectKey$`), (m, q) => [200, `${(q.key || 'ABC').toUpperCase()}1`, { 'Content-Type': 'application/json;charset=UTF-8' }]],
    // issue types, priorities, labels
    ['GET', new RegExp(`^${A}/issuetype$`), () => [200, [{ id: '10003', name: 'Task', subtask: false, hierarchyLevel: 0 }, { id: '10002', name: 'Subtask', subtask: true, hierarchyLevel: -1 }, { id: '10001', name: 'Epic', subtask: false, hierarchyLevel: 1 }]]],
    ['GET', new RegExp(`^${A}/priority/search$`), (m, q) => [200, pageBean(state.priorities, q)]],
    ['GET', new RegExp(`^${A}/label$`), (m, q) => [200, pageBean(['backend', 'frontend', 'stackql-smoke'], q, 'values', 1000)]],
    // issue search: token pages
    ['GET', new RegExp(`^${A}/search/jql$`), (m, q) => {
      if (!q.jql) return [400, errorBody('Unbounded JQL queries are not allowed here. Please add a search restriction to your query.')];
      const all = [...state.issues.values()].filter((i) => q.jql.includes(i.fields.project.key)).sort((a, b) => (a.key < b.key ? -1 : 1));
      const start = q.nextPageToken ? parseInt(Buffer.from(q.nextPageToken, 'base64').toString(), 10) : 0;
      const max = parseInt(q.maxResults || '2', 10);
      const slice = all.slice(start, start + max);
      const more = start + slice.length < all.length;
      return [200, { issues: slice.map((i) => issueView(i, q)), ...(more ? { nextPageToken: Buffer.from(String(start + max)).toString('base64') } : {}), isLast: !more }];
    }],
    ['POST', new RegExp(`^${A}/search/jql$`), (m, q, body) => {
      const b = body || {};
      if (!b.jql) return [400, errorBody('Unbounded JQL queries are not allowed here. Please add a search restriction to your query.')];
      const all = [...state.issues.values()].filter((i) => b.jql.includes(i.fields.project.key)).sort((x, y) => (x.key < y.key ? -1 : 1));
      const start = b.nextPageToken ? parseInt(Buffer.from(b.nextPageToken, 'base64').toString(), 10) : 0;
      const max = parseInt(b.maxResults || '2', 10);
      const slice = all.slice(start, start + max);
      const more = start + slice.length < all.length;
      const fields = Array.isArray(b.fields) && !b.fields.includes('*navigable') && !b.fields.includes('*all') ? b.fields.join(',') : undefined;
      // without fields the API answers {id} only
      const view = (i) => (b.fields ? issueView(i, { fields }) : { id: i.id });
      return [200, { issues: slice.map(view), ...(more ? { nextPageToken: Buffer.from(String(start + max)).toString('base64') } : {}), isLast: !more }];
    }],
    // issues
    ['POST', new RegExp(`^${A}/issue$`), (m, q, body) => {
      if (!body || typeof body.fields !== 'object' || body.fields === null) return [400, errorBody('fields must be an object', { fields: 'fields is required' })];
      const f = body.fields;
      const key = `${f.project?.key || PROJECT_KEY}-${state.nextIssue++}`;
      const id = String(20000 + state.nextIssue);
      state.issues.set(key, { id, key, fields: { summary: f.summary, status: state.statuses.todo, issuetype: f.issuetype, project: { key: f.project?.key }, labels: f.labels || [], created: '2026-11-25T10:00:00.000+0000', description: f.description || null } });
      return [201, { id, key, self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/issue/${id}` }];
    }],
    ['GET', new RegExp(`^${A}/issue/([^/]+)$`), (m, q) => { const i = state.issues.get(m[1]); return i ? [200, issueView(i, q)] : [404, errorBody('Issue does not exist or you do not have permission to see it.')]; }],
    ['PUT', new RegExp(`^${A}/issue/([^/]+)$`), (m, q, body) => {
      const i = state.issues.get(m[1]);
      if (!i) return [404, errorBody('Issue does not exist or you do not have permission to see it.')];
      if (body?.fields && typeof body.fields !== 'object') return [400, errorBody('fields must be an object')];
      Object.assign(i.fields, body?.fields || {});
      return [204, null];
    }],
    ['DELETE', new RegExp(`^${A}/issue/([^/]+)$`), (m) => (state.issues.delete(m[1]) ? [204, null] : [404, errorBody('Issue does not exist or you do not have permission to see it.')])],
    ['GET', new RegExp(`^${A}/issue/([^/]+)/transitions$`), () => [200, { expand: 'transitions', transitions: [{ id: '11', name: 'To Do', to: state.statuses.todo, isAvailable: true }, { id: '21', name: 'In Progress', to: state.statuses.doing, isAvailable: true }, { id: '31', name: 'Done', to: state.statuses.done, isAvailable: true }] }]],
    ['POST', new RegExp(`^${A}/issue/([^/]+)/transitions$`), (m, q, body) => {
      const i = state.issues.get(m[1]);
      if (!i) return [404, errorBody('Issue does not exist or you do not have permission to see it.')];
      const to = { 11: 'todo', 21: 'doing', 31: 'done' }[body?.transition?.id];
      if (!to) return [400, errorBody('Transition id is not valid for this issue.')];
      i.fields.status = state.statuses[to];
      return [204, null];
    }],
    ['PUT', new RegExp(`^${A}/issue/([^/]+)/assignee$`), (m, q, body) => { const i = state.issues.get(m[1]); if (!i) return [404, errorBody('Issue does not exist')]; i.fields.assignee = body?.accountId ? { accountId: body.accountId } : null; return [204, null]; }],
    // comments: offset pages with total only
    ['GET', new RegExp(`^${A}/issue/([^/]+)/comment$`), (m, q) => {
      const { isLast, ...page } = pageBean([...state.comments.values()].filter((c) => c.issue === m[1]).map(({ issue, ...c }) => c), q, 'comments', 2);
      return [200, page]; // PageOfComments: total, no isLast
    }],
    ['POST', new RegExp(`^${A}/issue/([^/]+)/comment$`), (m, q, body) => {
      if (!body || typeof body.body !== 'object' || body.body === null) return [400, errorBody('Comment body is not valid!', { comment: 'Comment body must be an Atlassian Document Format object.' })];
      const id = String(state.nextComment++);
      const c = { id, issue: m[1], body: body.body, author: { accountId: ACCOUNT_ID }, created: '2026-11-25T10:00:00.000+0000', updated: '2026-11-25T10:00:00.000+0000' };
      state.comments.set(id, c);
      const { issue, ...out } = c;
      return [201, out];
    }],
    ['GET', new RegExp(`^${A}/issue/([^/]+)/comment/([^/]+)$`), (m) => { const c = state.comments.get(m[2]); if (!c) return [404, errorBody('Can not find a comment for the id: ' + m[2] + '.')]; const { issue, ...out } = c; return [200, out]; }],
    ['PUT', new RegExp(`^${A}/issue/([^/]+)/comment/([^/]+)$`), (m, q, body) => { const c = state.comments.get(m[2]); if (!c) return [404, errorBody('Can not find a comment')]; if (typeof body?.body !== 'object') return [400, errorBody('Comment body is not valid!')]; c.body = body.body; const { issue, ...out } = c; return [200, out]; }],
    ['DELETE', new RegExp(`^${A}/issue/([^/]+)/comment/([^/]+)$`), (m) => (state.comments.delete(m[2]) ? [204, null] : [404, errorBody('Can not find a comment')])],
    // versions
    ['GET', new RegExp(`^${A}/project/([^/]+)/version$`), (m, q) => { const p = findProject(m[1]); return [200, pageBean([...state.versions.values()].filter((v) => String(v.projectId) === p?.id), q)]; }],
    ['POST', new RegExp(`^${A}/version$`), (m, q, body) => { const id = String(state.nextVersion++); const v = { id, self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/version/${id}`, name: body.name, projectId: body.projectId, released: !!body.released, archived: false, description: body.description || '' }; state.versions.set(id, v); return [201, v]; }],
    ['GET', new RegExp(`^${A}/version/([^/]+)$`), (m) => { const v = state.versions.get(m[1]); return v ? [200, v] : [404, errorBody('Could not find version for id \'' + m[1] + '\'')]; }],
    ['PUT', new RegExp(`^${A}/version/([^/]+)$`), (m, q, body) => { const v = state.versions.get(m[1]); if (!v) return [404, errorBody('Could not find version')]; Object.assign(v, body); return [200, v]; }],
    ['DELETE', new RegExp(`^${A}/version/([^/]+)$`), (m) => (state.versions.delete(m[1]) ? [204, null] : [404, errorBody('Could not find version')])],
    // project properties: the value is the whole body
    ['PUT', new RegExp(`^${A}/project/([^/]+)/properties/([^/]+)$`), (m, q, body, raw) => {
      if (!raw) return [400, errorBody('The property value cannot be empty.')];
      let value;
      try { value = JSON.parse(raw); } catch { return [400, errorBody('The property value must be valid JSON.')]; }
      const k = `${m[1]}/${m[2]}`;
      const existed = state.properties.has(k);
      state.properties.set(k, value);
      return [existed ? 200 : 201, null];
    }],
    ['GET', new RegExp(`^${A}/project/([^/]+)/properties$`), (m) => [200, { keys: [...state.properties.keys()].filter((k) => k.startsWith(`${m[1]}/`)).map((k) => ({ key: k.split('/')[1], self: k })) }]],
    ['GET', new RegExp(`^${A}/project/([^/]+)/properties/([^/]+)$`), (m) => { const k = `${m[1]}/${m[2]}`; return state.properties.has(k) ? [200, { key: m[2], value: state.properties.get(k) }] : [404, errorBody('The property was not found.')]; }],
    ['DELETE', new RegExp(`^${A}/project/([^/]+)/properties/([^/]+)$`), (m) => (state.properties.delete(`${m[1]}/${m[2]}`) ? [204, null] : [404, errorBody('The property was not found.')])],
    // asynchronous delete: 303 to the task
    ['DELETE', new RegExp(`^${A}/field/([^/]+)$`), () => { state.fieldDeletes++; return [303, null, { Location: `/ex/jira/${CLOUD_ID}/rest/api/3/task/10100` }]; }],
    ['GET', new RegExp(`^${A}/task/([^/]+)$`), (m) => [200, { self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/api/3/task/${m[1]}`, id: m[1], description: 'Delete field', status: 'COMPLETE', message: 'Done', result: null, submittedBy: 10000, progress: 100, elapsedRuntime: 12, submitted: 1, started: 2, finished: 14, lastUpdate: 14 }]],
    // agile
    ['GET', new RegExp(`^${AG}/board$`), (m, q) => [200, pageBean(state.boards, q, 'values', 2)]],
    ['GET', new RegExp(`^${AG}/board/([^/]+)$`), (m) => { const b = state.boards.find((x) => String(x.id) === m[1]); return b ? [200, b] : [404, errorBody('Board does not exist or you do not have permission to see it.')]; }],
    ['GET', new RegExp(`^${SW}/board/([^/]+)/issue$`), (m, q) => {
      const all = [...state.issues.values()];
      const start = q.nextPageToken ? parseInt(q.nextPageToken.replace('tok-', ''), 10) : 0;
      const max = parseInt(q.maxResults || '2', 10);
      const slice = all.slice(start, start + max);
      const more = start + slice.length < all.length;
      return [200, { issues: slice.map((i) => issueView(i, q)), ...(more ? { nextPageToken: `tok-${start + max}` } : {}), isLast: !more }];
    }],
    ['POST', new RegExp(`^${AG}/sprint$`), (m, q, body) => { const id = state.nextSprint++; const s = { id, self: `https://api.atlassian.com/ex/jira/${CLOUD_ID}/rest/agile/1.0/sprint/${id}`, name: body.name, state: 'future', originBoardId: body.originBoardId, goal: body.goal || '' }; state.sprints.set(String(id), s); return [201, s]; }],
    ['GET', new RegExp(`^${AG}/sprint/([^/]+)$`), (m) => { const s = state.sprints.get(m[1]); return s ? [200, s] : [404, errorBody('Sprint does not exist')]; }],
    ['POST', new RegExp(`^${AG}/sprint/([^/]+)$`), (m, q, body) => { const s = state.sprints.get(m[1]); if (!s) return [404, errorBody('Sprint does not exist')]; Object.assign(s, body); return [200, s]; }],
    ['DELETE', new RegExp(`^${AG}/sprint/([^/]+)$`), (m) => (state.sprints.delete(m[1]) ? [204, null] : [404, errorBody('Sprint does not exist')])]
  ];
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

export function startMockServer(port = 0) {
  const state = makeState();
  const log = [];
  const table = routes(state);
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://mock');
    const raw = await readBody(req);
    const body = parseBody(raw, req.headers['content-type']);
    const query = Object.fromEntries(url.searchParams);
    const entry = { method: req.method, rawPath: url.pathname, path: url.pathname, query, headers: req.headers, authorization: req.headers.authorization || null, contentType: req.headers['content-type'] || null, body, raw };

    // OAuth2 token endpoint (client credentials; form body or basic header)
    if (url.pathname === '/oauth/token' && req.method === 'POST') {
      entry.kind = 'token';
      log.push(entry);
      let id = body?.client_id, secret = body?.client_secret;
      const basic = (req.headers.authorization || '').match(/^Basic (.+)$/i);
      if (basic) [id, secret] = Buffer.from(basic[1], 'base64').toString().split(':');
      if (body?.grant_type !== 'client_credentials' || id !== CLIENT_ID || secret !== CLIENT_SECRET) return send(res, 401, { error: 'access_denied', error_description: 'Unauthorized' });
      return send(res, 200, { access_token: ACCESS_TOKEN, expires_in: 3600, token_type: 'Bearer', scope: 'read:jira-work write:jira-work read:jira-user manage:jira-project manage:jira-configuration' });
    }

    // public site endpoint
    let m = url.pathname.match(/^\/_site\/([^/]+)(\/.*)$/);
    if (m) {
      entry.kind = 'site';
      entry.site = m[1];
      entry.path = m[2];
      log.push(entry);
      if (m[2] !== '/_edge/tenant_info' || req.method !== 'GET') return send(res, 404, '<html>Not Found</html>', { 'Content-Type': 'text/html' });
      if (m[1] !== SITE) return send(res, 404, { errorMessage: 'Site temporarily unavailable', errorCode: 'OTHER' });
      return send(res, 200, { cloudId: CLOUD_ID });
    }

    // API gateway
    m = url.pathname.match(/^\/ex\/jira\/([^/]+)(\/.*)$/);
    if (!m) { log.push({ ...entry, kind: 'unknown' }); return send(res, 404, '<html>Not Found</html>', { 'Content-Type': 'text/html' }); }
    entry.kind = 'api';
    entry.cloudId = m[1];
    entry.path = m[2];
    log.push(entry);
    if (req.headers.authorization !== `Bearer ${ACCESS_TOKEN}`) return send(res, 401, { code: 401, message: 'Unauthorized; scope does not match' });
    if (m[1] !== CLOUD_ID) return send(res, 404, { errorMessage: 'Site temporarily unavailable', errorCode: 'OTHER' });
    for (const [method, re, handler] of table) {
      if (method !== req.method) continue;
      const mm = entry.path.match(re);
      if (!mm) continue;
      const [status, out, headers] = handler(mm, query, body, raw);
      return send(res, status, out, headers || {});
    }
    return send(res, 404, errorBody(`mock: no route for ${req.method} ${entry.path}`));
  });
  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => resolve({ server, port: server.address().port, log, state }));
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { port } = await startMockServer(parseInt(process.argv[2] || '0', 10));
  console.log(`mock Jira API on http://127.0.0.1:${port}`);
}
