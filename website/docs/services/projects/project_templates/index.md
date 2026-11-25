--- 
title: project_templates
hide_title: false
hide_table_of_contents: false
keywords:
  - project_templates
  - projects
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the project_templates resource in the jira projects service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>project_templates</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_templates" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.projects.project_templates" /></td></tr>
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

200 response

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="archetype" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="default_board_view" /></td>
    <td><code>string</code></td>
    <td> (wire: defaultBoardView)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="live_template_project_id_reference" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: liveTemplateProjectIdReference)</td>
</tr>
<tr>
    <td><CopyableCode code="project_template_key" /></td>
    <td><code>object</code></td>
    <td> (wire: projectTemplateKey)</td>
</tr>
<tr>
    <td><CopyableCode code="snapshot_template" /></td>
    <td><code>object</code></td>
    <td> (wire: snapshotTemplate)</td>
</tr>
<tr>
    <td><CopyableCode code="template_generation_options" /></td>
    <td><code>object</code></td>
    <td> (wire: templateGenerationOptions)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (LIVE, SNAPSHOT)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-template_key"><code>template_key</code></a></td>
    <td>Get custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to get a live custom project template details by either templateKey or projectId&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Save custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to save a customised template&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Edit custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to edit an existing customised template.&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-template_key"><code>template_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Remove custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to remove a specified customised template&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***</td>
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
<tr id="parameter-template_key">
    <td><CopyableCode code="template_key" /></td>
    <td><code>string</code></td>
    <td>The \&#123;@link String\&#125; containing the key of the custom template to remove (wire: templateKey)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>optional - The \&#123;@link String\&#125; containing the project key linked to the custom template to retrieve (wire: projectId)</td>
</tr>
<tr id="parameter-template_key">
    <td><CopyableCode code="template_key" /></td>
    <td><code>string</code></td>
    <td>optional - The \&#123;@link String\&#125; containing the key of the custom template to retrieve (wire: templateKey)</td>
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

Get custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to get a live custom project template details by either templateKey or projectId&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***

```sql
SELECT
name,
archetype,
default_board_view,
description,
live_template_project_id_reference,
project_template_key,
snapshot_template,
template_generation_options,
type
FROM jira.projects.project_templates
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_id = '{{ project_id }}'
AND template_key = '{{ template_key }}'
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

Save custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to save a customised template&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***

```sql
INSERT INTO jira.projects.project_templates (
template_description,
template_from_project_request,
template_name,
cloud_id
)
SELECT 
'{{ template_description }}',
'{{ template_from_project_request }}',
'{{ template_name }}',
'{{ cloud_id }}'
RETURNING
project_template_key
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: project_templates
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the project_templates resource.
    - name: template_description
      value: "{{ template_description }}"
      description: |
        The description of the template
    - name: template_from_project_request
      description: |
        The request details to generate template from a project
      value:
        projectId: {{ projectId }}
        templateGenerationOptions:
          enableScreenDelegatedAdminSupport: {{ enableScreenDelegatedAdminSupport }}
          enableWorkflowDelegatedAdminSupport: {{ enableWorkflowDelegatedAdminSupport }}
        templateType: "{{ templateType }}"
    - name: template_name
      value: "{{ template_name }}"
      description: |
        The name of the template
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

Edit custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to edit an existing customised template.&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***

```sql
UPDATE jira.projects.project_templates
SET 
template_description = '{{ template_description }}',
template_generation_options = '{{ template_generation_options }}',
template_key = '{{ template_key }}',
template_name = '{{ template_name }}'
WHERE 
cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set;
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

Remove custom template&lt;br /&gt;&lt;br /&gt;This API endpoint allows you to remove a specified customised template&lt;br /&gt;&lt;br /&gt;***Note: Custom Templates are only supported for Jira Enterprise edition.***

```sql
DELETE FROM jira.projects.project_templates
WHERE template_key = '{{ template_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
