--- 
title: application_roles
hide_title: false
hide_table_of_contents: false
keywords:
  - application_roles
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the application_roles resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>application_roles</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="application_roles" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.application_roles" /></td></tr>
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
    <td>The display name of the application role.</td>
</tr>
<tr>
    <td><CopyableCode code="default_groups" /></td>
    <td><code>array</code></td>
    <td>The groups that are granted default access for this application role. As a group's name can change, use of `defaultGroupsDetails` is recommended to identify a groups. (wire: defaultGroups)</td>
</tr>
<tr>
    <td><CopyableCode code="default_groups_details" /></td>
    <td><code>array</code></td>
    <td>The groups that are granted default access for this application role. (wire: defaultGroupsDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="defined" /></td>
    <td><code>boolean</code></td>
    <td>Deprecated.</td>
</tr>
<tr>
    <td><CopyableCode code="group_details" /></td>
    <td><code>array</code></td>
    <td>The groups associated with the application role. (wire: groupDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="groups" /></td>
    <td><code>array</code></td>
    <td>The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended to identify a groups.</td>
</tr>
<tr>
    <td><CopyableCode code="has_unlimited_seats" /></td>
    <td><code>boolean</code></td>
    <td> (wire: hasUnlimitedSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the application role.</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_seats" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum count of users on your license. (wire: numberOfSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="platform" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the application role belongs to Jira platform (`jira-core`).</td>
</tr>
<tr>
    <td><CopyableCode code="remaining_seats" /></td>
    <td><code>integer (int32)</code></td>
    <td>The count of users remaining on your license. (wire: remainingSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="selected_by_default" /></td>
    <td><code>boolean</code></td>
    <td>Determines whether this application role should be selected by default on user creation. (wire: selectedByDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="user_count" /></td>
    <td><code>integer (int32)</code></td>
    <td>The number of users counting against your license. (wire: userCount)</td>
</tr>
<tr>
    <td><CopyableCode code="user_count_description" /></td>
    <td><code>string</code></td>
    <td>The &#91;type of users&#93;(https:​//confluence.atlassian.com/x/lRW3Ng) being counted against your license. (wire: userCountDescription)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of an application role.

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
    <td>The display name of the application role.</td>
</tr>
<tr>
    <td><CopyableCode code="default_groups" /></td>
    <td><code>array</code></td>
    <td>The groups that are granted default access for this application role. As a group's name can change, use of `defaultGroupsDetails` is recommended to identify a groups. (wire: defaultGroups)</td>
</tr>
<tr>
    <td><CopyableCode code="default_groups_details" /></td>
    <td><code>array</code></td>
    <td>The groups that are granted default access for this application role. (wire: defaultGroupsDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="defined" /></td>
    <td><code>boolean</code></td>
    <td>Deprecated.</td>
</tr>
<tr>
    <td><CopyableCode code="group_details" /></td>
    <td><code>array</code></td>
    <td>The groups associated with the application role. (wire: groupDetails)</td>
</tr>
<tr>
    <td><CopyableCode code="groups" /></td>
    <td><code>array</code></td>
    <td>The groups associated with the application role. As a group's name can change, use of `groupDetails` is recommended to identify a groups.</td>
</tr>
<tr>
    <td><CopyableCode code="has_unlimited_seats" /></td>
    <td><code>boolean</code></td>
    <td> (wire: hasUnlimitedSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the application role.</td>
</tr>
<tr>
    <td><CopyableCode code="number_of_seats" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum count of users on your license. (wire: numberOfSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="platform" /></td>
    <td><code>boolean</code></td>
    <td>Indicates if the application role belongs to Jira platform (`jira-core`).</td>
</tr>
<tr>
    <td><CopyableCode code="remaining_seats" /></td>
    <td><code>integer (int32)</code></td>
    <td>The count of users remaining on your license. (wire: remainingSeats)</td>
</tr>
<tr>
    <td><CopyableCode code="selected_by_default" /></td>
    <td><code>boolean</code></td>
    <td>Determines whether this application role should be selected by default on user creation. (wire: selectedByDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="user_count" /></td>
    <td><code>integer (int32)</code></td>
    <td>The number of users counting against your license. (wire: userCount)</td>
</tr>
<tr>
    <td><CopyableCode code="user_count_description" /></td>
    <td><code>string</code></td>
    <td>The &#91;type of users&#93;(https:​//confluence.atlassian.com/x/lRW3Ng) being counted against your license. (wire: userCountDescription)</td>
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
    <td>Returns an application role.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns all application roles. In Jira, application roles are managed using the &#91;Application access configuration&#93;(https:​//confluence.atlassian.com/x/3YxjL) page.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The key of the application role. Use the &#91;Get all application roles&#93;(#api-rest-api-3-applicationrole-get) operation to get the key for each application role.</td>
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

Returns an application role.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
name,
default_groups,
default_groups_details,
defined,
group_details,
groups,
has_unlimited_seats,
key,
number_of_seats,
platform,
remaining_seats,
selected_by_default,
user_count,
user_count_description
FROM jira.system.application_roles
WHERE key = '{{ key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns all application roles. In Jira, application roles are managed using the &#91;Application access configuration&#93;(https:​//confluence.atlassian.com/x/3YxjL) page.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
name,
default_groups,
default_groups_details,
defined,
group_details,
groups,
has_unlimited_seats,
key,
number_of_seats,
platform,
remaining_seats,
selected_by_default,
user_count,
user_count_description
FROM jira.system.application_roles
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
