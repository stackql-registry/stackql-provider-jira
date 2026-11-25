--- 
title: roles
hide_title: false
hide_table_of_contents: false
keywords:
  - roles
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the roles resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>roles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="roles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.roles" /></td></tr>
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
    <td>The ID of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="translated_name" /></td>
    <td><code>string</code></td>
    <td>The translated name of the project role. (wire: translatedName)</td>
</tr>
<tr>
    <td><CopyableCode code="actors" /></td>
    <td><code>array</code></td>
    <td>The list of users who act in this role.</td>
</tr>
<tr>
    <td><CopyableCode code="admin" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the admin role for the project.</td>
</tr>
<tr>
    <td><CopyableCode code="current_user_role" /></td>
    <td><code>boolean</code></td>
    <td>Whether the calling user is part of this role. (wire: currentUserRole)</td>
</tr>
<tr>
    <td><CopyableCode code="default" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the default role for the project</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="role_configurable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the roles are configurable for this project. (wire: roleConfigurable)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the role. Indicated for roles associated with &#91;next-gen projects&#93;(https:​//confluence.atlassian.com/x/loMyO).</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL the project role details.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about the roles in a project.

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
    <td>The ID of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="translated_name" /></td>
    <td><code>string</code></td>
    <td>The translated name of the project role. (wire: translatedName)</td>
</tr>
<tr>
    <td><CopyableCode code="actors" /></td>
    <td><code>array</code></td>
    <td>The list of users who act in this role.</td>
</tr>
<tr>
    <td><CopyableCode code="admin" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the admin role for the project.</td>
</tr>
<tr>
    <td><CopyableCode code="current_user_role" /></td>
    <td><code>boolean</code></td>
    <td>Whether the calling user is part of this role. (wire: currentUserRole)</td>
</tr>
<tr>
    <td><CopyableCode code="default" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the default role for the project</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the project role.</td>
</tr>
<tr>
    <td><CopyableCode code="role_configurable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the roles are configurable for this project. (wire: roleConfigurable)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the role. Indicated for roles associated with &#91;next-gen projects&#93;(https:​//confluence.atlassian.com/x/loMyO).</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL the project role details.</td>
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
    <td>Gets the project role details and the default actors associated with the role. The list of default actors is sorted by display name.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Gets a list of all project roles, complete with project role details and default actors.&lt;br /&gt;&lt;br /&gt;### About project roles ###&lt;br /&gt;&lt;br /&gt;&#91;Project roles&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) are a flexible way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira applications).&lt;br /&gt;&lt;br /&gt;Project roles are used in &#91;permission schemes&#93;(#api-rest-api-3-permissionscheme-get), &#91;email notification schemes&#93;(#api-rest-api-3-notificationscheme-get), &#91;issue security levels&#93;(#api-rest-api-3-issuesecurityschemes-get), &#91;comment visibility&#93;(#api-rest-api-3-comment-list-post), and workflow conditions.&lt;br /&gt;&lt;br /&gt;#### Members and actors ####&lt;br /&gt;&lt;br /&gt;In the Jira REST API, a member of a project role is called an *actor*. An *actor* is a group or user associated with a project role.&lt;br /&gt;&lt;br /&gt;Actors may be set as &#91;default members&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/#Specifying-'default-members'-for-a-project-role) of the project role or set at the project level:&lt;br /&gt;&lt;br /&gt; *  Default actors: Users and groups that are assigned to the project role for all newly created projects. The default actors can be removed at the project level later if desired.&lt;br /&gt; *  Actors: Users and groups that are associated with a project role for a project, which may differ from the default actors. This enables you to assign a user to different roles in different projects.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a new project role with no &#91;default actors&#93;(#api-rest-api-3-resolution-get). You can use the &#91;Add default actors to project role&#93;(#api-rest-api-3-role-id-actors-post) operation to add default actors to the project role after creating it.&lt;br /&gt;&lt;br /&gt;*Note that although a new project role is available to all projects upon creation, any default actors that are associated with the project role are not added to projects that existed prior to the role being created.*&lt;&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates either the project role's name or its description.&lt;br /&gt;&lt;br /&gt;You cannot update both the name and description at the same time using this operation. If you send a request with a name and a description only the name is updated.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-swap"><code>swap</code></a></td>
    <td>Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in use.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#replace"><CopyableCode code="replace" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates the project role's name and description. You must include both a name and a description in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the project role. Use &#91;Get all project roles&#93;(#api-rest-api-3-role-get) to get a list of project role IDs.</td>
</tr>
<tr id="parameter-swap">
    <td><CopyableCode code="swap" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in schemes (notifications, permissions, issue security), workflows, worklogs and comments.</td>
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

Gets the project role details and the default actors associated with the role. The list of default actors is sorted by display name.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
translated_name,
actors,
admin,
current_user_role,
default,
description,
role_configurable,
scope,
self
FROM jira.projects.roles
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Gets a list of all project roles, complete with project role details and default actors.&lt;br /&gt;&lt;br /&gt;### About project roles ###&lt;br /&gt;&lt;br /&gt;&#91;Project roles&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) are a flexible way to to associate users and groups with projects. In Jira Cloud, the list of project roles is shared globally with all projects, but each project can have a different set of actors associated with it (unlike groups, which have the same membership throughout all Jira applications).&lt;br /&gt;&lt;br /&gt;Project roles are used in &#91;permission schemes&#93;(#api-rest-api-3-permissionscheme-get), &#91;email notification schemes&#93;(#api-rest-api-3-notificationscheme-get), &#91;issue security levels&#93;(#api-rest-api-3-issuesecurityschemes-get), &#91;comment visibility&#93;(#api-rest-api-3-comment-list-post), and workflow conditions.&lt;br /&gt;&lt;br /&gt;#### Members and actors ####&lt;br /&gt;&lt;br /&gt;In the Jira REST API, a member of a project role is called an *actor*. An *actor* is a group or user associated with a project role.&lt;br /&gt;&lt;br /&gt;Actors may be set as &#91;default members&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/#Specifying-'default-members'-for-a-project-role) of the project role or set at the project level:&lt;br /&gt;&lt;br /&gt; *  Default actors: Users and groups that are assigned to the project role for all newly created projects. The default actors can be removed at the project level later if desired.&lt;br /&gt; *  Actors: Users and groups that are associated with a project role for a project, which may differ from the default actors. This enables you to assign a user to different roles in different projects.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
translated_name,
actors,
admin,
current_user_role,
default,
description,
role_configurable,
scope,
self
FROM jira.projects.roles
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates a new project role with no &#91;default actors&#93;(#api-rest-api-3-resolution-get). You can use the &#91;Add default actors to project role&#93;(#api-rest-api-3-role-id-actors-post) operation to add default actors to the project role after creating it.&lt;br /&gt;&lt;br /&gt;*Note that although a new project role is available to all projects upon creation, any default actors that are associated with the project role are not added to projects that existed prior to the role being created.*&lt;&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.projects.roles (
description,
name,
cloud_id
)
SELECT 
'{{ description }}',
'{{ name }}',
'{{ cloud_id }}'
RETURNING
id,
name,
translated_name,
actors,
admin,
current_user_role,
default,
description,
role_configurable,
scope,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: roles
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the roles resource.
    - name: description
      value: "{{ description }}"
      description: |
        A description of the project role. Required when fully updating a project role. Optional when creating or partially updating a project role.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255 characters. Required when creating a project role. Optional when partially updating a project role.
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

Updates either the project role's name or its description.&lt;br /&gt;&lt;br /&gt;You cannot update both the name and description at the same time using this operation. If you send a request with a name and a description only the name is updated.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.projects.roles
SET 
description = '{{ description }}',
name = '{{ name }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
translated_name,
actors,
admin,
current_user_role,
default,
description,
role_configurable,
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

Deletes a project role. You must specify a replacement project role if you wish to delete a project role that is in use.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.projects.roles
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND swap = '{{ swap }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="replace"
    values={[
        { label: 'replace', value: 'replace' }
    ]}
>
<TabItem value="replace">

Updates the project role's name and description. You must include both a name and a description in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.roles.replace 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"description": "{{ description }}", 
"name": "{{ name }}"
}'
;
```
</TabItem>
</Tabs>
