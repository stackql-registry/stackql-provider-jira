--- 
title: permissions
hide_title: false
hide_table_of_contents: false
keywords:
  - permissions
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the permissions resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>permissions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="permissions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.permissions" /></td></tr>
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

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns all permissions, including:&lt;br /&gt;&lt;br /&gt; *  global permissions.&lt;br /&gt; *  project permissions.&lt;br /&gt; *  global permissions added by plugins.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#check"><CopyableCode code="check" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns:&lt;br /&gt;&lt;br /&gt; *  for a list of global permissions, the global permissions granted to a user.&lt;br /&gt; *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues a user can access or manipulate.&lt;br /&gt;&lt;br /&gt;If no account ID is provided, the operation returns details for the logged in user.&lt;br /&gt;&lt;br /&gt;Note that:&lt;br /&gt;&lt;br /&gt; *  Invalid project and issue IDs are ignored.&lt;br /&gt; *  A maximum of 1000 projects and 1000 issues can be checked.&lt;br /&gt; *  Null values in `globalPermissions`, `projectPermissions`, `projectPermissions.projects`, and `projectPermissions.issues` are ignored.&lt;br /&gt; *  Empty strings in `projectPermissions.permissions` are ignored.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.&lt;br /&gt;&lt;br /&gt; *  **Classic**: `read:jira-work`&lt;br /&gt; *  **Granular**: `read:permission:jira`&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) to check the permissions for other users, otherwise none. However, Connect apps can make a call from the app server to the product to obtain permission details for any user, without admin permission. This Connect app ability doesn't apply to calls made using AP.request() in a browser.</td>
</tr>
<tr>
    <td><a href="#get_permitted_projects"><CopyableCode code="get_permitted_projects" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-permissions"><code>permissions</code></a></td>
    <td></td>
    <td>Returns all the projects where the user is granted a list of project permissions.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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

Returns all permissions, including:&lt;br /&gt;&lt;br /&gt; *  global permissions.&lt;br /&gt; *  project permissions.&lt;br /&gt; *  global permissions added by plugins.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
*
FROM jira.permissions.permissions
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="check"
    values={[
        { label: 'check', value: 'check' },
        { label: 'get_permitted_projects', value: 'get_permitted_projects' }
    ]}
>
<TabItem value="check">

Returns:&lt;br /&gt;&lt;br /&gt; *  for a list of global permissions, the global permissions granted to a user.&lt;br /&gt; *  for a list of project permissions and lists of projects and issues, for each project permission a list of the projects and issues a user can access or manipulate.&lt;br /&gt;&lt;br /&gt;If no account ID is provided, the operation returns details for the logged in user.&lt;br /&gt;&lt;br /&gt;Note that:&lt;br /&gt;&lt;br /&gt; *  Invalid project and issue IDs are ignored.&lt;br /&gt; *  A maximum of 1000 projects and 1000 issues can be checked.&lt;br /&gt; *  Null values in `globalPermissions`, `projectPermissions`, `projectPermissions.projects`, and `projectPermissions.issues` are ignored.&lt;br /&gt; *  Empty strings in `projectPermissions.permissions` are ignored.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.&lt;br /&gt;&lt;br /&gt; *  **Classic**: `read:jira-work`&lt;br /&gt; *  **Granular**: `read:permission:jira`&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) to check the permissions for other users, otherwise none. However, Connect apps can make a call from the app server to the product to obtain permission details for any user, without admin permission. This Connect app ability doesn't apply to calls made using AP.request() in a browser.

```sql
EXEC jira.permissions.permissions.check 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"accountId": "{{ accountId }}", 
"globalPermissions": "{{ globalPermissions }}", 
"projectPermissions": "{{ projectPermissions }}"
}'
;
```
</TabItem>
<TabItem value="get_permitted_projects">

Returns all the projects where the user is granted a list of project permissions.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
EXEC jira.permissions.permissions.get_permitted_projects 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"permissions": "{{ permissions }}"
}'
;
```
</TabItem>
</Tabs>
