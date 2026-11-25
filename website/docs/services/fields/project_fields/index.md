--- 
title: project_fields
hide_title: false
hide_table_of_contents: false
keywords:
  - project_fields
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the project_fields resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>project_fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.project_fields" /></td></tr>
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

A page of items.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="work_type_id" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: workTypeId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_required" /></td>
    <td><code>boolean</code></td>
    <td> (wire: isRequired)</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-work_type_id"><code>work_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-field_id"><code>field_id</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of fields for the requested projects and work types.&lt;br /&gt;&lt;br /&gt;Only fields that are available for the specified combination of projects and work types are returned. This endpoint allows filtering to specific fields if field IDs are provided.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The IDs of projects to return fields for. (wire: projectId)</td>
</tr>
<tr id="parameter-work_type_id">
    <td><CopyableCode code="work_type_id" /></td>
    <td><code>array</code></td>
    <td>The IDs of work types (issue types) to return fields for. (wire: workTypeId)</td>
</tr>
<tr id="parameter-field_id">
    <td><CopyableCode code="field_id" /></td>
    <td><code>array</code></td>
    <td>The IDs of fields to return. If not provided, all fields are returned. (wire: fieldId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of fields for the requested projects and work types.&lt;br /&gt;&lt;br /&gt;Only fields that are available for the specified combination of projects and work types are returned. This endpoint allows filtering to specific fields if field IDs are provided.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
field_id,
project_id,
work_type_id,
description,
is_required
FROM jira.fields.project_fields
WHERE project_id = '{{ project_id }}' -- required
AND work_type_id = '{{ work_type_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND field_id = '{{ field_id }}'
;
```
</TabItem>
</Tabs>
