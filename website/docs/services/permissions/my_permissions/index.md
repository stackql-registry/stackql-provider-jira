--- 
title: my_permissions
hide_title: false
hide_table_of_contents: false
keywords:
  - my_permissions
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the my_permissions resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>my_permissions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="my_permissions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.my_permissions" /></td></tr>
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

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
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
    <td><a href="#parameter-permissions"><code>permissions</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_key"><code>project_key</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-issue_key"><code>issue_key</code></a>, <a href="#parameter-issue_id"><code>issue_id</code></a>, <a href="#parameter-project_uuid"><code>project_uuid</code></a>, <a href="#parameter-project_configuration_uuid"><code>project_configuration_uuid</code></a>, <a href="#parameter-comment_id"><code>comment_id</code></a></td>
    <td>Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, issue or comment context.&lt;br /&gt;&lt;br /&gt;The user is reported as having a project permission:&lt;br /&gt;&lt;br /&gt; *  in the global context, if the user has the project permission in any project.&lt;br /&gt; *  for a project, where the project permission is determined using issue data, if the user meets the permission's criteria for any issue in the project. Otherwise, if the user has the project permission in the project.&lt;br /&gt; *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.&lt;br /&gt; *  for a comment, where the user has both the permission to browse the comment and the project permission for the comment's parent issue. Only the BROWSE\_PROJECTS permission is supported. If a `commentId` is provided whose `permissions` does not equal BROWSE\_PROJECTS, a 400 error will be returned.&lt;br /&gt;&lt;br /&gt;This means that users may be shown as having an issue permission (such as EDIT\_ISSUES) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\_ISSUES permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\_ISSUES permission for that issue.&lt;br /&gt;&lt;br /&gt;For &#91;Jira Service Management project permissions&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/customize-jira-service-management-permissions/), this will be evaluated similarly to a user in the customer portal. For example, if the BROWSE\_PROJECTS permission is granted to Service Project Customer - Portal Access, any users with access to the customer portal will have the BROWSE\_PROJECTS permission.&lt;br /&gt;&lt;br /&gt;Global permissions are unaffected by context.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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
<tr id="parameter-permissions">
    <td><CopyableCode code="permissions" /></td>
    <td><code>string</code></td>
    <td>A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use &#91;Get all permissions&#93;(#api-rest-api-3-permissions-get).</td>
</tr>
<tr id="parameter-comment_id">
    <td><CopyableCode code="comment_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the comment. (wire: commentId)</td>
</tr>
<tr id="parameter-issue_id">
    <td><CopyableCode code="issue_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue. (wire: issueId)</td>
</tr>
<tr id="parameter-issue_key">
    <td><CopyableCode code="issue_key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue. Ignored if `issueId` is provided. (wire: issueKey)</td>
</tr>
<tr id="parameter-project_configuration_uuid">
    <td><CopyableCode code="project_configuration_uuid" /></td>
    <td><code>string</code></td>
    <td> (wire: projectConfigurationUuid)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>The ID of project. (wire: projectId)</td>
</tr>
<tr id="parameter-project_key">
    <td><CopyableCode code="project_key" /></td>
    <td><code>string</code></td>
    <td>The key of project. Ignored if `projectId` is provided. (wire: projectKey)</td>
</tr>
<tr id="parameter-project_uuid">
    <td><CopyableCode code="project_uuid" /></td>
    <td><code>string</code></td>
    <td> (wire: projectUuid)</td>
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

Returns a list of permissions indicating which permissions the user has. Details of the user's permissions can be obtained in a global, project, issue or comment context.&lt;br /&gt;&lt;br /&gt;The user is reported as having a project permission:&lt;br /&gt;&lt;br /&gt; *  in the global context, if the user has the project permission in any project.&lt;br /&gt; *  for a project, where the project permission is determined using issue data, if the user meets the permission's criteria for any issue in the project. Otherwise, if the user has the project permission in the project.&lt;br /&gt; *  for an issue, where a project permission is determined using issue data, if the user has the permission in the issue. Otherwise, if the user has the project permission in the project containing the issue.&lt;br /&gt; *  for a comment, where the user has both the permission to browse the comment and the project permission for the comment's parent issue. Only the BROWSE\_PROJECTS permission is supported. If a `commentId` is provided whose `permissions` does not equal BROWSE\_PROJECTS, a 400 error will be returned.&lt;br /&gt;&lt;br /&gt;This means that users may be shown as having an issue permission (such as EDIT\_ISSUES) in the global context or a project context but may not have the permission for any or all issues. For example, if Reporters have the EDIT\_ISSUES permission a user would be shown as having this permission in the global context or the context of a project, because any user can be a reporter. However, if they are not the user who reported the issue queried they would not have EDIT\_ISSUES permission for that issue.&lt;br /&gt;&lt;br /&gt;For &#91;Jira Service Management project permissions&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/customize-jira-service-management-permissions/), this will be evaluated similarly to a user in the customer portal. For example, if the BROWSE\_PROJECTS permission is granted to Service Project Customer - Portal Access, any users with access to the customer portal will have the BROWSE\_PROJECTS permission.&lt;br /&gt;&lt;br /&gt;Global permissions are unaffected by context.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
*
FROM jira.permissions.my_permissions
WHERE permissions = '{{ permissions }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_key = '{{ project_key }}'
AND project_id = '{{ project_id }}'
AND issue_key = '{{ issue_key }}'
AND issue_id = '{{ issue_id }}'
AND project_uuid = '{{ project_uuid }}'
AND project_configuration_uuid = '{{ project_configuration_uuid }}'
AND comment_id = '{{ comment_id }}'
;
```
</TabItem>
</Tabs>
