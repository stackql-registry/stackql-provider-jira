--- 
title: issue_panels
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_panels
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_panels resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_panels</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_panels" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.issue_panels" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#bulk_pin"><CopyableCode code="bulk_pin" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-moduleId"><code>moduleId</code></a>, <a href="#parameter-projectList"><code>projectList</code></a></td>
    <td></td>
    <td>Bulk pin or unpin an issue panel (added by a Forge app) to or from multiple projects.&lt;br /&gt;&lt;br /&gt;The operation runs asynchronously. The response includes a task ID - use the &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) endpoint to check progress.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#get_pin_status"><CopyableCode code="get_pin_status" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-moduleId"><code>moduleId</code></a>, <a href="#parameter-projectList"><code>projectList</code></a></td>
    <td></td>
    <td>Get the pin status of an issue panel (added by a Forge app) for multiple projects.&lt;br /&gt;&lt;br /&gt;The operation is read-only and runs synchronously. Projects that do not exist, or that you do not have permission to access, are returned in the response with the panel reported as not pinned and the reason in the `error` field; the request itself still succeeds.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
</tbody>
</table>

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="bulk_pin"
    values={[
        { label: 'bulk_pin', value: 'bulk_pin' },
        { label: 'get_pin_status', value: 'get_pin_status' }
    ]}
>
<TabItem value="bulk_pin">

Bulk pin or unpin an issue panel (added by a Forge app) to or from multiple projects.&lt;br /&gt;&lt;br /&gt;The operation runs asynchronously. The response includes a task ID - use the &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) endpoint to check progress.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.system.issue_panels.bulk_pin 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"moduleId": "{{ moduleId }}", 
"projectList": "{{ projectList }}"
}'
;
```
</TabItem>
<TabItem value="get_pin_status">

Get the pin status of an issue panel (added by a Forge app) for multiple projects.&lt;br /&gt;&lt;br /&gt;The operation is read-only and runs synchronously. Projects that do not exist, or that you do not have permission to access, are returned in the response with the panel reported as not pinned and the reason in the `error` field; the request itself still succeeds.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.system.issue_panels.get_pin_status 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"moduleId": "{{ moduleId }}", 
"projectList": "{{ projectList }}"
}'
;
```
</TabItem>
</Tabs>
