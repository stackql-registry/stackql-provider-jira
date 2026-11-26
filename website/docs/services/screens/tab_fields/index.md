--- 
title: tab_fields
hide_title: false
hide_table_of_contents: false
keywords:
  - tab_fields
  - screens
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the tab_fields resource in the jira screens service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>tab_fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="tab_fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.screens.tab_fields" /></td></tr>
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

A screen tab field.

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
    <td><code>string</code></td>
    <td>The ID of the screen tab field.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the screen tab field. Required on create and update. The maximum length is 255 characters.</td>
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
    <td><a href="#parameter-screen_id"><code>screen_id</code></a>, <a href="#parameter-tab_id"><code>tab_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_key"><code>project_key</code></a></td>
    <td>Returns all fields for a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) when the project key is specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-screen_id"><code>screen_id</code></a>, <a href="#parameter-tab_id"><code>tab_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-field_id"><code>field_id</code></a></td>
    <td><a href="#parameter-skip_field_association"><code>skip_field_association</code></a></td>
    <td>Adds a field to a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-screen_id"><code>screen_id</code></a>, <a href="#parameter-tab_id"><code>tab_id</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Removes a field from a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#move"><CopyableCode code="move" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-screen_id"><code>screen_id</code></a>, <a href="#parameter-tab_id"><code>tab_id</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves a screen tab field.&lt;br /&gt;&lt;br /&gt;If `after` and `position` are provided in the request, `position` is ignored.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the field.</td>
</tr>
<tr id="parameter-screen_id">
    <td><CopyableCode code="screen_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the screen.</td>
</tr>
<tr id="parameter-tab_id">
    <td><CopyableCode code="tab_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the screen tab.</td>
</tr>
<tr id="parameter-project_key">
    <td><CopyableCode code="project_key" /></td>
    <td><code>string</code></td>
    <td>The key of the project. (wire: projectKey)</td>
</tr>
<tr id="parameter-skip_field_association">
    <td><CopyableCode code="skip_field_association" /></td>
    <td><code>boolean</code></td>
    <td> (wire: skipFieldAssociation)</td>
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

Returns all fields for a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  *Administer projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) when the project key is specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.

```sql
SELECT
id,
name
FROM jira.screens.tab_fields
WHERE screen_id = '{{ screen_id }}' -- required
AND tab_id = '{{ tab_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_key = '{{ project_key }}'
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

Adds a field to a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.screens.tab_fields (
field_id,
screen_id,
tab_id,
cloud_id,
skip_field_association
)
SELECT 
'{{ field_id }}' /* required */,
'{{ screen_id }}',
'{{ tab_id }}',
'{{ cloud_id }}',
'{{ skip_field_association }}'
RETURNING
id,
name
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: tab_fields
  props:
    - name: screen_id
      value: "{{ screen_id }}"
      description: Required parameter for the tab_fields resource.
    - name: tab_id
      value: "{{ tab_id }}"
      description: Required parameter for the tab_fields resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the tab_fields resource.
    - name: field_id
      value: "{{ field_id }}"
      description: |
        The ID of the field to add.
    - name: skip_field_association
      value: {{ skip_field_association }}
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

Removes a field from a screen tab.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.screens.tab_fields
WHERE screen_id = '{{ screen_id }}' --required
AND tab_id = '{{ tab_id }}' --required
AND id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="move"
    values={[
        { label: 'move', value: 'move' }
    ]}
>
<TabItem value="move">

Moves a screen tab field.&lt;br /&gt;&lt;br /&gt;If `after` and `position` are provided in the request, `position` is ignored.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.screens.tab_fields.move 
@screen_id='{{ screen_id }}' --required, 
@tab_id='{{ tab_id }}' --required, 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"after": "{{ after }}", 
"position": "{{ position }}"
}'
;
```
</TabItem>
</Tabs>
