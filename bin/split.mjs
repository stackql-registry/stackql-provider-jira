#!/usr/bin/env node

// Splits the cleaned Jira Cloud specs into per-service StackQL service specs.
//
// The platform spec is split by tag with consolidation: every tag must map to
// a service in provider-dev/config/service_names.json (keyed by spec name,
// "*" matches any tag). The agile spec maps to its own service(s) the same
// way. Unmapped tags fail the run without writing anything.
//
// provider-utils split() cleans its output dir on every call, so each spec is
// split into a temp dir and the service specs are merged into --output-dir.
// Two specs contributing the same service name is an error.
//
// Usage:
//   node bin/split.mjs --provider-name jira \
//     --input-dir provider-dev/downloaded/cleaned \
//     --output-dir provider-dev/source \
//     [--services issues,projects,agile] [--overwrite] [--verbose]

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { providerdev } from '@stackql/provider-utils';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const providerName = getArg('--provider-name') || 'jira';
const inputDir = getArg('--input-dir') || path.join(repoRoot, 'provider-dev', 'downloaded', 'cleaned');
const outputDir = getArg('--output-dir') || path.join(repoRoot, 'provider-dev', 'source');
const serviceNamesPath = getArg('--service-names') || path.join(repoRoot, 'provider-dev', 'config', 'service_names.json');
const servicesFilter = getArg('--services') ? getArg('--services').split(',').map((s) => s.trim()) : null;
const overwrite = args.includes('--overwrite');
const verbose = args.includes('--verbose');

const serviceNames = JSON.parse(fs.readFileSync(serviceNamesPath, 'utf8'));

const specFiles = fs.readdirSync(inputDir).filter((f) => f.endsWith('.json')).sort();
if (specFiles.length === 0) {
  console.error(`Error: no cleaned specs found in ${inputDir} (run npm run clean-specs first)`);
  process.exit(1);
}

// Prepare the output directory, preserving non-spec files (e.g. .gitkeep)
fs.mkdirSync(outputDir, { recursive: true });
const existing = fs.readdirSync(outputDir).filter((f) => /\.(yaml|yml|json)$/.test(f));
if (existing.length > 0 && !overwrite) {
  console.error(`Error: output directory ${outputDir} is not empty. Use --overwrite to replace existing service specs.`);
  process.exit(1);
}

const written = new Map(); // service spec filename -> source spec file

async function splitSpec(specFile) {
  const specName = specFile.replace(/\.json$/, '');
  const tagMap = serviceNames[specName];
  if (!tagMap) {
    console.error(`Error: no entry for spec "${specName}" in ${serviceNamesPath}`);
    process.exit(1);
  }

  const unmapped = new Set();
  const svcDiscriminatorFn = (pathKey, operationId, tags) => {
    const tag = (tags && tags.length > 0) ? tags[0] : '';
    const service = tagMap[tag] || tagMap['*'];
    if (!service) {
      unmapped.add(tag || `(no tag: ${pathKey})`);
      return 'unmapped_service';
    }
    return service;
  };

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stackql-split-'));
  try {
    const result = await providerdev.split({
      apiDoc: path.join(inputDir, specFile),
      providerName,
      outputDir: tmpDir,
      svcDiscriminator: 'function',
      svcDiscriminatorFn,
      overwrite: true,
      verbose,
      svcNameOverrides: {}
    });
    if (!result) {
      console.error(`Error: split failed for ${specFile}`);
      process.exit(1);
    }
    if (unmapped.size > 0) {
      console.error(`Error: ${specFile} has tags with no service mapping in ${serviceNamesPath}:`);
      for (const t of [...unmapped].sort()) console.error(`  ${t}`);
      process.exit(1);
    }

    for (const outFile of fs.readdirSync(tmpDir)) {
      const service = outFile.replace(/\.(yaml|yml|json)$/, '');
      if (servicesFilter && !servicesFilter.includes(service)) continue;
      if (written.has(outFile)) {
        console.error(`Error: service spec ${outFile} produced by both ${written.get(outFile)} and ${specFile}`);
        process.exit(1);
      }
      fs.copyFileSync(path.join(tmpDir, outFile), path.join(outputDir, outFile));
      written.set(outFile, specFile);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

// Clear previous service specs only after config validation passed
for (const f of existing) {
  fs.rmSync(path.join(outputDir, f));
}

for (const specFile of specFiles) {
  console.log(`Splitting ${specFile}`);
  await splitSpec(specFile);
}

console.log(`Split completed: ${written.size} service specs written to ${outputDir}`);
for (const f of [...written.keys()].sort()) {
  console.log(`  ${f}`);
}
