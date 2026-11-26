--- 
title: statuses
hide_title: false
hide_table_of_contents: false
keywords:
  - statuses
  - workflows
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the statuses resource in the jira workflows service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>statuses</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="statuses" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.workflows.statuses" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list_by_ids', value: 'list_by_ids' },
        { label: 'list_by_names', value: 'list_by_names' },
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
    <td>The ID of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="icon_url" /></td>
    <td><code>string</code></td>
    <td>The URL of the icon used to represent the status. (wire: iconUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="status_category" /></td>
    <td><code>object</code></td>
    <td>The category assigned to the status. (wire: statusCategory)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_ids">

Details of a status.

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
    <td>The ID of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="status_category" /></td>
    <td><code>string</code></td>
    <td>The category of the status. (TODO, IN_PROGRESS, DONE) (wire: statusCategory)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_names">

Details of a status.

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
    <td>The ID of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="status_category" /></td>
    <td><code>string</code></td>
    <td>The category of the status. (TODO, IN_PROGRESS, DONE) (wire: statusCategory)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of a status.

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
    <td>The ID of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the status.</td>
</tr>
<tr>
    <td><CopyableCode code="status_category" /></td>
    <td><code>string</code></td>
    <td>The category of the status. (TODO, IN_PROGRESS, DONE) (wire: statusCategory)</td>
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
    <td><a href="#parameter-id_or_name"><code>id_or_name</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a status. The status must be associated with an active workflow to be returned.&lt;br /&gt;&lt;br /&gt;If a name is used on more than one status, only the status found first is returned. Therefore, identifying the status by its ID may be preferable.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;&#91;Permissions&#93;(#permissions) required: *Browse projects* &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the project.</td>
</tr>
<tr>
    <td><a href="#list_by_ids"><CopyableCode code="list_by_ids" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of the statuses specified by one or more status IDs.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#list_by_names"><CopyableCode code="list_by_names" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Returns a list of the statuses specified by one or more status names.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Browse projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-search_string"><code>search_string</code></a>, <a href="#parameter-status_category"><code>status_category</code></a>, <a href="#parameter-include_global_statuses"><code>include_global_statuses</code></a></td>
    <td>Returns a &#91;paginated&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of statuses that match a search on name or project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-scope"><code>scope</code></a>, <a href="#parameter-statuses"><code>statuses</code></a></td>
    <td></td>
    <td>Creates statuses for a global or project scope.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-statuses"><code>statuses</code></a></td>
    <td></td>
    <td>Updates statuses by ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes statuses by ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#list_all"><CopyableCode code="list_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of all statuses associated with active workflows.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;&#91;Permissions&#93;(#permissions) required: *Browse projects* &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the project.</td>
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
    <td><code>array</code></td>
    <td>The list of status IDs. To include multiple IDs, provide an ampersand-separated list. For example, id=10000&id=10001.  Min items `1`, Max items `50`</td>
</tr>
<tr id="parameter-id_or_name">
    <td><CopyableCode code="id_or_name" /></td>
    <td><code>string</code></td>
    <td>The ID or name of the status.</td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>array</code></td>
    <td>The list of status names. To include multiple names, provide an ampersand-separated list. For example, name=nameXX&name=nameYY.  Min items `1`, Max items `50`</td>
</tr>
<tr id="parameter-include_global_statuses">
    <td><CopyableCode code="include_global_statuses" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include global statuses (scope = null, not tied to any project) in the response. Defaults to false. Only relevant for project scoped queries. (wire: includeGlobalStatuses)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>The project the status is part of or null for global statuses. (wire: projectId)</td>
</tr>
<tr id="parameter-search_string">
    <td><CopyableCode code="search_string" /></td>
    <td><code>string</code></td>
    <td>Term to match status names against or null to search for all statuses in the search scope. (wire: searchString)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-status_category">
    <td><CopyableCode code="status_category" /></td>
    <td><code>string</code></td>
    <td>Category of the status to filter by. The supported values are: `TODO`, `IN_PROGRESS`, and `DONE`. (wire: statusCategory)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list_by_ids', value: 'list_by_ids' },
        { label: 'list_by_names', value: 'list_by_names' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a status. The status must be associated with an active workflow to be returned.&lt;br /&gt;&lt;br /&gt;If a name is used on more than one status, only the status found first is returned. Therefore, identifying the status by its ID may be preferable.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;&#91;Permissions&#93;(#permissions) required: *Browse projects* &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the project.

```sql
SELECT
id,
name,
description,
icon_url,
scope,
self,
status_category
FROM jira.workflows.statuses
WHERE id_or_name = '{{ id_or_name }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list_by_ids">

Returns a list of the statuses specified by one or more status IDs.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
SELECT
id,
name,
description,
scope,
status_category
FROM jira.workflows.statuses
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list_by_names">

Returns a list of the statuses specified by one or more status names.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Browse projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
SELECT
id,
name,
description,
scope,
status_category
FROM jira.workflows.statuses
WHERE name = '{{ name }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_id = '{{ project_id }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of statuses that match a search on name or project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
SELECT
id,
name,
description,
scope,
status_category
FROM jira.workflows.statuses
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_id = '{{ project_id }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND search_string = '{{ search_string }}'
AND status_category = '{{ status_category }}'
AND include_global_statuses = '{{ include_global_statuses }}'
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

Creates statuses for a global or project scope.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
INSERT INTO jira.workflows.statuses (
scope,
statuses,
cloud_id
)
SELECT 
'{{ scope }}' /* required */,
'{{ statuses }}' /* required */,
'{{ cloud_id }}'
RETURNING
id,
name,
description,
scope,
status_category
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: statuses
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the statuses resource.
    - name: scope
      description: |
        The scope of the status.
      value:
        project:
          id: "{{ id }}"
        type: "{{ type }}"
    - name: statuses
      description: |
        Details of the statuses being created.
      value:
        - description: "{{ description }}"
          name: "{{ name }}"
          statusCategory: "{{ statusCategory }}"
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

Updates statuses by ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
UPDATE jira.workflows.statuses
SET 
statuses = '{{ statuses }}'
WHERE 
cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND statuses = '{{ statuses }}' --required;
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

Deletes statuses by ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Administer Jira* &#91;project permission.&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
DELETE FROM jira.workflows.statuses
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_all"
    values={[
        { label: 'list_all', value: 'list_all' }
    ]}
>
<TabItem value="list_all">

Returns a list of all statuses associated with active workflows.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;&#91;Permissions&#93;(#permissions) required: *Browse projects* &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) for the project.

```sql
EXEC jira.workflows.statuses.list_all 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
