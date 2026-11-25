--- 
title: issue_estimations
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_estimations
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_estimations resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_estimations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_estimations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.issue_estimations" /></td></tr>
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

Returns the estimation of the issue and a fieldId of the field that is used for it.

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
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td> (wire: fieldId)</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a></td>
    <td>Returns the estimation of the issue and a fieldId of the field that is used for it. `boardId` param is required. This param determines which field will be updated on a issue.&lt;br /&gt;&lt;br /&gt;Original time internally stores and returns the estimation as a number of seconds.&lt;br /&gt;&lt;br /&gt;The field used for estimation on the given board can be obtained from &#91;board configuration resource&#93;(#agile/1.0/board-getConfiguration). More information about the field are returned by &#91;edit meta resource&#93;(#api-rest-api-3-issue-getEditIssueMeta) or &#91;field resource&#93;(#api-rest-api-3-field-get).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a></td>
    <td>Updates the estimation of the issue. boardId param is required. This param determines which field will be updated on a issue.&lt;br /&gt;&lt;br /&gt;Note that this resource changes the estimation field of the issue regardless of appearance the field on the screen.&lt;br /&gt;&lt;br /&gt;Original time tracking estimation field accepts estimation in formats like "1w", "2d", "3h", "20m" or number which represent number of minutes. However, internally the field stores and returns the estimation as a number of seconds.&lt;br /&gt;&lt;br /&gt;The field used for estimation on the given board can be obtained from &#91;board configuration resource&#93;(#agile/1.0/board-getConfiguration). More information about the field are returned by &#91;edit meta resource&#93;(#api-rest-api-3-issue-issueIdOrKey-editmeta-get) or &#91;field resource&#93;(#api-rest-api-3-field-get).</td>
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
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the requested issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-board_id">
    <td><CopyableCode code="board_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the board required to determine which field is used for estimation. (wire: boardId)</td>
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

Returns the estimation of the issue and a fieldId of the field that is used for it. `boardId` param is required. This param determines which field will be updated on a issue.&lt;br /&gt;&lt;br /&gt;Original time internally stores and returns the estimation as a number of seconds.&lt;br /&gt;&lt;br /&gt;The field used for estimation on the given board can be obtained from &#91;board configuration resource&#93;(#agile/1.0/board-getConfiguration). More information about the field are returned by &#91;edit meta resource&#93;(#api-rest-api-3-issue-getEditIssueMeta) or &#91;field resource&#93;(#api-rest-api-3-field-get).

```sql
SELECT
field_id,
value
FROM jira.agile.issue_estimations
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND board_id = '{{ board_id }}'
;
```
</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Updates the estimation of the issue. boardId param is required. This param determines which field will be updated on a issue.&lt;br /&gt;&lt;br /&gt;Note that this resource changes the estimation field of the issue regardless of appearance the field on the screen.&lt;br /&gt;&lt;br /&gt;Original time tracking estimation field accepts estimation in formats like "1w", "2d", "3h", "20m" or number which represent number of minutes. However, internally the field stores and returns the estimation as a number of seconds.&lt;br /&gt;&lt;br /&gt;The field used for estimation on the given board can be obtained from &#91;board configuration resource&#93;(#agile/1.0/board-getConfiguration). More information about the field are returned by &#91;edit meta resource&#93;(#api-rest-api-3-issue-issueIdOrKey-editmeta-get) or &#91;field resource&#93;(#api-rest-api-3-field-get).

```sql
UPDATE jira.agile.issue_estimations
SET 
value = '{{ value }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND board_id = '{{ board_id}}'
RETURNING
field_id,
value;
```
</TabItem>
</Tabs>
