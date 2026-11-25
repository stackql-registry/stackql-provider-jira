#!/usr/bin/env node

// Builds provider-dev/config/endpoint_inventory.csv: one row per operation in
// the two pinned Jira documents (plus the authored atlassian_tenant
// operation), with the classifications every later step depends on:
// service (from the ordered rules in service_names.json), vendor tag,
// pagination parameters and scheme, request body kind, update semantics
// presumption, vendor labels (experimental, deprecated), response shape and
// envelope candidates, the proposed mapping (lib/mapping.mjs plus the rules
// in lib/mapping_rules.mjs) and the skip reason code where an operation is
// not mapped. Operations of excluded services (app-only surfaces) are listed
// with their skip code.
//
// Validates before writing: every operation resolves to a service rule.
// Fails without writing otherwise.
//
// Usage: npm run build-inventory

import fs from 'fs';
import path from 'path';
import {
  SPECS, CONFIG_DIR, HTTP_VERBS, specPath, loadSpec, makeResolver, makeServiceResolver, pathParams,
  classifyResponse, classifyBody, proposeObjectKey, updateSemantics, vendorLabels, paginationParams,
  paginationScheme, skipReason, csvField
} from './lib/spec_helpers.mjs';
import { mapService } from './lib/mapping.mjs';
import { RESOURCE_RULES, METHOD_RULES } from './lib/mapping_rules.mjs';
import { TENANT_SERVICE, tenantServiceDoc } from './lib/tenant_service.mjs';

const outPath = path.join(CONFIG_DIR, 'endpoint_inventory.csv');
const resolver = makeServiceResolver();
const errors = [];
const rows = [];

// the proposed mapping, per service document assembled from the pinned spec
// (the same operations bin/split.mjs emits)
function mappingFor(specKey, spec, service) {
  const doc = { ...spec, paths: {} };
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const rule = resolver.resolveRule(specKey, pathKey, op);
      if (rule?.service !== service) continue;
      doc.paths[pathKey] = doc.paths[pathKey] || {};
      doc.paths[pathKey][verb] = op;
    }
  }
  return mapService(doc, service, specKey, resolver, { resourceRules: RESOURCE_RULES, methodRules: METHOD_RULES }).rows;
}

const docs = SPECS.map((s) => ({ key: s.key, spec: loadSpec(specPath(s.key)) }));
docs.push({ key: 'authored', spec: tenantServiceDoc() });

for (const { key, spec } of docs) {
  const resolve = makeResolver(spec);
  const mappings = new Map();
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      const rule = key === 'authored' ? { service: TENANT_SERVICE, excluded: false, skip: null } : resolver.resolveRule(key, pathKey, op);
      if (!rule) { errors.push(`${key}: no service rule for ${verb.toUpperCase()} ${pathKey}`); continue; }
      let m = null;
      if (!rule.excluded) {
        if (!mappings.has(rule.service)) {
          mappings.set(rule.service, key === 'authored' ? mapService(spec, TENANT_SERVICE, null, resolver, { resourceRules: RESOURCE_RULES, methodRules: METHOD_RULES }).rows : mappingFor(key, spec, rule.service));
        }
        m = mappings.get(rule.service).get(`${pathKey}::${verb}`);
      }
      const body = classifyBody(op, resolve);
      const resp = classifyResponse(op, resolve);
      const skip = rule.excluded ? rule.skip : (m?.skip || skipReason(key, pathKey, op, resolve, verb));
      rows.push({
        spec: key,
        service: rule.service,
        excluded: rule.excluded ? 'yes' : '',
        tag: (op.tags || [])[0] || '',
        operation_id: op.operationId || '',
        verb: verb.toUpperCase(),
        path: pathKey,
        server: key === 'authored' ? 'site' : 'gateway (cloud_id)',
        path_params: pathParams(pathKey).join(' '),
        pagination_params: paginationParams(op, pathItem, resolve).join(' '),
        pagination_scheme: verb === 'get' ? paginationScheme(op, pathItem, resolve) : '',
        body_media_types: body.mediaTypes.join(' '),
        bare_array_body: body.bareArray ? 'yes' : '',
        update_semantics: updateSemantics(verb),
        vendor_labels: vendorLabels(op).join(' '),
        response_shape: resp.shape,
        envelope_candidates: (resp.arrayProps || []).join(' '),
        proposed_resource: skip ? '' : (m?.resource || ''),
        proposed_method: skip ? '' : (m?.method || ''),
        proposed_verb: skip ? '' : (m?.sqlVerb || ''),
        proposed_object_key: skip ? '' : (m?.objectKey || (m?.sqlVerb === 'select' && !m ? proposeObjectKey(resp) : '') || ''),
        skip_reason: skip || ''
      });
    }
  }
}

if (errors.length) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

rows.sort((a, b) => (a.service < b.service ? -1 : a.service > b.service ? 1 : 0) || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0) || (a.verb < b.verb ? -1 : 1));
const header = Object.keys(rows[0]);
fs.writeFileSync(outPath, [header.join(','), ...rows.map((r) => header.map((h) => csvField(r[h])).join(','))].join('\n') + '\n');

const count = (fn) => rows.filter(fn).length;
const bySkip = {};
for (const r of rows) if (r.skip_reason) bySkip[r.skip_reason] = (bySkip[r.skip_reason] || 0) + 1;
const byScheme = {};
for (const r of rows) if (r.pagination_scheme && !r.skip_reason) byScheme[r.pagination_scheme] = (byScheme[r.pagination_scheme] || 0) + 1;
console.log(`Inventory: ${rows.length} operations (${docs.map((d) => d.key).join(', ')}) -> ${path.relative(process.cwd(), outPath)}`);
console.log(`  mapped ${count((r) => !r.skip_reason)}, skipped ${count((r) => r.skip_reason)} (${Object.entries(bySkip).sort().map(([k, n]) => `${k} ${n}`).join(', ')})`);
console.log(`  mapped reads by pagination scheme: ${Object.entries(byScheme).sort().map(([k, n]) => `${k} ${n}`).join(', ')}`);
console.log(`  vendor labels: experimental ${count((r) => r.vendor_labels.includes('experimental') && !r.skip_reason)}, deprecated ${count((r) => r.vendor_labels.includes('deprecated') && !r.skip_reason)} (mapped)`);
