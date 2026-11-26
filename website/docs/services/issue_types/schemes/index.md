--- 
title: schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - schemes
  - issue_types
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the schemes resource in the jira issue_types service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_types.schemes" /></td></tr>
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

Details of an issue type scheme.

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
    <td>The ID of the issue type scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue type scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="default_issue_type_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the default issue type of the issue type scheme. (wire: defaultIssueTypeId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue type scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether the issue type scheme is the default. (wire: isDefault)</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-query_string"><code>query_string</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of issue type schemes.&lt;br /&gt;&lt;br /&gt;Only issue type schemes used in classic projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issue_type_ids"><code>issue_type_ids</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_type_scheme_id"><code>issue_type_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_type_scheme_id"><code>issue_type_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes an issue type scheme.&lt;br /&gt;&lt;br /&gt;Only issue type schemes used in classic projects can be deleted. Only issue type schemes not associated with a project can be deleted&lt;br /&gt;&lt;br /&gt;A validation error will be returned if the specified scheme is associated with one or more projects. Use &#91;Get issue type scheme API&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-get) (with the projects expand, and id query parameter) to get a list of projects. Then, use &#91;Assign issue type scheme to project API&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-project-put) to associate all projects to another scheme before deleting.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#add_issue_types"><CopyableCode code="add_issue_types" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issue_type_scheme_id"><code>issue_type_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueTypeIds"><code>issueTypeIds</code></a></td>
    <td></td>
    <td>Adds issue types to an issue type scheme.&lt;br /&gt;&lt;br /&gt;The added issue types are appended to the issue types list.&lt;br /&gt;&lt;br /&gt;If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#reorder_issue_types"><CopyableCode code="reorder_issue_types" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issue_type_scheme_id"><code>issue_type_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueTypeIds"><code>issueTypeIds</code></a></td>
    <td></td>
    <td>Changes the order of issue types in an issue type scheme.&lt;br /&gt;&lt;br /&gt;The request body parameters must meet the following requirements:&lt;br /&gt;&lt;br /&gt; *  all of the issue types must belong to the issue type scheme.&lt;br /&gt; *  either `after` or `position` must be provided.&lt;br /&gt; *  the issue type in `after` must not be in the issue type list.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_issue_type"><CopyableCode code="remove_issue_type" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issue_type_scheme_id"><code>issue_type_scheme_id</code></a>, <a href="#parameter-issue_type_id"><code>issue_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes an issue type from an issue type scheme.&lt;br /&gt;&lt;br /&gt;This operation cannot remove:&lt;br /&gt;&lt;br /&gt; *  any issue type used by issues.&lt;br /&gt; *  any issue types from the default issue type scheme.&lt;br /&gt; *  the last standard issue type from an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-issue_type_id">
    <td><CopyableCode code="issue_type_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type.</td>
</tr>
<tr id="parameter-issue_type_scheme_id">
    <td><CopyableCode code="issue_type_scheme_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type scheme.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `projects` For each issue type schemes, returns information about the projects the issue type scheme is assigned to.  *  `issueTypes` For each issue type schemes, returns information about the issueTypes the issue type scheme have.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `name` Sorts by issue type scheme name.  *  `id` Sorts by issue type scheme ID. (wire: orderBy)</td>
</tr>
<tr id="parameter-query_string">
    <td><CopyableCode code="query_string" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with issue type scheme name. (wire: queryString)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
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

Returns a &#91;paginated&#93;(#pagination) list of issue type schemes.&lt;br /&gt;&lt;br /&gt;Only issue type schemes used in classic projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
default_issue_type_id,
description,
is_default
FROM jira.issue_types.schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND order_by = '{{ order_by }}'
AND expand = '{{ expand }}'
AND query_string = '{{ query_string }}'
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

Creates an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.issue_types.schemes (
default_issue_type_id,
description,
issue_type_ids,
name,
cloud_id
)
SELECT 
'{{ default_issue_type_id }}',
'{{ description }}',
'{{ issue_type_ids }}' /* required */,
'{{ name }}' /* required */,
'{{ cloud_id }}'
RETURNING
issue_type_scheme_id
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the schemes resource.
    - name: default_issue_type_id
      value: "{{ default_issue_type_id }}"
      description: |
        The ID of the default issue type of the issue type scheme. This ID must be included in \`issueTypeIds\`.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the issue type scheme. The maximum length is 4000 characters.
    - name: issue_type_ids
      value:
        - "{{ issue_type_ids }}"
      description: |
        The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the issue type scheme. The name must be unique. The maximum length is 255 characters.
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

Updates an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.issue_types.schemes
SET 
default_issue_type_id = '{{ default_issue_type_id }}',
description = '{{ description }}',
name = '{{ name }}'
WHERE 
issue_type_scheme_id = '{{ issue_type_scheme_id }}' --required
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

Deletes an issue type scheme.&lt;br /&gt;&lt;br /&gt;Only issue type schemes used in classic projects can be deleted. Only issue type schemes not associated with a project can be deleted&lt;br /&gt;&lt;br /&gt;A validation error will be returned if the specified scheme is associated with one or more projects. Use &#91;Get issue type scheme API&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-get) (with the projects expand, and id query parameter) to get a list of projects. Then, use &#91;Assign issue type scheme to project API&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-rest-api-3-issuetypescheme-project-put) to associate all projects to another scheme before deleting.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.issue_types.schemes
WHERE issue_type_scheme_id = '{{ issue_type_scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="add_issue_types"
    values={[
        { label: 'add_issue_types', value: 'add_issue_types' },
        { label: 'reorder_issue_types', value: 'reorder_issue_types' },
        { label: 'remove_issue_type', value: 'remove_issue_type' }
    ]}
>
<TabItem value="add_issue_types">

Adds issue types to an issue type scheme.&lt;br /&gt;&lt;br /&gt;The added issue types are appended to the issue types list.&lt;br /&gt;&lt;br /&gt;If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_types.schemes.add_issue_types 
@issue_type_scheme_id='{{ issue_type_scheme_id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueTypeIds": "{{ issueTypeIds }}"
}'
;
```
</TabItem>
<TabItem value="reorder_issue_types">

Changes the order of issue types in an issue type scheme.&lt;br /&gt;&lt;br /&gt;The request body parameters must meet the following requirements:&lt;br /&gt;&lt;br /&gt; *  all of the issue types must belong to the issue type scheme.&lt;br /&gt; *  either `after` or `position` must be provided.&lt;br /&gt; *  the issue type in `after` must not be in the issue type list.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_types.schemes.reorder_issue_types 
@issue_type_scheme_id='{{ issue_type_scheme_id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"after": "{{ after }}", 
"issueTypeIds": "{{ issueTypeIds }}", 
"position": "{{ position }}"
}'
;
```
</TabItem>
<TabItem value="remove_issue_type">

Removes an issue type from an issue type scheme.&lt;br /&gt;&lt;br /&gt;This operation cannot remove:&lt;br /&gt;&lt;br /&gt; *  any issue type used by issues.&lt;br /&gt; *  any issue types from the default issue type scheme.&lt;br /&gt; *  the last standard issue type from an issue type scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.issue_types.schemes.remove_issue_type 
@issue_type_scheme_id='{{ issue_type_scheme_id }}' --required, 
@issue_type_id='{{ issue_type_id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
