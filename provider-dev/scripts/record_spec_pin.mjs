#!/usr/bin/env node

// Helper for bin/fetch-specs.sh: verifies freshly downloaded specs against
// provider-dev/config/spec_pin.json and moves them into place.
//
// - No pin recorded for a spec: record it (first fetch).
// - Pin matches: refresh the fetched date only.
// - Pin mismatch: fail without writing anything, unless UPDATE=true, in
//   which case the new hash is recorded (a reviewed spec refresh).
//
// Inputs via environment: UPDATE, TMP_DIR, DOWNLOAD_DIR, PIN_FILE.
// Arguments: one "name|url|filename" entry per spec.

import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const update = process.env.UPDATE === 'true';
const tmpDir = process.env.TMP_DIR;
const downloadDir = process.env.DOWNLOAD_DIR;
const pinFile = process.env.PIN_FILE;

if (!tmpDir || !downloadDir || !pinFile) {
  console.error('record_spec_pin.mjs: missing TMP_DIR / DOWNLOAD_DIR / PIN_FILE');
  process.exit(1);
}

const specs = process.argv.slice(2).map((entry) => {
  const [name, url, filename] = entry.split('|');
  return { name, url, filename };
});

let pin = { specs: {} };
if (fs.existsSync(pinFile)) {
  pin = JSON.parse(fs.readFileSync(pinFile, 'utf8'));
}

const today = new Date().toISOString().slice(0, 10);
const errors = [];
const results = [];

for (const spec of specs) {
  const tmpPath = path.join(tmpDir, spec.filename);
  const content = fs.readFileSync(tmpPath);
  const sha256 = crypto.createHash('sha256').update(content).digest('hex');
  const existing = pin.specs[spec.name];

  if (existing && existing.sha256 !== sha256 && !update) {
    errors.push(
      `${spec.name}: upstream content changed (pinned ${existing.sha256.slice(0, 12)}..., ` +
      `fetched ${sha256.slice(0, 12)}...). Re-run with --update to accept the refresh.`
    );
    continue;
  }

  results.push({
    name: spec.name,
    url: spec.url,
    filename: spec.filename,
    sha256,
    bytes: content.length,
    fetched: today,
    status: !existing ? 'pinned' : existing.sha256 === sha256 ? 'unchanged' : 'updated'
  });
}

if (errors.length > 0) {
  console.error('Spec pin verification FAILED, nothing written:');
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

for (const r of results) {
  fs.copyFileSync(path.join(tmpDir, r.filename), path.join(downloadDir, r.filename));
  pin.specs[r.name] = {
    url: r.url,
    filename: r.filename,
    sha256: r.sha256,
    bytes: r.bytes,
    fetched: r.fetched
  };
  console.log(`  ${r.name}: ${r.status} (sha256 ${r.sha256.slice(0, 12)}..., ${r.bytes} bytes)`);
}

fs.mkdirSync(path.dirname(pinFile), { recursive: true });
fs.writeFileSync(pinFile, JSON.stringify(pin, null, 2) + '\n');
