--- 
title: create_meta_fields
hide_title: false
hide_table_of_contents: false
keywords:
  - create_meta_fields
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the create_meta_fields resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>create_meta_fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="create_meta_fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.create_meta_fields" /></td></tr>
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

The metadata describing an issue field for createmeta.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td>The field id. (wire: fieldId)</td>
</tr>
<tr>
    <td><CopyableCode code="allowed_values" /></td>
    <td><code>array</code></td>
    <td>The list of values allowed in the field. (wire: allowedValues)</td>
</tr>
<tr>
    <td><CopyableCode code="auto_complete_url" /></td>
    <td><code>string</code></td>
    <td>The URL that can be used to automatically complete the field. (wire: autoCompleteUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="configuration" /></td>
    <td><code>object</code></td>
    <td>The configuration properties.</td>
</tr>
<tr>
    <td><CopyableCode code="default_value" /></td>
    <td><code></code></td>
    <td>The default value of the field. (wire: defaultValue)</td>
</tr>
<tr>
    <td><CopyableCode code="has_default_value" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field has a default value. (wire: hasDefaultValue)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>array</code></td>
    <td>The list of operations that can be performed on the field.</td>
</tr>
<tr>
    <td><CopyableCode code="required" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is required.</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The data type of the field.</td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-issue_type_id"><code>issue_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the requests in &#91; Create issue&#93;(#api-rest-api-3-issue-post) and &#91;Create issues&#93;(#api-rest-api-3-issue-bulk-post).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Create issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) in the requested projects.</td>
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
<tr id="parameter-issue_type_id">
    <td><CopyableCode code="issue_type_id" /></td>
    <td><code>string</code></td>
    <td>The issuetype ID. (wire: issueTypeId)</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the project. (wire: projectIdOrKey)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int32)</code></td>
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

Returns a page of field metadata for a specified project and issuetype id. Use the information to populate the requests in &#91; Create issue&#93;(#api-rest-api-3-issue-post) and &#91;Create issues&#93;(#api-rest-api-3-issue-bulk-post).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Create issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) in the requested projects.

```sql
SELECT
name,
field_id,
allowed_values,
auto_complete_url,
configuration,
default_value,
has_default_value,
key,
operations,
required,
schema
FROM jira.issues.create_meta_fields
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND issue_type_id = '{{ issue_type_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
