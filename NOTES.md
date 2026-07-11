# Engineering Notes

Open questions from the phase 1 kickoff, answered with evidence where possible. Sources: `stackql/any-sdk` and `stackql/stackql` at their default branches as of 2026-07-11, plus the pinned spec snapshots.

## 1. any-sdk pagination

**Question:** can the pagination config express `nextPageToken` cursor traversal, and is there any support for `startAt`/`maxResults` offset traversal?

**What any-sdk supports** (evidence: `any-sdk/internal/anysdk/pagination.go`, `any-sdk/internal/anysdk/http_armoury_params.go` `SetNextPage()`, `stackql/internal/stackql/execution/mono_valent_execution.go` `page()`):

- The pagination config is a `requestToken` / `responseToken` (/ `responseTerminator`) pair. The traversal loop extracts the response token (locations: body attribute via JSONPath-style key, or header - including a `Link: rel="next"` transformer), stops when it is empty, and applies it to the next request. Request token locations: `query` (set a query parameter), `body` (set an attribute in the request body), `path`, and `requestString` (parse the token as a URL and use it verbatim as the next request).
- Registered algorithms beyond plain tokens: `page_number` (page number vs page-count terminator) and `odata_next_link` (follow-the-link). There is **no offset-arithmetic algorithm** - nothing computes `startAt + maxResults`.
- Config resolution is per operation -> resource -> service -> providerService (`operation_store.go` `GetPaginationRequestTokenSemantic()`), so different methods in one service can carry different schemes. The provider-level fallback is confirmed broken in code (the `op.Provider != nil` branch reads `op.ProviderService` - the same bug the k8s build worked around by configuring at service level).

**Per-scheme story for Jira:**

| Scheme | Endpoints | Plan |
|---|---|---|
| `nextPageToken` cursor | `/search/jql` GET plus 17 others | `requestToken {key: nextPageToken, location: query}` + `responseToken {key: $.nextPageToken, location: body}` - same construct the k8s provider uses for `continue` tokens, applied at operation/resource level. Expect transparent traversal; prove it in integration tests before claiming it. |
| `isLast` hybrid (PageBean) | 68 ops | The PageBean carries a `nextPage` URL on non-final pages; candidate config is `responseToken {key: $.nextPage, location: body}` + `requestToken {location: requestString}` (follow the URL verbatim, terminate when absent). Needs per-endpoint verification that `nextPage` is reliably emitted - configure only where integration tests prove traversal, otherwise document as parameter-driven. |
| `startAt`/`maxResults` offset | 30 ops (user searches, group members, agile lists) | Not expressible in any-sdk today. Parameter-driven: explicit `startAt`/`maxResults` in the `WHERE` clause, documented per resource. `LIMIT` pushdown (`queryParamPushdown` `top -> maxResults`) is a candidate optimisation. |
| none | single-object reads, writes | n/a |

The honest docs position: transparent traversal is claimed per resource only where an integration test proves it; everything else documents explicit paging parameters.

## 2. Basic auth construct and the JIRA_CREDS convention

**Answered** (evidence: `any-sdk/pkg/dto/auth_ctx.go`). The `basic` auth type resolves credentials in this order:

1. `username_var` + `password_var` - env vars holding the plaintext pair, base64-encoded at request time
2. inline `username` + `password` (or `api_key` / `api_secret`)
3. `credentialsenvvar` - a single env var holding the **already base64-encoded** `email:api_token` string

Convention adopted (matches the CLAUDE.md generate command, `--provider-config '{"auth": {"type": "basic", "credentialsenvvar": "JIRA_CREDS"}}'`):

```bash
export JIRA_CREDS=$(echo -n "you@example.com:YOUR_API_TOKEN" | base64)
```

The docs will also show the runtime-auth alternative with the plaintext pair, which is friendlier for rotation:

```bash
export JIRA_USER='you@example.com'
export JIRA_API_TOKEN='YOUR_API_TOKEN'
AUTH='{ "jira": { "type": "basic", "username_var": "JIRA_USER", "password_var": "JIRA_API_TOKEN" } }'
stackql shell --auth="${AUTH}"
```

## 3. The {site} server variable and host routing

**Answered by code analysis; runtime confirmation due in phase 2** (evidence: `any-sdk/pkg/queryrouter/queryrouter.go`). The query router builds gorilla/mux routes with `muxRoute.Host("{site}.atlassian.net")`. Mux host variables match a single label (`[^.]+` - they do not span dots). The k8s/proxmox dotted-host constraint arises when the variable is the *entire* host (`{cluster_addr}` cannot hold `api.example.com`); Jira's `{site}` is a single dot-free subdomain label inside a fixed domain, which is exactly what mux host variables match. Jira Cloud site names cannot contain dots, so the constraint is structurally avoided. Verify at runtime in phase 2 offline validation (`SHOW SERVICES` + a routed call through the mock server).

**Consequence for integration testing:** unlike k8s (whole-host variable pointed at `localhost`), the Jira server template pins the `atlassian.net` domain, so requests cannot be redirected to a local mock by a server variable. The integration harness will materialize a test copy of the local registry with the `servers` block rewritten to `http://127.0.0.1:<port>` (a deterministic step in the test runner, not a hand edit of build artifacts). Smoke tests run against a real free-tier site with `--registry local` and `--registry public` variants, the latter doubling as post-publish verification.

## 4. Two path prefixes under one server

**Answered** (evidence: `provider-dev/source/*.yaml` and the router's route construction `s.base + path`). The split service specs carry absolute paths (`/rest/api/3/...` in platform services, `/rest/agile/1.0/...` and `/rest/software/1.0/...` in `agile`), and the server URL is host-only, so every operation routes on its full path. No per-service base path handling is required; the `agile` service freely mixes `/rest/agile/1.0` and `/rest/software/1.0` operations.

## 5. ADF schema lowering

**Partially answered; pre_normalize work item.** In the platform spec, `Comment.body` and `Worklog.comment` are **typeless** schemas (a description only, no `type`), and issue `description` flows through the untyped `fields` map (`IssueUpdateDetails.fields` is `additionalProperties: {}`). Typeless schemas may not be caught by normalize's opaque-object-to-string lowering (which keys on `type: object` without structure), so `pre_normalize.mjs` must stamp the ADF-bearing properties as `type: string` explicitly. As string-typed JSON-blob columns, ADF values pass through reads (`json_extract`) and writes (JSON supplied in the column value) without modelling; round-trip is verified in the phase 5 write-lifecycle tests.

Related: the JQL AST schemas (`JqlQueryClauseOperand` is an `anyOf` of four operand types, recursive through `JqlQueryClause`) will exercise the normalize flatten heavily - inspect `jql.yaml` after the full normalize and lower residual polymorphism in `pre_normalize.mjs` if the flatten mangles it.

## 6. expand query parameters

**Decided.** 66 of 570 platform operations carry an `expand` query parameter. Policy: uniform pass-through - `expand` remains an optional method parameter usable in the `WHERE` clause (`WHERE expand = 'description,lead'`); the provider does not model expansion variants as separate resources or methods. Documented once in the provider docs header rather than per resource.

## 7. Findings not in the kickoff list

- **The agile spec is largely schema-less on responses.** 25 of 61 agile operations have 2xx JSON responses defined by an `example` (a JSON string) with no schema at all. The mapping pipeline classifies envelopes from examples (see `lib/spec_helpers.mjs`), but the generated provider needs real response schemas or agile resources will project zero columns. `pre_normalize.mjs` must synthesize response schemas from the examples deterministically. This is the largest phase 3 work item.
- **App-context surfaces are pervasive.** Beyond the obvious `/rest/atlassian-connect` paths, 28 platform operations (including the entire `Webhooks` tag and workflow transition rule configuration) are callable only by Connect/Forge apps. These are dropped in cleaning with the evidence recorded in `clean_report.json`; the provider intentionally has no `webhooks` service.
- **POST-body reads map as EXEC.** StackQL cannot route `SELECT` WHERE parameters into request bodies (any-sdk gap, same as the k8s parameterized review kinds), so body-parameterized reads (`POST /search/jql`, bulk fetches, `jql/match`) are exec methods. Promote to `SELECT` if/when any-sdk grows body-parameter routing.
- **Experimental surface.** A sizable minority of platform operations are marked `x-experimental` (dashboards gadgets, field schemes, issue security schemes, archiving). They are mapped and flagged in the inventory; the docs should carry the experimental marker per method (docgen decision in phase 7).
- **Deprecated-but-functional operations are kept** (marked deprecated in docs) unless a mapped current replacement makes them redundant or ambiguous - the skip reasons in `endpoint_inventory.csv` enumerate the exceptions.

## Test plan requirements (from the kickoff)

Four layers, mirroring the k8s repo: offline validation, meta-route tests, integration tests against a mock Jira server (registry copy with rewritten `servers`, real wire shapes for every envelope and pagination archetype, full issue lifecycle), and `tests/smoke_test.py` (pystackql) against a live free-tier site - runnable against either the local provider build (`--registry local`, default) or the published provider (`--registry public`) so the same suite serves pre-publish UAT and post-publish verification.
