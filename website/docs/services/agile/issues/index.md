--- 
title: issues
hide_title: false
hide_table_of_contents: false
keywords:
  - issues
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issues resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issues</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issues" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.issues" /></td></tr>
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

Returns the requested issue.

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
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-update_history"><code>update_history</code></a></td>
    <td>Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.</td>
</tr>
<tr>
    <td><a href="#rank"><CopyableCode code="rank" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.&lt;br /&gt;&lt;br /&gt;This operation may fail for some issues, although this will be rare. In that case the 207 status code is returned for the whole response and detailed information regarding each issue is available in the response body.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.</td>
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
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the requested issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>A comma-separated list of the parameters to expand.</td>
</tr>
<tr id="parameter-fields">
    <td><CopyableCode code="fields" /></td>
    <td><code>array</code></td>
    <td>The list of fields to return for each issue. By default, all navigable and Agile fields are returned.</td>
</tr>
<tr id="parameter-update_history">
    <td><CopyableCode code="update_history" /></td>
    <td><code>boolean</code></td>
    <td>A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history (wire: updateHistory)</td>
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

Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.

```sql
SELECT
id,
expand,
fields,
key,
self
FROM jira.agile.issues
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
AND update_history = '{{ update_history }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="rank"
    values={[
        { label: 'rank', value: 'rank' }
    ]}
>
<TabItem value="rank">

Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.&lt;br /&gt;&lt;br /&gt;This operation may fail for some issues, although this will be rare. In that case the 207 status code is returned for the whole response and detailed information regarding each issue is available in the response body.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.

```sql
EXEC jira.agile.issues.rank 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}", 
"rankAfterIssue": "{{ rankAfterIssue }}", 
"rankBeforeIssue": "{{ rankBeforeIssue }}", 
"rankCustomFieldId": {{ rankCustomFieldId }}
}'
;
```
</TabItem>
</Tabs>
