--- 
title: custom_field_context_project_mappings
hide_title: false
hide_table_of_contents: false
keywords:
  - custom_field_context_project_mappings
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the custom_field_context_project_mappings resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>custom_field_context_project_mappings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="custom_field_context_project_mappings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.custom_field_context_project_mappings" /></td></tr>
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

Details of a context to project association.

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
    <td><CopyableCode code="context_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the context. (wire: contextId)</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the project. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="is_global_context" /></td>
    <td><code>boolean</code></td>
    <td>Whether context is global. (wire: isGlobalContext)</td>
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
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings are returned. Invalid IDs are ignored.&lt;br /&gt;&lt;br /&gt;**Note:** Jira is adding support for multiple field contexts per project. On sites where this is enabled, a custom field can have more than one context associated with the same project, so this operation can return several mappings that share the same `projectId`, each with a different `contextId`. Do not assume that a project appears at most once in the response. See &#91;CHANGE-3082&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3082) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-field_id">
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the custom field, for example `customfield\_10000`.</td>
</tr>
<tr id="parameter-context_id">
    <td><CopyableCode code="context_id" /></td>
    <td><code>array</code></td>
    <td>The list of context IDs. To include multiple context, separate IDs with ampersand: `contextId=10000&contextId=10001`. (wire: contextId)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of context to project mappings for a custom field. The result can be filtered by `contextId`. Otherwise, all mappings are returned. Invalid IDs are ignored.&lt;br /&gt;&lt;br /&gt;**Note:** Jira is adding support for multiple field contexts per project. On sites where this is enabled, a custom field can have more than one context associated with the same project, so this operation can return several mappings that share the same `projectId`, each with a different `contextId`. Do not assume that a project appears at most once in the response. See &#91;CHANGE-3082&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-3082) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
context_id,
project_id,
is_global_context
FROM jira.fields.custom_field_context_project_mappings
WHERE field_id = '{{ field_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND context_id = '{{ context_id }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
