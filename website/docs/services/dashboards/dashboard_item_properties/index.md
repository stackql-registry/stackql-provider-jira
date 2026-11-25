--- 
title: dashboard_item_properties
hide_title: false
hide_table_of_contents: false
keywords:
  - dashboard_item_properties
  - dashboards
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the dashboard_item_properties resource in the jira dashboards service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>dashboard_item_properties</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="dashboard_item_properties" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.dashboards.dashboard_item_properties" /></td></tr>
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
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the property. Required on create and update.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code></code></td>
    <td>The value of the property. Required on create and update.</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the property.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the property.</td>
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
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-item_id"><code>item_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the key and value of a dashboard item property.&lt;br /&gt;&lt;br /&gt;A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see &#91;Adding and customizing gadgets&#93;(https:​//confluence.atlassian.com/x/7AeiLQ).&lt;br /&gt;&lt;br /&gt;When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see &#91; Building a dashboard item for a JIRA Connect add-on&#93;(https:​//developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the &#91;Dashboard Item&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.&lt;br /&gt;&lt;br /&gt;There is no resource to set or get dashboard items.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have read permission of the dashboard or have the dashboard shared with them.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-item_id"><code>item_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the keys of all properties for a dashboard item.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have read permission of the dashboard or have the dashboard shared with them.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-item_id"><code>item_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-value"><code>value</code></a></td>
    <td></td>
    <td>Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.&lt;br /&gt;&lt;br /&gt;A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see &#91;Adding and customizing gadgets&#93;(https:​//confluence.atlassian.com/x/7AeiLQ).&lt;br /&gt;&lt;br /&gt;When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see &#91; Building a dashboard item for a JIRA Connect add-on&#93;(https:​//developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the &#91;Dashboard Item&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.&lt;br /&gt;&lt;br /&gt;There is no resource to set or get dashboard items.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have edit permisson of the dashboard.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-dashboard_id"><code>dashboard_id</code></a>, <a href="#parameter-item_id"><code>item_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a dashboard item property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have edit permission of the dashboard.</td>
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
<tr id="parameter-dashboard_id">
    <td><CopyableCode code="dashboard_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the dashboard. (wire: dashboardId)</td>
</tr>
<tr id="parameter-item_id">
    <td><CopyableCode code="item_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the dashboard item. (wire: itemId)</td>
</tr>
<tr id="parameter-property_key">
    <td><CopyableCode code="property_key" /></td>
    <td><code>string</code></td>
    <td>The key of the dashboard item property. (wire: propertyKey)</td>
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

Returns the key and value of a dashboard item property.&lt;br /&gt;&lt;br /&gt;A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see &#91;Adding and customizing gadgets&#93;(https:​//confluence.atlassian.com/x/7AeiLQ).&lt;br /&gt;&lt;br /&gt;When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see &#91; Building a dashboard item for a JIRA Connect add-on&#93;(https:​//developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the &#91;Dashboard Item&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.&lt;br /&gt;&lt;br /&gt;There is no resource to set or get dashboard items.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have read permission of the dashboard or have the dashboard shared with them.

```sql
SELECT
key,
value
FROM jira.dashboards.dashboard_item_properties
WHERE dashboard_id = '{{ dashboard_id }}' -- required
AND item_id = '{{ item_id }}' -- required
AND property_key = '{{ property_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns the keys of all properties for a dashboard item.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have read permission of the dashboard or have the dashboard shared with them.

```sql
SELECT
key,
self
FROM jira.dashboards.dashboard_item_properties
WHERE dashboard_id = '{{ dashboard_id }}' -- required
AND item_id = '{{ item_id }}' -- required
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

Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.&lt;br /&gt;&lt;br /&gt;A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see &#91;Adding and customizing gadgets&#93;(https:​//confluence.atlassian.com/x/7AeiLQ).&lt;br /&gt;&lt;br /&gt;When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see &#91; Building a dashboard item for a JIRA Connect add-on&#93;(https:​//developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the &#91;Dashboard Item&#93;(https:​//developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.&lt;br /&gt;&lt;br /&gt;There is no resource to set or get dashboard items.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have edit permisson of the dashboard.

```sql
UPDATE jira.dashboards.dashboard_item_properties
SET 
value = '{{ value }}'
WHERE 
dashboard_id = '{{ dashboard_id }}' --required
AND item_id = '{{ item_id }}' --required
AND property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND value = '{{ value }}' --required;
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

Deletes a dashboard item property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The user must have edit permission of the dashboard.

```sql
DELETE FROM jira.dashboards.dashboard_item_properties
WHERE dashboard_id = '{{ dashboard_id }}' --required
AND item_id = '{{ item_id }}' --required
AND property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
