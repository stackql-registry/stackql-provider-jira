--- 
title: notification_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - notification_schemes
  - notifications
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the notification_schemes resource in the jira notifications service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>notification_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="notification_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.notifications.notification_schemes" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="notification_scheme_events" /></td>
    <td><code>array</code></td>
    <td>The notification events and associated recipients. (wire: notificationSchemeEvents)</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>array</code></td>
    <td>The list of project IDs associated with the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about a notification scheme.

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
    <td><code>integer (int64)</code></td>
    <td>The ID of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="notification_scheme_events" /></td>
    <td><code>array</code></td>
    <td>The notification events and associated recipients. (wire: notificationSchemeEvents)</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>array</code></td>
    <td>The list of project IDs associated with the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="scope" /></td>
    <td><code>object</code></td>
    <td>The scope of the notification scheme.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
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
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;notification scheme&#93;(https:​//confluence.atlassian.com/x/8YdKLg), including the list of events and the recipients who will receive notifications for those events.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user must have permission to administer at least one project associated with the notification scheme.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-only_default"><code>only_default</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of &#91;notification schemes&#93;(https:​//confluence.atlassian.com/x/8YdKLg) ordered by the display name.&lt;br /&gt;&lt;br /&gt;*Note that you should allow for events without recipients to appear in responses.*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user must have permission to administer at least one project associated with a notification scheme for it to be returned.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates a notification scheme with notifications. You can create up to 1000 notifications per request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-notification_scheme_id"><code>notification_scheme_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#add_notifications"><CopyableCode code="add_notifications" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-notificationSchemeEvents"><code>notificationSchemeEvents</code></a></td>
    <td></td>
    <td>Adds notifications to a notification scheme. You can add up to 1000 notifications per request.&lt;br /&gt;&lt;br /&gt;*Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the &#91;changelog&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details.*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_notification"><CopyableCode code="remove_notification" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-notificationSchemeId"><code>notificationSchemeId</code></a>, <a href="#parameter-notificationId"><code>notificationId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes a notification from a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td><code>string</code></td>
    <td>The ID of the notification scheme.</td>
</tr>
<tr id="parameter-notificationId">
    <td><CopyableCode code="notificationId" /></td>
    <td><code>string</code></td>
    <td>The ID of the notification.</td>
</tr>
<tr id="parameter-notificationSchemeId">
    <td><CopyableCode code="notificationSchemeId" /></td>
    <td><code>string</code></td>
    <td>The ID of the notification scheme.</td>
</tr>
<tr id="parameter-notification_scheme_id">
    <td><CopyableCode code="notification_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the notification scheme. (wire: notificationSchemeId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `all` Returns all expandable information  *  `field` Returns information about any custom fields assigned to receive an event  *  `group` Returns information about any groups assigned to receive an event  *  `notificationSchemeEvents` Returns a list of event associations. This list is returned for all expandable information  *  `projectRole` Returns information about any project roles assigned to receive an event  *  `user` Returns information about any users assigned to receive an event</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of notification schemes IDs to be filtered by</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-only_default">
    <td><CopyableCode code="only_default" /></td>
    <td><code>boolean</code></td>
    <td>When set to true, returns only the default notification scheme. If you provide project IDs not associated with the default, returns an empty page. The default value is false. (wire: onlyDefault)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>The list of projects IDs to be filtered by (wire: projectId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>string</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns a &#91;notification scheme&#93;(https:​//confluence.atlassian.com/x/8YdKLg), including the list of events and the recipients who will receive notifications for those events.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user must have permission to administer at least one project associated with the notification scheme.

```sql
SELECT
id,
name,
description,
notification_scheme_events,
projects,
scope,
self
FROM jira.notifications.notification_schemes
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of &#91;notification schemes&#93;(https:​//confluence.atlassian.com/x/8YdKLg) ordered by the display name.&lt;br /&gt;&lt;br /&gt;*Note that you should allow for events without recipients to appear in responses.*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user must have permission to administer at least one project associated with a notification scheme for it to be returned.

```sql
SELECT
id,
name,
description,
notification_scheme_events,
projects,
scope,
self
FROM jira.notifications.notification_schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND project_id = '{{ project_id }}'
AND only_default = '{{ only_default }}'
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

Creates a notification scheme with notifications. You can create up to 1000 notifications per request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.notifications.notification_schemes (
description,
name,
notification_scheme_events,
cloud_id
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */,
'{{ notification_scheme_events }}',
'{{ cloud_id }}'
RETURNING
id
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: notification_schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the notification_schemes resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the notification scheme.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the notification scheme. Must be unique (case-insensitive).
    - name: notification_scheme_events
      description: |
        The list of notifications which should be added to the notification scheme.
      value:
        - event:
            id: "{{ id }}"
          notifications: "{{ notifications }}"
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

Updates a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.notifications.notification_schemes
SET 
description = '{{ description }}',
name = '{{ name }}'
WHERE 
id = '{{ id }}' --required
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

Deletes a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.notifications.notification_schemes
WHERE notification_scheme_id = '{{ notification_scheme_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="add_notifications"
    values={[
        { label: 'add_notifications', value: 'add_notifications' },
        { label: 'remove_notification', value: 'remove_notification' }
    ]}
>
<TabItem value="add_notifications">

Adds notifications to a notification scheme. You can add up to 1000 notifications per request.&lt;br /&gt;&lt;br /&gt;*Deprecated: The notification type `EmailAddress` is no longer supported in Cloud. Refer to the &#91;changelog&#93;(https:​//developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-1031) for more details.*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.notifications.notification_schemes.add_notifications 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"notificationSchemeEvents": "{{ notificationSchemeEvents }}"
}'
;
```
</TabItem>
<TabItem value="remove_notification">

Removes a notification from a notification scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.notifications.notification_schemes.remove_notification 
@notificationSchemeId='{{ notificationSchemeId }}' --required, 
@notificationId='{{ notificationId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
