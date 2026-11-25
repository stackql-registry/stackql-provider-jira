--- 
title: user_query_results
hide_title: false
hide_table_of_contents: false
keywords:
  - user_query_results
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the user_query_results resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>user_query_results</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="user_query_results" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.user_query_results" /></td></tr>
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
    <td><a href="#parameter-query"><code>query</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Finds users with a structured query and returns a &#91;paginated&#93;(#pagination) list of user details.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that match the structured query. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;The query statements are:&lt;br /&gt;&lt;br /&gt; *  `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.&lt;br /&gt; *  `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `&#91;propertyKey&#93;.entity.property.path is "property value"` Returns users with the entity property value. For example, if user property `location` is set to value `&#123;"office": &#123;"country": "AU", "city": "Sydney"&#125;&#125;`, then it's possible to use `&#91;location&#93;.office.city is "Sydney"` to match the user.&lt;br /&gt;&lt;br /&gt;The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined using the `AND` and `OR` operators to form more complex queries. For example:&lt;br /&gt;&lt;br /&gt;`is assignee of PROJ AND &#91;propertyKey&#93;.entity.property.path is "property value"`</td>
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
    <td>The search query.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Finds users with a structured query and returns a &#91;paginated&#93;(#pagination) list of user details.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `startAt` and `maxResults`, up to the thousandth user, and then returns only the users from that range that match the structured query. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the structured query, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt;&lt;br /&gt;The query statements are:&lt;br /&gt;&lt;br /&gt; *  `is assignee of PROJ` Returns the users that are assignees of at least one issue in project *PROJ*.&lt;br /&gt; *  `is assignee of (PROJ-1, PROJ-2)` Returns users that are assignees on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is reporter of (PROJ-1, PROJ-2)` Returns users that are reporters on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is watcher of (PROJ-1, PROJ-2)` Returns users that are watchers on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is voter of (PROJ-1, PROJ-2)` Returns users that are voters on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is commenter of (PROJ-1, PROJ-2)` Returns users that have posted a comment on the issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `is transitioner of (PROJ-1, PROJ-2)` Returns users that have performed a transition on issues *PROJ-1* or *PROJ-2*.&lt;br /&gt; *  `&#91;propertyKey&#93;.entity.property.path is "property value"` Returns users with the entity property value. For example, if user property `location` is set to value `&#123;"office": &#123;"country": "AU", "city": "Sydney"&#125;&#125;`, then it's possible to use `&#91;location&#93;.office.city is "Sydney"` to match the user.&lt;br /&gt;&lt;br /&gt;The list of issues can be extended as needed, as in *(PROJ-1, PROJ-2, ... PROJ-n)*. Statements can be combined using the `AND` and `OR` operators to form more complex queries. For example:&lt;br /&gt;&lt;br /&gt;`is assignee of PROJ AND &#91;propertyKey&#93;.entity.property.path is "property value"`

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
FROM jira.users.user_query_results
WHERE query = '{{ query }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
