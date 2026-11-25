--- 
title: assignable_users
hide_title: false
hide_table_of_contents: false
keywords:
  - assignable_users
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the assignable_users resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>assignable_users</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="assignable_users" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.assignable_users" /></td></tr>
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

A user with details as permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:&lt;br /&gt;&lt;br /&gt; *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).&lt;br /&gt; *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.&lt;br /&gt; *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values.

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
    <td>This property is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr>
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. Required in requests. (wire: accountId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="account_type" /></td>
    <td><code>string</code></td>
    <td>The user account type. Can take the following values:   *  `atlassian` regular Atlassian user account  *  `app` system account used for Connect applications and OAuth to represent external systems  *  `customer` Jira Service Desk account representing an external service desk (atlassian, app, customer, unknown) (wire: accountType)</td>
</tr>
<tr>
    <td><CopyableCode code="active" /></td>
    <td><code>boolean</code></td>
    <td>Whether the user is active.</td>
</tr>
<tr>
    <td><CopyableCode code="app_type" /></td>
    <td><code>string</code></td>
    <td>The app type of the user account when accountType is 'app'. Can take the following values:   *  `service` Service Account  *  `agent` Rovo Agent Account  *  `unknown` Unknown app type (wire: appType)</td>
</tr>
<tr>
    <td><CopyableCode code="application_roles" /></td>
    <td><code>object</code></td>
    <td>The application roles the user is assigned to. (wire: applicationRoles)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The avatars of the user. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="email_address" /></td>
    <td><code>string</code></td>
    <td>The email address of the user. Depending on the user’s privacy setting, this may be returned as null. (wire: emailAddress)</td>
</tr>
<tr>
    <td><CopyableCode code="groups" /></td>
    <td><code>object</code></td>
    <td>The groups that the user belongs to.</td>
</tr>
<tr>
    <td><CopyableCode code="guest" /></td>
    <td><code>boolean</code></td>
    <td>Whether the user is a guest.</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>This property is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr>
    <td><CopyableCode code="locale" /></td>
    <td><code>string</code></td>
    <td>The locale of the user. Depending on the user’s privacy setting, this may be returned as null.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the user.</td>
</tr>
<tr>
    <td><CopyableCode code="time_zone" /></td>
    <td><code>string</code></td>
    <td>The time zone specified in the user's profile. If the user's time zone is not visible to the current user (due to user's profile setting), or if a time zone has not been set, the instance's default time zone will be returned. (wire: timeZone)</td>
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
    <td><a href="#parameter-query"><code>query</code></a>, <a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-username"><code>username</code></a>, <a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-project"><code>project</code></a>, <a href="#parameter-issue_key"><code>issue_key</code></a>, <a href="#parameter-issue_id"><code>issue_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-action_descriptor_id"><code>action_descriptor_id</code></a>, <a href="#parameter-recommend"><code>recommend</code></a>, <a href="#parameter-account_type"><code>account_type</code></a>, <a href="#parameter-app_type"><code>app_type</code></a></td>
    <td>Returns a list of users that can be assigned to an issue. Use this operation to find the list of users who can be assigned to:&lt;br /&gt;&lt;br /&gt; *  a new issue, by providing the `projectKeyOrId`.&lt;br /&gt; *  an updated issue, by providing the `issueKey` or `issueId`.&lt;br /&gt; *  to an issue during a transition (workflow action), by providing the `issueKey` or `issueId` and the transition id in `actionDescriptorId`. You can obtain the IDs of an issue's valid transitions using the `transitions` option in the `expand` parameter of &#91; Get issue&#93;(#api-rest-api-3-issue-issueIdOrKey-get).&lt;br /&gt;&lt;br /&gt;In all these cases, you can pass an account ID to determine if a user can be assigned to an issue. The user is returned in the response if they can be assigned to the issue or issue transition.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that can be assigned the issue. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who can be assigned the issue, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Assign issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)</td>
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
    <td>A query string that is matched exactly against user `accountId`. Required, unless `query` is specified. (wire: accountId)</td>
</tr>
<tr id="parameter-account_type">
    <td><CopyableCode code="account_type" /></td>
    <td><code>array</code></td>
    <td> (wire: accountType)</td>
</tr>
<tr id="parameter-action_descriptor_id">
    <td><CopyableCode code="action_descriptor_id" /></td>
    <td><code>integer (int32)</code></td>
    <td>The ID of the transition. (wire: actionDescriptorId)</td>
</tr>
<tr id="parameter-app_type">
    <td><CopyableCode code="app_type" /></td>
    <td><code>array</code></td>
    <td> (wire: appType)</td>
</tr>
<tr id="parameter-issue_id">
    <td><CopyableCode code="issue_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue. Required, unless `issueKey` or `project` is specified. (wire: issueId)</td>
</tr>
<tr id="parameter-issue_key">
    <td><CopyableCode code="issue_key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue. Required, unless `issueId` or `project` is specified. (wire: issueKey)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return. This operation may return less than the maximum number of items even if more are available. The operation fetches users up to the maximum and then, from the fetched users, returns only the users that can be assigned to the issue. (wire: maxResults)</td>
</tr>
<tr id="parameter-project">
    <td><CopyableCode code="project" /></td>
    <td><code>string</code></td>
    <td>The project ID or project key (case sensitive). Required, unless `issueKey` or `issueId` is specified.</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*. Required, unless `username` or `accountId` is specified.</td>
</tr>
<tr id="parameter-recommend">
    <td><CopyableCode code="recommend" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>The sessionId of this request. SessionId is the same until the assignee is set. (wire: sessionId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int32)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-username">
    <td><CopyableCode code="username" /></td>
    <td><code>string</code></td>
    <td>This parameter is no longer available. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
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

Returns a list of users that can be assigned to an issue. Use this operation to find the list of users who can be assigned to:&lt;br /&gt;&lt;br /&gt; *  a new issue, by providing the `projectKeyOrId`.&lt;br /&gt; *  an updated issue, by providing the `issueKey` or `issueId`.&lt;br /&gt; *  to an issue during a transition (workflow action), by providing the `issueKey` or `issueId` and the transition id in `actionDescriptorId`. You can obtain the IDs of an issue's valid transitions using the `transitions` option in the `expand` parameter of &#91; Get issue&#93;(#api-rest-api-3-issue-issueIdOrKey-get).&lt;br /&gt;&lt;br /&gt;In all these cases, you can pass an account ID to determine if a user can be assigned to an issue. The user is returned in the response if they can be assigned to the issue or issue transition.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that can be assigned the issue. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who can be assigned the issue, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) or *Assign issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg)

```sql
SELECT
name,
account_id,
display_name,
account_type,
active,
app_type,
application_roles,
avatar_urls,
email_address,
groups,
guest,
key,
locale,
self,
time_zone
FROM jira.users.assignable_users
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND query = '{{ query }}'
AND session_id = '{{ session_id }}'
AND username = '{{ username }}'
AND account_id = '{{ account_id }}'
AND project = '{{ project }}'
AND issue_key = '{{ issue_key }}'
AND issue_id = '{{ issue_id }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND action_descriptor_id = '{{ action_descriptor_id }}'
AND recommend = '{{ recommend }}'
AND account_type = '{{ account_type }}'
AND app_type = '{{ app_type }}'
;
```
</TabItem>
</Tabs>
