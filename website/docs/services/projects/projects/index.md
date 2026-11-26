--- 
title: projects
hide_title: false
hide_table_of_contents: false
keywords:
  - projects
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the projects resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.projects" /></td></tr>
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

Returned if successful.

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
    <td>The ID of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is archived.</td>
</tr>
<tr>
    <td><CopyableCode code="archived_by" /></td>
    <td><code>object</code></td>
    <td>The user who archived the project. (wire: archivedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="archived_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was archived. (wire: archivedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="assignee_type" /></td>
    <td><code>string</code></td>
    <td>The default assignee when creating issues for this project. (PROJECT_LEAD, UNASSIGNED) (wire: assigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The URLs of the project's avatars. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="components" /></td>
    <td><code>array</code></td>
    <td>List of the components contained in the project.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is marked as deleted.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_by" /></td>
    <td><code>object</code></td>
    <td>The user who marked the project as deleted. (wire: deletedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was marked as deleted. (wire: deletedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A brief description of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>An email address associated with the project.</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="insight" /></td>
    <td><code>object</code></td>
    <td>Insights about the project.</td>
</tr>
<tr>
    <td><CopyableCode code="is_private" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is private from the user's perspective. This means the user can't see the project or any associated issues. (wire: isPrivate)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_hierarchy" /></td>
    <td><code>object</code></td>
    <td>The issue type hierarchy for the project. (wire: issueTypeHierarchy)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>array</code></td>
    <td>List of the issue types available in the project. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="landing_page_info" /></td>
    <td><code>object</code></td>
    <td>The project landing page info. (wire: landingPageInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="lead" /></td>
    <td><code>object</code></td>
    <td>The username of the project lead.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>object</code></td>
    <td>User permissions on the project</td>
</tr>
<tr>
    <td><CopyableCode code="project_category" /></td>
    <td><code>object</code></td>
    <td>The category the project belongs to. (wire: projectCategory)</td>
</tr>
<tr>
    <td><CopyableCode code="project_type_key" /></td>
    <td><code>string</code></td>
    <td>The &#91;project type&#93;(https:​//confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. (software, service_desk, business, product_discovery) (wire: projectTypeKey)</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Map of project properties. Only the properties named in the request's properties query parameter are returned, so this is an empty object when that parameter is omitted.</td>
</tr>
<tr>
    <td><CopyableCode code="retention_till_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project is deleted permanently. (wire: retentionTillDate)</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>object</code></td>
    <td>The name and self URL for each role defined in the project. For more information, see &#91;Create project role&#93;(#api-rest-api-3-role-post).</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the project details.</td>
</tr>
<tr>
    <td><CopyableCode code="simplified" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is simplified.</td>
</tr>
<tr>
    <td><CopyableCode code="style" /></td>
    <td><code>string</code></td>
    <td>The type of the project. (classic, next-gen)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>A link to information about this project, such as project documentation.</td>
</tr>
<tr>
    <td><CopyableCode code="uuid" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects.</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td>The versions defined in the project. For more information, see &#91;Create version&#93;(#api-rest-api-3-version-post).</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about a project.

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
    <td>The ID of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="archived" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is archived.</td>
</tr>
<tr>
    <td><CopyableCode code="archived_by" /></td>
    <td><code>object</code></td>
    <td>The user who archived the project. (wire: archivedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="archived_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was archived. (wire: archivedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="assignee_type" /></td>
    <td><code>string</code></td>
    <td>The default assignee when creating issues for this project. (PROJECT_LEAD, UNASSIGNED) (wire: assigneeType)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The URLs of the project's avatars. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="components" /></td>
    <td><code>array</code></td>
    <td>List of the components contained in the project.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is marked as deleted.</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_by" /></td>
    <td><code>object</code></td>
    <td>The user who marked the project as deleted. (wire: deletedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="deleted_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project was marked as deleted. (wire: deletedDate)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A brief description of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td>An email address associated with the project.</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="insight" /></td>
    <td><code>object</code></td>
    <td>Insights about the project.</td>
</tr>
<tr>
    <td><CopyableCode code="is_private" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is private from the user's perspective. This means the user can't see the project or any associated issues. (wire: isPrivate)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_type_hierarchy" /></td>
    <td><code>object</code></td>
    <td>The issue type hierarchy for the project. (wire: issueTypeHierarchy)</td>
</tr>
<tr>
    <td><CopyableCode code="issue_types" /></td>
    <td><code>array</code></td>
    <td>List of the issue types available in the project. (wire: issueTypes)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project.</td>
</tr>
<tr>
    <td><CopyableCode code="landing_page_info" /></td>
    <td><code>object</code></td>
    <td>The project landing page info. (wire: landingPageInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="lead" /></td>
    <td><code>object</code></td>
    <td>The username of the project lead.</td>
</tr>
<tr>
    <td><CopyableCode code="permissions" /></td>
    <td><code>object</code></td>
    <td>User permissions on the project</td>
</tr>
<tr>
    <td><CopyableCode code="project_category" /></td>
    <td><code>object</code></td>
    <td>The category the project belongs to. (wire: projectCategory)</td>
</tr>
<tr>
    <td><CopyableCode code="project_type_key" /></td>
    <td><code>string</code></td>
    <td>The &#91;project type&#93;(https:​//confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the project. (software, service_desk, business, product_discovery) (wire: projectTypeKey)</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Map of project properties. Only the properties named in the request's properties query parameter are returned, so this is an empty object when that parameter is omitted.</td>
</tr>
<tr>
    <td><CopyableCode code="retention_till_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date when the project is deleted permanently. (wire: retentionTillDate)</td>
</tr>
<tr>
    <td><CopyableCode code="roles" /></td>
    <td><code>object</code></td>
    <td>The name and self URL for each role defined in the project. For more information, see &#91;Create project role&#93;(#api-rest-api-3-role-post).</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the project details.</td>
</tr>
<tr>
    <td><CopyableCode code="simplified" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project is simplified.</td>
</tr>
<tr>
    <td><CopyableCode code="style" /></td>
    <td><code>string</code></td>
    <td>The type of the project. (classic, next-gen)</td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td>A link to information about this project, such as project documentation.</td>
</tr>
<tr>
    <td><CopyableCode code="uuid" /></td>
    <td><code>string (uuid)</code></td>
    <td>Unique ID for next-gen projects.</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td>The versions defined in the project. For more information, see &#91;Create version&#93;(#api-rest-api-3-version-post).</td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-properties"><code>properties</code></a></td>
    <td>Returns the &#91;project details&#93;(https:​//confluence.atlassian.com/x/ahLpNw) for a project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-keys"><code>keys</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-type_key"><code>type_key</code></a>, <a href="#parameter-category_id"><code>category_id</code></a>, <a href="#parameter-action"><code>action</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-properties"><code>properties</code></a>, <a href="#parameter-property_query"><code>property_query</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of projects visible to the user.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Projects are returned only where the user has one of:&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-key"><code>key</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates a project based on a project type template, as shown in the following table:&lt;br /&gt;&lt;br /&gt;| Project Type Key | Project Template Key |  &lt;br /&gt;|--|--|  &lt;br /&gt;| `business` | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |  &lt;br /&gt;| `service_desk` | `com.atlassian.servicedesk:simplified-it-service-management`, `com.atlassian.servicedesk:simplified-external-service-desk`, `com.atlassian.servicedesk:simplified-hr-service-desk`, `com.atlassian.servicedesk:simplified-facilities-service-desk`, `com.atlassian.servicedesk:simplified-legal-service-desk`, `com.atlassian.servicedesk:simplified-analytics-service-desk`, `com.atlassian.servicedesk:simplified-marketing-service-desk`, `com.atlassian.servicedesk:simplified-design-service-desk`, `com.atlassian.servicedesk:simplified-sales-service-desk`, `com.atlassian.servicedesk:simplified-finance-service-desk`, `com.atlassian.servicedesk:company-managed-blank-service-project`, `com.atlassian.servicedesk:company-managed-general-service-project`, `com.atlassian.servicedesk:team-managed-general-service-project`, `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`, `com.atlassian.servicedesk:next-gen-legal-service-desk`, `com.atlassian.servicedesk:next-gen-marketing-service-desk`, `com.atlassian.servicedesk:next-gen-facilities-service-desk`, `com.atlassian.servicedesk:next-gen-analytics-service-desk`, `com.atlassian.servicedesk:next-gen-finance-service-desk`, `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk` |  &lt;br /&gt;| `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |  &lt;br /&gt;| `customer_service` | `com.atlassian.jcs:customer-service-management` |  &lt;br /&gt;The project types are available according to the installed Jira features as follows:&lt;br /&gt;&lt;br /&gt; *  Jira Core, the default, enables `business` projects.&lt;br /&gt; *  Jira Service Management enables `service_desk` projects.&lt;br /&gt; *  Jira Software enables `software` projects.&lt;br /&gt; *  Jira Customer Service enables `customer_service` projects.&lt;br /&gt;&lt;br /&gt;To determine which features are installed, go to **Jira settings** &gt; **Apps** &gt; **Manage apps** and review the System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** &gt; **Apps** &gt; **Finding new apps**. For more information, see &#91; Managing add-ons&#93;(https:​//confluence.atlassian.com/x/S31NLg).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Updates the &#91;project details&#93;(https:​//confluence.atlassian.com/x/ahLpNw) of a project.&lt;br /&gt;&lt;br /&gt;All parameters are optional in the body of the request. Schemes will only be updated if they are included in the request, any omitted schemes will be left unchanged.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). is only needed when changing the schemes or project key. Otherwise you will only need *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-enable_undo"><code>enable_undo</code></a></td>
    <td>Deletes a project.&lt;br /&gt;&lt;br /&gt;You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create_from_template"><CopyableCode code="create_from_template" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a project based on a custom template provided in the request.&lt;br /&gt;&lt;br /&gt;The request body should contain the project details and the capabilities that comprise the project:&lt;br /&gt;&lt;br /&gt; *  `details` \- represents the project details settings&lt;br /&gt; *  `template` \- represents a list of capabilities responsible for creating specific parts of a project&lt;br /&gt;&lt;br /&gt;A capability is defined as a unit of configuration for the project you want to create.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `Location` link in the response header to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;***Note: This API is only supported for Jira Enterprise edition.***&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#archive"><CopyableCode code="archive" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#set_avatar"><CopyableCode code="set_avatar" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Sets the avatar displayed for a project.&lt;br /&gt;&lt;br /&gt;Use &#91;Load project avatar&#93;(#api-rest-api-3-project-projectIdOrKey-avatar2-post) to store avatars against the project, before using this operation to set the displayed avatar.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).</td>
</tr>
<tr>
    <td><a href="#delete_avatar"><CopyableCode code="delete_avatar" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a custom avatar from a project. Note that system avatars cannot be deleted.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).</td>
</tr>
<tr>
    <td><a href="#remove_default_classification_level"><CopyableCode code="remove_default_classification_level" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Remove the default data classification level for a project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** any **one** of the following is sufficient.&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#set_default_classification_level"><CopyableCode code="set_default_classification_level" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Updates the default data classification level for a project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** any **one** of the following is sufficient.&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete_async"><CopyableCode code="delete_async" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a project asynchronously.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, that is, if part of the delete fails the project is not deleted.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#restore"><CopyableCode code="restore" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Restores a project that has been archived or placed in the Jira recycle bin.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)for Company managed projects.&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project for Team managed projects.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the avatar.</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive).</td>
</tr>
<tr id="parameter-action">
    <td><CopyableCode code="action" /></td>
    <td><code>string</code></td>
    <td>Filter results by projects for which the user can:   *  `view` the project, meaning that they have one of the following permissions:           *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).  *  `browse` the project, meaning that they have the *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.  *  `edit` the project, meaning that they have one of the following permissions:           *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.      *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).  *  `create` the project, meaning that they have the *Create issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project in which the issue is created.</td>
</tr>
<tr id="parameter-category_id">
    <td><CopyableCode code="category_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project's category. A complete list of category IDs is found using the &#91;Get all project categories&#93;(#api-rest-api-3-projectCategory-get) operation. (wire: categoryId)</td>
</tr>
<tr id="parameter-enable_undo">
    <td><CopyableCode code="enable_undo" /></td>
    <td><code>boolean</code></td>
    <td>Whether this project is placed in the Jira recycle bin where it will be available for restoration. (wire: enableUndo)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Note that the project description, issue types, and project lead are included in all responses by default. Expand options include:   *  `description` The project description.  *  `issueTypes` The issue types associated with the project.  *  `lead` The project lead.  *  `projectKeys` All project keys associated with the project.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The project IDs to filter the results by. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Up to 50 project IDs can be provided.</td>
</tr>
<tr id="parameter-keys">
    <td><CopyableCode code="keys" /></td>
    <td><code>array</code></td>
    <td>The project keys to filter the results by. To include multiple keys, provide an ampersand-separated list. For example, `keys=PA&keys=PB`. Up to 50 project keys can be provided.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. Must be less than or equal to 100. If a value greater than 100 is provided, the `maxResults` parameter will default to 100. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field.   *  `category` Sorts by project category. A complete list of category IDs is found using &#91;Get all project categories&#93;(#api-rest-api-3-projectCategory-get).  *  `issueCount` Sorts by the total number of issues in each project.  *  `key` Sorts by project key.  *  `lastIssueUpdatedTime` Sorts by the last issue update time.  *  `name` Sorts by project name.  *  `owner` Sorts by project lead.  *  `archivedDate` EXPERIMENTAL. Sorts by project archived date.  *  `deletedDate` EXPERIMENTAL. Sorts by project deleted date. (wire: orderBy)</td>
</tr>
<tr id="parameter-properties">
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>EXPERIMENTAL. A list of project properties to return for the project. This parameter accepts a comma-separated list.</td>
</tr>
<tr id="parameter-property_query">
    <td><CopyableCode code="property_query" /></td>
    <td><code>string</code></td>
    <td>EXPERIMENTAL. A query string used to search properties. The query string cannot be specified using a JSON object. For example, to search for the value of `nested` from `&#123;"something":&#123;"nested":1,"other":2&#125;&#125;` use `&#91;thepropertykey&#93;.something.nested=1`. Note that the propertyQuery key is enclosed in square brackets to enable searching where the propertyQuery key includes dot (.) or equals (=) characters. Note that `thepropertykey` is only returned when included in `properties`. (wire: propertyQuery)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>Filter the results using a literal string. Projects with a matching `key` or `name` are returned (case insensitive).</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>array</code></td>
    <td>EXPERIMENTAL. Filter results by project status:   *  `live` Search live projects.  *  `archived` Search archived projects.  *  `deleted` Search deleted projects, those in the recycle bin.</td>
</tr>
<tr id="parameter-type_key">
    <td><CopyableCode code="type_key" /></td>
    <td><code>string</code></td>
    <td>Orders results by the &#91;project type&#93;(https:​//confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes). This parameter accepts a comma-separated list. Valid values are `business`, `service_desk`, and `software`. (wire: typeKey)</td>
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

Returns the &#91;project details&#93;(https:​//confluence.atlassian.com/x/ahLpNw) for a project.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.

```sql
SELECT
id,
name,
archived,
archived_by,
archived_date,
assignee_type,
avatar_urls,
components,
deleted,
deleted_by,
deleted_date,
description,
email,
favourite,
insight,
is_private,
issue_type_hierarchy,
issue_types,
key,
landing_page_info,
lead,
permissions,
project_category,
project_type_key,
properties,
retention_till_date,
roles,
self,
simplified,
style,
url,
uuid,
versions
FROM jira.projects.projects
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
AND properties = '{{ properties }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of projects visible to the user.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Projects are returned only where the user has one of:&lt;br /&gt;&lt;br /&gt; *  *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
archived,
archived_by,
archived_date,
assignee_type,
avatar_urls,
components,
deleted,
deleted_by,
deleted_date,
description,
email,
favourite,
insight,
is_private,
issue_type_hierarchy,
issue_types,
key,
landing_page_info,
lead,
permissions,
project_category,
project_type_key,
properties,
retention_till_date,
roles,
self,
simplified,
style,
url,
uuid,
versions
FROM jira.projects.projects
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND order_by = '{{ order_by }}'
AND id = '{{ id }}'
AND keys = '{{ keys }}'
AND query = '{{ query }}'
AND type_key = '{{ type_key }}'
AND category_id = '{{ category_id }}'
AND action = '{{ action }}'
AND expand = '{{ expand }}'
AND status = '{{ status }}'
AND properties = '{{ properties }}'
AND property_query = '{{ property_query }}'
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

Creates a project based on a project type template, as shown in the following table:&lt;br /&gt;&lt;br /&gt;| Project Type Key | Project Template Key |  &lt;br /&gt;|--|--|  &lt;br /&gt;| `business` | `com.atlassian.jira-core-project-templates:jira-core-simplified-content-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval`, `com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking`, `com.atlassian.jira-core-project-templates:jira-core-simplified-process-control`, `com.atlassian.jira-core-project-templates:jira-core-simplified-procurement`, `com.atlassian.jira-core-project-templates:jira-core-simplified-project-management`, `com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment`, `com.atlassian.jira-core-project-templates:jira-core-simplified-task-tracking` |  &lt;br /&gt;| `service_desk` | `com.atlassian.servicedesk:simplified-it-service-management`, `com.atlassian.servicedesk:simplified-external-service-desk`, `com.atlassian.servicedesk:simplified-hr-service-desk`, `com.atlassian.servicedesk:simplified-facilities-service-desk`, `com.atlassian.servicedesk:simplified-legal-service-desk`, `com.atlassian.servicedesk:simplified-analytics-service-desk`, `com.atlassian.servicedesk:simplified-marketing-service-desk`, `com.atlassian.servicedesk:simplified-design-service-desk`, `com.atlassian.servicedesk:simplified-sales-service-desk`, `com.atlassian.servicedesk:simplified-finance-service-desk`, `com.atlassian.servicedesk:company-managed-blank-service-project`, `com.atlassian.servicedesk:company-managed-general-service-project`, `com.atlassian.servicedesk:team-managed-general-service-project`, `com.atlassian.servicedesk:next-gen-it-service-desk`, `com.atlassian.servicedesk:next-gen-hr-service-desk`, `com.atlassian.servicedesk:next-gen-legal-service-desk`, `com.atlassian.servicedesk:next-gen-marketing-service-desk`, `com.atlassian.servicedesk:next-gen-facilities-service-desk`, `com.atlassian.servicedesk:next-gen-analytics-service-desk`, `com.atlassian.servicedesk:next-gen-finance-service-desk`, `com.atlassian.servicedesk:next-gen-design-service-desk`, `com.atlassian.servicedesk:next-gen-sales-service-desk` |  &lt;br /&gt;| `software` | `com.pyxis.greenhopper.jira:gh-simplified-agility-kanban`, `com.pyxis.greenhopper.jira:gh-simplified-agility-scrum`, `com.pyxis.greenhopper.jira:gh-simplified-basic`, `com.pyxis.greenhopper.jira:gh-simplified-kanban-classic`, `com.pyxis.greenhopper.jira:gh-simplified-scrum-classic` |  &lt;br /&gt;| `customer_service` | `com.atlassian.jcs:customer-service-management` |  &lt;br /&gt;The project types are available according to the installed Jira features as follows:&lt;br /&gt;&lt;br /&gt; *  Jira Core, the default, enables `business` projects.&lt;br /&gt; *  Jira Service Management enables `service_desk` projects.&lt;br /&gt; *  Jira Software enables `software` projects.&lt;br /&gt; *  Jira Customer Service enables `customer_service` projects.&lt;br /&gt;&lt;br /&gt;To determine which features are installed, go to **Jira settings** &gt; **Apps** &gt; **Manage apps** and review the System Apps list. To add Jira Software or Jira Service Management into a JIRA instance, use **Jira settings** &gt; **Apps** &gt; **Finding new apps**. For more information, see &#91; Managing add-ons&#93;(https:​//confluence.atlassian.com/x/S31NLg).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.projects.projects (
assignee_type,
avatar_id,
category_id,
description,
field_configuration_scheme,
field_scheme,
issue_security_scheme,
issue_type_scheme,
issue_type_screen_scheme,
key,
lead,
lead_account_id,
name,
notification_scheme,
permission_scheme,
project_template_key,
project_type_key,
url,
workflow_scheme,
cloud_id
)
SELECT 
'{{ assignee_type }}',
{{ avatar_id }},
{{ category_id }},
'{{ description }}',
{{ field_configuration_scheme }},
{{ field_scheme }},
{{ issue_security_scheme }},
{{ issue_type_scheme }},
{{ issue_type_screen_scheme }},
'{{ key }}' /* required */,
'{{ lead }}',
'{{ lead_account_id }}',
'{{ name }}' /* required */,
{{ notification_scheme }},
{{ permission_scheme }},
'{{ project_template_key }}',
'{{ project_type_key }}',
'{{ url }}',
{{ workflow_scheme }},
'{{ cloud_id }}'
RETURNING
id,
key,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: projects
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the projects resource.
    - name: assignee_type
      value: "{{ assignee_type }}"
      description: |
        The default assignee when creating issues for this project.
      valid_values: ['PROJECT_LEAD', 'UNASSIGNED']
    - name: avatar_id
      value: {{ avatar_id }}
      description: |
        An integer value for the project's avatar.
    - name: category_id
      value: {{ category_id }}
      description: |
        The ID of the project's category. A complete list of category IDs is found using the [Get all project categories](#api-rest-api-3-projectCategory-get) operation.
    - name: description
      value: "{{ description }}"
      description: |
        A brief description of the project.
    - name: field_configuration_scheme
      value: {{ field_configuration_scheme }}
      description: |
        Deprecated use [fieldScheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes) instead. The ID of the field configuration scheme for the project. Use the [Get all field configuration schemes](#api-rest-api-3-fieldconfigurationscheme-get) operation to get a list of field configuration scheme IDs. If you specify the field configuration scheme you cannot specify the project template key.
    - name: field_scheme
      value: {{ field_scheme }}
      description: |
        The ID of the field scheme for the project. Use the [Get field schemes](#api-rest-api-3-config-fieldschemes-get) operation to get a list of field scheme IDs. If you specify the field scheme you cannot specify the project template key.
    - name: issue_security_scheme
      value: {{ issue_security_scheme }}
      description: |
        The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues. Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue security scheme IDs.
    - name: issue_type_scheme
      value: {{ issue_type_scheme }}
      description: |
        The ID of the issue type scheme for the project. Use the [Get all issue type schemes](#api-rest-api-3-issuetypescheme-get) operation to get a list of issue type scheme IDs. If you specify the issue type scheme you cannot specify the project template key.
    - name: issue_type_screen_scheme
      value: {{ issue_type_screen_scheme }}
      description: |
        The ID of the issue type screen scheme for the project. Use the [Get all issue type screen schemes](#api-rest-api-3-issuetypescreenscheme-get) operation to get a list of issue type screen scheme IDs. If you specify the issue type screen scheme you cannot specify the project template key.
    - name: key
      value: "{{ key }}"
      description: |
        Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric characters. The maximum length is 10 characters.
    - name: lead
      value: "{{ lead }}"
      description: |
        This parameter is deprecated because of privacy changes. Use \`leadAccountId\` instead. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. The user name of the project lead. Either \`lead\` or \`leadAccountId\` must be set when creating a project. Cannot be provided with \`leadAccountId\`.
    - name: lead_account_id
      value: "{{ lead_account_id }}"
      description: |
        The account ID of the project lead. Either \`lead\` or \`leadAccountId\` must be set when creating a project. Cannot be provided with \`lead\`.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the project.
    - name: notification_scheme
      value: {{ notification_scheme }}
      description: |
        The ID of the notification scheme for the project. Use the [Get notification schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of notification scheme IDs.
    - name: permission_scheme
      value: {{ permission_scheme }}
      description: |
        The ID of the permission scheme for the project. Use the [Get all permission schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all permission scheme IDs.
    - name: project_template_key
      value: "{{ project_template_key }}"
      description: |
        A predefined configuration for a project. The type of the \`projectTemplateKey\` must match with the type of the \`projectTypeKey\`.
      valid_values: ['com.pyxis.greenhopper.jira:gh-simplified-agility-kanban', 'com.pyxis.greenhopper.jira:gh-simplified-agility-scrum', 'com.pyxis.greenhopper.jira:gh-simplified-basic', 'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic', 'com.pyxis.greenhopper.jira:gh-simplified-scrum-classic', 'com.pyxis.greenhopper.jira:gh-cross-team-template', 'com.pyxis.greenhopper.jira:gh-cross-team-planning-template', 'com.atlassian.servicedesk:simplified-it-service-management', 'com.atlassian.servicedesk:simplified-it-service-management-basic', 'com.atlassian.servicedesk:simplified-it-service-management-operations', 'com.atlassian.servicedesk:simplified-internal-service-desk', 'com.atlassian.servicedesk:simplified-external-service-desk', 'com.atlassian.servicedesk:simplified-hr-service-desk', 'com.atlassian.servicedesk:simplified-facilities-service-desk', 'com.atlassian.servicedesk:simplified-legal-service-desk', 'com.atlassian.servicedesk:simplified-marketing-service-desk', 'com.atlassian.servicedesk:simplified-finance-service-desk', 'com.atlassian.servicedesk:simplified-analytics-service-desk', 'com.atlassian.servicedesk:simplified-design-service-desk', 'com.atlassian.servicedesk:simplified-sales-service-desk', 'com.atlassian.servicedesk:simplified-halp-service-desk', 'com.atlassian.servicedesk:next-gen-it-service-desk', 'com.atlassian.servicedesk:next-gen-hr-service-desk', 'com.atlassian.servicedesk:next-gen-legal-service-desk', 'com.atlassian.servicedesk:next-gen-marketing-service-desk', 'com.atlassian.servicedesk:next-gen-facilities-service-desk', 'com.atlassian.servicedesk:next-gen-analytics-service-desk', 'com.atlassian.servicedesk:next-gen-finance-service-desk', 'com.atlassian.servicedesk:next-gen-design-service-desk', 'com.atlassian.servicedesk:next-gen-sales-service-desk', 'com.atlassian.servicedesk:company-managed-blank-service-project', 'com.atlassian.servicedesk:company-managed-general-service-project', 'com.atlassian.servicedesk:team-managed-general-service-project', 'com.atlassian.jira-core-project-templates:jira-core-simplified-content-management', 'com.atlassian.jira-core-project-templates:jira-core-simplified-document-approval', 'com.atlassian.jira-core-project-templates:jira-core-simplified-lead-tracking', 'com.atlassian.jira-core-project-templates:jira-core-simplified-process-control', 'com.atlassian.jira-core-project-templates:jira-core-simplified-procurement', 'com.atlassian.jira-core-project-templates:jira-core-simplified-project-management', 'com.atlassian.jira-core-project-templates:jira-core-simplified-recruitment', 'com.atlassian.jira-core-project-templates:jira-core-simplified-task-', 'com.atlassian.jcs:customer-service-management']
    - name: project_type_key
      value: "{{ project_type_key }}"
      description: |
        The [project type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes), which defines the application-specific feature set. If you don't specify the project template you have to specify the project type.
      valid_values: ['software', 'service_desk', 'business', 'customer_service']
    - name: url
      value: "{{ url }}"
      description: |
        A link to information about this project, such as project documentation
    - name: workflow_scheme
      value: {{ workflow_scheme }}
      description: |
        The ID of the workflow scheme for the project. Use the [Get all workflow schemes](#api-rest-api-3-workflowscheme-get) operation to get a list of workflow scheme IDs. If you specify the workflow scheme you cannot specify the project template key.
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

Updates the &#91;project details&#93;(https:​//confluence.atlassian.com/x/ahLpNw) of a project.&lt;br /&gt;&lt;br /&gt;All parameters are optional in the body of the request. Schemes will only be updated if they are included in the request, any omitted schemes will be left unchanged.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). is only needed when changing the schemes or project key. Otherwise you will only need *Administer Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
UPDATE jira.projects.projects
SET 
assignee_type = '{{ assignee_type }}',
avatar_id = {{ avatar_id }},
category_id = {{ category_id }},
description = '{{ description }}',
issue_security_scheme = {{ issue_security_scheme }},
key = '{{ key }}',
lead = '{{ lead }}',
lead_account_id = '{{ lead_account_id }}',
name = '{{ name }}',
notification_scheme = {{ notification_scheme }},
permission_scheme = {{ permission_scheme }},
released_project_keys = '{{ released_project_keys }}',
url = '{{ url }}'
WHERE 
project_id_or_key = '{{ project_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand}}'
RETURNING
id,
name,
archived,
archived_by,
archived_date,
assignee_type,
avatar_urls,
components,
deleted,
deleted_by,
deleted_date,
description,
email,
favourite,
insight,
is_private,
issue_type_hierarchy,
issue_types,
key,
landing_page_info,
lead,
permissions,
project_category,
project_type_key,
properties,
retention_till_date,
roles,
self,
simplified,
style,
url,
uuid,
versions;
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

Deletes a project.&lt;br /&gt;&lt;br /&gt;You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.projects.projects
WHERE project_id_or_key = '{{ project_id_or_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND enable_undo = '{{ enable_undo }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="create_from_template"
    values={[
        { label: 'create_from_template', value: 'create_from_template' },
        { label: 'archive', value: 'archive' },
        { label: 'set_avatar', value: 'set_avatar' },
        { label: 'delete_avatar', value: 'delete_avatar' },
        { label: 'remove_default_classification_level', value: 'remove_default_classification_level' },
        { label: 'set_default_classification_level', value: 'set_default_classification_level' },
        { label: 'delete_async', value: 'delete_async' },
        { label: 'restore', value: 'restore' }
    ]}
>
<TabItem value="create_from_template">

Creates a project based on a custom template provided in the request.&lt;br /&gt;&lt;br /&gt;The request body should contain the project details and the capabilities that comprise the project:&lt;br /&gt;&lt;br /&gt; *  `details` \- represents the project details settings&lt;br /&gt; *  `template` \- represents a list of capabilities responsible for creating specific parts of a project&lt;br /&gt;&lt;br /&gt;A capability is defined as a unit of configuration for the project you want to create.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `Location` link in the response header to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;***Note: This API is only supported for Jira Enterprise edition.***&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.projects.create_from_template 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"details": "{{ details }}", 
"template": "{{ template }}"
}'
;
```
</TabItem>
<TabItem value="archive">

Archives a project. You can't delete a project if it's archived. To delete an archived project, restore the project and then delete it. To restore a project, use the Jira UI.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.projects.archive 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="set_avatar">

Sets the avatar displayed for a project.&lt;br /&gt;&lt;br /&gt;Use &#91;Load project avatar&#93;(#api-rest-api-3-project-projectIdOrKey-avatar2-post) to store avatars against the project, before using this operation to set the displayed avatar.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).

```sql
EXEC jira.projects.projects.set_avatar 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"id": "{{ id }}"
}'
;
```
</TabItem>
<TabItem value="delete_avatar">

Deletes a custom avatar from a project. Note that system avatars cannot be deleted.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).

```sql
EXEC jira.projects.projects.delete_avatar 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="remove_default_classification_level">

Remove the default data classification level for a project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** any **one** of the following is sufficient.&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.projects.remove_default_classification_level 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="set_default_classification_level">

Updates the default data classification level for a project.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** any **one** of the following is sufficient.&lt;br /&gt;&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project.&lt;br /&gt; *  *Administer jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.projects.set_default_classification_level 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"id": "{{ id }}"
}'
;
```
</TabItem>
<TabItem value="delete_async">

Deletes a project asynchronously.&lt;br /&gt;&lt;br /&gt;This operation is:&lt;br /&gt;&lt;br /&gt; *  transactional, that is, if part of the delete fails the project is not deleted.&lt;br /&gt; *  &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.projects.projects.delete_async 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="restore">

Restores a project that has been archived or placed in the Jira recycle bin.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg)for Company managed projects.&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project for Team managed projects.

```sql
EXEC jira.projects.projects.restore 
@project_id_or_key='{{ project_id_or_key }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
