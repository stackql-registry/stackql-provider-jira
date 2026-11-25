--- 
title: trashed_fields
hide_title: false
hide_table_of_contents: false
keywords:
  - trashed_fields
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the trashed_fields resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>trashed_fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="trashed_fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.trashed_fields" /></td></tr>
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

Details of a field.

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
    <td>The ID of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="stable_id" /></td>
    <td><code>string</code></td>
    <td>The stable ID of the field. (wire: stableId)</td>
</tr>
<tr>
    <td><CopyableCode code="translated_name" /></td>
    <td><code>string</code></td>
    <td>The translated (i18n) name of the field for the current locale. Returned for custom fields. (wire: translatedName)</td>
</tr>
<tr>
    <td><CopyableCode code="type_display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the field type (wire: typeDisplayName)</td>
</tr>
<tr>
    <td><CopyableCode code="contexts_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of contexts where the field is used. (wire: contextsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="is_locked" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is locked. (wire: isLocked)</td>
</tr>
<tr>
    <td><CopyableCode code="is_unscreenable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is shown on screen or not. (wire: isUnscreenable)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="last_used" /></td>
    <td><code>object</code></td>
    <td>Information about the most recent use of a field. (wire: lastUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="projects_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of projects where the field is used. (wire: projectsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema of a field.</td>
</tr>
<tr>
    <td><CopyableCode code="screens_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of screens where the field is used. (wire: screensCount)</td>
</tr>
<tr>
    <td><CopyableCode code="searcher_key" /></td>
    <td><code>string</code></td>
    <td>The searcher key of the field. Returned for custom fields. (wire: searcherKey)</td>
</tr>
<tr>
    <td><CopyableCode code="translated_description" /></td>
    <td><code>string</code></td>
    <td>The translated (i18n) description of the field for the current locale. Returned for custom fields. (wire: translatedDescription)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-order_by"><code>order_by</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of fields in the trash. The list may be restricted to fields whose field name or description partially match a string.&lt;br /&gt;&lt;br /&gt;Only custom fields can be queried, `type` must be set to `custom`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `name` sorts by the field name  *  `trashDate` sorts by the date the field was moved to the trash  *  `plannedDeletionDate` sorts by the planned deletion date (wire: orderBy)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with field names or descriptions.</td>
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

Returns a &#91;paginated&#93;(#pagination) list of fields in the trash. The list may be restricted to fields whose field name or description partially match a string.&lt;br /&gt;&lt;br /&gt;Only custom fields can be queried, `type` must be set to `custom`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
stable_id,
translated_name,
type_display_name,
contexts_count,
description,
is_locked,
is_unscreenable,
key,
last_used,
projects_count,
schema,
screens_count,
searcher_key,
translated_description
FROM jira.fields.trashed_fields
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND query = '{{ query }}'
AND expand = '{{ expand }}'
AND order_by = '{{ order_by }}'
;
```
</TabItem>
</Tabs>
