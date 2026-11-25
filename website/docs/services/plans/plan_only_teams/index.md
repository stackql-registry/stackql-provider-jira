--- 
title: plan_only_teams
hide_title: false
hide_table_of_contents: false
keywords:
  - plan_only_teams
  - plans
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the plan_only_teams resource in the jira plans service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>plan_only_teams</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="plan_only_teams" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.plans.plan_only_teams" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The plan-only team ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The plan-only team name.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_source_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the issue source for the plan-only team. (wire: issueSourceId)</td>
</tr>
<tr>
    <td><CopyableCode code="capacity" /></td>
    <td><code>number (double)</code></td>
    <td>The capacity for the plan-only team.</td>
</tr>
<tr>
    <td><CopyableCode code="member_account_ids" /></td>
    <td><code>array</code></td>
    <td>The account IDs of the plan-only team members. (wire: memberAccountIds)</td>
</tr>
<tr>
    <td><CopyableCode code="planning_style" /></td>
    <td><code>string</code></td>
    <td>The planning style for the plan-only team. This is "Scrum" or "Kanban". (Scrum, Kanban) (wire: planningStyle)</td>
</tr>
<tr>
    <td><CopyableCode code="sprint_length" /></td>
    <td><code>integer (int64)</code></td>
    <td>The sprint length for the plan-only team. (wire: sprintLength)</td>
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
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-plan_only_team_id"><code>plan_only_team_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns planning settings for a plan-only team.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-planning_style"><code>planning_style</code></a></td>
    <td></td>
    <td>Creates a plan-only team and configures their planning settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-plan_only_team_id"><code>plan_only_team_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates any of the following planning settings of a plan-only team using &#91;JSON Patch&#93;(https:​//datatracker.ietf.org/doc/html/rfc6902).&lt;br /&gt;&lt;br /&gt; *  name&lt;br /&gt; *  planningStyle&lt;br /&gt; *  issueSourceId&lt;br /&gt; *  sprintLength&lt;br /&gt; *  capacity&lt;br /&gt; *  memberAccountIds&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;*Note that "add" operations do not respect array indexes in target locations. Call the "Get plan-only team" endpoint to find out the order of array elements.*</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-plan_only_team_id"><code>plan_only_team_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a plan-only team and their planning settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-plan_id">
    <td><CopyableCode code="plan_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the plan. (wire: planId)</td>
</tr>
<tr id="parameter-plan_only_team_id">
    <td><CopyableCode code="plan_only_team_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the plan-only team. (wire: planOnlyTeamId)</td>
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

Returns planning settings for a plan-only team.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
issue_source_id,
capacity,
member_account_ids,
planning_style,
sprint_length
FROM jira.plans.plan_only_teams
WHERE plan_id = '{{ plan_id }}' -- required
AND plan_only_team_id = '{{ plan_only_team_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Creates a plan-only team and configures their planning settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.plans.plan_only_teams (
capacity,
issue_source_id,
member_account_ids,
name,
planning_style,
sprint_length,
plan_id,
cloud_id
)
SELECT 
{{ capacity }},
{{ issue_source_id }},
'{{ member_account_ids }}',
'{{ name }}' /* required */,
'{{ planning_style }}' /* required */,
{{ sprint_length }},
'{{ plan_id }}',
'{{ cloud_id }}'
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: plan_only_teams
  props:
    - name: plan_id
      value: "{{ plan_id }}"
      description: Required parameter for the plan_only_teams resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the plan_only_teams resource.
    - name: capacity
      value: {{ capacity }}
      description: |
        The capacity for the plan-only team.
    - name: issue_source_id
      value: {{ issue_source_id }}
      description: |
        The ID of the issue source for the plan-only team.
    - name: member_account_ids
      value:
        - "{{ member_account_ids }}"
      description: |
        The account IDs of the plan-only team members.
    - name: name
      value: "{{ name }}"
      description: |
        The plan-only team name.
    - name: planning_style
      value: "{{ planning_style }}"
      description: |
        The planning style for the plan-only team. This must be "Scrum" or "Kanban".
      valid_values: ['Scrum', 'Kanban']
    - name: sprint_length
      value: {{ sprint_length }}
      description: |
        The sprint length for the plan-only team.
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Updates any of the following planning settings of a plan-only team using &#91;JSON Patch&#93;(https:​//datatracker.ietf.org/doc/html/rfc6902).&lt;br /&gt;&lt;br /&gt; *  name&lt;br /&gt; *  planningStyle&lt;br /&gt; *  issueSourceId&lt;br /&gt; *  sprintLength&lt;br /&gt; *  capacity&lt;br /&gt; *  memberAccountIds&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;*Note that "add" operations do not respect array indexes in target locations. Call the "Get plan-only team" endpoint to find out the order of array elements.*

```sql
UPDATE jira.plans.plan_only_teams
SET 
-- No updatable properties
WHERE 
plan_id = '{{ plan_id }}' --required
AND plan_only_team_id = '{{ plan_only_team_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes a plan-only team and their planning settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.plans.plan_only_teams
WHERE plan_id = '{{ plan_id }}' --required
AND plan_only_team_id = '{{ plan_only_team_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
