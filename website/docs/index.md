---
title: jira
hide_title: false
hide_table_of_contents: false
keywords:
  - jira
  - atlassian
  - jql
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - issue tracking
description: Query, provision and manage Jira Cloud resources using SQL
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
id: 'provider-intro'
softwareApplication: true
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

The `jira` provider maps the Jira Cloud platform REST API (v3) and the Jira Software REST API to SQL: issues and everything attached to them (comments, worklogs, transitions, links, watchers, changelogs), projects with their components, versions and roles, users and groups, workflows and statuses, fields and custom field contexts, issue types, screens, the permission, notification and issue security schemes, filters, dashboards, plans, site configuration and audit records, and the Jira Software boards, sprints and epics. Search issues with JQL inside a `WHERE` clause, inventory and audit a site's configuration as rows, report across projects and providers, and create, change, transition and remove issues and their configuration with `INSERT`, `UPDATE`, `EXEC` and `DELETE`.


:::info[Provider Summary] 

total services: __17__  
total resources: __217__  
source project: __[stackql-provider-jira](https://github.com/stackql-registry/stackql-provider-jira)__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To pull the latest version of the `jira` provider, run the following command:

```bash
REGISTRY PULL jira;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Scope

The provider is built from the two OpenAPI documents Atlassian publishes for Jira Cloud: the [platform REST API v3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/) and the [Jira Software REST API](https://developer.atlassian.com/cloud/jira/software/rest/) (the `agile` service). Every call goes through the Atlassian API gateway (`https://api.atlassian.com/ex/jira/<cloud id>`).

Not mapped: operations only Connect, Forge or OAuth 2.0 (3LO) apps can call (dynamic webhook registration, app properties, the development tool ingestion APIs for builds, deployments, feature flags and the like), attachment and avatar uploads and the binary attachment and avatar downloads, the removed legacy issue search, and deprecated operations whose replacement is mapped. Jira Service Management has its own API and is not part of this provider.

## Authentication

The provider authenticates as an Atlassian [service account](https://support.atlassian.com/user-management/docs/understand-service-accounts/) with an OAuth 2.0 credential, using the client credentials grant:

- <CopyableCode code="ATLASSIAN_CLIENT_ID" /> - the client ID of the service account's OAuth 2.0 credential
- <CopyableCode code="ATLASSIAN_CLIENT_SECRET" /> - its client secret
- <CopyableCode code="ATLASSIAN_CLOUD_ID" /> - the cloud ID of the Jira site (see [The cloud ID](#the-cloud-id))

Create the service account and its OAuth 2.0 credential in Atlassian Administration (Directory > Service accounts), and choose the scopes the credential carries when you create it. The platform API works with the classic scopes (`read:jira-work`, `write:jira-work`, `read:jira-user`, `manage:jira-project`, `manage:jira-configuration`); the Jira Software resources (`jira.agile.*`) need the granular `*:jira-software` scopes as well (for example `read:board-scope:jira-software`, `read:sprint:jira-software`, `write:sprint:jira-software`), and answer `401 Unauthorized; scope does not match` without them. Give the service account the Jira product access and the project roles the operations need, as for any user.

```bash
export ATLASSIAN_CLIENT_ID='...'
export ATLASSIAN_CLIENT_SECRET='...'
export ATLASSIAN_CLOUD_ID='...'
```

or using PowerShell:

```powershell
$env:ATLASSIAN_CLIENT_ID = '...'
$env:ATLASSIAN_CLIENT_SECRET = '...'
$env:ATLASSIAN_CLOUD_ID = '...'
```


## The cloud ID

Every service except `atlassian_tenant` is addressed by the cloud ID of the Jira site: the server variable `cloud_id`, resolved from <CopyableCode code="ATLASSIAN_CLOUD_ID" /> when it is set. A `WHERE cloud_id = '...'` value takes precedence, so one session can query several sites the credential can reach. With the variable unset, `cloud_id` is a required parameter of every method (visible in `SHOW METHODS`).

The site answers its cloud ID publicly at `https://<site>.atlassian.net/_edge/tenant_info`, so it can be looked up before anything else is configured. With `curl` and `jq`, for the site `https://acme.atlassian.net`:

```bash
export ATLASSIAN_CLOUD_ID=$(curl -s https://acme.atlassian.net/_edge/tenant_info | jq -r .cloudId)
```

or using PowerShell:

```powershell
$env:ATLASSIAN_CLOUD_ID = (Invoke-RestMethod https://acme.atlassian.net/_edge/tenant_info).cloudId
```

The same lookup is the `atlassian_tenant` service, which takes the site's subdomain. It needs <CopyableCode code="ATLASSIAN_CLIENT_ID" /> and <CopyableCode code="ATLASSIAN_CLIENT_SECRET" /> to be set (the provider authenticates every request), but not the cloud ID:

```sql
SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = 'acme';
```

Two ways to supply the cloud ID from SQL instead of the environment variable: join the lookup to the resource you read (the join supplies `cloud_id`), or set it as the session default for every `jira` query with [`SET`](https://stackql.io/language-spec/set) (`SET` takes a literal, not a query result):

```sql
SELECT p.key, p.name
FROM jira.atlassian_tenant.info t
INNER JOIN jira.projects.projects p ON p.cloud_id = t.cloud_id
WHERE t.site = 'acme';

SET "$.params_by_provider.jira" = '{"cloud_id": "<cloud id>"}';
SELECT key, name FROM jira.projects.projects;
```

## Searching issues with JQL

Issues are searched with [JQL](https://support.atlassian.com/jira-software-cloud/docs/what-is-advanced-search-in-jira-cloud/), supplied as the `jql` parameter in the `WHERE` clause; Jira requires a bounded query (a restriction such as a project, an assignee or a date). Each row carries the issue `id` and `key` and its `fields` as one JSON column, read with `json_extract`. The search returns the navigable fields; a single issue read (`WHERE issue_id_or_key = 'ENG-1'`) returns all of them.

```sql
SELECT key,
       json_extract(fields, '$.summary') AS summary,
       json_extract(fields, '$.status.name') AS status
FROM jira.issues.issues
WHERE jql = 'project = ENG AND statusCategory != Done ORDER BY created DESC';
```

Rich text (an issue `description` inside `fields`, a comment `body`, a worklog `comment`) is [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/) JSON. The provider does not model it: read it with `json_extract` and write it as a JSON document.

Users are identified by `account_id` (the Atlassian account ID), never by username or email address.

## Pagination

Jira pages its lists in three ways, and the provider reads every page of each:

- `startAt` / `maxResults` pages (most lists): the provider counts the rows of each page and asks for the next `startAt` until Jira reports the last page.
- a page token (the JQL issue search, the Jira Software board, sprint, epic and backlog issue lists, the invalid JQL log): the provider sends `nextPageToken` back until it is absent.
- `offset` / `limit` (the audit records).

`max_results` in the `WHERE` clause sets the page size. `LIMIT n` is sent as `maxResults` (capped at the page size Jira serves), `OFFSET n` as `startAt` on the `startAt` lists, and `ORDER BY` as Jira's `orderBy` (`name`, `-name`) on the lists that take it, when the column's name is one of Jira's sort keys (`key`, `name`, `id`, `description`, `created` and the like); any other order is applied by StackQL after the read. A small number of lists that return a bare array with `startAt` / `maxResults` parameters (user searches) return the page the parameters ask for.

## Request parameters that share a column name

When a `WHERE` key names both a request parameter and a column of the rows, StackQL sends it as the parameter and also applies it as a filter on the column. For `id`, `account_id`, `name` and similar keys the two agree. For `fields` and `properties` on the issue reads, and `scope` and `owner` on the workflow, screen and filter searches, they do not: the rows are filtered out. Leave those parameters unset (the issue search returns the navigable fields). `expand` works as a request parameter: the expansion metadata Jira returns with each object is not a column.

## Experimental and deprecated operations

Atlassian marks operations as experimental (`x-experimental`) or deprecated. Both are mapped and their resource pages carry the vendor's description. Deprecated operations whose replacement is mapped are not.

## Rate limit

Jira Cloud applies cost-based rate limits per site and per credential and answers `429` with a `Retry-After` header when a limit is reached. A list read costs one request per page; a page holds up to 100 items on most reads (`max_results`), and up to 5000 issue keys on the JQL search when few fields are requested.

## Example Queries

Try the following queries using `stackql shell`, or run them from a script or CI pipeline with `stackql exec`.

### Find the cloud ID of a site

The value <CopyableCode code="ATLASSIAN_CLOUD_ID" /> takes, from the site's subdomain:

```sql
SELECT cloud_id
FROM jira.atlassian_tenant.info
WHERE site = 'acme';
```

### Project inventory

Every project the credential can browse, with its type, lead and description:

```sql
SELECT key, name, project_type_key, style,
       json_extract(lead, '$.displayName') AS lead,
       description
FROM jira.projects.projects
WHERE expand = 'description,lead'
ORDER BY key;
```

### Open issues by assignee

Unresolved issues in one project grouped by assignee, from a JQL search:

```sql
SELECT json_extract(fields, '$.assignee.displayName') AS assignee,
       COUNT(*) AS open_issues
FROM jira.issues.issues
WHERE jql = 'project = ENG AND resolution = Unresolved'
GROUP BY assignee
ORDER BY open_issues DESC;
```

### Stale issues

Unresolved issues not updated in 30 days, oldest first:

```sql
SELECT key,
       json_extract(fields, '$.summary') AS summary,
       json_extract(fields, '$.status.name') AS status,
       json_extract(fields, '$.updated') AS updated
FROM jira.issues.issues
WHERE jql = 'project = ENG AND resolution = Unresolved AND updated <= -30d ORDER BY updated ASC';
```

### Sprint history

The closed sprints of a Jira Software board with their dates and goals:

```sql
SELECT id, name, state, start_date, complete_date, goal
FROM jira.agile.sprints
WHERE board_id = '1' AND state = 'closed'
ORDER BY complete_date DESC;
```

### Permission scheme audit

The grants of every permission scheme, one row per scheme and permission:

```sql
SELECT ps.name AS scheme,
       json_extract(g.value, '$.permission') AS permission,
       json_extract(g.value, '$.holder.type') AS holder_type,
       json_extract(g.value, '$.holder.parameter') AS holder
FROM jira.permissions.schemes ps,
     json_each(ps.permissions) g
WHERE ps.expand = 'permissions'
ORDER BY scheme, permission;
```

### Permission check

Whether the credential holds a set of permissions in a project, one row per permission:

```sql
SELECT key, have_permission
FROM jira.permissions.my_permissions
WHERE permissions = 'BROWSE_PROJECTS,CREATE_ISSUES,TRANSITION_ISSUES,DELETE_ISSUES'
AND project_key = 'ENG';
```

### Issue lifecycle

Create an issue, change it, move it through its workflow, comment on it and remove it:

```sql
INSERT INTO jira.issues.issues (fields)
SELECT '{"project": {"key": "ENG"}, "summary": "Rotate the build agent keys", "issuetype": {"name": "Task"}, "labels": ["ops"]}'
RETURNING id, key;

UPDATE jira.issues.issues
SET fields = '{"summary": "Rotate the build agent keys before Friday"}'
WHERE issue_id_or_key = 'ENG-123';

SELECT id, name FROM jira.issues.transitions WHERE issue_id_or_key = 'ENG-123';

EXEC jira.issues.issues.transition
  @issue_id_or_key = 'ENG-123',
  @transition = '{"id": "31"}';

INSERT INTO jira.issues.comments (issue_id_or_key, body)
SELECT 'ENG-123', '{"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": "Done by the rotation job."}]}]}';

DELETE FROM jira.issues.issues
WHERE issue_id_or_key = 'ENG-123';
```

### Release management

Create a version, release it and list the versions of the project:

```sql
INSERT INTO jira.projects.versions (name, project_id, description)
SELECT '2026.12', 10001, 'December release'
RETURNING id, name;

UPDATE jira.projects.versions
SET released = true, release_date = '2026-12-15'
WHERE id = '10042';

SELECT name, released, release_date
FROM jira.projects.versions
WHERE project_id_or_key = 'ENG'
ORDER BY name;
```

### Cross-provider

Open work tracked in Jira alongside open issues in a GitHub repository, in one result set:

```sql
SELECT 'jira' AS tracker, key AS ref,
       json_extract(fields, '$.summary') AS title
FROM jira.issues.issues
WHERE jql = 'project = ENG AND resolution = Unresolved'
UNION ALL
SELECT 'github' AS tracker, CAST(number AS TEXT) AS ref, title
FROM github.issues.issues
WHERE owner = 'acme' AND repo = 'platform' AND state = 'open';
```


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/agile/">agile</a><br />
<a href="/services/atlassian_tenant/">atlassian_tenant</a><br />
<a href="/services/dashboards/">dashboards</a><br />
<a href="/services/fields/">fields</a><br />
<a href="/services/filters/">filters</a><br />
<a href="/services/issue_attributes/">issue_attributes</a><br />
<a href="/services/issue_types/">issue_types</a><br />
<a href="/services/issues/">issues</a><br />
<a href="/services/jql/">jql</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/notifications/">notifications</a><br />
<a href="/services/permissions/">permissions</a><br />
<a href="/services/plans/">plans</a><br />
<a href="/services/projects/">projects</a><br />
<a href="/services/screens/">screens</a><br />
<a href="/services/system/">system</a><br />
<a href="/services/users/">users</a><br />
<a href="/services/workflows/">workflows</a><br />
</div>
</div>
