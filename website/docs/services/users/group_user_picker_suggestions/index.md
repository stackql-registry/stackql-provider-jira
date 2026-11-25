--- 
title: group_user_picker_suggestions
hide_title: false
hide_table_of_contents: false
keywords:
  - group_user_picker_suggestions
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the group_user_picker_suggestions resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>group_user_picker_suggestions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="group_user_picker_suggestions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.group_user_picker_suggestions" /></td></tr>
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
    <td><CopyableCode code="groups" /></td>
    <td><code>object</code></td>
    <td>The list of groups found in a search, including header text (Showing X of Y matching groups) and total of matched groups.</td>
</tr>
<tr>
    <td><CopyableCode code="users" /></td>
    <td><code>object</code></td>
    <td>The list of users found in a search, including header text (Showing X of Y matching users) and total of matched users.</td>
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
    <td><a href="#parameter-query"><code>query</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-show_avatar"><code>show_avatar</code></a>, <a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-issue_type_id"><code>issue_type_id</code></a>, <a href="#parameter-avatar_size"><code>avatar_size</code></a>, <a href="#parameter-case_insensitive"><code>case_insensitive</code></a>, <a href="#parameter-exclude_connect_addons"><code>exclude_connect_addons</code></a>, <a href="#parameter-include_ai_agents"><code>include_ai_agents</code></a></td>
    <td>Returns a list of users and groups matching a string. The string is used:&lt;br /&gt;&lt;br /&gt; *  for users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required.&lt;br /&gt; *  for groups, to find a case-sensitive match with group name.&lt;br /&gt;&lt;br /&gt;For example, if the string *tin* is used, records with the display name *Tina*, email address *sarah@tinplatetraining.com*, and the group *accounting* would be returned.&lt;br /&gt;&lt;br /&gt;Optionally, the search can be refined to:&lt;br /&gt;&lt;br /&gt; *  the projects and issue types associated with a custom field, such as a user picker. The search can then be further refined to return only users and groups that have permission to view specific:&lt;br /&gt;    &lt;br /&gt;     *  projects.&lt;br /&gt;     *  issue types.&lt;br /&gt;    &lt;br /&gt;    If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.&lt;br /&gt; *  not return Connect app users and groups.&lt;br /&gt; *  return groups that have a case-insensitive match with the query.&lt;br /&gt;&lt;br /&gt;The primary use case for this resource is to populate a picker field suggestion list with users or groups. To this end, the returned object includes an `html` field for each list. This field highlights the matched query term in the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for use in a picker, specifically *Showing X of Y matching groups*.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).</td>
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
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>The search string.</td>
</tr>
<tr id="parameter-avatar_size">
    <td><CopyableCode code="avatar_size" /></td>
    <td><code>string</code></td>
    <td>The size of the avatar to return. If an invalid value is provided, the default value is used. (wire: avatarSize)</td>
</tr>
<tr id="parameter-case_insensitive">
    <td><CopyableCode code="case_insensitive" /></td>
    <td><code>boolean</code></td>
    <td>Whether the search for groups should be case insensitive. (wire: caseInsensitive)</td>
</tr>
<tr id="parameter-exclude_connect_addons">
    <td><CopyableCode code="exclude_connect_addons" /></td>
    <td><code>boolean</code></td>
    <td>Whether Connect app users and groups should be excluded from the search results. If an invalid value is provided, the default value is used. (wire: excludeConnectAddons)</td>
</tr>
<tr id="parameter-field_id">
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td>The custom field ID of the field this request is for. (wire: fieldId)</td>
</tr>
<tr id="parameter-include_ai_agents">
    <td><CopyableCode code="include_ai_agents" /></td>
    <td><code>boolean</code></td>
    <td>Whether AI Agents should be included in the search results. If an invalid value is provided, the default value is used. (wire: includeAiAgents)</td>
</tr>
<tr id="parameter-issue_type_id">
    <td><CopyableCode code="issue_type_id" /></td>
    <td><code>array</code></td>
    <td>The ID of an issue type that returned users and groups must have permission to view. To include multiple issue types, provide an ampersand-separated list. For example, `issueTypeId=10000&issueTypeId=10001`. Special values, such as `-1` (all standard issue types) and `-2` (all subtask issue types), are supported. This parameter is only used when `fieldId` is present. (wire: issueTypeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return in each list. (wire: maxResults)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The ID of a project that returned users and groups must have permission to view. To include multiple projects, provide an ampersand-separated list. For example, `projectId=10000&projectId=10001`. This parameter is only used when `fieldId` is present. (wire: projectId)</td>
</tr>
<tr id="parameter-show_avatar">
    <td><CopyableCode code="show_avatar" /></td>
    <td><code>boolean</code></td>
    <td>Whether the user avatar should be returned. If an invalid value is provided, the default value is used. (wire: showAvatar)</td>
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

Returns a list of users and groups matching a string. The string is used:&lt;br /&gt;&lt;br /&gt; *  for users, to find a case-insensitive match with display name and e-mail address. Note that if a user has hidden their email address in their user profile, partial matches of the email address will not find the user. An exact match is required.&lt;br /&gt; *  for groups, to find a case-sensitive match with group name.&lt;br /&gt;&lt;br /&gt;For example, if the string *tin* is used, records with the display name *Tina*, email address *sarah@tinplatetraining.com*, and the group *accounting* would be returned.&lt;br /&gt;&lt;br /&gt;Optionally, the search can be refined to:&lt;br /&gt;&lt;br /&gt; *  the projects and issue types associated with a custom field, such as a user picker. The search can then be further refined to return only users and groups that have permission to view specific:&lt;br /&gt;    &lt;br /&gt;     *  projects.&lt;br /&gt;     *  issue types.&lt;br /&gt;    &lt;br /&gt;    If multiple projects or issue types are specified, they must be a subset of those enabled for the custom field or no results are returned. For example, if a field is enabled for projects A, B, and C then the search could be limited to projects B and C. However, if the search is limited to projects B and D, nothing is returned.&lt;br /&gt; *  not return Connect app users and groups.&lt;br /&gt; *  return groups that have a case-insensitive match with the query.&lt;br /&gt;&lt;br /&gt;The primary use case for this resource is to populate a picker field suggestion list with users or groups. To this end, the returned object includes an `html` field for each list. This field highlights the matched query term in the item name with the HTML strong tag. Also, each list is wrapped in a response object that contains a header for use in a picker, specifically *Showing X of Y matching groups*.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/yodKLg).

```sql
SELECT
groups,
users
FROM jira.users.group_user_picker_suggestions
WHERE query = '{{ query }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND max_results = '{{ max_results }}'
AND show_avatar = '{{ show_avatar }}'
AND field_id = '{{ field_id }}'
AND project_id = '{{ project_id }}'
AND issue_type_id = '{{ issue_type_id }}'
AND avatar_size = '{{ avatar_size }}'
AND case_insensitive = '{{ case_insensitive }}'
AND exclude_connect_addons = '{{ exclude_connect_addons }}'
AND include_ai_agents = '{{ include_ai_agents }}'
;
```
</TabItem>
</Tabs>
