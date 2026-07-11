#!/usr/bin/env node

// Cleans the downloaded Jira Cloud specs and validates them with
// @apidevtools/swagger-parser, writing cleaned specs to
// provider-dev/downloaded/cleaned/ and a fix report to
// provider-dev/config/clean_report.json.
//
// The Jira Cloud specs are continuously delivered and have historically
// shipped consumer-breaking defects. Every known defect class is detected on
// every run, whether or not the current snapshot exhibits it:
//
//   1. duplicate JSON keys (duplicated method/path definitions) - JSON.parse
//      collapses these silently, so they are detected by scanning the raw
//      text; byte-identical duplicates are deduped (fix recorded),
//      conflicting duplicates are unfixable
//   2. duplicate operationIds across distinct operations - renamed
//      deterministically with a numeric suffix (fix recorded)
//   3. operations with no tag - unfixable (the tag drives the service split;
//      a refresh introducing untagged operations needs a mapping decision)
//   4. arrays of enums (type: array with items.enum) - historically rejected
//      by generators; the items enum is dropped, keeping the item type
//      (fix recorded)
//   5. out-of-scope path prefixes - each spec carries surfaces beyond the
//      site-level REST APIs the provider targets; paths outside the per-spec
//      allowlist are dropped (fix recorded per path):
//        - platform: /rest/atlassian-connect and /rest/forge (app-context
//          APIs for Connect/Forge apps), /rest/internal (not a public API)
//        - agile: the dev-tools ingestion APIs (/rest/devinfo, /rest/builds,
//          /rest/deployments, /rest/featureflags, /rest/remotelinks,
//          /rest/security, /rest/operations, /rest/devopscomponents) are
//          Connect-app integration surfaces for CI/CD tools, not site-level
//          basic-auth APIs; /rest/software/1.0 (board/epic/sprint issue
//          reads, basic-auth callable) is kept
//
// Anything unfixable fails the run without writing any output.
//
// Usage: npm run clean-specs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SwaggerParser from '@apidevtools/swagger-parser';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const downloadDir = path.join(repoRoot, 'provider-dev', 'downloaded');
const cleanedDir = path.join(downloadDir, 'cleaned');
const pinPath = path.join(repoRoot, 'provider-dev', 'config', 'spec_pin.json');
const reportPath = path.join(repoRoot, 'provider-dev', 'config', 'clean_report.json');

const HTTP_VERBS = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options', 'trace'];

// Per-spec path allowlist: the site-level REST surfaces the provider targets.
// Everything else in the published specs is an app-context or internal API.
const SCOPE_PREFIXES = {
  'jira-platform-v3': ['/rest/api/3/'],
  'jira-software-agile': ['/rest/agile/1.0/', '/rest/software/1.0/']
};

// ---------------------------------------------------------------------------
// Duplicate JSON key scanner - a minimal recursive-descent pass over the raw
// text that records object keys appearing more than once in the same object,
// with the JSON pointer of the containing object and whether the duplicate
// values are byte-identical.
// ---------------------------------------------------------------------------

function scanDuplicateKeys(text) {
  let i = 0;
  const dups = [];

  const skipWs = () => { while (i < text.length && ' \t\r\n'.includes(text[i])) i++; };

  function parseString() {
    const start = i;
    i++; // opening quote
    while (i < text.length) {
      if (text[i] === '\\') i += 2;
      else if (text[i] === '"') { i++; break; }
      else i++;
    }
    return text.slice(start, i);
  }

  function parseValue(trail) {
    skipWs();
    const c = text[i];
    if (c === '{') return parseObject(trail);
    if (c === '[') return parseArray(trail);
    if (c === '"') return parseString();
    const start = i;
    while (i < text.length && !',]}'.includes(text[i]) && !' \t\r\n'.includes(text[i])) i++;
    return text.slice(start, i);
  }

  function parseObject(trail) {
    const start = i;
    i++; // {
    const seen = new Map();
    skipWs();
    if (text[i] === '}') { i++; return text.slice(start, i); }
    for (;;) {
      skipWs();
      const key = JSON.parse(parseString());
      skipWs();
      i++; // :
      const valRaw = parseValue(trail.concat(key));
      if (seen.has(key)) {
        dups.push({ object: '/' + trail.join('/'), key, identical: seen.get(key) === valRaw });
      } else {
        seen.set(key, valRaw);
      }
      skipWs();
      if (text[i] === ',') { i++; continue; }
      if (text[i] === '}') { i++; break; }
      throw new Error(`JSON scan error at offset ${i}`);
    }
    return text.slice(start, i);
  }

  function parseArray(trail) {
    const start = i;
    i++; // [
    skipWs();
    if (text[i] === ']') { i++; return text.slice(start, i); }
    for (;;) {
      parseValue(trail);
      skipWs();
      if (text[i] === ',') { i++; continue; }
      if (text[i] === ']') { i++; break; }
      throw new Error(`JSON scan error at offset ${i}`);
    }
    return text.slice(start, i);
  }

  parseValue([]);
  return dups;
}

// ---------------------------------------------------------------------------
// Fix passes
// ---------------------------------------------------------------------------

function dropOutOfScopePaths(spec, specName, fixes, unfixable) {
  const prefixes = SCOPE_PREFIXES[specName];
  if (!prefixes) {
    unfixable.push(`no scope prefix allowlist defined for spec "${specName}"`);
    return;
  }
  for (const pathKey of Object.keys(spec.paths || {})) {
    if (!prefixes.some((prefix) => pathKey.startsWith(prefix))) {
      delete spec.paths[pathKey];
      fixes.push(`dropped out-of-scope path ${pathKey} (outside ${prefixes.join(', ')})`);
    }
  }
}

function fixDuplicateOperationIds(spec, fixes, unfixable) {
  const seen = new Map();
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      if (!op.operationId) {
        unfixable.push(`missing operationId: ${verb} ${pathKey}`);
        continue;
      }
      if (seen.has(op.operationId)) {
        const n = seen.get(op.operationId) + 1;
        seen.set(op.operationId, n);
        const renamed = `${op.operationId}_${n}`;
        fixes.push(`renamed duplicate operationId ${op.operationId} -> ${renamed} (${verb} ${pathKey})`);
        op.operationId = renamed;
        seen.set(renamed, 1);
      } else {
        seen.set(op.operationId, 1);
      }
    }
  }
}

function checkOperationTags(spec, unfixable) {
  for (const [pathKey, pathItem] of Object.entries(spec.paths || {})) {
    for (const verb of HTTP_VERBS) {
      const op = pathItem[verb];
      if (!op) continue;
      if (!op.tags || op.tags.length === 0) {
        unfixable.push(`operation has no tag (service split is tag-driven): ${verb} ${pathKey}`);
      }
    }
  }
}

function fixArraysOfEnums(spec, fixes) {
  const walk = (node, trail) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach((v, idx) => walk(v, `${trail}/${idx}`));
      return;
    }
    if (node.type === 'array' && node.items && Array.isArray(node.items.enum)) {
      delete node.items.enum;
      fixes.push(`dropped items.enum on array schema at ${trail} (kept items type: ${node.items.type || 'unspecified'})`);
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${trail}/${k}`);
  };
  walk(spec.components?.schemas || {}, '/components/schemas');
  walk(spec.paths || {}, '/paths');
}

async function validateSpec(spec) {
  try {
    // validate() mutates its input while dereferencing, so pass a clone
    await SwaggerParser.validate(structuredClone(spec));
    return { valid: true };
  } catch (err) {
    return { valid: false, error: err.message.split('\n')[0] };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

if (!fs.existsSync(pinPath)) {
  console.error(`Error: ${pinPath} not found - run npm run fetch-specs first`);
  process.exit(1);
}
const pin = JSON.parse(fs.readFileSync(pinPath, 'utf8'));

const report = { specs: {} };
const outputs = [];
let failed = false;

for (const [name, pinned] of Object.entries(pin.specs)) {
  const rawPath = path.join(downloadDir, pinned.filename);
  if (!fs.existsSync(rawPath)) {
    console.error(`Error: ${rawPath} not found - run npm run fetch-specs first`);
    process.exit(1);
  }
  console.log(`\nCleaning ${name} (${pinned.filename})`);
  const raw = fs.readFileSync(rawPath, 'utf8');

  const fixes = [];
  const unfixable = [];

  // 1. duplicate raw JSON keys (invisible after JSON.parse)
  const dups = scanDuplicateKeys(raw);
  for (const d of dups) {
    if (d.identical) {
      fixes.push(`deduplicated byte-identical duplicate key "${d.key}" in object ${d.object}`);
    } else {
      unfixable.push(`conflicting duplicate key "${d.key}" in object ${d.object} - values differ, needs manual review`);
    }
  }

  const spec = JSON.parse(raw); // keeps the last occurrence of any duplicate key

  const before = await validateSpec(spec);
  console.log(`  validation before: ${before.valid ? 'VALID' : `INVALID (${before.error})`}`);

  // 2-5. fix passes
  dropOutOfScopePaths(spec, name, fixes, unfixable);
  fixDuplicateOperationIds(spec, fixes, unfixable);
  checkOperationTags(spec, unfixable);
  fixArraysOfEnums(spec, fixes);

  const after = await validateSpec(spec);
  console.log(`  validation after:  ${after.valid ? 'VALID' : `INVALID (${after.error})`}`);
  if (!after.valid) {
    unfixable.push(`spec does not validate after fixes: ${after.error}`);
  }

  for (const f of fixes) console.log(`  fix: ${f}`);
  for (const u of unfixable) console.log(`  UNFIXABLE: ${u}`);

  report.specs[name] = {
    filename: pinned.filename,
    sha256: pinned.sha256,
    validationBefore: before,
    validationAfter: after,
    fixesApplied: fixes,
    unfixable
  };

  if (unfixable.length > 0) failed = true;
  outputs.push({ filename: pinned.filename, spec });
}

if (failed) {
  console.error('\nFAILED: unfixable violations found, nothing written');
  process.exit(1);
}

fs.mkdirSync(cleanedDir, { recursive: true });
for (const { filename, spec } of outputs) {
  fs.writeFileSync(path.join(cleanedDir, filename), JSON.stringify(spec, null, 2) + '\n');
}
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');

const totalFixes = Object.values(report.specs).reduce((n, s) => n + s.fixesApplied.length, 0);
console.log(`\nCleaned specs written to ${cleanedDir} (${totalFixes} fixes applied), report at ${reportPath}`);
