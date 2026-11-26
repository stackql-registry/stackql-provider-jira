--- 
title: columns
hide_title: false
hide_table_of_contents: false
keywords:
  - columns
  - filters
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the columns resource in the jira filters service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>columns</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="columns" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.filters.columns" /></td></tr>
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

Details of an issue navigator column item.

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
    <td><CopyableCode code="label" /></td>
    <td><code>string</code></td>
    <td>The issue navigator column label.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The issue navigator column value.</td>
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
    <td>Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, column details are only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets the columns for a filter. Only navigable fields can be set as columns. Use &#91;Get fields&#93;(#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.&lt;br /&gt;&lt;br /&gt;Send the columns as a JSON request body, for example `&#123;"columns": &#91;"summary", "description"&#93;&#125;`. To remove all columns from the filter, send an empty `columns` array or omit `columns` from the request body.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, columns are only set for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Reset the user's column configuration for the filter to the default.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, columns are only reset for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
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
    <td><code>integer (int64)</code></td>
    <td>The ID of the filter.</td>
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

Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, column details are only returned for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
SELECT
label,
value
FROM jira.filters.columns
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
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

Sets the columns for a filter. Only navigable fields can be set as columns. Use &#91;Get fields&#93;(#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.&lt;br /&gt;&lt;br /&gt;Send the columns as a JSON request body, for example `&#123;"columns": &#91;"summary", "description"&#93;&#125;`. To remove all columns from the filter, send an empty `columns` array or omit `columns` from the request body.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, columns are only set for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
UPDATE jira.filters.columns
SET 
columns = '{{ columns }}'
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

Reset the user's column configuration for the filter to the default.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, columns are only reset for:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
DELETE FROM jira.filters.columns
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
