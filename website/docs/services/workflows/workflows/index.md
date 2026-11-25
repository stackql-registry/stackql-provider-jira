--- 
title: workflows
hide_title: false
hide_table_of_contents: false
keywords:
  - workflows
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the workflows resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>workflows</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workflows" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.workflows" /></td></tr>
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

Details of a workflow.

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
    <td>The ID of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="task_id" /></td>
    <td><code>string</code></td>
    <td>If there is a current &#91;asynchronous task&#93;(#async-operations) operation for this workflow. (wire: taskId)</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string</code></td>
    <td>The creation date of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="is_editable" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the workflow can be edited. (wire: isEditable)</td>
</tr>
<tr>
    <td><CopyableCode code="looped_transition_container_layout" /></td>
    <td><code>object</code></td>
    <td>The starting point for the statuses in the workflow. (wire: loopedTransitionContainerLayout)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="start_point_layout" /></td>
    <td><code>object</code></td>
    <td>The starting point for the statuses in the workflow. (wire: startPointLayout)</td>
</tr>
<tr>
    <td><CopyableCode code="statuses" /></td>
    <td><code>array</code></td>
    <td>The statuses referenced in this workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string</code></td>
    <td>The last edited date of the workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>object</code></td>
    <td>The current version details of this workflow scheme.</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-query_string"><code>query_string</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-scope"><code>scope</code></a>, <a href="#parameter-is_active"><code>is_active</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of global and project workflows. If workflow names are specified in the query string, details of those workflows are returned. Otherwise, all workflows are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Create workflows and related statuses.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-entity_id"><code>entity_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a workflow.&lt;br /&gt;&lt;br /&gt;The workflow cannot be deleted if it is:&lt;br /&gt;&lt;br /&gt; *  an active workflow.&lt;br /&gt; *  a system workflow.&lt;br /&gt; *  associated with any workflow scheme.&lt;br /&gt; *  associated with any draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#get_history"><CopyableCode code="get_history" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a workflow and related statuses for a specified workflow id and version number.&lt;br /&gt;&lt;br /&gt;**Note:** Stored workflow data expires after 60 days. Additionally, no data from before the 30th of October 2025 is available.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#list_history"><CopyableCode code="list_history" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a list of workflow history entries for a specified workflow id.&lt;br /&gt;&lt;br /&gt;**Note:** Stored workflow data expires after 60 days. Additionally, no data from before the 30th of October 2025 is available.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#bulk_get"><CopyableCode code="bulk_get" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#copy"><CopyableCode code="copy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-workflowId"><code>workflowId</code></a>, <a href="#parameter-workflowName"><code>workflowName</code></a></td>
    <td></td>
    <td>Copies an existing workflow, and the statuses it uses, into a new workflow with the given name. The copy is created in the same scope as the workflow it is copied from. If no description is provided, the copy is created with an empty description.&lt;br /&gt;&lt;br /&gt;Copying a workflow requires permission both to read the workflow being copied and to create the copy, which is created in the same scope as its source.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to copy all, including project-scoped, workflows&lt;br /&gt; *  To copy a project-scoped workflow, either the *Edit workflows* project permission, or both the *View (read-only) workflow* and *Administer projects* project permissions</td>
</tr>
<tr>
    <td><a href="#validate_create"><CopyableCode code="validate_create" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-payload"><code>payload</code></a></td>
    <td></td>
    <td>Validate the payload for bulk create workflows.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#preview"><CopyableCode code="preview" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-projectId"><code>projectId</code></a></td>
    <td></td>
    <td>Returns a requested workflow within a given project. The response provides a read-only preview of the workflow, omitting full configuration details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions</td>
</tr>
<tr>
    <td><a href="#bulk_update"><CopyableCode code="bulk_update" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Update workflows and related statuses.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows</td>
</tr>
<tr>
    <td><a href="#validate_update"><CopyableCode code="validate_update" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-payload"><code>payload</code></a></td>
    <td></td>
    <td>Validate the payload for bulk update workflows.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows</td>
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
<tr id="parameter-entity_id">
    <td><CopyableCode code="entity_id" /></td>
    <td><code>string</code></td>
    <td>The entity ID of the workflow. (wire: entityId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `includeIntermediateWorkflows` Includes intermediate workflow versions that are sometimes created during workflow updates or migrations. By default, these are omitted from the response.</td>
</tr>
<tr id="parameter-is_active">
    <td><CopyableCode code="is_active" /></td>
    <td><code>boolean</code></td>
    <td>Filters active and inactive workflows. (wire: isActive)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `name` Sorts by workflow name.  *  `created` Sorts by create time.  *  `updated` Sorts by update time. (wire: orderBy)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project to filter the workflows by. Only workflows associated with the given project are returned. (wire: projectId)</td>
</tr>
<tr id="parameter-query_string">
    <td><CopyableCode code="query_string" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with workflow name. (wire: queryString)</td>
</tr>
<tr id="parameter-scope">
    <td><CopyableCode code="scope" /></td>
    <td><code>string</code></td>
    <td>The scope of the workflow. Global for company-managed projects and Project for team-managed projects.</td>
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

Returns a &#91;paginated&#93;(#pagination) list of global and project workflows. If workflow names are specified in the query string, details of those workflows are returned. Otherwise, all workflows are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows

```sql
SELECT
id,
name,
task_id,
created,
description,
is_editable,
looped_transition_container_layout,
scope,
start_point_layout,
statuses,
transitions,
updated,
version
FROM jira.workflows.workflows
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND expand = '{{ expand }}'
AND query_string = '{{ query_string }}'
AND order_by = '{{ order_by }}'
AND scope = '{{ scope }}'
AND is_active = '{{ is_active }}'
AND project_id = '{{ project_id }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Create workflows and related statuses.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows

```sql
INSERT INTO jira.workflows.workflows (
scope,
statuses,
workflows,
cloud_id
)
SELECT 
'{{ scope }}',
'{{ statuses }}',
'{{ workflows }}',
'{{ cloud_id }}'
RETURNING
statuses,
workflows
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: workflows
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the workflows resource.
    - name: scope
      description: |
        The scope of the workflow.
      value:
        project:
          id: "{{ id }}"
        type: "{{ type }}"
    - name: statuses
      description: |
        The statuses to associate with the workflows.
      value:
        - description: "{{ description }}"
          id: "{{ id }}"
          name: "{{ name }}"
          statusCategory: "{{ statusCategory }}"
          statusReference: "{{ statusReference }}"
    - name: workflows
      description: |
        The details of the workflows to create.
      value:
        - description: "{{ description }}"
          loopedTransitionContainerLayout:
            x: {{ x }}
            y: {{ y }}
          name: "{{ name }}"
          startPointLayout:
            x: {{ x }}
            y: {{ y }}
          statuses: "{{ statuses }}"
          transitions: "{{ transitions }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes a workflow.&lt;br /&gt;&lt;br /&gt;The workflow cannot be deleted if it is:&lt;br /&gt;&lt;br /&gt; *  an active workflow.&lt;br /&gt; *  a system workflow.&lt;br /&gt; *  associated with any workflow scheme.&lt;br /&gt; *  associated with any draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.workflows.workflows
WHERE entity_id = '{{ entity_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="get_history"
    values={[
        { label: 'get_history', value: 'get_history' },
        { label: 'list_history', value: 'list_history' },
        { label: 'bulk_get', value: 'bulk_get' },
        { label: 'copy', value: 'copy' },
        { label: 'validate_create', value: 'validate_create' },
        { label: 'preview', value: 'preview' },
        { label: 'bulk_update', value: 'bulk_update' },
        { label: 'validate_update', value: 'validate_update' }
    ]}
>
<TabItem value="get_history">

Returns a workflow and related statuses for a specified workflow id and version number.&lt;br /&gt;&lt;br /&gt;**Note:** Stored workflow data expires after 60 days. Additionally, no data from before the 30th of October 2025 is available.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows

```sql
EXEC jira.workflows.workflows.get_history 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"version": {{ version }}, 
"workflowId": "{{ workflowId }}"
}'
;
```
</TabItem>
<TabItem value="list_history">

Returns a list of workflow history entries for a specified workflow id.&lt;br /&gt;&lt;br /&gt;**Note:** Stored workflow data expires after 60 days. Additionally, no data from before the 30th of October 2025 is available.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows

```sql
EXEC jira.workflows.workflows.list_history 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}' 
@@json=
'{
"workflowId": "{{ workflowId }}"
}'
;
```
</TabItem>
<TabItem value="bulk_get">

Returns a list of workflows and related statuses by providing workflow names, workflow IDs, or project and issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflows&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions to access project-scoped workflows

```sql
EXEC jira.workflows.workflows.bulk_get 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectAndIssueTypes": "{{ projectAndIssueTypes }}", 
"workflowIds": "{{ workflowIds }}", 
"workflowNames": "{{ workflowNames }}"
}'
;
```
</TabItem>
<TabItem value="copy">

Copies an existing workflow, and the statuses it uses, into a new workflow with the given name. The copy is created in the same scope as the workflow it is copied from. If no description is provided, the copy is created with an empty description.&lt;br /&gt;&lt;br /&gt;Copying a workflow requires permission both to read the workflow being copied and to create the copy, which is created in the same scope as its source.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to copy all, including project-scoped, workflows&lt;br /&gt; *  To copy a project-scoped workflow, either the *Edit workflows* project permission, or both the *View (read-only) workflow* and *Administer projects* project permissions

```sql
EXEC jira.workflows.workflows.copy 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"description": "{{ description }}", 
"workflowId": "{{ workflowId }}", 
"workflowName": "{{ workflowName }}"
}'
;
```
</TabItem>
<TabItem value="validate_create">

Validate the payload for bulk create workflows.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows

```sql
EXEC jira.workflows.workflows.validate_create 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"payload": "{{ payload }}", 
"validationOptions": "{{ validationOptions }}"
}'
;
```
</TabItem>
<TabItem value="preview">

Returns a requested workflow within a given project. The response provides a read-only preview of the workflow, omitting full configuration details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  At least one of the *Administer projects* and *View (read-only) workflow* project permissions

```sql
EXEC jira.workflows.workflows.preview 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueTypeIds": "{{ issueTypeIds }}", 
"projectId": "{{ projectId }}", 
"workflowIds": "{{ workflowIds }}", 
"workflowNames": "{{ workflowNames }}"
}'
;
```
</TabItem>
<TabItem value="bulk_update">

Update workflows and related statuses.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows

```sql
EXEC jira.workflows.workflows.bulk_update 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"statuses": "{{ statuses }}", 
"workflows": "{{ workflows }}"
}'
;
```
</TabItem>
<TabItem value="validate_update">

Validate the payload for bulk update workflows.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to create all, including global-scoped, workflows&lt;br /&gt; *  *Administer projects* project permissions to create project-scoped workflows

```sql
EXEC jira.workflows.workflows.validate_update 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"payload": "{{ payload }}", 
"validationOptions": "{{ validationOptions }}"
}'
;
```
</TabItem>
</Tabs>
