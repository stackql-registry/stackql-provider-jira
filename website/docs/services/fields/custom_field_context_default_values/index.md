--- 
title: custom_field_context_default_values
hide_title: false
hide_table_of_contents: false
keywords:
  - custom_field_context_default_values
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the custom_field_context_default_values resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>custom_field_context_default_values</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="custom_field_context_default_values" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.custom_field_context_default_values" /></td></tr>
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

Default values grouped by custom field context.

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
    <td><code>integer (int64)</code></td>
    <td>The ID of the context. (wire: contextId)</td>
</tr>
<tr>
    <td><CopyableCode code="default_values" /></td>
    <td><code>array</code></td>
    <td>The base default and explicitly stored issue-type overrides for this context. Inherited defaults are not duplicated. (wire: defaultValues)</td>
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
    <td><a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-issue_type_id"><code>issue_type_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a paginated list of default values grouped by custom field context.&lt;br /&gt;&lt;br /&gt;Each context includes its base default with `isAnyIssueType=true`, even in a restricted context or when unset (`value: null`). Additional entries are explicitly stored issue-type overrides. Inherited defaults are not duplicated. Pagination is by context. Filtering by \&#123;@code issueTypeId\&#125; limits only the returned overrides; each returned context still includes its base default, even when none of its overrides match the filter.&lt;br /&gt;&lt;br /&gt;The value object on each entry is the same polymorphic `CustomFieldContextDefaultValueBean` exposed by the deprecated `GET /defaultValue` endpoint - its concrete subtype depends on the custom field's type (see the list of supported types on that endpoint).&lt;br /&gt;&lt;br /&gt;Only tenants enrolled in the early access program (EAP) can access this resource. See the &#91;EAP announcement&#93;(https:​//ecosystem.atlassian.net/browse/CHANGE-3082) for details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates default values for individual issue types in custom field contexts.&lt;br /&gt;&lt;br /&gt;Only tenants enrolled in the early access program (EAP) can access this resource. See the &#91;EAP announcement&#93;(https:​//ecosystem.atlassian.net/browse/CHANGE-3082) for details.&lt;br /&gt;&lt;br /&gt;Each entry targets either one issue type through \&#123;@code issueTypeId\&#125;, or the catch-all configuration through \&#123;@code isAnyIssueType=true\&#125;. Null clears the base default. Entries not included in the request are left unchanged. Each scope may appear only once. The operation defaults to \&#123;@code set\&#125;, which requires a value. \&#123;@code operation="removeOverride"\&#125; requires issueTypeId and allows the value property to be omitted or null. The contextId belongs on the enclosing update; setting contextId inside the value object is invalid.</td>
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
    <td>The ID of the custom field, for example \&#123;@code customfield\_10000\&#125;.</td>
</tr>
<tr id="parameter-context_id">
    <td><CopyableCode code="context_id" /></td>
    <td><code>array</code></td>
    <td>The IDs of the contexts to return default values for. If omitted, default values for every context the custom field has are returned. (wire: contextId)</td>
</tr>
<tr id="parameter-issue_type_id">
    <td><CopyableCode code="issue_type_id" /></td>
    <td><code>array</code></td>
    <td>The IDs of the issue types whose stored overrides are returned. If omitted, all stored overrides are returned. Each returned context includes its base default regardless of this filter. (wire: issueTypeId)</td>
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

Returns a paginated list of default values grouped by custom field context.&lt;br /&gt;&lt;br /&gt;Each context includes its base default with `isAnyIssueType=true`, even in a restricted context or when unset (`value: null`). Additional entries are explicitly stored issue-type overrides. Inherited defaults are not duplicated. Pagination is by context. Filtering by \&#123;@code issueTypeId\&#125; limits only the returned overrides; each returned context still includes its base default, even when none of its overrides match the filter.&lt;br /&gt;&lt;br /&gt;The value object on each entry is the same polymorphic `CustomFieldContextDefaultValueBean` exposed by the deprecated `GET /defaultValue` endpoint - its concrete subtype depends on the custom field's type (see the list of supported types on that endpoint).&lt;br /&gt;&lt;br /&gt;Only tenants enrolled in the early access program (EAP) can access this resource. See the &#91;EAP announcement&#93;(https:​//ecosystem.atlassian.net/browse/CHANGE-3082) for details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
context_id,
default_values
FROM jira.fields.custom_field_context_default_values
WHERE field_id = '{{ field_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND context_id = '{{ context_id }}'
AND issue_type_id = '{{ issue_type_id }}'
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

Updates default values for individual issue types in custom field contexts.&lt;br /&gt;&lt;br /&gt;Only tenants enrolled in the early access program (EAP) can access this resource. See the &#91;EAP announcement&#93;(https:​//ecosystem.atlassian.net/browse/CHANGE-3082) for details.&lt;br /&gt;&lt;br /&gt;Each entry targets either one issue type through \&#123;@code issueTypeId\&#125;, or the catch-all configuration through \&#123;@code isAnyIssueType=true\&#125;. Null clears the base default. Entries not included in the request are left unchanged. Each scope may appear only once. The operation defaults to \&#123;@code set\&#125;, which requires a value. \&#123;@code operation="removeOverride"\&#125; requires issueTypeId and allows the value property to be omitted or null. The contextId belongs on the enclosing update; setting contextId inside the value object is invalid.

```sql
UPDATE jira.fields.custom_field_context_default_values
SET 
default_values = '{{ default_values }}'
WHERE 
field_id = '{{ field_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set;
```
</TabItem>
</Tabs>
