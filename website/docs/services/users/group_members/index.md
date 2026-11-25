--- 
title: group_members
hide_title: false
hide_table_of_contents: false
keywords:
  - group_members
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the group_members resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>group_members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="group_members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.group_members" /></td></tr>
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

User details permitted by the user's Atlassian Account privacy settings. However, be aware of these exceptions:&lt;br /&gt;&lt;br /&gt; *  User record deleted from Atlassian: This occurs as the result of a right to be forgotten request. In this case, `displayName` provides an indication and other parameters have default values or are blank (for example, email is blank).&lt;br /&gt; *  User record corrupted: This occurs as a results of events such as a server import and can only happen to deleted users. In this case, `accountId` returns *unknown* and all other parameters have fallback values.&lt;br /&gt; *  User record unavailable: This usually occurs due to an internal service outage. In this case, all parameters have fallback values.

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
    <td>The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. (wire: accountId)</td>
</tr>
<tr>
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the user. Depending on the user’s privacy settings, this may return an alternative value. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="account_type" /></td>
    <td><code>string</code></td>
    <td>The type of account represented by this user. This will be one of 'atlassian' (normal users), 'app' (application user) or 'customer' (Jira Service Desk customer user) (wire: accountType)</td>
</tr>
<tr>
    <td><CopyableCode code="active" /></td>
    <td><code>boolean</code></td>
    <td>Whether the user is active.</td>
</tr>
<tr>
    <td><CopyableCode code="avatar_urls" /></td>
    <td><code>object</code></td>
    <td>The avatars of the user. (wire: avatarUrls)</td>
</tr>
<tr>
    <td><CopyableCode code="email_address" /></td>
    <td><code>string</code></td>
    <td>The email address of the user. Depending on the user’s privacy settings, this may be returned as null. (wire: emailAddress)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>This property is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the user.</td>
</tr>
<tr>
    <td><CopyableCode code="time_zone" /></td>
    <td><code>string</code></td>
    <td>The time zone specified in the user's profile. Depending on the user’s privacy settings, this may be returned as null. (wire: timeZone)</td>
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
    <td><a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-include_inactive_users"><code>include_inactive_users</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all users in a group.&lt;br /&gt;&lt;br /&gt;Note that users are ordered by username, however the username is not returned in the results due to privacy reasons.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a></td>
    <td>Adds a user to a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-username"><code>username</code></a></td>
    <td>Removes a user from a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).</td>
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
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the group. This parameter cannot be used with the `groupName` parameter. (wire: groupId)</td>
</tr>
<tr id="parameter-groupname">
    <td><CopyableCode code="groupname" /></td>
    <td><code>string</code></td>
    <td>As a group's name can change, use of `groupId` is recommended to identify a group.   The name of the group. This parameter cannot be used with the `groupId` parameter.</td>
</tr>
<tr id="parameter-include_inactive_users">
    <td><CopyableCode code="include_inactive_users" /></td>
    <td><code>boolean</code></td>
    <td>Include inactive users. (wire: includeInactiveUsers)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page (number should be between 1 and 50). (wire: maxResults)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
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

Returns a &#91;paginated&#93;(#pagination) list of all users in a group.&lt;br /&gt;&lt;br /&gt;Note that users are ordered by username, however the username is not returned in the results due to privacy reasons.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** either of:&lt;br /&gt;&lt;br /&gt; *  *Browse users and groups* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
name,
account_id,
display_name,
account_type,
active,
avatar_urls,
email_address,
key,
self,
time_zone
FROM jira.users.group_members
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND groupname = '{{ groupname }}'
AND group_id = '{{ group_id }}'
AND include_inactive_users = '{{ include_inactive_users }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
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

Adds a user to a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).

```sql
INSERT INTO jira.users.group_members (
account_id,
name,
cloud_id,
groupname,
group_id
)
SELECT 
'{{ account_id }}',
'{{ name }}',
'{{ cloud_id }}',
'{{ groupname }}',
'{{ group_id }}'
RETURNING
name,
group_id,
self,
users
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: group_members
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the group_members resource.
    - name: account_id
      value: "{{ account_id }}"
      description: |
        The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.
    - name: name
      value: "{{ name }}"
      description: |
        This property is no longer available. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.
    - name: groupname
      value: "{{ groupname }}"
      description: As a group's name can change, use of \`groupId\` is recommended to identify a group.   The name of the group. This parameter cannot be used with the \`groupId\` parameter.
      description: As a group's name can change, use of \`groupId\` is recommended to identify a group.   The name of the group. This parameter cannot be used with the \`groupId\` parameter.
    - name: group_id
      value: "{{ group_id }}"
      description: The ID of the group. This parameter cannot be used with the \`groupName\` parameter.
      description: The ID of the group. This parameter cannot be used with the \`groupName\` parameter.
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

Removes a user from a group.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Site administration (that is, member of the *site-admin* &#91;group&#93;(https:​//confluence.atlassian.com/x/24xjL)).

```sql
DELETE FROM jira.users.group_members
WHERE account_id = '{{ account_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND groupname = '{{ groupname }}'
AND group_id = '{{ group_id }}'
AND username = '{{ username }}'
;
```
</TabItem>
</Tabs>
