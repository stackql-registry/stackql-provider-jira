--- 
title: workflow_scheme_project_usages
hide_title: false
hide_table_of_contents: false
keywords:
  - workflow_scheme_project_usages
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the workflow_scheme_project_usages resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>workflow_scheme_project_usages</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workflow_scheme_project_usages" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.workflow_scheme_project_usages" /></td></tr>
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
    <td><CopyableCode code="workflow_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The workflow scheme ID. (wire: workflowSchemeId)</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>object</code></td>
    <td>A page of projects.</td>
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
    <td><a href="#parameter-workflow_scheme_id"><code>workflow_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a page of projects using a given workflow scheme.</td>
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
<tr id="parameter-workflow_scheme_id">
    <td><CopyableCode code="workflow_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The workflow scheme ID (wire: workflowSchemeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of results to return. Must be an integer between 1 and 200. (wire: maxResults)</td>
</tr>
<tr id="parameter-next_page_token">
    <td><CopyableCode code="next_page_token" /></td>
    <td><code>string</code></td>
    <td>The cursor for pagination (wire: nextPageToken)</td>
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

Returns a page of projects using a given workflow scheme.

```sql
SELECT
workflow_scheme_id,
projects
FROM jira.workflows.workflow_scheme_project_usages
WHERE workflow_scheme_id = '{{ workflow_scheme_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
