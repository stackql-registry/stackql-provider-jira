--- 
title: audit_records
hide_title: false
hide_table_of_contents: false
keywords:
  - audit_records
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the audit_records resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>audit_records</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="audit_records" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.audit_records" /></td></tr>
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

An audit record.

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
    <td>The ID of the audit record.</td>
</tr>
<tr>
    <td><CopyableCode code="associated_items" /></td>
    <td><code>array</code></td>
    <td>The list of items associated with the changed record. (wire: associatedItems)</td>
</tr>
<tr>
    <td><CopyableCode code="author_key" /></td>
    <td><code>string</code></td>
    <td>Deprecated, use `authorAccountId` instead. The key of the user who created the audit record. (wire: authorKey)</td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td>The category of the audit record. For a list of these categories, see the help article &#91;Auditing in Jira applications&#93;(https:​//confluence.atlassian.com/x/noXKM).</td>
</tr>
<tr>
    <td><CopyableCode code="changed_values" /></td>
    <td><code>array</code></td>
    <td>The list of values changed in the record event. (wire: changedValues)</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time on which the audit record was created.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the audit record.</td>
</tr>
<tr>
    <td><CopyableCode code="event_source" /></td>
    <td><code>string</code></td>
    <td>The event the audit record originated from. (wire: eventSource)</td>
</tr>
<tr>
    <td><CopyableCode code="object_item" /></td>
    <td><code>object</code></td>
    <td>Details of an item associated with the changed record. (wire: objectItem)</td>
</tr>
<tr>
    <td><CopyableCode code="remote_address" /></td>
    <td><code>string</code></td>
    <td>The URL of the computer where the creation of the audit record was initiated. (wire: remoteAddress)</td>
</tr>
<tr>
    <td><CopyableCode code="summary" /></td>
    <td><code>string</code></td>
    <td>The summary of the audit record.</td>
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
    <td><a href="#parameter-offset"><code>offset</code></a>, <a href="#parameter-limit"><code>limit</code></a>, <a href="#parameter-filter"><code>filter</code></a>, <a href="#parameter-from"><code>from</code></a>, <a href="#parameter-to"><code>to</code></a></td>
    <td>Returns a list of audit records. The list can be filtered to include items:&lt;br /&gt;&lt;br /&gt; *  where each item in `filter` has at least one match in any of these fields:&lt;br /&gt;    &lt;br /&gt;     *  `summary`&lt;br /&gt;     *  `category`&lt;br /&gt;     *  `eventSource`&lt;br /&gt;     *  `objectItem.name` If the object is a user, account ID is available to filter.&lt;br /&gt;     *  `objectItem.parentName`&lt;br /&gt;     *  `objectItem.typeName`&lt;br /&gt;     *  `changedValues.changedFrom`&lt;br /&gt;     *  `changedValues.changedTo`&lt;br /&gt;     *  `remoteAddress`&lt;br /&gt;    &lt;br /&gt;    For example, if `filter` contains *man ed*, an audit record containing `summary": "User added to group"` and `"category": "group management"` is returned.&lt;br /&gt; *  created on or after a date and time.&lt;br /&gt; *  created or or before a date and time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>The strings to match with audit field content, space separated.</td>
</tr>
<tr id="parameter-from">
    <td><CopyableCode code="from" /></td>
    <td><code>string</code></td>
    <td>The date and time on or after which returned audit records must have been created. If `to` is provided `from` must be before `to` or no audit records are returned.</td>
</tr>
<tr id="parameter-limit">
    <td><CopyableCode code="limit" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of results to return.</td>
</tr>
<tr id="parameter-offset">
    <td><CopyableCode code="offset" /></td>
    <td><code>integer (int32)</code></td>
    <td>The number of records to skip before returning the first result.</td>
</tr>
<tr id="parameter-to">
    <td><CopyableCode code="to" /></td>
    <td><code>string</code></td>
    <td>The date and time on or before which returned audit results must have been created. If `from` is provided `to` must be after `from` or no audit records are returned.</td>
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

Returns a list of audit records. The list can be filtered to include items:&lt;br /&gt;&lt;br /&gt; *  where each item in `filter` has at least one match in any of these fields:&lt;br /&gt;    &lt;br /&gt;     *  `summary`&lt;br /&gt;     *  `category`&lt;br /&gt;     *  `eventSource`&lt;br /&gt;     *  `objectItem.name` If the object is a user, account ID is available to filter.&lt;br /&gt;     *  `objectItem.parentName`&lt;br /&gt;     *  `objectItem.typeName`&lt;br /&gt;     *  `changedValues.changedFrom`&lt;br /&gt;     *  `changedValues.changedTo`&lt;br /&gt;     *  `remoteAddress`&lt;br /&gt;    &lt;br /&gt;    For example, if `filter` contains *man ed*, an audit record containing `summary": "User added to group"` and `"category": "group management"` is returned.&lt;br /&gt; *  created on or after a date and time.&lt;br /&gt; *  created or or before a date and time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
associated_items,
author_key,
category,
changed_values,
created,
description,
event_source,
object_item,
remote_address,
summary
FROM jira.system.audit_records
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND offset = '{{ offset }}'
AND limit = '{{ limit }}'
AND filter = '{{ filter }}'
AND from = '{{ from }}'
AND to = '{{ to }}'
;
```
</TabItem>
</Tabs>
