--- 
title: priority_scheme_priorities
hide_title: false
hide_table_of_contents: false
keywords:
  - priority_scheme_priorities
  - issue_attributes
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the priority_scheme_priorities resource in the jira issue_attributes service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>priority_scheme_priorities</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="priority_scheme_priorities" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_attributes.priority_scheme_priorities" /></td></tr>
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

An issue priority with sequence information.

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
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue priority.</td>
</tr>
<tr>
    <td><CopyableCode code="sequence" /></td>
    <td><code>string</code></td>
    <td>The sequence of the issue priority.</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of priorities by scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td><code>string</code></td>
    <td>The priority scheme ID. (wire: schemeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of priorities by scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
description,
icon_url,
is_default,
self,
sequence,
status_color
FROM jira.issue_attributes.priority_scheme_priorities
WHERE scheme_id = '{{ scheme_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
