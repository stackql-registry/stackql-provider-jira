# `jira` provider for [`stackql`](https://github.com/stackql/stackql)

This repository builds and tests the `jira` provider for StackQL from the OpenAPI documents Atlassian publishes for Jira Cloud, and builds its documentation site, [jira-provider.stackql.io](https://jira-provider.stackql.io).

The provider maps the Jira Cloud platform REST API v3 and the Jira Software REST API to SQL: 17 services, 217 resources and 611 methods. Issues are searched with JQL inside a `WHERE` clause:

```sql
SELECT key,
       json_extract(fields, '$.summary') AS summary,
       json_extract(fields, '$.status.name') AS status
FROM jira.issues.issues
WHERE jql = 'project = ENG AND statusCategory != Done ORDER BY created DESC';
```

The build is a deterministic `make` pipeline from the pinned documents to the generated provider (committed under `provider-dev/openapi/src/jira`), three credential-free test layers, and a live smoke suite run against a dedicated trial site. Settled design decisions are in [AGENTS.md](AGENTS.md); findings with their evidence in [NOTES.md](NOTES.md).

## What is StackQL

[StackQL](https://github.com/stackql/stackql) is an open-source SQL interface for cloud and SaaS APIs. A provider is a versioned set of OpenAPI documents plus `x-stackQL-resources` extensions that the engine turns into SQL tables: `SELECT` for reads, `INSERT` / `UPDATE` / `DELETE` for lifecycle, `EXEC` for actions, with `json_extract` over nested fields and joins across providers.

## Authentication and configuration

The provider authenticates as an Atlassian service account with an OAuth 2.0 credential (client credentials grant) and calls Jira through the Atlassian API gateway, addressed by the site's cloud ID:

| Variable | Meaning |
|---|---|
| `ATLASSIAN_CLIENT_ID` | client ID of the service account's OAuth 2.0 credential |
| `ATLASSIAN_CLIENT_SECRET` | its client secret |
| `ATLASSIAN_CLOUD_ID` | the site's cloud ID (the `cloud_id` server variable of every service except `atlassian_tenant`) |

The cloud ID of a site is one query away (the client ID and secret must be set; the cloud ID need not be):

```sql
SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = 'acme';
```

The Jira Software resources (`jira.agile.*`) need the credential to carry the granular `*:jira-software` scopes. Without `ATLASSIAN_CLOUD_ID`, the docs show how to keep the cloud ID in a session variable (`SET jira_cloud_id = '...'`) or bind each site as a provider alias.

## Prerequisites

- Node.js >= 22.19
- A `stackql` binary >= v1.1.959 (`$STACKQL`, `./stackql`, or on `PATH`; `bin/start-server.sh` downloads one if none is found)
- GNU make and bash (Linux, macOS or WSL); Python 3 for the smoke suite; yarn for the website
- For the live targets: a dedicated Jira Cloud trial or free site (never production) and the variables above in `.env` (see [.env.example](.env.example))

## Makefile

Every step is a `make` target (`make help` lists them). The composites:

```bash
make all      # deps, full pipeline (pin verify, inventory, split, mappings, pre-normalize, normalize,
              # generate, post-process, GraphQL merge), offline + integration + meta-route tests,
              # docs generation, website build - no credentials needed
make build    # the spec -> provider pipeline only
make test     # the three credential-free test layers
make smoke    # live smoke suite against the trial site (sources .env)
```

The live targets: `smoke`, `smoke-live` (the published provider, post-publish verification), `smoke-read-only`, `smoke-project-lifecycle` (also creates and deletes a whole project), `smoke-cleanup` (sweep stackql-smoke breadcrumbs) and `survey-pagination` (read-only: where each PageBean read's next link points).

## 0. Download and pin the specs

```bash
make fetch-spec      # verify both documents against the recorded pin (fails on drift)
make refresh-spec    # accept an upstream change (rewrites the pin - review the diff)
```

`provider-dev/scripts/record_spec_pin.mjs` downloads the platform REST API v3 document (OpenAPI 3.0.1, 433 paths, 630 operations) and the Jira Software document (OpenAPI 3.0.1, 78 paths, 105 operations), applies the deterministic fix classes (counted in the pin: the per-operation data classification annotation removed, 23 response schemas synthesised from the vendor's own examples, 2 property read schemas, an array-or-item response lowered, 3 documented-required parameters flagged), validates each with `@apidevtools/swagger-parser`, verifies the upstream sha256 against `provider-dev/config/spec_pin.json`, and only then writes both snapshots into `provider-dev/downloaded/` (committed). An unchanged upstream leaves the pin untouched. Before accepting a refresh, run `node .claude/skills/stackql-provider-development/scripts/spec_diff.mjs <pinned> <fetched>` and record the summary in NOTES.md.

## 1. Endpoint inventory and service split

```bash
make inventory
make split
```

`build_inventory.mjs` writes `provider-dev/config/endpoint_inventory.csv`: one row per operation (736: the two documents plus the authored tenant operation) with its service, vendor tag, pagination parameters and scheme, body kind, update semantics presumption, vendor labels, response shape, the proposed mapping and a skip code.

`bin/split.mjs` applies the ordered rules in `provider-dev/config/service_names.json` (document, first vendor tag, path regex; first match wins, an unmatched operation fails the run) and writes 17 service specs to `provider-dev/source/`, each with the gateway server template from `provider-dev/config/servers.json` (`https://api.atlassian.com/ex/jira/{cloud_id}`, `cloud_id` from `ATLASSIAN_CLOUD_ID`). The authored `atlassian_tenant` service (`provider-dev/scripts/lib/tenant_service.mjs`) uses the site template `https://{site}.atlassian.net`. Two excluded services classify the app-only operations: `apps` (46) and `dev_tools` (44).

| Service | Resources | Contents |
|---|---|---|
| `issues` | 31 | issues, JQL search, comments, worklogs, transitions, changelogs, links, remote links, watchers, votes, attachments metadata, properties, labels, bulk operations |
| `projects` | 28 | projects, components, versions, roles and role actors, categories, properties, features, templates, types, policies |
| `users` | 23 | users, user searches, user properties, myself, groups and members |
| `agile` | 26 | Jira Software boards, sprints, epics, backlog, board configuration and properties, ranking, estimation |
| `system` | 22 | server info, application properties, application roles, licenses, announcement banner, audit records, time tracking, avatars, tasks, expressions |
| `workflows` | 21 | workflows, workflow schemes and drafts, statuses, status categories, usages |
| `fields` | 19 | fields, custom field contexts and options, field configurations and schemes, field schemes |
| `permissions` | 12 | permission schemes and grants, permission checks, issue security schemes and levels |
| `issue_types` | 11 | issue types, issue type schemes, issue type screen schemes, properties |
| `screens` | 7 | screens, tabs, tab fields, screen schemes |
| `filters` | 6 | filters, favourites, columns, share permissions |
| `issue_attributes` | 6 | priorities, priority schemes, resolutions |
| `dashboards` | 4 | dashboards, gadgets, item properties |
| `jql` | 4 | autocomplete data and suggestions, parse / sanitise, the invalid JQL log |
| `plans` | 4 | plans and plan teams (Jira Premium) |
| `notifications` | 2 | notification schemes and project associations |
| `atlassian_tenant` | 1 | `info`: the cloud ID of a site |

## 2. Mappings

```bash
make mappings          # add new operations to all_services.csv (named by the rules); mapped rows are kept
make mappings-report   # print the mapping and where it differs from the rules, without writing
```

`provider-dev/config/all_services.csv` is the naming dictionary: one row per operation, keyed by `filename::operationId`, and the source of truth for every operation it maps. `npm run generate-mappings` (provider-utils `analyze`) appends a row for each operationId the dictionary does not have; `map_operations.mjs` names those rows from the path-derived derivation in `lib/mapping.mjs` and the 137 resource rules and 174 method rules in `lib/mapping_rules.mjs`, keeps every mapped row as it is, updates the path of an operation that moved, drops rows of operations removed upstream (and lists them), then validates every row (every operation mapped or skip-coded, names lower snake_case, method names unique per resource, unique required-parameter signatures per SQL verb, every rule used). To rename, edit the row; to have the rules name an operation again, blank its `stackql_resource_name`. Result: select 270, insert 51, update 71, delete 71, exec 148; 35 skip-coded in the emitted services (plus the 90 app-only operations of the excluded services). `all_services.csv` is committed: a diff on regeneration is a breaking-change review.

## 3. Normalize

```bash
make pre-normalize normalize
```

`pre_normalize.mjs` passes: prefer JSON request bodies; declare the followed task response of the 13 operations that answer only `303 See Other`; remove the read-only `expand` metadata property from 34 response schemas (so `expand` works as a request parameter); type the two Atlassian Document Format properties as JSON objects; give the 8 entity property writes a `value` body. Then the provider-utils normalize pass (allOf flatten, oneOf / anyOf lowering, opaque objects, 52 bare-array responses wrapped).

## 4. Generate

```bash
make generate
```

`provider-utils generate` with `provider_config.json` (`auth.type: oauth2`, client credentials, `snake_case_aliases: true`) and `--naive-req-body-translate`, then `post_process.mjs`: `request.nativeCasing: camel` on all 611 methods; naive DELETE bodies; scalar reads as a `value` row and the label page as `label` rows; the permission maps as one row per permission; the JQL search as the POST form with `request.base` `{"fields": ["*navigable"]}` and its token in the body; `nextPageToken` pagination (10 reads); offset pagination through a response transform that adds the next `startAt` (71 reads); `LIMIT` -> `maxResults` (90 reads), `OFFSET` -> `startAt` (70) and `ORDER BY` -> `orderBy` in Jira's prefix syntax (17) pushdown; entity property values sent as the raw body; path parameters renamed to snake_case (rule 10, last). Then the GraphQL merge (no operations).

## 5. Test

```bash
make test-offline        # SHOW / DESCRIBE against the local file registry (25 checks)
make test-integration    # the mock Jira API: rows and wire calls per archetype (59 checks)
make test-meta           # meta-route walk: 17 services, 217 resources, 611 methods
make smoke               # live, against the trial site (78 checks, including a Jira Software board and sprint)
```

`npm run probe -- "<sql>"` runs ad-hoc SQL against the mock and prints the wire calls. The smoke suite works in the project `SQLUAT` (`JIRA_SMOKE_PROJECT`), creating it on the first run with the identity as lead and in its Administrators role; it sweeps every stackql-smoke breadcrumb first and deletes everything it creates. Jira Cloud does not bill per call: the budget is 0.00.

## 6. Docs

```bash
make docs       # generate-docs --snake-case-aliases --source-project ..., then sanitize-docs
make website    # yarn install && yarn build (vendors the shared stackql/docusaurus-config)
```

The landing page is `provider-dev/docgen/provider-data/headerContent1.txt` and `headerContent2.txt` (installation, authentication, the cloud ID, JQL search, pagination, example queries). `sanitize-docs` escapes MDX-hostile description text and annotates `cloud_id` "required unless ATLASSIAN_CLOUD_ID is set". `website/docs` is committed after every regeneration so pages stamp with their regeneration date. The site emits JSON-LD through the shared config's `withStructuredData` (`@stackql/docusaurus-plugin-structured-data`) `llms.txt`, `llms-full.txt`, Markdown companion files and the Ask AI button through `@stackql/docusaurus-plugin-aeo`, and the stackql-deploy template menu on resource pages through `@stackql/docusaurus-plugin-stackql-deploy-template`.

## 7. Publish

Publishing is a separate, human-in-the-loop step: push `provider-dev/openapi/src/jira` to `providers/src` in a feature branch of [stackql-provider-registry](https://github.com/stackql/stackql-provider-registry), follow the registry release flow, then verify with `make smoke-live`.

## 8. CI

`.github/workflows/build-and-test.yml`: on push and pull request - install, `make fetch-spec` (warns on drift, builds from the pin), the build steps, a check that regeneration reproduces the committed artifacts, the three test layers and `make docs`; a smoke job when `ATLASSIAN_CLIENT_ID`, `ATLASSIAN_CLIENT_SECRET` and `ATLASSIAN_CLOUD_ID` are configured as secrets (never on pull requests); a weekly spec-drift job that opens a labelled issue when the served documents move. `test-web-deploy.yml` builds the site on pull requests to `main`; `prod-web-deploy.yml` builds and deploys it to GitHub Pages on pushes to `main` (DNS: `jira-provider.stackql.io` CNAME `stackql.github.io.`).

## Contributing

Shaping decisions are rules in scripts, never hand-edits to generated files: change the rule, run `make build && make test`, review the generated diff, and record the reason in NOTES.md. Resource and method names live in `all_services.csv`: edit the row (a rename is a breaking change for users of the published provider), run `make build && make test`, update the tests, examples and docs that name it, and review the `all_services.csv` and generated diffs. Rule changes name only operations added after them.

## Security

See [SECURITY.md](SECURITY.md).

## License

MIT - see [LICENSE](LICENSE).
