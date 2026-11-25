#!/usr/bin/env node

// Post-generation fixes for everything the generator cannot express.
// Idempotent (every rule rewrites from the generated state it detects); re-run
// after every generate. Every rule is numbered and commented; the run
// validates and fails without writing.
//
//   1. request.nativeCasing: camel on every method (snake_case surface)
//   2. naive request-body translation on DELETE methods with a body
//   3. scalar reads -> one row with a `value` column
//   4. the label page (strings) -> rows with a `label` column; the
//      permission maps -> one row per permission
//   5. token pagination on reads that answer nextPageToken
//   6. offset pagination on PageBean and other startAt reads: a response
//      transform adds the next startAt while more pages exist, and the
//      pagination block sends it back as startAt
//   7. clause pushdown: LIMIT -> maxResults, OFFSET -> startAt, ORDER BY -> orderBy
//   8. sanity: every service has resources, every resource methods
//   9. entity property writes: send the value column as the raw body
//
// Usage: npm run post-process

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  SERVICES_DIR, PROVIDER_DIR, WIRE_CASING, listServiceFiles, forEachMethod, sqlVerbOf, dumpYaml, makeResolver
} from './lib/spec_helpers.mjs';

if (!fs.existsSync(SERVICES_DIR)) {
  console.error(`Error: ${SERVICES_DIR} not found - run the generate step first`);
  process.exit(1);
}

const docs = new Map();
for (const f of listServiceFiles()) docs.set(f, yaml.load(fs.readFileSync(path.join(SERVICES_DIR, f), 'utf8')));
if (docs.size === 0) {
  console.error('Error: no generated service specs found');
  process.exit(1);
}
const providerPath = path.join(PROVIDER_DIR, 'provider.yaml');
const provider = yaml.load(fs.readFileSync(providerPath, 'utf8'));

const errors = [];
const counts = {};
const bump = (k, n = 1) => { counts[k] = (counts[k] || 0) + n; };
const clone = (o) => JSON.parse(JSON.stringify(o));
const TEXT_TEMPLATE = 'golang_template_text_v0.3.0';
// the synthesized continuation token rule 6 adds to a page
export const NEXT_START_AT = 'stackqlNextStartAt';

// The resolved success schema of a method's operation.
function responseSchema(doc, method, operation) {
  const resolve = makeResolver(doc);
  const code = method.response?.openAPIDocKey || '200';
  const mediaType = method.response?.mediaType || 'application/json';
  const schemaRef = operation?.responses?.[code]?.content?.[mediaType]?.schema;
  return { schemaRef, schema: resolve(schemaRef) || {}, resolve };
}
const queryParams = (operation) => (operation?.parameters || []).filter((p) => p.in === 'query');

// ---------------------------------------------------------------------------
// 1. request.nativeCasing: camel on every method. Paired with
//    snake_case_aliases: true in provider_config.json, the user surface is
//    snake_case and the wire stays camelCase.
// ---------------------------------------------------------------------------
function setNativeCasing() {
  for (const doc of docs.values()) {
    forEachMethod(doc, (method) => {
      method.request = { ...(method.request || {}), nativeCasing: WIRE_CASING };
      bump(`1. nativeCasing: ${WIRE_CASING}`);
    });
  }
}

// ---------------------------------------------------------------------------
// 2. Naive request-body translation on DELETE methods that carry a body (the
//    generator only emits it for POST / PUT / PATCH), so body attributes are
//    WHERE keys.
// ---------------------------------------------------------------------------
function naiveDeleteBodies() {
  for (const doc of docs.values()) {
    forEachMethod(doc, (method, { operation, verb }) => {
      if (verb !== 'delete' || !operation?.requestBody) return;
      method.config = { ...(method.config || {}), requestBodyTranslate: { algorithm: 'naive' } };
      bump('2. DELETE naive body');
    });
  }
}

// ---------------------------------------------------------------------------
// 3. A read whose body is one bare string, number or boolean (the project
//    key and name validators, a user preference) has no columns. The payload
//    becomes {"value": <scalar>}, one row with a `value` column. Jira answers
//    these strings as bare text (KAN1, not "KAN1"), so a string read is
//    quoted with toJson; a number or boolean is already valid JSON.
// ---------------------------------------------------------------------------
function wrapScalarReads() {
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { resource, resourceName, methodName, operation }) => {
      if (sqlVerbOf(resource, resourceName, methodName) !== 'select') return;
      const { schema } = responseSchema(doc, method, operation);
      if (!['string', 'integer', 'number', 'boolean'].includes(schema.type)) return;
      const body = schema.type === 'string' ? '{"value": {{ toJson . }}}' : '{"value": {{ . }}}';
      if (method.response?.transform?.body === body) return; // already applied
      if (method.response?.transform) { errors.push(`3. ${f}: ${resourceName}.${methodName} already has a response transform`); return; }
      method.response = {
        ...(method.response || {}),
        overrideMediaType: 'application/json',
        schema_override: { type: 'object', properties: { value: { type: schema.type, description: schema.description || 'The value the read returns.' } } },
        transform: { type: TEXT_TEMPLATE, body }
      };
      delete method.response.objectKey;
      bump('3. scalar read -> value row');
    });
  }
}

// ---------------------------------------------------------------------------
// 4. GET /rest/api/3/label answers a page of strings ({values: [string]}).
//    Each label becomes a {label} row; the page fields stay so rule 6 can add
//    the continuation token to the same transform.
// ---------------------------------------------------------------------------
const LABEL_ITEMS = '{{- range $i, $v := (index $p "values") -}}{{- if $i -}},{{- end -}}{"label":{{ toJson $v }}}{{- end -}}';
function labelRows() {
  const doc = docs.get('issues.yaml');
  const method = doc?.components?.['x-stackQL-resources']?.labels?.methods?.list;
  if (!method) { errors.push('4. issues.labels.list not found'); return; }
  method.response = {
    ...(method.response || {}),
    objectKey: '$.values',
    overrideMediaType: 'application/json',
    schema_override: {
      type: 'object',
      properties: {
        startAt: { type: 'integer' }, maxResults: { type: 'integer' }, total: { type: 'integer' }, isLast: { type: 'boolean' },
        values: { type: 'array', items: { type: 'object', properties: { label: { type: 'string', description: 'A label used on issues on the site.' } } } }
      }
    },
    transform: { type: TEXT_TEMPLATE, body: '' } // completed by rule 6
  };
  method['x-jira-rowTemplate'] = 'labels';
  bump('4. label strings -> label rows');
}

// 4b. GET /rest/api/3/mypermissions and GET /rest/api/3/permissions answer
//     {permissions: {<KEY>: {...}}}: a map, one column. Each entry becomes a
//     row (keys in sorted order), so a permission check reads as
//     SELECT key, have_permission ... WHERE permissions = 'A,B'. It also
//     removes the `permissions` column, which shared its name with the
//     required permissions query parameter (a WHERE key is applied to a
//     same-named column as a filter too, so the read returned no rows).
const PERMISSION_ROWS = '{{- $p := jsonMapFromString . -}}{"values":[{{- $first := true -}}{{- range $k, $v := (index $p "permissions") -}}{{- if not $first -}},{{- end -}}{{- $first = false -}}{{ toJson $v }}{{- end -}}]}';
function permissionRows() {
  for (const [resource, methodName] of [['my_permissions', 'get'], ['permissions', 'list']]) {
    const doc = docs.get('permissions.yaml');
    const method = doc?.components?.['x-stackQL-resources']?.[resource]?.methods?.[methodName];
    if (!method) { errors.push(`4b. permissions.${resource}.${methodName} not found`); continue; }
    if (!doc.components?.schemas?.UserPermission) { errors.push('4b. permissions.yaml has no UserPermission schema'); continue; }
    method.response = {
      ...(method.response || {}),
      objectKey: '$.values',
      overrideMediaType: 'application/json',
      schema_override: { type: 'object', properties: { values: { type: 'array', items: { $ref: '#/components/schemas/UserPermission' } } } },
      transform: { type: TEXT_TEMPLATE, body: PERMISSION_ROWS }
    };
    bump('4b. permission map -> permission rows');
  }
}

// 5b. The JQL issue search is the POST form of /rest/api/3/search/jql: the
//     API answers only {id} per issue unless fields is supplied, and the
//     body base (merged under the statement's own body attributes) supplies
//     fields = ["*navigable"]. Its page token travels in the body, and its
//     objectKey is set here (the generator applies the CSV objectKey to GET
//     methods only).
function issueSearchBody() {
  const doc = docs.get('issues.yaml');
  const method = doc?.components?.['x-stackQL-resources']?.issues?.methods?.search;
  if (!method) { errors.push('5b. issues.issues.search not found'); return; }
  method.request = { ...(method.request || {}), base: JSON.stringify({ fields: ['*navigable'] }) };
  method.response = { ...(method.response || {}), objectKey: '$.issues' };
  method.config = { ...(method.config || {}), pagination: { requestToken: { key: 'nextPageToken', location: 'body' }, responseToken: { key: '$.nextPageToken', location: 'body' } } };
  bump('5b. issue search: body base fields and body page token');
}

// ---------------------------------------------------------------------------
// 5. Token pagination: reads whose response carries nextPageToken and that
//    take nextPageToken as a query parameter (JQL issue search, the Jira
//    Software board / sprint / epic issue lists, the invalid JQL log). The
//    engine sends the token back until the response omits it.
// ---------------------------------------------------------------------------
function tokenPagination() {
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { resource, resourceName, methodName, operation }) => {
      if (sqlVerbOf(resource, resourceName, methodName) !== 'select') return;
      const { schema } = responseSchema(doc, method, operation);
      if (!schema.properties?.nextPageToken) return;
      if (!queryParams(operation).some((p) => p.name === 'nextPageToken')) return;
      if (!method.response?.objectKey) { errors.push(`5. ${f}: ${resourceName}.${methodName} pages by token but has no objectKey`); return; }
      method.config = { ...(method.config || {}), pagination: { requestToken: { key: 'nextPageToken', location: 'query' }, responseToken: { key: '$.nextPageToken', location: 'body' } } };
      bump('5. nextPageToken pagination');
    });
  }
}

// ---------------------------------------------------------------------------
// 6. Offset pagination. A PageBean ({startAt, maxResults, total, isLast,
//    values}) and the other offset reads (comments, worklogs, the agile
//    lists) have no usable next marker: most PageBean reads omit nextPage,
//    and where it is present some reads (workflow and status search) put an
//    internal Atlassian host in it that the gateway token cannot reach
//    (provider-dev/config/pagination_survey.json). The response transform
//    counts the rows on the page and, while more pages exist (isLast false,
//    or startAt + rows < total when the read has no isLast), adds
//    "stackqlNextStartAt": startAt + rows to the page; the pagination block
//    sends it back as the startAt query parameter, and the engine stops on a
//    page without it. The audit log pages the same way with offset.
// ---------------------------------------------------------------------------
function offsetTransform(itemsKey, startField, condition, rowTemplate) {
  const head = [
    '{{- $p := jsonMapFromString . -}}',
    `{{- $n := toInt (index $p "${startField}") -}}`,
    '{{- $more := false -}}',
    `{{- range (index $p "${itemsKey}") -}}{{- $n = plus1 $n -}}{{- $more = true -}}{{- end -}}`
  ].join('');
  const cond = condition === 'isLast'
    ? '{{- if and $more (not (toBool (index $p "isLast"))) -}}'
    : '{{- if and $more (lt $n (toInt (index $p "total"))) -}}';
  if (rowTemplate === 'labels') {
    const page = `"startAt":{{ toJson (index $p "startAt") }},"maxResults":{{ toJson (index $p "maxResults") }},"total":{{ toJson (index $p "total") }},"isLast":{{ toJson (index $p "isLast") }},"values":[${LABEL_ITEMS}]`;
    return `${head}${cond}{"${NEXT_START_AT}":{{ $n }},${page}}{{- else -}}{${page}}{{- end -}}`;
  }
  return `${head}${cond}{"${NEXT_START_AT}":{{ $n }},{{ slice . 1 }}{{- else -}}{{ . }}{{- end -}}`;
}

function offsetPagination() {
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { resource, resourceName, methodName, operation }) => {
      if (sqlVerbOf(resource, resourceName, methodName) !== 'select') return;
      const ours = method.config?.pagination?.responseToken?.key === `$.${NEXT_START_AT}`;
      if (method.config?.pagination && !ours) return; // token pagination (rule 5)
      const objectKey = method.response?.objectKey || '';
      const m = objectKey.match(/^\$\.([A-Za-z0-9_]+)$/);
      if (!m) return;
      const itemsKey = m[1];
      const params = queryParams(operation).map((p) => p.name);
      const { schemaRef, schema } = responseSchema(doc, method, operation);
      const props = schema.properties || {};
      let startField = null;
      if (params.includes('startAt') && props.startAt) startField = 'startAt';
      else if (params.includes('offset') && props.offset && props.total) startField = 'offset';
      if (!startField || !props[itemsKey]) return;
      const condition = props.isLast ? 'isLast' : props.total ? 'total' : null;
      if (!condition) return;
      const rowTemplate = method['x-jira-rowTemplate'] || null;
      if (method.response.transform && !rowTemplate && !ours) { errors.push(`6. ${f}: ${resourceName}.${methodName} already has a response transform`); return; }
      method.response = {
        ...method.response,
        overrideMediaType: 'application/json',
        schema_override: method.response.schema_override || clone(schemaRef || schema),
        transform: { type: TEXT_TEMPLATE, body: offsetTransform(itemsKey, startField, condition, rowTemplate) }
      };
      delete method['x-jira-rowTemplate'];
      method.config = { ...(method.config || {}), pagination: { requestToken: { key: startField, location: 'query' }, responseToken: { key: `$.${NEXT_START_AT}`, location: 'body' } } };
      bump(`6. offset pagination (${startField}, ${condition})`);
    });
  }
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { resourceName, methodName }) => {
      if (method['x-jira-rowTemplate']) errors.push(`6. ${f}: ${resourceName}.${methodName} row template was not completed (no offset pagination applied)`);
    });
  }
}

// ---------------------------------------------------------------------------
// 7. Clause pushdown (queryParamPushdown, one block per method; omnisdk
//    still applies every filter to the rows, so a pushed clause only narrows
//    what the server sends):
//    - top: LIMIT n -> maxResults=n on every list read that takes maxResults
//      as a query parameter or (the JQL search) a body attribute, clamped to
//      the parameter's declared maximum, else 100 (the largest page most Jira
//      reads serve; 5000 on the search, which serves that many keys)
//    - orderBy: ORDER BY -> Jira's orderBy in the prefix syntax (name, -name)
//      on the reads that take it, for the sort keys that are also row columns
//      (the keys come from the parameter's enum, or the backticked names in
//      its description)
//    - skip: OFFSET n -> startAt=n on the reads rule 6 pages by startAt
//      (omnisdk pushes it only for a single read with every filter pushed and
//      the order pushed or absent)
// ---------------------------------------------------------------------------
function rowProperties(doc, method, operation) {
  const { schema, resolve } = responseSchema(doc, method, operation);
  const m = (method.response?.objectKey || '').match(/^\$\.([A-Za-z0-9_]+)$/);
  let row = schema;
  if (m) row = resolve(resolve(schema.properties?.[m[1]])?.items) || {};
  return new Set(Object.keys(row?.properties || {}));
}
function orderKeys(param) {
  const fromEnum = (param.schema?.enum || []).map((v) => String(v).replace(/^[+-]/, ''));
  const fromText = [...(param.description || '').matchAll(/`([A-Za-z][A-Za-z0-9_]*)`/g)].map((x) => x[1]);
  return [...new Set(fromEnum.length ? fromEnum : fromText)];
}
function clausePushdown() {
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { resource, resourceName, methodName, operation }) => {
      if (sqlVerbOf(resource, resourceName, methodName) !== 'select' || !method.response?.objectKey) return;
      const block = {};
      const q = queryParams(operation);
      const maxQ = q.find((x) => x.name === 'maxResults');
      const bodyMax = operation?.requestBody?.content?.['application/json']?.schema;
      const bodyMaxProp = makeResolver(doc)(bodyMax)?.properties?.maxResults;
      if (maxQ) {
        block.top = { dialect: 'custom', paramName: 'maxResults', maxValue: Number.isInteger(maxQ.schema?.maximum) ? maxQ.schema.maximum : 100 };
      } else if (bodyMaxProp) {
        block.top = { dialect: 'custom', paramName: 'maxResults', maxValue: Number.isInteger(bodyMaxProp.maximum) ? bodyMaxProp.maximum : 5000 };
      }
      const ob = q.find((x) => x.name === 'orderBy');
      if (ob) {
        const cols = rowProperties(doc, method, operation);
        const keys = orderKeys(ob).filter((k) => cols.has(k));
        if (keys.length) block.orderBy = { dialect: 'custom', paramName: 'orderBy', syntax: 'prefix', delimiter: ',', supportedColumns: keys };
      }
      if (method.config?.pagination?.requestToken?.key === 'startAt' && q.some((x) => x.name === 'startAt')) {
        block.skip = { dialect: 'custom', paramName: 'startAt' };
      }
      if (Object.keys(block).length === 0) return;
      method.config = { ...(method.config || {}), queryParamPushdown: block };
      if (block.top) bump('7. LIMIT -> maxResults');
      if (block.orderBy) bump('7. ORDER BY -> orderBy (prefix)');
      if (block.skip) bump('7. OFFSET -> startAt');
      void f;
    });
  }
}

// ---------------------------------------------------------------------------
// 9. An entity property write takes the value as the whole body;
//    pre_normalize declared it as {value}. The JSON request transform sends
//    .value alone: UPDATE ... SET value = '{"a": 1}' -> body {"a": 1}.
// ---------------------------------------------------------------------------
const ENTITY_PROPERTY_PUT = /\/\{[^}]+\}\/properties\/\{propertyKey\}$/;
function propertyValueTransform() {
  let n = 0;
  for (const [f, doc] of docs) {
    forEachMethod(doc, (method, { verb, pathKey, operation, resourceName, methodName }) => {
      if (verb !== 'put' || !ENTITY_PROPERTY_PUT.test(pathKey || '')) return;
      if (!operation?.requestBody?.content?.['application/json']?.schema?.properties?.value) { errors.push(`9. ${f}: ${resourceName}.${methodName} has no value body (pre_normalize pass 5)`); return; }
      method.request = { ...(method.request || {}), transform: { type: 'golang_template_json_v0.3.0', body: '{{ toJson .value }}' } };
      n++;
    });
  }
  if (n === 0) errors.push('9. no entity property writes found');
  bump('9. entity property value as the raw body', n);
}

// ---------------------------------------------------------------------------
// 8. Sanity: every service has resources; every resource has a method.
// ---------------------------------------------------------------------------
function validateResources() {
  for (const [f, doc] of docs) {
    const resources = doc.components?.['x-stackQL-resources'] || {};
    if (Object.keys(resources).length === 0) errors.push(`8. ${f}: no x-stackQL-resources (an empty service fails the meta-route walk)`);
    for (const [name, res] of Object.entries(resources)) {
      if (Object.keys(res.methods || {}).length === 0) errors.push(`8. ${f}: resource ${name} has no methods`);
    }
  }
}

setNativeCasing();
naiveDeleteBodies();
wrapScalarReads();
labelRows();
permissionRows();
issueSearchBody();
tokenPagination();
offsetPagination();
clausePushdown();
propertyValueTransform();
validateResources();

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
for (const [f, doc] of docs) fs.writeFileSync(path.join(SERVICES_DIR, f), dumpYaml(doc));
fs.writeFileSync(providerPath, dumpYaml(provider));
console.log(`post_process: ${docs.size} service(s) written`);
for (const [k, v] of Object.entries(counts).sort()) console.log(`  ${k}: ${v}`);
