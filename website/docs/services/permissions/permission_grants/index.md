--- 
title: permission_grants
hide_title: false
hide_table_of_contents: false
keywords:
  - permission_grants
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the permission_grants resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>permission_grants</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="permission_grants" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.permission_grants" /></td></tr>
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
    <td>The ID of the permission granted details.</td>
</tr>
<tr>
    <td><CopyableCode code="holder" /></td>
    <td><code>object</code></td>
    <td>The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See &#91;Holder object&#93;(../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information.</td>
</tr>
<tr>
    <td><CopyableCode code="permission" /></td>
    <td><code>string</code></td>
    <td>The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See &#91;Built-in permissions&#93;(../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the &#91;project permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and &#91;global permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the permission granted details.</td>
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
    <td>The ID of the permission granted details.</td>
</tr>
<tr>
    <td><CopyableCode code="holder" /></td>
    <td><code>object</code></td>
    <td>The user or group being granted the permission. It consists of a `type`, a type-dependent `parameter` and a type-dependent `value`. See &#91;Holder object&#93;(../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information.</td>
</tr>
<tr>
    <td><CopyableCode code="permission" /></td>
    <td><code>string</code></td>
    <td>The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See &#91;Built-in permissions&#93;(../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the &#91;project permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and &#91;global permission&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the permission granted details.</td>
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
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-permission_id"><code>permission_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a permission grant.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all permission grants for a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Creates a permission grant in a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-permission_id"><code>permission_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a permission grant from a permission scheme. See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-permission_id">
    <td><CopyableCode code="permission_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the permission grant to delete. (wire: permissionId)</td>
</tr>
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the permission scheme to delete the permission grant from. (wire: schemeId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  `permissions` Returns all permission grants for each permission scheme.  *  `user` Returns information about the user who is granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `projectRole` Returns information about the project role granted the permission.  *  `field` Returns information about the custom field granted the permission.  *  `all` Returns all expandable information.</td>
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

Returns a permission grant.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
holder,
permission,
self
FROM jira.permissions.permission_grants
WHERE scheme_id = '{{ scheme_id }}' -- required
AND permission_id = '{{ permission_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns all permission grants for a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
holder,
permission,
self
FROM jira.permissions.permission_grants
WHERE scheme_id = '{{ scheme_id }}' -- required
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

Creates a permission grant in a permission scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.permissions.permission_grants (
holder,
permission,
scheme_id,
cloud_id,
expand
)
SELECT 
'{{ holder }}',
'{{ permission }}',
'{{ scheme_id }}',
'{{ cloud_id }}',
'{{ expand }}'
RETURNING
id,
holder,
permission,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: permission_grants
  props:
    - name: scheme_id
      value: "{{ scheme_id }}"
      description: Required parameter for the permission_grants resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the permission_grants resource.
    - name: holder
      description: |
        The user or group being granted the permission. It consists of a \`type\`, a type-dependent \`parameter\` and a type-dependent \`value\`. See [Holder object](../api-group-permission-schemes/#holder-object) in *Get all permission schemes* for more information.
      value:
        parameter: "{{ parameter }}"
        type: "{{ type }}"
        value: "{{ value }}"
    - name: permission
      value: "{{ permission }}"
      description: |
        The permission to grant. This permission can be one of the built-in permissions or a custom permission added by an app. See [Built-in permissions](../api-group-permission-schemes/#built-in-permissions) in *Get all permission schemes* for more information about the built-in permissions. See the [project permission](https://developer.atlassian.com/cloud/jira/platform/modules/project-permission/) and [global permission](https://developer.atlassian.com/cloud/jira/platform/modules/global-permission/) module documentation for more information about custom permissions.
    - name: expand
      value: "{{ expand }}"
      description: Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  \`permissions\` Returns all permission grants for each permission scheme.  *  \`user\` Returns information about the user who is granted the permission.  *  \`group\` Returns information about the group that is granted the permission.  *  \`projectRole\` Returns information about the project role granted the permission.  *  \`field\` Returns information about the custom field granted the permission.  *  \`all\` Returns all expandable information.
      description: Use expand to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are always included when you specify any value. Expand options include:   *  \`permissions\` Returns all permission grants for each permission scheme.  *  \`user\` Returns information about the user who is granted the permission.  *  \`group\` Returns information about the group that is granted the permission.  *  \`projectRole\` Returns information about the project role granted the permission.  *  \`field\` Returns information about the custom field granted the permission.  *  \`all\` Returns all expandable information.
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

Deletes a permission grant from a permission scheme. See &#91;About permission schemes and grants&#93;(../api-group-permission-schemes/#about-permission-schemes-and-grants) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.permissions.permission_grants
WHERE scheme_id = '{{ scheme_id }}' --required
AND permission_id = '{{ permission_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
