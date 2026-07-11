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

Against the 2026-07-11 snapshots both specs validate before and after cleaning; 59 fixes were applied (44 out-of-scope paths dropped, 15 array-of-enum items lowered) and the historical duplicate-operation defect is not present in the current snapshots.

## Status

Phase 1 (spec acquisition, cleaning, endpoint inventory, mapping groundwork) is in progress. Later steps (normalize, generate, test, publish, docs) follow the k8s provider pipeline and will be documented here as they are completed. Open engineering questions are tracked in [NOTES.md](NOTES.md).

## License

MIT

## Contributing

Contributions are welcome. Please submit a Pull Request.
