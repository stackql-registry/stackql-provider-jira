--- 
title: workflow_scheme_project_associations
hide_title: false
hide_table_of_contents: false
keywords:
  - workflow_scheme_project_associations
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the workflow_scheme_project_associations resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>workflow_scheme_project_associations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workflow_scheme_project_associations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.workflow_scheme_project_associations" /></td></tr>
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
    <td><CopyableCode code="project_ids" /></td>
    <td><code>array</code></td>
    <td>The list of projects that use the workflow scheme. (wire: projectIds)</td>
</tr>
<tr>
    <td><CopyableCode code="workflow_scheme" /></td>
    <td><code>object</code></td>
    <td>The workflow scheme. (wire: workflowScheme)</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any team-managed or non-existent projects in the request are ignored and no errors are returned.&lt;br /&gt;&lt;br /&gt;If the project is associated with the `Default Workflow Scheme` no ID is returned. This is because the way the `Default Workflow Scheme` is stored means it has no ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#assign"><CopyableCode code="assign" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-projectId"><code>projectId</code></a></td>
    <td></td>
    <td>Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.&lt;br /&gt;&lt;br /&gt;Workflow schemes can only be assigned to classic projects.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#switch"><CopyableCode code="switch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Switches a workflow scheme for a project.&lt;br /&gt;&lt;br /&gt;Workflow schemes can only be assigned to classic projects.&lt;br /&gt;&lt;br /&gt;**Calculating required mappings:** If statuses from the current workflow scheme won't exist in the target workflow scheme, you must provide `mappingsByIssueTypeOverride` to specify how issues with those statuses should be migrated. Use &#91;the required workflow scheme mappings API&#93;(#api-rest-api-3-workflowscheme-update-mappings-post) to determine which statuses and issue types require mappings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of a project to return the workflow schemes for. To include multiple projects, provide an ampersand-Jim: oneseparated list. For example, `projectId=10000&projectId=10001`. (wire: projectId)</td>
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

Returns a list of the workflow schemes associated with a list of projects. Each returned workflow scheme includes a list of the requested projects associated with it. Any team-managed or non-existent projects in the request are ignored and no errors are returned.&lt;br /&gt;&lt;br /&gt;If the project is associated with the `Default Workflow Scheme` no ID is returned. This is because the way the `Default Workflow Scheme` is stored means it has no ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
project_ids,
workflow_scheme
FROM jira.workflows.workflow_scheme_project_associations
WHERE project_id = '{{ project_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="assign"
    values={[
        { label: 'assign', value: 'assign' },
        { label: 'switch', value: 'switch' }
    ]}
>
<TabItem value="assign">

Assigns a workflow scheme to a project. This operation is performed only when there are no issues in the project.&lt;br /&gt;&lt;br /&gt;Workflow schemes can only be assigned to classic projects.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.workflows.workflow_scheme_project_associations.assign 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectId": "{{ projectId }}", 
"workflowSchemeId": "{{ workflowSchemeId }}"
}'
;
```
</TabItem>
<TabItem value="switch">

Switches a workflow scheme for a project.&lt;br /&gt;&lt;br /&gt;Workflow schemes can only be assigned to classic projects.&lt;br /&gt;&lt;br /&gt;**Calculating required mappings:** If statuses from the current workflow scheme won't exist in the target workflow scheme, you must provide `mappingsByIssueTypeOverride` to specify how issues with those statuses should be migrated. Use &#91;the required workflow scheme mappings API&#93;(#api-rest-api-3-workflowscheme-update-mappings-post) to determine which statuses and issue types require mappings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.workflows.workflow_scheme_project_associations.switch 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"mappingsByIssueTypeOverride": "{{ mappingsByIssueTypeOverride }}", 
"projectId": "{{ projectId }}", 
"targetSchemeId": "{{ targetSchemeId }}"
}'
;
```
</TabItem>
</Tabs>
