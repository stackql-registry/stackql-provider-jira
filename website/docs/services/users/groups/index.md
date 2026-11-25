--- 
title: groups
hide_title: false
hide_table_of_contents: false
keywords:
  - groups
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the groups resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>groups</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="groups" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.groups" /></td></tr>
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

Details about a group.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the group.</td>
</tr>
<tr>
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. (wire: groupId)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-group_name"><code>group_name</code></a>, <a href="#parameter-access_type"><code>access_type</code></a>, <a href="#parameter-application_key"><code>application_key</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of groups.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-swap_group"><code>swap_group</code></a>, <a href="#parameter-swap_group_id"><code>swap_group_id</code></a></td>
    <td>Deletes a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* strategic &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).</td>
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
<tr id="parameter-access_type">
    <td><CopyableCode code="access_type" /></td>
    <td><code>string</code></td>
    <td>The access level of a group. Valid values: 'site-admin', 'admin', 'user'. (wire: accessType)</td>
</tr>
<tr id="parameter-application_key">
    <td><CopyableCode code="application_key" /></td>
    <td><code>string</code></td>
    <td>The application key of the product user groups to search for. Valid values: 'jira-servicedesk', 'jira-software', 'jira-product-discovery', 'jira-core'. (wire: applicationKey)</td>
</tr>
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the group. This parameter cannot be used with the `groupname` parameter. (wire: groupId)</td>
</tr>
<tr id="parameter-group_name">
    <td><CopyableCode code="group_name" /></td>
    <td><code>array</code></td>
    <td>The name of a group. To specify multiple names, pass multiple `groupName` parameters. For example, `groupName=administrators&groupName=jira-software-users`. (wire: groupName)</td>
</tr>
<tr id="parameter-groupname">
    <td><CopyableCode code="groupname" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-swap_group">
    <td><CopyableCode code="swap_group" /></td>
    <td><code>string</code></td>
    <td>As a group's name can change, use of `swapGroupId` is recommended to identify a group.   The group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroupId` parameter. (wire: swapGroup)</td>
</tr>
<tr id="parameter-swap_group_id">
    <td><CopyableCode code="swap_group_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the group to transfer restrictions to. Only comments and worklogs are transferred. If restrictions are not transferred, comments and worklogs are inaccessible after the deletion. This parameter cannot be used with the `swapGroup` parameter. (wire: swapGroupId)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of groups.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
name,
group_id
FROM jira.users.groups
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND group_id = '{{ group_id }}'
AND group_name = '{{ group_name }}'
AND access_type = '{{ access_type }}'
AND application_key = '{{ application_key }}'
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

Creates a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).

```sql
INSERT INTO jira.users.groups (
name,
cloud_id
)
SELECT 
'{{ name }}' /* required */,
'{{ cloud_id }}'
RETURNING
name,
group_id,
self,
users
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: groups
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the groups resource.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the group.
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

Deletes a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* strategic &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).

```sql
DELETE FROM jira.users.groups
WHERE cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND groupname = '{{ groupname }}'
AND group_id = '{{ group_id }}'
AND swap_group = '{{ swap_group }}'
AND swap_group_id = '{{ swap_group_id }}'
;
```
</TabItem>
</Tabs>
