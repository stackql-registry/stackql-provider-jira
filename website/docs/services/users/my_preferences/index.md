--- 
title: my_preferences
hide_title: false
hide_table_of_contents: false
keywords:
  - my_preferences
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the my_preferences resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>my_preferences</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="my_preferences" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.my_preferences" /></td></tr>
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
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The value the read returns.</td>
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
    <td><a href="#parameter-key"><code>key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the value of a preference of the current user.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default this is not set and the user takes the locale of the instance.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default this is not set and the user takes the timezone of the instance.&lt;br /&gt;&lt;br /&gt;These system preferences keys will be deprecated by 15/07/2024. You can still retrieve these keys, but it will not have any impact on Notification behaviour.&lt;br /&gt;&lt;br /&gt; *  *user.notifications.watcher* Whether the user gets notified when they are watcher.&lt;br /&gt; *  *user.notifications.assignee* Whether the user gets notified when they are assignee.&lt;br /&gt; *  *user.notifications.reporter* Whether the user gets notified when they are reporter.&lt;br /&gt; *  *user.notifications.mentions* Whether the user gets notified when they are mentions.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-key"><code>key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:&lt;br /&gt;&lt;br /&gt; *  *user.notifications.mimetype* The mime type used in notifications sent to the user. Defaults to `html`.&lt;br /&gt; *  *user.default.share.private* Whether new &#91; filters&#93;(https:​//confluence.atlassian.com/x/eQiiLQ) are set to private. Defaults to `true`.&lt;br /&gt; *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled. Defaults to `false`.&lt;br /&gt; *  *user.autowatch.disabled* Whether the user automatically watches issues they create or add a comment to. By default, not set: the user takes the instance autowatch setting.&lt;br /&gt; *  *user.notifiy.own.changes* Whether the user gets notified of their own changes.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.&lt;br /&gt;&lt;br /&gt;These system preferences keys will be deprecated by 15/07/2024. You can still use these keys to create arbitrary preferences, but it will not have any impact on Notification behaviour.&lt;br /&gt;&lt;br /&gt; *  *user.notifications.watcher* Whether the user gets notified when they are watcher.&lt;br /&gt; *  *user.notifications.assignee* Whether the user gets notified when they are assignee.&lt;br /&gt; *  *user.notifications.reporter* Whether the user gets notified when they are reporter.&lt;br /&gt; *  *user.notifications.mentions* Whether the user gets notified when they are mentions.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-key"><code>key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a preference of the user, which restores the default value of system defined settings.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
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
<tr id="parameter-key">
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the preference.</td>
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

Returns the value of a preference of the current user.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default this is not set and the user takes the locale of the instance.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default this is not set and the user takes the timezone of the instance.&lt;br /&gt;&lt;br /&gt;These system preferences keys will be deprecated by 15/07/2024. You can still retrieve these keys, but it will not have any impact on Notification behaviour.&lt;br /&gt;&lt;br /&gt; *  *user.notifications.watcher* Whether the user gets notified when they are watcher.&lt;br /&gt; *  *user.notifications.assignee* Whether the user gets notified when they are assignee.&lt;br /&gt; *  *user.notifications.reporter* Whether the user gets notified when they are reporter.&lt;br /&gt; *  *user.notifications.mentions* Whether the user gets notified when they are mentions.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
value
FROM jira.users.my_preferences
WHERE key = '{{ key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
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

Creates a preference for the user or updates a preference's value by sending a plain text string. For example, `false`. An arbitrary preference can be created with the value containing up to 255 characters. In addition, the following keys define system preferences that can be set or created:&lt;br /&gt;&lt;br /&gt; *  *user.notifications.mimetype* The mime type used in notifications sent to the user. Defaults to `html`.&lt;br /&gt; *  *user.default.share.private* Whether new &#91; filters&#93;(https:​//confluence.atlassian.com/x/eQiiLQ) are set to private. Defaults to `true`.&lt;br /&gt; *  *user.keyboard.shortcuts.disabled* Whether keyboard shortcuts are disabled. Defaults to `false`.&lt;br /&gt; *  *user.autowatch.disabled* Whether the user automatically watches issues they create or add a comment to. By default, not set: the user takes the instance autowatch setting.&lt;br /&gt; *  *user.notifiy.own.changes* Whether the user gets notified of their own changes.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.&lt;br /&gt;&lt;br /&gt;These system preferences keys will be deprecated by 15/07/2024. You can still use these keys to create arbitrary preferences, but it will not have any impact on Notification behaviour.&lt;br /&gt;&lt;br /&gt; *  *user.notifications.watcher* Whether the user gets notified when they are watcher.&lt;br /&gt; *  *user.notifications.assignee* Whether the user gets notified when they are assignee.&lt;br /&gt; *  *user.notifications.reporter* Whether the user gets notified when they are reporter.&lt;br /&gt; *  *user.notifications.mentions* Whether the user gets notified when they are mentions.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
UPDATE jira.users.my_preferences
SET 
-- No updatable properties
WHERE 
key = '{{ key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set;
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

Deletes a preference of the user, which restores the default value of system defined settings.&lt;br /&gt;&lt;br /&gt;Note that these keys are deprecated:&lt;br /&gt;&lt;br /&gt; *  *jira.user.locale* The locale of the user. By default, not set. The user takes the instance locale.&lt;br /&gt; *  *jira.user.timezone* The time zone of the user. By default, not set. The user takes the instance timezone.&lt;br /&gt;&lt;br /&gt;Use &#91; Update a user profile&#93;(https:​//developer.atlassian.com/cloud/admin/user-management/rest/#api-users-account-id-manage-profile-patch) from the user management REST API to manage timezone and locale instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
DELETE FROM jira.users.my_preferences
WHERE key = '{{ key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
