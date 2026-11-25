--- 
title: issue_type_alternatives
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_type_alternatives
  - issue_types
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_type_alternatives resource in the jira issue_types service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_type_alternatives</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_type_alternatives" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_types.issue_type_alternatives" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Details about an issue type.

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
    <td><code>string</code></td>
    <td>The ID of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type's avatar. (wire: avatarId)</td>
</tr>
<tr>
    <td><CopyableCode code="entity_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects. (wire: entityId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="hierarchy_level" /></td>
    <td><code>integer (int32)</code></td>
    <td>Hierarchy level of the issue type. (wire: hierarchyLevel)</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue type's avatar. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>Details of the next-gen projects the issue type is available in.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of these issue type details.</td>
</tr>
<tr>
    <td><CopyableCode code="subtask" /></td>
    <td><code>boolean</code></td>
    <td>Whether this issue type is used to create subtasks.</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those assigned to the same workflow scheme, field configuration scheme, and screen scheme.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue type.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those assigned to the same workflow scheme, field configuration scheme, and screen scheme.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
id,
name,
avatar_id,
entity_id,
description,
hierarchy_level,
icon_url,
scope,
self,
subtask
FROM jira.issue_types.issue_type_alternatives
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
