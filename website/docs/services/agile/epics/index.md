--- 
title: epics
hide_title: false
hide_table_of_contents: false
keywords:
  - epics
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the epics resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>epics</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="epics" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.epics" /></td></tr>
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

Returns the requested epic.

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
    <td><CopyableCode code="color" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="done" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="summary" /></td>
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
    <td><a href="#parameter-epic_id_or_key"><code>epic_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it. **Note:** This operation does not work for epics in next-gen projects.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-epic_id_or_key"><code>epic_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Performs a partial update of the epic. A partial update means that fields not present in the request JSON will not be updated. Valid values for color are `color_1` to `color_9`. **Note:** This operation does not work for epics in next-gen projects.</td>
</tr>
<tr>
    <td><a href="#remove_issues"><CopyableCode code="remove_issues" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes issues from epics. The user needs to have the edit issue permission for all issue they want to remove from epics. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work for epics in next-gen projects. Instead, update the issue using `\&#123; fields: \&#123; parent: \&#123;\&#125; \&#125; \&#125;`</td>
</tr>
<tr>
    <td><a href="#move_issues"><CopyableCode code="move_issues" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-epicIdOrKey"><code>epicIdOrKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves issues to an epic, for a given epic id. Issues can be only in a single epic at the same time. That means that already assigned issues to an epic, will not be assigned to the previous epic anymore. The user needs to have the edit issue permission for all issue they want to move and to the epic. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work for epics in next-gen projects.</td>
</tr>
<tr>
    <td><a href="#rank"><CopyableCode code="rank" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-epicIdOrKey"><code>epicIdOrKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves (ranks) an epic before or after a given epic.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.&lt;br /&gt;&lt;br /&gt;**Note:** This operation does not work for epics in next-gen projects.</td>
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
<tr id="parameter-epicIdOrKey">
    <td><CopyableCode code="epicIdOrKey" /></td>
    <td><code>string</code></td>
    <td>The id or key of the epic to rank.</td>
</tr>
<tr id="parameter-epic_id_or_key">
    <td><CopyableCode code="epic_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The id or key of the epic to update. (wire: epicIdOrKey)</td>
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

Returns the epic for a given epic ID. This epic will only be returned if the user has permission to view it. **Note:** This operation does not work for epics in next-gen projects.

```sql
SELECT
id,
name,
color,
done,
self,
summary
FROM jira.agile.epics
WHERE epic_id_or_key = '{{ epic_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Performs a partial update of the epic. A partial update means that fields not present in the request JSON will not be updated. Valid values for color are `color_1` to `color_9`. **Note:** This operation does not work for epics in next-gen projects.

```sql
UPDATE jira.agile.epics
SET 
color = '{{ color }}',
done = {{ done }},
name = '{{ name }}',
summary = '{{ summary }}'
WHERE 
epic_id_or_key = '{{ epic_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
color,
done,
self,
summary;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="remove_issues"
    values={[
        { label: 'remove_issues', value: 'remove_issues' },
        { label: 'move_issues', value: 'move_issues' },
        { label: 'rank', value: 'rank' }
    ]}
>
<TabItem value="remove_issues">

Removes issues from epics. The user needs to have the edit issue permission for all issue they want to remove from epics. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work for epics in next-gen projects. Instead, update the issue using `\&#123; fields: \&#123; parent: \&#123;\&#125; \&#125; \&#125;`

```sql
EXEC jira.agile.epics.remove_issues 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}"
}'
;
```
</TabItem>
<TabItem value="move_issues">

Moves issues to an epic, for a given epic id. Issues can be only in a single epic at the same time. That means that already assigned issues to an epic, will not be assigned to the previous epic anymore. The user needs to have the edit issue permission for all issue they want to move and to the epic. The maximum number of issues that can be moved in one operation is 50. **Note:** This operation does not work for epics in next-gen projects.

```sql
EXEC jira.agile.epics.move_issues 
@epicIdOrKey='{{ epicIdOrKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}"
}'
;
```
</TabItem>
<TabItem value="rank">

Moves (ranks) an epic before or after a given epic.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.&lt;br /&gt;&lt;br /&gt;**Note:** This operation does not work for epics in next-gen projects.

```sql
EXEC jira.agile.epics.rank 
@epicIdOrKey='{{ epicIdOrKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"rankAfterEpic": "{{ rankAfterEpic }}", 
"rankBeforeEpic": "{{ rankBeforeEpic }}", 
"rankCustomFieldId": {{ rankCustomFieldId }}
}'
;
```
</TabItem>
</Tabs>
