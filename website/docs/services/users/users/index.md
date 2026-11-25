--- 
title: users
hide_title: false
hide_table_of_contents: false
keywords:
  - users
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the users resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>users</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="users" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.users" /></td></tr>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-username"><code>username</code></a>, <a href="#parameter-key"><code>key</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a user.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-email_address"><code>email_address</code></a>, <a href="#parameter-products"><code>products</code></a></td>
    <td></td>
    <td>Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.&lt;br /&gt;&lt;br /&gt;**Note:** This API does not support Forge apps.&lt;br /&gt;&lt;br /&gt;If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have access to Jira & no new jira-products are requested, the operation returns a 400 status.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). The caller has to be an **organization admin**.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-username"><code>username</code></a>, <a href="#parameter-key"><code>key</code></a></td>
    <td>Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This operation does not delete the user's Atlassian account.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, membership of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).</td>
</tr>
<tr>
    <td><a href="#list_all"><CopyableCode code="list_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-startAt"><code>startAt</code></a>, <a href="#parameter-maxResults"><code>maxResults</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-account_id">
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. (wire: accountId)</td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-key">
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>This parameter is no longer available. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr id="parameter-maxResults">
    <td><CopyableCode code="maxResults" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return (limited to 1000).</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return (limited to 1000). (wire: maxResults)</td>
</tr>
<tr id="parameter-startAt">
    <td><CopyableCode code="startAt" /></td>
    <td><code>integer (int32)</code></td>
    <td>The index of the first item to return.</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int32)</code></td>
    <td>The index of the first item to return. (wire: startAt)</td>
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
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Returns a user.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the user's preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

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
FROM jira.users.users
WHERE account_id = '{{ account_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND username = '{{ username }}'
AND key = '{{ key }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

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
FROM jira.users.users
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND expand = '{{ expand }}'
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

Creates a user. This resource is retained for legacy compatibility. As soon as a more suitable alternative is available this resource will be deprecated.&lt;br /&gt;&lt;br /&gt;**Note:** This API does not support Forge apps.&lt;br /&gt;&lt;br /&gt;If the user exists and has access to Jira, the operation returns a 201 status. If the user exists but does not have access to Jira & no new jira-products are requested, the operation returns a 400 status.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). The caller has to be an **organization admin**.

```sql
INSERT INTO jira.users.users (
application_keys,
display_name,
email_address,
key,
name,
password,
products,
cloud_id
)
SELECT 
'{{ application_keys }}',
'{{ display_name }}',
'{{ email_address }}' /* required */,
'{{ key }}',
'{{ name }}',
'{{ password }}',
'{{ products }}' /* required */,
'{{ cloud_id }}'
RETURNING
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
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: users
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the users resource.
    - name: application_keys
      value:
        - "{{ application_keys }}"
      description: |
        Deprecated, do not use.
    - name: display_name
      value: "{{ display_name }}"
      description: |
        This property is no longer available. If the user has an Atlassian account, their display name is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account.
    - name: email_address
      value: "{{ email_address }}"
      description: |
        The email address for the user.
    - name: key
      value: "{{ key }}"
      description: |
        This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    - name: name
      value: "{{ name }}"
      description: |
        This property is no longer available. See the [migration guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    - name: password
      value: "{{ password }}"
      description: |
        This property is no longer available. If the user has an Atlassian account, their password is not changed. If the user does not have an Atlassian account, they are sent an email asking them set up an account.
    - name: products
      value:
        - "{{ products }}"
      description: |
        Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery, jira-software. To create a user without product access, set this field to be an empty array.
`}</CodeBlock>

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

Deletes a user. If the operation completes successfully then the user is removed from Jira's user base. This operation does not delete the user's Atlassian account.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, membership of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).

```sql
DELETE FROM jira.users.users
WHERE account_id = '{{ account_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND username = '{{ username }}'
AND key = '{{ key }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_all"
    values={[
        { label: 'list_all', value: 'list_all' }
    ]}
>
<TabItem value="list_all">

Returns a list of all users, including active users, inactive users and previously deleted users that have an Atlassian account.&lt;br /&gt;&lt;br /&gt;Privacy controls are applied to the response based on the users' preferences. This could mean, for example, that the user's email address is hidden. See the &#91;Profile visibility overview&#93;(https:​//developer.atlassian.com/cloud/jira/platform/profile-visibility/) for more details.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.users.users.list_all 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@startAt='{{ startAt }}', 
@maxResults='{{ maxResults }}', 
@expand='{{ expand }}'
;
```
</TabItem>
</Tabs>
