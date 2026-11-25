--- 
title: issue_security_scheme_project_associations
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_security_scheme_project_associations
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_security_scheme_project_associations resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_security_scheme_project_associations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_security_scheme_project_associations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.issue_security_scheme_project_associations" /></td></tr>
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

Details about an project using security scheme mapping.

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
    <td><CopyableCode code="issue_security_scheme_id" /></td>
    <td><code>string</code></td>
    <td> (wire: issueSecuritySchemeId)</td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td> (wire: projectId)</td>
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
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-issue_security_scheme_id"><code>issue_security_scheme_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) mapping of projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the context of classic projects are supported. **&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#associate"><CopyableCode code="associate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-projectId"><code>projectId</code></a>, <a href="#parameter-schemeId"><code>schemeId</code></a></td>
    <td></td>
    <td>Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if provided.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-issue_security_scheme_id">
    <td><CopyableCode code="issue_security_scheme_id" /></td>
    <td><code>array</code></td>
    <td>The list of security scheme IDs to be filtered out. (wire: issueSecuritySchemeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The list of project IDs to be filtered out. (wire: projectId)</td>
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

Returns a paginated mapping of projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the context of classic projects are supported. **Permissions required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
issue_security_scheme_id,
project_id
FROM jira.permissions.issue_security_scheme_project_associations
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND issue_security_scheme_id = '{{ issue_security_scheme_id }}'
AND project_id = '{{ project_id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="associate"
    values={[
        { label: 'associate', value: 'associate' }
    ]}
>
<TabItem value="associate">

Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if provided.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.permissions.issue_security_scheme_project_associations.associate 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"oldToNewSecurityLevelMappings": "{{ oldToNewSecurityLevelMappings }}", 
"projectId": "{{ projectId }}", 
"schemeId": "{{ schemeId }}"
}'
;
```
</TabItem>
</Tabs>
