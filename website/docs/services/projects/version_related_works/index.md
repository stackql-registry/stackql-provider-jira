--- 
title: version_related_works
hide_title: false
hide_table_of_contents: false
keywords:
  - version_related_works
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the version_related_works resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>version_related_works</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="version_related_works" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.version_related_works" /></td></tr>
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

Associated related work to a version

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
    <td><CopyableCode code="issue_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue associated with the related work (if there is one). Cannot be updated via the Rest API. (wire: issueId)</td>
</tr>
<tr>
    <td><CopyableCode code="related_work_id" /></td>
    <td><code>string</code></td>
    <td>The id of the related work. For the native release note related work item, this will be null, and Rest API does not support updating it. (wire: relatedWorkId)</td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td>The category of the related work</td>
</tr>
<tr>
    <td><CopyableCode code="title" /></td>
    <td><code>string</code></td>
    <td>The title of the related work</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the related work. Will be null for the native release note related work item, but is otherwise required.</td>
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
    <td>Returns related work items for the given version id.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the version.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-category"><code>category</code></a></td>
    <td></td>
    <td>Creates a related work for the given version. You can only create a generic link type of related works via this API. relatedWorkId will be auto-generated UUID, that does not need to be provided.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-category"><code>category</code></a></td>
    <td></td>
    <td>Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version related works can't be edited.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-version_id"><code>version_id</code></a>, <a href="#parameter-related_work_id"><code>related_work_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes the given related work for the given version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.</td>
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
    <td>The ID of the version to update the related work on. For the related work id, pass it to the input JSON.</td>
</tr>
<tr id="parameter-related_work_id">
    <td><CopyableCode code="related_work_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the related work to delete. (wire: relatedWorkId)</td>
</tr>
<tr id="parameter-version_id">
    <td><CopyableCode code="version_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the version that the target related work belongs to. (wire: versionId)</td>
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

Returns related work items for the given version id.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the version.

```sql
SELECT
issue_id,
related_work_id,
category,
title,
url
FROM jira.projects.version_related_works
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

Creates a related work for the given version. You can only create a generic link type of related works via this API. relatedWorkId will be auto-generated UUID, that does not need to be provided.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.

```sql
INSERT INTO jira.projects.version_related_works (
category,
title,
url,
id,
cloud_id
)
SELECT 
'{{ category }}' /* required */,
'{{ title }}',
'{{ url }}',
'{{ id }}',
'{{ cloud_id }}'
RETURNING
issue_id,
related_work_id,
category,
title,
url
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: version_related_works
  props:
    - name: id
      value: "{{ id }}"
      description: Required parameter for the version_related_works resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the version_related_works resource.
    - name: category
      value: "{{ category }}"
      description: |
        The category of the related work
    - name: title
      value: "{{ title }}"
      description: |
        The title of the related work
    - name: url
      value: "{{ url }}"
      description: |
        The URL of the related work. Will be null for the native release note related work item, but is otherwise required.
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

Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version related works can't be edited.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.

```sql
UPDATE jira.projects.version_related_works
SET 
category = '{{ category }}',
title = '{{ title }}',
url = '{{ url }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND category = '{{ category }}' --required
RETURNING
issue_id,
related_work_id,
category,
title,
url;
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

Deletes the given related work for the given version.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Resolve issues:* and *Edit issues* &#91;Managing project permissions&#93;(https:​//confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the project that contains the version.

```sql
DELETE FROM jira.projects.version_related_works
WHERE version_id = '{{ version_id }}' --required
AND related_work_id = '{{ related_work_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
