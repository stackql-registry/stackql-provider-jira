--- 
title: issue_type_screen_scheme_projects
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_type_screen_scheme_projects
  - issue_types
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_type_screen_scheme_projects resource in the jira issue_types service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_type_screen_scheme_projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_type_screen_scheme_projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_types.issue_type_screen_scheme_projects" /></td></tr>
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

Details about a project.

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
    <td>The ID of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The URLs of the project's avatars. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="project_category" /></td>
    <td><code>object</code></td>
    <td>The category the project belongs to. (wire: projectCategory)</td>
</tr>
<tr>
    <td><CopyableCode code="project_type_key" /></td>
    <td><code>string</code></td>
    <td>The &#91;project type&#93;(https:​//confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. (software, service_desk, business, product_discovery) (wire: projectTypeKey)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the project details.</td>
</tr>
<tr>
    <td><CopyableCode code="simplified" /></td>
    <td><code>boolean</code></td>
    <td>Whether or not the project is simplified.</td>
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
    <td><a href="#parameter-issue_type_screen_scheme_id"><code>issue_type_screen_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-query"><code>query</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of projects associated with an issue type screen scheme.&lt;br /&gt;&lt;br /&gt;Only company-managed projects associated with an issue type screen scheme are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-issue_type_screen_scheme_id">
    <td><CopyableCode code="issue_type_screen_scheme_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue type screen scheme. (wire: issueTypeScreenSchemeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
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

Returns a &#91;paginated&#93;(#pagination) list of projects associated with an issue type screen scheme.&lt;br /&gt;&lt;br /&gt;Only company-managed projects associated with an issue type screen scheme are returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

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
FROM jira.issue_types.issue_type_screen_scheme_projects
WHERE issue_type_screen_scheme_id = '{{ issue_type_screen_scheme_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND query = '{{ query }}'
;
```
</TabItem>
</Tabs>
