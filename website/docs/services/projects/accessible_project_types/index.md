--- 
title: accessible_project_types
hide_title: false
hide_table_of_contents: false
keywords:
  - accessible_project_types
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the accessible_project_types resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>accessible_project_types</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="accessible_project_types" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.accessible_project_types" /></td></tr>
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
    <td><CopyableCode code="color" /></td>
    <td><code>string</code></td>
    <td>The color of the project type.</td>
</tr>
<tr>
    <td><CopyableCode code="description_i18n_key" /></td>
    <td><code>string</code></td>
    <td>The key of the project type's description. (wire: descriptionI18nKey)</td>
</tr>
<tr>
    <td><CopyableCode code="formatted_key" /></td>
    <td><code>string</code></td>
    <td>The formatted key of the project type. (wire: formattedKey)</td>
</tr>
<tr>
    <td><CopyableCode code="icon" /></td>
    <td><code>string</code></td>
    <td>The icon of the project type.</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project type.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details about a project type.

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
    <td><CopyableCode code="color" /></td>
    <td><code>string</code></td>
    <td>The color of the project type.</td>
</tr>
<tr>
    <td><CopyableCode code="description_i18n_key" /></td>
    <td><code>string</code></td>
    <td>The key of the project type's description. (wire: descriptionI18nKey)</td>
</tr>
<tr>
    <td><CopyableCode code="formatted_key" /></td>
    <td><code>string</code></td>
    <td>The formatted key of the project type. (wire: formattedKey)</td>
</tr>
<tr>
    <td><CopyableCode code="icon" /></td>
    <td><code>string</code></td>
    <td>The icon of the project type.</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the project type.</td>
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
    <td><a href="#parameter-project_type_key"><code>project_type_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a &#91;project type&#93;(https:​//confluence.atlassian.com/x/Var1Nw) if it is accessible to the user.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns all &#91;project types&#93;(https:​//confluence.atlassian.com/x/Var1Nw) with a valid license.</td>
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
<tr id="parameter-project_type_key">
    <td><CopyableCode code="project_type_key" /></td>
    <td><code>string</code></td>
    <td>The key of the project type. (wire: projectTypeKey)</td>
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

Returns a &#91;project type&#93;(https:​//confluence.atlassian.com/x/Var1Nw) if it is accessible to the user.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
color,
description_i18n_key,
formatted_key,
icon,
key
FROM jira.projects.accessible_project_types
WHERE project_type_key = '{{ project_type_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns all [project types](https://confluence.atlassian.com/x/Var1Nw) with a valid license.

```sql
SELECT
color,
description_i18n_key,
formatted_key,
icon,
key
FROM jira.projects.accessible_project_types
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
