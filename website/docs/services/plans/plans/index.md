--- 
title: plans
hide_title: false
hide_table_of_contents: false
keywords:
  - plans
  - plans
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the plans resource in the jira plans service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>plans</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="plans" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.plans.plans" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
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
    <td>The plan ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The plan name.</td>
</tr>
<tr>
    <td><CopyableCode code="lead_account_id" /></td>
    <td><code>string</code></td>
    <td>The account ID of the plan lead. (wire: leadAccountId)</td>
</tr>
<tr>
    <td><CopyableCode code="cross_project_releases" /></td>
    <td><code>array</code></td>
    <td>The cross-project releases included in the plan. (wire: crossProjectReleases)</td>
</tr>
<tr>
    <td><CopyableCode code="custom_fields" /></td>
    <td><code>array</code></td>
    <td>The custom fields for the plan. (wire: customFields)</td>
</tr>
<tr>
    <td><CopyableCode code="exclusion_rules" /></td>
    <td><code>object</code></td>
    <td>The exclusion rules for the plan. (wire: exclusionRules)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_sources" /></td>
    <td><code>array</code></td>
    <td>The issue sources included in the plan. (wire: issueSources)</td>
</tr>
<tr>
    <td><CopyableCode code="last_saved" /></td>
    <td><code>string</code></td>
    <td>The date when the plan was last saved in UTC. (wire: lastSaved)</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>array</code></td>
    <td>The permissions for the plan.</td>
</tr>
<tr>
    <td><CopyableCode code="scheduling" /></td>
    <td><code>object</code></td>
    <td>The scheduling settings for the plan.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The plan status. This is "Active", "Trashed" or "Archived". (Active, Trashed, Archived)</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The plan ID.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The plan name.</td>
</tr>
<tr>
    <td><CopyableCode code="scenario_id" /></td>
    <td><code>string</code></td>
    <td>Default scenario ID. (wire: scenarioId)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_sources" /></td>
    <td><code>array</code></td>
    <td>The issue sources included in the plan. (wire: issueSources)</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>The plan status. This is "Active", "Trashed" or "Archived". (Active, Trashed, Archived)</td>
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
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-use_group_id"><code>use_group_id</code></a></td>
    <td>Returns a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-include_trashed"><code>include_trashed</code></a>, <a href="#parameter-include_archived"><code>include_archived</code></a>, <a href="#parameter-cursor"><code>cursor</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of plans.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issue_sources"><code>issue_sources</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-scheduling"><code>scheduling</code></a></td>
    <td><a href="#parameter-use_group_id"><code>use_group_id</code></a></td>
    <td>Creates a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-plan_id"><code>plan_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-use_group_id"><code>use_group_id</code></a></td>
    <td>Updates any of the following details of a plan using &#91;JSON Patch&#93;(https:​//datatracker.ietf.org/doc/html/rfc6902).&lt;br /&gt;&lt;br /&gt; *  name&lt;br /&gt; *  leadAccountId&lt;br /&gt; *  scheduling&lt;br /&gt;    &lt;br /&gt;     *  estimation with StoryPoints, Days or Hours as possible values&lt;br /&gt;     *  startDate&lt;br /&gt;        &lt;br /&gt;         *  type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values&lt;br /&gt;         *  dateCustomFieldId&lt;br /&gt;     *  endDate&lt;br /&gt;        &lt;br /&gt;         *  type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values&lt;br /&gt;         *  dateCustomFieldId&lt;br /&gt;     *  inferredDates with None, SprintDates or ReleaseDates as possible values&lt;br /&gt;     *  dependencies with Sequential or Concurrent as possible values&lt;br /&gt; *  issueSources&lt;br /&gt;    &lt;br /&gt;     *  type with Board, Project or Filter as possible values&lt;br /&gt;     *  value&lt;br /&gt; *  exclusionRules&lt;br /&gt;    &lt;br /&gt;     *  numberOfDaysToShowCompletedIssues&lt;br /&gt;     *  issueIds&lt;br /&gt;     *  workStatusIds&lt;br /&gt;     *  workStatusCategoryIds&lt;br /&gt;     *  issueTypeIds&lt;br /&gt;     *  releaseIds&lt;br /&gt; *  crossProjectReleases&lt;br /&gt;    &lt;br /&gt;     *  name&lt;br /&gt;     *  releaseIds&lt;br /&gt; *  customFields&lt;br /&gt;    &lt;br /&gt;     *  customFieldId&lt;br /&gt;     *  filter&lt;br /&gt; *  permissions&lt;br /&gt;    &lt;br /&gt;     *  type with View or Edit as possible values&lt;br /&gt;     *  holder&lt;br /&gt;        &lt;br /&gt;         *  type with Group or AccountId as possible values&lt;br /&gt;         *  value&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;*Note that "add" operations do not respect array indexes in target locations. Call the "Get plan" endpoint to find out the order of array elements.*</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-planId"><code>planId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Archives a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#duplicate"><CopyableCode code="duplicate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-planId"><code>planId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Duplicates a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#trash"><CopyableCode code="trash" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-planId"><code>planId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves a plan to trash.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-planId">
    <td><CopyableCode code="planId" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the plan.</td>
</tr>
<tr id="parameter-plan_id">
    <td><CopyableCode code="plan_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the plan. (wire: planId)</td>
</tr>
<tr id="parameter-cursor">
    <td><CopyableCode code="cursor" /></td>
    <td><code>string</code></td>
    <td>The cursor to start from. If not provided, the first page will be returned.</td>
</tr>
<tr id="parameter-include_archived">
    <td><CopyableCode code="include_archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include archived plans in the results. (wire: includeArchived)</td>
</tr>
<tr id="parameter-include_trashed">
    <td><CopyableCode code="include_trashed" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include trashed plans in the results. (wire: includeTrashed)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of plans to return per page. The maximum value is 50. The default value is 50. (wire: maxResults)</td>
</tr>
<tr id="parameter-use_group_id">
    <td><CopyableCode code="use_group_id" /></td>
    <td><code>boolean</code></td>
    <td>Whether to accept group IDs instead of group names. Group names are deprecated. (wire: useGroupId)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
lead_account_id,
cross_project_releases,
custom_fields,
exclusion_rules,
issue_sources,
last_saved,
permissions,
scheduling,
status
FROM jira.plans.plans
WHERE plan_id = '{{ plan_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND use_group_id = '{{ use_group_id }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of plans.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
scenario_id,
issue_sources,
status
FROM jira.plans.plans
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND include_trashed = '{{ include_trashed }}'
AND include_archived = '{{ include_archived }}'
AND cursor = '{{ cursor }}'
AND max_results = '{{ max_results }}'
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

Creates a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.plans.plans (
cross_project_releases,
custom_fields,
exclusion_rules,
issue_sources,
lead_account_id,
name,
permissions,
scheduling,
cloud_id,
use_group_id
)
SELECT 
'{{ cross_project_releases }}',
'{{ custom_fields }}',
'{{ exclusion_rules }}',
'{{ issue_sources }}' /* required */,
'{{ lead_account_id }}',
'{{ name }}' /* required */,
'{{ permissions }}',
'{{ scheduling }}' /* required */,
'{{ cloud_id }}',
'{{ use_group_id }}'
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: plans
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the plans resource.
    - name: cross_project_releases
      description: |
        The cross-project releases to include in the plan.
      value:
        - name: "{{ name }}"
          releaseIds: "{{ releaseIds }}"
    - name: custom_fields
      description: |
        The custom fields for the plan.
      value:
        - customFieldId: {{ customFieldId }}
          filter: {{ filter }}
    - name: exclusion_rules
      description: |
        The exclusion rules for the plan.
      value:
        issueIds:
          - {{ issueIds }}
        issueTypeIds:
          - {{ issueTypeIds }}
        numberOfDaysToShowCompletedIssues: {{ numberOfDaysToShowCompletedIssues }}
        releaseIds:
          - {{ releaseIds }}
        workStatusCategoryIds:
          - {{ workStatusCategoryIds }}
        workStatusIds:
          - {{ workStatusIds }}
    - name: issue_sources
      description: |
        The issue sources to include in the plan.
      value:
        - type: "{{ type }}"
          value: {{ value }}
    - name: lead_account_id
      value: "{{ lead_account_id }}"
      description: |
        The account ID of the plan lead.
    - name: name
      value: "{{ name }}"
      description: |
        The plan name.
    - name: permissions
      description: |
        The permissions for the plan.
      value:
        - holder:
            type: "{{ type }}"
            value: "{{ value }}"
          type: "{{ type }}"
    - name: scheduling
      description: |
        The scheduling settings for the plan.
      value:
        dependencies: "{{ dependencies }}"
        endDate:
          dateCustomFieldId: {{ dateCustomFieldId }}
          type: "{{ type }}"
        estimation: "{{ estimation }}"
        inferredDates: "{{ inferredDates }}"
        startDate:
          dateCustomFieldId: {{ dateCustomFieldId }}
          type: "{{ type }}"
    - name: use_group_id
      value: {{ use_group_id }}
      description: Whether to accept group IDs instead of group names. Group names are deprecated.
      description: Whether to accept group IDs instead of group names. Group names are deprecated.
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

Updates any of the following details of a plan using &#91;JSON Patch&#93;(https:​//datatracker.ietf.org/doc/html/rfc6902).&lt;br /&gt;&lt;br /&gt; *  name&lt;br /&gt; *  leadAccountId&lt;br /&gt; *  scheduling&lt;br /&gt;    &lt;br /&gt;     *  estimation with StoryPoints, Days or Hours as possible values&lt;br /&gt;     *  startDate&lt;br /&gt;        &lt;br /&gt;         *  type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values&lt;br /&gt;         *  dateCustomFieldId&lt;br /&gt;     *  endDate&lt;br /&gt;        &lt;br /&gt;         *  type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values&lt;br /&gt;         *  dateCustomFieldId&lt;br /&gt;     *  inferredDates with None, SprintDates or ReleaseDates as possible values&lt;br /&gt;     *  dependencies with Sequential or Concurrent as possible values&lt;br /&gt; *  issueSources&lt;br /&gt;    &lt;br /&gt;     *  type with Board, Project or Filter as possible values&lt;br /&gt;     *  value&lt;br /&gt; *  exclusionRules&lt;br /&gt;    &lt;br /&gt;     *  numberOfDaysToShowCompletedIssues&lt;br /&gt;     *  issueIds&lt;br /&gt;     *  workStatusIds&lt;br /&gt;     *  workStatusCategoryIds&lt;br /&gt;     *  issueTypeIds&lt;br /&gt;     *  releaseIds&lt;br /&gt; *  crossProjectReleases&lt;br /&gt;    &lt;br /&gt;     *  name&lt;br /&gt;     *  releaseIds&lt;br /&gt; *  customFields&lt;br /&gt;    &lt;br /&gt;     *  customFieldId&lt;br /&gt;     *  filter&lt;br /&gt; *  permissions&lt;br /&gt;    &lt;br /&gt;     *  type with View or Edit as possible values&lt;br /&gt;     *  holder&lt;br /&gt;        &lt;br /&gt;         *  type with Group or AccountId as possible values&lt;br /&gt;         *  value&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;*Note that "add" operations do not respect array indexes in target locations. Call the "Get plan" endpoint to find out the order of array elements.*

```sql
UPDATE jira.plans.plans
SET 
-- No updatable properties
WHERE 
plan_id = '{{ plan_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND use_group_id = {{ use_group_id}};
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="archive"
    values={[
        { label: 'archive', value: 'archive' },
        { label: 'duplicate', value: 'duplicate' },
        { label: 'trash', value: 'trash' }
    ]}
>
<TabItem value="archive">

Archives a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.plans.plans.archive 
@planId='{{ planId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="duplicate">

Duplicates a plan.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.plans.plans.duplicate 
@planId='{{ planId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"name": "{{ name }}"
}'
;
```
</TabItem>
<TabItem value="trash">

Moves a plan to trash.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.plans.plans.trash 
@planId='{{ planId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
