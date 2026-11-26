--- 
title: bulk_tasks
hide_title: false
hide_table_of_contents: false
keywords:
  - bulk_tasks
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the bulk_tasks resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>bulk_tasks</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="bulk_tasks" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.bulk_tasks" /></td></tr>
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
    <td><CopyableCode code="task_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the task. (wire: taskId)</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>A timestamp of when the task was submitted.</td>
</tr>
<tr>
    <td><CopyableCode code="failed_accessible_issues" /></td>
    <td><code>object</code></td>
    <td>Map of issue IDs for which the operation failed and that the user has permission to view, to their one or more reasons for failure. These reasons are open-ended text descriptions of the error and are not selected from a predefined list of standard reasons. (wire: failedAccessibleIssues)</td>
</tr>
<tr>
    <td><CopyableCode code="invalid_or_inaccessible_issue_count" /></td>
    <td><code>integer (int32)</code></td>
    <td>The number of issues that are either invalid or issues that the user doesn't have permission to view, regardless of the success or failure of the operation. (wire: invalidOrInaccessibleIssueCount)</td>
</tr>
<tr>
    <td><CopyableCode code="processed_accessible_issues" /></td>
    <td><code>array</code></td>
    <td>List of issue IDs for which the operation was successful and that the user has permission to view. (wire: processedAccessibleIssues)</td>
</tr>
<tr>
    <td><CopyableCode code="progress_percent" /></td>
    <td><code>integer (int64)</code></td>
    <td>Progress of the task as a percentage. (wire: progressPercent)</td>
</tr>
<tr>
    <td><CopyableCode code="started" /></td>
    <td><code>string (date-time)</code></td>
    <td>A timestamp of when the task was started.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The status of the task. (ENQUEUED, RUNNING, COMPLETE, FAILED, CANCEL_REQUESTED, CANCELLED, DEAD)</td>
</tr>
<tr>
    <td><CopyableCode code="submitted_by" /></td>
    <td><code>object</code></td>
    <td>A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:   *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).  *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.  *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values. (wire: submittedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="total_issue_count" /></td>
    <td><code>integer (int32)</code></td>
    <td>The number of issues that the bulk operation was attempted on. (wire: totalIssueCount)</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string (date-time)</code></td>
    <td>A timestamp of when the task progress was last updated.</td>
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
    <td>Use this to get the progress state for the specified bulk operation `taskId`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt;&lt;br /&gt;If the task is running, this resource will return:&lt;br /&gt;&lt;br /&gt;    &#123;"taskId":"10779","status":"RUNNING","progressPercent":65,"submittedBy":&#123;"accountId":"5b10a2844c20165700ede21g"&#125;,"created":1690180055963,"started":1690180056206,"updated":169018005829&#125;&lt;br /&gt;&lt;br /&gt;If the task has completed, then this resource will return:&lt;br /&gt;&lt;br /&gt;    &#123;"processedAccessibleIssues":&#91;10001,10002&#93;,"created":1709189449954,"progressPercent":100,"started":1709189450154,"status":"COMPLETE","submittedBy":&#123;"accountId":"5b10a2844c20165700ede21g"&#125;,"invalidOrInaccessibleIssueCount":0,"taskId":"10000","totalIssueCount":2,"updated":1709189450354&#125;&lt;br /&gt;&lt;br /&gt;**Note:** You can view task progress for up to 14 days from creation.</td>
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
<tr id="parameter-task_id">
    <td><CopyableCode code="task_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the task.</td>
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

Use this to get the progress state for the specified bulk operation `taskId`.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt;&lt;br /&gt;If the task is running, this resource will return:&lt;br /&gt;&lt;br /&gt;    &#123;"taskId":"10779","status":"RUNNING","progressPercent":65,"submittedBy":&#123;"accountId":"5b10a2844c20165700ede21g"&#125;,"created":1690180055963,"started":1690180056206,"updated":169018005829&#125;&lt;br /&gt;&lt;br /&gt;If the task has completed, then this resource will return:&lt;br /&gt;&lt;br /&gt;    &#123;"processedAccessibleIssues":&#91;10001,10002&#93;,"created":1709189449954,"progressPercent":100,"started":1709189450154,"status":"COMPLETE","submittedBy":&#123;"accountId":"5b10a2844c20165700ede21g"&#125;,"invalidOrInaccessibleIssueCount":0,"taskId":"10000","totalIssueCount":2,"updated":1709189450354&#125;&lt;br /&gt;&lt;br /&gt;**Note:** You can view task progress for up to 14 days from creation.

```sql
SELECT
task_id,
created,
failed_accessible_issues,
invalid_or_inaccessible_issue_count,
processed_accessible_issues,
progress_percent,
started,
status,
submitted_by,
total_issue_count,
updated
FROM jira.issues.bulk_tasks
WHERE task_id = '{{ task_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
