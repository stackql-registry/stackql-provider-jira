--- 
title: screen_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - screen_schemes
  - screens
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the screen_schemes resource in the jira screens service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>screen_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="screen_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.screens.screen_schemes" /></td></tr>
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

A screen scheme.

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
    <td>The ID of the screen scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the screen scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the screen scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_screen_schemes" /></td>
    <td><code>object</code></td>
    <td>Details of the issue type screen schemes associated with the screen scheme. (wire: issueTypeScreenSchemes)</td>
</tr>
<tr>
    <td><CopyableCode code="screens" /></td>
    <td><code>object</code></td>
    <td>The IDs of the screens for the screen types of the screen scheme.</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-query_string"><code>query_string</code></a>, <a href="#parameter-order_by"><code>order_by</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of screen schemes.&lt;br /&gt;&lt;br /&gt;Only screen schemes used in classic projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-screens"><code>screens</code></a></td>
    <td></td>
    <td>Creates a screen scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-screen_scheme_id"><code>screen_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a screen scheme. Only screen schemes used in classic projects can be updated.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-screen_scheme_id"><code>screen_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.&lt;br /&gt;&lt;br /&gt;Only screens schemes used in classic projects can be deleted.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-screen_scheme_id">
    <td><CopyableCode code="screen_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the screen scheme. (wire: screenSchemeId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) include additional information in the response. This parameter accepts `issueTypeScreenSchemes` that, for each screen schemes, returns information about the issue type screen scheme the screen scheme is assigned to.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of screen scheme IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `id` Sorts by screen scheme ID.  *  `name` Sorts by screen scheme name. (wire: orderBy)</td>
</tr>
<tr id="parameter-query_string">
    <td><CopyableCode code="query_string" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with screen scheme name. (wire: queryString)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of screen schemes.&lt;br /&gt;&lt;br /&gt;Only screen schemes used in classic projects are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
description,
issue_type_screen_schemes,
screens
FROM jira.screens.screen_schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND expand = '{{ expand }}'
AND query_string = '{{ query_string }}'
AND order_by = '{{ order_by }}'
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

Creates a screen scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.screens.screen_schemes (
description,
name,
screens,
cloud_id
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */,
'{{ screens }}' /* required */,
'{{ cloud_id }}'
RETURNING
id
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: screen_schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the screen_schemes resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the screen scheme. The maximum length is 255 characters.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the screen scheme. The name must be unique. The maximum length is 255 characters.
    - name: screens
      description: |
        The IDs of the screens for the screen types of the screen scheme. Only screens used in classic projects are accepted.
      value:
        create: {{ create }}
        default: {{ default }}
        edit: {{ edit }}
        view: {{ view }}
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

Updates a screen scheme. Only screen schemes used in classic projects can be updated.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.screens.screen_schemes
SET 
description = '{{ description }}',
name = '{{ name }}',
screens = '{{ screens }}'
WHERE 
screen_scheme_id = '{{ screen_scheme_id }}' --required
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

Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.&lt;br /&gt;&lt;br /&gt;Only screens schemes used in classic projects can be deleted.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.screens.screen_schemes
WHERE screen_scheme_id = '{{ screen_scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
