--- 
title: field_configuration_items
hide_title: false
hide_table_of_contents: false
keywords:
  - field_configuration_items
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the field_configuration_items resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>field_configuration_items</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="field_configuration_items" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.field_configuration_items" /></td></tr>
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

A field within a field configuration.

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
    <td>The ID of the field within the field configuration.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the field within the field configuration.</td>
</tr>
<tr>
    <td><CopyableCode code="is_hidden" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is hidden in the field configuration. (wire: isHidden)</td>
</tr>
<tr>
    <td><CopyableCode code="is_required" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is required in the field configuration. (wire: isRequired)</td>
</tr>
<tr>
    <td><CopyableCode code="renderer" /></td>
    <td><code>string</code></td>
    <td>The renderer type for the field within the field configuration.</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Deprecated, use &#91; Field schemes&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) which supports field association schemes.&lt;br /&gt;&lt;br /&gt;Returns a &#91;paginated&#93;(#pagination) list of all fields for a configuration.&lt;br /&gt;&lt;br /&gt;Only the fields from configurations used in company-managed (classic) projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-field_configuration_items"><code>field_configuration_items</code></a></td>
    <td></td>
    <td>Deprecated, use &#91; Field schemes&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) which supports field association schemes.&lt;br /&gt;&lt;br /&gt;Updates fields in a field configuration. The properties of the field configuration fields provided override the existing values.&lt;br /&gt;&lt;br /&gt;This operation can only update field configurations used in company-managed (classic) projects.&lt;br /&gt;&lt;br /&gt;The operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer (`autocomplete-renderer`).&lt;br /&gt;&lt;br /&gt;Hiding a field deletes it from the field configuration - deleting the required, description and renderer type values as well. As a result, hiding and unhiding will not restore the other values but use their default values.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td><code>integer (int64)</code></td>
    <td>The ID of the field configuration.</td>
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

Deprecated, use &#91; Field schemes&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) which supports field association schemes.&lt;br /&gt;&lt;br /&gt;Returns a &#91;paginated&#93;(#pagination) list of all fields for a configuration.&lt;br /&gt;&lt;br /&gt;Only the fields from configurations used in company-managed (classic) projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
description,
is_hidden,
is_required,
renderer
FROM jira.fields.field_configuration_items
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
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

Deprecated, use &#91; Field schemes&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) which supports field association schemes.&lt;br /&gt;&lt;br /&gt;Updates fields in a field configuration. The properties of the field configuration fields provided override the existing values.&lt;br /&gt;&lt;br /&gt;This operation can only update field configurations used in company-managed (classic) projects.&lt;br /&gt;&lt;br /&gt;The operation can set the renderer for text fields to the default text renderer (`text-renderer`) or wiki style renderer (`wiki-renderer`). However, the renderer cannot be updated for fields using the autocomplete renderer (`autocomplete-renderer`).&lt;br /&gt;&lt;br /&gt;Hiding a field deletes it from the field configuration - deleting the required, description and renderer type values as well. As a result, hiding and unhiding will not restore the other values but use their default values.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.fields.field_configuration_items
SET 
field_configuration_items = '{{ field_configuration_items }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND field_configuration_items = '{{ field_configuration_items }}' --required;
```
</TabItem>
</Tabs>
