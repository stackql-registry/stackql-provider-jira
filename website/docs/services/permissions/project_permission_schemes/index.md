--- 
title: project_permission_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - project_permission_schemes
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the project_permission_schemes resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>project_permission_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_permission_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.project_permission_schemes" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
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
    <td><a href="#parameter-project_key_or_id"><code>project_key_or_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Gets the &#91;permission scheme&#93;(https:​//confluence.atlassian.com/x/yodKLg) associated with the project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).</td>
</tr>
<tr>
    <td><a href="#assign"><CopyableCode code="assign" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-projectKeyOrId"><code>projectKeyOrId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Assigns a permission scheme with a project. See &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for more information about permission schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)</td>
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
<tr id="parameter-projectKeyOrId">
    <td><CopyableCode code="projectKeyOrId" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive).</td>
</tr>
<tr id="parameter-project_key_or_id">
    <td><CopyableCode code="project_key_or_id" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive). (wire: projectKeyOrId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that permissions are included when you specify any value. Expand options include:   *  `all` Returns all expandable information.  *  `field` Returns information about the custom field granted the permission.  *  `group` Returns information about the group that is granted the permission.  *  `permissions` Returns all permission grants for each permission scheme.  *  `projectRole` Returns information about the project role granted the permission.  *  `user` Returns information about the user who is granted the permission.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Gets the &#91;permission scheme&#93;(https:​//confluence.atlassian.com/x/yodKLg) associated with the project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).

```sql
SELECT
id,
name,
description,
permissions,
scope,
self
FROM jira.permissions.project_permission_schemes
WHERE project_key_or_id = '{{ project_key_or_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="assign"
    values={[
        { label: 'assign', value: 'assign' }
    ]}
>
<TabItem value="assign">

Assigns a permission scheme with a project. See &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for more information about permission schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)

```sql
EXEC jira.permissions.project_permission_schemes.assign 
@projectKeyOrId='{{ projectKeyOrId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}' 
@@json=
'{
"id": {{ id }}
}'
;
```
</TabItem>
</Tabs>
