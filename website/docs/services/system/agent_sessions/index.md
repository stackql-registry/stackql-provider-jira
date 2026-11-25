--- 
title: agent_sessions
hide_title: false
hide_table_of_contents: false
keywords:
  - agent_sessions
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the agent_sessions resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>agent_sessions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="agent_sessions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.agent_sessions" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#start_batch"><CopyableCode code="start_batch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-clientMutationId"><code>clientMutationId</code></a>, <a href="#parameter-invocations"><code>invocations</code></a></td>
    <td></td>
    <td>Starts agent sessions for a batch of issues, with an agent and optional prompt specified per invocation. You can submit between 1 and 50 invocations in one request, including multiple invocations for the same issue. Supply numeric issue-ID strings and Rovo agent IDs. Session-start outcomes are returned inline; the agent's work continues asynchronously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#start_uniform"><CopyableCode code="start_uniform" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-agentId"><code>agentId</code></a>, <a href="#parameter-clientMutationId"><code>clientMutationId</code></a>, <a href="#parameter-issueIds"><code>issueIds</code></a></td>
    <td></td>
    <td>Starts the same agent on between 1 and 50 issues, with an optional prompt shared by every invocation. Supply numeric issue-ID strings, and a Rovo agent ID. Session-start outcomes are returned inline; the agent's work continues asynchronously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
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

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="start_batch"
    values={[
        { label: 'start_batch', value: 'start_batch' },
        { label: 'start_uniform', value: 'start_uniform' }
    ]}
>
<TabItem value="start_batch">

Starts agent sessions for a batch of issues, with an agent and optional prompt specified per invocation. You can submit between 1 and 50 invocations in one request, including multiple invocations for the same issue. Supply numeric issue-ID strings and Rovo agent IDs. Session-start outcomes are returned inline; the agent's work continues asynchronously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.system.agent_sessions.start_batch 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"clientMutationId": "{{ clientMutationId }}", 
"invocations": "{{ invocations }}"
}'
;
```
</TabItem>
<TabItem value="start_uniform">

Starts the same agent on between 1 and 50 issues, with an optional prompt shared by every invocation. Supply numeric issue-ID strings, and a Rovo agent ID. Session-start outcomes are returned inline; the agent's work continues asynchronously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.system.agent_sessions.start_uniform 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"agentId": "{{ agentId }}", 
"clientMutationId": "{{ clientMutationId }}", 
"issueIds": "{{ issueIds }}", 
"userPrompt": "{{ userPrompt }}"
}'
;
```
</TabItem>
</Tabs>
