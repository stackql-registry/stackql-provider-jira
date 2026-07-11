// Shared helpers for the Jira spec scripts (build_inventory.mjs,
// map_operations.mjs): response envelope and pagination classification,
// skip rules, and naming utilities. Single-sourced so the inventory and the
// authoritative mapping can never disagree on classification.

export const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch'];

export const PAGINATION_MARKERS = ['startAt', 'maxResults', 'total', 'isLast', 'nextPage', 'nextPageToken', 'self', 'first', 'last', 'size'];

export function camelToSnake(s) {
  return s.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/[-. ]/g, '_').toLowerCase();
}

export function stripPathPrefix(pathKey) {
  return pathKey
    .replace(/^\/rest\/api\/3\//, '')
    .replace(/^\/rest\/agile\/1\.0\//, '')
    .replace(/^\/rest\/software\/1\.0\//, '');
}

export function pathParams(pathKey) {
  return (pathKey.match(/\{[^}]+\}/g) || []).map((s) => s.slice(1, -1));
}

// Resolves local $refs against the containing spec document
export function makeResolver(spec) {
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

export function success2xx(op) {
  const codes = Object.keys(op.responses || {}).filter((c) => /^2/.test(c)).sort();
  for (const code of codes) {
    const content = op.responses[code].content;
    const json = content?.['application/json'];
    if (json?.schema) return { code, schema: json.schema };
  }
  // the agile spec leaves many JSON responses schema-less with only an
  // example (a JSON string) - surface it so envelopes can still be classified
  for (const code of codes) {
    const json = op.responses[code].content?.['application/json'];
    if (json?.example !== undefined) return { code, schema: null, example: json.example };
  }
  return { code: codes[0] || null, schema: null };
}

function classifyShape(propKeys, arrayProps, isScalar) {
  if (arrayProps.includes('issues')) return { envelope: 'issues-wrapper', key: '$.issues' };
  if (arrayProps.includes('values')) return { envelope: 'values-wrapper', key: '$.values' };
  const hasPageMarkers = propKeys.some((k) => ['startAt', 'maxResults', 'total', 'isLast', 'nextPage'].includes(k));
  if (hasPageMarkers && arrayProps.length > 0) {
    const key = arrayProps.find((k) => !PAGINATION_MARKERS.includes(k));
    if (key) return { envelope: 'keyed-object', key: `$.${key}` };
  }
  // a single collection under one key, alone or with only scalar companions
  // (watchers/votes/transitions style wrappers)
  if (arrayProps.length === 1 && propKeys.every((k) => arrayProps.includes(k) || isScalar(k))) {
    return { envelope: 'keyed-object', key: `$.${arrayProps[0]}` };
  }
  return { envelope: 'single', key: '' };
}

// Response envelope styles: issues-wrapper, values-wrapper, keyed-object,
// bare-array, single, none. The wrapper key doubles as stackql_object_key.
export function classifyEnvelope(op, resolve) {
  const { schema, example } = success2xx(op);
  if (schema) {
    const s = resolve(schema);
    if (!s) return { envelope: 'none', key: '' };
    if (s.type === 'array' || (s.items && !s.properties)) return { envelope: 'bare-array', key: '' };
    const props = s.properties || {};
    const arrayProps = Object.entries(props)
      .filter(([, v]) => { const r = resolve(v); return r && (r.type === 'array' || (r.items && !r.properties)); })
      .map(([k]) => k);
    // schemas with no properties at all are opaque objects, not classifiable
    if (Object.keys(props).length === 0) return { envelope: 'single', key: '' };
    const isScalar = (k) => {
      const r = resolve(props[k]);
      return r && ['string', 'integer', 'number', 'boolean'].includes(r.type);
    };
    return classifyShape(Object.keys(props), arrayProps, isScalar);
  }
  if (example !== undefined) {
    let value = example;
    if (typeof value === 'string') {
      try { value = JSON.parse(value); } catch { return { envelope: 'none', key: '' }; }
    }
    if (Array.isArray(value)) return { envelope: 'bare-array', key: '' };
    if (value && typeof value === 'object') {
      const arrayProps = Object.keys(value).filter((k) => Array.isArray(value[k]));
      const isScalar = (k) => value[k] === null || typeof value[k] !== 'object';
      return classifyShape(Object.keys(value), arrayProps, isScalar);
    }
    return { envelope: 'single', key: '' };
  }
  return { envelope: 'none', key: '' };
}

// Pagination schemes: nextPageToken (cursor), isLast-hybrid, offset, none
export function classifyPagination(op, pathItem, resolve) {
  const params = [...(pathItem?.parameters || []), ...(op.parameters || [])]
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

// Skip rules for operations that stay visible in the CSV artifacts but are
// not mapped to StackQL methods. App-context operations never get here -
// clean_specs.mjs drops them from the cleaned specs.
export function skipReason(pathKey, op) {
  if (pathKey === '/rest/api/3/search') return 'deprecated_legacy_search';
  if (op.deprecated && pathKey.startsWith('/rest/agile/1.0/')) {
    return 'deprecated_superseded';
  }
  // the deprecated "get all projects" read; /rest/api/3/project/search is the
  // mapped replacement and both would otherwise contend for SELECT routing
  if (pathKey === '/rest/api/3/project' && op.deprecated) {
    return 'deprecated_superseded';
  }
  // unpaginated duplicates of the paginated project component/version lists -
  // same rows, fewer capabilities, and mapping both would make SELECT routing
  // ambiguous (two select methods with identical required parameters)
  if (/^\/rest\/api\/3\/project\/\{[^}]+\}\/(components|versions)$/.test(pathKey)) {
    return 'redundant_unpaginated_variant';
  }
  // binary redirect reads (303 to the file); no JSON rows to project
  if (/^\/rest\/api\/3\/attachment\/(content|thumbnail)\//.test(pathKey)) {
    return 'redirect_binary_response';
  }
  // requests whose only bodies are non-JSON (multipart attachment upload,
  // avatar image upload, form-encoded column settings) - out of scope for v1
  const mediaTypes = Object.keys(op.requestBody?.content || {});
  if (mediaTypes.length > 0 && !mediaTypes.some((m) => m.includes('json'))) {
    return 'non_json_request_body';
  }
  return '';
}
