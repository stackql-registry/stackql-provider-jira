--- 
title: permission_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - permission_schemes
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the permission_schemes resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>permission_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="permission_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.permission_schemes" /></td></tr>
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
    <td>The ID of the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the permission scheme. Must be unique.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A description for the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>array</code></td>
    <td>The permission scheme to create or update. See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the permission scheme.</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the permission scheme. Must be unique.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A description for the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>array</code></td>
    <td>The permission scheme to create or update. See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the permission scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the permission scheme.</td>
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
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all permission schemes.&lt;br /&gt;&lt;br /&gt;### About permission schemes and grants ###&lt;br /&gt;&lt;br /&gt;A permission scheme is a collection of permission grants. A permission grant consists of a `holder` and a `permission`.&lt;br /&gt;&lt;br /&gt;#### Holder object ####&lt;br /&gt;&lt;br /&gt;The `holder` object contains information about the user or group being granted the permission. For example, the *Administer projects* permission is granted to a group named *Teams in space administrators*. In this case, the type is `"type": "group"`, and the parameter is the group name, `"parameter": "Teams in space administrators"` and the value is group ID, `"value": "ca85fac0-d974-40ca-a615-7af99c48d24f"`.&lt;br /&gt;&lt;br /&gt;The `holder` object is defined by the following properties:&lt;br /&gt;&lt;br /&gt; *  `type` Identifies the user or group (see the list of types below).&lt;br /&gt; *  `parameter` As a group's name can change, use of `value` is recommended. The value of this property depends on the `type`. For example, if the `type` is a group, then you need to specify the group name.&lt;br /&gt; *  `value` The value of this property depends on the `type`. If the `type` is a group, then you need to specify the group ID. For other `type` it has the same value as `parameter`&lt;br /&gt;&lt;br /&gt;The following `types` are available. The expected values for `parameter` and `value` are given in parentheses (some types may not have a `parameter` or `value`):&lt;br /&gt;&lt;br /&gt; *  `anyone` Grant for anonymous users.&lt;br /&gt; *  `applicationRole` Grant for users with access to the specified application (application name, application name). See &#91;Update product access settings&#93;(https:​//confluence.atlassian.com/x/3YxjL) for more information.&lt;br /&gt; *  `assignee` Grant for the user currently assigned to an issue.&lt;br /&gt; *  `group` Grant for the specified group (`parameter` : group name, `value` : group ID).&lt;br /&gt; *  `groupCustomField` Grant for a user in the group selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).&lt;br /&gt; *  `projectLead` Grant for a project lead.&lt;br /&gt; *  `projectRole` Grant for the specified project role (`parameter` :project role ID, `value` : project role ID).&lt;br /&gt; *  `reporter` Grant for the user who reported the issue.&lt;br /&gt; *  `sd.customer.portal.only` Jira Service Desk only. Grants customers permission to access the customer portal but not Jira. See &#91;Customizing Jira Service Desk permissions&#93;(https:​//confluence.atlassian.com/x/24dKLg) for more information.&lt;br /&gt; *  `user` Grant for the specified user (`parameter` : user ID - historically this was the userkey but that is deprecated and the account ID should be used, `value` : user ID).&lt;br /&gt; *  `userCustomField` Grant for a user selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).&lt;br /&gt;&lt;br /&gt;#### Built-in permissions ####&lt;br /&gt;&lt;br /&gt;The &#91;built-in Jira permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) are listed below. Apps can also define custom permissions. See the &#91;project permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and &#91;global permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information.&lt;br /&gt;&lt;br /&gt;**Administration permissions**&lt;br /&gt;&lt;br /&gt; *  `ADMINISTER_PROJECTS`&lt;br /&gt; *  `EDIT_WORKFLOW`&lt;br /&gt; *  `EDIT_ISSUE_LAYOUT`&lt;br /&gt;&lt;br /&gt;**Project permissions**&lt;br /&gt;&lt;br /&gt; *  `BROWSE_PROJECTS`&lt;br /&gt; *  `MANAGE_SPRINTS_PERMISSION` (Jira Software only)&lt;br /&gt; *  `SERVICEDESK_AGENT` (Jira Service Desk only)&lt;br /&gt; *  `VIEW_DEV_TOOLS` (Jira Software only)&lt;br /&gt; *  `VIEW_READONLY_WORKFLOW`&lt;br /&gt;&lt;br /&gt;**Issue permissions**&lt;br /&gt;&lt;br /&gt; *  `ASSIGNABLE_USER`&lt;br /&gt; *  `ASSIGN_ISSUES`&lt;br /&gt; *  `CLOSE_ISSUES`&lt;br /&gt; *  `CREATE_ISSUES`&lt;br /&gt; *  `DELETE_ISSUES`&lt;br /&gt; *  `EDIT_ISSUES`&lt;br /&gt; *  `LINK_ISSUES`&lt;br /&gt; *  `MODIFY_REPORTER`&lt;br /&gt; *  `MOVE_ISSUES`&lt;br /&gt; *  `RESOLVE_ISSUES`&lt;br /&gt; *  `SCHEDULE_ISSUES`&lt;br /&gt; *  `SET_ISSUE_SECURITY`&lt;br /&gt; *  `TRANSITION_ISSUES`&lt;br /&gt;&lt;br /&gt;**Voters and watchers permissions**&lt;br /&gt;&lt;br /&gt; *  `MANAGE_WATCHERS`&lt;br /&gt; *  `VIEW_VOTERS_AND_WATCHERS`&lt;br /&gt;&lt;br /&gt;**Comments permissions**&lt;br /&gt;&lt;br /&gt; *  `ADD_COMMENTS`&lt;br /&gt; *  `DELETE_ALL_COMMENTS`&lt;br /&gt; *  `DELETE_OWN_COMMENTS`&lt;br /&gt; *  `EDIT_ALL_COMMENTS`&lt;br /&gt; *  `EDIT_OWN_COMMENTS`&lt;br /&gt;&lt;br /&gt;**Attachments permissions**&lt;br /&gt;&lt;br /&gt; *  `CREATE_ATTACHMENTS`&lt;br /&gt; *  `DELETE_ALL_ATTACHMENTS`&lt;br /&gt; *  `DELETE_OWN_ATTACHMENTS`&lt;br /&gt;&lt;br /&gt;**Time tracking permissions**&lt;br /&gt;&lt;br /&gt; *  `DELETE_ALL_WORKLOGS`&lt;br /&gt; *  `DELETE_OWN_WORKLOGS`&lt;br /&gt; *  `EDIT_ALL_WORKLOGS`&lt;br /&gt; *  `EDIT_OWN_WORKLOGS`&lt;br /&gt; *  `WORK_ON_ISSUES`&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Creates a new permission scheme. You can create a permission scheme with or without defining a set of permission grants.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Updates a permission scheme. Below are some important things to note when using this resource:&lt;br /&gt;&lt;br /&gt; *  If a permissions list is present in the request, then it is set in the permission scheme, overwriting *all existing* grants.&lt;br /&gt; *  If you want to update only the name and description, then do not send a permissions list in the request.&lt;br /&gt; *  Sending an empty list will remove all permission grants from the permission scheme.&lt;br /&gt;&lt;br /&gt;If you want to add or delete a permission grant instead of updating the whole list, see &#91;Create permission grant&#93;(#api-rest-api-3-permissionscheme-schemeId-permission-post) or &#91;Delete permission scheme entity&#93;(#api-rest-api-3-permissionscheme-schemeId-permission-permissionId-delete).&lt;br /&gt;&lt;br /&gt;See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the permission scheme being deleted. (wire: schemeId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission.</td>
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

Returns a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
name,
description,
permissions,
scope,
self
FROM jira.permissions.permission_schemes
WHERE scheme_id = '{{ scheme_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns all permission schemes.&lt;br /&gt;&lt;br /&gt;### About permission schemes and grants ###&lt;br /&gt;&lt;br /&gt;A permission scheme is a collection of permission grants. A permission grant consists of a `holder` and a `permission`.&lt;br /&gt;&lt;br /&gt;#### Holder object ####&lt;br /&gt;&lt;br /&gt;The `holder` object contains information about the user or group being granted the permission. For example, the *Administer projects* permission is granted to a group named *Teams in space administrators*. In this case, the type is `"type": "group"`, and the parameter is the group name, `"parameter": "Teams in space administrators"` and the value is group ID, `"value": "ca85fac0-d974-40ca-a615-7af99c48d24f"`.&lt;br /&gt;&lt;br /&gt;The `holder` object is defined by the following properties:&lt;br /&gt;&lt;br /&gt; *  `type` Identifies the user or group (see the list of types below).&lt;br /&gt; *  `parameter` As a group's name can change, use of `value` is recommended. The value of this property depends on the `type`. For example, if the `type` is a group, then you need to specify the group name.&lt;br /&gt; *  `value` The value of this property depends on the `type`. If the `type` is a group, then you need to specify the group ID. For other `type` it has the same value as `parameter`&lt;br /&gt;&lt;br /&gt;The following `types` are available. The expected values for `parameter` and `value` are given in parentheses (some types may not have a `parameter` or `value`):&lt;br /&gt;&lt;br /&gt; *  `anyone` Grant for anonymous users.&lt;br /&gt; *  `applicationRole` Grant for users with access to the specified application (application name, application name). See &#91;Update product access settings&#93;(https:​//confluence.atlassian.com/x/3YxjL) for more information.&lt;br /&gt; *  `assignee` Grant for the user currently assigned to an issue.&lt;br /&gt; *  `group` Grant for the specified group (`parameter` : group name, `value` : group ID).&lt;br /&gt; *  `groupCustomField` Grant for a user in the group selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).&lt;br /&gt; *  `projectLead` Grant for a project lead.&lt;br /&gt; *  `projectRole` Grant for the specified project role (`parameter` :project role ID, `value` : project role ID).&lt;br /&gt; *  `reporter` Grant for the user who reported the issue.&lt;br /&gt; *  `sd.customer.portal.only` Jira Service Desk only. Grants customers permission to access the customer portal but not Jira. See &#91;Customizing Jira Service Desk permissions&#93;(https:​//confluence.atlassian.com/x/24dKLg) for more information.&lt;br /&gt; *  `user` Grant for the specified user (`parameter` : user ID - historically this was the userkey but that is deprecated and the account ID should be used, `value` : user ID).&lt;br /&gt; *  `userCustomField` Grant for a user selected in the specified custom field (`parameter` : custom field ID, `value` : custom field ID).&lt;br /&gt;&lt;br /&gt;#### Built-in permissions ####&lt;br /&gt;&lt;br /&gt;The &#91;built-in Jira permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) are listed below. Apps can also define custom permissions. See the &#91;project permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and &#91;global permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information.&lt;br /&gt;&lt;br /&gt;**Administration permissions**&lt;br /&gt;&lt;br /&gt; *  `ADMINISTER_PROJECTS`&lt;br /&gt; *  `EDIT_WORKFLOW`&lt;br /&gt; *  `EDIT_ISSUE_LAYOUT`&lt;br /&gt;&lt;br /&gt;**Project permissions**&lt;br /&gt;&lt;br /&gt; *  `BROWSE_PROJECTS`&lt;br /&gt; *  `MANAGE_SPRINTS_PERMISSION` (Jira Software only)&lt;br /&gt; *  `SERVICEDESK_AGENT` (Jira Service Desk only)&lt;br /&gt; *  `VIEW_DEV_TOOLS` (Jira Software only)&lt;br /&gt; *  `VIEW_READONLY_WORKFLOW`&lt;br /&gt;&lt;br /&gt;**Issue permissions**&lt;br /&gt;&lt;br /&gt; *  `ASSIGNABLE_USER`&lt;br /&gt; *  `ASSIGN_ISSUES`&lt;br /&gt; *  `CLOSE_ISSUES`&lt;br /&gt; *  `CREATE_ISSUES`&lt;br /&gt; *  `DELETE_ISSUES`&lt;br /&gt; *  `EDIT_ISSUES`&lt;br /&gt; *  `LINK_ISSUES`&lt;br /&gt; *  `MODIFY_REPORTER`&lt;br /&gt; *  `MOVE_ISSUES`&lt;br /&gt; *  `RESOLVE_ISSUES`&lt;br /&gt; *  `SCHEDULE_ISSUES`&lt;br /&gt; *  `SET_ISSUE_SECURITY`&lt;br /&gt; *  `TRANSITION_ISSUES`&lt;br /&gt;&lt;br /&gt;**Voters and watchers permissions**&lt;br /&gt;&lt;br /&gt; *  `MANAGE_WATCHERS`&lt;br /&gt; *  `VIEW_VOTERS_AND_WATCHERS`&lt;br /&gt;&lt;br /&gt;**Comments permissions**&lt;br /&gt;&lt;br /&gt; *  `ADD_COMMENTS`&lt;br /&gt; *  `DELETE_ALL_COMMENTS`&lt;br /&gt; *  `DELETE_OWN_COMMENTS`&lt;br /&gt; *  `EDIT_ALL_COMMENTS`&lt;br /&gt; *  `EDIT_OWN_COMMENTS`&lt;br /&gt;&lt;br /&gt;**Attachments permissions**&lt;br /&gt;&lt;br /&gt; *  `CREATE_ATTACHMENTS`&lt;br /&gt; *  `DELETE_ALL_ATTACHMENTS`&lt;br /&gt; *  `DELETE_OWN_ATTACHMENTS`&lt;br /&gt;&lt;br /&gt;**Time tracking permissions**&lt;br /&gt;&lt;br /&gt; *  `DELETE_ALL_WORKLOGS`&lt;br /&gt; *  `DELETE_OWN_WORKLOGS`&lt;br /&gt; *  `EDIT_ALL_WORKLOGS`&lt;br /&gt; *  `EDIT_OWN_WORKLOGS`&lt;br /&gt; *  `WORK_ON_ISSUES`&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
name,
description,
permissions,
scope,
self
FROM jira.permissions.permission_schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates a new permission scheme. You can create a permission scheme with or without defining a set of permission grants.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.permissions.permission_schemes (
description,
name,
permissions,
scope,
cloud_id,
expand
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */,
'{{ permissions }}',
'{{ scope }}',
'{{ cloud_id }}',
'{{ expand }}'
RETURNING
id,
name,
description,
permissions,
scope,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: permission_schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the permission_schemes resource.
    - name: description
      value: "{{ description }}"
      description: |
        A description for the permission scheme.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the permission scheme. Must be unique.
    - name: permissions
      description: |
        The permission scheme to create or update. See [About permission schemes and grants](../api-group-permission-schemes/#about-permission-schemes-and-grants) for more information.
      value:
        - holder:
            parameter: "{{ parameter }}"
            type: "{{ type }}"
            value: "{{ value }}"
          id: {{ id }}
          permission: "{{ permission }}"
          self: "{{ self }}"
    - name: scope
      description: |
        The scope of the permission scheme.
      value:
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
    - name: expand
      value: "{{ expand }}"
      description: Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  \`all\` Returns all expandable information.  *  \`field\` Returns information about the custom field granted the permission.  *  \`group\` Returns information about the group that is granted the permission.  *  \`permissions\` Returns all permission grants for each permission scheme.  *  \`projectRole\` Returns information about the project role granted the permission.  *  \`user\` Returns information about the user who is granted the permission.
      description: Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  \`all\` Returns all expandable information.  *  \`field\` Returns information about the custom field granted the permission.  *  \`group\` Returns information about the group that is granted the permission.  *  \`permissions\` Returns all permission grants for each permission scheme.  *  \`projectRole\` Returns information about the project role granted the permission.  *  \`user\` Returns information about the user who is granted the permission.
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

Updates a permission scheme. Below are some important things to note when using this resource:&lt;br /&gt;&lt;br /&gt; *  If a permissions list is present in the request, then it is set in the permission scheme, overwriting *all existing* grants.&lt;br /&gt; *  If you want to update only the name and description, then do not send a permissions list in the request.&lt;br /&gt; *  Sending an empty list will remove all permission grants from the permission scheme.&lt;br /&gt;&lt;br /&gt;If you want to add or delete a permission grant instead of updating the whole list, see &#91;Create permission grant&#93;(#api-rest-api-3-permissionscheme-schemeId-permission-post) or &#91;Delete permission scheme entity&#93;(#api-rest-api-3-permissionscheme-schemeId-permission-permissionId-delete).&lt;br /&gt;&lt;br /&gt;See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.permissions.permission_schemes
SET 
description = '{{ description }}',
name = '{{ name }}',
permissions = '{{ permissions }}',
scope = '{{ scope }}'
WHERE 
scheme_id = '{{ scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND name = '{{ name }}' --required
AND expand = '{{ expand}}'
RETURNING
id,
name,
description,
permissions,
scope,
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

Deletes a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.permissions.permission_schemes
WHERE scheme_id = '{{ scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
