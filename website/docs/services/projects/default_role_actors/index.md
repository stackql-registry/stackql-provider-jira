--- 
title: default_role_actors
hide_title: false
hide_table_of_contents: false
keywords:
  - default_role_actors
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the default_role_actors resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>default_role_actors</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="default_role_actors" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.default_role_actors" /></td></tr>
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
    <td>The ID of the role actor.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>This property is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the role actor. For users, depending on the user’s privacy setting, this may return an alternative value for the user's name. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_group" /></td>
    <td><code>object</code></td>
    <td>Details of the group associated with the role. (wire: actorGroup)</td>
</tr>
<tr>
    <td><CopyableCode code="actor_user" /></td>
    <td><code>object</code></td>
    <td>Details of the user associated with the role. (wire: actorUser)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_url" /></td>
    <td><code>string (uri)</code></td>
    <td>The avatar of the role actor. (wire: avatarUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of role actor. (atlassian-group-role-actor, atlassian-user-role-actor)</td>
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
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the &#91;default actors&#93;(#api-rest-api-3-resolution-get) for the project role.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Adds &#91;default actors&#93;(#api-rest-api-3-resolution-get) to a role. You may add groups or users, but you cannot add groups and users in the same request.&lt;br /&gt;&lt;br /&gt;Changing a project role's default actors does not affect project role members for projects already created.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-user"><code>user</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-group"><code>group</code></a></td>
    <td>Deletes the &#91;default actors&#93;(#api-rest-api-3-resolution-get) from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.&lt;br /&gt;&lt;br /&gt;Changing a project role's default actors does not affect project role members for projects already created.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-group">
    <td><CopyableCode code="group" /></td>
    <td><code>string</code></td>
    <td>The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId` parameter. As a group's name can change, use of `groupId` is recommended.</td>
</tr>
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group` parameter. (wire: groupId)</td>
</tr>
<tr id="parameter-user">
    <td><CopyableCode code="user" /></td>
    <td><code>string</code></td>
    <td>The user account ID of the user to remove as a default actor.</td>
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

Returns the &#91;default actors&#93;(#api-rest-api-3-resolution-get) for the project role.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
display_name,
actor_group,
actor_user,
avatar_url,
type
FROM jira.projects.default_role_actors
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

Adds &#91;default actors&#93;(#api-rest-api-3-resolution-get) to a role. You may add groups or users, but you cannot add groups and users in the same request.&lt;br /&gt;&lt;br /&gt;Changing a project role's default actors does not affect project role members for projects already created.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.projects.default_role_actors (
group,
group_id,
user,
id,
cloud_id
)
SELECT 
'{{ group }}',
'{{ group_id }}',
'{{ user }}',
'{{ id }}',
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
- name: default_role_actors
  props:
    - name: id
      value: "{{ id }}"
      description: Required parameter for the default_role_actors resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the default_role_actors resource.
    - name: group
      value:
        - "{{ group }}"
      description: |
        The name of the group to add as a default actor. This parameter cannot be used with the \`groupId\` parameter. As a group's name can change,use of \`groupId\` is recommended. This parameter accepts a comma-separated list. For example, \`"group":["project-admin", "jira-developers"]\`.
    - name: group_id
      value:
        - "{{ group_id }}"
      description: |
        The ID of the group to add as a default actor. This parameter cannot be used with the \`group\` parameter This parameter accepts a comma-separated list. For example, \`"groupId":["77f6ab39-e755-4570-a6ae-2d7a8df0bcb8", "0c011f85-69ed-49c4-a801-3b18d0f771bc"]\`.
    - name: user
      value:
        - "{{ user }}"
      description: |
        The account IDs of the users to add as default actors. This parameter accepts a comma-separated list. For example, \`"user":["5b10a2844c20165700ede21g", "5b109f2e9729b51b54dc274d"]\`.
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

Deletes the &#91;default actors&#93;(#api-rest-api-3-resolution-get) from a project role. You may delete a group or user, but you cannot delete a group and a user in the same request.&lt;br /&gt;&lt;br /&gt;Changing a project role's default actors does not affect project role members for projects already created.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.projects.default_role_actors
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND user = '{{ user }}'
AND group_id = '{{ group_id }}'
AND group = '{{ group }}'
;
```
</TabItem>
</Tabs>
