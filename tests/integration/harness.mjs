// Shared plumbing for the integration runner and the probe: locate the
// stackql binary, materialise the test registry pointed at the mock, and run
// SQL asynchronously against it. No side effects on import.

import { spawn } from 'child_process';
import { existsSync, rmSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PROVIDER_NAME } from '../../provider-dev/scripts/lib/spec_helpers.mjs';

export const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..');

export function findStackql() {
  if (process.env.STACKQL) return process.env.STACKQL;
  const local = path.join(repoRoot, process.platform === 'win32' ? 'stackql.exe' : 'stackql');
  if (existsSync(local)) return local;
  return 'stackql'; // PATH
}

const GATEWAY = 'https://api.atlassian.com/ex/jira/{cloud_id}';
const SITE = 'https://{site}.atlassian.net';
const TOKEN_URL = 'https://auth.atlassian.com/oauth/token';

// Copy the generated provider docs into tests/integration/.registry-tmp
// (gitignored, recreated each run) and point the servers and the OAuth2
// token URL at the mock:
//   https://api.atlassian.com/ex/jira/{cloud_id} -> http://127.0.0.1:<port>/ex/jira/{cloud_id}
//   https://{site}.atlassian.net                 -> http://127.0.0.1:<port>/_site/{site}
//   https://auth.atlassian.com/oauth/token       -> http://127.0.0.1:<port>/oauth/token
// The server variables (cloud_id with its x-stackQL-envVar, site) are
// preserved: only the scheme and host change. provider-dev/** is never
// modified.
export function buildTestRegistry(port) {
  const srcDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', PROVIDER_NAME, 'v00.00.00000');
  const tmpDir = path.join(here, '.registry-tmp');
  const outDir = path.join(tmpDir, 'src', PROVIDER_NAME, 'v00.00.00000');
  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(path.join(outDir, 'services'), { recursive: true });
  const mock = `http://127.0.0.1:${port}`;

  const providerText = readFileSync(path.join(srcDir, 'provider.yaml'), 'utf8');
  if (!providerText.includes(TOKEN_URL)) throw new Error(`provider.yaml does not carry the token URL ${TOKEN_URL}`);
  writeFileSync(path.join(outDir, 'provider.yaml'), providerText.split(TOKEN_URL).join(`${mock}/oauth/token`));

  for (const f of readdirSync(path.join(srcDir, 'services'))) {
    if (!f.endsWith('.yaml')) continue;
    let text = readFileSync(path.join(srcDir, 'services', f), 'utf8');
    if (!text.includes(GATEWAY) && !text.includes(SITE)) throw new Error(`no gateway or site server template found in ${f}`);
    text = text.split(GATEWAY).join(`${mock}/ex/jira/{cloud_id}`).split(SITE).join(`${mock}/_site/{site}`);
    writeFileSync(path.join(outDir, 'services', f), text);
  }
  return tmpDir;
}

export function registryArg(tmpDir) {
  const regPath = tmpDir.split(path.sep).join('/');
  return JSON.stringify({ url: `file://${regPath}`, localDocRoot: regPath, verifyConfig: { nopVerify: true } });
}

// IMPORTANT: async (spawn, not spawnSync) - the mock server runs on this
// process's event loop, so a synchronous wait for stackql deadlocks.
// Returns { rows, err }: rows is the parsed JSON (an empty array for zero
// rows, [{ _text }] for DML status text), err the stderr when it looks like
// an error.
export function makeRunSql(registry, baseEnv, { verbose = false, bin = findStackql() } = {}) {
  // extraArgs are extra stackql flags for one statement (e.g. --auth=...)
  return function runSql(sql, envOverrides = {}, extraArgs = []) {
    return new Promise((resolve) => {
      const env = { ...process.env, ...baseEnv, ...envOverrides };
      for (const [k, v] of Object.entries({ ...baseEnv, ...envOverrides })) if (v === undefined) delete env[k];
      const child = spawn(bin, [`--registry=${registry}`, ...extraArgs, 'exec', sql, '--output', 'json'], { cwd: repoRoot, env });
      let stdout = '', stderr = '';
      child.stdout.on('data', (d) => { stdout += d; });
      child.stderr.on('data', (d) => { stderr += d; });
      const timer = setTimeout(() => child.kill(), 120000);
      child.on('error', (e) => { clearTimeout(timer); resolve({ rows: null, err: String(e), stdout: '', stderr: String(e) }); });
      child.on('close', () => {
        clearTimeout(timer);
        stdout = stdout.trim();
        stderr = stderr.trim();
        if (verbose) console.log(`    sql: ${sql}\n    out: ${stdout.slice(0, 400)}${stderr ? `\n    err: ${stderr.slice(0, 400)}` : ''}`);
        // stackql's refusals do not all say "error": an unresolved server
        // variable and a missing credential are each reported in their own
        // words, and some land on stdout
        const errish = /http response status code: [45]|error|panic|no matching operation|cannot find matching operation|disallowed|cannot find any viable servers|requires an input|cannot be used|not provided|no such column/i;
        if (errish.test(stderr)) return resolve({ rows: null, err: stderr, stdout, stderr });
        if (!stdout) return resolve({ rows: [], err: null, stdout, stderr });
        try {
          resolve({ rows: JSON.parse(stdout) ?? [], err: null, stdout, stderr }); // literal null for zero rows
        } catch {
          resolve({ rows: [{ _text: stdout }], err: errish.test(stdout) ? stdout : null, stdout, stderr }); // DML status text
        }
      });
    });
  };
}
