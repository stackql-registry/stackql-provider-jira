--- 
title: field_schemes
hide_title: false
hide_table_of_contents: false
keywords:
  - field_schemes
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the field_schemes resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>field_schemes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="field_schemes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.field_schemes" /></td></tr>
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

Returned if a field association scheme matches the given scheme ID

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_count" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: fieldsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td> (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="links" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Response object for getting a field association scheme.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_count" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: fieldsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td> (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="links" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="matched_filters" /></td>
    <td><code>object</code></td>
    <td>Matched filters for field association scheme search. (wire: matchedFilters)</td>
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
    <td></td>
    <td>Endpoint for fetching a field association scheme by its ID&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>REST endpoint for retrieving a paginated list of field association schemes with optional filtering.&lt;br /&gt;&lt;br /&gt;This endpoint allows clients to fetch field association schemes with optional filtering by project IDs and text queries. The response includes scheme details with navigation links and filter metadata when applicable.&lt;br /&gt;&lt;br /&gt;Filtering Behavior:&lt;br /&gt;&lt;br /&gt; *  When projectId or query parameters are provided, the response includes matchedFilters metadata showing which filters were applied.&lt;br /&gt; *  When no filters are applied, matchedFilters is omitted from individual scheme objects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Endpoint for creating a new field association scheme.&lt;br /&gt;&lt;br /&gt;A new scheme is **not** copied from, or based on, any existing field association scheme. Instead, it is initialised with a minimal default set of critical fields sourced from the instance's own *system* and *product* fields (the fields returned by the product's field API), rather than from a scheme you specify.&lt;br /&gt;&lt;br /&gt;To create a scheme that is based on an existing one, use the *Clone field scheme* endpoint instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Endpoint for updating an existing field association scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Delete a specified field association scheme&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_fields"><CopyableCode code="remove_fields" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Remove fields associated with field association schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update_fields"><CopyableCode code="update_fields" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Update fields associated with field association schemes.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can update associations for at most **100 fields** (the top-level field ID keys of the request body), and each field association item may reference at most 50 field schemes. Exceeding a limit returns a 400 response with an error such as "The fieldIds must contain no more than 100 items."&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_field_parameters"><CopyableCode code="remove_field_parameters" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Remove field association parameters overrides for work types.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can remove at most **100 parameters**. The number of removals is counted as the sum, across every removal entry, of the number of work types multiplied by the number of parameter names in that entry. Exceeding this limit returns a 400 response with the error "Request exceeds maximum number of parameters that can be removed 100".&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update_field_parameters"><CopyableCode code="update_field_parameters" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Update field association item parameters in field association schemes.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can update parameters for at most **100 fields** (the top-level field ID keys of the request body). In addition, each field may include at most 50 update items, and each update item may reference at most 50 field schemes. Exceeding any of these limits returns a 400 response with an error such as "The fieldIds must contain no more than 100 items."&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#clone"><CopyableCode code="clone" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Endpoint for cloning an existing field association scheme into a new one.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td><code>integer (int64)</code></td>
    <td>The ID of the source field association scheme to clone from</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>Maximum number of items to return per page (default: 50, max: 100) (wire: maxResults)</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>array</code></td>
    <td>(optional) List of project IDs to filter schemes by. If not provided, schemes from all projects are returned. (wire: projectId)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>(optional) Text filter for scheme name or description matching (case-insensitive). If not provided, no text filtering is applied.</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>Zero-based index of the first item to return (default: 0) (wire: startAt)</td>
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

Endpoint for fetching a field association scheme by its ID&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
description,
fields_count,
is_default,
links
FROM jira.fields.field_schemes
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

REST endpoint for retrieving a paginated list of field association schemes with optional filtering.&lt;br /&gt;&lt;br /&gt;This endpoint allows clients to fetch field association schemes with optional filtering by project IDs and text queries. The response includes scheme details with navigation links and filter metadata when applicable.&lt;br /&gt;&lt;br /&gt;Filtering Behavior:&lt;br /&gt;&lt;br /&gt; *  When projectId or query parameters are provided, the response includes matchedFilters metadata showing which filters were applied.&lt;br /&gt; *  When no filters are applied, matchedFilters is omitted from individual scheme objects&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
description,
fields_count,
is_default,
links,
matched_filters
FROM jira.fields.field_schemes
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND project_id = '{{ project_id }}'
AND query = '{{ query }}'
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

Endpoint for creating a new field association scheme.&lt;br /&gt;&lt;br /&gt;A new scheme is **not** copied from, or based on, any existing field association scheme. Instead, it is initialised with a minimal default set of critical fields sourced from the instance's own *system* and *product* fields (the fields returned by the product's field API), rather than from a scheme you specify.&lt;br /&gt;&lt;br /&gt;To create a scheme that is based on an existing one, use the *Clone field scheme* endpoint instead.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.fields.field_schemes (
description,
name,
cloud_id
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */,
'{{ cloud_id }}'
RETURNING
id,
name,
description,
links
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: field_schemes
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the field_schemes resource.
    - name: description
      value: "{{ description }}"
      description: |
        Description of the scheme to be created
    - name: name
      value: "{{ name }}"
      description: |
        The name of the scheme to be created
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

Endpoint for updating an existing field association scheme.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.fields.field_schemes
SET 
description = '{{ description }}',
name = '{{ name }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
description,
links;
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

Delete a specified field association scheme&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.fields.field_schemes
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="remove_fields"
    values={[
        { label: 'remove_fields', value: 'remove_fields' },
        { label: 'update_fields', value: 'update_fields' },
        { label: 'remove_field_parameters', value: 'remove_field_parameters' },
        { label: 'update_field_parameters', value: 'update_field_parameters' },
        { label: 'clone', value: 'clone' }
    ]}
>
<TabItem value="remove_fields">

Remove fields associated with field association schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.field_schemes.remove_fields 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="update_fields">

Update fields associated with field association schemes.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can update associations for at most **100 fields** (the top-level field ID keys of the request body), and each field association item may reference at most 50 field schemes. Exceeding a limit returns a 400 response with an error such as "The fieldIds must contain no more than 100 items."&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.field_schemes.update_fields 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="remove_field_parameters">

Remove field association parameters overrides for work types.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can remove at most **100 parameters**. The number of removals is counted as the sum, across every removal entry, of the number of work types multiplied by the number of parameter names in that entry. Exceeding this limit returns a 400 response with the error "Request exceeds maximum number of parameters that can be removed 100".&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.field_schemes.remove_field_parameters 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="update_field_parameters">

Update field association item parameters in field association schemes.&lt;br /&gt;&lt;br /&gt;**Request body limits:** a single request can update parameters for at most **100 fields** (the top-level field ID keys of the request body). In addition, each field may include at most 50 update items, and each update item may reference at most 50 field schemes. Exceeding any of these limits returns a 400 response with an error such as "The fieldIds must contain no more than 100 items."&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.field_schemes.update_field_parameters 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="clone">

Endpoint for cloning an existing field association scheme into a new one.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.field_schemes.clone 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"description": "{{ description }}", 
"name": "{{ name }}"
}'
;
```
</TabItem>
</Tabs>
