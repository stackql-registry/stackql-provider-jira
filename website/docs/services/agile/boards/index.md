--- 
title: boards
hide_title: false
hide_table_of_contents: false
keywords:
  - boards
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the boards resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>boards</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="boards" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.boards" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns the requested board.

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
    <td>The ID of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="admins" /></td>
    <td><code>object</code></td>
    <td>The users and groups who own the board.</td>
</tr>
<tr>
    <td><CopyableCode code="can_edit" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board can be edited. (wire: canEdit)</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="is_private" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board is private. (wire: isPrivate)</td>
</tr>
<tr>
    <td><CopyableCode code="location" /></td>
    <td><code>object</code></td>
    <td>The container that the board is located in.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type the board.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about a board.

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
    <td>The ID of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="admins" /></td>
    <td><code>object</code></td>
    <td>The users and groups who own the board.</td>
</tr>
<tr>
    <td><CopyableCode code="can_edit" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board can be edited. (wire: canEdit)</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="is_private" /></td>
    <td><code>boolean</code></td>
    <td>Whether the board is private. (wire: isPrivate)</td>
</tr>
<tr>
    <td><CopyableCode code="location" /></td>
    <td><code>object</code></td>
    <td>The container that the board is located in.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the board.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type the board.</td>
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
    <td>Returns the board for the given board ID. This board will only be returned if the user has permission to view it. Admins without the view permission will see the board as a private one, so will see only a subset of the board's data (board location for instance).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_key_or_id"><code>project_key_or_id</code></a>, <a href="#parameter-account_id_location"><code>account_id_location</code></a>, <a href="#parameter-project_location"><code>project_location</code></a>, <a href="#parameter-include_private"><code>include_private</code></a>, <a href="#parameter-negate_location_filtering"><code>negate_location_filtering</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-project_type_location"><code>project_type_location</code></a>, <a href="#parameter-filter_id"><code>filter_id</code></a></td>
    <td>Returns all boards. This only includes boards that the user has permission to view.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on February 15, 2024.&lt;br /&gt;&lt;br /&gt; *  `read:board-scope:jira-software`, `read:project:jira`</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a new board. Board name, type and filter ID is required.&lt;br /&gt;&lt;br /&gt; *  `name` \- Must be less than 255 characters.&lt;br /&gt; *  `type` \- Valid values: scrum, kanban&lt;br /&gt; *  `filterId` \- ID of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared objects' permission and tries to create a shared board, a private board will be created instead (remember that board sharing depends on the filter sharing).&lt;br /&gt; *  `location` \- The container that the board will be located in. `location` must include the `type` property (Valid values: project, user). If choosing 'project', then a project must be specified by a `projectKeyOrId` property in `location`. If choosing 'user', the current user is chosen by default. The `projectKeyOrId` property should not be provided.&lt;br /&gt;&lt;br /&gt;Note:&lt;br /&gt;&lt;br /&gt; *  If you want to create a new project with an associated board, use the &#91;Jira platform REST API&#93;(https:​//docs.atlassian.com/jira/REST/latest). For more information, see the &#91;Create project&#93;(#api-rest-api-3-project-post) method. The `projectTypeKey` for software boards must be 'software' and the `projectTemplateKey` must be either `com.pyxis.greenhopper.jira:gh-kanban-template` or `com.pyxis.greenhopper.jira:gh-scrum-template`.&lt;br /&gt; *  You can create a filter using the &#91;Jira REST API&#93;(https:​//docs.atlassian.com/jira/REST/latest). For more information, see the &#91;Create filter&#93;(#api-rest-api-3-filter-post) method.&lt;br /&gt; *  If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the board.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes the board. Admin without the view permission can still remove the board.</td>
</tr>
<tr>
    <td><a href="#move_issues"><CopyableCode code="move_issues" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Move issues from the backog to the board (if they are already in the backlog of that board).  &lt;br /&gt;This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board) Or transitions the issue(s) to the first column for a kanban board with backlog. At most 50 issues may be moved at once.</td>
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
    <td></td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-account_id_location">
    <td><CopyableCode code="account_id_location" /></td>
    <td><code>string</code></td>
    <td> (wire: accountIdLocation)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>List of fields to expand for each board. Valid values: admins, permissions.</td>
</tr>
<tr id="parameter-filter_id">
    <td><CopyableCode code="filter_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Filters results to boards that are relevant to a filter. Not supported for next-gen boards. (wire: filterId)</td>
</tr>
<tr id="parameter-include_private">
    <td><CopyableCode code="include_private" /></td>
    <td><code>boolean</code></td>
    <td>Appends private boards to the end of the list. The name and type fields are excluded for security reasons. (wire: includePrivate)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of boards to return per page. See the 'Pagination' section at the top of this page for more details. (wire: maxResults)</td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Filters results to boards that match or partially match the specified name.</td>
</tr>
<tr id="parameter-negate_location_filtering">
    <td><CopyableCode code="negate_location_filtering" /></td>
    <td><code>boolean</code></td>
    <td>If set to true, negate filters used for querying by location. By default false. (wire: negateLocationFiltering)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>Ordering of the results by a given field. If not provided, values will not be sorted. Valid values: name. (wire: orderBy)</td>
</tr>
<tr id="parameter-project_key_or_id">
    <td><CopyableCode code="project_key_or_id" /></td>
    <td><code>string</code></td>
    <td>Filters results to boards that are relevant to a project. Relevance means that the jql filter defined in board contains a reference to a project. (wire: projectKeyOrId)</td>
</tr>
<tr id="parameter-project_location">
    <td><CopyableCode code="project_location" /></td>
    <td><code>string</code></td>
    <td> (wire: projectLocation)</td>
</tr>
<tr id="parameter-project_type_location">
    <td><CopyableCode code="project_type_location" /></td>
    <td><code>array</code></td>
    <td>Filters results to boards that are relevant to a project types. Support Jira Software, Jira Service Management. Valid values: software, service\_desk. By default software. (wire: projectTypeLocation)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for more details. (wire: startAt)</td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>object</code></td>
    <td>Filters results to boards of the specified types. Valid values: scrum, kanban, simple.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns the board for the given board ID. This board will only be returned if the user has permission to view it. Admins without the view permission will see the board as a private one, so will see only a subset of the board's data (board location for instance).

```sql
SELECT
id,
name,
admins,
can_edit,
favourite,
is_private,
location,
self,
type
FROM jira.agile.boards
WHERE board_id = '{{ board_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns all boards. This only includes boards that the user has permission to view.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on February 15, 2024.&lt;br /&gt;&lt;br /&gt; *  `read:board-scope:jira-software`, `read:project:jira`

```sql
SELECT
id,
name,
admins,
can_edit,
favourite,
is_private,
location,
self,
type
FROM jira.agile.boards
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND type = '{{ type }}'
AND name = '{{ name }}'
AND project_key_or_id = '{{ project_key_or_id }}'
AND account_id_location = '{{ account_id_location }}'
AND project_location = '{{ project_location }}'
AND include_private = '{{ include_private }}'
AND negate_location_filtering = '{{ negate_location_filtering }}'
AND order_by = '{{ order_by }}'
AND expand = '{{ expand }}'
AND project_type_location = '{{ project_type_location }}'
AND filter_id = '{{ filter_id }}'
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

Creates a new board. Board name, type and filter ID is required.&lt;br /&gt;&lt;br /&gt; *  `name` \- Must be less than 255 characters.&lt;br /&gt; *  `type` \- Valid values: scrum, kanban&lt;br /&gt; *  `filterId` \- ID of a filter that the user has permissions to view. Note, if the user does not have the 'Create shared objects' permission and tries to create a shared board, a private board will be created instead (remember that board sharing depends on the filter sharing).&lt;br /&gt; *  `location` \- The container that the board will be located in. `location` must include the `type` property (Valid values: project, user). If choosing 'project', then a project must be specified by a `projectKeyOrId` property in `location`. If choosing 'user', the current user is chosen by default. The `projectKeyOrId` property should not be provided.&lt;br /&gt;&lt;br /&gt;Note:&lt;br /&gt;&lt;br /&gt; *  If you want to create a new project with an associated board, use the &#91;Jira platform REST API&#93;(https:​//docs.atlassian.com/jira/REST/latest). For more information, see the &#91;Create project&#93;(#api-rest-api-3-project-post) method. The `projectTypeKey` for software boards must be 'software' and the `projectTemplateKey` must be either `com.pyxis.greenhopper.jira:gh-kanban-template` or `com.pyxis.greenhopper.jira:gh-scrum-template`.&lt;br /&gt; *  You can create a filter using the &#91;Jira REST API&#93;(https:​//docs.atlassian.com/jira/REST/latest). For more information, see the &#91;Create filter&#93;(#api-rest-api-3-filter-post) method.&lt;br /&gt; *  If you do not ORDER BY the Rank field for the filter of your board, you will not be able to reorder issues on the board.

```sql
INSERT INTO jira.agile.boards (
filter_id,
location,
name,
type,
cloud_id
)
SELECT 
{{ filter_id }},
'{{ location }}',
'{{ name }}',
'{{ type }}',
'{{ cloud_id }}'
RETURNING
id,
name,
admins,
can_edit,
favourite,
is_private,
location,
self,
type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: boards
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the boards resource.
    - name: filter_id
      value: {{ filter_id }}
    - name: location
      value:
        projectKeyOrId: "{{ projectKeyOrId }}"
        type: "{{ type }}"
    - name: name
      value: "{{ name }}"
    - name: type
      value: "{{ type }}"
      valid_values: ['kanban', 'scrum', 'agility']
`}</CodeBlock>

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

Deletes the board. Admin without the view permission can still remove the board.

```sql
DELETE FROM jira.agile.boards
WHERE board_id = '{{ board_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="move_issues"
    values={[
        { label: 'move_issues', value: 'move_issues' }
    ]}
>
<TabItem value="move_issues">

Move issues from the backog to the board (if they are already in the backlog of that board).  &lt;br /&gt;This operation either moves an issue(s) onto a board from the backlog (by adding it to the issueList for the board) Or transitions the issue(s) to the first column for a kanban board with backlog. At most 50 issues may be moved at once.

```sql
EXEC jira.agile.boards.move_issues 
@board_id='{{ board_id }}' --required, 
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
</Tabs>
