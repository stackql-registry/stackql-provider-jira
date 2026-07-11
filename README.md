# `jira` provider for [`stackql`](https://github.com/stackql/stackql)

This repository generates and documents the `jira` provider for StackQL, enabling SQL-based query and provisioning operations against the Jira Cloud REST APIs - issues, projects, users, groups, permissions, workflows, fields, screens, dashboards, filters, versions, components, webhooks, audit records, and the Jira Software agile surface (boards, sprints, epics, backlog). The provider is built using the `@stackql/provider-utils` package and follows the pattern established by the [`k8s` provider rebuild](https://github.com/stackql-registry/stackql-provider-k8s/tree/feature/provider-dev).

## Design Principles

- **One provider, any Jira Cloud site** - the base URL is `https://{site}.atlassian.net`, with `{site}` supplied as a server variable in the `WHERE` clause of each query. Platform paths sit under `/rest/api/3`, agile paths under `/rest/agile/1.0`, both on the same server.
- **Vendor specs, pinned and cleaned** - the provider is built from Atlassian's published OpenAPI 3 specs (platform v3 and Jira Software agile). Jira Cloud is continuously delivered and the spec URLs are not versioned, so snapshots are pinned by content hash in `provider-dev/config/spec_pin.json`, and known spec-quality issues are fixed by a deterministic cleaning script - never by hand-editing spec files.
- **JQL is a parameter, not a translation target** - issue search takes a `jql` string supplied in the `WHERE` clause (`WHERE jql = 'project = ENG AND status != Done'`). SQL-predicate-to-JQL pushdown is a future any-sdk enhancement, not attempted in the provider.
- **ADF fields are opaque** - v3 rich text fields (issue `description`, comment `body`, worklog comments) are Atlassian Document Format JSON, addressed with `json_extract` as JSON-blob columns. The provider does not model ADF structure.
- **Users are accountIds** - user-referencing operations key on `accountId` (GDPR-era API), not usernames.
- **Honest pagination** - Jira mixes three pagination schemes (`startAt`/`maxResults` offset, `nextPageToken` cursor, `isLast` hybrids). Transparent traversal is configured and claimed only where the integration tests prove it; everywhere else pagination is parameter-driven and documented per resource.

Jira Service Management is a separate spec and out of scope for v1; it is a candidate follow-up service. Attachment upload (multipart + `X-Atlassian-Token: no-check`) is out of scope for v1; attachment metadata reads are in scope.

## Prerequisites

To build or test the Jira provider you will need:

1. Node.js 20+ (for the build pipeline)
2. StackQL CLI installed (see [StackQL](https://github.com/stackql/stackql))
3. A Jira Cloud site for live testing (a [free plan](https://www.atlassian.com/software/jira/pricing) site is sufficient - never test against a production site)

## 0. Download and Clean the Specs

Download the published specs and record the pin:

```bash
npm run fetch-specs
```

This fetches the two vendor specs into `provider-dev/downloaded/`:

| Spec | URL | Serves |
|---|---|---|
| `jira-platform-v3` | `https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json` | `/rest/api/3` (platform) |
| `jira-software-agile` | `https://dac-static.atlassian.com/cloud/jira/software/swagger.v3.json` | `/rest/agile/1.0` (boards, sprints, epics, backlog) |

and records the fetch date and sha256 of each in `provider-dev/config/spec_pin.json`. If upstream content has drifted from the pin, the fetch fails without writing; re-run with `--update` to accept the refresh and review the resulting diff.

Then apply the deterministic spec fixes and validate:

```bash
npm run clean-specs
```

`provider-dev/scripts/clean_specs.mjs` parses both specs with `@apidevtools/swagger-parser`, applies the known fix classes, writes cleaned specs to `provider-dev/downloaded/cleaned/`, and records every change in `provider-dev/config/clean_report.json`. Unfixable violations fail the run without writing anything. The fix classes, each detected on every run whether or not the current snapshot exhibits them:

1. **Duplicate JSON keys** (duplicated method or path definitions) - detected by scanning the raw text, since `JSON.parse` collapses them silently. Byte-identical duplicates are deduped; conflicting duplicates are unfixable.
2. **Duplicate operationIds** - renamed deterministically with a numeric suffix.
3. **Untagged operations** - unfixable (the tag drives the service split).
4. **Arrays of enums** (`type: array` with `items.enum`) - historically rejected by generators; the items enum is dropped, keeping the item type.
5. **Out-of-scope path prefixes** - each spec carries surfaces beyond the site-level REST APIs the provider targets. The platform spec's `/rest/atlassian-connect` and `/rest/forge` paths (app-context APIs) and `/rest/internal` (not a public API) are dropped. The agile spec's dev-tools ingestion APIs (`/rest/devinfo`, `/rest/builds`, `/rest/deployments`, `/rest/featureflags`, `/rest/remotelinks`, `/rest/security`, `/rest/operations`, `/rest/devopscomponents`) are Connect-app integration surfaces for CI/CD tools, not site-level basic-auth APIs, and are dropped; `/rest/software/1.0` (board, epic, and sprint issue reads, basic-auth callable) is kept alongside `/rest/agile/1.0`.
6. **App-context operations** - operations callable only by Connect/Forge apps, never with site-level basic auth: tags suffixed `(apps)` (app custom field configuration/options/values, app JQL functions, UI modifications) and operations whose documented permissions are "Only Connect / OAuth 2.0 apps can use this operation" (the dynamic webhook registration API and workflow transition rule configuration). Because the entire platform `Webhooks` tag is app-only, the provider has no `webhooks` service - Jira Cloud offers no site-level REST API for webhook administration.

Against the 2026-07-11 snapshots both specs validate before and after cleaning; 80 fixes were applied (44 out-of-scope paths dropped, 28 app-context operations dropped, 15 array-of-enum items lowered, with 7 of the enum fixes on subsequently dropped paths) and the historical duplicate-operation defect is not present in the current snapshots.

## 1. Endpoint Inventory and Service Split

```bash
npm run build-inventory
```

`provider-dev/scripts/build_inventory.mjs` produces `provider-dev/config/endpoint_inventory.csv` - one row per operation across both cleaned specs, with the response envelope style, pagination scheme, deprecation and experimental flags, the proposed service (from `provider-dev/config/service_names.json`), draft resource and StackQL verb columns, and a skip reason where an operation is not mapped. Against the 2026-07-11 snapshots:

| Measure | Count |
|---|---|
| Operations (platform / agile) | 631 (570 / 61) |
| Envelope: single object | 345 |
| Envelope: no response body | 102 |
| Envelope: `values` wrapper | 71 |
| Envelope: bare array | 49 |
| Envelope: other keyed object | 48 |
| Envelope: `issues` wrapper | 16 |
| Pagination: none | 515 |
| Pagination: `isLast` hybrid | 68 |
| Pagination: `startAt`/`maxResults` offset | 30 |
| Pagination: `nextPageToken` cursor | 18 |
| Mapped | 620 |
| Skipped: superseded agile issue reads (current `/rest/software/1.0` twin mapped) | 8 |
| Skipped: deprecated legacy issue search (`/rest/api/3/search`; `/rest/api/3/search/jql` is mapped) | 2 |
| Skipped: multipart attachment upload | 1 |

The platform spec's 87 surviving fine-grained tags are consolidated into 17 services, and the agile spec maps to a single `agile` service - 18 services in total, recorded in `provider-dev/config/service_names.json`:

| Service | Consolidates (platform tags / agile) | Mapped ops |
|---|---|---|
| `issues` | Issues, attachments, comments (+properties), links, link types, properties, remote links, votes, watchers, worklogs (+properties), search, bulk operations, redaction, navigator settings, panels, labels | 103 |
| `projects` | Projects, components, versions, categories, avatars, classification levels, email, features, key/name validation, properties, roles, role actors, templates, types | 84 |
| `fields` | Issue fields, custom field contexts, custom field options, custom field associations, field configurations, field schemes | 64 |
| `workflows` | Workflows, workflow schemes (+drafts, +project associations), statuses, status categories, transition rules, status | 64 |
| `agile` | Boards, sprints, epics, backlog, agile issue ranking (both `/rest/agile/1.0` and `/rest/software/1.0`) | 53 |
| `system` | Myself, server info, announcement banner, application roles, avatars, classification levels, Jira settings, license metrics, time tracking, tasks, data policies | 35 |
| `permissions` | Permissions, permission schemes, project permission schemes, issue security schemes, issue security levels | 35 |
| `issue_types` | Issue types, issue type schemes, issue type screen schemes, issue type properties | 33 |
| `users` | Users, user search, user properties, group and user picker | 26 |
| `priorities_resolutions` | Issue priorities, priority schemes, issue resolutions | 24 |
| `screens` | Screens, screen schemes, screen tabs, screen tab fields | 21 |
| `filters` | Filters, filter sharing | 19 |
| `dashboards` | Dashboards | 17 |
| `plans` | Plans, teams in plan (Advanced Roadmaps; requires a Premium plan) | 16 |
| `jql` | JQL utilities (parse, autocomplete data, sanitize), Jira expressions | 9 |
| `groups` | Groups | 8 |
| `notifications` | Issue notification schemes | 8 |
| `audit` | Audit records | 1 |

Deviations from the candidate split in [CLAUDE.md](CLAUDE.md), decided from the inventory:

- `labels` is a resource in `issues`, not a service - the Labels tag has a single operation
- `myself_serverinfo` is named `system` and also holds site-level administration surfaces (settings, avatars, license metrics, time tracking, tasks, announcement banner, application roles, data policies)
- `webhooks` is dropped entirely - the platform webhook registration API is app-context-only (see cleaning fix class 6)
- `notifications` (notification schemes) and `plans` (Advanced Roadmaps) are added - both present in the spec but absent from the candidate list
- agile builds/deployments are excluded - the dev-tools ingestion APIs are Connect-app integration surfaces (see cleaning fix class 5)

## Status

Phase 1 (spec acquisition, cleaning, endpoint inventory, mapping groundwork) is in progress. Later steps (normalize, generate, test, publish, docs) follow the k8s provider pipeline and will be documented here as they are completed. Open engineering questions are tracked in [NOTES.md](NOTES.md).

## License

MIT

## Contributing

Contributions are welcome. Please submit a Pull Request.
