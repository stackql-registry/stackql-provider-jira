--- 
title: sprint_properties
hide_title: false
hide_table_of_contents: false
keywords:
  - sprint_properties
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the sprint_properties resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>sprint_properties</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sprint_properties" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.sprint_properties" /></td></tr>
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

Returned if the sprint exists and the property was found.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Returned if the sprint with given id exists.

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
    <td></td>
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
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the value of the property with a given key from the sprint identified by the provided id. The user who retrieves the property is required to have permissions to view the sprint.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the keys of all properties for the sprint identified by the id. The user who retrieves the property keys is required to have permissions to view the sprint.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-value"><code>value</code></a></td>
    <td></td>
    <td>Sets the value of the specified sprint's property.&lt;br /&gt;&lt;br /&gt;You can use this resource to store a custom data against the sprint identified by the id. The user who stores the data is required to have permissions to modify the sprint.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes the property from the sprint identified by the id. Ths user removing the property is required to have permissions to modify the sprint.</td>
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
<tr id="parameter-property_key">
    <td><CopyableCode code="property_key" /></td>
    <td><code>string</code></td>
    <td>the key of the property to remove. (wire: propertyKey)</td>
</tr>
<tr id="parameter-sprint_id">
    <td><CopyableCode code="sprint_id" /></td>
    <td><code>string</code></td>
    <td>the ID of the sprint from which the property will be removed. (wire: sprintId)</td>
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

Returns the value of the property with a given key from the sprint identified by the provided id. The user who retrieves the property is required to have permissions to view the sprint.

```sql
SELECT
key,
value
FROM jira.agile.sprint_properties
WHERE sprint_id = '{{ sprint_id }}' -- required
AND property_key = '{{ property_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns the keys of all properties for the sprint identified by the id. The user who retrieves the property keys is required to have permissions to view the sprint.

```sql
SELECT
key,
self
FROM jira.agile.sprint_properties
WHERE sprint_id = '{{ sprint_id }}' -- required
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

Sets the value of the specified sprint's property.&lt;br /&gt;&lt;br /&gt;You can use this resource to store a custom data against the sprint identified by the id. The user who stores the data is required to have permissions to modify the sprint.

```sql
UPDATE jira.agile.sprint_properties
SET 
value = '{{ value }}'
WHERE 
sprint_id = '{{ sprint_id }}' --required
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

Removes the property from the sprint identified by the id. Ths user removing the property is required to have permissions to modify the sprint.

```sql
DELETE FROM jira.agile.sprint_properties
WHERE sprint_id = '{{ sprint_id }}' --required
AND property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
