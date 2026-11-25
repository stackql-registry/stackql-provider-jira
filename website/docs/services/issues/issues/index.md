--- 
title: issues
hide_title: false
hide_table_of_contents: false
keywords:
  - issues
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issues resource in the jira issues service using SQL"
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
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.issues" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'search', value: 'search' }
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
    <td><code>string</code></td>
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="search">

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
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
    <td><a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-fields_by_keys"><code>fields_by_keys</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-properties"><code>properties</code></a>, <a href="#parameter-update_history"><code>update_history</code></a>, <a href="#parameter-fail_fast"><code>fail_fast</code></a></td>
    <td>Returns the details for an issue.&lt;br /&gt;&lt;br /&gt;The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned. The issue key returned in the response is the key of the issue found.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#search"><CopyableCode code="search" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Searches for issues using &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned search results. If you need &#91;read-after-write&#93;(https:​//developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-update_history"><code>update_history</code></a>, <a href="#parameter-prefer_field_associated_errors"><code>prefer_field_associated_errors</code></a></td>
    <td>Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties set.&lt;br /&gt;&lt;br /&gt;The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get). These are the same fields that appear on the issue's create screen. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Creating a subtask differs from creating an issue as follows:&lt;br /&gt;&lt;br /&gt; *  `issueType` must be set to a subtask issue type (use &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get) to find subtask issue types).&lt;br /&gt; *  `parent` must contain the ID or key of the parent issue.&lt;br /&gt;&lt;br /&gt;In a next-gen project any issue may be made a child providing that the parent and child are members of the same project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* and *Create issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which the issue or subtask is created.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-notify_users"><code>notify_users</code></a>, <a href="#parameter-override_screen_security"><code>override_screen_security</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a>, <a href="#parameter-return_issue"><code>return_issue</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not supported and is ignored here. To transition an issue, please use &#91;Transition issue&#93;(#api-rest-api-3-issue-issueIdOrKey-transitions-post).&lt;br /&gt;&lt;br /&gt;The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are determined using &#91; Get edit issue metadata&#93;(#api-rest-api-3-issue-issueIdOrKey-editmeta-get).&lt;br /&gt;&lt;br /&gt;**Note:** This endpoint doesn't check screen configurations to determine if a field is editable. For more context, see the &#91;Deprecation of override screen security&#93;(https:​//community.developer.atlassian.com/t/deprecation-of-override-screen-security/97153) announcement.&lt;br /&gt;&lt;br /&gt;The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting `update.parent.set.none` to *true*. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Connect apps having an app user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), can override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-delete_subtasks"><code>delete_subtasks</code></a></td>
    <td>Deletes an issue.&lt;br /&gt;&lt;br /&gt;An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`. This causes the issue's subtasks to be deleted with the issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Delete issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_delete"><CopyableCode code="bulk_delete" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-selectedIssueIdsOrKeys"><code>selectedIssueIdsOrKeys</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk delete request. You can delete up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Delete &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Delete-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_edit"><CopyableCode code="bulk_edit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-editedFieldsInput"><code>editedFieldsInput</code></a>, <a href="#parameter-selectedActions"><code>selectedActions</code></a>, <a href="#parameter-selectedIssueIdsOrKeys"><code>selectedIssueIdsOrKeys</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk edit request and simultaneously edit multiple issues. There are limits applied to the number of issues and fields that can be edited. A single request can accommodate a maximum of 1000 issues (including subtasks) and 200 fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  Edit &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_move"><CopyableCode code="bulk_move" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-targetToMultipleSourceMapping"><code>targetToMultipleSourceMapping</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk issue move request. You can move multiple issues from multiple projects in a single request, but they must all be moved to a single project, issue type, and parent. You can't move more than 1000 issues (including subtasks) at once.&lt;br /&gt;&lt;br /&gt;#### Scenarios: ####&lt;br /&gt;&lt;br /&gt;This is an early version of the API and it doesn't have full feature parity with the Bulk Move UI experience.&lt;br /&gt;&lt;br /&gt; *  Moving issue of type A to issue of type B in the same project or a different project: `SUPPORTED`&lt;br /&gt; *  Moving multiple issues of type A in one or more projects to multiple issues of type B in one of the source projects or a different project: `SUPPORTED`&lt;br /&gt; *  Moving issues of multiple issue types in one or more projects to issues of a single issue type in one of the source project or a different project: **`SUPPORTED`**  &lt;br /&gt;    E.g. Moving issues of story and task issue types in project 1 and project 2 to issues of task issue type in project 3&lt;br /&gt; *  Moving a standard parent issue of type A with its multiple subtask issue types in one project to standard issue of type B and multiple subtask issue types in the same project or a different project: `SUPPORTED`&lt;br /&gt; *  Moving standard issues with their subtasks to a parent issue in the same project or a different project without losing their relation: `SUPPORTED`&lt;br /&gt; *  Moving an epic issue with its child issues to a different project without losing their relation: `SUPPORTED`  &lt;br /&gt;    This usecase is **supported using multiple requests**. Move the epic in one request and then move the children in a separate request with target parent set to the epic issue id  &lt;br /&gt;      &lt;br /&gt;    (Alternatively, move them individually and stitch the relationship back with the Bulk Edit API)&lt;br /&gt;&lt;br /&gt;#### Limits applied to bulk issue moves: ####&lt;br /&gt;&lt;br /&gt;When using the bulk move, keep in mind that there are limits on the number of issues and fields you can include.&lt;br /&gt;&lt;br /&gt; *  You can move up to 1,000 issues in a single operation, including any subtasks.&lt;br /&gt; *  The total combined number of fields across all issues must not exceed 1,500,000. For example, if each issue includes 15,000 fields, then the maximum number of issues that can be moved is 100.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Move &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in source projects.&lt;br /&gt; *  Create &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in destination projects.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in destination projects, if moving subtasks only.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_transition"><CopyableCode code="bulk_transition" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-bulkTransitionInputs"><code>bulkTransitionInputs</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk issue status transition request. You can transition multiple issues, alongside with their valid transition Ids. You can transition up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Transition &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_unwatch"><CopyableCode code="bulk_unwatch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-selectedIssueIdsOrKeys"><code>selectedIssueIdsOrKeys</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk unwatch request. You can unwatch up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_watch"><CopyableCode code="bulk_watch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-selectedIssueIdsOrKeys"><code>selectedIssueIdsOrKeys</code></a></td>
    <td></td>
    <td>Use this API to submit a bulk watch request. You can watch up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#archive_by_jql"><CopyableCode code="archive_by_jql" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status of the submitted request.&lt;br /&gt;&lt;br /&gt;You can use the &#91;get task&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-get) and &#91;cancel task&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-cancel-post) APIs to manage the request.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't archive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only archive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**Rate limiting:** Only a single request per jira instance can be active at any given time.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) archived in the process and the errors encountered, if any.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't archive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only archive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;</td>
</tr>
<tr>
    <td><a href="#bulk_create"><CopyableCode code="bulk_create" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue properties set.&lt;br /&gt;&lt;br /&gt;The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get). These are the same fields that appear on the issues' create screens. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Creating a subtask differs from creating an issue as follows:&lt;br /&gt;&lt;br /&gt; *  `issueType` must be set to a subtask issue type (use &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get) to find subtask issue types).&lt;br /&gt; *  `parent` the must contain the ID or key of the parent issue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* and *Create issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which each issue or subtask is created.</td>
</tr>
<tr>
    <td><a href="#bulk_fetch"><CopyableCode code="bulk_fetch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueIdsOrKeys"><code>issueIdsOrKeys</code></a></td>
    <td></td>
    <td>Returns the details for a set of requested issues.&lt;br /&gt;&lt;br /&gt;By default you can request up to 100 issues in a single call. You can request up to 1000 issues in a single call when the request is shaped so that it can be served efficiently, that is, when *all* of the following are true:&lt;br /&gt;&lt;br /&gt; *  the `fields` parameter explicitly names at least one field to include — a request that contains only exclusions is **not** eligible, and neither are the `*all` and `*navigable` wildcards or the default navigable field set, because the number of resolved fields depends on the site's configuration;&lt;br /&gt; *  no more than 100 fields are explicitly included;&lt;br /&gt; *  none of the included fields returns multiple values (for example `comment`, `worklog`, or `attachment`); and&lt;br /&gt; *  the `expand` parameter does not include `changelog`, `editmeta`, `operations`, `renderedFields`, `transitions`, or `versionedRepresentations`.&lt;br /&gt;&lt;br /&gt;Requests that do not meet all of these conditions can include at most 100 issues; larger requests are rejected with a 400 error.&lt;br /&gt;&lt;br /&gt;Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned.&lt;br /&gt;&lt;br /&gt;Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which couldn't be fetched along with error messages.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_set_properties_by_list"><CopyableCode code="bulk_set_properties_by_list" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified along with up to 10,000 issues on which to set or update that list of entity properties.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON. The maximum length of single issue property value is 32768 characters. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_set_properties_by_issue"><CopyableCode code="bulk_set_properties_by_issue" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up to 100 issues included in the request.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt; *  non-transactional. Updating some entities may fail. Such information will available in the task result.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#bulk_delete_property"><CopyableCode code="bulk_delete_property" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-propertyKey"><code>propertyKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.&lt;br /&gt;&lt;br /&gt;The criteria the filter used to identify eligible issues are:&lt;br /&gt;&lt;br /&gt; *  `entityIds` Only issues from this list are eligible.&lt;br /&gt; *  `currentValue` Only issues with the property set to this value are eligible.&lt;br /&gt;&lt;br /&gt;If both criteria is specified, they are joined with the logical *AND*: only issues that satisfy both criteria are considered eligible.&lt;br /&gt;&lt;br /&gt;If no filter criteria are specified, all the issues visible to the user and where the user has the EDIT\_ISSUES permission for the issue are considered eligible.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each project containing issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each issue.</td>
</tr>
<tr>
    <td><a href="#bulk_set_property"><CopyableCode code="bulk_set_property" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-propertyKey"><code>propertyKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets a property value on multiple issues.&lt;br /&gt;&lt;br /&gt;The value set can be a constant or determined by a &#91;Jira expression&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/). Expressions must be computable with constant complexity when applied to a set of issues. Expressions must also comply with the &#91;restrictions&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions) that apply to all Jira expressions.&lt;br /&gt;&lt;br /&gt;The issues to be updated can be specified by a filter.&lt;br /&gt;&lt;br /&gt;The filter identifies issues eligible for update using these criteria:&lt;br /&gt;&lt;br /&gt; *  `entityIds` Only issues from this list are eligible.&lt;br /&gt; *  `currentValue` Only issues with the property set to this value are eligible.&lt;br /&gt; *  `hasProperty`:&lt;br /&gt;    &lt;br /&gt;     *  If *true*, only issues with the property are eligible.&lt;br /&gt;     *  If *false*, only issues without the property are eligible.&lt;br /&gt;&lt;br /&gt;If more than one criteria is specified, they are joined with the logical *AND*: only issues that satisfy all criteria are eligible.&lt;br /&gt;&lt;br /&gt;If an invalid combination of criteria is provided, an error is returned. For example, specifying a `currentValue` and `hasProperty` as *false* would not match any issues (because without the property the property cannot have a value).&lt;br /&gt;&lt;br /&gt;The filter is optional. Without the filter all the issues visible to the user and where the user has the EDIT\_ISSUES permission for the issue are considered eligible.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either all eligible issues are updated or, when errors occur, none are updated.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each project containing issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each issue.</td>
</tr>
<tr>
    <td><a href="#unarchive"><CopyableCode code="unarchive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) unarchived in the process and the errors encountered, if any.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't unarchive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only unarchive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;</td>
</tr>
<tr>
    <td><a href="#bulk_is_watching"><CopyableCode code="bulk_is_watching" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueIds"><code>issueIds</code></a></td>
    <td></td>
    <td>Returns, for the user, details of the watched status of issues from a list. If an issue ID is invalid, the returned watched status is `false`.&lt;br /&gt;&lt;br /&gt;This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General configuration for Jira. See &#91;Configuring Jira application options&#93;(https:​//confluence.atlassian.com/x/uYXKM) for details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#assign"><CopyableCode code="assign" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issueIdOrKey"><code>issueIdOrKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.&lt;br /&gt;&lt;br /&gt;If `name` or `accountId` is set to:&lt;br /&gt;&lt;br /&gt; *  `"-1"`, the issue is assigned to the default assignee for the project.&lt;br /&gt; *  `null`, the issue is set to unassigned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* and *Assign Issues* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#notify"><CopyableCode code="notify" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issueIdOrKey"><code>issueIdOrKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates an email notification for an issue and adds it to the mail queue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#transition"><CopyableCode code="transition" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issueIdOrKey"><code>issueIdOrKey</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-preferFieldAssociatedErrors"><code>preferFieldAssociatedErrors</code></a></td>
    <td>Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.&lt;br /&gt;&lt;br /&gt;sortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update` parameters in the request body. Get details about the fields using &#91; Get transitions&#93;(#api-rest-api-3-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Transition issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#export_archived"><CopyableCode code="export_archived" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it will receive an email with a link to download a CSV file with the issue details.&lt;br /&gt;&lt;br /&gt;Note that this API only exports the values of system fields and archival-specific fields (`ArchivedBy` and `ArchivedDate`). Custom fields aren't supported.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**Rate limiting:** Only a single request can be active at any given time.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;</td>
</tr>
<tr>
    <td><a href="#match_jql"><CopyableCode code="match_jql" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueIds"><code>issueIds</code></a>, <a href="#parameter-jqls"><code>jqls</code></a></td>
    <td></td>
    <td>Checks whether one or more issues would be returned by one or more JQL queries. Up to 10 JQL queries can be specified and up to 50 issue IDs included in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, issues are only matched against JQL queries where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#redact"><CopyableCode code="redact" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields asynchronously.&lt;br /&gt;&lt;br /&gt;The redaction status can be polled using the job id.</td>
</tr>
<tr>
    <td><a href="#approximate_count"><CopyableCode code="approximate_count" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Provide an estimated count of the issues that match the &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#search_get"><CopyableCode code="search_get" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-nextPageToken"><code>nextPageToken</code></a>, <a href="#parameter-maxResults"><code>maxResults</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-properties"><code>properties</code></a>, <a href="#parameter-fieldsByKeys"><code>fieldsByKeys</code></a>, <a href="#parameter-failFast"><code>failFast</code></a>, <a href="#parameter-reconcileIssues"><code>reconcileIssues</code></a>, <a href="#parameter-includeArchivedProjects"><code>includeArchivedProjects</code></a></td>
    <td>Searches for issues using &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned search results. If you need &#91;read-after-write&#93;(https:​//developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;If the JQL query expression is too large to be encoded as a query parameter, use the &#91;POST&#93;(#api-rest-api-3-search-post) version of this resource.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
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
<tr id="parameter-issueIdOrKey">
    <td><CopyableCode code="issueIdOrKey" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the issue.</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-propertyKey">
    <td><CopyableCode code="propertyKey" /></td>
    <td><code>string</code></td>
    <td>The key of the property. The maximum length is 255 characters.</td>
</tr>
<tr id="parameter-delete_subtasks">
    <td><CopyableCode code="delete_subtasks" /></td>
    <td><code>string</code></td>
    <td>Whether the issue's subtasks are deleted when the issue is deleted. (wire: deleteSubtasks)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about issues in the response. Note that, unlike the majority of instances where `expand` is specified, `expand` is defined as a comma-delimited string of values. The expand options are:   *  `renderedFields` Returns field values rendered in HTML format.  *  `names` Returns the display name of each field.  *  `schema` Returns the schema describing a field type.  *  `transitions` Returns all possible transitions for the issue.  *  `operations` Returns all possible operations for the issue.  *  `editmeta` Returns information about how each field can be edited.  *  `changelog` Returns a list of recent updates to an issue, sorted by date, starting from the most recent.  *  `versionedRepresentations` Instead of `fields`, returns `versionedRepresentations` a JSON array containing each version of a field's value, with the highest numbered item representing the most recent version.  Examples: `"names,changelog"` Returns the display name of each field as well as a list of recent updates to an issue.</td>
</tr>
<tr id="parameter-failFast">
    <td><CopyableCode code="failFast" /></td>
    <td><code>boolean</code></td>
    <td>Fail this request early if we can't retrieve all field data.</td>
</tr>
<tr id="parameter-fail_fast">
    <td><CopyableCode code="fail_fast" /></td>
    <td><code>boolean</code></td>
    <td>Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s). (wire: failFast)</td>
</tr>
<tr id="parameter-fields">
    <td><CopyableCode code="fields" /></td>
    <td><code>array</code></td>
    <td>A list of fields to return for each issue, use it to retrieve a subset of fields. This parameter accepts a comma-separated list. Expand options include:   *  `*all` Returns all fields.  *  `*navigable` Returns navigable fields.  *  `id` Returns only issue IDs.  *  Any issue field, prefixed with a minus to exclude.  The default is `id`.  Examples:   *  `summary,comment` Returns only the summary and comments fields only.  *  `-description` Returns all navigable (default) fields except description.  *  `*all,-comment` Returns all fields except comments.  Multiple `fields` parameters can be included in a request.  Note: By default, this resource returns IDs only. This differs from &#91;GET issue&#93;(#api-rest-api-3-issue-issueIdOrKey-get) where the default is all fields.</td>
</tr>
<tr id="parameter-fieldsByKeys">
    <td><CopyableCode code="fieldsByKeys" /></td>
    <td><code>boolean</code></td>
    <td>Reference fields by their key (rather than ID). The default is `false`.</td>
</tr>
<tr id="parameter-fields_by_keys">
    <td><CopyableCode code="fields_by_keys" /></td>
    <td><code>boolean</code></td>
    <td>Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID. (wire: fieldsByKeys)</td>
</tr>
<tr id="parameter-includeArchivedProjects">
    <td><CopyableCode code="includeArchivedProjects" /></td>
    <td><code>boolean</code></td>
    <td>Whether to also return issues that belong to &#91;archived projects&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/archive-a-project/). Issues in archived projects are excluded by default. Setting this to `true` returns them alongside issues from active projects; the *Browse projects* permission is still required on the archived project. The default is `false`.</td>
</tr>
<tr id="parameter-jql">
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td>A &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ) expression. For performance reasons, this parameter requires a bounded query. A bounded query is a query with a search restriction.   *  Example of an unbounded query: `order by key desc`.  *  Example of a bounded query: `assignee = currentUser() order by key`.  Additionally, `orderBy` clause can contain a maximum of 7 fields.</td>
</tr>
<tr id="parameter-maxResults">
    <td><CopyableCode code="maxResults" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. To manage page size, API may return fewer items per page where a large number of fields or properties are requested. The greatest number of items returned per page is achieved when requesting `id` or `key` only. It returns max 5000 issues.</td>
</tr>
<tr id="parameter-nextPageToken">
    <td><CopyableCode code="nextPageToken" /></td>
    <td><code>string</code></td>
    <td>The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues.  Note: The `nextPageToken` field is **not included** in the response for the last page, indicating there is no next page.</td>
</tr>
<tr id="parameter-notify_users">
    <td><CopyableCode code="notify_users" /></td>
    <td><code>boolean</code></td>
    <td>Whether a notification email about the issue update is sent to all watchers. To disable the notification, administer Jira or administer project permissions are required. If the user doesn't have the necessary permission the request is ignored. (wire: notifyUsers)</td>
</tr>
<tr id="parameter-override_editable_flag">
    <td><CopyableCode code="override_editable_flag" /></td>
    <td><code>boolean</code></td>
    <td>Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideEditableFlag)</td>
</tr>
<tr id="parameter-override_screen_security">
    <td><CopyableCode code="override_screen_security" /></td>
    <td><code>boolean</code></td>
    <td>Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideScreenSecurity)</td>
</tr>
<tr id="parameter-preferFieldAssociatedErrors">
    <td><CopyableCode code="preferFieldAssociatedErrors" /></td>
    <td><code>boolean</code></td>
    <td>EXPERIMENTAL. Whether you prefer errors that relate to a field to be returned as field errors (`errors`) rather than as general errors (`errorMessages`). A response can contain both kinds of error, regardless of what this is set to. When this is `true`, more errors are returned as field errors, and which errors are field errors and which are general errors isn't part of the contract and can change without notice.</td>
</tr>
<tr id="parameter-prefer_field_associated_errors">
    <td><CopyableCode code="prefer_field_associated_errors" /></td>
    <td><code>boolean</code></td>
    <td>EXPERIMENTAL. Whether you prefer errors that relate to a field to be returned as field errors (`errors`) rather than as general errors (`errorMessages`). A response can contain both kinds of error, regardless of what this is set to. When this is `true`, more errors are returned as field errors, and which errors are field errors and which are general errors isn't part of the contract and can change without notice. (wire: preferFieldAssociatedErrors)</td>
</tr>
<tr id="parameter-properties">
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>A list of up to 5 issue properties to include in the results. This parameter accepts a comma-separated list.</td>
</tr>
<tr id="parameter-reconcileIssues">
    <td><CopyableCode code="reconcileIssues" /></td>
    <td><code>array</code></td>
    <td>Strong consistency issue ids to be reconciled with search results. Accepts max 50 ids. This list of ids should be consistent with each paginated request across different pages.</td>
</tr>
<tr id="parameter-return_issue">
    <td><CopyableCode code="return_issue" /></td>
    <td><code>boolean</code></td>
    <td>Whether the response should contain the issue with fields edited in this request. The returned issue will have the same format as in the &#91;Get issue API&#93;(#api-rest-api-3-issue-issueidorkey-get). (wire: returnIssue)</td>
</tr>
<tr id="parameter-update_history">
    <td><CopyableCode code="update_history" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen. (wire: updateHistory)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'search', value: 'search' }
    ]}
>
<TabItem value="get">

Returns the details for an issue.&lt;br /&gt;&lt;br /&gt;The issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned. The issue key returned in the response is the key of the issue found.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.issues.issues
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND fields = '{{ fields }}'
AND fields_by_keys = '{{ fields_by_keys }}'
AND expand = '{{ expand }}'
AND properties = '{{ properties }}'
AND update_history = '{{ update_history }}'
AND fail_fast = '{{ fail_fast }}'
;
```
</TabItem>
<TabItem value="search">

Searches for issues using &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned search results. If you need &#91;read-after-write&#93;(https:​//developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.issues.issues
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates an issue or, where the option to create subtasks is enabled in Jira, a subtask. A transition may be applied, to move the issue or subtask to a workflow step other than the default start step, and issue properties set.&lt;br /&gt;&lt;br /&gt;The content of the issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get). These are the same fields that appear on the issue's create screen. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Creating a subtask differs from creating an issue as follows:&lt;br /&gt;&lt;br /&gt; *  `issueType` must be set to a subtask issue type (use &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get) to find subtask issue types).&lt;br /&gt; *  `parent` must contain the ID or key of the parent issue.&lt;br /&gt;&lt;br /&gt;In a next-gen project any issue may be made a child providing that the parent and child are members of the same project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* and *Create issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which the issue or subtask is created.

```sql
INSERT INTO jira.issues.issues (
fields,
history_metadata,
properties,
transition,
update,
cloud_id,
update_history,
prefer_field_associated_errors
)
SELECT 
'{{ fields }}',
'{{ history_metadata }}',
'{{ properties }}',
'{{ transition }}',
'{{ update }}',
'{{ cloud_id }}',
'{{ update_history }}',
'{{ prefer_field_associated_errors }}'
RETURNING
id,
key,
self,
transition,
watchers
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: issues
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the issues resource.
    - name: fields
      value: "{{ fields }}"
      description: |
        List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use \`update\`. Fields included in here cannot be included in \`update\`.
    - name: history_metadata
      description: |
        Additional issue history details.
      value:
        activityDescription: "{{ activityDescription }}"
        activityDescriptionKey: "{{ activityDescriptionKey }}"
        actor:
          avatarUrl: "{{ avatarUrl }}"
          displayName: "{{ displayName }}"
          displayNameKey: "{{ displayNameKey }}"
          id: "{{ id }}"
          type: "{{ type }}"
          url: "{{ url }}"
        cause:
          avatarUrl: "{{ avatarUrl }}"
          displayName: "{{ displayName }}"
          displayNameKey: "{{ displayNameKey }}"
          id: "{{ id }}"
          type: "{{ type }}"
          url: "{{ url }}"
        description: "{{ description }}"
        descriptionKey: "{{ descriptionKey }}"
        emailDescription: "{{ emailDescription }}"
        emailDescriptionKey: "{{ emailDescriptionKey }}"
        extraData: "{{ extraData }}"
        generator:
          avatarUrl: "{{ avatarUrl }}"
          displayName: "{{ displayName }}"
          displayNameKey: "{{ displayNameKey }}"
          id: "{{ id }}"
          type: "{{ type }}"
          url: "{{ url }}"
        type: "{{ type }}"
    - name: properties
      description: |
        Details of issue properties to be add or update.
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: transition
      description: |
        Details of a transition. Required when performing a transition, optional when creating or editing an issue.
      value:
        fields: "{{ fields }}"
        hasScreen: {{ hasScreen }}
        id: "{{ id }}"
        isAvailable: {{ isAvailable }}
        isConditional: {{ isConditional }}
        isGlobal: {{ isGlobal }}
        isInitial: {{ isInitial }}
        looped: {{ looped }}
        name: "{{ name }}"
        to:
          description: "{{ description }}"
          iconUrl: "{{ iconUrl }}"
          id: "{{ id }}"
          name: "{{ name }}"
          scope:
            project:
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              id: "{{ id }}"
              key: "{{ key }}"
              name: "{{ name }}"
              projectCategory:
                description: "{{ description }}"
                id: "{{ id }}"
                name: "{{ name }}"
                self: "{{ self }}"
              projectTypeKey: "{{ projectTypeKey }}"
              self: "{{ self }}"
              simplified: {{ simplified }}
            type: "{{ type }}"
          self: "{{ self }}"
          statusCategory:
            colorName: "{{ colorName }}"
            id: {{ id }}
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
    - name: update
      value: "{{ update }}"
      description: |
        A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in \`fields\`.
    - name: update_history
      value: {{ update_history }}
      description: Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen.
      description: Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. When provided, the issue type and request type are added to the user's history for a project. These values are then used to provide defaults on the issue create screen.
    - name: prefer_field_associated_errors
      value: {{ prefer_field_associated_errors }}
      description: EXPERIMENTAL. Whether you prefer errors that relate to a field to be returned as field errors (\`errors\`) rather than as general errors (\`errorMessages\`). A response can contain both kinds of error, regardless of what this is set to. When this is \`true\`, more errors are returned as field errors, and which errors are field errors and which are general errors isn't part of the contract and can change without notice.
      description: EXPERIMENTAL. Whether you prefer errors that relate to a field to be returned as field errors (\`errors\`) rather than as general errors (\`errorMessages\`). A response can contain both kinds of error, regardless of what this is set to. When this is \`true\`, more errors are returned as field errors, and which errors are field errors and which are general errors isn't part of the contract and can change without notice.
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

Edits an issue. Issue properties may be updated as part of the edit. Please note that issue transition is not supported and is ignored here. To transition an issue, please use &#91;Transition issue&#93;(#api-rest-api-3-issue-issueIdOrKey-transitions-post).&lt;br /&gt;&lt;br /&gt;The edits to the issue's fields are defined using `update` and `fields`. The fields that can be edited are determined using &#91; Get edit issue metadata&#93;(#api-rest-api-3-issue-issueIdOrKey-editmeta-get).&lt;br /&gt;&lt;br /&gt;**Note:** This endpoint doesn't check screen configurations to determine if a field is editable. For more context, see the &#91;Deprecation of override screen security&#93;(https:​//community.developer.atlassian.com/t/deprecation-of-override-screen-security/97153) announcement.&lt;br /&gt;&lt;br /&gt;The parent field may be set by key or ID. For standard issue types, the parent may be removed by setting `update.parent.set.none` to *true*. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Connect apps having an app user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), can override the screen security configuration using `overrideScreenSecurity` and `overrideEditableFlag`.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
UPDATE jira.issues.issues
SET 
fields = '{{ fields }}',
history_metadata = '{{ history_metadata }}',
properties = '{{ properties }}',
transition = '{{ transition }}',
update = '{{ update }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND notify_users = {{ notify_users}}
AND override_screen_security = {{ override_screen_security}}
AND override_editable_flag = {{ override_editable_flag}}
AND return_issue = {{ return_issue}}
AND expand = '{{ expand}}';
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

Deletes an issue.&lt;br /&gt;&lt;br /&gt;An issue cannot be deleted if it has one or more subtasks. To delete an issue with subtasks, set `deleteSubtasks`. This causes the issue's subtasks to be deleted with the issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Delete issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
DELETE FROM jira.issues.issues
WHERE issue_id_or_key = '{{ issue_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND delete_subtasks = '{{ delete_subtasks }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="bulk_delete"
    values={[
        { label: 'bulk_delete', value: 'bulk_delete' },
        { label: 'bulk_edit', value: 'bulk_edit' },
        { label: 'bulk_move', value: 'bulk_move' },
        { label: 'bulk_transition', value: 'bulk_transition' },
        { label: 'bulk_unwatch', value: 'bulk_unwatch' },
        { label: 'bulk_watch', value: 'bulk_watch' },
        { label: 'archive_by_jql', value: 'archive_by_jql' },
        { label: 'archive', value: 'archive' },
        { label: 'bulk_create', value: 'bulk_create' },
        { label: 'bulk_fetch', value: 'bulk_fetch' },
        { label: 'bulk_set_properties_by_list', value: 'bulk_set_properties_by_list' },
        { label: 'bulk_set_properties_by_issue', value: 'bulk_set_properties_by_issue' },
        { label: 'bulk_delete_property', value: 'bulk_delete_property' },
        { label: 'bulk_set_property', value: 'bulk_set_property' },
        { label: 'unarchive', value: 'unarchive' },
        { label: 'bulk_is_watching', value: 'bulk_is_watching' },
        { label: 'assign', value: 'assign' },
        { label: 'notify', value: 'notify' },
        { label: 'transition', value: 'transition' },
        { label: 'export_archived', value: 'export_archived' },
        { label: 'match_jql', value: 'match_jql' },
        { label: 'redact', value: 'redact' },
        { label: 'approximate_count', value: 'approximate_count' },
        { label: 'search_get', value: 'search_get' }
    ]}
>
<TabItem value="bulk_delete">

Use this API to submit a bulk delete request. You can delete up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Delete &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Delete-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_delete 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"selectedIssueIdsOrKeys": "{{ selectedIssueIdsOrKeys }}", 
"sendBulkNotification": {{ sendBulkNotification }}
}'
;
```
</TabItem>
<TabItem value="bulk_edit">

Use this API to submit a bulk edit request and simultaneously edit multiple issues. There are limits applied to the number of issues and fields that can be edited. A single request can accommodate a maximum of 1000 issues (including subtasks) and 200 fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  Edit &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_edit 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"editedFieldsInput": "{{ editedFieldsInput }}", 
"selectedActions": "{{ selectedActions }}", 
"selectedIssueIdsOrKeys": "{{ selectedIssueIdsOrKeys }}", 
"sendBulkNotification": {{ sendBulkNotification }}
}'
;
```
</TabItem>
<TabItem value="bulk_move">

Use this API to submit a bulk issue move request. You can move multiple issues from multiple projects in a single request, but they must all be moved to a single project, issue type, and parent. You can't move more than 1000 issues (including subtasks) at once.&lt;br /&gt;&lt;br /&gt;#### Scenarios: ####&lt;br /&gt;&lt;br /&gt;This is an early version of the API and it doesn't have full feature parity with the Bulk Move UI experience.&lt;br /&gt;&lt;br /&gt; *  Moving issue of type A to issue of type B in the same project or a different project: `SUPPORTED`&lt;br /&gt; *  Moving multiple issues of type A in one or more projects to multiple issues of type B in one of the source projects or a different project: `SUPPORTED`&lt;br /&gt; *  Moving issues of multiple issue types in one or more projects to issues of a single issue type in one of the source project or a different project: **`SUPPORTED`**  &lt;br /&gt;    E.g. Moving issues of story and task issue types in project 1 and project 2 to issues of task issue type in project 3&lt;br /&gt; *  Moving a standard parent issue of type A with its multiple subtask issue types in one project to standard issue of type B and multiple subtask issue types in the same project or a different project: `SUPPORTED`&lt;br /&gt; *  Moving standard issues with their subtasks to a parent issue in the same project or a different project without losing their relation: `SUPPORTED`&lt;br /&gt; *  Moving an epic issue with its child issues to a different project without losing their relation: `SUPPORTED`  &lt;br /&gt;    This usecase is **supported using multiple requests**. Move the epic in one request and then move the children in a separate request with target parent set to the epic issue id  &lt;br /&gt;      &lt;br /&gt;    (Alternatively, move them individually and stitch the relationship back with the Bulk Edit API)&lt;br /&gt;&lt;br /&gt;#### Limits applied to bulk issue moves: ####&lt;br /&gt;&lt;br /&gt;When using the bulk move, keep in mind that there are limits on the number of issues and fields you can include.&lt;br /&gt;&lt;br /&gt; *  You can move up to 1,000 issues in a single operation, including any subtasks.&lt;br /&gt; *  The total combined number of fields across all issues must not exceed 1,500,000. For example, if each issue includes 15,000 fields, then the maximum number of issues that can be moved is 100.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Move &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in source projects.&lt;br /&gt; *  Create &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in destination projects.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in destination projects, if moving subtasks only.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_move 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"sendBulkNotification": {{ sendBulkNotification }}, 
"targetToSourcesMapping": "{{ targetToSourcesMapping }}"
}'
;
```
</TabItem>
<TabItem value="bulk_transition">

Use this API to submit a bulk issue status transition request. You can transition multiple issues, alongside with their valid transition Ids. You can transition up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Transition &#91;issues permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/) in all projects that contain the selected issues.&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_transition 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"bulkTransitionInputs": "{{ bulkTransitionInputs }}", 
"sendBulkNotification": {{ sendBulkNotification }}
}'
;
```
</TabItem>
<TabItem value="bulk_unwatch">

Use this API to submit a bulk unwatch request. You can unwatch up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_unwatch 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"selectedIssueIdsOrKeys": "{{ selectedIssueIdsOrKeys }}"
}'
;
```
</TabItem>
<TabItem value="bulk_watch">

Use this API to submit a bulk watch request. You can watch up to 1,000 issues in a single operation.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_watch 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"selectedIssueIdsOrKeys": "{{ selectedIssueIdsOrKeys }}"
}'
;
```
</TabItem>
<TabItem value="archive_by_jql">

Enables admins to archive up to 100,000 issues in a single request using JQL, returning the URL to check the status of the submitted request.&lt;br /&gt;&lt;br /&gt;You can use the &#91;get task&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-get) and &#91;cancel task&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-rest-api-3-task-taskid-cancel-post) APIs to manage the request.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't archive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only archive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**Rate limiting:** Only a single request per jira instance can be active at any given time.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;

```sql
EXEC jira.issues.issues.archive_by_jql 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"jql": "{{ jql }}"
}'
;
```
</TabItem>
<TabItem value="archive">

Enables admins to archive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) archived in the process and the errors encountered, if any.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't archive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only archive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;

```sql
EXEC jira.issues.issues.archive 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueIdsOrKeys": "{{ issueIdsOrKeys }}"
}'
;
```
</TabItem>
<TabItem value="bulk_create">

Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue properties set.&lt;br /&gt;&lt;br /&gt;The content of each issue or subtask is defined using `update` and `fields`. The fields that can be set in the issue or subtask are determined using the &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get). These are the same fields that appear on the issues' create screens. Note that the `description`, `environment`, and any `textarea` type custom fields (multi-line text fields) take Atlassian Document Format content. Single line custom fields (`textfield`) accept a string and don't handle Atlassian Document Format content.&lt;br /&gt;&lt;br /&gt;Creating a subtask differs from creating an issue as follows:&lt;br /&gt;&lt;br /&gt; *  `issueType` must be set to a subtask issue type (use &#91; Get create issue metadata&#93;(#api-rest-api-3-issue-createmeta-get) to find subtask issue types).&lt;br /&gt; *  `parent` the must contain the ID or key of the parent issue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* and *Create issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which each issue or subtask is created.

```sql
EXEC jira.issues.issues.bulk_create 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueUpdates": "{{ issueUpdates }}"
}'
;
```
</TabItem>
<TabItem value="bulk_fetch">

Returns the details for a set of requested issues.&lt;br /&gt;&lt;br /&gt;By default you can request up to 100 issues in a single call. You can request up to 1000 issues in a single call when the request is shaped so that it can be served efficiently, that is, when *all* of the following are true:&lt;br /&gt;&lt;br /&gt; *  the `fields` parameter explicitly names at least one field to include — a request that contains only exclusions is **not** eligible, and neither are the `*all` and `*navigable` wildcards or the default navigable field set, because the number of resolved fields depends on the site's configuration;&lt;br /&gt; *  no more than 100 fields are explicitly included;&lt;br /&gt; *  none of the included fields returns multiple values (for example `comment`, `worklog`, or `attachment`); and&lt;br /&gt; *  the `expand` parameter does not include `changelog`, `editmeta`, `operations`, `renderedFields`, `transitions`, or `versionedRepresentations`.&lt;br /&gt;&lt;br /&gt;Requests that do not meet all of these conditions can include at most 100 issues; larger requests are rejected with a 400 error.&lt;br /&gt;&lt;br /&gt;Each issue is identified by its ID or key, however, if the identifier doesn't match an issue, a case-insensitive search and check for moved issues is performed. If a matching issue is found its details are returned, a 302 or other redirect is **not** returned.&lt;br /&gt;&lt;br /&gt;Issues will be returned in ascending `id` order. If there are errors, Jira will return a list of issues which couldn't be fetched along with error messages.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_fetch 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"expand": "{{ expand }}", 
"fields": "{{ fields }}", 
"fieldsByKeys": {{ fieldsByKeys }}, 
"issueIdsOrKeys": "{{ issueIdsOrKeys }}", 
"properties": "{{ properties }}"
}'
;
```
</TabItem>
<TabItem value="bulk_set_properties_by_list">

Sets or updates a list of entity property values on issues. A list of up to 10 entity properties can be specified along with up to 10,000 issues on which to set or update that list of entity properties.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON. The maximum length of single issue property value is 32768 characters. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either all properties are updated in all eligible issues or, when errors occur, no properties are updated.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_set_properties_by_list 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"entitiesIds": "{{ entitiesIds }}", 
"properties": "{{ properties }}"
}'
;
```
</TabItem>
<TabItem value="bulk_set_properties_by_issue">

Sets or updates entity property values on issues. Up to 10 entity properties can be specified for each issue and up to 100 issues included in the request.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt; *  non-transactional. Updating some entities may fail. Such information will available in the task result.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_set_properties_by_issue 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}"
}'
;
```
</TabItem>
<TabItem value="bulk_delete_property">

Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.&lt;br /&gt;&lt;br /&gt;The criteria the filter used to identify eligible issues are:&lt;br /&gt;&lt;br /&gt; *  `entityIds` Only issues from this list are eligible.&lt;br /&gt; *  `currentValue` Only issues with the property set to this value are eligible.&lt;br /&gt;&lt;br /&gt;If both criteria is specified, they are joined with the logical *AND*: only issues that satisfy both criteria are considered eligible.&lt;br /&gt;&lt;br /&gt;If no filter criteria are specified, all the issues visible to the user and where the user has the EDIT\_ISSUES permission for the issue are considered eligible.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either the property is deleted from all eligible issues or, when errors occur, no properties are deleted.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each project containing issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each issue.

```sql
EXEC jira.issues.issues.bulk_delete_property 
@propertyKey='{{ propertyKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"currentValue": "{{ currentValue }}", 
"entityIds": "{{ entityIds }}"
}'
;
```
</TabItem>
<TabItem value="bulk_set_property">

Sets a property value on multiple issues.&lt;br /&gt;&lt;br /&gt;The value set can be a constant or determined by a &#91;Jira expression&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/). Expressions must be computable with constant complexity when applied to a set of issues. Expressions must also comply with the &#91;restrictions&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions) that apply to all Jira expressions.&lt;br /&gt;&lt;br /&gt;The issues to be updated can be specified by a filter.&lt;br /&gt;&lt;br /&gt;The filter identifies issues eligible for update using these criteria:&lt;br /&gt;&lt;br /&gt; *  `entityIds` Only issues from this list are eligible.&lt;br /&gt; *  `currentValue` Only issues with the property set to this value are eligible.&lt;br /&gt; *  `hasProperty`:&lt;br /&gt;    &lt;br /&gt;     *  If *true*, only issues with the property are eligible.&lt;br /&gt;     *  If *false*, only issues without the property are eligible.&lt;br /&gt;&lt;br /&gt;If more than one criteria is specified, they are joined with the logical *AND*: only issues that satisfy all criteria are eligible.&lt;br /&gt;&lt;br /&gt;If an invalid combination of criteria is provided, an error is returned. For example, specifying a `currentValue` and `hasProperty` as *false* would not match any issues (because without the property the property cannot have a value).&lt;br /&gt;&lt;br /&gt;The filter is optional. Without the filter all the issues visible to the user and where the user has the EDIT\_ISSUES permission for the issue are considered eligible.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, either all eligible issues are updated or, when errors occur, none are updated.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each project containing issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for each issue.

```sql
EXEC jira.issues.issues.bulk_set_property 
@propertyKey='{{ propertyKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"expression": "{{ expression }}", 
"filter": "{{ filter }}", 
"value": "{{ value }}"
}'
;
```
</TabItem>
<TabItem value="unarchive">

Enables admins to unarchive up to 1000 issues in a single request using issue ID/key, returning details of the issue(s) unarchived in the process and the errors encountered, if any.&lt;br /&gt;&lt;br /&gt;**Note that:**&lt;br /&gt;&lt;br /&gt; *  you can't unarchive subtasks directly, only through their parent issues&lt;br /&gt; *  you can only unarchive issues from software, service management, and business projects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;

```sql
EXEC jira.issues.issues.unarchive 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueIdsOrKeys": "{{ issueIdsOrKeys }}"
}'
;
```
</TabItem>
<TabItem value="bulk_is_watching">

Returns, for the user, details of the watched status of issues from a list. If an issue ID is invalid, the returned watched status is `false`.&lt;br /&gt;&lt;br /&gt;This operation requires the **Allow users to watch issues** option to be *ON*. This option is set in General configuration for Jira. See &#91;Configuring Jira application options&#93;(https:​//confluence.atlassian.com/x/uYXKM) for details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.bulk_is_watching 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueIds": "{{ issueIds }}"
}'
;
```
</TabItem>
<TabItem value="assign">

Assigns an issue to a user. Use this operation when the calling user does not have the *Edit Issues* permission but has the *Assign issue* permission for the project that the issue is in.&lt;br /&gt;&lt;br /&gt;If `name` or `accountId` is set to:&lt;br /&gt;&lt;br /&gt; *  `"-1"`, the issue is assigned to the default assignee for the project.&lt;br /&gt; *  `null`, the issue is set to unassigned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* and *Assign Issues* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.assign 
@issueIdOrKey='{{ issueIdOrKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"accountId": "{{ accountId }}", 
"key": "{{ key }}", 
"name": "{{ name }}"
}'
;
```
</TabItem>
<TabItem value="notify">

Creates an email notification for an issue and adds it to the mail queue.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.notify 
@issueIdOrKey='{{ issueIdOrKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"htmlBody": "{{ htmlBody }}", 
"restrict": "{{ restrict }}", 
"subject": "{{ subject }}", 
"textBody": "{{ textBody }}", 
"to": "{{ to }}"
}'
;
```
</TabItem>
<TabItem value="transition">

Performs an issue transition and, if the transition has a screen, updates the fields from the transition screen.&lt;br /&gt;&lt;br /&gt;sortByCategory To update the fields on the transition screen, specify the fields in the `fields` or `update` parameters in the request body. Get details about the fields using &#91; Get transitions&#93;(#api-rest-api-3-issue-issueIdOrKey-transitions-get) with the `transitions.fields` expand.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Transition issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.transition 
@issueIdOrKey='{{ issueIdOrKey }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@preferFieldAssociatedErrors={{ preferFieldAssociatedErrors }} 
@@json=
'{
"fields": "{{ fields }}", 
"historyMetadata": "{{ historyMetadata }}", 
"properties": "{{ properties }}", 
"transition": "{{ transition }}", 
"update": "{{ update }}"
}'
;
```
</TabItem>
<TabItem value="export_archived">

Enables admins to retrieve details of all archived issues. Upon a successful request, the admin who submitted it will receive an email with a link to download a CSV file with the issue details.&lt;br /&gt;&lt;br /&gt;Note that this API only exports the values of system fields and archival-specific fields (`ArchivedBy` and `ArchivedDate`). Custom fields aren't supported.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Jira admin or site admin: &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)&lt;br /&gt;&lt;br /&gt;**License required:** Premium or Enterprise&lt;br /&gt;&lt;br /&gt;**Signed-in users only:** This API can't be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**Rate limiting:** Only a single request can be active at any given time.&lt;br /&gt;&lt;br /&gt;  &lt;br /&gt;

```sql
EXEC jira.issues.issues.export_archived 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"archivedBy": "{{ archivedBy }}", 
"archivedDateRange": "{{ archivedDateRange }}", 
"issueTypes": "{{ issueTypes }}", 
"projects": "{{ projects }}", 
"reporters": "{{ reporters }}"
}'
;
```
</TabItem>
<TabItem value="match_jql">

Checks whether one or more issues would be returned by one or more JQL queries. Up to 10 JQL queries can be specified and up to 50 issue IDs included in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, issues are only matched against JQL queries where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.match_jql 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueIds": "{{ issueIds }}", 
"jqls": "{{ jqls }}"
}'
;
```
</TabItem>
<TabItem value="redact">

Submit a job to redact issue field data. This will trigger the redaction of the data in the specified fields asynchronously.&lt;br /&gt;&lt;br /&gt;The redaction status can be polled using the job id.

```sql
EXEC jira.issues.issues.redact 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"redactions": "{{ redactions }}"
}'
;
```
</TabItem>
<TabItem value="approximate_count">

Provide an estimated count of the issues that match the &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned output. This endpoint requires JQL to be bounded.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.approximate_count 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"jql": "{{ jql }}"
}'
;
```
</TabItem>
<TabItem value="search_get">

Searches for issues using &#91;JQL&#93;(https:​//confluence.atlassian.com/x/egORLQ). Recent updates might not be immediately visible in the returned search results. If you need &#91;read-after-write&#93;(https:​//developer.atlassian.com/cloud/jira/platform/search-and-reconcile/) consistency, you can utilize the `reconcileIssues` parameter to ensure stronger consistency assurances. This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;If the JQL query expression is too large to be encoded as a query parameter, use the &#91;POST&#93;(#api-rest-api-3-search-post) version of this resource.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Issues are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
EXEC jira.issues.issues.search_get 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@jql='{{ jql }}', 
@nextPageToken='{{ nextPageToken }}', 
@maxResults='{{ maxResults }}', 
@fields='{{ fields }}', 
@expand='{{ expand }}', 
@properties='{{ properties }}', 
@fieldsByKeys={{ fieldsByKeys }}, 
@failFast={{ failFast }}, 
@reconcileIssues='{{ reconcileIssues }}', 
@includeArchivedProjects={{ includeArchivedProjects }}
;
```
</TabItem>
</Tabs>
