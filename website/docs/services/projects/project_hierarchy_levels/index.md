--- 
title: project_hierarchy_levels
hide_title: false
hide_table_of_contents: false
keywords:
  - project_hierarchy_levels
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the project_hierarchy_levels resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>project_hierarchy_levels</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_hierarchy_levels" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.project_hierarchy_levels" /></td></tr>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue type hierarchy level.</td>
</tr>
<tr>
    <td><CopyableCode code="entity_id" /></td>
    <td><code>string (uuid)</code></td>
    <td>The ID of the issue type hierarchy level. This property is deprecated, see &#91;Change notice: Removing hierarchy level IDs from next-gen APIs&#93;(https:​//developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/). (wire: entityId)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>array</code></td>
    <td>The list of issue types in the hierarchy level. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="level" /></td>
    <td><code>integer (int32)</code></td>
    <td>The level of the issue type hierarchy level.</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Get the issue type hierarchy for a next-gen project.&lt;br /&gt;&lt;br /&gt;The issue type hierarchy for a project consists of:&lt;br /&gt;&lt;br /&gt; *  *Epic* at level 1 (optional).&lt;br /&gt; *  One or more issue types at level 0 such as *Story*, *Task*, or *Bug*. Where the issue type *Epic* is defined, these issue types are used to break down the content of an epic.&lt;br /&gt; *  *Subtask* at level -1 (optional). This issue type enables level 0 issue types to be broken down into components. Issues based on a level -1 issue type must have a parent issue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project. (wire: projectId)</td>
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

Get the issue type hierarchy for a next-gen project.&lt;br /&gt;&lt;br /&gt;The issue type hierarchy for a project consists of:&lt;br /&gt;&lt;br /&gt; *  *Epic* at level 1 (optional).&lt;br /&gt; *  One or more issue types at level 0 such as *Story*, *Task*, or *Bug*. Where the issue type *Epic* is defined, these issue types are used to break down the content of an epic.&lt;br /&gt; *  *Subtask* at level -1 (optional). This issue type enables level 0 issue types to be broken down into components. Issues based on a level -1 issue type must have a parent issue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
name,
entity_id,
issue_types,
level
FROM jira.projects.project_hierarchy_levels
WHERE project_id = '{{ project_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
