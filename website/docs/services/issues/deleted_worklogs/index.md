--- 
title: deleted_worklogs
hide_title: false
hide_table_of_contents: false
keywords:
  - deleted_worklogs
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the deleted_worklogs resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>deleted_worklogs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deleted_worklogs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.deleted_worklogs" /></td></tr>
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
    <td><CopyableCode code="worklog_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the worklog. (wire: worklogId)</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>Details of properties associated with the change.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_time" /></td>
    <td><code>integer (int64)</code></td>
    <td>The datetime of the change. (wire: updatedTime)</td>
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
    <td><a href="#parameter-since"><code>since</code></a></td>
    <td>Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.&lt;br /&gt;&lt;br /&gt;This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.&lt;br /&gt;&lt;br /&gt;This resource does not return worklogs deleted during the minute preceding the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
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
<tr id="parameter-since">
    <td><CopyableCode code="since" /></td>
    <td><code>integer (int64)</code></td>
    <td>The date and time, as a UNIX timestamp in milliseconds, after which deleted worklogs are returned.</td>
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

Returns a list of IDs and delete timestamps for worklogs deleted after a date and time.&lt;br /&gt;&lt;br /&gt;This resource is paginated, with a limit of 1000 worklogs per page. Each page lists worklogs from oldest to youngest. If the number of items in the date range exceeds 1000, `until` indicates the timestamp of the youngest item on the page. Also, `nextPage` provides the URL for the next page of worklogs. The `lastPage` parameter is set to true on the last page of worklogs.&lt;br /&gt;&lt;br /&gt;This resource does not return worklogs deleted during the minute preceding the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
worklog_id,
properties,
updated_time
FROM jira.issues.deleted_worklogs
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND since = '{{ since }}'
;
```
</TabItem>
</Tabs>
