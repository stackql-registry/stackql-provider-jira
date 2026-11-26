--- 
title: priority_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - priority_schemes
  - issue_attributes
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the priority_schemes resource in the jira issue_attributes service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>priority_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="priority_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_attributes.priority_schemes" /></td></tr>
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

A priority scheme with paginated priorities and projects.

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
    <td>The ID of the priority scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the priority scheme</td>
</tr>
<tr>
    <td><CopyableCode code="default_priority_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the default issue priority. (wire: defaultPriorityId)</td>
</tr>
<tr>
    <td><CopyableCode code="default" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the priority scheme</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td> (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="priorities" /></td>
    <td><code>object</code></td>
    <td>The paginated list of priorities.</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>object</code></td>
    <td>The paginated list of projects.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the priority scheme.</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-priority_id"><code>priority_id</code></a>, <a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-scheme_name"><code>scheme_name</code></a>, <a href="#parameter-only_default"><code>only_default</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of priority schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-default_priority_id"><code>default_priority_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-priority_ids"><code>priority_ids</code></a></td>
    <td></td>
    <td>Creates a new priority scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a priority scheme. This includes its details, the lists of priorities and projects in it&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a priority scheme.&lt;br /&gt;&lt;br /&gt;This operation is only available for priority schemes without any associated projects. Any associated projects must be removed from the priority scheme before this operation can be performed.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#suggested_mappings"><CopyableCode code="suggested_mappings" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The priority scheme ID.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>A comma separated list of additional information to return. "priorities" will return priorities associated with the priority scheme. "projects" will return projects associated with the priority scheme. `expand=priorities,projects`.</td>
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
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>The ordering to return the priority schemes by. (wire: orderBy)</td>
</tr>
<tr id="parameter-priority_id">
    <td><CopyableCode code="priority_id" /></td>
    <td><code>array</code></td>
    <td>A set of priority IDs to filter by. To include multiple IDs, provide an ampersand-separated list. For example, `priorityId=10000&priorityId=10001`. (wire: priorityId)</td>
</tr>
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>array</code></td>
    <td>A set of priority scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `schemeId=10000&schemeId=10001`. (wire: schemeId)</td>
</tr>
<tr id="parameter-scheme_name">
    <td><CopyableCode code="scheme_name" /></td>
    <td><code>string</code></td>
    <td>The name of scheme to search for. (wire: schemeName)</td>
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
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of priority schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
default_priority_id,
default,
description,
is_default,
priorities,
projects,
self
FROM jira.issue_attributes.priority_schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND priority_id = '{{ priority_id }}'
AND scheme_id = '{{ scheme_id }}'
AND scheme_name = '{{ scheme_name }}'
AND only_default = '{{ only_default }}'
AND order_by = '{{ order_by }}'
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

Creates a new priority scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.issue_attributes.priority_schemes (
default_priority_id,
description,
mappings,
name,
priority_ids,
project_ids,
cloud_id
)
SELECT 
{{ default_priority_id }} /* required */,
'{{ description }}',
'{{ mappings }}',
'{{ name }}' /* required */,
'{{ priority_ids }}' /* required */,
'{{ project_ids }}',
'{{ cloud_id }}'
RETURNING
id,
task
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: priority_schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the priority_schemes resource.
    - name: default_priority_id
      value: {{ default_priority_id }}
      description: |
        The ID of the default priority for the priority scheme.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the priority scheme.
    - name: mappings
      description: |
        Instructions to migrate the priorities of issues.
        \`in\` mappings are used to migrate the priorities of issues to priorities used within the priority scheme.
        \`out\` mappings are used to migrate the priorities of issues to priorities not used within the priority scheme.
        *  When **priorities** are **added** to the new priority scheme, no mapping needs to be provided as the new priorities are not used by any issues.
        *  When **priorities** are **removed** from the new priority scheme, no mapping needs to be provided as the removed priorities are not used by any issues.
        *  When **projects** are **added** to the priority scheme, the priorities of issues in those projects might need to be migrated to new priorities used by the priority scheme. This can occur when the current scheme does not use all the priorities in the project(s)' priority scheme(s).
        *  An \`in\` mapping must be provided for each of these priorities.
        *  When **projects** are **removed** from the priority scheme, no mapping needs to be provided as the removed projects are not using the priorities of the new priority scheme.
        For more information on \`in\` and \`out\` mappings, see the child properties documentation for the \`PriorityMapping\` object below.
      value:
        in: "{{ in }}"
        out: "{{ out }}"
    - name: name
      value: "{{ name }}"
      description: |
        The name of the priority scheme. Must be unique.
    - name: priority_ids
      value:
        - {{ priority_ids }}
      description: |
        The IDs of priorities in the scheme.
    - name: project_ids
      value:
        - {{ project_ids }}
      description: |
        The IDs of projects that will use the priority scheme.
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

Updates a priority scheme. This includes its details, the lists of priorities and projects in it&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.issue_attributes.priority_schemes
SET 
default_priority_id = {{ default_priority_id }},
description = '{{ description }}',
mappings = '{{ mappings }}',
name = '{{ name }}',
priorities = '{{ priorities }}',
projects = '{{ projects }}'
WHERE 
scheme_id = '{{ scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
priority_scheme,
task;
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

Deletes a priority scheme.&lt;br /&gt;&lt;br /&gt;This operation is only available for priority schemes without any associated projects. Any associated projects must be removed from the priority scheme before this operation can be performed.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.issue_attributes.priority_schemes
WHERE scheme_id = '{{ scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="suggested_mappings"
    values={[
        { label: 'suggested_mappings', value: 'suggested_mappings' }
    ]}
>
<TabItem value="suggested_mappings">

Returns a &#91;paginated&#93;(#pagination) list of priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_attributes.priority_schemes.suggested_mappings 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"maxResults": {{ maxResults }}, 
"priorities": "{{ priorities }}", 
"projects": "{{ projects }}", 
"schemeId": {{ schemeId }}, 
"startAt": {{ startAt }}
}'
;
```
</TabItem>
</Tabs>
