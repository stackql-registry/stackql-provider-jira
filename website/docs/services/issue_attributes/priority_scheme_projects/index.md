--- 
title: priority_scheme_projects
hide_title: false
hide_table_of_contents: false
keywords:
  - priority_scheme_projects
  - issue_attributes
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the priority_scheme_projects resource in the jira issue_attributes service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>priority_scheme_projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="priority_scheme_projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issue_attributes.priority_scheme_projects" /></td></tr>
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
    <td><CopyableCode code="archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is archived.</td>
</tr>
<tr>
    <td><CopyableCode code="archived_by" /></td>
    <td><code>object</code></td>
    <td>The user who archived the project. (wire: archivedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="archived_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was archived. (wire: archivedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="assignee_type" /></td>
    <td><code>string</code></td>
    <td>The default assignee when creating issues for this project. (PROJECT_LEAD, UNASSIGNED) (wire: assigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The URLs of the project's avatars. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="components" /></td>
    <td><code>array</code></td>
    <td>List of the components contained in the project.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is marked as deleted.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_by" /></td>
    <td><code>object</code></td>
    <td>The user who marked the project as deleted. (wire: deletedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was marked as deleted. (wire: deletedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A brief description of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>An email address associated with the project.</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="insight" /></td>
    <td><code>object</code></td>
    <td>Insights about the project.</td>
</tr>
<tr>
    <td><CopyableCode code="is_private" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is private from the user's perspective. This means the user can't see the project or any associated issues. (wire: isPrivate)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_hierarchy" /></td>
    <td><code>object</code></td>
    <td>The issue type hierarchy for the project. (wire: issueTypeHierarchy)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>array</code></td>
    <td>List of the issue types available in the project. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="landing_page_info" /></td>
    <td><code>object</code></td>
    <td>The project landing page info. (wire: landingPageInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="lead" /></td>
    <td><code>object</code></td>
    <td>The username of the project lead.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>object</code></td>
    <td>User permissions on the project</td>
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
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Map of project properties. Only the properties named in the request's properties query parameter are returned, so this is an empty object when that parameter is omitted.</td>
</tr>
<tr>
    <td><CopyableCode code="retention_till_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project is deleted permanently. (wire: retentionTillDate)</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>object</code></td>
    <td>The name and self URL for each role defined in the project. For more information, see &#91;Create project role&#93;(#api-rest-api-3-role-post).</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the project details.</td>
</tr>
<tr>
    <td><CopyableCode code="simplified" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is simplified.</td>
</tr>
<tr>
    <td><CopyableCode code="style" /></td>
    <td><code>string</code></td>
    <td>The type of the project. (classic, next-gen)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>A link to information about this project, such as project documentation.</td>
</tr>
<tr>
    <td><CopyableCode code="uuid" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects.</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td>The versions defined in the project. For more information, see &#91;Create version&#93;(#api-rest-api-3-version-post).</td>
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
    <td><a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-query"><code>query</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of projects by scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>string</code></td>
    <td>The priority scheme ID.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The project IDs to filter by. For example, `projectId=10000&projectId=10001`. (wire: projectId)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>The string to query projects on by name.</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>string</code></td>
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

Returns a &#91;paginated&#93;(#pagination) list of projects by scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
archived,
archived_by,
archived_date,
assignee_type,
avatar_urls,
components,
deleted,
deleted_by,
deleted_date,
description,
email,
favourite,
insight,
is_private,
issue_type_hierarchy,
issue_types,
key,
landing_page_info,
lead,
permissions,
project_category,
project_type_key,
properties,
retention_till_date,
roles,
self,
simplified,
style,
url,
uuid,
versions
FROM jira.issue_attributes.priority_scheme_projects
WHERE scheme_id = '{{ scheme_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND project_id = '{{ project_id }}'
AND query = '{{ query }}'
;
```
</TabItem>
</Tabs>
