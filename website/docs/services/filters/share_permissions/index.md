--- 
title: share_permissions
hide_title: false
hide_table_of_contents: false
keywords:
  - share_permissions
  - filters
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the share_permissions resource in the jira filters service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>share_permissions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="share_permissions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.filters.share_permissions" /></td></tr>
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
    <td>The unique identifier of the share permission.</td>
</tr>
<tr>
    <td><CopyableCode code="group" /></td>
    <td><code>object</code></td>
    <td>The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>The project that the filter is shared with. This is similar to the project object returned by &#91;Get project&#93;(#api-rest-api-3-project-projectIdOrKey-get) but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`.   For a request, specify the `id` for the project.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>object</code></td>
    <td>The project role that the filter is shared with.   For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of share permission:   *  `user` Shared with a user.  *  `group` Shared with a group. If set in a request, then specify `sharePermission.group` as well.  *  `project` Shared with a project. If set in a request, then specify `sharePermission.project` as well.  *  `projectRole` Share with a project role in a project. This value is not returned in responses. It is used in requests, where it needs to be specify with `projectId` and `projectRoleId`.  *  `global` Shared globally. If set in a request, no other `sharePermission` properties need to be specified.  *  `loggedin` Shared with all logged-in users. Note: This value is set in a request by specifying `authenticated` as the `type`.  *  `project-unknown` Shared with a project that the user does not have access to. Cannot be set in a request. (user, group, project, projectRole, global, loggedin, authenticated, project-unknown)</td>
</tr>
<tr>
    <td><CopyableCode code="user" /></td>
    <td><code>object</code></td>
    <td>The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of a share permission for the filter.

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
    <td>The unique identifier of the share permission.</td>
</tr>
<tr>
    <td><CopyableCode code="group" /></td>
    <td><code>object</code></td>
    <td>The group that the filter is shared with. For a request, specify the `groupId` or `name` property for the group. As a group's name can change, use of `groupId` is recommended.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>The project that the filter is shared with. This is similar to the project object returned by &#91;Get project&#93;(#api-rest-api-3-project-projectIdOrKey-get) but it contains a subset of the properties, which are: `self`, `id`, `key`, `assigneeType`, `name`, `roles`, `avatarUrls`, `projectType`, `simplified`.   For a request, specify the `id` for the project.</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>object</code></td>
    <td>The project role that the filter is shared with.   For a request, specify the `id` for the role. You must also specify the `project` object and `id` for the project that the role is in.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of share permission:   *  `user` Shared with a user.  *  `group` Shared with a group. If set in a request, then specify `sharePermission.group` as well.  *  `project` Shared with a project. If set in a request, then specify `sharePermission.project` as well.  *  `projectRole` Share with a project role in a project. This value is not returned in responses. It is used in requests, where it needs to be specify with `projectId` and `projectRoleId`.  *  `global` Shared globally. If set in a request, no other `sharePermission` properties need to be specified.  *  `loggedin` Shared with all logged-in users. Note: This value is set in a request by specifying `authenticated` as the `type`.  *  `project-unknown` Shared with a project that the user does not have access to. Cannot be set in a request. (user, group, project, projectRole, global, loggedin, authenticated, project-unknown)</td>
</tr>
<tr>
    <td><CopyableCode code="user" /></td>
    <td><code>object</code></td>
    <td>The user account ID that the filter is shared with. For a request, specify the `accountId` property for the user.</td>
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
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-permission_id"><code>permission_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, a share permission is only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, share permissions are only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.&lt;br /&gt;&lt;br /&gt;Be aware that this operation uses different objects for updating share permissions compared to &#91;Update filter&#93;(#api-rest-api-3-filter-id-put).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Share dashboards and filters* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and the user must own the filter.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-permission_id"><code>permission_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a share permission from a filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira and the user must own the filter.</td>
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
    <td>The ID of the filter.</td>
</tr>
<tr id="parameter-permission_id">
    <td><CopyableCode code="permission_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the share permission. (wire: permissionId)</td>
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

Returns a share permission for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, a share permission is only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
SELECT
id,
group,
project,
role,
type,
user
FROM jira.filters.share_permissions
WHERE id = '{{ id }}' -- required
AND permission_id = '{{ permission_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns the share permissions for a filter. A filter can be shared with groups, projects, all logged-in users, or the public. Sharing with all logged-in users or the public is known as a global share permission.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, share permissions are only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
SELECT
id,
group,
project,
role,
type,
user
FROM jira.filters.share_permissions
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Add a share permissions to a filter. If you add a global share permission (one for all logged-in users or the public) it will overwrite all share permissions for the filter.&lt;br /&gt;&lt;br /&gt;Be aware that this operation uses different objects for updating share permissions compared to &#91;Update filter&#93;(#api-rest-api-3-filter-id-put).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Share dashboards and filters* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and the user must own the filter.

```sql
INSERT INTO jira.filters.share_permissions (
account_id,
group_id,
groupname,
project_id,
project_role_id,
rights,
type,
id,
cloud_id
)
SELECT 
'{{ account_id }}',
'{{ group_id }}',
'{{ groupname }}',
'{{ project_id }}',
'{{ project_role_id }}',
{{ rights }},
'{{ type }}' /* required */,
'{{ id }}',
'{{ cloud_id }}'
RETURNING
id,
group,
project,
role,
type,
user
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: share_permissions
  props:
    - name: id
      value: "{{ id }}"
      description: Required parameter for the share_permissions resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the share_permissions resource.
    - name: account_id
      value: "{{ account_id }}"
      description: |
        The user account ID that the filter is shared with. For a request, specify the \`accountId\` property for the user.
    - name: group_id
      value: "{{ group_id }}"
      description: |
        The ID of the group, which uniquely identifies the group across all Atlassian products.For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. Cannot be provided with \`groupname\`.
    - name: groupname
      value: "{{ groupname }}"
      description: |
        The name of the group to share the filter with. Set \`type\` to \`group\`. Please note that the name of a group is mutable, to reliably identify a group use \`groupId\`.
    - name: project_id
      value: "{{ project_id }}"
      description: |
        The ID of the project to share the filter with. Set \`type\` to \`project\`.
    - name: project_role_id
      value: "{{ project_role_id }}"
      description: |
        The ID of the project role to share the filter with. Set \`type\` to \`projectRole\` and the \`projectId\` for the project that the role is in.
    - name: rights
      value: {{ rights }}
      description: |
        The rights for the share permission.
    - name: type
      value: "{{ type }}"
      description: |
        The type of the share permission.Specify the type as follows:
        *  \`user\` Share with a user.
        *  \`group\` Share with a group. Specify \`groupname\` as well.
        *  \`project\` Share with a project. Specify \`projectId\` as well.
        *  \`projectRole\` Share with a project role in a project. Specify \`projectId\` and \`projectRoleId\` as well.
        *  \`global\` Share globally, including anonymous users. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set.
        *  \`authenticated\` Share with all logged-in users. This shows as \`loggedin\` in the response. If set, this type overrides all existing share permissions and must be deleted before any non-global share permissions is set.
      valid_values: ['user', 'project', 'group', 'projectRole', 'global', 'authenticated']
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

Deletes a share permission from a filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira and the user must own the filter.

```sql
DELETE FROM jira.filters.share_permissions
WHERE id = '{{ id }}' --required
AND permission_id = '{{ permission_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
