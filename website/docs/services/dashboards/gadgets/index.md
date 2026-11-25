--- 
title: gadgets
hide_title: false
hide_table_of_contents: false
keywords:
  - gadgets
  - dashboards
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the gadgets resource in the jira dashboards service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>gadgets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="gadgets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.dashboards.gadgets" /></td></tr>
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
    <td>The ID of the gadget instance.</td>
</tr>
<tr>
    <td><CopyableCode code="color" /></td>
    <td><code>string</code></td>
    <td>The color of the gadget. Should be one of `blue`, `red`, `yellow`, `green`, `cyan`, `purple`, `gray`, or `white`. (blue, red, yellow, green, cyan, purple, gray, white)</td>
</tr>
<tr>
    <td><CopyableCode code="module_key" /></td>
    <td><code>string</code></td>
    <td>The module key of the gadget type. (wire: moduleKey)</td>
</tr>
<tr>
    <td><CopyableCode code="position" /></td>
    <td><code>object</code></td>
    <td>The position of the gadget.</td>
</tr>
<tr>
    <td><CopyableCode code="title" /></td>
    <td><code>string</code></td>
    <td>The title of the gadget.</td>
</tr>
<tr>
    <td><CopyableCode code="uri" /></td>
    <td><code>string</code></td>
    <td>The URI of the gadget type.</td>
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
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-module_key"><code>module_key</code></a>, <a href="#parameter-uri"><code>uri</code></a>, <a href="#parameter-gadget_id"><code>gadget_id</code></a></td>
    <td>Returns a list of dashboard gadgets on a dashboard.&lt;br /&gt;&lt;br /&gt;This operation returns:&lt;br /&gt;&lt;br /&gt; *  Gadgets from a list of IDs, when `id` is set.&lt;br /&gt; *  Gadgets with a module key, when `moduleKey` is set.&lt;br /&gt; *  Gadgets from a list of URIs, when `uri` is set.&lt;br /&gt; *  All gadgets, when no other parameters are set.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Adds a gadget to a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-gadget_id"><code>gadget_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Changes the title, position, and color of the gadget on a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-gadget_id"><code>gadget_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes a dashboard gadget from a dashboard.&lt;br /&gt;&lt;br /&gt;When a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied position.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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
<tr id="parameter-dashboard_id">
    <td><CopyableCode code="dashboard_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the dashboard. (wire: dashboardId)</td>
</tr>
<tr id="parameter-gadget_id">
    <td><CopyableCode code="gadget_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the gadget. (wire: gadgetId)</td>
</tr>
<tr id="parameter-gadget_id">
    <td><CopyableCode code="gadget_id" /></td>
    <td><code>array</code></td>
    <td>The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`. (wire: gadgetId)</td>
</tr>
<tr id="parameter-module_key">
    <td><CopyableCode code="module_key" /></td>
    <td><code>array</code></td>
    <td>The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand: `moduleKey=key:one&moduleKey=key:two`. (wire: moduleKey)</td>
</tr>
<tr id="parameter-uri">
    <td><CopyableCode code="uri" /></td>
    <td><code>array</code></td>
    <td>The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand: `uri=/rest/example/uri/1&uri=/rest/example/uri/2`.</td>
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

Returns a list of dashboard gadgets on a dashboard.&lt;br /&gt;&lt;br /&gt;This operation returns:&lt;br /&gt;&lt;br /&gt; *  Gadgets from a list of IDs, when `id` is set.&lt;br /&gt; *  Gadgets with a module key, when `moduleKey` is set.&lt;br /&gt; *  Gadgets from a list of URIs, when `uri` is set.&lt;br /&gt; *  All gadgets, when no other parameters are set.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
id,
color,
module_key,
position,
title,
uri
FROM jira.dashboards.gadgets
WHERE dashboard_id = '{{ dashboard_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND module_key = '{{ module_key }}'
AND uri = '{{ uri }}'
AND gadget_id = '{{ gadget_id }}'
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

Adds a gadget to a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
INSERT INTO jira.dashboards.gadgets (
color,
ignore_uri_and_module_key_validation,
module_key,
position,
title,
uri,
dashboard_id,
cloud_id
)
SELECT 
'{{ color }}',
{{ ignore_uri_and_module_key_validation }},
'{{ module_key }}',
'{{ position }}',
'{{ title }}',
'{{ uri }}',
'{{ dashboard_id }}',
'{{ cloud_id }}'
RETURNING
id,
color,
module_key,
position,
title,
uri
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: gadgets
  props:
    - name: dashboard_id
      value: "{{ dashboard_id }}"
      description: Required parameter for the gadgets resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the gadgets resource.
    - name: color
      value: "{{ color }}"
      description: |
        The color of the gadget. Should be one of \`blue\`, \`red\`, \`yellow\`, \`green\`, \`cyan\`, \`purple\`, \`gray\`, or \`white\`.
    - name: ignore_uri_and_module_key_validation
      value: {{ ignore_uri_and_module_key_validation }}
      description: |
        Whether to ignore the validation of module key and URI. For example, when a gadget is created that is a part of an application that isn't installed.
    - name: module_key
      value: "{{ module_key }}"
      description: |
        The module key of the gadget type. Can't be provided with \`uri\`.
    - name: position
      description: |
        The position of the gadget. When the gadget is placed into the position, other gadgets in the same column are moved down to accommodate it.
      value:
        The column position of the gadget.: {{ The column position of the gadget. }}
        The row position of the gadget.: {{ The row position of the gadget. }}
    - name: title
      value: "{{ title }}"
      description: |
        The title of the gadget.
    - name: uri
      value: "{{ uri }}"
      description: |
        The URI of the gadget type. Can't be provided with \`moduleKey\`.
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

Changes the title, position, and color of the gadget on a dashboard.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
UPDATE jira.dashboards.gadgets
SET 
color = '{{ color }}',
position = '{{ position }}',
title = '{{ title }}'
WHERE 
dashboard_id = '{{ dashboard_id }}' --required
AND gadget_id = '{{ gadget_id }}' --required
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

Removes a dashboard gadget from a dashboard.&lt;br /&gt;&lt;br /&gt;When a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied position.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
DELETE FROM jira.dashboards.gadgets
WHERE dashboard_id = '{{ dashboard_id }}' --required
AND gadget_id = '{{ gadget_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
