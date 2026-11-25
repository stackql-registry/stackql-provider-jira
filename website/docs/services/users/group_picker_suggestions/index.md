--- 
title: group_picker_suggestions
hide_title: false
hide_table_of_contents: false
keywords:
  - group_picker_suggestions
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the group_picker_suggestions resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>group_picker_suggestions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="group_picker_suggestions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.group_picker_suggestions" /></td></tr>
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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the group. The name of a group is mutable, to reliably identify a group use ``groupId`.`</td>
</tr>
<tr>
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the group, which uniquely identifies the group across all Atlassian products. For example, *952d12c3-5b5b-4d04-bb32-44d383afc4b2*. (wire: groupId)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_url" /></td>
    <td><code>string</code></td>
    <td>Avatar url for the group/team if present. (wire: avatarUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="html" /></td>
    <td><code>string</code></td>
    <td>The group name with the matched query string highlighted with the HTML bold tag.</td>
</tr>
<tr>
    <td><CopyableCode code="labels" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="managed_by" /></td>
    <td><code>string</code></td>
    <td>Describes who/how the team is managed. The possible values are   \* external - when team is synced from an external directory like SCIM or HRIS, and team members cannot be modified.   \* admins - when a team is managed by an admin (team members can only be modified by admins).   \* team-members - managed by existing team members, new members need to be invited to join.   \* open - anyone can join or modify this team. (EXTERNAL, ADMINS, TEAM_MEMBERS, OPEN) (wire: managedBy)</td>
</tr>
<tr>
    <td><CopyableCode code="usage_type" /></td>
    <td><code>string</code></td>
    <td>Describes the type of group. The possible values are   \* team-collaboration - A platform team managed in people directory.   \* userbase-group - a group of users created in adminhub.   \* admin-oversight - currently unused. (USERBASE_GROUP, TEAM_COLLABORATION, ADMIN_OVERSIGHT) (wire: usageType)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-exclude"><code>exclude</code></a>, <a href="#parameter-exclude_id"><code>exclude_id</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-case_insensitive"><code>case_insensitive</code></a>, <a href="#parameter-user_name"><code>user_name</code></a></td>
    <td>Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.&lt;br /&gt;&lt;br /&gt;The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically *Showing X of Y matching groups*.&lt;br /&gt;&lt;br /&gt;The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without the required permission return an empty list.&lt;br /&gt;&lt;br /&gt;*Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). Without this permission, calls where query is not an exact match to an existing group will return an empty list.</td>
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
<tr id="parameter-account_id">
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>This parameter is deprecated, setting it does not affect the results. To find groups containing a particular user, use &#91;Get user groups&#93;(#api-rest-api-3-user-groups-get). (wire: accountId)</td>
</tr>
<tr id="parameter-case_insensitive">
    <td><CopyableCode code="case_insensitive" /></td>
    <td><code>boolean</code></td>
    <td>Whether the search for groups should be case insensitive. (wire: caseInsensitive)</td>
</tr>
<tr id="parameter-exclude">
    <td><CopyableCode code="exclude" /></td>
    <td><code>array</code></td>
    <td>As a group's name can change, use of `excludeGroupIds` is recommended to identify a group.   A group to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `exclude=group1&exclude=group2`. This parameter cannot be used with the `excludeGroupIds` parameter.</td>
</tr>
<tr id="parameter-exclude_id">
    <td><CopyableCode code="exclude_id" /></td>
    <td><code>array</code></td>
    <td>A group ID to exclude from the result. To exclude multiple groups, provide an ampersand-separated list. For example, `excludeId=group1-id&excludeId=group2-id`. This parameter cannot be used with the `excludeGroups` parameter. (wire: excludeId)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of groups to return. The maximum number of groups that can be returned is limited by the system property `jira.ajax.autocomplete.limit`. (wire: maxResults)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>The string to find in group names.</td>
</tr>
<tr id="parameter-user_name">
    <td><CopyableCode code="user_name" /></td>
    <td><code>string</code></td>
    <td>This parameter is no longer available. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. (wire: userName)</td>
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

Returns a list of groups whose names contain a query string. A list of group names can be provided to exclude groups from the results.&lt;br /&gt;&lt;br /&gt;The primary use case for this resource is to populate a group picker suggestions list. To this end, the returned object includes the `html` field where the matched query term is highlighted in the group name with the HTML strong tag. Also, the groups list is wrapped in a response object that contains a header for use in the picker, specifically *Showing X of Y matching groups*.&lt;br /&gt;&lt;br /&gt;The list returns with the groups sorted. If no groups match the list criteria, an empty list is returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg). Anonymous calls and calls by users without the required permission return an empty list.&lt;br /&gt;&lt;br /&gt;*Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). Without this permission, calls where query is not an exact match to an existing group will return an empty list.

```sql
SELECT
name,
group_id,
avatar_url,
html,
labels,
managed_by,
usage_type
FROM jira.users.group_picker_suggestions
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND account_id = '{{ account_id }}'
AND query = '{{ query }}'
AND exclude = '{{ exclude }}'
AND exclude_id = '{{ exclude_id }}'
AND max_results = '{{ max_results }}'
AND case_insensitive = '{{ case_insensitive }}'
AND user_name = '{{ user_name }}'
;
```
</TabItem>
</Tabs>
