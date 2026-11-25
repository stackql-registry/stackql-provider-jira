--- 
title: policies
hide_title: false
hide_table_of_contents: false
keywords:
  - policies
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the policies resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>policies</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="policies" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.policies" /></td></tr>
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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="policy_name" /></td>
    <td><code>string</code></td>
    <td> (wire: policyName)</td>
</tr>
<tr>
    <td><CopyableCode code="applied_project_ids" /></td>
    <td><code>array</code></td>
    <td> (wire: appliedProjectIds)</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td> (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="policy_description" /></td>
    <td><code>string</code></td>
    <td> (wire: policyDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>integer (int64)</code></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-cursor"><code>cursor</code></a></td>
    <td>Returns a paginated summary of all known policies, including their names, descriptions, and which projects each policy is assigned to.&lt;br /&gt;&lt;br /&gt;Omit cursor for the first page and pass the returned \&#123;@code nextPageCursor\&#125; for subsequent pages. The legacy \&#123;@code startAt\&#125; and \&#123;@code total\&#125; fields are null because an offset and total are not available in cursor mode.</td>
</tr>
<tr>
    <td><a href="#apply"><CopyableCode code="apply" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-policyId"><code>policyId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Adds a policy to a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.&lt;br /&gt;&lt;br /&gt;Jira Admin only. Returns 200 with the successful and failed project results if at least one project succeeds, or 409 if none do.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-policyId"><code>policyId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes a policy from a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.&lt;br /&gt;&lt;br /&gt;Jira Admin only. Returns 200 with the successful and failed project results if at least one project succeeds, or 409 if none do.</td>
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
<tr id="parameter-policyId">
    <td><CopyableCode code="policyId" /></td>
    <td><code>string</code></td>
    <td>the policy ID to remove</td>
</tr>
<tr id="parameter-cursor">
    <td><CopyableCode code="cursor" /></td>
    <td><code>string</code></td>
    <td>opaque cursor returned by the previous page, absent for the first page</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>the maximum number of items to return per page (default 50; cursor max 50) (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>legacy 0-based offset (default 0); only 0 is accepted in cursor mode (wire: startAt)</td>
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

Returns a paginated summary of all known policies, including their names, descriptions, and which projects each policy is assigned to.&lt;br /&gt;&lt;br /&gt;Omit cursor for the first page and pass the returned \&#123;@code nextPageCursor\&#125; for subsequent pages. The legacy \&#123;@code startAt\&#125; and \&#123;@code total\&#125; fields are null because an offset and total are not available in cursor mode.

```sql
SELECT
id,
policy_name,
applied_project_ids,
is_default,
policy_description,
version
FROM jira.projects.policies
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND cursor = '{{ cursor }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="apply"
    values={[
        { label: 'apply', value: 'apply' },
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="apply">

Adds a policy to a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.&lt;br /&gt;&lt;br /&gt;Jira Admin only. Returns 200 with the successful and failed project results if at least one project succeeds, or 409 if none do.

```sql
EXEC jira.projects.policies.apply 
@policyId='{{ policyId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectIds": "{{ projectIds }}"
}'
;
```
</TabItem>
<TabItem value="remove">

Removes a policy from a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.&lt;br /&gt;&lt;br /&gt;Jira Admin only. Returns 200 with the successful and failed project results if at least one project succeeds, or 409 if none do.

```sql
EXEC jira.projects.policies.remove 
@policyId='{{ policyId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectIds": "{{ projectIds }}"
}'
;
```
</TabItem>
</Tabs>
