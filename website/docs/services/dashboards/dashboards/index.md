--- 
title: dashboards
hide_title: false
hide_table_of_contents: false
keywords:
  - dashboards
  - dashboards
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the dashboards resource in the jira dashboards service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>dashboards</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="dashboards" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.dashboards.dashboards" /></td></tr>
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
    <td><code>string</code></td>
    <td>The ID of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="automatic_refresh_ms" /></td>
    <td><code>integer (int32)</code></td>
    <td>The automatic refresh interval for the dashboard in milliseconds. (wire: automaticRefreshMs)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="edit_permissions" /></td>
    <td><code>array</code></td>
    <td>The details of any edit share permissions for the dashboard. (wire: editPermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the dashboard is selected as a favorite by the user. (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_writable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current user has permission to edit the dashboard. (wire: isWritable)</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>object</code></td>
    <td>The owner of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="popularity" /></td>
    <td><code>integer (int64)</code></td>
    <td>The number of users who have this dashboard as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="rank" /></td>
    <td><code>integer (int32)</code></td>
    <td>The rank of this dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of these dashboard details.</td>
</tr>
<tr>
    <td><CopyableCode code="share_permissions" /></td>
    <td><code>array</code></td>
    <td>The details of any view share permissions for the dashboard. (wire: sharePermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="system_dashboard" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current dashboard is system dashboard. (wire: systemDashboard)</td>
</tr>
<tr>
    <td><CopyableCode code="view" /></td>
    <td><code>string</code></td>
    <td>The URL of the dashboard.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of a dashboard.

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
    <td>The ID of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="automatic_refresh_ms" /></td>
    <td><code>integer (int32)</code></td>
    <td>The automatic refresh interval for the dashboard in milliseconds. (wire: automaticRefreshMs)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="edit_permissions" /></td>
    <td><code>array</code></td>
    <td>The details of any edit share permissions for the dashboard. (wire: editPermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="is_favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the dashboard is selected as a favorite by the user. (wire: isFavourite)</td>
</tr>
<tr>
    <td><CopyableCode code="is_writable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current user has permission to edit the dashboard. (wire: isWritable)</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>object</code></td>
    <td>The owner of the dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="popularity" /></td>
    <td><code>integer (int64)</code></td>
    <td>The number of users who have this dashboard as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="rank" /></td>
    <td><code>integer (int32)</code></td>
    <td>The rank of this dashboard.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of these dashboard details.</td>
</tr>
<tr>
    <td><CopyableCode code="share_permissions" /></td>
    <td><code>array</code></td>
    <td>The details of any view share permissions for the dashboard. (wire: sharePermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="system_dashboard" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current dashboard is system dashboard. (wire: systemDashboard)</td>
</tr>
<tr>
    <td><CopyableCode code="view" /></td>
    <td><code>string</code></td>
    <td>The URL of the dashboard.</td>
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
    <td>Returns a dashboard.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.&lt;br /&gt;&lt;br /&gt;However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-dashboard_name"><code>dashboard_name</code></a>, <a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of dashboards. This operation is similar to &#91;Get dashboards&#93;(#api-rest-api-3-dashboard-get) except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The following dashboards that match the query parameters are returned:&lt;br /&gt;&lt;br /&gt; *  Dashboards owned by the user. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a group that the user is a member of. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a private project that the user can browse. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a public project.&lt;br /&gt; *  Dashboards shared with the public.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-edit_permissions"><code>edit_permissions</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-share_permissions"><code>share_permissions</code></a></td>
    <td><a href="#parameter-extend_admin_permissions"><code>extend_admin_permissions</code></a></td>
    <td>Creates a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-edit_permissions"><code>edit_permissions</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-share_permissions"><code>share_permissions</code></a></td>
    <td><a href="#parameter-extend_admin_permissions"><code>extend_admin_permissions</code></a></td>
    <td>Updates a dashboard, replacing all the dashboard details with those provided.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be updated must be owned by the user.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be deleted must be owned by the user.</td>
</tr>
<tr>
    <td><a href="#list_all"><CopyableCode code="list_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-filter"><code>filter</code></a>, <a href="#parameter-startAt"><code>startAt</code></a>, <a href="#parameter-maxResults"><code>maxResults</code></a></td>
    <td>Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#bulk_edit"><CopyableCode code="bulk_edit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-action"><code>action</code></a>, <a href="#parameter-entityIds"><code>entityIds</code></a></td>
    <td></td>
    <td>Bulk edit dashboards. Maximum number of dashboards to be edited at the same time is 100.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboards to be updated must be owned by the user, or the user must be an administrator.</td>
</tr>
<tr>
    <td><a href="#copy"><CopyableCode code="copy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-editPermissions"><code>editPermissions</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-sharePermissions"><code>sharePermissions</code></a></td>
    <td><a href="#parameter-extendAdminPermissions"><code>extendAdminPermissions</code></a></td>
    <td>Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be copied must be owned by or shared with the user.</td>
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
    <td></td>
</tr>
<tr id="parameter-account_id">
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>User account ID used to return dashboards with the matching `owner.accountId`. This parameter cannot be used with the `owner` parameter. (wire: accountId)</td>
</tr>
<tr id="parameter-dashboard_name">
    <td><CopyableCode code="dashboard_name" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with `name`. (wire: dashboardName)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about dashboard in the response. This parameter accepts a comma-separated list. Expand options include:   *  `description` Returns the description of the dashboard.  *  `owner` Returns the owner of the dashboard.  *  `viewUrl` Returns the URL that is used to view the dashboard.  *  `favourite` Returns `isFavourite`, an indicator of whether the user has set the dashboard as a favorite.  *  `favouritedCount` Returns `popularity`, a count of how many users have set this dashboard as a favorite.  *  `sharePermissions` Returns details of the share permissions defined for the dashboard.  *  `editPermissions` Returns details of the edit permissions defined for the dashboard.  *  `isWritable` Returns whether the current user has permission to edit the dashboard.</td>
</tr>
<tr id="parameter-extendAdminPermissions">
    <td><CopyableCode code="extendAdminPermissions" /></td>
    <td><code>boolean</code></td>
    <td>Whether admin level permissions are used. It should only be true if the user has *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)</td>
</tr>
<tr id="parameter-extend_admin_permissions">
    <td><CopyableCode code="extend_admin_permissions" /></td>
    <td><code>boolean</code></td>
    <td>Whether admin level permissions are used. It should only be true if the user has *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) (wire: extendAdminPermissions)</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>The filter applied to the list of dashboards. Valid values are:   *  `favourite` Returns dashboards the user has marked as favorite.  *  `my` Returns dashboards owned by the user.</td>
</tr>
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>Group ID used to return dashboards that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter. (wire: groupId)</td>
</tr>
<tr id="parameter-groupname">
    <td><CopyableCode code="groupname" /></td>
    <td><code>string</code></td>
    <td>As a group's name can change, use of `groupId` is recommended. Group name used to return dashboards that are shared with a group that matches `sharePermissions.group.name`. This parameter cannot be used with the `groupId` parameter.</td>
</tr>
<tr id="parameter-maxResults">
    <td><CopyableCode code="maxResults" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `description` Sorts by dashboard description. Note that this sort works independently of whether the expand to display the description field is in use.  *  `favourite_count` Sorts by dashboard popularity.  *  `id` Sorts by dashboard ID.  *  `is_favourite` Sorts by whether the dashboard is marked as a favorite.  *  `name` Sorts by dashboard name.  *  `owner` Sorts by dashboard owner name. (wire: orderBy)</td>
</tr>
<tr id="parameter-owner">
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>This parameter is deprecated because of privacy changes. Use `accountId` instead. See the &#91;migration guide&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return dashboards with the matching `owner.name`. This parameter cannot be used with the `accountId` parameter.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Project ID used to returns dashboards that are shared with a project that matches `sharePermissions.project.id`. (wire: projectId)</td>
</tr>
<tr id="parameter-startAt">
    <td><CopyableCode code="startAt" /></td>
    <td><code>integer (int32)</code></td>
    <td>The index of the first item to return in a page of results (page offset).</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status to filter by. It may be active, archived or deleted.</td>
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

Returns a dashboard.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.&lt;br /&gt;&lt;br /&gt;However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users.

```sql
SELECT
id,
name,
automatic_refresh_ms,
description,
edit_permissions,
is_favourite,
is_writable,
owner,
popularity,
rank,
self,
share_permissions,
system_dashboard,
view
FROM jira.dashboards.dashboards
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of dashboards. This operation is similar to &#91;Get dashboards&#93;(#api-rest-api-3-dashboard-get) except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The following dashboards that match the query parameters are returned:&lt;br /&gt;&lt;br /&gt; *  Dashboards owned by the user. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a group that the user is a member of. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a private project that the user can browse. Not returned for anonymous users.&lt;br /&gt; *  Dashboards shared with a public project.&lt;br /&gt; *  Dashboards shared with the public.

```sql
SELECT
id,
name,
automatic_refresh_ms,
description,
edit_permissions,
is_favourite,
is_writable,
owner,
popularity,
rank,
self,
share_permissions,
system_dashboard,
view
FROM jira.dashboards.dashboards
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND dashboard_name = '{{ dashboard_name }}'
AND account_id = '{{ account_id }}'
AND owner = '{{ owner }}'
AND groupname = '{{ groupname }}'
AND group_id = '{{ group_id }}'
AND project_id = '{{ project_id }}'
AND order_by = '{{ order_by }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND status = '{{ status }}'
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

Creates a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
INSERT INTO jira.dashboards.dashboards (
description,
edit_permissions,
name,
share_permissions,
cloud_id,
extend_admin_permissions
)
SELECT 
'{{ description }}',
'{{ edit_permissions }}' /* required */,
'{{ name }}' /* required */,
'{{ share_permissions }}' /* required */,
'{{ cloud_id }}',
'{{ extend_admin_permissions }}'
RETURNING
id,
name,
automatic_refresh_ms,
description,
edit_permissions,
is_favourite,
is_writable,
owner,
popularity,
rank,
self,
share_permissions,
system_dashboard,
view
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: dashboards
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the dashboards resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the dashboard.
    - name: edit_permissions
      description: |
        The edit permissions for the dashboard.
      value:
        - group:
            groupId: "{{ groupId }}"
            name: "{{ name }}"
            self: "{{ self }}"
          id: {{ id }}
          project:
            archived: {{ archived }}
            archivedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            archivedDate: "{{ archivedDate }}"
            assigneeType: "{{ assigneeType }}"
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            components:
              - ari: "{{ ari }}"
                assignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                assigneeType: "{{ assigneeType }}"
                description: "{{ description }}"
                id: "{{ id }}"
                isAssigneeTypeValid: {{ isAssigneeTypeValid }}
                lead:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                leadAccountId: "{{ leadAccountId }}"
                leadUserName: "{{ leadUserName }}"
                metadata: "{{ metadata }}"
                name: "{{ name }}"
                project: "{{ project }}"
                projectId: {{ projectId }}
                realAssignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                realAssigneeType: "{{ realAssigneeType }}"
                self: "{{ self }}"
            deleted: {{ deleted }}
            deletedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            deletedDate: "{{ deletedDate }}"
            description: "{{ description }}"
            email: "{{ email }}"
            favourite: {{ favourite }}
            id: "{{ id }}"
            insight:
              lastIssueUpdateTime: "{{ lastIssueUpdateTime }}"
              totalIssueCount: {{ totalIssueCount }}
            isPrivate: {{ isPrivate }}
            issueTypeHierarchy:
              baseLevelId: {{ baseLevelId }}
              levels:
                - aboveLevelId: {{ aboveLevelId }}
                  belowLevelId: {{ belowLevelId }}
                  externalUuid: "{{ externalUuid }}"
                  hierarchyLevelNumber: {{ hierarchyLevelNumber }}
                  id: {{ id }}
                  issueTypeIds: "{{ issueTypeIds }}"
                  level: {{ level }}
                  name: "{{ name }}"
                  projectConfigurationId: {{ projectConfigurationId }}
            issueTypes:
              - avatarId: {{ avatarId }}
                description: "{{ description }}"
                entityId: "{{ entityId }}"
                hierarchyLevel: {{ hierarchyLevel }}
                iconUrl: "{{ iconUrl }}"
                id: "{{ id }}"
                name: "{{ name }}"
                scope:
                  project:
                    avatarUrls: "{{ avatarUrls }}"
                    id: "{{ id }}"
                    key: "{{ key }}"
                    name: "{{ name }}"
                    projectCategory: "{{ projectCategory }}"
                    projectTypeKey: "{{ projectTypeKey }}"
                    self: "{{ self }}"
                    simplified: {{ simplified }}
                  type: "{{ type }}"
                self: "{{ self }}"
                subtask: {{ subtask }}
            key: "{{ key }}"
            landingPageInfo:
              attributes: "{{ attributes }}"
              boardId: {{ boardId }}
              boardName: "{{ boardName }}"
              projectKey: "{{ projectKey }}"
              projectType: "{{ projectType }}"
              queueCategory: "{{ queueCategory }}"
              queueId: {{ queueId }}
              queueName: "{{ queueName }}"
              simpleBoard: {{ simpleBoard }}
              simplified: {{ simplified }}
              url: "{{ url }}"
            lead:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            name: "{{ name }}"
            permissions:
              canEdit: {{ canEdit }}
            projectCategory:
              description: "{{ description }}"
              id: "{{ id }}"
              name: "{{ name }}"
              self: "{{ self }}"
            projectTypeKey: "{{ projectTypeKey }}"
            properties: "{{ properties }}"
            retentionTillDate: "{{ retentionTillDate }}"
            roles: "{{ roles }}"
            self: "{{ self }}"
            simplified: {{ simplified }}
            style: "{{ style }}"
            url: "{{ url }}"
            uuid: "{{ uuid }}"
            versions:
              - approvers: "{{ approvers }}"
                archived: {{ archived }}
                description: "{{ description }}"
                driver: "{{ driver }}"
                id: "{{ id }}"
                issuesStatusForFixVersion:
                  done: {{ done }}
                  inProgress: {{ inProgress }}
                  toDo: {{ toDo }}
                  unmapped: {{ unmapped }}
                moveUnfixedIssuesTo: "{{ moveUnfixedIssuesTo }}"
                name: "{{ name }}"
                operations: "{{ operations }}"
                overdue: {{ overdue }}
                project: "{{ project }}"
                projectId: {{ projectId }}
                releaseDate: "{{ releaseDate }}"
                released: {{ released }}
                self: "{{ self }}"
                startDate: "{{ startDate }}"
                userReleaseDate: "{{ userReleaseDate }}"
                userStartDate: "{{ userStartDate }}"
          role:
            actors:
              - actorGroup:
                  displayName: "{{ displayName }}"
                  groupId: "{{ groupId }}"
                  name: "{{ name }}"
                actorUser:
                  accountId: "{{ accountId }}"
                avatarUrl: "{{ avatarUrl }}"
                displayName: "{{ displayName }}"
                id: {{ id }}
                name: "{{ name }}"
                type: "{{ type }}"
            admin: {{ admin }}
            currentUserRole: {{ currentUserRole }}
            default: {{ default }}
            description: "{{ description }}"
            id: {{ id }}
            name: "{{ name }}"
            roleConfigurable: {{ roleConfigurable }}
            scope:
              project:
                avatarUrls:
                  16x16: "{{ 16x16 }}"
                  24x24: "{{ 24x24 }}"
                  32x32: "{{ 32x32 }}"
                  48x48: "{{ 48x48 }}"
                id: "{{ id }}"
                key: "{{ key }}"
                name: "{{ name }}"
                projectCategory:
                  description: "{{ description }}"
                  id: "{{ id }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                projectTypeKey: "{{ projectTypeKey }}"
                self: "{{ self }}"
                simplified: {{ simplified }}
              type: "{{ type }}"
            self: "{{ self }}"
            translatedName: "{{ translatedName }}"
          type: "{{ type }}"
          user:
            accountId: "{{ accountId }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
    - name: name
      value: "{{ name }}"
      description: |
        The name of the dashboard.
    - name: share_permissions
      description: |
        The share permissions for the dashboard.
      value:
        - group:
            groupId: "{{ groupId }}"
            name: "{{ name }}"
            self: "{{ self }}"
          id: {{ id }}
          project:
            archived: {{ archived }}
            archivedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            archivedDate: "{{ archivedDate }}"
            assigneeType: "{{ assigneeType }}"
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            components:
              - ari: "{{ ari }}"
                assignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                assigneeType: "{{ assigneeType }}"
                description: "{{ description }}"
                id: "{{ id }}"
                isAssigneeTypeValid: {{ isAssigneeTypeValid }}
                lead:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                leadAccountId: "{{ leadAccountId }}"
                leadUserName: "{{ leadUserName }}"
                metadata: "{{ metadata }}"
                name: "{{ name }}"
                project: "{{ project }}"
                projectId: {{ projectId }}
                realAssignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                realAssigneeType: "{{ realAssigneeType }}"
                self: "{{ self }}"
            deleted: {{ deleted }}
            deletedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            deletedDate: "{{ deletedDate }}"
            description: "{{ description }}"
            email: "{{ email }}"
            favourite: {{ favourite }}
            id: "{{ id }}"
            insight:
              lastIssueUpdateTime: "{{ lastIssueUpdateTime }}"
              totalIssueCount: {{ totalIssueCount }}
            isPrivate: {{ isPrivate }}
            issueTypeHierarchy:
              baseLevelId: {{ baseLevelId }}
              levels:
                - aboveLevelId: {{ aboveLevelId }}
                  belowLevelId: {{ belowLevelId }}
                  externalUuid: "{{ externalUuid }}"
                  hierarchyLevelNumber: {{ hierarchyLevelNumber }}
                  id: {{ id }}
                  issueTypeIds: "{{ issueTypeIds }}"
                  level: {{ level }}
                  name: "{{ name }}"
                  projectConfigurationId: {{ projectConfigurationId }}
            issueTypes:
              - avatarId: {{ avatarId }}
                description: "{{ description }}"
                entityId: "{{ entityId }}"
                hierarchyLevel: {{ hierarchyLevel }}
                iconUrl: "{{ iconUrl }}"
                id: "{{ id }}"
                name: "{{ name }}"
                scope:
                  project:
                    avatarUrls: "{{ avatarUrls }}"
                    id: "{{ id }}"
                    key: "{{ key }}"
                    name: "{{ name }}"
                    projectCategory: "{{ projectCategory }}"
                    projectTypeKey: "{{ projectTypeKey }}"
                    self: "{{ self }}"
                    simplified: {{ simplified }}
                  type: "{{ type }}"
                self: "{{ self }}"
                subtask: {{ subtask }}
            key: "{{ key }}"
            landingPageInfo:
              attributes: "{{ attributes }}"
              boardId: {{ boardId }}
              boardName: "{{ boardName }}"
              projectKey: "{{ projectKey }}"
              projectType: "{{ projectType }}"
              queueCategory: "{{ queueCategory }}"
              queueId: {{ queueId }}
              queueName: "{{ queueName }}"
              simpleBoard: {{ simpleBoard }}
              simplified: {{ simplified }}
              url: "{{ url }}"
            lead:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            name: "{{ name }}"
            permissions:
              canEdit: {{ canEdit }}
            projectCategory:
              description: "{{ description }}"
              id: "{{ id }}"
              name: "{{ name }}"
              self: "{{ self }}"
            projectTypeKey: "{{ projectTypeKey }}"
            properties: "{{ properties }}"
            retentionTillDate: "{{ retentionTillDate }}"
            roles: "{{ roles }}"
            self: "{{ self }}"
            simplified: {{ simplified }}
            style: "{{ style }}"
            url: "{{ url }}"
            uuid: "{{ uuid }}"
            versions:
              - approvers: "{{ approvers }}"
                archived: {{ archived }}
                description: "{{ description }}"
                driver: "{{ driver }}"
                id: "{{ id }}"
                issuesStatusForFixVersion:
                  done: {{ done }}
                  inProgress: {{ inProgress }}
                  toDo: {{ toDo }}
                  unmapped: {{ unmapped }}
                moveUnfixedIssuesTo: "{{ moveUnfixedIssuesTo }}"
                name: "{{ name }}"
                operations: "{{ operations }}"
                overdue: {{ overdue }}
                project: "{{ project }}"
                projectId: {{ projectId }}
                releaseDate: "{{ releaseDate }}"
                released: {{ released }}
                self: "{{ self }}"
                startDate: "{{ startDate }}"
                userReleaseDate: "{{ userReleaseDate }}"
                userStartDate: "{{ userStartDate }}"
          role:
            actors:
              - actorGroup:
                  displayName: "{{ displayName }}"
                  groupId: "{{ groupId }}"
                  name: "{{ name }}"
                actorUser:
                  accountId: "{{ accountId }}"
                avatarUrl: "{{ avatarUrl }}"
                displayName: "{{ displayName }}"
                id: {{ id }}
                name: "{{ name }}"
                type: "{{ type }}"
            admin: {{ admin }}
            currentUserRole: {{ currentUserRole }}
            default: {{ default }}
            description: "{{ description }}"
            id: {{ id }}
            name: "{{ name }}"
            roleConfigurable: {{ roleConfigurable }}
            scope:
              project:
                avatarUrls:
                  16x16: "{{ 16x16 }}"
                  24x24: "{{ 24x24 }}"
                  32x32: "{{ 32x32 }}"
                  48x48: "{{ 48x48 }}"
                id: "{{ id }}"
                key: "{{ key }}"
                name: "{{ name }}"
                projectCategory:
                  description: "{{ description }}"
                  id: "{{ id }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                projectTypeKey: "{{ projectTypeKey }}"
                self: "{{ self }}"
                simplified: {{ simplified }}
              type: "{{ type }}"
            self: "{{ self }}"
            translatedName: "{{ translatedName }}"
          type: "{{ type }}"
          user:
            accountId: "{{ accountId }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
    - name: extend_admin_permissions
      value: {{ extend_admin_permissions }}
      description: Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)
      description: Whether admin level permissions are used. It should only be true if the user has *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg)
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

Updates a dashboard, replacing all the dashboard details with those provided.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be updated must be owned by the user.

```sql
UPDATE jira.dashboards.dashboards
SET 
description = '{{ description }}',
edit_permissions = '{{ edit_permissions }}',
name = '{{ name }}',
share_permissions = '{{ share_permissions }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND edit_permissions = '{{ edit_permissions }}' --required
AND name = '{{ name }}' --required
AND share_permissions = '{{ share_permissions }}' --required
AND extend_admin_permissions = {{ extend_admin_permissions}}
RETURNING
id,
name,
automatic_refresh_ms,
description,
edit_permissions,
is_favourite,
is_writable,
owner,
popularity,
rank,
self,
share_permissions,
system_dashboard,
view;
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

Deletes a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be deleted must be owned by the user.

```sql
DELETE FROM jira.dashboards.dashboards
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
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
        { label: 'bulk_edit', value: 'bulk_edit' },
        { label: 'copy', value: 'copy' }
    ]}
>
<TabItem value="list_all">

Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
EXEC jira.dashboards.dashboards.list_all 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@filter='{{ filter }}', 
@startAt='{{ startAt }}', 
@maxResults='{{ maxResults }}'
;
```
</TabItem>
<TabItem value="bulk_edit">

Bulk edit dashboards. Maximum number of dashboards to be edited at the same time is 100.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboards to be updated must be owned by the user, or the user must be an administrator.

```sql
EXEC jira.dashboards.dashboards.bulk_edit 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"action": "{{ action }}", 
"changeOwnerDetails": "{{ changeOwnerDetails }}", 
"entityIds": "{{ entityIds }}", 
"extendAdminPermissions": {{ extendAdminPermissions }}, 
"permissionDetails": "{{ permissionDetails }}"
}'
;
```
</TabItem>
<TabItem value="copy">

Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None&lt;br /&gt;&lt;br /&gt;The dashboard to be copied must be owned by or shared with the user.

```sql
EXEC jira.dashboards.dashboards.copy 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@extendAdminPermissions={{ extendAdminPermissions }} 
@@json=
'{
"description": "{{ description }}", 
"editPermissions": "{{ editPermissions }}", 
"name": "{{ name }}", 
"sharePermissions": "{{ sharePermissions }}"
}'
;
```
</TabItem>
</Tabs>
