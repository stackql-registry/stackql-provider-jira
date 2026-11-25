--- 
title: custom_field_contexts
hide_title: false
hide_table_of_contents: false
keywords:
  - custom_field_contexts
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the custom_field_contexts resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>custom_field_contexts</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="custom_field_contexts" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.custom_field_contexts" /></td></tr>
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

The details of a custom field context.

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
    <td>The ID of the context.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the context.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the context.</td>
</tr>
<tr>
    <td><CopyableCode code="is_any_issue_type" /></td>
    <td><code>boolean</code></td>
    <td>Whether the context apply to all issue types. (wire: isAnyIssueType)</td>
</tr>
<tr>
    <td><CopyableCode code="is_global_context" /></td>
    <td><code>boolean</code></td>
    <td>Whether the context is global. (wire: isGlobalContext)</td>
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
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-is_any_issue_type"><code>is_any_issue_type</code></a>, <a href="#parameter-is_global_context"><code>is_global_context</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of &#91; contexts&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom field. Contexts can be returned as follows:&lt;br /&gt;&lt;br /&gt; *  With no other parameters set, all contexts.&lt;br /&gt; *  By defining `id` only, all contexts from the list of IDs.&lt;br /&gt; *  By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types (true) or those that apply to only a subset of issue types (false)&lt;br /&gt; *  By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global contexts) (true) or those that apply to only a subset of projects (false).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). *Edit Workflow* &#91;edit workflow permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Creates a custom field context.&lt;br /&gt;&lt;br /&gt;If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If `issueTypeIds` is empty, the context applies to all issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a &#91; custom field context&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a &#91; custom field context&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).&lt;br /&gt;&lt;br /&gt;This API will not allow removing the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list_for_projects_and_issue_types"><CopyableCode code="list_for_projects_and_issue_types" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-mappings"><code>mappings</code></a></td>
    <td><a href="#parameter-startAt"><code>startAt</code></a>, <a href="#parameter-maxResults"><code>maxResults</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of project and issue type mappings and, for each mapping, the ID of a &#91;custom field context&#93;(https:​//confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.&lt;br /&gt;&lt;br /&gt;If there is no custom field context assigned to the project then, if present, the custom field context that applies to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not found, the returned custom field context ID is `null`.&lt;br /&gt;&lt;br /&gt;Duplicate project and issue type mappings cannot be provided in the request.&lt;br /&gt;&lt;br /&gt;The order of the returned values is the same as provided in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#add_issue_types"><CopyableCode code="add_issue_types" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Adds issue types to a custom field context, appending the issue types to the issue types list.&lt;br /&gt;&lt;br /&gt;A custom field context without any issue types applies to all issue types. Adding issue types replaces the any-issue-type mapping unless \&#123;@code isAnyIssueType\&#125; is true. For sites that support defaults per issue type, a supplied \&#123;@code defaultValue\&#125; sets overrides for added IDs or the base default for all issue types. Omitted or null defaults leave stored defaults unchanged. Specific IDs and \&#123;@code isAnyIssueType=true\&#125; are mutually exclusive. Applicability and defaults update atomically.&lt;br /&gt;&lt;br /&gt;If any of the issue types exists in the custom field context, the operation fails and no issue types are added. Requesting \&#123;@code isAnyIssueType=true\&#125; when the context already applies to all issue types also returns HTTP 400, even when a default is supplied.&lt;br /&gt;&lt;br /&gt;This API will not allow adding issue types to the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_issue_types"><CopyableCode code="remove_issue_types" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-issueTypeIds"><code>issueTypeIds</code></a></td>
    <td></td>
    <td>Removes issue types from a custom field context.&lt;br /&gt;&lt;br /&gt;A custom field context without any issue types applies to all issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#assign_projects"><CopyableCode code="assign_projects" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-projectIds"><code>projectIds</code></a></td>
    <td></td>
    <td>Assigns a custom field context to projects.&lt;br /&gt;&lt;br /&gt;If any project in the request is assigned to any context of the custom field, the operation fails.&lt;br /&gt;&lt;br /&gt;This API will not allow adding projects to the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_projects"><CopyableCode code="remove_projects" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-projectIds"><code>projectIds</code></a></td>
    <td></td>
    <td>Removes a custom field context from projects.&lt;br /&gt;&lt;br /&gt;A custom field context without any projects applies to all projects. Removing all projects from a custom field context would result in it applying to all projects.&lt;br /&gt;&lt;br /&gt;If any project in the request is not assigned to the context, or the operation would result in two global contexts for the field, the operation fails.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-contextId">
    <td><CopyableCode code="contextId" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the context.</td>
</tr>
<tr id="parameter-context_id">
    <td><CopyableCode code="context_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the context. (wire: contextId)</td>
</tr>
<tr id="parameter-fieldId">
    <td><CopyableCode code="fieldId" /></td>
    <td><code>string</code></td>
    <td>The ID of the custom field.</td>
</tr>
<tr id="parameter-field_id">
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the custom field. (wire: fieldId)</td>
</tr>
<tr id="parameter-context_id">
    <td><CopyableCode code="context_id" /></td>
    <td><code>array</code></td>
    <td>The list of context IDs. To include multiple contexts, separate IDs with ampersand: `contextId=10000&contextId=10001`. (wire: contextId)</td>
</tr>
<tr id="parameter-is_any_issue_type">
    <td><CopyableCode code="is_any_issue_type" /></td>
    <td><code>boolean</code></td>
    <td>Whether to return contexts that apply to all issue types. (wire: isAnyIssueType)</td>
</tr>
<tr id="parameter-is_global_context">
    <td><CopyableCode code="is_global_context" /></td>
    <td><code>boolean</code></td>
    <td>Whether to return contexts that apply to all projects. (wire: isGlobalContext)</td>
</tr>
<tr id="parameter-maxResults">
    <td><CopyableCode code="maxResults" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-startAt">
    <td><CopyableCode code="startAt" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset).</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns a &#91;paginated&#93;(#pagination) list of &#91; contexts&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html) for a custom field. Contexts can be returned as follows:&lt;br /&gt;&lt;br /&gt; *  With no other parameters set, all contexts.&lt;br /&gt; *  By defining `id` only, all contexts from the list of IDs.&lt;br /&gt; *  By defining `isAnyIssueType`, limit the list of contexts returned to either those that apply to all issue types (true) or those that apply to only a subset of issue types (false)&lt;br /&gt; *  By defining `isGlobalContext`, limit the list of contexts return to either those that apply to all projects (global contexts) (true) or those that apply to only a subset of projects (false).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). *Edit Workflow* &#91;edit workflow permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)

```sql
SELECT
id,
name,
description,
is_any_issue_type,
is_global_context
FROM jira.fields.custom_field_contexts
WHERE field_id = '{{ field_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND is_any_issue_type = '{{ is_any_issue_type }}'
AND is_global_context = '{{ is_global_context }}'
AND context_id = '{{ context_id }}'
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

Creates a custom field context.&lt;br /&gt;&lt;br /&gt;If `projectIds` is empty, a global context is created. A global context is one that applies to all project. If `issueTypeIds` is empty, the context applies to all issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.fields.custom_field_contexts (
description,
issue_type_ids,
name,
project_ids,
field_id,
cloud_id
)
SELECT 
'{{ description }}',
'{{ issue_type_ids }}',
'{{ name }}' /* required */,
'{{ project_ids }}',
'{{ field_id }}',
'{{ cloud_id }}'
RETURNING
id,
name,
description,
issue_type_ids,
project_ids
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: custom_field_contexts
  props:
    - name: field_id
      value: "{{ field_id }}"
      description: Required parameter for the custom_field_contexts resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the custom_field_contexts resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the context.
    - name: issue_type_ids
      value:
        - "{{ issue_type_ids }}"
      description: |
        The list of issue types IDs for the context. If the list is empty, the context refers to all issue types.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the context.
    - name: project_ids
      value:
        - "{{ project_ids }}"
      description: |
        The list of project IDs associated with the context. If the list is empty, the context is global.
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

Updates a &#91; custom field context&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.fields.custom_field_contexts
SET 
description = '{{ description }}',
name = '{{ name }}'
WHERE 
field_id = '{{ field_id }}' --required
AND context_id = '{{ context_id }}' --required
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

Deletes a &#91; custom field context&#93;(https:​//confluence.atlassian.com/adminjiracloud/what-are-custom-field-contexts-991923859.html).&lt;br /&gt;&lt;br /&gt;This API will not allow removing the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.fields.custom_field_contexts
WHERE field_id = '{{ field_id }}' --required
AND context_id = '{{ context_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_for_projects_and_issue_types"
    values={[
        { label: 'list_for_projects_and_issue_types', value: 'list_for_projects_and_issue_types' },
        { label: 'add_issue_types', value: 'add_issue_types' },
        { label: 'remove_issue_types', value: 'remove_issue_types' },
        { label: 'assign_projects', value: 'assign_projects' },
        { label: 'remove_projects', value: 'remove_projects' }
    ]}
>
<TabItem value="list_for_projects_and_issue_types">

Returns a &#91;paginated&#93;(#pagination) list of project and issue type mappings and, for each mapping, the ID of a &#91;custom field context&#93;(https:​//confluence.atlassian.com/x/k44fOw) that applies to the project and issue type.&lt;br /&gt;&lt;br /&gt;If there is no custom field context assigned to the project then, if present, the custom field context that applies to all projects is returned if it also applies to the issue type or all issue types. If a custom field context is not found, the returned custom field context ID is `null`.&lt;br /&gt;&lt;br /&gt;Duplicate project and issue type mappings cannot be provided in the request.&lt;br /&gt;&lt;br /&gt;The order of the returned values is the same as provided in the request.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_contexts.list_for_projects_and_issue_types 
@fieldId='{{ fieldId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@startAt='{{ startAt }}', 
@maxResults='{{ maxResults }}' 
@@json=
'{
"mappings": "{{ mappings }}"
}'
;
```
</TabItem>
<TabItem value="add_issue_types">

Adds issue types to a custom field context, appending the issue types to the issue types list.&lt;br /&gt;&lt;br /&gt;A custom field context without any issue types applies to all issue types. Adding issue types replaces the any-issue-type mapping unless \&#123;@code isAnyIssueType\&#125; is true. For sites that support defaults per issue type, a supplied \&#123;@code defaultValue\&#125; sets overrides for added IDs or the base default for all issue types. Omitted or null defaults leave stored defaults unchanged. Specific IDs and \&#123;@code isAnyIssueType=true\&#125; are mutually exclusive. Applicability and defaults update atomically.&lt;br /&gt;&lt;br /&gt;If any of the issue types exists in the custom field context, the operation fails and no issue types are added. Requesting \&#123;@code isAnyIssueType=true\&#125; when the context already applies to all issue types also returns HTTP 400, even when a default is supplied.&lt;br /&gt;&lt;br /&gt;This API will not allow adding issue types to the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_contexts.add_issue_types 
@fieldId='{{ fieldId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"defaultValue": "{{ defaultValue }}", 
"isAnyIssueType": {{ isAnyIssueType }}, 
"issueTypeIds": "{{ issueTypeIds }}"
}'
;
```
</TabItem>
<TabItem value="remove_issue_types">

Removes issue types from a custom field context.&lt;br /&gt;&lt;br /&gt;A custom field context without any issue types applies to all issue types.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_contexts.remove_issue_types 
@fieldId='{{ fieldId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issueTypeIds": "{{ issueTypeIds }}"
}'
;
```
</TabItem>
<TabItem value="assign_projects">

Assigns a custom field context to projects.&lt;br /&gt;&lt;br /&gt;If any project in the request is assigned to any context of the custom field, the operation fails.&lt;br /&gt;&lt;br /&gt;This API will not allow adding projects to the global context from April 2026. Instead, an HTTP 400 response will be returned. See &#91;CHANGE-3019&#93;(https:​//developer.atlassian.com/changelog/#CHANGE-3019)&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_contexts.assign_projects 
@fieldId='{{ fieldId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectIds": "{{ projectIds }}"
}'
;
```
</TabItem>
<TabItem value="remove_projects">

Removes a custom field context from projects.&lt;br /&gt;&lt;br /&gt;A custom field context without any projects applies to all projects. Removing all projects from a custom field context would result in it applying to all projects.&lt;br /&gt;&lt;br /&gt;If any project in the request is not assigned to the context, or the operation would result in two global contexts for the field, the operation fails.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_contexts.remove_projects 
@fieldId='{{ fieldId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"projectIds": "{{ projectIds }}"
}'
;
```
</TabItem>
</Tabs>
