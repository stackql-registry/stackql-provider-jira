# CLAUDE.md

## Project

This repository builds and documents the `jira` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against the Jira Cloud REST APIs - issues, projects, users, groups, permissions, workflows, fields, screens, dashboards, filters, versions, components, webhooks, audit records, and the Jira Software agile surface (boards, sprints, epics, backlog).

The provider is built using the `@stackql/provider-utils` package and follows the repository pattern established in [`stackql-registry/stackql-provider-k8s`](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev) (branch `feature/provider-dev`). When in doubt about structure, scripts, testing, or docs, that repository is the reference implementation - mirror it.

## Spec sources

Atlassian publishes vendor OpenAPI 3.x specs. This is a pattern-1 build with a spec-cleaning step, not a derivation-from-docs build:

- **Jira Cloud platform REST API v3** - `https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json` (also mirrored at `dac-static.atlassian.com`). One large spec, tag-organized, covering the platform surface. v2 and v3 offer the same operations; v3 is the build target (ADF-format rich text fields).
- **Jira Software (agile) REST API** - `https://dac-static.atlassian.com/cloud/jira/software/swagger.v3.json`, served under `/rest/agile/1.0`. Boards, sprints, epics, backlog.
- **Jira Service Management** - separate spec, out of scope for v1. Record as a follow-up in the README.

Known quality issues in the published specs, reported by consumers over the years - the pre-clean step in derivation must detect and fix these deterministically:

- duplicate operation definitions (duplicated method definitions that break generators)
- schema constructs some generators reject (historically `FieldValueClause`, arrays of enums) - validate the spec with `@apidevtools/swagger-parser` and record every fix applied
- Jira Cloud is a continuously delivered API; snapshot the specs into `provider-dev/downloaded/` with a dated pin recorded in `provider-dev/config/spec_pin.json`, and treat refreshes as reviewed diffs

The cleaned specs are build artifacts produced by deterministic scripts in `provider-dev/scripts/`. Never hand-edit spec files - fix the cleaning script and re-run.

## Design principles

- **One provider, any Jira Cloud site** - the base URL is `https://{site}.atlassian.net`, with `{site}` a runtime server variable. Because `{site}` is a single dot-free subdomain label inside a fixed domain, the any-sdk gorilla/mux dotted-host constraint that affects the k8s and proxmox providers should not apply here - verify in phase 1 and record the confirmation. Platform paths sit under `/rest/api/3`, agile paths under `/rest/agile/1.0`; both are path prefixes under the same server, handled per-service.
- **Mixed response envelopes** - Jira has no single wrapper convention. Collections appear as `{startAt, maxResults, total, issues: [...]}`, `{isLast, values: [...]}`, bare arrays, and keyed objects. `stackql_object_key` is set per method from the actual response schema (`$.issues`, `$.values`, none for bare arrays - normalize wraps bare-array responses). Do not assume a uniform key.
- **Mixed pagination** - three schemes coexist: `startAt`/`maxResults` offset pagination (most list endpoints), `nextPageToken` cursor pagination (the current issue search endpoint `/search/jql`; the legacy offset-based `/search` is deprecated - map the current endpoint), and `isLast`/`nextPage`-URL hybrids. Determining what any-sdk pagination config can express (offset traversal vs response-token) is the primary phase 1 investigation. Where a scheme cannot be configured, the method still works with explicit `startAt`/`maxResults` parameters - document per-resource pagination behaviour honestly in the docs rather than implying transparent traversal everywhere.
- **JQL is a parameter, not a translation target** - issue search takes a `jql` string parameter, supplied in the `WHERE` clause (`WHERE jql = 'project = ENG AND status != Done'`). SQL-predicate-to-JQL pushdown is a future any-sdk enhancement (only OData `$filter` rendering exists today, per the k8s build); do not attempt it in the provider. Embedded JQL inside SQL is the flagship demo, not a limitation to hide.
- **ADF fields are opaque** - v3 rich text (issue `description`, comment `body`, worklog comments) is Atlassian Document Format JSON. These are JSON-blob columns addressed with `json_extract`; the provider does not model ADF structure.
- **Users are accountIds** - user-referencing operations key on `accountId` (GDPR-era API), not usernames. Carry this through docs examples.
- **Reads and writes** - full lifecycle: issue create/edit/delete, transitions, comments, worklogs, versions, components, project and scheme administration where the API supports it. Attachment upload (multipart + `X-Atlassian-Token: no-check`) is out of scope for v1; attachment metadata reads are in scope.

## Toolchain rules

- Use the **latest** `@stackql/provider-utils` (see [npm](https://www.npmjs.com/package/@stackql/provider-utils)). Check for a newer version before starting work; do not pin to an old minor.
- Node.js >= 20. `type: module` in package.json.
- Wrap the two CLI entry points (`provider-dev-utils.mjs`, `docgen-utils.mjs`) as npm scripts, invoked through `node` (not `.bin` shims). Pass flags with npm's `--` separator.
- A local `stackql` binary is required for testing (`$STACKQL`, `./stackql`, or on `PATH`).

## Repository layout

```
provider-dev/
  downloaded/          # pinned vendor spec snapshots (platform v3, agile)
  source/              # cleaned + split per-service OpenAPI specs (build artifacts)
  config/              # spec pin, service name overrides, all_services.csv mappings
  openapi/src/jira/    # generated provider output
  scripts/             # clean_specs.mjs, map_operations.mjs, pre_normalize.mjs, post_process.mjs
  docgen/provider-data/       # headerContent1.txt, headerContent2.txt for docs landing page
bin/                   # thin shell/node wrappers for npm scripts (mirror k8s repo)
tests/
  integration/         # mock Jira Cloud server + row-level assertions
  fixtures/            # seed objects for UAT (test project, issues)
  smoke_test.py        # pystackql smoke suite
website/               # Docusaurus 3.10 microsite
CLAUDE.md
README.md              # written in the style of the k8s provider README, steps 0-8
```

## Build pipeline

Every step is deterministic and re-runnable. Manual mapping decisions are applied as rules in scripts, never hand-edits to CSVs or specs. Validate-and-fail-without-writing is the standard for every script.

### 0. Fetch and clean the specs

`bin/fetch-specs.sh` downloads the pinned platform v3 and agile specs into `provider-dev/downloaded/` and records the pin. `provider-dev/scripts/clean_specs.mjs` then applies the deterministic fixes (duplicate operations, generator-breaking schemas), validates with swagger-parser, and writes a fix report. Fail without writing on unfixable violations.

### 1. Split into service specs

`npm run split` with `--provider-name jira`, splitting the platform spec by tag (with consolidation - the spec has dozens of fine-grained tags; group related tags into coherent services) and taking the agile spec as its own service(s). Candidate service split (final decision from the endpoint inventory, recorded in `provider-dev/config/service_names.json`):

`issues` (issues, comments, worklogs, transitions, links, watchers, votes, attachments metadata, issue search), `projects` (projects, components, versions, project roles, project categories, project features), `users`, `groups`, `permissions` (permissions, permission schemes, security schemes, security levels), `workflows` (workflows, workflow schemes, statuses, transitions admin), `fields` (fields, custom field contexts/options, field configurations), `issue_types` (issue types, issue type schemes, issue type screen schemes), `screens` (screens, screen schemes, tabs), `dashboards`, `filters`, `priorities_resolutions` (or split), `labels`, `webhooks`, `audit` (audit records), `jql` (JQL utilities: parse, autocomplete data, sanitize), `myself_serverinfo` (or fold into a `platform` service), `agile` (boards, sprints, epics, backlog, builds/deployments if present)

### 2. Generate mappings

`npm run generate-mappings`, then `node provider-dev/scripts/map_operations.mjs` populates `stackql_resource_name`, `stackql_method_name`, `stackql_verb`, `stackql_object_key` mechanically:

| Operation pattern | StackQL verb | Resource / method |
|---|---|---|
| GET collection / search | `SELECT` | `<resource>.list` / `<resource>.search`, objectKey per response schema |
| GET single | `SELECT` | `<resource>.get` |
| POST create | `INSERT` | `<resource>.create` |
| PUT edit (Jira PUT carries partial field-update semantics on most resources) | `UPDATE` | `<resource>.update` - document the deviation from the k8s PUT->REPLACE convention |
| DELETE | `DELETE` | `<resource>.delete` |
| POST actions (do transition, notify, archive/restore, assign via PUT assignee, move, rank, sprint start/close) | `EXEC` | `<resource>.<action>` |
| bulk operations | `EXEC` | `<resource>.bulk_<action>` |

Resource names are plural snake_case (`issues`, `projects`, `permission_schemes`, `custom_field_contexts`, `sprints`), consistent with `aws`, `google`, `databricks`, and the k8s rebuild. The current cursor-based issue search endpoint maps as the primary `issues.search` method; the deprecated legacy search endpoint is skipped with a reason code. The script validates: every generator-relevant operation mapped or explicitly skipped with a reason code, method names unique per resource, overloaded SQL verbs have unique required-parameter signatures. Fail without writing on any violation.

### 3. Normalize

`node provider-dev/scripts/pre_normalize.mjs` (Jira-specific adjustments discovered during the build: ADF schemas lowered to opaque strings, polymorphic field-value schemas), then `npm run normalize -- --api-dir provider-dev/source`. Expect heavy `oneOf`/`anyOf` usage in field and JQL schemas to be flattened, and bare-array list responses wrapped.

### 4. Generate the provider

```bash
rm -rf provider-dev/openapi/*
npm run generate-provider -- \
  --provider-name jira \
  --input-dir provider-dev/source \
  --output-dir provider-dev/openapi/src/jira \
  --config-path provider-dev/config/all_services.csv \
  --servers '[{"url": "https://{site}.atlassian.net", "variables": {"site": {"default": "your-site"}}}]' \
  --provider-config '{"auth": {"type": "basic", "credentialsenvvar": "JIRA_CREDS"}}' \
  --naive-req-body-translate \
  --overwrite
```

Auth is Basic with `email:api_token` - confirm the exact any-sdk basic-auth construct (single base64 env var vs username/password pair) in phase 1 and set `JIRA_CREDS` conventions accordingly in the docs. Pagination config is decided per the phase 1 findings: if any-sdk can express the token scheme (`nextPageToken`), configure it on the services where it applies; offset-based services are configured only if offset traversal is supported, otherwise documented as parameter-driven. Pagination config lives at service level (provider-level inheritance is broken in any-sdk, per the k8s build).

Then `node provider-dev/scripts/post_process.mjs` for anything the generator cannot express, as surfaced by the integration tests.

### 5. Test

Same four layers as the k8s repo, in order:

1. **Offline validation** - local file registry, `SHOW SERVICES/RESOURCES/METHODS`, `DESCRIBE EXTENDED` on representative resources (`jira.issues.issues`, `jira.projects.projects`, `jira.agile.boards`)
2. **Meta-route tests** - `npm run start-server` / `npm run test-meta-routes -- jira --verbose` / `npm run stop-server`
3. **Integration tests** - `tests/integration/mock_jira_server.mjs` serving real Jira Cloud wire shapes (capture from a free site, redact); assert row-level results per archetype: each envelope style (`$.issues`, `$.values`, bare array), each pagination scheme, JQL search via the `jql` parameter, path routing across `/rest/api/3` and `/rest/agile/1.0`, and a full issue `INSERT` / `UPDATE` / transition `EXEC` / `DELETE` lifecycle
4. **Smoke tests** - `tests/smoke_test.py` (pystackql) against a real free-tier Jira Cloud site: read smokes plus a disposable-issue write lifecycle in a dedicated `SQLUAT` project, sweeping breadcrumbs from prior runs first; `--registry public` variant doubles as post-publish verification

A free Jira Cloud site (free plan, up to 10 users) is sufficient for all live testing and CI smoke - create a dedicated site for the project. Respect Jira Cloud rate limits in test pacing. Never run tests against a production site.

### 6. Publish

Push the `jira` dir to `providers/src` in a feature branch of [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) and follow the registry release flow. Verify with `registry pull jira` against the dev registry.

### 7. Docs microsite

`website/` is Docusaurus 3.10 following the shared architecture: all navbar/footer/theme/plugin configuration comes from [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config), vendored into `.shared-config/` at build time (`vendor-config` runs automatically before `start`/`build`). Site-local files are limited to `website/provider.js` (`providerName = 'jira'`, `providerTitle = 'Jira'`), thin `docusaurus.config.js` / `sidebars.js` wrappers, shared components under `src/`, and `static/CNAME` pinning `jira-provider.stackql.io`.

- Author `headerContent1.txt` / `headerContent2.txt` in `provider-dev/docgen/provider-data/` (installation, API token creation at id.atlassian.com, `JIRA_CREDS` connection, the `site` server variable, example queries)
- `npm run generate-docs` against the generated provider dir, then `node website/scripts/sanitize-docs.mjs` (Jira descriptions carry braces, angle brackets, and embedded HTML that MDX v3 parses as JSX)
- Build locally with yarn, Node 20+ (build vendors shared config, needs GitHub network access)
- Publish via GitHub Pages (GitHub Actions source), DNS: `jira-provider.stackql.io` CNAME -> `stackql.github.io.`

Lead the docs examples with the queries this provider exists for: JQL-in-SQL issue search joined against other providers (issues by assignee joined to Okta/Entra users), project inventory, stale-issue and SLA reporting, sprint velocity from the agile service, workflow and permission scheme audit, and an issue create/transition/close lifecycle. Cross-provider joins are the differentiator - show at least one.

### 8. CI

GitHub Actions: fetch + clean + build the provider from the pinned specs, run integration tests against the mock server, run meta-route tests, and (secret-gated) run the smoke suite against the dedicated free Jira Cloud site. Model on the k8s repo's `build-and-test.yml`.

## Writing conventions

- README and docs copy: measured, precise, no hyperbole. Third-person or passive framing for descriptive copy.
- No em dashes; use `-`. No characters not on a QWERTY keyboard; use `->` for arrows.
- Sample queries follow the k8s README style: realistic, runnable, `json_extract` for nested fields.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always
2. The k8s `feature/provider-dev` repo is the reference pattern - deviate only with a documented reason in the README
3. Deterministic scripts, never hand-edits to derived artifacts
4. Every regeneration is followed by the integration test suite before commit
5. Pagination behaviour is documented per resource, honestly - transparent traversal is claimed only where the integration tests prove it
