--- 
title: board_backlog_issue_counts
hide_title: false
hide_table_of_contents: false
keywords:
  - board_backlog_issue_counts
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the board_backlog_issue_counts resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>board_backlog_issue_counts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="board_backlog_issue_counts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.board_backlog_issue_counts" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Returns the requested issue count.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of issues.</td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-jql"><code>jql</code></a></td>
    <td>Returns the approximate count of all issues from the board's backlog, for the given board ID. This is equivalent to counting the issues on all pages returned by &#91;Get issues for backlog enhanced&#93;(https:​//developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-rest-software-1-0-board-boardid-backlog-get). Recent updates might not be immediately visible in the returned output. This only includes issues that the user has permission to view.</td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-board_id">
    <td><CopyableCode code="board_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the board that has the backlog containing the requested issues.</td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-jql">
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td>Filters results using a JQL query. Note that `username` and `userkey` can't be used as search terms for this parameter due to privacy reasons. Use `accountId` instead.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Returns the approximate count of all issues from the board's backlog, for the given board ID. This is equivalent to counting the issues on all pages returned by [Get issues for backlog enhanced](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-rest-software-1-0-board-boardid-backlog-get). Recent updates might not be immediately visible in the returned output. This only includes issues that the user has permission to view.

```sql
SELECT
count
FROM jira.agile.board_backlog_issue_counts
WHERE board_id = '{{ board_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND jql = '{{ jql }}'
;
```
</TabItem>
</Tabs>
