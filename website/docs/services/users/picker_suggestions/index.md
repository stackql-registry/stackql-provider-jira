--- 
title: picker_suggestions
hide_title: false
hide_table_of_contents: false
keywords:
  - picker_suggestions
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the picker_suggestions resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>picker_suggestions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="picker_suggestions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.picker_suggestions" /></td></tr>
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
    <td>This property is no longer available . See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr>
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. (wire: accountId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the user. Depending on the user’s privacy setting, this may be returned as null. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="account_type" /></td>
    <td><code>string</code></td>
    <td>The user account type. Can take the following values:   *  `atlassian` regular Atlassian user account  *  `app` system account used for Connect applications and OAuth to represent external systems  *  `customer` Jira Service Desk account representing an external service desk (atlassian, app, customer, unknown) (wire: accountType)</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_url" /></td>
    <td><code>string (uri)</code></td>
    <td>The avatar URL of the user. (wire: avatarUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="html" /></td>
    <td><code>string</code></td>
    <td>The display name, email address, and key of the user with the matched query string highlighted with the HTML bold tag.</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>This property is no longer available. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
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
    <td><a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-show_avatar"><code>show_avatar</code></a>, <a href="#parameter-exclude"><code>exclude</code></a>, <a href="#parameter-exclude_account_ids"><code>exclude_account_ids</code></a>, <a href="#parameter-avatar_size"><code>avatar_size</code></a>, <a href="#parameter-exclude_connect_users"><code>exclude_connect_users</code></a></td>
    <td>Returns a list of users whose attributes match the query term. The returned object includes the `html` field where the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude users from the results.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `maxResults`, up to the thousandth user, and then returns only the users from that range that match the query term. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the query term, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by users without the required permission return search results for an exact name match only.</td>
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
    <td>A query string that is matched against user attributes, such as `displayName`, and `emailAddress`, to find relevant users. The string can match the prefix of the attribute's value. For example, *query=john* matches a user with a `displayName` of *John Smith* and a user with an `emailAddress` of *johnson@example.com*.</td>
</tr>
<tr id="parameter-avatar_size">
    <td><CopyableCode code="avatar_size" /></td>
    <td><code>string</code></td>
    <td> (wire: avatarSize)</td>
</tr>
<tr id="parameter-exclude">
    <td><CopyableCode code="exclude" /></td>
    <td><code>array</code></td>
    <td>This parameter is no longer available. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr id="parameter-exclude_account_ids">
    <td><CopyableCode code="exclude_account_ids" /></td>
    <td><code>array</code></td>
    <td>A list of account IDs to exclude from the search results. This parameter accepts a comma-separated list. Multiple account IDs can also be provided using an ampersand-separated list. For example, `excludeAccountIds=5b10a2844c20165700ede21g,5b10a0effa615349cb016cd8&excludeAccountIds=5b10ac8d82e05b22cc7d4ef5`. Cannot be provided with `exclude`. (wire: excludeAccountIds)</td>
</tr>
<tr id="parameter-exclude_connect_users">
    <td><CopyableCode code="exclude_connect_users" /></td>
    <td><code>boolean</code></td>
    <td> (wire: excludeConnectUsers)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return. The total number of matched users is returned in `total`. (wire: maxResults)</td>
</tr>
<tr id="parameter-show_avatar">
    <td><CopyableCode code="show_avatar" /></td>
    <td><code>boolean</code></td>
    <td>Include the URI to the user's avatar. (wire: showAvatar)</td>
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

Returns a list of users whose attributes match the query term. The returned object includes the `html` field where the matched query term is highlighted with the HTML strong tag. A list of account IDs can be provided to exclude users from the results.&lt;br /&gt;&lt;br /&gt;This operation takes the users in the range defined by `maxResults`, up to the thousandth user, and then returns only the users from that range that match the query term. This means the operation usually returns fewer users than specified in `maxResults`. To get all the users who match the query term, use &#91;Get all users&#93;(#api-rest-api-3-users-search-get) and filter the records in your code.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). Anonymous calls and calls by users without the required permission return search results for an exact name match only.

```sql
SELECT
name,
account_id,
display_name,
account_type,
avatar_url,
html,
key
FROM jira.users.picker_suggestions
WHERE query = '{{ query }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND max_results = '{{ max_results }}'
AND show_avatar = '{{ show_avatar }}'
AND exclude = '{{ exclude }}'
AND exclude_account_ids = '{{ exclude_account_ids }}'
AND avatar_size = '{{ avatar_size }}'
AND exclude_connect_users = '{{ exclude_connect_users }}'
;
```
</TabItem>
</Tabs>
