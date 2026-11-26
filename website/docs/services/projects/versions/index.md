--- 
title: versions
hide_title: false
hide_table_of_contents: false
keywords:
  - versions
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the versions resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>versions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="versions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.versions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

Details about a project version.

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
    <td>The ID of the version.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="approvers" /></td>
    <td><code>array</code></td>
    <td>If the expand option `approvers` is used, returns a list containing the approvers for this version.</td>
</tr>
<tr>
    <td><CopyableCode code="archived" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is archived. Optional when creating or updating a version.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="driver" /></td>
    <td><code>string</code></td>
    <td>The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option `driver` is used, returns the Atlassian account ID of the driver.</td>
</tr>
<tr>
    <td><CopyableCode code="issues_status_for_fix_version" /></td>
    <td><code>object</code></td>
    <td>If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*. (wire: issuesStatusForFixVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="move_unfixed_issues_to" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version. (wire: moveUnfixedIssuesTo)</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>array</code></td>
    <td>If the expand option `operations` is used, returns the list of operations available for this version.</td>
</tr>
<tr>
    <td><CopyableCode code="overdue" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is overdue.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>string</code></td>
    <td>Deprecated. Use `projectId`.</td>
</tr>
<tr>
    <td><CopyableCode code="release_date" /></td>
    <td><code>string (date)</code></td>
    <td>The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. (wire: releaseDate)</td>
</tr>
<tr>
    <td><CopyableCode code="released" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the version.</td>
</tr>
<tr>
    <td><CopyableCode code="start_date" /></td>
    <td><code>string (date)</code></td>
    <td>The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. (wire: startDate)</td>
</tr>
<tr>
    <td><CopyableCode code="user_release_date" /></td>
    <td><code>string</code></td>
    <td>The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format. (wire: userReleaseDate)</td>
</tr>
<tr>
    <td><CopyableCode code="user_start_date" /></td>
    <td><code>string</code></td>
    <td>The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format. (wire: userStartDate)</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td>The ID of the version.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="approvers" /></td>
    <td><code>array</code></td>
    <td>If the expand option `approvers` is used, returns a list containing the approvers for this version.</td>
</tr>
<tr>
    <td><CopyableCode code="archived" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is archived. Optional when creating or updating a version.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes.</td>
</tr>
<tr>
    <td><CopyableCode code="driver" /></td>
    <td><code>string</code></td>
    <td>The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option `driver` is used, returns the Atlassian account ID of the driver.</td>
</tr>
<tr>
    <td><CopyableCode code="issues_status_for_fix_version" /></td>
    <td><code>object</code></td>
    <td>If the expand option `issuesstatus` is used, returns the count of issues in this version for each of the status categories *to do*, *in progress*, *done*, and *unmapped*. The *unmapped* property contains a count of issues with a status other than *to do*, *in progress*, and *done*. (wire: issuesStatusForFixVersion)</td>
</tr>
<tr>
    <td><CopyableCode code="move_unfixed_issues_to" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version. (wire: moveUnfixedIssuesTo)</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>array</code></td>
    <td>If the expand option `operations` is used, returns the list of operations available for this version.</td>
</tr>
<tr>
    <td><CopyableCode code="overdue" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is overdue.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>string</code></td>
    <td>Deprecated. Use `projectId`.</td>
</tr>
<tr>
    <td><CopyableCode code="release_date" /></td>
    <td><code>string (date)</code></td>
    <td>The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. (wire: releaseDate)</td>
</tr>
<tr>
    <td><CopyableCode code="released" /></td>
    <td><code>boolean</code></td>
    <td>Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the version.</td>
</tr>
<tr>
    <td><CopyableCode code="start_date" /></td>
    <td><code>string (date)</code></td>
    <td>The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version. (wire: startDate)</td>
</tr>
<tr>
    <td><CopyableCode code="user_release_date" /></td>
    <td><code>string</code></td>
    <td>The date on which work on this version is expected to finish, expressed in the instance's *Day/Month/Year Format* date format. (wire: userReleaseDate)</td>
</tr>
<tr>
    <td><CopyableCode code="user_start_date" /></td>
    <td><code>string</code></td>
    <td>The date on which work on this version is expected to start, expressed in the instance's *Day/Month/Year Format* date format. (wire: userStartDate)</td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all versions in a project. See the &#91;Get project versions&#93;(#api-rest-api-3-project-projectIdOrKey-versions-get) resource if you want to get a full list of versions without pagination.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the version.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project the version is added to.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-move_fix_issues_to"><code>move_fix_issues_to</code></a>, <a href="#parameter-move_affected_issues_to"><code>move_affected_issues_to</code></a></td>
    <td>Deletes a project version.&lt;br /&gt;&lt;br /&gt;Deprecated, use &#91; Delete and replace version&#93;(#api-rest-api-3-version-id-removeAndSwap-post) that supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and `affectedVersion` provided in this resource.&lt;br /&gt;&lt;br /&gt;Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that contain the deleted version are cleared.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#list_all"><CopyableCode code="list_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all versions in a project. The response is not paginated. Use &#91;Get project versions paginated&#93;(#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#merge"><CopyableCode code="merge" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-move_issues_to"><code>move_issues_to</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.&lt;br /&gt;&lt;br /&gt;Consider using &#91; Delete and replace version&#93;(#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#move"><CopyableCode code="move" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Modifies the version's sequence within the project, which affects the display order of the versions in Jira.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* project permission for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#remove_and_swap"><CopyableCode code="remove_and_swap" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a project version.&lt;br /&gt;&lt;br /&gt;Alternative versions can be provided to update issues that use the deleted version in `fixVersion`, `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version being deleted.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.</td>
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
<tr id="parameter-move_issues_to">
    <td><CopyableCode code="move_issues_to" /></td>
    <td><code>string</code></td>
    <td>The ID of the version to merge into.</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive).</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts `operations`, which returns actions that can be performed on the version.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-move_affected_issues_to">
    <td><CopyableCode code="move_affected_issues_to" /></td>
    <td><code>string</code></td>
    <td>The ID of the version to update `affectedVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted. (wire: moveAffectedIssuesTo)</td>
</tr>
<tr id="parameter-move_fix_issues_to">
    <td><CopyableCode code="move_fix_issues_to" /></td>
    <td><code>string</code></td>
    <td>The ID of the version to update `fixVersion` to when the field contains the deleted version. The replacement version must be in the same project as the version being deleted and cannot be the version being deleted. (wire: moveFixIssuesTo)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `description` Sorts by version description.  *  `name` Sorts by version name.  *  `releaseDate` Sorts by release date, starting with the oldest date. Versions with no release date are listed last.  *  `sequence` Sorts by the order of appearance in the user interface.  *  `startDate` Sorts by start date, starting with the oldest date. Versions with no start date are listed last. (wire: orderBy)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>Filter the results using a literal string. Versions with matching `name` or `description` are returned (case insensitive).</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>A list of status values used to filter the results by version status. This parameter accepts a comma-separated list. The status values are `released`, `unreleased`, and `archived`.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of all versions in a project. See the &#91;Get project versions&#93;(#api-rest-api-3-project-projectIdOrKey-versions-get) resource if you want to get a full list of versions without pagination.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
id,
name,
project_id,
approvers,
archived,
description,
driver,
issues_status_for_fix_version,
move_unfixed_issues_to,
operations,
overdue,
project,
release_date,
released,
self,
start_date,
user_release_date,
user_start_date
FROM jira.projects.versions
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND order_by = '{{ order_by }}'
AND query = '{{ query }}'
AND status = '{{ status }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="get">

Returns a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the version.

```sql
SELECT
id,
name,
project_id,
approvers,
archived,
description,
driver,
issues_status_for_fix_version,
move_unfixed_issues_to,
operations,
overdue,
project,
release_date,
released,
self,
start_date,
user_release_date,
user_start_date
FROM jira.projects.versions
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
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

Creates a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project the version is added to.

```sql
INSERT INTO jira.projects.versions (
archived,
description,
driver,
move_unfixed_issues_to,
name,
project,
project_id,
release_date,
released,
start_date,
cloud_id
)
SELECT 
{{ archived }},
'{{ description }}',
'{{ driver }}',
'{{ move_unfixed_issues_to }}',
'{{ name }}',
'{{ project }}',
{{ project_id }},
'{{ release_date }}',
{{ released }},
'{{ start_date }}',
'{{ cloud_id }}'
RETURNING
id,
name,
project_id,
approvers,
archived,
description,
driver,
issues_status_for_fix_version,
move_unfixed_issues_to,
operations,
overdue,
project,
release_date,
released,
self,
start_date,
user_release_date,
user_start_date
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: versions
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the versions resource.
    - name: archived
      value: {{ archived }}
      description: |
        Indicates that the version is archived. Optional when creating or updating a version.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the version. Optional when creating or updating a version. The maximum size is 16,384 bytes.
    - name: driver
      value: "{{ driver }}"
      description: |
        The Atlassian account ID of the version driver. Optional when creating or updating a version. If the expand option \`driver\` is used, returns the Atlassian account ID of the driver.
    - name: move_unfixed_issues_to
      value: "{{ move_unfixed_issues_to }}"
      description: |
        The URL of the self link to the version to which all unfixed issues are moved when a version is released. Not applicable when creating a version. Optional when updating a version.
    - name: name
      value: "{{ name }}"
      description: |
        The unique name of the version. Required when creating a version. Optional when updating a version. The maximum length is 255 characters.
    - name: project
      value: "{{ project }}"
      description: |
        Deprecated. Use \`projectId\`.
    - name: project_id
      value: {{ project_id }}
      description: |
        The ID of the project to which this version is attached. Required when creating a version. Not applicable when updating a version.
    - name: release_date
      value: "{{ release_date }}"
      description: |
        The release date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
    - name: released
      value: {{ released }}
      description: |
        Indicates that the version is released. If the version is released a request to release again is ignored. Not applicable when creating a version. Optional when updating a version.
    - name: start_date
      value: "{{ start_date }}"
      description: |
        The start date of the version. Expressed in ISO 8601 format (yyyy-mm-dd). Optional when creating or updating a version.
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

Updates a project version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.

```sql
UPDATE jira.projects.versions
SET 
archived = {{ archived }},
description = '{{ description }}',
driver = '{{ driver }}',
move_unfixed_issues_to = '{{ move_unfixed_issues_to }}',
name = '{{ name }}',
project = '{{ project }}',
project_id = {{ project_id }},
release_date = '{{ release_date }}',
released = {{ released }},
start_date = '{{ start_date }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
project_id,
approvers,
archived,
description,
driver,
issues_status_for_fix_version,
move_unfixed_issues_to,
operations,
overdue,
project,
release_date,
released,
self,
start_date,
user_release_date,
user_start_date;
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

Deletes a project version.&lt;br /&gt;&lt;br /&gt;Deprecated, use &#91; Delete and replace version&#93;(#api-rest-api-3-version-id-removeAndSwap-post) that supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and `affectedVersion` provided in this resource.&lt;br /&gt;&lt;br /&gt;Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that contain the deleted version are cleared.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.

```sql
DELETE FROM jira.projects.versions
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND move_fix_issues_to = '{{ move_fix_issues_to }}'
AND move_affected_issues_to = '{{ move_affected_issues_to }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_all"
    values={[
        { label: 'list_all', value: 'list_all' },
        { label: 'merge', value: 'merge' },
        { label: 'move', value: 'move' },
        { label: 'remove_and_swap', value: 'remove_and_swap' }
    ]}
>
<TabItem value="list_all">

Returns all versions in a project. The response is not paginated. Use &#91;Get project versions paginated&#93;(#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
EXEC jira.projects.versions.list_all 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}'
;
```
</TabItem>
<TabItem value="merge">

Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.&lt;br /&gt;&lt;br /&gt;Consider using &#91; Delete and replace version&#93;(#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.

```sql
EXEC jira.projects.versions.merge 
@id='{{ id }}' --required, 
@move_issues_to='{{ move_issues_to }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="move">

Modifies the version's sequence within the project, which affects the display order of the versions in Jira.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* project permission for the project that contains the version.

```sql
EXEC jira.projects.versions.move 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"after": "{{ after }}", 
"position": "{{ position }}"
}'
;
```
</TabItem>
<TabItem value="remove_and_swap">

Deletes a project version.&lt;br /&gt;&lt;br /&gt;Alternative versions can be provided to update issues that use the deleted version in `fixVersion`, `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version being deleted.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that contains the version.

```sql
EXEC jira.projects.versions.remove_and_swap 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"customFieldReplacementList": "{{ customFieldReplacementList }}", 
"moveAffectedIssuesTo": {{ moveAffectedIssuesTo }}, 
"moveFixIssuesTo": {{ moveFixIssuesTo }}
}'
;
```
</TabItem>
</Tabs>
