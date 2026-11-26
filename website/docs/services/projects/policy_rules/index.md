--- 
title: policy_rules
hide_title: false
hide_table_of_contents: false
keywords:
  - policy_rules
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the policy_rules resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>policy_rules</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="policy_rules" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.policy_rules" /></td></tr>
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
    <td><CopyableCode code="rule_id" /></td>
    <td><code>string</code></td>
    <td> (wire: ruleId)</td>
</tr>
<tr>
    <td><CopyableCode code="rule_type_id" /></td>
    <td><code>string</code></td>
    <td> (wire: ruleTypeId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-rule_type_ids"><code>rule_type_ids</code></a></td>
    <td>Returns the configuration of the queried rule type IDs for a given project.&lt;br /&gt;&lt;br /&gt;Use this to check whether specific rules are active on a project, and if so, how they are configured.&lt;br /&gt;&lt;br /&gt;Only rules that are actually active on the project are returned. Rules that are not active are omitted from the response.</td>
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
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>project ID or project key</td>
</tr>
<tr id="parameter-rule_type_ids">
    <td><CopyableCode code="rule_type_ids" /></td>
    <td><code>array</code></td>
    <td>the set of rule type IDs to query (wire: ruleTypeIds)</td>
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

Returns the configuration of the queried rule type IDs for a given project.&lt;br /&gt;&lt;br /&gt;Use this to check whether specific rules are active on a project, and if so, how they are configured.&lt;br /&gt;&lt;br /&gt;Only rules that are actually active on the project are returned. Rules that are not active are omitted from the response.

```sql
SELECT
rule_id,
rule_type_id,
description,
domain,
properties
FROM jira.projects.policy_rules
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND rule_type_ids = '{{ rule_type_ids }}'
;
```
</TabItem>
</Tabs>
