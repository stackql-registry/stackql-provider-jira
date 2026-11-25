--- 
title: global_settings
hide_title: false
hide_table_of_contents: false
keywords:
  - global_settings
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the global_settings resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>global_settings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="global_settings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.global_settings" /></td></tr>
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
    <td><CopyableCode code="attachments_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability to add attachments to issues is enabled. (wire: attachmentsEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_linking_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability to link issues is enabled. (wire: issueLinkingEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="sub_tasks_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability to create subtasks for issues is enabled. (wire: subTasksEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="time_tracking_configuration" /></td>
    <td><code>object</code></td>
    <td>The configuration of time tracking. (wire: timeTrackingConfiguration)</td>
</tr>
<tr>
    <td><CopyableCode code="time_tracking_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability to track time is enabled. This property is deprecated. (wire: timeTrackingEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="unassigned_issues_allowed" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability to create unassigned issues is enabled. See &#91;Configuring Jira application options&#93;(https:​//confluence.atlassian.com/x/uYXKM) for details. (wire: unassignedIssuesAllowed)</td>
</tr>
<tr>
    <td><CopyableCode code="voting_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability for users to vote on issues is enabled. See &#91;Configuring Jira application options&#93;(https:​//confluence.atlassian.com/x/uYXKM) for details. (wire: votingEnabled)</td>
</tr>
<tr>
    <td><CopyableCode code="watching_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the ability for users to watch issues is enabled. See &#91;Configuring Jira application options&#93;(https:​//confluence.atlassian.com/x/uYXKM) for details. (wire: watchingEnabled)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the &#91;global settings&#93;(https:​//confluence.atlassian.com/x/qYXKM) in Jira. These settings determine whether optional features (for example, subtasks, time tracking, and others) are enabled. If time tracking is enabled, this operation also returns the time tracking configuration.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
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

Returns the &#91;global settings&#93;(https:​//confluence.atlassian.com/x/qYXKM) in Jira. These settings determine whether optional features (for example, subtasks, time tracking, and others) are enabled. If time tracking is enabled, this operation also returns the time tracking configuration.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
attachments_enabled,
issue_linking_enabled,
sub_tasks_enabled,
time_tracking_configuration,
time_tracking_enabled,
unassigned_issues_allowed,
voting_enabled,
watching_enabled
FROM jira.system.global_settings
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
