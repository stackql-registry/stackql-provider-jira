--- 
title: edit_meta
hide_title: false
hide_table_of_contents: false
keywords:
  - edit_meta
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the edit_meta resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>edit_meta</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="edit_meta" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.edit_meta" /></td></tr>
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
    <td><CopyableCode code="fields" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-override_screen_security"><code>override_screen_security</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a></td>
    <td>Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in &#91;Edit issue&#93;(#api-rest-api-3-issue-issueIdOrKey-put).&lt;br /&gt;&lt;br /&gt;This endpoint will check for these conditions:&lt;br /&gt;&lt;br /&gt;1.  Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type scheme configuration. `overrideScreenSecurity=true` skips this condition.&lt;br /&gt;2.  Field is visible in the &#91;field configuration&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/). `overrideScreenSecurity=true` skips this condition.&lt;br /&gt;3.  Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if attachments are enabled. Assignee only shows if user has permissions to assign the issue.&lt;br /&gt;4.  If a field is custom then it must have valid custom field context, applicable for its project and issue type. All system fields are assumed to have context in all projects and all issue types.&lt;br /&gt;5.  Issue has a project, issue type, and status defined.&lt;br /&gt;6.  Issue is assigned to a valid workflow, and the current status has assigned a workflow step. `overrideEditableFlag=true` skips this condition.&lt;br /&gt;7.  The current workflow step is editable. This is true by default, but &#91;can be disabled by setting&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.&lt;br /&gt;8.  User has &#91;Edit issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).&lt;br /&gt;9.  Workflow permissions allow editing a field. This is true by default but &#91;can be modified&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using `jira.permission.*` workflow properties.&lt;br /&gt;&lt;br /&gt;Fields hidden using &#91;Issue layout settings page&#93;(https:​//support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain editable.&lt;br /&gt;&lt;br /&gt;Connect apps having an app user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), can return additional details using:&lt;br /&gt;&lt;br /&gt; *  `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available through screens, and field configuration (conditions 1. and 2. from the list above).&lt;br /&gt; *  `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if the current step is editable (conditions 6. and 7. from the list above).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt;&lt;br /&gt;Note: For any fields to be editable the user must have the *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the issue.</td>
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
    <td>The ID or key of the issue.</td>
</tr>
<tr id="parameter-override_editable_flag">
    <td><CopyableCode code="override_editable_flag" /></td>
    <td><code>boolean</code></td>
    <td>Whether non-editable fields are returned. Available to Connect and Forge app users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideEditableFlag)</td>
</tr>
<tr id="parameter-override_screen_security">
    <td><CopyableCode code="override_screen_security" /></td>
    <td><code>boolean</code></td>
    <td>Whether hidden fields are returned. Available to Connect and Forge app users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideScreenSecurity)</td>
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

Returns the edit screen fields for an issue that are visible to and editable by the user. Use the information to populate the requests in &#91;Edit issue&#93;(#api-rest-api-3-issue-issueIdOrKey-put).&lt;br /&gt;&lt;br /&gt;This endpoint will check for these conditions:&lt;br /&gt;&lt;br /&gt;1.  Field is available on a field screen - through screen, screen scheme, issue type screen scheme, and issue type scheme configuration. `overrideScreenSecurity=true` skips this condition.&lt;br /&gt;2.  Field is visible in the &#91;field configuration&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/change-a-field-configuration/). `overrideScreenSecurity=true` skips this condition.&lt;br /&gt;3.  Field is shown on the issue: each field has different conditions here. For example: Attachment field only shows if attachments are enabled. Assignee only shows if user has permissions to assign the issue.&lt;br /&gt;4.  If a field is custom then it must have valid custom field context, applicable for its project and issue type. All system fields are assumed to have context in all projects and all issue types.&lt;br /&gt;5.  Issue has a project, issue type, and status defined.&lt;br /&gt;6.  Issue is assigned to a valid workflow, and the current status has assigned a workflow step. `overrideEditableFlag=true` skips this condition.&lt;br /&gt;7.  The current workflow step is editable. This is true by default, but &#91;can be disabled by setting&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) the `jira.issue.editable` property to `false`. `overrideEditableFlag=true` skips this condition.&lt;br /&gt;8.  User has &#91;Edit issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/).&lt;br /&gt;9.  Workflow permissions allow editing a field. This is true by default but &#91;can be modified&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/use-workflow-properties/) using `jira.permission.*` workflow properties.&lt;br /&gt;&lt;br /&gt;Fields hidden using &#91;Issue layout settings page&#93;(https:​//support.atlassian.com/jira-software-cloud/docs/configure-field-layout-in-the-issue-view/) remain editable.&lt;br /&gt;&lt;br /&gt;Connect apps having an app user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), can return additional details using:&lt;br /&gt;&lt;br /&gt; *  `overrideScreenSecurity` When this flag is `true`, then this endpoint skips checking if fields are available through screens, and field configuration (conditions 1. and 2. from the list above).&lt;br /&gt; *  `overrideEditableFlag` When this flag is `true`, then this endpoint skips checking if workflow is present and if the current step is editable (conditions 6. and 7. from the list above).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt;&lt;br /&gt;Note: For any fields to be editable the user must have the *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the issue.

```sql
SELECT
fields
FROM jira.issues.edit_meta
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND override_screen_security = '{{ override_screen_security }}'
AND override_editable_flag = '{{ override_editable_flag }}'
;
```
</TabItem>
</Tabs>
