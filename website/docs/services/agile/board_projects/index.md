--- 
title: board_projects
hide_title: false
hide_table_of_contents: false
keywords:
  - board_projects
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the board_projects resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>board_projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="board_projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.board_projects" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td> (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_category" /></td>
    <td><code>object</code></td>
    <td> (wire: projectCategory)</td>
</tr>
<tr>
    <td><CopyableCode code="project_type_key" /></td>
    <td><code>string</code></td>
    <td> (wire: projectTypeKey)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="simplified" /></td>
    <td><code>boolean</code></td>
    <td></td>
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
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns all projects that are associated with the board, for the given board ID. If the user does not have permission to view the board, no projects will be returned at all. Returned projects are ordered by the name.&lt;br /&gt;&lt;br /&gt;A project is associated with a board if the board filter contains reference the project or there is an issue from the project that belongs to the board.&lt;br /&gt;&lt;br /&gt;The board filter contains reference the project only if JQL query guarantees that returned issues will be returned from the project set defined in JQL. For instance the query `project in (ABC, BCD) AND reporter = admin` have reference to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin` doesn't have reference to any project.&lt;br /&gt;&lt;br /&gt;An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belongs to the scrum boards.</td>
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
<tr id="parameter-board_id">
    <td><CopyableCode code="board_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the board that contains returned projects.</td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of projects to return per page. See the 'Pagination' section at the top of this page for more details. (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The starting index of the returned projects. Base index: 0. See the 'Pagination' section at the top of this page for more details. (wire: startAt)</td>
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

Returns all projects that are associated with the board, for the given board ID. If the user does not have permission to view the board, no projects will be returned at all. Returned projects are ordered by the name.&lt;br /&gt;&lt;br /&gt;A project is associated with a board if the board filter contains reference the project or there is an issue from the project that belongs to the board.&lt;br /&gt;&lt;br /&gt;The board filter contains reference the project only if JQL query guarantees that returned issues will be returned from the project set defined in JQL. For instance the query `project in (ABC, BCD) AND reporter = admin` have reference to ABC and BCD projects but query `project in (ABC, BCD) OR reporter = admin` doesn't have reference to any project.&lt;br /&gt;&lt;br /&gt;An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belongs to the scrum boards.

```sql
SELECT
id,
name,
avatar_urls,
key,
project_category,
project_type_key,
self,
simplified
FROM jira.agile.board_projects
WHERE board_id = '{{ board_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
