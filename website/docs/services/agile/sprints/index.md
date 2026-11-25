--- 
title: sprints
hide_title: false
hide_table_of_contents: false
keywords:
  - sprints
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the sprints resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>sprints</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sprints" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.sprints" /></td></tr>
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

Returns the requested sprint.

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
    <td><CopyableCode code="origin_board_id" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: originBoardId)</td>
</tr>
<tr>
    <td><CopyableCode code="complete_date" /></td>
    <td><code>string</code></td>
    <td> (wire: completeDate)</td>
</tr>
<tr>
    <td><CopyableCode code="end_date" /></td>
    <td><code>string</code></td>
    <td> (wire: endDate)</td>
</tr>
<tr>
    <td><CopyableCode code="goal" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="start_date" /></td>
    <td><code>string</code></td>
    <td> (wire: startDate)</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
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
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board that the sprint was created on, or view at least one of the issues in the sprint.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.&lt;br /&gt;&lt;br /&gt;Note that the sprint name is trimmed. Also, when starting sprints from the UI, the "endDate" set through this call is ignored and instead the last sprint's duration is used to fill the form.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Performs a partial update of a sprint. A partial update means that fields not present in the request JSON will not be updated.&lt;br /&gt;&lt;br /&gt;Notes:&lt;br /&gt;&lt;br /&gt; *  For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.&lt;br /&gt; *  A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and have a startDate and endDate set.&lt;br /&gt; *  A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state. This sets the completeDate to the time of the request.&lt;br /&gt; *  Other changes to state are not allowed.&lt;br /&gt; *  The completeDate field cannot be updated manually.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.</td>
</tr>
<tr>
    <td><a href="#replace"><CopyableCode code="replace" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-sprintId"><code>sprintId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Performs a full update of a sprint. A full update means that the result will be exactly the same as the request body. Any fields not present in the request JSON will be set to null.&lt;br /&gt;&lt;br /&gt;Notes:&lt;br /&gt;&lt;br /&gt; *  For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.&lt;br /&gt; *  A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and have a startDate and endDate set.&lt;br /&gt; *  A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state. This sets the completeDate to the time of the request.&lt;br /&gt; *  Other changes to state are not allowed.&lt;br /&gt; *  The completeDate field cannot be updated manually.</td>
</tr>
<tr>
    <td><a href="#move_issues"><CopyableCode code="move_issues" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-sprintId"><code>sprintId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves issues to a sprint, for a given sprint ID. Issues can only be moved to open or active sprints. The maximum number of issues that can be moved in one operation is 50.</td>
</tr>
<tr>
    <td><a href="#swap"><CopyableCode code="swap" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-sprintId"><code>sprintId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Swap the position of the sprint with the second sprint.</td>
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
<tr id="parameter-sprintId">
    <td><CopyableCode code="sprintId" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the sprint to swap.</td>
</tr>
<tr id="parameter-sprint_id">
    <td><CopyableCode code="sprint_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the sprint to delete. (wire: sprintId)</td>
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

Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board that the sprint was created on, or view at least one of the issues in the sprint.

```sql
SELECT
id,
name,
origin_board_id,
complete_date,
end_date,
goal,
self,
start_date,
state
FROM jira.agile.sprints
WHERE sprint_id = '{{ sprint_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.&lt;br /&gt;&lt;br /&gt;Note that the sprint name is trimmed. Also, when starting sprints from the UI, the "endDate" set through this call is ignored and instead the last sprint's duration is used to fill the form.

```sql
INSERT INTO jira.agile.sprints (
end_date,
goal,
name,
origin_board_id,
start_date,
cloud_id
)
SELECT 
'{{ end_date }}',
'{{ goal }}',
'{{ name }}',
{{ origin_board_id }},
'{{ start_date }}',
'{{ cloud_id }}'
RETURNING
id,
name,
origin_board_id,
end_date,
goal,
self,
start_date,
state
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: sprints
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the sprints resource.
    - name: end_date
      value: "{{ end_date }}"
    - name: goal
      value: "{{ goal }}"
    - name: name
      value: "{{ name }}"
    - name: origin_board_id
      value: {{ origin_board_id }}
    - name: start_date
      value: "{{ start_date }}"
`}</CodeBlock>

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

Performs a partial update of a sprint. A partial update means that fields not present in the request JSON will not be updated.&lt;br /&gt;&lt;br /&gt;Notes:&lt;br /&gt;&lt;br /&gt; *  For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.&lt;br /&gt; *  A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and have a startDate and endDate set.&lt;br /&gt; *  A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state. This sets the completeDate to the time of the request.&lt;br /&gt; *  Other changes to state are not allowed.&lt;br /&gt; *  The completeDate field cannot be updated manually.

```sql
UPDATE jira.agile.sprints
SET 
complete_date = '{{ complete_date }}',
created_date = '{{ created_date }}',
end_date = '{{ end_date }}',
goal = '{{ goal }}',
id = {{ id }},
name = '{{ name }}',
origin_board_id = {{ origin_board_id }},
self = '{{ self }}',
start_date = '{{ start_date }}',
state = '{{ state }}'
WHERE 
sprint_id = '{{ sprint_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
origin_board_id,
complete_date,
end_date,
goal,
self,
start_date,
state;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.

```sql
DELETE FROM jira.agile.sprints
WHERE sprint_id = '{{ sprint_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="replace"
    values={[
        { label: 'replace', value: 'replace' },
        { label: 'move_issues', value: 'move_issues' },
        { label: 'swap', value: 'swap' }
    ]}
>
<TabItem value="replace">

Performs a full update of a sprint. A full update means that the result will be exactly the same as the request body. Any fields not present in the request JSON will be set to null.&lt;br /&gt;&lt;br /&gt;Notes:&lt;br /&gt;&lt;br /&gt; *  For closed sprints, only the name and goal can be updated; changes to other fields will be ignored.&lt;br /&gt; *  A sprint can be started by updating the state to 'active'. This requires the sprint to be in the 'future' state and have a startDate and endDate set.&lt;br /&gt; *  A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state. This sets the completeDate to the time of the request.&lt;br /&gt; *  Other changes to state are not allowed.&lt;br /&gt; *  The completeDate field cannot be updated manually.

```sql
EXEC jira.agile.sprints.replace 
@sprintId='{{ sprintId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"completeDate": "{{ completeDate }}", 
"createdDate": "{{ createdDate }}", 
"endDate": "{{ endDate }}", 
"goal": "{{ goal }}", 
"id": {{ id }}, 
"name": "{{ name }}", 
"originBoardId": {{ originBoardId }}, 
"self": "{{ self }}", 
"startDate": "{{ startDate }}", 
"state": "{{ state }}"
}'
;
```
</TabItem>
<TabItem value="move_issues">

Moves issues to a sprint, for a given sprint ID. Issues can only be moved to open or active sprints. The maximum number of issues that can be moved in one operation is 50.

```sql
EXEC jira.agile.sprints.move_issues 
@sprintId='{{ sprintId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}", 
"rankAfterIssue": "{{ rankAfterIssue }}", 
"rankBeforeIssue": "{{ rankBeforeIssue }}", 
"rankCustomFieldId": {{ rankCustomFieldId }}
}'
;
```
</TabItem>
<TabItem value="swap">

Swap the position of the sprint with the second sprint.

```sql
EXEC jira.agile.sprints.swap 
@sprintId='{{ sprintId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"sprintToSwapWith": {{ sprintToSwapWith }}
}'
;
```
</TabItem>
</Tabs>
