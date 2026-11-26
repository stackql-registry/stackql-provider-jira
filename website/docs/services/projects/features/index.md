--- 
title: features
hide_title: false
hide_table_of_contents: false
keywords:
  - features
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the features resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>features</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="features" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.features" /></td></tr>
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
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the project. (wire: projectId)</td>
</tr>
<tr>
    <td><CopyableCode code="localised_name" /></td>
    <td><code>string</code></td>
    <td>Localized display name for the feature. (wire: localisedName)</td>
</tr>
<tr>
    <td><CopyableCode code="feature" /></td>
    <td><code>string</code></td>
    <td>The key of the feature.</td>
</tr>
<tr>
    <td><CopyableCode code="image_uri" /></td>
    <td><code>string</code></td>
    <td>URI for the image representing the feature. (wire: imageUri)</td>
</tr>
<tr>
    <td><CopyableCode code="localised_description" /></td>
    <td><code>string</code></td>
    <td>Localized display description for the feature. (wire: localisedDescription)</td>
</tr>
<tr>
    <td><CopyableCode code="prerequisites" /></td>
    <td><code>array</code></td>
    <td>List of keys of the features required to enable the feature.</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td>The state of the feature. When updating the state of a feature, only ENABLED and DISABLED are supported. Responses can contain all values (ENABLED, DISABLED, COMING_SOON)</td>
</tr>
<tr>
    <td><CopyableCode code="toggle_locked" /></td>
    <td><code>boolean</code></td>
    <td>Whether the state of the feature can be updated. (wire: toggleLocked)</td>
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
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the list of features for a project.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-project_id_or_key"><code>project_id_or_key</code></a>, <a href="#parameter-feature_key"><code>feature_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Sets the state of a project feature.</td>
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
<tr id="parameter-feature_key">
    <td><CopyableCode code="feature_key" /></td>
    <td><code>string</code></td>
    <td>The key of the feature.</td>
</tr>
<tr id="parameter-project_id_or_key">
    <td><CopyableCode code="project_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or (case-sensitive) key of the project.</td>
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

Returns the list of features for a project.

```sql
SELECT
project_id,
localised_name,
feature,
image_uri,
localised_description,
prerequisites,
state,
toggle_locked
FROM jira.projects.features
WHERE project_id_or_key = '{{ project_id_or_key }}' -- required
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

Sets the state of a project feature.

```sql
UPDATE jira.projects.features
SET 
state = '{{ state }}'
WHERE 
project_id_or_key = '{{ project_id_or_key }}' --required
AND feature_key = '{{ feature_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
features;
```
</TabItem>
</Tabs>
