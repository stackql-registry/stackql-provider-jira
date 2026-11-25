--- 
title: board_configurations
hide_title: false
hide_table_of_contents: false
keywords:
  - board_configurations
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the board_configurations resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>board_configurations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="board_configurations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.board_configurations" /></td></tr>
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

Returns the configuration of the board for given boardId.

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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="column_config" /></td>
    <td><code>object</code></td>
    <td> (wire: columnConfig)</td>
</tr>
<tr>
    <td><CopyableCode code="estimation" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="filter" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="location" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ranking" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="sub_query" /></td>
    <td><code>object</code></td>
    <td> (wire: subQuery)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td></td>
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
    <td></td>
    <td>Get the board configuration. The response contains the following fields:&lt;br /&gt;&lt;br /&gt; *  `id` \- ID of the board.&lt;br /&gt; *  `name` \- Name of the board.&lt;br /&gt; *  `filter` \- Reference to the filter used by the given board.&lt;br /&gt; *  `location` \- Reference to the container that the board is located in. Includes the container type (Valid values: project, user).&lt;br /&gt; *  `subQuery` (Kanban only) - JQL subquery used by the given board.&lt;br /&gt; *  `columnConfig` \- The column configuration lists the columns for the board, in the order defined in the column configuration. For each column, it shows the issue status mapping as well as the constraint type (Valid values: none, issueCount, issueCountExclSubs) for the min/max number of issues. Note, the last column with statuses mapped to it is treated as the "Done" column, which means that issues in that column will be marked as already completed.&lt;br /&gt; *  `estimation` (Scrum only) - Contains information about type of estimation used for the board. Valid values: none, issueCount, field. If the estimation type is "field", the ID and display name of the field used for estimation is also returned. Note, estimates for an issue can be updated by a PUT /rest/api/3/issue/\&#123;issueIdOrKey\&#125; request, however the fields must be on the screen. "timeoriginalestimate" field will never be on the screen, so in order to update it "originalEstimate" in "timetracking" field should be updated.&lt;br /&gt; *  `ranking` \- Contains information about custom field used for ranking in the given board.</td>
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
    <td>The ID of the board for which configuration is requested. (wire: boardId)</td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
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

Get the board configuration. The response contains the following fields:&lt;br /&gt;&lt;br /&gt; *  `id` \- ID of the board.&lt;br /&gt; *  `name` \- Name of the board.&lt;br /&gt; *  `filter` \- Reference to the filter used by the given board.&lt;br /&gt; *  `location` \- Reference to the container that the board is located in. Includes the container type (Valid values: project, user).&lt;br /&gt; *  `subQuery` (Kanban only) - JQL subquery used by the given board.&lt;br /&gt; *  `columnConfig` \- The column configuration lists the columns for the board, in the order defined in the column configuration. For each column, it shows the issue status mapping as well as the constraint type (Valid values: none, issueCount, issueCountExclSubs) for the min/max number of issues. Note, the last column with statuses mapped to it is treated as the "Done" column, which means that issues in that column will be marked as already completed.&lt;br /&gt; *  `estimation` (Scrum only) - Contains information about type of estimation used for the board. Valid values: none, issueCount, field. If the estimation type is "field", the ID and display name of the field used for estimation is also returned. Note, estimates for an issue can be updated by a PUT /rest/api/3/issue/\&#123;issueIdOrKey\&#125; request, however the fields must be on the screen. "timeoriginalestimate" field will never be on the screen, so in order to update it "originalEstimate" in "timetracking" field should be updated.&lt;br /&gt; *  `ranking` \- Contains information about custom field used for ranking in the given board.

```sql
SELECT
id,
name,
column_config,
estimation,
filter,
location,
ranking,
self,
sub_query,
type
FROM jira.agile.board_configurations
WHERE board_id = '{{ board_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
