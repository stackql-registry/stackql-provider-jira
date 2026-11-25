#!/usr/bin/env node

// Splits the two pinned Jira documents (platform REST API v3 and Jira
// Software) into per-service StackQL service specs, plus the authored
// atlassian_tenant service.
//
// The service of each operation comes from the ordered rules in
// provider-dev/config/service_names.json (spec, first vendor tag, path
// regex; first match wins). An operation that matches no rule FAILS the run
// without writing - add a rule. A rule with "excluded": true classifies the
// operation for the inventory but its service is never emitted (every
// operation in it is app-only). A service may not take operations from both
// documents (their component schemas would collide).
//
// provider-utils split() cleans its output dir on every call, so each
// document is split into its own temp dir and the service specs are copied
// into --output-dir only after both splits and the rules validated.
//
// Every Jira service is served through the Atlassian API gateway
// (SERVERS.gateway: https://api.atlassian.com/ex/jira/{cloud_id}, cloud_id
// resolved from ATLASSIAN_CLOUD_ID); the paths keep their /rest/api/3,
// /rest/agile/1.0 and /rest/software/1.0 prefixes. The atlassian_tenant
// service uses SERVERS.site (https://{site}.atlassian.net). generate is run
// without --servers, so these templates are kept.
//
// Usage:
//   node bin/split.mjs [--output-dir provider-dev/source] [--services a,b,c] [--overwrite] [--verbose]

import fs from 'fs';
import os from 'os';
import path from 'path';
import yaml from 'js-yaml';
import { providerdev } from '@stackql/provider-utils';
import {
  PROVIDER_NAME, SPECS, SERVERS, REPO_ROOT, SOURCE_DIR, makeServiceResolver, specPath, dumpYaml
} from '../provider-dev/scripts/lib/spec_helpers.mjs';
import { TENANT_SERVICE, tenantServiceDoc } from '../provider-dev/scripts/lib/tenant_service.mjs';

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const outputDir = getArg('--output-dir') ? path.resolve(getArg('--output-dir')) : SOURCE_DIR;
const servicesFilter = getArg('--services') ? getArg('--services').split(',').map((s) => s.trim()) : null;
const overwrite = args.includes('--overwrite');
const verbose = args.includes('--verbose');

for (const s of SPECS) {
  if (!fs.existsSync(specPath(s.key))) {
    console.error(`Error: ${path.relative(REPO_ROOT, specPath(s.key))} not found (run make fetch-spec first)`);
    process.exit(1);
  }
}
const resolver = makeServiceResolver();

fs.mkdirSync(outputDir, { recursive: true });
const existing = fs.readdirSync(outputDir).filter((f) => /\.(yaml|yml|json)$/.test(f));
if (existing.length > 0 && !overwrite) {
  console.error(`Error: output directory ${outputDir} is not empty. Use --overwrite to replace existing service specs.`);
  process.exit(1);
}

const errors = [];
const serviceSpec = new Map(); // service -> spec key
const produced = new Map(); // service -> { doc, file }
const excludedCounts = {};
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'stackql-split-'));
try {
  for (const s of SPECS) {
    const tmpDir = path.join(tmpRoot, s.key);
    const svcDiscriminatorFn = (pathKey, operationId, tags, { operation }) => {
      const rule = resolver.resolveRule(s.key, pathKey, operation);
      if (!rule) {
        errors.push(`${s.key}: no service rule for ${operationId} ${pathKey} (tag ${JSON.stringify(tags[0] || '')})`);
        return null;
      }
      if (rule.excluded) {
        excludedCounts[rule.service] = (excludedCounts[rule.service] || 0) + 1;
        return null; // classified, not emitted
      }
      const prior = serviceSpec.get(rule.service);
      if (prior && prior !== s.key) errors.push(`service ${rule.service} takes operations from both ${prior} and ${s.key}`);
      serviceSpec.set(rule.service, s.key);
      return rule.service;
    };
    const result = await providerdev.split({
      apiDoc: specPath(s.key),
      providerName: PROVIDER_NAME,
      outputDir: tmpDir,
      svcDiscriminator: 'function',
      svcDiscriminatorFn,
      overwrite: true,
      verbose,
      svcNameOverrides: {}
    });
    if (!result) errors.push(`provider-utils split failed on ${s.key}`);
    if (!fs.existsSync(tmpDir)) continue;
    for (const outFile of fs.readdirSync(tmpDir)) {
      const service = outFile.replace(/\.(yaml|yml|json)$/, '');
      if (produced.has(service)) { errors.push(`service ${service} produced by two documents`); continue; }
      const doc = yaml.load(fs.readFileSync(path.join(tmpDir, outFile), 'utf8'));
      produced.set(service, { doc, file: `${service}.yaml` });
    }
  }
} finally {
  fs.rmSync(tmpRoot, { recursive: true, force: true });
}

for (const r of resolver.unusedRules()) errors.push(`service rule #${r.index} (${r.service}) matched no operation - remove or fix it`);
for (const service of produced.keys()) {
  if (!resolver.services[service]) errors.push(`service ${service} has no title/description entry in service_names.json "services"`);
}
if (errors.length > 0) {
  console.error(`Split FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of [...new Set(errors)].sort()) console.error(`  ${e}`);
  process.exit(1);
}

// The authored tenant service
produced.set(TENANT_SERVICE, { doc: tenantServiceDoc(), file: `${TENANT_SERVICE}.yaml`, authored: true });

for (const f of existing) fs.rmSync(path.join(outputDir, f));
const written = [];
for (const [service, { doc, file, authored }] of [...produced.entries()].sort()) {
  if (servicesFilter && !servicesFilter.includes(service)) continue;
  const meta = resolver.services[service];
  if (!authored) {
    doc.servers = JSON.parse(JSON.stringify(SERVERS.gateway));
    doc.info = { ...(doc.info || {}), title: meta.title, description: meta.description, 'x-stackQL-sourceSpec': serviceSpec.get(service) };
  } else {
    doc.info['x-stackQL-sourceSpec'] = 'authored';
  }
  fs.writeFileSync(path.join(outputDir, file), dumpYaml(doc));
  const ops = Object.values(doc.paths || {}).reduce((n, pi) => n + ['get', 'post', 'put', 'patch', 'delete'].filter((v) => pi[v]).length, 0);
  written.push(`${file} (${ops} operations${authored ? ', authored' : `, ${serviceSpec.get(service)}`})`);
}

console.log(`Split completed: ${written.length} service specs written to ${path.relative(REPO_ROOT, outputDir)}`);
for (const f of written) console.log(`  ${f}`);
console.log(`Excluded (classified, not emitted): ${Object.entries(excludedCounts).sort().map(([k, n]) => `${k} ${n}`).join(', ') || 'none'}`);
