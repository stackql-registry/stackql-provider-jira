--- 
title: components
hide_title: false
hide_table_of_contents: false
keywords:
  - components
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the components resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>components</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="components" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.components" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list_by_project', value: 'list_by_project' },
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
    <td><code>string</code></td>
    <td>The unique identifier for the component.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="lead_account_id" /></td>
    <td><code>string</code></td>
    <td>The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. (wire: leadAccountId)</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project the component is assigned to. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="lead_user_name" /></td>
    <td><code>string</code></td>
    <td>This property is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. (wire: leadUserName)</td>
</tr>
<tr>
    <td><CopyableCode code="ari" /></td>
    <td><code>string</code></td>
    <td>Compass component's ID. Can't be updated. Not required for creating a Project Component.</td>
</tr>
<tr>
    <td><CopyableCode code="assignee" /></td>
    <td><code>object</code></td>
    <td>The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component.</td>
</tr>
<tr>
    <td><CopyableCode code="assignee_type" /></td>
    <td><code>string</code></td>
    <td>The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.  *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.  *  `UNASSIGNED` an assignee is not set for issues created with this component.  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.  Default value: `PROJECT_DEFAULT`.   Optional when creating or updating a component. (PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, UNASSIGNED) (wire: assigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description for the component. Optional when creating or updating a component.</td>
</tr>
<tr>
    <td><CopyableCode code="is_assignee_type_valid" /></td>
    <td><code>boolean</code></td>
    <td>Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. (wire: isAssigneeTypeValid)</td>
</tr>
<tr>
    <td><CopyableCode code="lead" /></td>
    <td><code>object</code></td>
    <td>The user details for the component's lead user.</td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td>Compass component's metadata. Can't be updated. Not required for creating a Project Component.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>string</code></td>
    <td>The key of the project the component is assigned to. Required when creating a component. Can't be updated.</td>
</tr>
<tr>
    <td><CopyableCode code="real_assignee" /></td>
    <td><code>object</code></td>
    <td>The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. (wire: realAssignee)</td>
</tr>
<tr>
    <td><CopyableCode code="real_assignee_type" /></td>
    <td><code>string</code></td>
    <td>The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.  *  `PROJECT_DEFAULT` when none of the preceding cases are true. (PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, UNASSIGNED) (wire: realAssigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the component.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_project">

Details about a component with a count of the issues it contains.

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
    <td>The unique identifier for the component.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name for the component.</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Not used. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="assignee" /></td>
    <td><code>object</code></td>
    <td>The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned to issues created with this component.</td>
</tr>
<tr>
    <td><CopyableCode code="assignee_type" /></td>
    <td><code>string</code></td>
    <td>The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Takes the following values:   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.  *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.  *  `UNASSIGNED` an assignee is not set for issues created with this component.  *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in. (PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, UNASSIGNED) (wire: assigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description for the component.</td>
</tr>
<tr>
    <td><CopyableCode code="is_assignee_type_valid" /></td>
    <td><code>boolean</code></td>
    <td>Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. (wire: isAssigneeTypeValid)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Count of issues for the component. (wire: issueCount)</td>
</tr>
<tr>
    <td><CopyableCode code="lead" /></td>
    <td><code>object</code></td>
    <td>The user details for the component's lead user.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>string</code></td>
    <td>The key of the project to which the component is assigned.</td>
</tr>
<tr>
    <td><CopyableCode code="real_assignee" /></td>
    <td><code>object</code></td>
    <td>The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. (wire: realAssignee)</td>
</tr>
<tr>
    <td><CopyableCode code="real_assignee_type" /></td>
    <td><code>string</code></td>
    <td>The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.  *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.  *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.  *  `PROJECT_DEFAULT` when none of the preceding cases are true. (PROJECT_DEFAULT, COMPONENT_LEAD, PROJECT_LEAD, UNASSIGNED) (wire: realAssigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL for this count of the issues contained in the component.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A page of items.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ari" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a component.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for project containing the component.</td>
</tr>
<tr>
    <td><a href="#list_by_project"><CopyableCode code="list_by_project" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-component_source"><code>component_source</code></a>, <a href="#parameter-query"><code>query</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all components in a project. See the &#91;Get project components&#93;(#api-rest-api-3-project-projectIdOrKey-components-get) resource if you want to get a full list of versions without pagination.&lt;br /&gt;&lt;br /&gt;If your project uses Compass components, this API will return a list of Compass components that are linked to issues in that project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_ids_or_keys"><code>project_ids_or_keys</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-query"><code>query</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all components in a project, including global (Compass) components when applicable.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a component. Use components to provide containers for issues within a project. Use components to provide containers for issues within a project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which the component is created or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("") the component lead is removed.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the component or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-move_issues_to"><code>move_issues_to</code></a></td>
    <td>Deletes a component.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the component or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list_all_by_project"><CopyableCode code="list_all_by_project" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-componentSource"><code>componentSource</code></a></td>
    <td>Returns all components in a project. See the &#91;Get project components paginated&#93;(#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of components with pagination.&lt;br /&gt;&lt;br /&gt;If your project uses Compass components, this API will return a paginated list of Compass components that are linked to issues in that project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
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
    <td>The ID of the component.</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive).</td>
</tr>
<tr id="parameter-componentSource">
    <td><CopyableCode code="componentSource" /></td>
    <td><code>string</code></td>
    <td>The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`.</td>
</tr>
<tr id="parameter-component_source">
    <td><CopyableCode code="component_source" /></td>
    <td><code>string</code></td>
    <td>The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira components. Defaults to `jira`. (wire: componentSource)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-move_issues_to">
    <td><CopyableCode code="move_issues_to" /></td>
    <td><code>string</code></td>
    <td>The ID of the component to replace the deleted component. If this value is null no replacement is made. (wire: moveIssuesTo)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `description` Sorts by the component description.  *  `name` Sorts by component name. (wire: orderBy)</td>
</tr>
<tr id="parameter-project_ids_or_keys">
    <td><CopyableCode code="project_ids_or_keys" /></td>
    <td><code>array</code></td>
    <td>The project IDs and/or project keys (case sensitive). (wire: projectIdsOrKeys)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>Filter the results using a literal string. Components with a matching `name` or `description` are returned (case insensitive).</td>
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
        { label: 'list_by_project', value: 'list_by_project' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a component.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for project containing the component.

```sql
SELECT
id,
name,
lead_account_id,
project_id,
lead_user_name,
ari,
assignee,
assignee_type,
description,
is_assignee_type_valid,
lead,
metadata,
project,
real_assignee,
real_assignee_type,
self
FROM jira.projects.components
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list_by_project">

Returns a &#91;paginated&#93;(#pagination) list of all components in a project. See the &#91;Get project components&#93;(#api-rest-api-3-project-projectIdOrKey-components-get) resource if you want to get a full list of versions without pagination.&lt;br /&gt;&lt;br /&gt;If your project uses Compass components, this API will return a list of Compass components that are linked to issues in that project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
id,
name,
project_id,
assignee,
assignee_type,
description,
is_assignee_type_valid,
issue_count,
lead,
project,
real_assignee,
real_assignee_type,
self
FROM jira.projects.components
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND order_by = '{{ order_by }}'
AND component_source = '{{ component_source }}'
AND query = '{{ query }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of all components in a project, including global (Compass) components when applicable.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
id,
name,
ari,
description,
metadata,
self
FROM jira.projects.components
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_ids_or_keys = '{{ project_ids_or_keys }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND order_by = '{{ order_by }}'
AND query = '{{ query }}'
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

Creates a component. Use components to provide containers for issues within a project. Use components to provide containers for issues within a project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which the component is created or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.projects.components (
assignee_type,
description,
lead_account_id,
lead_user_name,
name,
project,
cloud_id
)
SELECT 
'{{ assignee_type }}',
'{{ description }}',
'{{ lead_account_id }}',
'{{ lead_user_name }}',
'{{ name }}',
'{{ project }}',
'{{ cloud_id }}'
RETURNING
id,
name,
lead_account_id,
project_id,
lead_user_name,
ari,
assignee,
assignee_type,
description,
is_assignee_type_valid,
lead,
metadata,
project,
real_assignee,
real_assignee_type,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: components
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the components resource.
    - name: assignee_type
      value: "{{ assignee_type }}"
      description: |
        The nominal user type used to determine the assignee for issues created with this component. See \`realAssigneeType\` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:
        *  \`PROJECT_LEAD\` the assignee to any issues created with this component is nominally the lead for the project the component is in.
        *  \`COMPONENT_LEAD\` the assignee to any issues created with this component is nominally the lead for the component.
        *  \`UNASSIGNED\` an assignee is not set for issues created with this component.
        *  \`PROJECT_DEFAULT\` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.
        Default value: \`PROJECT_DEFAULT\`.
        Optional when creating or updating a component.
      valid_values: ['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']
    - name: description
      value: "{{ description }}"
      description: |
        The description for the component. Optional when creating or updating a component.
    - name: lead_account_id
      value: "{{ lead_account_id }}"
      description: |
        The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
    - name: lead_user_name
      value: "{{ lead_user_name }}"
      description: |
        This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    - name: name
      value: "{{ name }}"
      description: |
        The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters.
    - name: project
      value: "{{ project }}"
      description: |
        The key of the project the component is assigned to. Required when creating a component. Can't be updated.
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

Updates a component. Any fields included in the request are overwritten. If `leadAccountId` is an empty string ("") the component lead is removed.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the component or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.projects.components
SET 
assignee_type = '{{ assignee_type }}',
description = '{{ description }}',
lead_account_id = '{{ lead_account_id }}',
lead_user_name = '{{ lead_user_name }}',
name = '{{ name }}',
project = '{{ project }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
lead_account_id,
project_id,
lead_user_name,
ari,
assignee,
assignee_type,
description,
is_assignee_type_valid,
lead,
metadata,
project,
real_assignee,
real_assignee_type,
self;
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

Deletes a component.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the component or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.projects.components
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND move_issues_to = '{{ move_issues_to }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_all_by_project"
    values={[
        { label: 'list_all_by_project', value: 'list_all_by_project' }
    ]}
>
<TabItem value="list_all_by_project">

Returns all components in a project. See the &#91;Get project components paginated&#93;(#api-rest-api-3-project-projectIdOrKey-component-get) resource if you want to get a full list of components with pagination.&lt;br /&gt;&lt;br /&gt;If your project uses Compass components, this API will return a paginated list of Compass components that are linked to issues in that project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
EXEC jira.projects.components.list_all_by_project 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@componentSource='{{ componentSource }}'
;
```
</TabItem>
</Tabs>
