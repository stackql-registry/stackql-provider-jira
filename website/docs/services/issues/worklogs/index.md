--- 
title: worklogs
hide_title: false
hide_table_of_contents: false
keywords:
  - worklogs
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the worklogs resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>worklogs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="worklogs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.worklogs" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td>The ID of the worklog record.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue this worklog is for. (wire: issueId)</td>
</tr>
<tr>
    <td><CopyableCode code="author" /></td>
    <td><code>object</code></td>
    <td>Details of the user who created the worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>object</code></td>
    <td>A comment about the worklog in &#91;Atlassian Document Format&#93;(https:​//developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog was created.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>Details of properties for the worklog. Optional when creating or updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the worklog item.</td>
</tr>
<tr>
    <td><CopyableCode code="started" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="time_spent" /></td>
    <td><code>string</code></td>
    <td>The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m or \#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided. (wire: timeSpent)</td>
</tr>
<tr>
    <td><CopyableCode code="time_spent_seconds" /></td>
    <td><code>integer (int64)</code></td>
    <td>The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided. (wire: timeSpentSeconds)</td>
</tr>
<tr>
    <td><CopyableCode code="update_author" /></td>
    <td><code>object</code></td>
    <td>Details of the user who last updated the worklog. (wire: updateAuthor)</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog was last updated.</td>
</tr>
<tr>
    <td><CopyableCode code="visibility" /></td>
    <td><code>object</code></td>
    <td>Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of a worklog.

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
    <td>The ID of the worklog record.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue this worklog is for. (wire: issueId)</td>
</tr>
<tr>
    <td><CopyableCode code="author" /></td>
    <td><code>object</code></td>
    <td>Details of the user who created the worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="comment" /></td>
    <td><code>object</code></td>
    <td>A comment about the worklog in &#91;Atlassian Document Format&#93;(https:​//developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog was created.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>Details of properties for the worklog. Optional when creating or updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the worklog item.</td>
</tr>
<tr>
    <td><CopyableCode code="started" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog.</td>
</tr>
<tr>
    <td><CopyableCode code="time_spent" /></td>
    <td><code>string</code></td>
    <td>The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m or \#). Required when creating a worklog if `timeSpentSeconds` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpentSecond` is provided. (wire: timeSpent)</td>
</tr>
<tr>
    <td><CopyableCode code="time_spent_seconds" /></td>
    <td><code>integer (int64)</code></td>
    <td>The time in seconds spent working on the issue. Required when creating a worklog if `timeSpent` isn't provided. Optional when updating a worklog. Cannot be provided if `timeSpent` is provided. (wire: timeSpentSeconds)</td>
</tr>
<tr>
    <td><CopyableCode code="update_author" /></td>
    <td><code>object</code></td>
    <td>Details of the user who last updated the worklog. (wire: updateAuthor)</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string (date-time)</code></td>
    <td>The datetime on which the worklog was last updated.</td>
</tr>
<tr>
    <td><CopyableCode code="visibility" /></td>
    <td><code>object</code></td>
    <td>Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog.</td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a worklog.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-started_after"><code>started_after</code></a>, <a href="#parameter-started_before"><code>started_before</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns worklogs for an issue (ordered by created time), starting from the oldest worklog or from the worklog started on or after a date and time.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Workloads are only returned where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-notify_users"><code>notify_users</code></a>, <a href="#parameter-adjust_estimate"><code>adjust_estimate</code></a>, <a href="#parameter-new_estimate"><code>new_estimate</code></a>, <a href="#parameter-reduce_by"><code>reduce_by</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a></td>
    <td>Adds a worklog to an issue.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Work on issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-notify_users"><code>notify_users</code></a>, <a href="#parameter-adjust_estimate"><code>adjust_estimate</code></a>, <a href="#parameter-new_estimate"><code>new_estimate</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a></td>
    <td>Updates a worklog.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-notify_users"><code>notify_users</code></a>, <a href="#parameter-adjust_estimate"><code>adjust_estimate</code></a>, <a href="#parameter-new_estimate"><code>new_estimate</code></a>, <a href="#parameter-increase_by"><code>increase_by</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a></td>
    <td>Deletes a worklog from an issue.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user,&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#bulk_delete"><CopyableCode code="bulk_delete" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-ids"><code>ids</code></a></td>
    <td><a href="#parameter-adjustEstimate"><code>adjustEstimate</code></a>, <a href="#parameter-overrideEditableFlag"><code>overrideEditableFlag</code></a></td>
    <td>Deletes a list of worklogs from an issue. This is an experimental API with limitations:&lt;br /&gt;&lt;br /&gt; *  You can't delete more than 5000 worklogs at once.&lt;br /&gt; *  No notifications will be sent for deleted worklogs.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any worklog.&lt;br /&gt; *  If any worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#bulk_move"><CopyableCode code="bulk_move" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-adjustEstimate"><code>adjustEstimate</code></a>, <a href="#parameter-overrideEditableFlag"><code>overrideEditableFlag</code></a></td>
    <td>Moves a list of worklogs from one issue to another. This is an experimental API with several limitations:&lt;br /&gt;&lt;br /&gt; *  You can't move more than 5000 worklogs at once.&lt;br /&gt; *  You can't move worklogs containing an attachment.&lt;br /&gt; *  You can't move worklogs restricted by project roles.&lt;br /&gt; *  No notifications will be sent for moved worklogs.&lt;br /&gt; *  No webhooks or events will be sent for moved worklogs.&lt;br /&gt; *  No issue history will be recorded for moved worklogs.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the projects containing the source and destination issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Work on issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to log work on an issue, that is to create a worklog entry, if time tracking is enabled. This permission is required as a prerequisite for applying the other time-tracking permissions&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#list_by_ids"><CopyableCode code="list_by_ids" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-ids"><code>ids</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns worklog details for a list of worklog IDs.&lt;br /&gt;&lt;br /&gt;The returned list of worklogs is limited to 1000 items.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:&lt;br /&gt;&lt;br /&gt; *  the worklog is set as *Viewable by All Users*.&lt;br /&gt; *  the user is a member of a project role or group with permission to view the worklog.</td>
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
    <td><code>string</code></td>
    <td>The ID of the worklog.</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-adjustEstimate">
    <td><CopyableCode code="adjustEstimate" /></td>
    <td><code>string</code></td>
    <td>Defines how to update the issues' time estimate, the options are:   *  `leave` Leaves the estimate unchanged.  *  `auto` Reduces the estimate by the aggregate value of `timeSpent` across all worklogs being moved in the source issue, and increases it in the destination issue.</td>
</tr>
<tr id="parameter-adjust_estimate">
    <td><CopyableCode code="adjust_estimate" /></td>
    <td><code>string</code></td>
    <td>Defines how to update the issue's time estimate, the options are:   *  `new` Sets the estimate to a specific value, defined in `newEstimate`.  *  `leave` Leaves the estimate unchanged.  *  `manual` Increases the estimate by amount specified in `increaseBy`.  *  `auto` Reduces the estimate by the value of `timeSpent` in the worklog. (wire: adjustEstimate)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog.</td>
</tr>
<tr id="parameter-increase_by">
    <td><CopyableCode code="increase_by" /></td>
    <td><code>string</code></td>
    <td>The amount to increase the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `manual`. (wire: increaseBy)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-new_estimate">
    <td><CopyableCode code="new_estimate" /></td>
    <td><code>string</code></td>
    <td>The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when `adjustEstimate` is `new`. (wire: newEstimate)</td>
</tr>
<tr id="parameter-notify_users">
    <td><CopyableCode code="notify_users" /></td>
    <td><code>boolean</code></td>
    <td>Whether users watching the issue are notified by email. (wire: notifyUsers)</td>
</tr>
<tr id="parameter-overrideEditableFlag">
    <td><CopyableCode code="overrideEditableFlag" /></td>
    <td><code>boolean</code></td>
    <td>Whether the work log entry should be moved to and from the issues even if the issues are not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag.</td>
</tr>
<tr id="parameter-override_editable_flag">
    <td><CopyableCode code="override_editable_flag" /></td>
    <td><code>boolean</code></td>
    <td>Whether the work log entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with admin permission can use this flag. (wire: overrideEditableFlag)</td>
</tr>
<tr id="parameter-reduce_by">
    <td><CopyableCode code="reduce_by" /></td>
    <td><code>string</code></td>
    <td>The amount to reduce the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m). For example, *2d*. Required when `adjustEstimate` is `manual`. (wire: reduceBy)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-started_after">
    <td><CopyableCode code="started_after" /></td>
    <td><code>integer (int64)</code></td>
    <td>The worklog start date and time, as a UNIX timestamp in milliseconds, after which worklogs are returned. (wire: startedAfter)</td>
</tr>
<tr id="parameter-started_before">
    <td><CopyableCode code="started_before" /></td>
    <td><code>integer (int64)</code></td>
    <td>The worklog start date and time, as a UNIX timestamp in milliseconds, before which worklogs are returned. (wire: startedBefore)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a worklog.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
SELECT
id,
issue_id,
author,
comment,
created,
properties,
self,
started,
time_spent,
time_spent_seconds,
update_author,
updated,
visibility
FROM jira.issues.worklogs
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns worklogs for an issue (ordered by created time), starting from the oldest worklog or from the worklog started on or after a date and time.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Workloads are only returned where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
SELECT
id,
issue_id,
author,
comment,
created,
properties,
self,
started,
time_spent,
time_spent_seconds,
update_author,
updated,
visibility
FROM jira.issues.worklogs
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND started_after = '{{ started_after }}'
AND started_before = '{{ started_before }}'
AND expand = '{{ expand }}'
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

Adds a worklog to an issue.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Work on issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
INSERT INTO jira.issues.worklogs (
comment,
properties,
started,
time_spent,
time_spent_seconds,
visibility,
issue_id_or_key,
cloud_id,
notify_users,
adjust_estimate,
new_estimate,
reduce_by,
expand,
override_editable_flag
)
SELECT 
'{{ comment }}',
'{{ properties }}',
'{{ started }}',
'{{ time_spent }}',
{{ time_spent_seconds }},
'{{ visibility }}',
'{{ issue_id_or_key }}',
'{{ cloud_id }}',
'{{ notify_users }}',
'{{ adjust_estimate }}',
'{{ new_estimate }}',
'{{ reduce_by }}',
'{{ expand }}',
'{{ override_editable_flag }}'
RETURNING
id,
issue_id,
author,
comment,
created,
properties,
self,
started,
time_spent,
time_spent_seconds,
update_author,
updated,
visibility
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: worklogs
  props:
    - name: issue_id_or_key
      value: "{{ issue_id_or_key }}"
      description: Required parameter for the worklogs resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the worklogs resource.
    - name: comment
      value: "{{ comment }}"
      description: |
        A comment about the worklog in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/). Optional when creating or updating a worklog.
    - name: properties
      description: |
        Details of properties for the worklog. Optional when creating or updating a worklog.
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: started
      value: "{{ started }}"
      description: |
        The datetime on which the worklog effort was started. Required when creating a worklog. Optional when updating a worklog.
    - name: time_spent
      value: "{{ time_spent }}"
      description: |
        The time spent working on the issue as days (\#d), hours (\#h), or minutes (\#m or \#). Required when creating a worklog if \`timeSpentSeconds\` isn't provided. Optional when updating a worklog. Cannot be provided if \`timeSpentSecond\` is provided.
    - name: time_spent_seconds
      value: {{ time_spent_seconds }}
      description: |
        The time in seconds spent working on the issue. Required when creating a worklog if \`timeSpent\` isn't provided. Optional when updating a worklog. Cannot be provided if \`timeSpent\` is provided.
    - name: visibility
      description: |
        Details about any restrictions in the visibility of the worklog. Optional when creating or updating a worklog.
      value:
        identifier: "{{ identifier }}"
        type: "{{ type }}"
        value: "{{ value }}"
    - name: notify_users
      value: {{ notify_users }}
      description: Whether users watching the issue are notified by email.
      description: Whether users watching the issue are notified by email.
    - name: adjust_estimate
      value: "{{ adjust_estimate }}"
      description: Defines how to update the issue's time estimate, the options are:   *  \`new\` Sets the estimate to a specific value, defined in \`newEstimate\`.  *  \`leave\` Leaves the estimate unchanged.  *  \`manual\` Reduces the estimate by amount specified in \`reduceBy\`.  *  \`auto\` Reduces the estimate by the value of \`timeSpent\` in the worklog.
      description: Defines how to update the issue's time estimate, the options are:   *  \`new\` Sets the estimate to a specific value, defined in \`newEstimate\`.  *  \`leave\` Leaves the estimate unchanged.  *  \`manual\` Reduces the estimate by amount specified in \`reduceBy\`.  *  \`auto\` Reduces the estimate by the value of \`timeSpent\` in the worklog.
    - name: new_estimate
      value: "{{ new_estimate }}"
      description: The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when \`adjustEstimate\` is \`new\`.
      description: The value to set as the issue's remaining time estimate, as days (\#d), hours (\#h), or minutes (\#m or \#). For example, *2d*. Required when \`adjustEstimate\` is \`new\`.
    - name: reduce_by
      value: "{{ reduce_by }}"
      description: The amount to reduce the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m). For example, *2d*. Required when \`adjustEstimate\` is \`manual\`.
      description: The amount to reduce the issue's remaining estimate by, as days (\#d), hours (\#h), or minutes (\#m). For example, *2d*. Required when \`adjustEstimate\` is \`manual\`.
    - name: expand
      value: "{{ expand }}"
      description: Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts \`properties\`, which returns worklog properties.
      description: Use [expand](#expansion) to include additional information about work logs in the response. This parameter accepts \`properties\`, which returns worklog properties.
    - name: override_editable_flag
      value: {{ override_editable_flag }}
      description: Whether the worklog entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
      description: Whether the worklog entry should be added to the issue even if the issue is not editable, because jira.issue.editable set to false or missing. For example, the issue is closed. Connect and Forge app users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) can use this flag.
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

Updates a worklog.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to update any worklog or *Edit own worklogs* to update worklogs created by the user.&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
UPDATE jira.issues.worklogs
SET 
comment = '{{ comment }}',
properties = '{{ properties }}',
started = '{{ started }}',
time_spent = '{{ time_spent }}',
time_spent_seconds = {{ time_spent_seconds }},
visibility = '{{ visibility }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND notify_users = {{ notify_users}}
AND adjust_estimate = '{{ adjust_estimate}}'
AND new_estimate = '{{ new_estimate}}'
AND expand = '{{ expand}}'
AND override_editable_flag = {{ override_editable_flag}}
RETURNING
id,
issue_id,
author,
comment,
created,
properties,
self,
started,
time_spent,
time_spent_seconds,
update_author,
updated,
visibility;
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

Deletes a worklog from an issue.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any worklog or *Delete own worklogs* to delete worklogs created by the user,&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
DELETE FROM jira.issues.worklogs
WHERE issue_id_or_key = '{{ issue_id_or_key }}' --required
AND id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND notify_users = '{{ notify_users }}'
AND adjust_estimate = '{{ adjust_estimate }}'
AND new_estimate = '{{ new_estimate }}'
AND increase_by = '{{ increase_by }}'
AND override_editable_flag = '{{ override_editable_flag }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="bulk_delete"
    values={[
        { label: 'bulk_delete', value: 'bulk_delete' },
        { label: 'bulk_move', value: 'bulk_move' },
        { label: 'list_by_ids', value: 'list_by_ids' }
    ]}
>
<TabItem value="bulk_delete">

Deletes a list of worklogs from an issue. This is an experimental API with limitations:&lt;br /&gt;&lt;br /&gt; *  You can't delete more than 5000 worklogs at once.&lt;br /&gt; *  No notifications will be sent for deleted worklogs.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any worklog.&lt;br /&gt; *  If any worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
EXEC jira.issues.worklogs.bulk_delete 
@issue_id_or_key='{{ issue_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@adjustEstimate='{{ adjustEstimate }}', 
@overrideEditableFlag={{ overrideEditableFlag }} 
@@json=
'{
"ids": "{{ ids }}"
}'
;
```
</TabItem>
<TabItem value="bulk_move">

Moves a list of worklogs from one issue to another. This is an experimental API with several limitations:&lt;br /&gt;&lt;br /&gt; *  You can't move more than 5000 worklogs at once.&lt;br /&gt; *  You can't move worklogs containing an attachment.&lt;br /&gt; *  You can't move worklogs restricted by project roles.&lt;br /&gt; *  No notifications will be sent for moved worklogs.&lt;br /&gt; *  No webhooks or events will be sent for moved worklogs.&lt;br /&gt; *  No issue history will be recorded for moved worklogs.&lt;br /&gt;&lt;br /&gt;Time tracking must be enabled in Jira, otherwise this operation returns an error. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the projects containing the source and destination issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all worklogs* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)&lt;br /&gt; *  *Work on issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to log work on an issue, that is to create a worklog entry, if time tracking is enabled. This permission is required as a prerequisite for applying the other time-tracking permissions&lt;br /&gt; *  If the worklog has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
EXEC jira.issues.worklogs.bulk_move 
@issue_id_or_key='{{ issue_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@adjustEstimate='{{ adjustEstimate }}', 
@overrideEditableFlag={{ overrideEditableFlag }} 
@@json=
'{
"ids": "{{ ids }}", 
"issueIdOrKey": "{{ issueIdOrKey }}"
}'
;
```
</TabItem>
<TabItem value="list_by_ids">

Returns worklog details for a list of worklog IDs.&lt;br /&gt;&lt;br /&gt;The returned list of worklogs is limited to 1000 items.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, worklogs are only returned where either of the following is true:&lt;br /&gt;&lt;br /&gt; *  the worklog is set as *Viewable by All Users*.&lt;br /&gt; *  the user is a member of a project role or group with permission to view the worklog.

```sql
EXEC jira.issues.worklogs.list_by_ids 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}' 
@@json=
'{
"ids": "{{ ids }}"
}'
;
```
</TabItem>
</Tabs>
