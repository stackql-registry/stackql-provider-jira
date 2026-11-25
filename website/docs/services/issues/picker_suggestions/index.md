--- 
title: picker_suggestions
hide_title: false
hide_table_of_contents: false
keywords:
  - picker_suggestions
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the picker_suggestions resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>picker_suggestions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="picker_suggestions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.picker_suggestions" /></td></tr>
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
    <td><code>string</code></td>
    <td>The ID of the type of issues suggested for use in auto-completion.</td>
</tr>
<tr>
    <td><CopyableCode code="issues" /></td>
    <td><code>array</code></td>
    <td>A list of issues suggested for use in auto-completion.</td>
</tr>
<tr>
    <td><CopyableCode code="label" /></td>
    <td><code>string</code></td>
    <td>The label of the type of issues suggested for use in auto-completion.</td>
</tr>
<tr>
    <td><CopyableCode code="msg" /></td>
    <td><code>string</code></td>
    <td>If no issue suggestions are found, returns a message indicating no suggestions were found,</td>
</tr>
<tr>
    <td><CopyableCode code="sub" /></td>
    <td><code>string</code></td>
    <td>If issue suggestions are found, returns a message indicating the number of issues suggestions found and returned.</td>
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
    <td><a href="#parameter-query"><code>query</code></a>, <a href="#parameter-current_jql"><code>current_jql</code></a>, <a href="#parameter-current_issue_key"><code>current_issue_key</code></a>, <a href="#parameter-current_project_id"><code>current_project_id</code></a>, <a href="#parameter-show_sub_tasks"><code>show_sub_tasks</code></a>, <a href="#parameter-show_sub_task_parent"><code>show_sub_task_parent</code></a></td>
    <td>Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the user is looking for an issue using a word or string.&lt;br /&gt;&lt;br /&gt;This operation returns two lists:&lt;br /&gt;&lt;br /&gt; *  `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain the string in the `query` parameter.&lt;br /&gt; *  `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the `query` parameter.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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
<tr id="parameter-current_issue_key">
    <td><CopyableCode code="current_issue_key" /></td>
    <td><code>string</code></td>
    <td>The key of an issue to exclude from search results. For example, the issue the user is viewing when they perform this query. (wire: currentIssueKey)</td>
</tr>
<tr id="parameter-current_jql">
    <td><CopyableCode code="current_jql" /></td>
    <td><code>string</code></td>
    <td>A JQL query defining a list of issues to search for the query term. Note that `username` and `userkey` cannot be used as search terms for this parameter, due to privacy reasons. Use `accountId` instead. (wire: currentJQL)</td>
</tr>
<tr id="parameter-current_project_id">
    <td><CopyableCode code="current_project_id" /></td>
    <td><code>string</code></td>
    <td>The ID of a project that suggested issues must belong to. (wire: currentProjectId)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>A string to match against text fields in the issue such as title, description, or comments.</td>
</tr>
<tr id="parameter-show_sub_task_parent">
    <td><CopyableCode code="show_sub_task_parent" /></td>
    <td><code>boolean</code></td>
    <td>When `currentIssueKey` is a subtask, whether to include the parent issue in the suggestions if it matches the query. (wire: showSubTaskParent)</td>
</tr>
<tr id="parameter-show_sub_tasks">
    <td><CopyableCode code="show_sub_tasks" /></td>
    <td><code>boolean</code></td>
    <td>Indicate whether to include subtasks in the suggestions list. (wire: showSubTasks)</td>
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

Returns lists of issues matching a query string. Use this resource to provide auto-completion suggestions when the user is looking for an issue using a word or string.&lt;br /&gt;&lt;br /&gt;This operation returns two lists:&lt;br /&gt;&lt;br /&gt; *  `History Search` which includes issues from the user's history of created, edited, or viewed issues that contain the string in the `query` parameter.&lt;br /&gt; *  `Current Search` which includes issues that match the JQL expression in `currentJQL` and contain the string in the `query` parameter.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
id,
issues,
label,
msg,
sub
FROM jira.issues.picker_suggestions
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND query = '{{ query }}'
AND current_jql = '{{ current_jql }}'
AND current_issue_key = '{{ current_issue_key }}'
AND current_project_id = '{{ current_project_id }}'
AND show_sub_tasks = '{{ show_sub_tasks }}'
AND show_sub_task_parent = '{{ show_sub_task_parent }}'
;
```
</TabItem>
</Tabs>
