// Shared helpers and the single source of provider constants for every
// pipeline script (record_spec_pin.mjs, bin/split.mjs, build_inventory.mjs,
// map_operations.mjs, pre_normalize.mjs, post_process.mjs, graphql_merge.mjs)
// and the test harnesses. Single-sourced so the inventory and the
// authoritative mapping can never disagree on a classification.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// ---------------------------------------------------------------------------
// Provider constants
// ---------------------------------------------------------------------------

export const PROVIDER_NAME = 'jira';
export const PROVIDER_TITLE = 'Jira';

// Atlassian publishes two OpenAPI 3.0 documents for Jira Cloud: the platform
// REST API v3 and the Jira Software (agile) REST API. Both are pinned under
// specs.<key> in provider-dev/config/spec_pin.json. The software document
// also carries the dev-tool ingestion families (builds, deployments, ...),
// which are app-only and classified into an excluded service.
export const SPECS = [
  { key: 'platform', url: 'https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json', file: 'jira-platform-v3.json' },
  { key: 'software', url: 'https://developer.atlassian.com/cloud/jira/software/swagger.v3.json', file: 'jira-software.json' }
];

// Every Jira REST call goes through the Atlassian API gateway, addressed by
// the site's cloud ID. A service account's OAuth2 token (client credentials)
// is accepted only there, never on https://<site>.atlassian.net; scoped API
// tokens (basic auth) are also gateway-only. The cloud ID is a server
// variable resolved from ATLASSIAN_CLOUD_ID (x-stackQL-envVar).
export const GATEWAY_HOST = 'https://api.atlassian.com';
export const API_BASE_URL = `${GATEWAY_HOST}/ex/jira/{cloud_id}`;
export const CLOUD_ID_VARIABLE = 'cloud_id';
export const CLOUD_ID_ENV_VAR = 'ATLASSIAN_CLOUD_ID';

// The site-level server of the injected atlassian_tenant service (a public,
// unauthenticated endpoint that answers the site's cloud ID).
export const SITE_BASE_URL = 'https://{site}.atlassian.net';

// Server templates by kind (provider-dev/config/servers.json), written into
// each split service document by bin/split.mjs: "gateway" for every Jira
// service, "site" for atlassian_tenant.
export const SERVERS = JSON.parse(fs.readFileSync(path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'config'), 'servers.json'), 'utf8'));

// Path prefixes stripped before resource-name derivation (the API family and
// version segments).
export const API_PREFIXES = ['/rest/api/3', '/rest/agile/1.0', '/rest/software/1.0', '/_edge'];

// Wire casing of parameters and body properties: Jira is camelCase. Every
// method gets request.nativeCasing: camel in post_process and the provider
// config carries snake_case_aliases: true, so the user surface is snake_case.
export const WIRE_CASING = 'camel';

// Envelope keys, in order of preference, that hold the row array of a list
// response. Jira has no single convention: PageBean* objects carry `values`,
// issue search carries `issues`, and many older reads use a keyed array
// (`comments`, `worklogs`, `dashboards`, `transitions`, ...), picked up by the
// "only array-of-objects property" rule in proposeObjectKey.
export const ENVELOPE_KEY_PREFERENCE = ['values', 'issues', 'results', 'records', 'data', 'items'];

export const HTTP_VERBS = ['get', 'post', 'put', 'patch', 'delete'];

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
export const REPO_ROOT = repoRoot;
export const DOWNLOAD_DIR = path.join(repoRoot, 'provider-dev', 'downloaded');
export const CONFIG_DIR = path.join(repoRoot, 'provider-dev', 'config');
export const SOURCE_DIR = path.join(repoRoot, 'provider-dev', 'source');
export const PROVIDER_DIR = path.join(repoRoot, 'provider-dev', 'openapi', 'src', PROVIDER_NAME, 'v00.00.00000');
export const SERVICES_DIR = path.join(PROVIDER_DIR, 'services');
const serviceNamesPath = path.join(CONFIG_DIR, 'service_names.json');

// ---------------------------------------------------------------------------
// Generic utilities
// ---------------------------------------------------------------------------

export function camelToSnake(s) {
  return String(s)
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/[-. ]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
}

export function pathParams(pathKey) {
  return (pathKey.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

export function normalizePath(pathKey) {
  return pathKey.replace(/\{[^}]+\}/g, '{}');
}

export function loadSpec(file) {
  const text = fs.readFileSync(file, 'utf8');
  return /\.ya?ml$/i.test(file) ? yaml.load(text) : JSON.parse(text);
}

export function dumpYaml(doc) {
  return yaml.dump(doc, { lineWidth: -1, noRefs: true });
}

export function specPath(key) {
  const spec = SPECS.find((s) => s.key === key);
  if (!spec) throw new Error(`unknown spec key ${key}`);
  return path.join(DOWNLOAD_DIR, spec.file);
}

// Resolves local $refs against the containing spec document
export function makeResolver(spec) {
  return function resolve(schema, depth = 0) {
    if (!schema || depth > 10) return schema;
    if (schema.$ref) {
      const parts = schema.$ref.replace(/^#\//, '').split('/').map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));
      let node = spec;
      for (const p of parts) node = node?.[p];
      return resolve(node, depth + 1);
    }
    return schema;
  };
}

// ---------------------------------------------------------------------------
// Service resolution from the ordered rules in service_names.json. A rule
// matches when every criterion it states holds: `spec` (platform|software),
// `tags` (the operation's first tag is one of them), `pathRegex` (against the
// full vendor path). First match wins; an unmatched operation is an error
// the caller must surface (fail without writing). Rules with "excluded":
// true classify the operation for the inventory but the service is never
// emitted (every operation in it is app-only).
// ---------------------------------------------------------------------------

export function loadServiceConfig() {
  return JSON.parse(fs.readFileSync(serviceNamesPath, 'utf8'));
}

export function makeServiceResolver() {
  const config = loadServiceConfig();
  const rules = (config.rules || []).map((r, i) => ({
    index: i,
    spec: r.spec || null,
    tags: r.tags ? new Set(r.tags) : null,
    re: r.pathRegex ? new RegExp(r.pathRegex) : null,
    service: r.service,
    excluded: !!r.excluded,
    skip: r.skip || null
  }));
  const excludedServices = new Set(rules.filter((r) => r.excluded).map((r) => r.service));
  const used = new Set();
  const resolveRule = (specKey, pathKey, op) => {
    const tag = (op?.tags || [])[0] || '';
    for (const rule of rules) {
      if (rule.spec && rule.spec !== specKey) continue;
      if (rule.tags && !rule.tags.has(tag)) continue;
      if (rule.re && !rule.re.test(pathKey)) continue;
      used.add(rule.index);
      return rule;
    }
    return null;
  };
  const resolveService = (specKey, pathKey, op) => resolveRule(specKey, pathKey, op)?.service || null;
  const unusedRules = () => rules.filter((r) => !used.has(r.index));
  return { resolveRule, resolveService, excludedServices, rules, services: config.services || {}, unusedRules };
}

// ---------------------------------------------------------------------------
// Response and request classification
// ---------------------------------------------------------------------------

export function success2xx(op) {
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c)).sort();
  for (const code of codes) {
    const content = op.responses[code].content || {};
    const jsonType = Object.keys(content).find((m) => m.includes('json'));
    if (jsonType && content[jsonType].schema) return { code, schema: content[jsonType].schema, mediaTypes: Object.keys(content) };
    if (Object.keys(content).length > 0) return { code, schema: null, mediaTypes: Object.keys(content), example: jsonType ? content[jsonType].example : undefined };
  }
  return { code: codes[0] || null, schema: null, mediaTypes: [] };
}

function propsOf(s, resolve) {
  if (!s) return {};
  const own = s.properties || {};
  const fromAllOf = (s.allOf || []).reduce((acc, part) => ({ ...acc, ...propsOf(resolve(part) || {}, resolve) }), {});
  return { ...fromAllOf, ...own };
}

// An array whose items are objects (row-like). An array of scalars
// (versionNumbers, keys of a map) is not a row array.
function isObjectArray(p, resolve) {
  const r = resolve(p) || {};
  if (!(r.type === 'array' || (r.items && !r.properties))) return false;
  const items = resolve(r.items) || {};
  if (['string', 'integer', 'number', 'boolean'].includes(items.type)) return false;
  return true;
}

// Response shape per the inventory contract:
//   bare-array    - the 2xx body is a JSON array
//   object        - a JSON object; arrayProps lists its top-level arrays of
//                   objects (envelope candidates for objectKey)
//   scalar        - a JSON string/number/boolean
//   untyped-json  - application/json with an empty schema
//   non-json      - an image, text, octet-stream, ...
//   none          - no 2xx content
export function classifyResponse(op, resolve) {
  const { code, schema, mediaTypes } = success2xx(op);
  if (!schema) {
    if (mediaTypes.some((m) => m.includes('json'))) return { shape: 'untyped-json', arrayProps: [], mediaTypes, code };
    if (mediaTypes.length > 0) return { shape: 'non-json', arrayProps: [], mediaTypes, code };
    return { shape: 'none', arrayProps: [], mediaTypes, code };
  }
  const s = resolve(schema) || {};
  if (s.type === 'array' || (s.items && !s.properties)) {
    const items = resolve(s.items) || {};
    const scalarItems = ['string', 'integer', 'number', 'boolean'].includes(items.type);
    return { shape: 'bare-array', scalarItems, arrayProps: [], mediaTypes, code };
  }
  if (['string', 'number', 'integer', 'boolean'].includes(s.type)) return { shape: 'scalar', arrayProps: [], mediaTypes, code };
  if (typeof schema.$ref === 'string' && schema.$ref.endsWith('/StreamingResponseBody')) return { shape: 'non-json', streaming: true, arrayProps: [], mediaTypes, code };
  const props = propsOf(s, resolve);
  if (Object.keys(props).length === 0) {
    if (s.additionalProperties) return { shape: 'map', arrayProps: [], mediaTypes, code };
    return { shape: 'untyped-json', arrayProps: [], mediaTypes, code };
  }
  const arrayProps = Object.entries(props).filter(([, p]) => isObjectArray(p, resolve)).map(([name]) => name);
  return { shape: 'object', arrayProps, props: Object.keys(props), mediaTypes, code };
}

// The objectKey a list read should project: the first preferred envelope key
// present, else the only top-level array-of-objects property, else blank
// (bare arrays are wrapped by normalize + generate and carry no objectKey of
// their own).
export function proposeObjectKey(classification) {
  if (classification.shape !== 'object') return '';
  const { arrayProps } = classification;
  const preferred = ENVELOPE_KEY_PREFERENCE.find((k) => arrayProps.includes(k));
  if (preferred) return `$.${preferred}`;
  if (arrayProps.length === 1) return `$.${arrayProps[0]}`;
  return '';
}

// True when the response carries a row array a list read can project.
export function hasRowArray(classification) {
  return (classification.shape === 'bare-array' && !classification.scalarItems) || proposeObjectKey(classification) !== '';
}

export function classifyBody(op, resolve) {
  if (!op.requestBody) return { present: false, mediaTypes: [], bareArray: false };
  const content = (resolve(op.requestBody) || {}).content || {};
  const mediaTypes = Object.keys(content);
  const jsonType = mediaTypes.find((m) => m.includes('json'));
  const schema = jsonType ? resolve(content[jsonType].schema) : null;
  const bareArray = !!schema && (schema.type === 'array' || (!!schema.items && !schema.properties));
  return { present: true, mediaTypes, bareArray, schema };
}

// PUT is not REPLACE until proven live; Jira documents its PUTs as edits
// ("Edits an issue", "Updates a project") and they behave as partial updates
// for the fields supplied.
export function updateSemantics(verb) {
  if (verb === 'patch') return 'patch-partial-presumed';
  if (verb === 'put') return 'put-partial-presumed';
  return '';
}

// Vendor labels carried into the docs, never hidden. Jira marks experimental
// operations with x-experimental and deprecated ones with deprecated: true.
export function vendorLabels(op) {
  const labels = [];
  if (op['x-experimental']) labels.push('experimental');
  if (op.deprecated) labels.push('deprecated');
  return labels;
}

// Pagination-looking query parameters present on the operation: a
// per-endpoint confirmation for the inventory, never an assumption.
const PAGINATION_PARAM_NAMES = ['startAt', 'maxResults', 'nextPageToken', 'limit', 'offset', 'cursor', 'page', 'pageSize', 'maxResult'];
export function paginationParams(op, pathItem, resolve) {
  return [...(pathItem?.parameters || []), ...(op.parameters || [])]
    .map((p) => resolve(p))
    .filter((p) => p && p.in === 'query')
    .map((p) => p.name)
    .filter((n) => PAGINATION_PARAM_NAMES.includes(n));
}

// The pagination scheme a read's response declares:
//   next_page_token  - {nextPageToken, ...} in the response and a nextPageToken
//                      query parameter (issue search, bulk changelogs)
//   next_page_url    - a PageBean ({isLast, nextPage, values}) or another
//                      object with a `nextPage` / `next` URL property
//   offset           - startAt / maxResults (or offset / limit) with no next
//                      marker (parameter-driven windowing)
//   none
export function paginationScheme(op, pathItem, resolve) {
  const resp = classifyResponse(op, resolve);
  const params = paginationParams(op, pathItem, resolve);
  if (resp.shape !== 'object') return params.length ? 'offset' : 'none';
  const props = new Set(resp.props || []);
  if (props.has('nextPageToken') && params.includes('nextPageToken')) return 'next_page_token';
  if (props.has('nextPage')) return 'next_page_url';
  if (props.has('next') && !props.has('nextPageToken')) return 'next_url';
  if (params.length) return 'offset';
  return 'none';
}

// ---------------------------------------------------------------------------
// Skip rules - operations that stay visible in the CSV artifacts but are not
// mapped to StackQL methods. A rule in service_names.json may also carry a
// skip code for a whole tag or path family (app-only surfaces).
// ---------------------------------------------------------------------------

const APP_ONLY_RE = /Only (?:\[?Connect(?:\]\([^)]*\))?(?: apps)?(?: or | and )?(?:\[?(?:Forge|OAuth 2\.0)(?:\]\([^)]*\))?)?|\[?Forge(?:\]\([^)]*\))?) apps? can (?:use|make)/i;

export const SKIP_RULES = [
  // the legacy issue search answers 410 Gone ("The requested API has been
  // removed. Please migrate to the /rest/api/3/search/jql API")
  { code: 'removed_upstream', test: (p) => p === '/rest/api/3/search' },
  // callable only by Connect / Forge / 3LO apps, never by a service account
  // or an API token
  { code: 'app_only', test: (p, op) => APP_ONLY_RE.test(op.description || '') },
  // deprecated operations whose vendor-named replacement is mapped
  { code: 'deprecated_superseded', test: (p, op) => op.deprecated && DEPRECATED_SUPERSEDED.has(`${op.method} ${p}`) },
  // a binary or multipart request body (attachment and avatar uploads, the
  // column-list PUTs that take form data): no JSON body to bind columns to
  { code: 'binary_upload', test: (p, op, body) => body.present && body.mediaTypes.length > 0 && !body.mediaTypes.some((m) => m.includes('json')) },
  // images and streamed file content (avatar views, attachment content and
  // thumbnails declare StreamingResponseBody or image media types)
  { code: 'non_json_response', test: (p, op, body, resp) => resp.shape === 'non-json' || resp.streaming || /\/attachment\/(content|thumbnail)\//.test(p) },
  // a read whose success body has no schema at all: nothing to type columns
  // from (the project classification config reads)
  { code: 'untyped_json_response', test: (p, op, body, resp) => op.method === 'get' && resp.shape === 'untyped-json' },
  // a read that declares no success content at all (the Jira Software
  // board's full project list)
  { code: 'no_response_schema', test: (p, op, body, resp) => op.method === 'get' && resp.shape === 'none' },
  { code: 'head_endpoint', test: (p, op) => op.method === 'head' }
];

// Deprecated reads and writes whose replacement is part of the mapped
// surface (the replacement is named in the vendor's description).
export const DEPRECATED_SUPERSEDED = new Set([
  // board / epic / sprint issue lists -> /rest/software/1.0/...JSIS
  'get /rest/agile/1.0/board/{boardId}/backlog',
  'get /rest/agile/1.0/board/{boardId}/epic/none/issue',
  'get /rest/agile/1.0/board/{boardId}/epic/{epicId}/issue',
  'get /rest/agile/1.0/board/{boardId}/issue',
  'get /rest/agile/1.0/board/{boardId}/sprint/{sprintId}/issue',
  'get /rest/agile/1.0/epic/none/issue',
  'get /rest/agile/1.0/epic/{epicIdOrKey}/issue',
  'get /rest/agile/1.0/sprint/{sprintId}/issue',
  // the legacy issue search POST -> /rest/api/3/search/jql
  'post /rest/api/3/search',
  // -> GET /rest/api/3/project/search
  'get /rest/api/3/project',
  // -> GET /rest/api/3/priority/search
  'get /rest/api/3/priority',
  // -> GET /rest/api/3/resolution/search
  'get /rest/api/3/resolution',
  // -> GET /rest/api/3/workflows/search
  'get /rest/api/3/workflow/search',
  // -> GET /rest/api/3/group/member
  'get /rest/api/3/group',
  // -> GET / PUT /rest/api/3/field/{fieldId}/context/defaultValues
  'get /rest/api/3/field/{fieldId}/context/defaultValue',
  'put /rest/api/3/field/{fieldId}/context/defaultValue',
  // -> GET /rest/api/3/field/{fieldId}/context
  'get /rest/api/3/field/{fieldId}/contexts',
  // -> POST /rest/api/3/expression/evaluate
  'post /rest/api/3/expression/eval',
  // -> GET /rest/api/3/issue/createmeta/{projectIdOrKey}/issuetypes
  'get /rest/api/3/issue/createmeta'
]);

export function skipReason(specKey, pathKey, op, resolve, verb, ruleSkip = null) {
  if (ruleSkip) return ruleSkip;
  const body = classifyBody(op, resolve);
  const resp = classifyResponse(op, resolve);
  const opWithVerb = { ...op, method: verb };
  for (const rule of SKIP_RULES) {
    if (rule.test(pathKey, opWithVerb, body, resp)) return rule.code;
  }
  return '';
}

// ---------------------------------------------------------------------------
// Resource naming: the static segments under the API prefix, snake_cased,
// last pluralized, with a leading segment the service already names dropped
// (lib/mapping.mjs applies it; RESOURCE_RULES in map_operations.mjs are the
// exceptions).
// ---------------------------------------------------------------------------

export function stripApiPrefix(pathKey) {
  for (const prefix of API_PREFIXES) {
    if (pathKey === prefix) return '/';
    if (pathKey.startsWith(prefix + '/')) return pathKey.slice(prefix.length);
  }
  return pathKey;
}

export function staticSegments(pathKey) {
  return stripApiPrefix(pathKey).split('/').filter(Boolean).filter((s) => !s.startsWith('{'));
}

// ---------------------------------------------------------------------------
// Generated-provider helpers (post_process.mjs, tests)
// ---------------------------------------------------------------------------

export function listServiceFiles(dir = SERVICES_DIR) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.yaml')).sort();
}

// Iterate every method of every resource in a generated service document:
// fn(method, {resource, resourceName, methodName, verb, pathKey, operation})
export function forEachMethod(doc, fn) {
  const resources = doc.components?.['x-stackQL-resources'] || {};
  for (const [resourceName, resource] of Object.entries(resources)) {
    for (const [methodName, method] of Object.entries(resource.methods || {})) {
      const ref = method.operation?.$ref || '';
      const m = ref.match(/^#\/paths\/(.+)\/(get|post|put|patch|delete)$/);
      const pathKey = m ? m[1].replace(/~1/g, '/').replace(/~0/g, '~') : null;
      const verb = m ? m[2] : null;
      const operation = pathKey ? doc.paths?.[pathKey]?.[verb] : null;
      fn(method, { resource, resourceName, methodName, verb, pathKey, operation });
    }
  }
}

// The SQL verb a method is bound to (EXEC when absent from every sqlVerbs list)
export function sqlVerbOf(resource, resourceName, methodName) {
  const ref = `#/components/x-stackQL-resources/${resourceName}/methods/${methodName}`;
  for (const [verb, list] of Object.entries(resource.sqlVerbs || {})) {
    if ((list || []).some((x) => x.$ref === ref)) return verb;
  }
  return 'exec';
}

// CSV helpers (RFC 4180, column order preserved)
export function parseCsv(text) {
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

export function csvField(v) {
  const s = v === undefined || v === null ? '' : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
