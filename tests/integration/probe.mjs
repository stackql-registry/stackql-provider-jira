#!/usr/bin/env node

// Developer probe: start the mock API, materialise the test registry (as
// run_integration_tests.mjs does) and run the SQL statements given on the
// command line, printing stackql's stdout/stderr and the wire calls the mock
// saw for each. This is how bindings get debugged.
//
// Usage: npm run probe -- "SELECT ..." "EXEC ..." [--env KEY=VALUE ...] [--unset KEY] [--auth JSON]

import { startMockServer, CLIENT_ID, CLIENT_SECRET, CLOUD_ID } from './mock_jira_server.mjs';
import { buildTestRegistry, registryArg, makeRunSql, findStackql } from './harness.mjs';

// The environment the provider reads (as in run_integration_tests.mjs).
const PROVIDER_ENV = { ATLASSIAN_CLIENT_ID: CLIENT_ID, ATLASSIAN_CLIENT_SECRET: CLIENT_SECRET, ATLASSIAN_CLOUD_ID: CLOUD_ID };

const args = process.argv.slice(2);
const sqls = [];
const envOverrides = {};
const extraArgs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--env') { const [k, ...v] = args[++i].split('='); envOverrides[k] = v.join('='); }
  else if (args[i] === '--unset') { envOverrides[args[++i]] = undefined; }
  else if (args[i] === '--auth') { extraArgs.push(`--auth=${args[++i]}`); }
  else sqls.push(args[i]);
}
if (sqls.length === 0) {
  console.error('usage: npm run probe -- "SELECT ..." ["EXEC ..."] [--env KEY=VALUE] [--unset KEY] [--auth JSON]');
  process.exit(2);
}

const { server, port, log } = await startMockServer();
const registry = registryArg(buildTestRegistry(port));
const runSql = makeRunSql(registry, PROVIDER_ENV);
console.log(`mock API on 127.0.0.1:${port}, stackql: ${findStackql()}`);

try {
  for (const sql of sqls) {
    const mark = log.length;
    const { stdout, stderr } = await runSql(sql, envOverrides, extraArgs);
    console.log(`\n=== ${sql}`);
    console.log(`stdout: ${stdout.slice(0, 2000)}`);
    if (stderr) console.log(`stderr: ${stderr.slice(0, 1000)}`);
    for (const e of log.slice(mark)) {
      console.log(`wire: ${e.kind} ${e.method} ${e.path} query=${JSON.stringify(e.query)} auth=${e.authorization ? e.authorization.split(' ')[0] : '-'} ct=${e.contentType} body=${e.kind === 'token' ? '(token request)' : e.raw}`);
    }
  }
} finally {
  server.close();
}
