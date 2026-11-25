--- 
title: tasks
hide_title: false
hide_table_of_contents: false
keywords:
  - tasks
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the tasks resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>tasks</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="tasks" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.tasks" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

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
    <td><code>string</code></td>
    <td>The ID of the task.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the task.</td>
</tr>
<tr>
    <td><CopyableCode code="elapsed_runtime" /></td>
    <td><code>integer (int64)</code></td>
    <td>The execution time of the task, in milliseconds. (wire: elapsedRuntime)</td>
</tr>
<tr>
    <td><CopyableCode code="finished" /></td>
    <td><code>integer (int64)</code></td>
    <td>A timestamp recording when the task was finished.</td>
</tr>
<tr>
    <td><CopyableCode code="last_update" /></td>
    <td><code>integer (int64)</code></td>
    <td>A timestamp recording when the task progress was last updated. (wire: lastUpdate)</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>Information about the progress of the task.</td>
</tr>
<tr>
    <td><CopyableCode code="progress" /></td>
    <td><code>integer (int64)</code></td>
    <td>The progress of the task, as a percentage complete.</td>
</tr>
<tr>
    <td><CopyableCode code="result" /></td>
    <td><code></code></td>
    <td>The result of the task execution.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the task.</td>
</tr>
<tr>
    <td><CopyableCode code="started" /></td>
    <td><code>integer (int64)</code></td>
    <td>A timestamp recording when the task was started.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the task. (ENQUEUED, RUNNING, COMPLETE, FAILED, CANCEL_REQUESTED, CANCELLED, DEAD)</td>
</tr>
<tr>
    <td><CopyableCode code="submitted" /></td>
    <td><code>integer (int64)</code></td>
    <td>A timestamp recording when the task was submitted.</td>
</tr>
<tr>
    <td><CopyableCode code="submitted_by" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the user who submitted the task. (wire: submittedBy)</td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-task_id"><code>task_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the status of a &#91;long-running asynchronous task&#93;(#async).&lt;br /&gt;&lt;br /&gt;When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the operation that created the task for details. Task details are not permanently retained. As of September 2019, details are retained for 14 days although this period may change without notice.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.&lt;br /&gt;&lt;br /&gt; *  `read:jira-work`&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  Creator of the task.</td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-taskId"><code>taskId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Cancels a task.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  Creator of the task.</td>
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
<tr id="parameter-taskId">
    <td><CopyableCode code="taskId" /></td>
    <td><code>string</code></td>
    <td>The ID of the task.</td>
</tr>
<tr id="parameter-task_id">
    <td><CopyableCode code="task_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the task. (wire: taskId)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Returns the status of a &#91;long-running asynchronous task&#93;(#async).&lt;br /&gt;&lt;br /&gt;When a task has finished, this operation returns the JSON blob applicable to the task. See the documentation of the operation that created the task for details. Task details are not permanently retained. As of September 2019, details are retained for 14 days although this period may change without notice.&lt;br /&gt;&lt;br /&gt;**Deprecation notice:** The required OAuth 2.0 scopes will be updated on June 15, 2024.&lt;br /&gt;&lt;br /&gt; *  `read:jira-work`&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  Creator of the task.

```sql
SELECT
id,
description,
elapsed_runtime,
finished,
last_update,
message,
progress,
result,
self,
started,
status,
submitted,
submitted_by
FROM jira.system.tasks
WHERE task_id = '{{ task_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' }
    ]}
>
<TabItem value="cancel">

Cancels a task.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  Creator of the task.

```sql
EXEC jira.system.tasks.cancel 
@taskId='{{ taskId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
