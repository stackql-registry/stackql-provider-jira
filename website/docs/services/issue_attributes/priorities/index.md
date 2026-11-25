--- 
title: priorities
hide_title: false
hide_table_of_contents: false
keywords:
  - priorities
  - issue_attributes
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the priorities resource in the jira issue_attributes service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>priorities</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="priorities" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_attributes.priorities" /></td></tr>
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
    <td>The ID of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The avatarId of the avatar for the issue priority. This parameter is nullable and when set, this avatar references the universal avatar APIs. (wire: avatarId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the icon for the issue priority. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether this priority is the default. (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="schemes" /></td>
    <td><code>object</code></td>
    <td>Priority schemes associated with the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="status_color" /></td>
    <td><code>string</code></td>
    <td>The color used to indicate the issue priority. (wire: statusColor)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

An issue priority.

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
    <td>The ID of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The avatarId of the avatar for the issue priority. This parameter is nullable and when set, this avatar references the universal avatar APIs. (wire: avatarId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the icon for the issue priority. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether this priority is the default. (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="schemes" /></td>
    <td><code>object</code></td>
    <td>Priority schemes associated with the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="status_color" /></td>
    <td><code>string</code></td>
    <td>The color used to indicate the issue priority. (wire: statusColor)</td>
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
    <td>Returns an issue priority. To fetch multiple priorities at once, use &#91;Search priorities&#93;(#api-rest-api-3-priority-search-get) instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-priority_name"><code>priority_name</code></a>, <a href="#parameter-only_default"><code>only_default</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of priorities. The list can contain all priorities or a subset determined by any combination of these criteria:&lt;br /&gt;&lt;br /&gt; *  a list of priority IDs. Any invalid priority IDs are ignored.&lt;br /&gt; *  a list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project IDs are ignored.&lt;br /&gt; *  whether the field configuration is a default. This returns priorities from company-managed (classic) projects only, as there is no concept of default priorities in team-managed projects.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `onlyDefault` parameter is deprecated and will be removed at a later date. See &#91;CHANGE-1655&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `isDefault` property of priorities is deprecated and will be removed at a later date. See &#91;CHANGE-1655&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-status_color"><code>status_color</code></a></td>
    <td></td>
    <td>Creates an issue priority.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See &#91;CHANGE-1525&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-1525).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates an issue priority.&lt;br /&gt;&lt;br /&gt;At least one request body parameter must be defined.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See &#91;CHANGE-1525&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-1525).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes an issue priority.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#set_default"><CopyableCode code="set_default" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Sets default issue priority.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#move"><CopyableCode code="move" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-ids"><code>ids</code></a></td>
    <td></td>
    <td>Changes the order of issue priorities.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the issue priority.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use `schemes` to return the associated priority schemes for each priority. Limited to returning first 15 priority schemes per priority.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of priority IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=2&id=3`.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-only_default">
    <td><CopyableCode code="only_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether only the default priority is returned. (wire: onlyDefault)</td>
</tr>
<tr id="parameter-priority_name">
    <td><CopyableCode code="priority_name" /></td>
    <td><code>string</code></td>
    <td>The name of priority to search for. (wire: priorityName)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The list of projects IDs. To include multiple IDs, provide an ampersand-separated list. For example, `projectId=10010&projectId=10111`. (wire: projectId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>string</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns an issue priority. To fetch multiple priorities at once, use &#91;Search priorities&#93;(#api-rest-api-3-priority-search-get) instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
name,
avatar_id,
description,
icon_url,
is_default,
schemes,
self,
status_color
FROM jira.issue_attributes.priorities
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of priorities. The list can contain all priorities or a subset determined by any combination of these criteria:&lt;br /&gt;&lt;br /&gt; *  a list of priority IDs. Any invalid priority IDs are ignored.&lt;br /&gt; *  a list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project IDs are ignored.&lt;br /&gt; *  whether the field configuration is a default. This returns priorities from company-managed (classic) projects only, as there is no concept of default priorities in team-managed projects.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `onlyDefault` parameter is deprecated and will be removed at a later date. See &#91;CHANGE-1655&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `isDefault` property of priorities is deprecated and will be removed at a later date. See &#91;CHANGE-1655&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1655).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
name,
avatar_id,
description,
icon_url,
is_default,
schemes,
self,
status_color
FROM jira.issue_attributes.priorities
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND project_id = '{{ project_id }}'
AND priority_name = '{{ priority_name }}'
AND only_default = '{{ only_default }}'
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

Creates an issue priority.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See &#91;CHANGE-1525&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-1525).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.issue_attributes.priorities (
avatar_id,
description,
icon_url,
name,
status_color,
cloud_id
)
SELECT 
{{ avatar_id }},
'{{ description }}',
'{{ icon_url }}',
'{{ name }}' /* required */,
'{{ status_color }}' /* required */,
'{{ cloud_id }}'
RETURNING
id
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: priorities
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the priorities resource.
    - name: avatar_id
      value: {{ avatar_id }}
      description: |
        The ID for the avatar for the priority. Either the iconUrl or avatarId must be defined, but not both. This parameter is nullable and will become mandatory once the iconUrl parameter is deprecated.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the priority.
    - name: icon_url
      value: "{{ icon_url }}"
      description: |
        The URL of an icon for the priority. Accepted protocols are HTTP and HTTPS. Built in icons can also be used. Either the iconUrl or avatarId must be defined, but not both.
      valid_values: ['/images/icons/priorities/blocker.png', '/images/icons/priorities/critical.png', '/images/icons/priorities/high.png', '/images/icons/priorities/highest.png', '/images/icons/priorities/low.png', '/images/icons/priorities/lowest.png', '/images/icons/priorities/major.png', '/images/icons/priorities/medium.png', '/images/icons/priorities/minor.png', '/images/icons/priorities/trivial.png', '/images/icons/priorities/blocker_new.png', '/images/icons/priorities/critical_new.png', '/images/icons/priorities/high_new.png', '/images/icons/priorities/highest_new.png', '/images/icons/priorities/low_new.png', '/images/icons/priorities/lowest_new.png', '/images/icons/priorities/major_new.png', '/images/icons/priorities/medium_new.png', '/images/icons/priorities/minor_new.png', '/images/icons/priorities/trivial_new.png']
    - name: name
      value: "{{ name }}"
      description: |
        The name of the priority. Must be unique.
    - name: status_color
      value: "{{ status_color }}"
      description: |
        The status color of the priority in 3-digit or 6-digit hexadecimal format.
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

Updates an issue priority.&lt;br /&gt;&lt;br /&gt;At least one request body parameter must be defined.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The `iconUrl` parameter was sunset on 16th Mar 2025, and replaced with `avatarId`. See &#91;CHANGE-1525&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-1525).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.issue_attributes.priorities
SET 
avatar_id = {{ avatar_id }},
description = '{{ description }}',
icon_url = '{{ icon_url }}',
name = '{{ name }}',
status_color = '{{ status_color }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set;
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

Deletes an issue priority.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.issue_attributes.priorities
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="set_default"
    values={[
        { label: 'set_default', value: 'set_default' },
        { label: 'move', value: 'move' }
    ]}
>
<TabItem value="set_default">

Sets default issue priority.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_attributes.priorities.set_default 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"id": "{{ id }}"
}'
;
```
</TabItem>
<TabItem value="move">

Changes the order of issue priorities.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_attributes.priorities.move 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"after": "{{ after }}", 
"ids": "{{ ids }}", 
"position": "{{ position }}"
}'
;
```
</TabItem>
</Tabs>
