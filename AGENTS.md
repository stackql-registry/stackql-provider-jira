# AGENTS.md

The project guidance for every coding agent and contributor working in this repository, and the only place project rules are maintained. Codex reads this file directly; `CLAUDE.md` (Claude Code) and `.github/copilot-instructions.md` (GitHub Copilot) are short entry points that load or point to it and carry nothing else unless it applies to that tool alone.

## Project

This repository builds and documents the `jira` provider for [StackQL](https://github.com/stackql/stackql), enabling SQL-based query and provisioning operations against Jira Cloud.

The provider covers the Jira Cloud platform REST API v3 and the Jira Software REST API as Atlassian publishes them: 2 documents, 735 operations, plus one authored operation, mapped to 17 services and 217 resources (611 methods). Issues and everything attached to them, JQL issue search, projects with components, versions and roles, users and groups, workflows and statuses, fields and custom field contexts, issue types, screens, the permission, notification and issue security schemes, filters, dashboards, plans, site configuration and audit records, and the Jira Software boards, sprints and epics.

Scope notes, so they are not relitigated:

- Services are tag groups of the platform document (`issues`, `projects`, `users`, `permissions`, `workflows`, `fields`, `issue_types`, `screens`, `dashboards`, `filters`, `issue_attributes`, `notifications`, `jql`, `plans`, `system`) plus `agile` (the Jira Software document) and the authored `atlassian_tenant`.
- App-only surfaces are excluded services, skip-coded `app_only`: Connect / Forge / 3LO app APIs (`apps`, including the dynamic webhook API) and the development tool ingestion APIs (`dev_tools`). Jira Service Management is a separate product and document, out of scope.
- No GraphQL: the Atlassian GraphQL gateway is not part of the Jira REST documents and nothing in the REST surface needs it; `provider-dev/source-graphql/manifest.yaml` lists no operations. No provider views yet.
- Attachment and avatar uploads and binary downloads are not mapped (`binary_upload`, `non_json_response`); attachment metadata is.

## How to work in this repository

The build procedure is the `stackql-provider-development` skill in `.claude/skills/stackql-provider-development/` (`SKILL.md` is the map; `references/*.md` are the procedures). Read the reference file for a step before executing it. Work the steps in order: archetype -> spec pin -> inventory and split -> mappings -> pre-normalize / normalize / generate / post-process -> GraphQL and views -> Makefile -> the three credential-free test layers -> smoke suite -> docs and CI -> hand-over.

The provider constants are single-sourced in `provider-dev/scripts/lib/spec_helpers.mjs` (`SPECS`, the gateway and site URLs, `CLOUD_ID_ENV_VAR`, `WIRE_CASING`, `ENVELOPE_KEY_PREFERENCE`, `SKIP_RULES`, `DEPRECATED_SUPERSEDED`); server templates in `provider-dev/config/servers.json`; the operation mapping derivation in `lib/mapping.mjs`, its exceptions in `lib/mapping_rules.mjs`; the authored tenant service in `lib/tenant_service.mjs`. The engine facts that hold for this build (stackql v1.1.959 on omnisdk) are in NOTES.md and were each proved with `npm run probe` or live.

## Archetype

Direct. Atlassian publishes the platform REST API v3 (`https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json`) and the Jira Software REST API (`https://developer.atlassian.com/cloud/jira/software/swagger.v3.json`), both OpenAPI 3.0.1, unauthenticated and continuously delivered. Both are pinned under `specs.platform` and `specs.software` in `provider-dev/config/spec_pin.json` and fetched all or nothing. Refresh when the weekly spec-drift job reports it (`make refresh-spec`, then `make build && make test`, `make survey-pagination`, then review the `all_services.csv` diff).

## Design decisions (settled - see NOTES.md for the evidence)

- **Authentication** - `auth.type: oauth2`, client credentials grant, `ATLASSIAN_CLIENT_ID` / `ATLASSIAN_CLIENT_SECRET` (an Atlassian service account's OAuth 2.0 credential), token URL `https://auth.atlassian.com/oauth/token`. These are the only credential variables the provider documents: there is no official Terraform provider for Jira, and community Terraform providers' conventions (`JIRA_USER` / `JIRA_PASSWORD`) are not followed.
- **The cloud ID without ATLASSIAN_CLOUD_ID** - the docs teach `curl -s https://<site>.atlassian.net/_edge/tenant_info | jq -r .cloudId` into `ATLASSIAN_CLOUD_ID` (credential-free; PowerShell `Invoke-RestMethod`), and two SQL forms: a join from `atlassian_tenant.info` to the resource (the join supplies `cloud_id`), and `SET "$.params_by_provider.jira" = '{"cloud_id": "..."}'` as a session default. `SET` takes literals only and a scalar subquery cannot supply a server variable. All proved live on stackql v1.1.959.
- **The gateway and the cloud ID** - every Jira service is served through `https://api.atlassian.com/ex/jira/{cloud_id}` (a service account token is refused on the site URL); `cloud_id` carries `x-stackQL-envVar: ATLASSIAN_CLOUD_ID`. Paths keep their `/rest/api/3`, `/rest/agile/1.0`, `/rest/software/1.0` prefixes.
- **atlassian_tenant** - an authored service (`lib/tenant_service.mjs`) on `https://{site}.atlassian.net` with one resource, `info`, reading the public `/_edge/tenant_info`: `SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = 'acme'`. Auth is provider-wide in omnisdk and a `null_auth` override does not suppress the token exchange, so the query needs the client ID and secret (not the cloud ID); engine change proposed in NOTES.md.
- **Resource and method naming** - `provider-dev/config/all_services.csv` is the naming dictionary and the source of truth: one row per operation, keyed by `filename::operationId`, and a build never rewrites a mapped row. The rules name only operations the dictionary does not have yet (new upstream operations, or a row whose `stackql_resource_name` is blanked): path-derived (`lib/mapping.mjs`), exceptions in `lib/mapping_rules.mjs` (137 resource rules, 174 method rules). To rename a resource or method, edit its row; `map_operations.mjs` validates every row however it was named. Two naming passes in `lib/mapping.mjs` follow the rules (finding 18): a read-only resource named for the parameters that select its rows joins the resource of the same rows, routed by those parameters (`agile.sprints.list_by_board`; `agile.issues` `get`, `list_by_board`, `list_by_sprint`, `list_by_epic`, `list_by_board_sprint`, `list_by_board_epic`, `list_without_epic`; `agile.epics.list_by_board`; `screens.screens.list_by_field`; `permissions.issue_security_schemes.get_by_project`) when its rows carry every column of the base's rows and no two selects share required parameters; then a leading service name is dropped (`fields.schemes`, `projects.categories`, `issues.properties`) unless the short name collides (`project_roles`, `project_policies`, `system_avatars`, `user_groups`) or would not name the rows (`users_with_permissions`, `plan_only_teams`). Conventions: the paginated search is `list` and the older get-all read EXEC `list_all`; `<scheme>_project_associations` for global scheme-to-project mappings and `<scheme>_projects` for the projects of one scheme; actions and POST reads are EXEC on the resource they act on; a POST partial update is the UPDATE and a full-update PUT EXEC `replace`. Names are a contract: `all_services.csv` is committed and a diff is a breaking-change review (finding 17).
- **The JQL search** - `issues.issues.search` is the POST form of `/rest/api/3/search/jql` with `request.base` `{"fields": ["*navigable"]}` (the API returns only IDs otherwise, and query parameter defaults are not sent) and its page token in the body; `WHERE jql = '...'`. JQL is a parameter, never a translation target.
- **Casing** - `snake_case_aliases: true` plus `request.nativeCasing: camel` on all 611 methods. Path parameters are snake_case in the provider (post-process rule 10: `/board/{board_id}`, parameter `board_id`); their names never go on the wire. `provider-dev/source` and `all_services.csv` keep the vendor's path keys.
- **Pagination and pushdown** - Jira's PageBean next links are unusable (mostly absent; an internal host on workflow and status search). Post-process rule 6 synthesises `stackqlNextStartAt` in a response transform and sends it back as `startAt` (71 reads; `offset` on the audit records); rule 5 is token pagination (`nextPageToken`, 10 reads plus the search, whose token travels in the body). Bare-array reads with `startAt` are parameter-driven. Rule 7 pushes `LIMIT` -> `maxResults` (90 reads, the search's in its body), `OFFSET` -> `startAt` (70) and `ORDER BY` -> `orderBy` in Jira's prefix syntax (17 reads, for sort keys that are row columns; omnisdk renders the SQL column name, so a snake_case column whose wire name differs is sorted locally). Plain filter parameters push down by name with no configuration. `provider-dev/config/pagination_survey.json` records the nextPage hosts (`make survey-pagination`).
- **WHERE keys that are also columns** - omnisdk sends a WHERE key as the request parameter and, by design, also applies it to a same-named column of the rows (`pkg/omnisdk/pushdown.go`: every filter still runs on the rows). The `expand` metadata column is removed (pre-normalize pass 3) so `expand` works as a parameter; the permission maps become rows (post-process 4b); `fields`, `properties`, `scope`, `owner` are documented as not settable, and a parameter whose Jira semantics differ from equality (the board list's `name` is "contains") narrows the rows to exact matches.
- **Request and response shaping** - ADF properties typed as JSON objects (pass 4); entity property writes take a `value` column sent as the raw body (pass 5 + rule 9); 303-only async operations get the followed task response as their 200 (pass 2); scalar reads become a `value` row and the label page `label` rows (rules 3, 4).
- **Skip codes** - `app_only` 90, `deprecated_superseded` 18, `binary_upload` 6, `non_json_response` 5, `removed_upstream` 2, `untyped_json_response` 2, `no_response_schema` 1, `map_response` 1; 125 of 736. Every skipped operation stays in the inventory.
- **Labels** - Atlassian's `x-experimental` (122 mapped operations) and `deprecated` (17 mapped) are recorded in the inventory; descriptions are passed through as the vendor wrote them.
- **Update semantics** - Jira's PUTs edit the fields supplied (presumed partial; proven live for issues, comments, versions, components, filters and project categories). Nothing maps to REPLACE.
- **Rate limit** - cost-based per site and credential; the smoke suite paces at 0.5 s per statement and a 429 is a harness bug.

## Toolchain rules

- Latest `@stackql/provider-utils` (0.8.0 at this build), `@stackql/pgwire-lite`, `@apidevtools/swagger-parser`; Docusaurus `^3.10.x`. Node >= 22.19, `type: module`. `js-yaml` stays on 4.x (provider-utils emits with js-yaml 4). `package-lock.json` pins what CI installs; a toolchain bump is an explicit commit that regenerates the artifacts.
- Linux, macOS or WSL: GNU make + bash, a `stackql` binary (`$STACKQL`, `./stackql`, then PATH), Python 3 and yarn. stackql >= v1.1.959 (omnisdk engine). The Makefile is the operator surface (`make help`).
- The two provider-utils CLI entry points are npm scripts invoked through `node` (never `.bin` shims); flags go after `--`.
- On WSL, keep the checkout's `.venv` and `node_modules` work in mind: a venv on `/mnt/c` takes minutes to build.

## Repository layout

```
Makefile               # make help / build / test / smoke* / survey-pagination / docs / website / all
bin/                   # fetch-spec.sh, split.mjs, server lifecycle, test-meta-routes.cjs, init-provider.sh
provider-dev/
  downloaded/          # pinned snapshots: jira-platform-v3.json, jira-software.json (committed)
  config/              # spec_pin.json, service_names.json (tag rules, service titles, stripLeading),
                       # servers.json (gateway, site), provider_config.json (auth),
                       # endpoint_inventory.csv, all_services.csv (the naming dictionary),
                       # pagination_survey.json (live nextPage host survey)
  scripts/             # record_spec_pin, build_inventory, map_operations, pre_normalize, post_process,
                       # graphql_merge, lib/spec_helpers, lib/mapping, lib/mapping_rules, lib/tenant_service
  source/              # split + normalized service specs (committed build artifacts)
  source-graphql/      # manifest.yaml (no operations)
  openapi/src/jira/    # generated provider (committed)
  docgen/provider-data # headerContent1.txt / headerContent2.txt (landing + getting-started page)
views/                 # optional provider views (none yet)
tests/
  offline_validation.mjs
  integration/         # mock_jira_server.mjs, run_integration_tests.mjs, probe.mjs, harness.mjs
  live/survey_pagination.mjs   # read-only live survey (make survey-pagination)
  smoke_test.py        # live suite (--live, --read-only, --with-project-lifecycle, --cleanup-only)
website/               # Docusaurus microsite (shared stackql/docusaurus-config vendored at build)
.github/workflows/     # build-and-test.yml, test-web-deploy.yml, prod-web-deploy.yml
AGENTS.md  CLAUDE.md  NOTES.md  README.md  SECURITY.md  LICENSE  .env.example
```

## Build pipeline

`make all` = `deps build test docs website`: fetch-spec (pin verify) -> inventory -> split -> mappings -> pre-normalize -> normalize -> generate (+ post-process, views, GraphQL merge) -> test-offline -> test-integration -> test-meta -> docs -> website. It never needs credentials. Every step is deterministic and re-runnable; manual decisions are rules in scripts, or for resource and method names rows of `all_services.csv`, never hand-edits to specs or generated output. Validate-and-fail-without-writing is the standard for every script. A regeneration reproduces the committed artifacts byte-for-byte (CI checks this).

## Tests

1. `make test-offline` - `SHOW` / `DESCRIBE` against the local file registry: the service list, every service's resources against `all_services.csv`, verbs and required parameters, the cloud ID env var behaviour, snake_case columns, the shaping rules (25 checks).
2. `make test-integration` - the mock API (`tests/integration/mock_jira_server.mjs`: the OAuth2 token endpoint, bearer enforcement, the gateway and site templates, PageBean pages without nextPage, token pages, a 303 task redirect, the vendor's error bodies, a request log) with row-level and wire-level assertions (59 checks). `npm run probe -- "<sql>"` prints stackql output and the wire calls.
3. `make test-meta` - the meta-route walk over a local server (17 services, 217 resources).
4. `make smoke` / `make smoke-live` / `make smoke-read-only` / `make smoke-project-lifecycle` / `make smoke-cleanup` - live, from `.env`, against a dedicated trial or free site, in project `SQLUAT` (`JIRA_SMOKE_PROJECT`).

Never run tests against a production site.

## Docs and publish

`make docs` (generate with `--snake-case-aliases` and `--source-project $(SOURCE_PROJECT)`, then `sanitize-docs`, which annotates `cloud_id` "required unless ATLASSIAN_CLOUD_ID is set" and unlinks the vendor's in-page anchors) and `make website`; `website/docs` is committed after every regeneration. The site uses the shared config's `withStructuredData` (`@stackql/docusaurus-plugin-structured-data`, `softwareApplication: true` on the landing page) `@stackql/docusaurus-plugin-aeo` (`llms.txt`, `llms-full.txt`, Markdown companions, the Ask AI button) and `@stackql/docusaurus-plugin-stackql-deploy-template` (the stackql-deploy template menu on resource pages, beside the Ask AI button in the breadcrumb row, desktop only; listed after the AEO plugin); check JSON-LD with `node website/.shared-config/scripts/structured-data/check-site.mjs website/build --git website/docs` after the docs are committed (`dateModified` comes from each page's last commit). Publishing to the registry is a separate, human-in-the-loop step (push `provider-dev/openapi/src/jira` to `providers/src` in a feature branch of `stackql-provider-registry`, follow the release flow, verify with `make smoke-live`).

## Writing conventions

These apply to every piece of text the build generates: README, docs headers and examples, NOTES, this file, code comments, commit messages, console output, inventory and CSV columns, mock fixtures. Text the vendor owns (operation summaries, schema and parameter descriptions, the snapshots, `provider-dev/source`, the generated provider and `website/docs`) is passed through as the vendor wrote it, except for the MDX escaping `sanitize-docs` applies.

- Measured, precise copy, no hyperbole.
- No em dashes and no `--` as a dash; use `-`. No characters that are not on a QWERTY keyboard: no emoji, no typographic quotes, `->` for arrows. No stacked headings.
- Sample queries are realistic and runnable against the generated surface: snake_case names, `json_extract` for nested fields, JQL in `WHERE jql = '...'`, users by `account_id`.

## Non-negotiables

1. Latest `@stackql/provider-utils`, always
2. The skill is the procedure; sibling-build NOTES.md findings are reused, not re-derived - deviate only with a documented reason in NOTES.md
3. Deterministic scripts, never hand-edits to derived artifacts (`all_services.csv` is not derived: it is the naming dictionary, edited by hand to rename)
4. Every regeneration is followed by `make test` before commit
5. Test harnesses pace under the rate limit - a 429 is a harness bug
6. Smoke tests clean up everything they create and restore anything they toggle
