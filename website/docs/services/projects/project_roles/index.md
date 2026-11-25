--- 
title: project_roles
hide_title: false
hide_table_of_contents: false
keywords:
  - project_roles
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the project_roles resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>project_roles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_roles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.project_roles" /></td></tr>
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

Details about a project role.

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
    <td><CopyableCode code="admin" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the admin role for the project.</td>
</tr>
<tr>
    <td><CopyableCode code="default" /></td>
    <td><code>boolean</code></td>
    <td>Whether this role is the default role for the project.</td>
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
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of the project role. This is "DEFAULT" or "GUEST\_ROLE". (DEFAULT, GUEST_ROLE, AI_AGENT_ROLE)</td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-exclude_inactive_users"><code>exclude_inactive_users</code></a></td>
    <td>Returns a project role's details and actors associated with the project. The list of actors is sorted by display name.&lt;br /&gt;&lt;br /&gt;To check whether a user belongs to a role based on their group memberships, use &#91;Get user&#93;(#api-rest-api-3-user-get) with the `groups` expand parameter selected. Then check whether the user keys and groups match with the actors returned for the project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-current_member"><code>current_member</code></a>, <a href="#parameter-exclude_connect_addons"><code>exclude_connect_addons</code></a>, <a href="#parameter-exclude_other_service_roles"><code>exclude_other_service_roles</code></a></td>
    <td>Returns all &#91;project roles&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) and the details for each role. Note that the list of project roles is common to all projects.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#delete_actor"><CopyableCode code="delete_actor" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-projectIdOrKey"><code>projectIdOrKey</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-user"><code>user</code></a>, <a href="#parameter-group"><code>group</code></a>, <a href="#parameter-groupId"><code>groupId</code></a></td>
    <td>Deletes actors from a project role for the project.&lt;br /&gt;&lt;br /&gt;To remove default actors from the project role, use &#91;Delete default actors from project role&#93;(#api-rest-api-3-role-id-actors-delete).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#add_actors"><CopyableCode code="add_actors" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-projectIdOrKey"><code>projectIdOrKey</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Adds actors to a project role for the project.&lt;br /&gt;&lt;br /&gt;To replace all actors for the project, use &#91;Set actors for project role&#93;(#api-rest-api-3-project-projectIdOrKey-role-id-put).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#set_actors"><CopyableCode code="set_actors" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-projectIdOrKey"><code>projectIdOrKey</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets the actors for a project role for a project, replacing all existing actors.&lt;br /&gt;&lt;br /&gt;To add actors to the project without overwriting the existing list, use &#91;Add actors to project role&#93;(#api-rest-api-3-project-projectIdOrKey-role-id-post).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-projectIdOrKey">
    <td><CopyableCode code="projectIdOrKey" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive).</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive). (wire: projectIdOrKey)</td>
</tr>
<tr id="parameter-current_member">
    <td><CopyableCode code="current_member" /></td>
    <td><code>boolean</code></td>
    <td>Whether the roles should be filtered to include only those the user is assigned to. (wire: currentMember)</td>
</tr>
<tr id="parameter-exclude_connect_addons">
    <td><CopyableCode code="exclude_connect_addons" /></td>
    <td><code>boolean</code></td>
    <td> (wire: excludeConnectAddons)</td>
</tr>
<tr id="parameter-exclude_inactive_users">
    <td><CopyableCode code="exclude_inactive_users" /></td>
    <td><code>boolean</code></td>
    <td>Exclude inactive users. (wire: excludeInactiveUsers)</td>
</tr>
<tr id="parameter-exclude_other_service_roles">
    <td><CopyableCode code="exclude_other_service_roles" /></td>
    <td><code>boolean</code></td>
    <td>Do not return the default JSM company-managed space from CSM spaces, or the default CSM roles from JSM spaces. (wire: excludeOtherServiceRoles)</td>
</tr>
<tr id="parameter-group">
    <td><CopyableCode code="group" /></td>
    <td><code>string</code></td>
    <td>The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.</td>
</tr>
<tr id="parameter-groupId">
    <td><CopyableCode code="groupId" /></td>
    <td><code>string</code></td>
    <td>The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter.</td>
</tr>
<tr id="parameter-user">
    <td><CopyableCode code="user" /></td>
    <td><code>string</code></td>
    <td>The user account ID of the user to remove from the project role.</td>
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

Returns a project role's details and actors associated with the project. The list of actors is sorted by display name.&lt;br /&gt;&lt;br /&gt;To check whether a user belongs to a role based on their group memberships, use &#91;Get user&#93;(#api-rest-api-3-user-get) with the `groups` expand parameter selected. Then check whether the user keys and groups match with the actors returned for the project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

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
FROM jira.projects.project_roles
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND exclude_inactive_users = '{{ exclude_inactive_users }}'
;
```
</TabItem>
<TabItem value="list">

Returns all &#91;project roles&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-roles/) and the details for each role. Note that the list of project roles is common to all projects.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
id,
name,
translated_name,
admin,
default,
description,
role_configurable,
scope,
self,
type
FROM jira.projects.project_roles
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND current_member = '{{ current_member }}'
AND exclude_connect_addons = '{{ exclude_connect_addons }}'
AND exclude_other_service_roles = '{{ exclude_other_service_roles }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="delete_actor"
    values={[
        { label: 'delete_actor', value: 'delete_actor' },
        { label: 'add_actors', value: 'add_actors' },
        { label: 'set_actors', value: 'set_actors' }
    ]}
>
<TabItem value="delete_actor">

Deletes actors from a project role for the project.&lt;br /&gt;&lt;br /&gt;To remove default actors from the project role, use &#91;Delete default actors from project role&#93;(#api-rest-api-3-role-id-actors-delete).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.project_roles.delete_actor 
@projectIdOrKey='{{ projectIdOrKey }}' --required, 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@user='{{ user }}', 
@group='{{ group }}', 
@groupId='{{ groupId }}'
;
```
</TabItem>
<TabItem value="add_actors">

Adds actors to a project role for the project.&lt;br /&gt;&lt;br /&gt;To replace all actors for the project, use &#91;Set actors for project role&#93;(#api-rest-api-3-project-projectIdOrKey-role-id-put).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.project_roles.add_actors 
@projectIdOrKey='{{ projectIdOrKey }}' --required, 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"group": "{{ group }}", 
"groupId": "{{ groupId }}", 
"user": "{{ user }}"
}'
;
```
</TabItem>
<TabItem value="set_actors">

Sets the actors for a project role for a project, replacing all existing actors.&lt;br /&gt;&lt;br /&gt;To add actors to the project without overwriting the existing list, use &#91;Add actors to project role&#93;(#api-rest-api-3-project-projectIdOrKey-role-id-post).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.project_roles.set_actors 
@projectIdOrKey='{{ projectIdOrKey }}' --required, 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"categorisedActors": "{{ categorisedActors }}"
}'
;
```
</TabItem>
</Tabs>
