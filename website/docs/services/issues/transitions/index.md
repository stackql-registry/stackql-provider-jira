--- 
title: transitions
hide_title: false
hide_table_of_contents: false
keywords:
  - transitions
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the transitions resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>transitions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="transitions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.transitions" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue transition. Required when specifying a transition to undertake.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue transition.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td>Details of the fields associated with the issue transition screen. Use this information to populate `fields` and `update` in a transition request.</td>
</tr>
<tr>
    <td><CopyableCode code="has_screen" /></td>
    <td><code>boolean</code></td>
    <td>Whether there is a screen associated with the issue transition. (wire: hasScreen)</td>
</tr>
<tr>
    <td><CopyableCode code="is_available" /></td>
    <td><code>boolean</code></td>
    <td>Whether the transition is available to be performed. (wire: isAvailable)</td>
</tr>
<tr>
    <td><CopyableCode code="is_conditional" /></td>
    <td><code>boolean</code></td>
    <td>Whether the issue has to meet criteria before the issue transition is applied. (wire: isConditional)</td>
</tr>
<tr>
    <td><CopyableCode code="is_global" /></td>
    <td><code>boolean</code></td>
    <td>Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. (wire: isGlobal)</td>
</tr>
<tr>
    <td><CopyableCode code="is_initial" /></td>
    <td><code>boolean</code></td>
    <td>Whether this is the initial issue transition for the workflow. (wire: isInitial)</td>
</tr>
<tr>
    <td><CopyableCode code="looped" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="to" /></td>
    <td><code>object</code></td>
    <td>Details of the issue status after the transition.</td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-transition_id"><code>transition_id</code></a>, <a href="#parameter-skip_remote_only_condition"><code>skip_remote_only_condition</code></a>, <a href="#parameter-include_unavailable_transitions"><code>include_unavailable_transitions</code></a>, <a href="#parameter-sort_by_ops_bar_and_status"><code>sort_by_ops_bar_and_status</code></a></td>
    <td>Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.&lt;br /&gt;&lt;br /&gt;Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its status, the response will return any empty transitions list.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required: A list or transition is returned only when the user has:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt;&lt;br /&gt;However, if the user does not have the *Transition issues* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) the response will not list any transitions.</td>
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
    <td>The ID or key of the issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about transitions in the response. This parameter accepts `transitions.fields`, which returns information about the fields in the transition screen for each transition. Fields hidden from the screen are not returned. Use this information to populate the `fields` and `update` fields in &#91;Transition issue&#93;(#api-rest-api-3-issue-issueIdOrKey-transitions-post).</td>
</tr>
<tr id="parameter-include_unavailable_transitions">
    <td><CopyableCode code="include_unavailable_transitions" /></td>
    <td><code>boolean</code></td>
    <td>Whether details of transitions that fail a condition are included in the response (wire: includeUnavailableTransitions)</td>
</tr>
<tr id="parameter-skip_remote_only_condition">
    <td><CopyableCode code="skip_remote_only_condition" /></td>
    <td><code>boolean</code></td>
    <td>Whether transitions with the condition *Hide From User Condition* are included in the response. Available to Connect and Forge app users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: skipRemoteOnlyCondition)</td>
</tr>
<tr id="parameter-sort_by_ops_bar_and_status">
    <td><CopyableCode code="sort_by_ops_bar_and_status" /></td>
    <td><code>boolean</code></td>
    <td>Whether the transitions are sorted by ops-bar sequence value first then category order (Todo, In Progress, Done) or only by ops-bar sequence value. (wire: sortByOpsBarAndStatus)</td>
</tr>
<tr id="parameter-transition_id">
    <td><CopyableCode code="transition_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the transition. (wire: transitionId)</td>
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

Returns either all transitions or a transition that can be performed by the user on an issue, based on the issue's status.&lt;br /&gt;&lt;br /&gt;Note, if a request is made for a transition that does not exist or cannot be performed on the issue, given its status, the response will return any empty transitions list.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required: A list or transition is returned only when the user has:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt;&lt;br /&gt;However, if the user does not have the *Transition issues* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) the response will not list any transitions.

```sql
SELECT
id,
name,
fields,
has_screen,
is_available,
is_conditional,
is_global,
is_initial,
looped,
to
FROM jira.issues.transitions
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
AND transition_id = '{{ transition_id }}'
AND skip_remote_only_condition = '{{ skip_remote_only_condition }}'
AND include_unavailable_transitions = '{{ include_unavailable_transitions }}'
AND sort_by_ops_bar_and_status = '{{ sort_by_ops_bar_and_status }}'
;
```
</TabItem>
</Tabs>
