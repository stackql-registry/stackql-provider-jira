--- 
title: all_screen_tabs
hide_title: false
hide_table_of_contents: false
keywords:
  - all_screen_tabs
  - screens
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the all_screen_tabs resource in the jira screens service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>all_screen_tabs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="all_screen_tabs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.screens.all_screen_tabs" /></td></tr>
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

Synthesized from the vendor example (fix class response_schema_from_example).

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
    <td><CopyableCode code="screen_id" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: screenId)</td>
</tr>
<tr>
    <td><CopyableCode code="tab_id" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: tabId)</td>
</tr>
<tr>
    <td><CopyableCode code="tab_name" /></td>
    <td><code>string</code></td>
    <td> (wire: tabName)</td>
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
    <td><a href="#parameter-screen_id"><code>screen_id</code></a>, <a href="#parameter-tab_id"><code>tab_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_result"><code>max_result</code></a></td>
    <td>Returns the list of tabs for a bulk of screens.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-max_result">
    <td><CopyableCode code="max_result" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. The maximum number is 100, (wire: maxResult)</td>
</tr>
<tr id="parameter-screen_id">
    <td><CopyableCode code="screen_id" /></td>
    <td><code>array</code></td>
    <td>The list of screen IDs. To include multiple screen IDs, provide an ampersand-separated list. For example, `screenId=10000&screenId=10001`. (wire: screenId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-tab_id">
    <td><CopyableCode code="tab_id" /></td>
    <td><code>array</code></td>
    <td>The list of tab IDs. To include multiple tab IDs, provide an ampersand-separated list. For example, `tabId=10000&tabId=10001`. (wire: tabId)</td>
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

Returns the list of tabs for a bulk of screens.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
screen_id,
tab_id,
tab_name
FROM jira.screens.all_screen_tabs
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND screen_id = '{{ screen_id }}'
AND tab_id = '{{ tab_id }}'
AND start_at = '{{ start_at }}'
AND max_result = '{{ max_result }}'
;
```
</TabItem>
</Tabs>
