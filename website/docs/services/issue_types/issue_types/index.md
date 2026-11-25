--- 
title: issue_types
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_types
  - issue_types
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_types resource in the jira issue_types service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_types</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_types" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_types.issue_types" /></td></tr>
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
    <td>The ID of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type's avatar. (wire: avatarId)</td>
</tr>
<tr>
    <td><CopyableCode code="entity_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects. (wire: entityId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="hierarchy_level" /></td>
    <td><code>integer (int32)</code></td>
    <td>Hierarchy level of the issue type. (wire: hierarchyLevel)</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue type's avatar. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>Details of the next-gen projects the issue type is available in.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of these issue type details.</td>
</tr>
<tr>
    <td><CopyableCode code="subtask" /></td>
    <td><code>boolean</code></td>
    <td>Whether this issue type is used to create subtasks.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about an issue type.

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
    <td>The ID of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type's avatar. (wire: avatarId)</td>
</tr>
<tr>
    <td><CopyableCode code="entity_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects. (wire: entityId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue type.</td>
</tr>
<tr>
    <td><CopyableCode code="hierarchy_level" /></td>
    <td><code>integer (int32)</code></td>
    <td>Hierarchy level of the issue type. (wire: hierarchyLevel)</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue type's avatar. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>Details of the next-gen projects the issue type is available in.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of these issue type details.</td>
</tr>
<tr>
    <td><CopyableCode code="subtask" /></td>
    <td><code>boolean</code></td>
    <td>Whether this issue type is used to create subtasks.</td>
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
    <td>Returns an issue type.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) in a project the issue type is associated with or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns all issue types.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issue types are only returned as follows:&lt;br /&gt;&lt;br /&gt; *  if the user has the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), all issue types are returned.&lt;br /&gt; *  if the user has the *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for one or more projects, the issue types associated with the projects the user has permission to browse are returned.&lt;br /&gt; *  if the user is anonymous then they will be able to access projects with the *Browse projects* for anonymous users&lt;br /&gt; *  if the user authentication is incorrect they will fall back to anonymous</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates an issue type.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates the issue type.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-alternative_issue_type_id"><code>alternative_issue_type_id</code></a></td>
    <td>Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the &#91;Get alternative issue types&#93;(#api-rest-api-3-issuetype-id-alternatives-get) resource.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the issue type.</td>
</tr>
<tr id="parameter-alternative_issue_type_id">
    <td><CopyableCode code="alternative_issue_type_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the replacement issue type. (wire: alternativeIssueTypeId)</td>
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

Returns an issue type.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) in a project the issue type is associated with or *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
avatar_id,
entity_id,
description,
hierarchy_level,
icon_url,
scope,
self,
subtask
FROM jira.issue_types.issue_types
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns all issue types.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issue types are only returned as follows:&lt;br /&gt;&lt;br /&gt; *  if the user has the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), all issue types are returned.&lt;br /&gt; *  if the user has the *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for one or more projects, the issue types associated with the projects the user has permission to browse are returned.&lt;br /&gt; *  if the user is anonymous then they will be able to access projects with the *Browse projects* for anonymous users&lt;br /&gt; *  if the user authentication is incorrect they will fall back to anonymous

```sql
SELECT
id,
name,
avatar_id,
entity_id,
description,
hierarchy_level,
icon_url,
scope,
self,
subtask
FROM jira.issue_types.issue_types
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

Creates an issue type.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.issue_types.issue_types (
description,
hierarchy_level,
name,
type,
cloud_id
)
SELECT 
'{{ description }}',
{{ hierarchy_level }},
'{{ name }}' /* required */,
'{{ type }}',
'{{ cloud_id }}'
RETURNING
id,
name,
avatar_id,
entity_id,
description,
hierarchy_level,
icon_url,
scope,
self,
subtask
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: issue_types
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the issue_types resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the issue type.
    - name: hierarchy_level
      value: {{ hierarchy_level }}
      description: |
        The hierarchy level of the issue type. Use:
        *  \`-1\` for Subtask.
        *  \`0\` for Base.
        Defaults to \`0\`.
    - name: name
      value: "{{ name }}"
      description: |
        The unique name for the issue type. The maximum length is 60 characters.
    - name: type
      value: "{{ type }}"
      description: |
        Deprecated. Use \`hierarchyLevel\` instead. See the [deprecation notice](https://community.developer.atlassian.com/t/deprecation-of-the-epic-link-parent-link-and-other-related-fields-in-rest-apis-and-webhooks/54048) for details.
        Whether the issue type is \`subtype\` or \`standard\`. Defaults to \`standard\`.
      valid_values: ['subtask', 'standard']
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

Updates the issue type.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.issue_types.issue_types
SET 
avatar_id = {{ avatar_id }},
description = '{{ description }}',
name = '{{ name }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
avatar_id,
entity_id,
description,
hierarchy_level,
icon_url,
scope,
self,
subtask;
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

Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the &#91;Get alternative issue types&#93;(#api-rest-api-3-issuetype-id-alternatives-get) resource.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.issue_types.issue_types
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND alternative_issue_type_id = '{{ alternative_issue_type_id }}'
;
```
</TabItem>
</Tabs>
