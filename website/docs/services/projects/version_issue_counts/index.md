--- 
title: version_issue_counts
hide_title: false
hide_table_of_contents: false
keywords:
  - version_issue_counts
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the version_issue_counts resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>version_issue_counts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="version_issue_counts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.version_issue_counts" /></td></tr>
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

Returned if the request is successful.

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
    <td><CopyableCode code="custom_field_usage" /></td>
    <td><code>array</code></td>
    <td>List of custom fields using the version. (wire: customFieldUsage)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_count_with_custom_fields_showing_version" /></td>
    <td><code>integer (int64)</code></td>
    <td>Count of issues where a version custom field is set to the version. (wire: issueCountWithCustomFieldsShowingVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="issues_affected_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Count of issues where the `affectedVersion` is set to the version. (wire: issuesAffectedCount)</td>
</tr>
<tr>
    <td><CopyableCode code="issues_fixed_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Count of issues where the `fixVersion` is set to the version. (wire: issuesFixedCount)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of these count details.</td>
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
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the following counts for a version:&lt;br /&gt;&lt;br /&gt; *  Number of issues where the `fixVersion` is set to the version.&lt;br /&gt; *  Number of issues where the `affectedVersion` is set to the version.&lt;br /&gt; *  Number of issues where a version custom field is set to the version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* project permission for the project that contains the version.</td>
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
    <td>The ID of the version.</td>
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

Returns the following counts for a version:&lt;br /&gt;&lt;br /&gt; *  Number of issues where the `fixVersion` is set to the version.&lt;br /&gt; *  Number of issues where the `affectedVersion` is set to the version.&lt;br /&gt; *  Number of issues where a version custom field is set to the version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* project permission for the project that contains the version.

```sql
SELECT
custom_field_usage,
issue_count_with_custom_fields_showing_version,
issues_affected_count,
issues_fixed_count,
self
FROM jira.projects.version_issue_counts
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
