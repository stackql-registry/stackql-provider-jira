// The operation -> resource.method derivation, shared by map_operations.mjs
// (which uses it to name operations the all_services.csv dictionary does not
// have yet; mapped rows are the source of truth) and build_inventory.mjs (the
// proposed columns).
//
// Jira paths are a tree under /rest/api/3, /rest/agile/1.0 and
// /rest/software/1.0: collection reads on a static segment, keyed reads on
// the parameter after it, and actions on trailing verb segments. The
// derivation below turns that tree into resources mechanically;
// RESOURCE_RULES and METHOD_RULES in map_operations.mjs are the exceptions.
//
//   node       the path with its trailing parameters removed
//   resource   the node's static segments after the API prefix, with the
//              leading segments the service already names dropped
//              (stripLeading in service_names.json), run-together vendor
//              words split (issuetypescheme -> issue_type_scheme), snake_case,
//              the last one pluralized
//              (/rest/api/3/issue/{issueIdOrKey}/comment -> comments)
//   GET        path ends in a parameter -> SELECT get; a row array in the
//              response -> SELECT list; anything else -> SELECT get
//   POST       on a node that can be read -> INSERT create
//   PUT        on a node that can be read -> UPDATE update (Jira's PUTs are
//              edits of the fields supplied, not proven full replacements)
//   DELETE     on a node that can be read or created -> DELETE delete
//   actions    a node with no read (POST .../notify, PUT .../assignee,
//              POST .../archive) is not a resource: its operations are hoisted
//              to the nearest ancestor node that has a read, as EXEC methods
//              named for the skipped segments (issues.notify,
//              issues.update_assignee). With no such ancestor the node stays
//              a (non-selectable) resource with create / update / delete.
//   overloads  two operations of one resource that derive the same method
//              name: the one deeper in the path gets _by_<last parameter>.
//              Two methods of one SQL verb with the same required-parameter
//              signature cannot be routed: the later one becomes EXEC.

import pluralize from 'pluralize';
import {
  HTTP_VERBS, camelToSnake, pathParams, makeResolver, classifyResponse, hasRowArray, proposeObjectKey,
  skipReason, stripApiPrefix, loadServiceConfig
} from './spec_helpers.mjs';

// Vendor path segments written as one lowercase word, split into the words
// they are made of. Applied segment by segment before snake_casing.
export const SEGMENT_WORDS = {
  issuetype: 'issue_type',
  issuetypes: 'issue_types',
  issuetypescheme: 'issue_type_scheme',
  issuetypescreenscheme: 'issue_type_screen_scheme',
  issuesecurityschemes: 'issue_security_schemes',
  issuesecuritylevelscheme: 'issue_security_level_scheme',
  issuelinktype: 'issue_link_type',
  fieldconfiguration: 'field_configuration',
  fieldconfigurationscheme: 'field_configuration_scheme',
  fieldschemes: 'field_schemes',
  permissionscheme: 'permission_scheme',
  notificationscheme: 'notification_scheme',
  screenscheme: 'screen_scheme',
  workflowscheme: 'workflow_scheme',
  securitylevel: 'security_level',
  statuscategory: 'status_category',
  remotelink: 'remote_link',
  applicationrole: 'application_role',
  mypermissions: 'my_permissions',
  mypreferences: 'my_preferences',
  editmeta: 'edit_meta',
  createmeta: 'create_meta',
  bulkfetch: 'bulk_fetch',
  priorityscheme: 'priority_scheme',
  timetracking: 'time_tracking',
  autocompletedata: 'autocomplete_data',
  pdcleaner: 'pd_cleaner',
  groupuserpicker: 'group_user_picker',
  addtodefault: 'add_to_default',
  removeandswap: 'remove_and_swap',
  relatedissuecounts: 'related_issue_counts',
  unresolvedissuecount: 'unresolved_issue_count',
  projectvalidate: 'project_validate',
  validprojectkey: 'valid_project_key',
  validprojectname: 'valid_project_name',
  defaultsharescope: 'default_share_scope',
  universal_avatar: 'universal_avatar',
  approximatelicensecount: 'approximate_license_count',
  hierarchy: 'hierarchy',
  notificationschemeid: 'notification_scheme_id'
};

export function segmentWords(seg) {
  const lower = seg.toLowerCase();
  if (SEGMENT_WORDS[lower]) return SEGMENT_WORDS[lower];
  return camelToSnake(seg);
}

// First words that make a hoisted PUT / PATCH action segment read as a
// command (archive, restore, move, ...); such a segment keeps its own name,
// any other gets an update_ prefix (update_assignee).
const ACTION_VERBS = new Set([
  'activate', 'add', 'apply', 'archive', 'assign', 'cancel', 'copy', 'deactivate', 'delete', 'disable', 'enable', 'evaluate',
  'merge', 'move', 'notify', 'publish', 'rank', 'redact', 'refresh', 'remove', 'replace', 'reset', 'restore', 'set', 'start',
  'swap', 'trash', 'unarchive', 'update', 'validate', 'duplicate', 'reorder', 'swap'
]);

// The node of a path: the path with its trailing parameters removed.
function nodeOf(pathKey) {
  const segs = pathKey.split('/').filter(Boolean);
  let depth = 0;
  while (segs.length && segs[segs.length - 1].startsWith('{')) { segs.pop(); depth++; }
  return { node: '/' + segs.join('/'), depth };
}

// The parent node: drop the last static segment, then trailing parameters.
function parentNode(node) {
  const segs = node.split('/').filter(Boolean);
  if (segs.length === 0) return null;
  segs.pop();
  while (segs.length && segs[segs.length - 1].startsWith('{')) segs.pop();
  return segs.length ? '/' + segs.join('/') : null;
}

// Resource name of a node in a service.
export function resourceNameOf(node, service, serviceMeta, pluralizeFn = pluralize) {
  let statics = stripApiPrefix(node).split('/').filter(Boolean).filter((s) => !s.startsWith('{'));
  const strip = (serviceMeta?.stripLeading || []).map((s) => s.toLowerCase());
  while (statics.length > 1 && strip.includes(statics[0].toLowerCase())) statics = statics.slice(1);
  if (statics.length === 0) statics = [service];
  const words = statics.map(segmentWords);
  const last = words[words.length - 1];
  const lastParts = last.split('_');
  lastParts[lastParts.length - 1] = pluralizeFn(lastParts[lastParts.length - 1]);
  return [...words.slice(0, -1), lastParts.join('_')].join('_');
}

// Maps every operation of one split service document.
// Returns { rows: Map(`${pathKey}::${verb}` -> mapping), notes: [] } where a
// mapping is { resource, method, sqlVerb, objectKey, skip, shape, hoisted }.
// ---------------------------------------------------------------------------
// Naming passes (resource naming guidance: the shortest names that still say
// what the rows are, related reads routed by their WHERE parameters).
// ---------------------------------------------------------------------------

// The 2xx JSON response schema of an operation.
function successSchema(op) {
  for (const [code, resp] of Object.entries(op.responses || {})) {
    if (!/^2/.test(code)) continue;
    const schema = resp?.content?.['application/json']?.schema;
    if (schema) return schema;
  }
  return null;
}

// The column names of the rows a select method returns (the items at its
// objectKey, the items of a bare array, or the object itself), without the
// `expand` metadata field. Empty when the rows are not an object schema.
function rowColumns(d, resolve) {
  let s = resolve(successSchema(d.o.op));
  if (!s) return new Set();
  if (d.objectKey) {
    const key = d.objectKey.replace(/^\$\./, '').split(/[.[]/)[0];
    s = resolve(s.properties?.[key]);
    if (s?.type === 'array' || s?.items) s = resolve(s.items);
  } else if (s.type === 'array' || (s.items && !s.properties)) {
    s = resolve(s.items);
  }
  return new Set(Object.keys(s?.properties || {}).filter((k) => k !== 'expand'));
}

// The nouns that qualify an operation's rows: the static segment before each
// path parameter, singular (/board/{boardId}/sprint/{sprintId}/issue ->
// board, sprint).
function qualifierNouns(pathKey) {
  const segs = pathKey.split('/').filter(Boolean);
  const nouns = [];
  for (let i = 1; i < segs.length; i++) {
    if (!segs[i].startsWith('{') || segs[i - 1].startsWith('{')) continue;
    const words = segmentWords(segs[i - 1]).split('_');
    words[words.length - 1] = pluralize.singular(words[words.length - 1]);
    nouns.push(words.join('_'));
  }
  return nouns;
}

// The noun of a literal `none` segment standing in for a parameter
// (/epic/none/issue -> epic), or null.
function noneNoun(pathKey) {
  const segs = pathKey.split('/').filter(Boolean);
  const i = segs.indexOf('none');
  return i > 0 ? pluralize.singular(segmentWords(segs[i - 1]).split('_').pop()) : null;
}

/**
 * Collapse: a read-only resource named for the parameters that select its
 * rows (board_sprints: the sprints of a board) joins the resource of the
 * same rows (sprints), its methods routed by those parameters
 * (sprints.list_by_board, WHERE board_id = ...). Also <base>_without_<noun>
 * for a literal /<noun>/none/ path (issues_without_epic ->
 * issues.list_without_epic). It joins only when
 *   - every column of the base's rows is in its rows (the base's get, else
 *     its first select): a thinner projection stays a resource of its own;
 *   - no method name clashes, and no two selects of the result have the same
 *     required parameters (StackQL could not route them).
 * Resources in keepNames are left alone.
 */
function collapseQualifiedReads(derived, { resolve, keepNames, notes, service }) {
  const byResource = () => {
    const m = new Map();
    for (const d of derived) {
      if (!m.has(d.resource)) m.set(d.resource, []);
      m.get(d.resource).push(d);
    }
    return m;
  };
  const sig = (d) => `${d.sqlVerb}::${requiredSignature(resolve, d.o.pathKey, d.o.op)}`;

  // candidates: read-only resources whose name is <qualifiers>_<base> or
  // [<qualifiers>_]<base>_without_<noun>
  const candidates = [];
  for (const [name, ds] of byResource()) {
    if (keepNames.has(name) || !ds.every((d) => d.sqlVerb === 'select')) continue;
    const quals = [...new Set(ds.map((d) => qualifierNouns(d.o.pathKey).join('_')))];
    const nones = [...new Set(ds.map((d) => noneNoun(d.o.pathKey) || ''))];
    if (quals.length !== 1 || nones.length !== 1) continue;
    let rest = name;
    let without = '';
    if (nones[0] && rest.endsWith(`_without_${nones[0]}`)) {
      without = `_without_${nones[0]}`;
      rest = rest.slice(0, -without.length);
    }
    let prefix = '';
    if (quals[0] && rest.startsWith(`${quals[0]}_`)) {
      prefix = quals[0];
      rest = rest.slice(prefix.length + 1);
    }
    if (!prefix && !without) continue;
    candidates.push({ name, base: rest, prefix, without, words: (prefix ? prefix.split('_').length : 0) + (without ? 1 : 0) });
  }
  candidates.sort((a, b) => a.words - b.words || (a.name < b.name ? -1 : 1));

  for (const c of candidates) {
    const all = byResource();
    const base = all.get(c.base);
    const own = all.get(c.name);
    if (!base || !own || c.base === c.name) continue;
    const baseSelects = base.filter((d) => d.sqlVerb === 'select');
    if (baseSelects.length === 0) continue;
    const reference = baseSelects.find((d) => d.method === 'get') || baseSelects[0];
    const baseColumns = rowColumns(reference, resolve);
    const missing = own.map((d) => [...baseColumns].filter((col) => !rowColumns(d, resolve).has(col))).flat();
    if (baseColumns.size === 0 || missing.length > 0) {
      notes.push(`not collapsed: ${service}.${c.name} into ${c.base} (its rows lack ${missing.length ? [...new Set(missing)].join(', ') : 'columns to compare'})`);
      continue;
    }
    const methodNames = new Set(base.map((d) => d.method));
    const signatures = new Map(baseSelects.map((d) => [sig(d), d.method]));
    const renames = [];
    let clash = null;
    for (const d of own) {
      const method = `${d.method}${c.prefix ? `_by_${c.prefix}` : ''}${c.without}`;
      if (methodNames.has(method)) { clash = `method ${method} exists`; break; }
      if (signatures.has(sig(d))) { clash = `same required parameters as ${c.base}.${signatures.get(sig(d))}`; break; }
      methodNames.add(method);
      signatures.set(sig(d), method);
      renames.push({ d, method });
    }
    if (clash) {
      notes.push(`not collapsed: ${service}.${c.name} into ${c.base} (${clash})`);
      continue;
    }
    for (const { d, method } of renames) {
      notes.push(`collapsed: ${service}.${c.name}.${d.method} -> ${c.base}.${method}`);
      d.resource = c.base;
      d.method = method;
    }
  }
}

// Words a resource name cannot start with once a prefix is dropped: the
// remainder would not name rows (users_with_permissions stays, not
// with_permissions; plans.plan_only_teams stays, not only_teams).
const NOT_A_NAME_START = new Set(['with', 'without', 'by', 'for', 'in', 'of', 'to', 'from', 'on', 'only']);

/**
 * Service prefix: a resource name that starts with the service name, singular
 * or plural, drops it (fields.field_schemes -> fields.schemes,
 * issue_types.issue_type_schemes -> issue_types.schemes). Not when the
 * remainder starts with a preposition, when it would equal another
 * resource's name (or two would strip to the same name), or for names in
 * keepNames (RESOURCE_RULES with keep: true).
 */
function stripServicePrefixes(derived, { keepNames, notes, service }) {
  const words = service.split('_');
  const singular = [...words.slice(0, -1), pluralize.singular(words[words.length - 1])].join('_');
  const forms = [...new Set([service, singular])].sort((a, b) => b.length - a.length);
  const names = new Set(derived.map((d) => d.resource));
  const proposals = new Map();
  for (const name of names) {
    if (keepNames.has(name)) continue;
    const form = forms.find((f) => name.startsWith(`${f}_`));
    if (!form) continue;
    const rest = name.slice(form.length + 1);
    if (!rest || NOT_A_NAME_START.has(rest.split('_')[0])) continue;
    proposals.set(name, rest);
  }
  const unchanged = new Set([...names].filter((n) => !proposals.has(n)));
  const counts = new Map();
  for (const rest of proposals.values()) counts.set(rest, (counts.get(rest) || 0) + 1);
  const renames = new Map();
  for (const [name, rest] of proposals) {
    if (unchanged.has(rest) || counts.get(rest) > 1) {
      notes.push(`prefix kept: ${service}.${name} (${rest} would collide)`);
      continue;
    }
    renames.set(name, rest);
    notes.push(`prefix dropped: ${service}.${name} -> ${rest}`);
  }
  for (const d of derived) if (renames.has(d.resource)) d.resource = renames.get(d.resource);
}

/**
 * The required-parameter signature of an operation: its path parameters and
 * required query parameters, sorted. Two methods of one resource with the
 * same SQL verb and signature cannot be told apart by StackQL. `resolve` is
 * makeResolver(doc) of the operation's document.
 */
export function requiredSignature(resolve, pathKey, op) {
  const requiredQuery = (op.parameters || []).map((p) => resolve(p)).filter((p) => p && p.in === 'query' && p.required).map((p) => p.name);
  return [...pathParams(pathKey), ...requiredQuery].sort().join(',');
}

export function mapService(doc, service, specKey, resolver, { resourceRules = [], methodRules = [] } = {}) {
  const resolve = makeResolver(doc);
  const serviceMeta = loadServiceConfig().services?.[service] || {};
  const notes = [];
  const rows = new Map();

  // ---- index the operations ------------------------------------------------
  const ops = [];
  for (const [pathKey, pathItem] of Object.entries(doc.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      let ruleSkip = null;
      if (specKey) {
        const rule = resolver.resolveRule(specKey, pathKey, op);
        if (!rule || rule.service !== service) throw new Error(`${service}: ${verb.toUpperCase()} ${pathKey} resolves to service ${rule?.service} (stale split - re-run make split)`);
        ruleSkip = rule.skip;
      }
      const resp = classifyResponse(op, resolve);
      const normalized = pathKey.replace(/\{[^}]+\}/g, '{}');
      const skipRule = methodRules.find((x) => x.skip && x.verb === verb && (!x.service || x.service === service) && x.re.test(normalized));
      const skip = skipRule ? skipRule.skip : skipReason(specKey, pathKey, op, resolve, verb, ruleSkip);
      const { node, depth } = nodeOf(pathKey);
      ops.push({ pathKey, verb, op, resp, skip, node, depth, params: pathParams(pathKey) });
    }
  }

  // ---- nodes: which have a (mapped) read -----------------------------------
  const nodes = new Map(); // node -> { ops: [], hasRead }
  for (const o of ops) {
    if (o.skip) continue;
    if (!nodes.has(o.node)) nodes.set(o.node, { ops: [], hasRead: false });
    const n = nodes.get(o.node);
    n.ops.push(o);
    if (o.verb === 'get') n.hasRead = true;
  }

  const norm = (p) => p.replace(/\{[^}]+\}/g, '{}');
  const nodeResource = (node) => {
    const normalized = norm(node);
    for (const r of resourceRules) {
      if (r.service && r.service !== service) continue;
      if (r.re.test(normalized)) return r.resource;
    }
    return resourceNameOf(node, service, serviceMeta);
  };

  // nearest ancestor node with a read; ancestors with no operations of their
  // own are walked through, never past the API prefix
  const readableAncestor = (node) => {
    let cur = parentNode(node);
    // stop at the API prefix itself (/rest/api/3 strips to '/') or once the
    // path is no longer under one (stripApiPrefix returns it unchanged)
    while (cur && stripApiPrefix(cur) !== '/' && stripApiPrefix(cur) !== cur) {
      const n = nodes.get(cur);
      if (n && n.hasRead) return cur;
      cur = parentNode(cur);
    }
    return null;
  };

  // ---- derive -----------------------------------------------------------------
  const derived = [];
  for (const [node, n] of nodes) {
    const ancestor = n.hasRead ? null : readableAncestor(node);
    if (!n.hasRead && ancestor) {
      const resource = nodeResource(ancestor);
      const extra = node.slice(ancestor.length).split('/').filter(Boolean).filter((s) => !s.startsWith('{')).map(segmentWords).join('_');
      for (const o of n.ops) {
        const commandLike = ACTION_VERBS.has(extra.split('_')[0]);
        const prefix = o.verb === 'post' ? '' : o.verb === 'delete' ? (commandLike ? '' : 'delete_') : commandLike ? '' : 'update_';
        derived.push({ o, resource, method: `${prefix}${extra}`, sqlVerb: 'exec', hoisted: true });
      }
      continue;
    }
    const resource = nodeResource(node);
    for (const o of n.ops) {
      if (o.verb === 'get') {
        const lastIsParam = o.depth > 0;
        const isList = !lastIsParam && hasRowArray(o.resp);
        derived.push({ o, resource, method: isList ? 'list' : 'get', sqlVerb: 'select', objectKey: isList ? proposeObjectKey(o.resp) : '' });
      } else if (o.verb === 'post') {
        derived.push({ o, resource, method: 'create', sqlVerb: 'insert' });
      } else if (o.verb === 'put' || o.verb === 'patch') {
        derived.push({ o, resource, method: 'update', sqlVerb: 'update' });
      } else if (o.verb === 'delete') {
        derived.push({ o, resource, method: 'delete', sqlVerb: 'delete' });
      }
    }
  }

  // ---- explicit method rules ----------------------------------------------------
  for (const d of derived) {
    const normalized = norm(d.o.pathKey);
    const r = methodRules.find((x) => !x.skip && x.verb === d.o.verb && (!x.service || x.service === service) && x.re.test(normalized));
    if (r) {
      if (r.resource) d.resource = r.resource;
      if (r.method) d.method = r.method;
      if (r.sqlVerb) d.sqlVerb = r.sqlVerb;
      if (r.objectKey !== undefined) d.objectKey = r.objectKey;
      d.ruled = true;
    }
  }

  // ---- naming passes: collapse qualified reads, then drop the service prefix -------
  const keepNames = new Set(resourceRules.filter((r) => r.keep && (!r.service || r.service === service)).map((r) => r.resource));
  collapseQualifiedReads(derived, { resolve, keepNames, notes, service });
  stripServicePrefixes(derived, { keepNames, notes, service });

  // ---- overloads: same (resource, method) from different operations ---------------
  const byName = new Map();
  for (const d of derived) {
    const k = `${d.resource}.${d.method}`;
    if (!byName.has(k)) byName.set(k, []);
    byName.get(k).push(d);
  }
  for (const [k, list] of byName) {
    if (list.length < 2) continue;
    list.sort((a, b) => (a.ruled === b.ruled ? 0 : a.ruled ? -1 : 1) || a.o.params.length - b.o.params.length || (a.o.pathKey < b.o.pathKey ? -1 : a.o.pathKey > b.o.pathKey ? 1 : 0) || (a.o.verb < b.o.verb ? -1 : 1));
    for (const d of list.slice(1)) {
      const last = d.o.params[d.o.params.length - 1];
      const suffix = last ? `_by_${camelToSnake(last)}` : `_${d.o.verb}`;
      d.method = `${d.method}${suffix}`;
      notes.push(`overload: ${service}.${k} also at ${d.o.verb.toUpperCase()} ${d.o.pathKey} -> ${d.method}`);
    }
  }
  const seen = new Map();
  for (const d of derived) {
    let name = d.method;
    let i = 2;
    while (seen.has(`${d.resource}.${name}`)) { name = `${d.method}_${i++}`; }
    if (name !== d.method) { notes.push(`overload: ${service}.${d.resource}.${d.method} renamed ${name}`); d.method = name; }
    seen.set(`${d.resource}.${name}`, d);
  }

  // ---- signature clashes: one SQL verb, one required-parameter signature ----------
  const sigSeen = new Map();
  const signature = (o) => requiredSignature(resolve, o.pathKey, o.op);
  const ordered = [...derived].sort((a, b) => (a.ruled === b.ruled ? 0 : a.ruled ? -1 : 1) || a.o.params.length - b.o.params.length || (a.o.pathKey < b.o.pathKey ? -1 : a.o.pathKey > b.o.pathKey ? 1 : 0) || (a.o.verb < b.o.verb ? -1 : 1));
  for (const d of ordered) {
    if (d.sqlVerb === 'exec') continue;
    const sigKey = `${d.resource}.${d.sqlVerb}::${signature(d.o)}`;
    if (sigSeen.has(sigKey)) {
      notes.push(`signature clash: ${service}.${d.resource} ${d.sqlVerb} [${signature(d.o)}] ${sigSeen.get(sigKey)} vs ${d.method} -> ${d.method} is EXEC`);
      d.sqlVerb = 'exec';
      continue;
    }
    sigSeen.set(sigKey, d.method);
  }

  for (const o of ops) {
    if (o.skip) rows.set(`${o.pathKey}::${o.verb}`, { resource: 'skip_this_resource', method: '', sqlVerb: '', objectKey: '', skip: o.skip, shape: o.resp.shape });
  }
  for (const d of derived) {
    rows.set(`${d.o.pathKey}::${d.o.verb}`, { resource: d.resource, method: d.method, sqlVerb: d.sqlVerb, objectKey: d.sqlVerb === 'select' ? (d.objectKey || '') : '', skip: '', shape: d.o.resp.shape, hoisted: !!d.hoisted });
  }
  return { rows, notes };
}
