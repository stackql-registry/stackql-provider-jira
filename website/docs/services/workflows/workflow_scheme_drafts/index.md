--- 
title: workflow_scheme_drafts
hide_title: false
hide_table_of_contents: false
keywords:
  - workflow_scheme_drafts
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the workflow_scheme_drafts resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>workflow_scheme_drafts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workflow_scheme_drafts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.workflow_scheme_drafts" /></td></tr>
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
    <td></td>
    <td>Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is modified, then the changes in the draft are copied back to the active workflow scheme. See &#91;Configuring workflow schemes&#93;(https:​//confluence.atlassian.com/x/tohKLg) for more information.  &lt;br /&gt;Note that:&lt;br /&gt;&lt;br /&gt; *  Only active workflow schemes can have draft workflow schemes.&lt;br /&gt; *  An active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a draft is created. Note that an active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#publish"><CopyableCode code="publish" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-validateOnly"><code>validateOnly</code></a></td>
    <td>Publishes a draft workflow scheme.&lt;br /&gt;&lt;br /&gt;Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues with the original workflow status to the new workflow status.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the workflow scheme that the draft belongs to.</td>
</tr>
<tr id="parameter-validateOnly">
    <td><CopyableCode code="validateOnly" /></td>
    <td><code>boolean</code></td>
    <td>Whether the request only performs a validation.</td>
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

Returns the draft workflow scheme for an active workflow scheme. Draft workflow schemes allow changes to be made to the active workflow schemes: When an active workflow scheme is updated, a draft copy is created. The draft is modified, then the changes in the draft are copied back to the active workflow scheme. See &#91;Configuring workflow schemes&#93;(https:​//confluence.atlassian.com/x/tohKLg) for more information.  &lt;br /&gt;Note that:&lt;br /&gt;&lt;br /&gt; *  Only active workflow schemes can have draft workflow schemes.&lt;br /&gt; *  An active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

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
FROM jira.workflows.workflow_scheme_drafts
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Updates a draft workflow scheme. If a draft workflow scheme does not exist for the active workflow scheme, then a draft is created. Note that an active workflow scheme can only have one draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.workflows.workflow_scheme_drafts
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

Deletes a draft workflow scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.workflows.workflow_scheme_drafts
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="publish"
    values={[
        { label: 'publish', value: 'publish' }
    ]}
>
<TabItem value="publish">

Publishes a draft workflow scheme.&lt;br /&gt;&lt;br /&gt;Where the draft workflow includes new workflow statuses for an issue type, mappings are provided to update issues with the original workflow status to the new workflow status.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.workflows.workflow_scheme_drafts.publish 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@validateOnly={{ validateOnly }} 
@@json=
'{
"statusMappings": "{{ statusMappings }}"
}'
;
```
</TabItem>
</Tabs>
