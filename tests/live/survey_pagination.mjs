#!/usr/bin/env node

// Live, read-only survey of where each PageBean read's next-page URL points.
//
// Jira's PageBean responses ({self, nextPage, isLast, values}) carry the URL
// of the next page. stackql can follow it (pagination with responseToken
// $.nextPage and a request-level token), but only if the URL is reachable
// with the caller's credentials: through the API gateway
// (https://api.atlassian.com/ex/jira/<cloud id>/...) the gateway host comes
// back for reads served by Jira itself, while some reads served by separate
// Atlassian services (workflow search, measured 2026-11-25) answer with
// their internal host, which the gateway token cannot reach.
//
// For every mapped GET whose inventory pagination scheme is next_page_url,
// this script calls the read once with maxResults=1, filling path and
// required query parameters from a few discovery reads, and records the host
// of nextPage (or, when the read has one page, of self - the vendor builds
// both from the same base). Writes provider-dev/config/pagination_survey.json;
// post_process.mjs enables next-page-URL pagination only where the verdict
// is "gateway". Reads the survey could not call stay parameter-driven
// (startAt / maxResults as WHERE keys).
//
// Credentials as the provider reads them: ATLASSIAN_CLIENT_ID,
// ATLASSIAN_CLIENT_SECRET, ATLASSIAN_CLOUD_ID. Never point it at a
// production site. Paced at one request every 300 ms.
//
// Usage: node tests/live/survey_pagination.mjs [--dry-run]

import fs from 'fs';
import path from 'path';
import { CONFIG_DIR, parseCsv } from '../../provider-dev/scripts/lib/spec_helpers.mjs';

const OUT = path.join(CONFIG_DIR, 'pagination_survey.json');
const GATEWAY = 'api.atlassian.com';
const DELAY_MS = 300;
const dryRun = process.argv.includes('--dry-run');

for (const v of ['ATLASSIAN_CLIENT_ID', 'ATLASSIAN_CLIENT_SECRET', 'ATLASSIAN_CLOUD_ID']) {
  if (!process.env[v]) { console.error(`survey_pagination: ${v} is not set (source .env)`); process.exit(2); }
}
const base = `https://${GATEWAY}/ex/jira/${process.env.ATLASSIAN_CLOUD_ID}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function token() {
  const res = await fetch('https://auth.atlassian.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: process.env.ATLASSIAN_CLIENT_ID, client_secret: process.env.ATLASSIAN_CLIENT_SECRET })
  });
  if (!res.ok) throw new Error(`token request answered ${res.status}`);
  return (await res.json()).access_token;
}
const bearer = await token();

async function get(pathAndQuery) {
  await sleep(DELAY_MS);
  const res = await fetch(base + pathAndQuery, { headers: { Authorization: `Bearer ${bearer}`, Accept: 'application/json' } });
  let body = null;
  try { body = await res.json(); } catch { body = null; }
  return { status: res.status, body };
}
const first = (body, key = 'values') => (Array.isArray(body) ? body[0] : body?.[key]?.[0]) || null;

// ---- discovery: the identifiers the surveyed reads are addressed by --------
const ctx = {};
const discover = async (name, pathAndQuery, pick) => {
  const { status, body } = await get(pathAndQuery);
  const v = status === 200 ? pick(body) : null;
  if (v !== null && v !== undefined) ctx[name] = String(v);
};
await discover('project', '/rest/api/3/project/search?maxResults=1', (b) => first(b));
const project = ctx.project ? JSON.parse(JSON.stringify(ctx.project)) : null;
void project;
{
  const { body } = await get('/rest/api/3/project/search?maxResults=1');
  const p = first(body);
  if (p) { ctx.projectIdOrKey = p.key; ctx.projectKeyOrId = p.key; ctx.projectId = p.id; }
}
await discover('fieldId', '/rest/api/3/field/search?type=custom&maxResults=1', (b) => first(b)?.id);
if (ctx.fieldId) await discover('contextId', `/rest/api/3/field/${ctx.fieldId}/context?maxResults=1`, (b) => first(b)?.id);
await discover('fieldSchemeId', '/rest/api/3/config/fieldschemes?maxResults=1', (b) => first(b)?.id);
await discover('fieldConfigurationId', '/rest/api/3/fieldconfiguration?maxResults=1', (b) => first(b)?.id);
await discover('schemeId', '/rest/api/3/priorityscheme?maxResults=1', (b) => first(b)?.id);
await discover('issueTypeScreenSchemeId', '/rest/api/3/issuetypescreenscheme?maxResults=1', (b) => first(b)?.id);
await discover('issueSecuritySchemeId', '/rest/api/3/issuesecurityschemes/search?maxResults=1', (b) => first(b)?.id);
await discover('groupId', '/rest/api/3/group/bulk?maxResults=1', (b) => first(b)?.groupId);
await discover('accountId', '/rest/api/3/myself', (b) => b?.accountId);
await discover('issueIdOrKey', `/rest/api/3/search/jql?jql=${encodeURIComponent('created >= -3650d ORDER BY created DESC')}&maxResults=1&fields=summary`, (b) => b?.issues?.[0]?.key);

// path parameter -> context key, per path (the vendor reuses names like {id})
const pathParamValue = (pathKey, name) => {
  if (name === 'id' && pathKey.includes('/config/fieldschemes/')) return ctx.fieldSchemeId;
  if (name === 'id' && pathKey.includes('/fieldconfiguration/')) return ctx.fieldConfigurationId;
  return ctx[name];
};
// required query parameters the surveyed reads declare
const REQUIRED_QUERY = {
  '/rest/api/3/issuetypescheme/project': () => ctx.projectId && `projectId=${ctx.projectId}`,
  '/rest/api/3/issuetypescreenscheme/project': () => ctx.projectId && `projectId=${ctx.projectId}`,
  '/rest/api/3/fieldconfigurationscheme/project': () => ctx.projectId && `projectId=${ctx.projectId}`,
  '/rest/api/3/config/fieldschemes/projects': () => ctx.projectId && `projectId=${ctx.projectId}`,
  '/rest/api/3/issuesecurityschemes/project': () => ctx.issueSecuritySchemeId && `issueSecuritySchemeId=${ctx.issueSecuritySchemeId}`,
  '/rest/api/3/notificationscheme/project': () => '',
  '/rest/api/3/group/member': () => ctx.groupId && `groupId=${ctx.groupId}`,
  '/rest/api/3/user/bulk': () => ctx.accountId && `accountId=${ctx.accountId}`,
  '/rest/api/3/user/search/query': () => `query=${encodeURIComponent('is assignee of KAN')}`,
  '/rest/api/3/user/search/query/key': () => `query=${encodeURIComponent('is assignee of KAN')}`,
  '/rest/api/3/projects/fields': () => ctx.projectId && `projectId=${ctx.projectId}&workTypeId=10003`,
  '/rest/api/3/component': () => ctx.projectId && `projectIdsOrKeys=${ctx.projectId}`
};

// ---- the reads to survey, from the committed inventory ---------------------
const inv = parseCsv(fs.readFileSync(path.join(CONFIG_DIR, 'endpoint_inventory.csv'), 'utf8'));
const col = Object.fromEntries(inv[0].map((h, i) => [h, i]));
const targets = inv.slice(1)
  .filter((r) => !r[col.skip_reason] && r[col.verb] === 'GET' && r[col.pagination_scheme] === 'next_page_url')
  .map((r) => r[col.path])
  .sort();

const results = {};
for (const pathKey of targets) {
  const key = `GET ${pathKey}`;
  let unresolved = null;
  const filled = pathKey.replace(/\{([^}]+)\}/g, (m, name) => {
    const v = pathParamValue(pathKey, name);
    if (!v) unresolved = name;
    return encodeURIComponent(v || '');
  });
  if (unresolved) { results[key] = { verdict: 'unsurveyed', reason: `no value for {${unresolved}} on the survey site` }; continue; }
  const extra = REQUIRED_QUERY[pathKey] ? REQUIRED_QUERY[pathKey]() : '';
  if (extra === undefined || extra === null || extra === false) { results[key] = { verdict: 'unsurveyed', reason: 'no value for a required query parameter on the survey site' }; continue; }
  const { status, body } = await get(`${filled}?maxResults=1${extra ? `&${extra}` : ''}`);
  if (status !== 200 || !body || typeof body !== 'object') { results[key] = { verdict: 'unsurveyed', reason: `answered ${status}` }; continue; }
  const hostOf = (u) => { try { return new URL(u).host; } catch { return null; } };
  const nextHost = body.nextPage ? hostOf(body.nextPage) : null;
  const selfHost = body.self ? hostOf(body.self) : null;
  const observed = nextHost || selfHost;
  const evidence = nextHost ? 'nextPage' : selfHost ? 'self' : 'none';
  let verdict;
  if (!observed) verdict = 'unsurveyed';
  else if (observed === GATEWAY) verdict = 'gateway';
  else verdict = 'other_host';
  results[key] = { verdict, evidence, host: observed || null, ...(verdict === 'unsurveyed' ? { reason: 'the response carried neither nextPage nor self' } : {}) };
}

const summary = {};
for (const r of Object.values(results)) summary[r.verdict] = (summary[r.verdict] || 0) + 1;
const previous = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : null;
const unchanged = previous && JSON.stringify(previous.results) === JSON.stringify(results);
const out = {
  description: 'Where each PageBean read\'s next-page URL points, measured through the API gateway by tests/live/survey_pagination.mjs (make survey-pagination). post_process.mjs enables next-page-URL pagination only on reads whose verdict is gateway; other_host and unsurveyed reads stay parameter-driven (startAt / maxResults).',
  surveyed: unchanged ? previous.surveyed : new Date().toISOString().slice(0, 10),
  summary,
  results
};
console.log(`Surveyed ${targets.length} reads: ${Object.entries(summary).map(([k, n]) => `${k} ${n}`).join(', ')}`);
for (const [k, r] of Object.entries(results)) if (r.verdict !== 'gateway') console.log(`  ${r.verdict.padEnd(11)} ${k}${r.host ? ` (${r.host})` : ''}${r.reason ? ` - ${r.reason}` : ''}`);
if (dryRun) { console.log('(dry run - nothing written)'); process.exit(0); }
fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
console.log(`${unchanged ? 'Unchanged' : 'Written'}: ${path.relative(process.cwd(), OUT)}`);
