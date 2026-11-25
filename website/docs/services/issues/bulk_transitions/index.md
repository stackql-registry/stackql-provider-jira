--- 
title: bulk_transitions
hide_title: false
hide_table_of_contents: false
keywords:
  - bulk_transitions
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the bulk_transitions resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>bulk_transitions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="bulk_transitions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.bulk_transitions" /></td></tr>
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
    <td><CopyableCode code="is_transitions_filtered" /></td>
    <td><code>boolean</code></td>
    <td>Indicates whether all the transitions of this workflow are available in the transitions list or not. (wire: isTransitionsFiltered)</td>
</tr>
<tr>
    <td><CopyableCode code="issues" /></td>
    <td><code>array</code></td>
    <td>List of issue keys from the request which are associated with this workflow.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>List of transitions available for issues from the request which are associated with this workflow.   **This list includes only those transitions that are common across the issues in this workflow and do not involve any additional field updates.** </td>
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
    <td><a href="#parameter-issue_ids_or_keys"><code>issue_ids_or_keys</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-ending_before"><code>ending_before</code></a>, <a href="#parameter-starting_after"><code>starting_after</code></a></td>
    <td>Use this API to retrieve a list of transitions available for the specified issues that can be used or bulk transition operations. You can submit either single or multiple issues in the query to obtain the available transitions.&lt;br /&gt;&lt;br /&gt;The response will provide the available transitions for issues, organized by their respective workflows. **Only the transitions that are common among the issues within that workflow and do not involve any additional field updates will be included.** For bulk transitions that require additional field updates, please utilise the Jira Cloud UI.&lt;br /&gt;&lt;br /&gt;You can request available transitions for up to 1,000 issues in a single operation. This API uses pagination to return responses, delivering 50 workflows at a time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Transition &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
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
<tr id="parameter-issue_ids_or_keys">
    <td><CopyableCode code="issue_ids_or_keys" /></td>
    <td><code>string</code></td>
    <td>Comma (,) separated Ids or keys of the issues to get transitions available for them. (wire: issueIdsOrKeys)</td>
</tr>
<tr id="parameter-ending_before">
    <td><CopyableCode code="ending_before" /></td>
    <td><code>string</code></td>
    <td>(Optional)The end cursor for use in pagination. (wire: endingBefore)</td>
</tr>
<tr id="parameter-starting_after">
    <td><CopyableCode code="starting_after" /></td>
    <td><code>string</code></td>
    <td>(Optional)The start cursor for use in pagination. (wire: startingAfter)</td>
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

Use this API to retrieve a list of transitions available for the specified issues that can be used or bulk transition operations. You can submit either single or multiple issues in the query to obtain the available transitions.&lt;br /&gt;&lt;br /&gt;The response will provide the available transitions for issues, organized by their respective workflows. **Only the transitions that are common among the issues within that workflow and do not involve any additional field updates will be included.** For bulk transitions that require additional field updates, please utilise the Jira Cloud UI.&lt;br /&gt;&lt;br /&gt;You can request available transitions for up to 1,000 issues in a single operation. This API uses pagination to return responses, delivering 50 workflows at a time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Transition &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
is_transitions_filtered,
issues,
transitions
FROM jira.issues.bulk_transitions
WHERE issue_ids_or_keys = '{{ issue_ids_or_keys }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND ending_before = '{{ ending_before }}'
AND starting_after = '{{ starting_after }}'
;
```
</TabItem>
</Tabs>
