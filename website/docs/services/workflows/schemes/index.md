--- 
title: schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - schemes
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the schemes resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.schemes" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="default_workflow" /></td>
    <td><code>string</code></td>
    <td>The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*. (wire: defaultWorkflow)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="draft" /></td>
    <td><code>boolean</code></td>
    <td>Whether the workflow scheme is a draft or not.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_mappings" /></td>
    <td><code>object</code></td>
    <td>The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. (wire: issueTypeMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>object</code></td>
    <td>The issue types available in Jira. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="last_modified" /></td>
    <td><code>string</code></td>
    <td>The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. (wire: lastModified)</td>
</tr>
<tr>
    <td><CopyableCode code="last_modified_user" /></td>
    <td><code>object</code></td>
    <td>The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. (wire: lastModifiedUser)</td>
</tr>
<tr>
    <td><CopyableCode code="original_default_workflow" /></td>
    <td><code>string</code></td>
    <td>For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. (wire: originalDefaultWorkflow)</td>
</tr>
<tr>
    <td><CopyableCode code="original_issue_type_mappings" /></td>
    <td><code>object</code></td>
    <td>For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. (wire: originalIssueTypeMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="update_draft_if_needed" /></td>
    <td><code>boolean</code></td>
    <td>Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`. (wire: updateDraftIfNeeded)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about a workflow scheme.

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
    <td><code>integer (int64)</code></td>
    <td>The ID of the workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="default_workflow" /></td>
    <td><code>string</code></td>
    <td>The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If `defaultWorkflow` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*. (wire: defaultWorkflow)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the workflow scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="draft" /></td>
    <td><code>boolean</code></td>
    <td>Whether the workflow scheme is a draft or not.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_mappings" /></td>
    <td><code>object</code></td>
    <td>The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. (wire: issueTypeMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>object</code></td>
    <td>The issue types available in Jira. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="last_modified" /></td>
    <td><code>string</code></td>
    <td>The date-time that the draft workflow scheme was last modified. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. (wire: lastModified)</td>
</tr>
<tr>
    <td><CopyableCode code="last_modified_user" /></td>
    <td><code>object</code></td>
    <td>The user that last modified the draft workflow scheme. A modification is a change to the issue type-project mappings only. This property does not apply to non-draft workflows. (wire: lastModifiedUser)</td>
</tr>
<tr>
    <td><CopyableCode code="original_default_workflow" /></td>
    <td><code>string</code></td>
    <td>For draft workflow schemes, this property is the name of the default workflow for the original workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. (wire: originalDefaultWorkflow)</td>
</tr>
<tr>
    <td><CopyableCode code="original_issue_type_mappings" /></td>
    <td><code>object</code></td>
    <td>For draft workflow schemes, this property is the issue type to workflow mappings for the original workflow scheme, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme. (wire: originalIssueTypeMappings)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="update_draft_if_needed" /></td>
    <td><code>boolean</code></td>
    <td>Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:   *  Update an active workflow scheme with `updateDraftIfNeeded` set to `true`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.  *  Update an active workflow scheme with `updateDraftIfNeeded` set to `false`: An error is returned, as active workflow schemes cannot be updated.  *  Update an inactive workflow scheme with `updateDraftIfNeeded` set to `true`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.  Defaults to `false`. (wire: updateDraftIfNeeded)</td>
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
    <td><a href="#parameter-return_draft_if_exists"><code>return_draft_if_exists</code></a></td>
    <td>Returns a workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all workflow schemes, not including draft workflow schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at least one project).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#bulk_get"><CopyableCode code="bulk_get" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflow schemes&lt;br /&gt; *  *Administer projects* project permissions to access project-scoped workflow schemes</td>
</tr>
<tr>
    <td><a href="#update_scheme"><CopyableCode code="update_scheme" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-description"><code>description</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-version"><code>version</code></a></td>
    <td></td>
    <td>Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any changes made to a workflow scheme are immediately available. When changing the available statuses for issue types, an &#91;asynchronous task&#93;(#async) migrates the issues as defined in the provided mappings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to update all, including global-scoped, workflow schemes.&lt;br /&gt; *  *Administer projects* project permission to update project-scoped workflow schemes.</td>
</tr>
<tr>
    <td><a href="#get_required_mappings"><CopyableCode code="get_required_mappings" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-workflowsForIssueTypes"><code>workflowsForIssueTypes</code></a></td>
    <td></td>
    <td>Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow, or both.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* permission to update all, including global-scoped, workflow schemes.&lt;br /&gt; *  *Administer projects* project permission to update project-scoped workflow schemes.</td>
</tr>
<tr>
    <td><a href="#create_draft"><CopyableCode code="create_draft" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the active workflow scheme that the draft is created from.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-return_draft_if_exists">
    <td><CopyableCode code="return_draft_if_exists" /></td>
    <td><code>boolean</code></td>
    <td>Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have a draft, then the workflow scheme is returned. (wire: returnDraftIfExists)</td>
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
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
default_workflow,
description,
draft,
issue_type_mappings,
issue_types,
last_modified,
last_modified_user,
original_default_workflow,
original_issue_type_mappings,
self,
update_draft_if_needed
FROM jira.workflows.schemes
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND return_draft_if_exists = '{{ return_draft_if_exists }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of all workflow schemes, not including draft workflow schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
default_workflow,
description,
draft,
issue_type_mappings,
issue_types,
last_modified,
last_modified_user,
original_default_workflow,
original_issue_type_mappings,
self,
update_draft_if_needed
FROM jira.workflows.schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
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

Creates a workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.workflows.schemes (
default_workflow,
description,
issue_type_mappings,
name,
update_draft_if_needed,
cloud_id
)
SELECT 
'{{ default_workflow }}',
'{{ description }}',
'{{ issue_type_mappings }}',
'{{ name }}',
{{ update_draft_if_needed }},
'{{ cloud_id }}'
RETURNING
id,
name,
default_workflow,
description,
draft,
issue_type_mappings,
issue_types,
last_modified,
last_modified_user,
original_default_workflow,
original_issue_type_mappings,
self,
update_draft_if_needed
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the schemes resource.
    - name: default_workflow
      value: "{{ default_workflow }}"
      description: |
        The name of the default workflow for the workflow scheme. The default workflow has *All Unassigned Issue Types* assigned to it in Jira. If \`defaultWorkflow\` is not specified when creating a workflow scheme, it is set to *Jira Workflow (jira)*.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the workflow scheme.
    - name: issue_type_mappings
      value: "{{ issue_type_mappings }}"
      description: |
        The issue type to workflow mappings, where each mapping is an issue type ID and workflow name pair. Note that an issue type can only be mapped to one workflow in a workflow scheme.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the workflow scheme. The name must be unique. The maximum length is 255 characters. Required when creating a workflow scheme.
    - name: update_draft_if_needed
      value: {{ update_draft_if_needed }}
      description: |
        Whether to create or update a draft workflow scheme when updating an active workflow scheme. An active workflow scheme is a workflow scheme that is used by at least one project. The following examples show how this property works:
        *  Update an active workflow scheme with \`updateDraftIfNeeded\` set to \`true\`: If a draft workflow scheme exists, it is updated. Otherwise, a draft workflow scheme is created.
        *  Update an active workflow scheme with \`updateDraftIfNeeded\` set to \`false\`: An error is returned, as active workflow schemes cannot be updated.
        *  Update an inactive workflow scheme with \`updateDraftIfNeeded\` set to \`true\`: The workflow scheme is updated, as inactive workflow schemes do not require drafts to update.
        Defaults to \`false\`.
`}</CodeBlock>

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

Updates a company-manged project workflow scheme, including the name, default workflow, issue type to project mappings, and more. If the workflow scheme is active (that is, being used by at least one project), then a draft workflow scheme is created or updated instead, provided that `updateDraftIfNeeded` is set to `true`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.workflows.schemes
SET 
default_workflow = '{{ default_workflow }}',
description = '{{ description }}',
issue_type_mappings = '{{ issue_type_mappings }}',
name = '{{ name }}',
update_draft_if_needed = {{ update_draft_if_needed }}
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
default_workflow,
description,
draft,
issue_type_mappings,
issue_types,
last_modified,
last_modified_user,
original_default_workflow,
original_issue_type_mappings,
self,
update_draft_if_needed;
```
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

Deletes a workflow scheme. Note that a workflow scheme cannot be deleted if it is active (that is, being used by at least one project).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.workflows.schemes
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="bulk_get"
    values={[
        { label: 'bulk_get', value: 'bulk_get' },
        { label: 'update_scheme', value: 'update_scheme' },
        { label: 'get_required_mappings', value: 'get_required_mappings' },
        { label: 'create_draft', value: 'create_draft' }
    ]}
>
<TabItem value="bulk_get">

Returns a list of workflow schemes by providing workflow scheme IDs or project IDs.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* global permission to access all, including project-scoped, workflow schemes&lt;br /&gt; *  *Administer projects* project permissions to access project-scoped workflow schemes

```sql
EXEC jira.workflows.schemes.bulk_get 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectIds": "{{ projectIds }}", 
"workflowSchemeIds": "{{ workflowSchemeIds }}"
}'
;
```
</TabItem>
<TabItem value="update_scheme">

Updates company-managed and team-managed project workflow schemes. This API doesn't have a concept of draft, so any changes made to a workflow scheme are immediately available. When changing the available statuses for issue types, an &#91;asynchronous task&#93;(#async) migrates the issues as defined in the provided mappings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* project permission to update all, including global-scoped, workflow schemes.&lt;br /&gt; *  *Administer projects* project permission to update project-scoped workflow schemes.

```sql
EXEC jira.workflows.schemes.update_scheme 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"defaultWorkflowId": "{{ defaultWorkflowId }}", 
"description": "{{ description }}", 
"id": "{{ id }}", 
"name": "{{ name }}", 
"statusMappingsByIssueTypeOverride": "{{ statusMappingsByIssueTypeOverride }}", 
"statusMappingsByWorkflows": "{{ statusMappingsByWorkflows }}", 
"version": "{{ version }}", 
"workflowsForIssueTypes": "{{ workflowsForIssueTypes }}"
}'
;
```
</TabItem>
<TabItem value="get_required_mappings">

Gets the required status mappings for the desired changes to a workflow scheme. The results are provided per issue type and workflow. When updating a workflow scheme, status mappings can be provided per issue type, per workflow, or both.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* permission to update all, including global-scoped, workflow schemes.&lt;br /&gt; *  *Administer projects* project permission to update project-scoped workflow schemes.

```sql
EXEC jira.workflows.schemes.get_required_mappings 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"defaultWorkflowId": "{{ defaultWorkflowId }}", 
"id": "{{ id }}", 
"workflowsForIssueTypes": "{{ workflowsForIssueTypes }}"
}'
;
```
</TabItem>
<TabItem value="create_draft">

Create a draft workflow scheme from an active workflow scheme, by copying the active workflow scheme. Note that an active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.workflows.schemes.create_draft 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
