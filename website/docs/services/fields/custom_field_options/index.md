--- 
title: custom_field_options
hide_title: false
hide_table_of_contents: false
keywords:
  - custom_field_options
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the custom_field_options resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>custom_field_options</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="custom_field_options" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.custom_field_options" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

Details of the custom field options for a context.

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
    <td>The ID of the custom field option.</td>
</tr>
<tr>
    <td><CopyableCode code="option_id" /></td>
    <td><code>string</code></td>
    <td>For cascading options, the ID of the custom field option containing the cascading option. (wire: optionId)</td>
</tr>
<tr>
    <td><CopyableCode code="disabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the option is disabled.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The value of the custom field option.</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of these custom field option details.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The value of the custom field option.</td>
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
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-option_id"><code>option_id</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-only_options"><code>only_options</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). *Edit Workflow* &#91;edit workflow permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a custom field option. For example, an option in a select list.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The custom field option is returned as follows:&lt;br /&gt;&lt;br /&gt; *  if the user has the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  if the user has the *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for at least one project the custom field is used in, and the field is visible in at least one layout the user has permission to view.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.&lt;br /&gt;&lt;br /&gt;The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000 options.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates the options of a custom field.&lt;br /&gt;&lt;br /&gt;If any of the options are not found, no options are updated. Options where the values in the request match the current values aren't updated and aren't reported in the response.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-context_id"><code>context_id</code></a>, <a href="#parameter-option_id"><code>option_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a custom field option.&lt;br /&gt;&lt;br /&gt;Options with cascading options cannot be deleted without deleting the cascading options first.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#reorder"><CopyableCode code="reorder" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-customFieldOptionIds"><code>customFieldOptionIds</code></a></td>
    <td></td>
    <td>Changes the order of custom field options or cascading options in a context.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#replace_on_issues"><CopyableCode code="replace_on_issues" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-fieldId"><code>fieldId</code></a>, <a href="#parameter-optionId"><code>optionId</code></a>, <a href="#parameter-contextId"><code>contextId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-replaceWith"><code>replaceWith</code></a>, <a href="#parameter-jql"><code>jql</code></a></td>
    <td>Replaces the options of a custom field.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect or Forge apps.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the context from which an option should be deleted. (wire: contextId)</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the custom field option.</td>
</tr>
<tr id="parameter-optionId">
    <td><CopyableCode code="optionId" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the option to be deselected.</td>
</tr>
<tr id="parameter-option_id">
    <td><CopyableCode code="option_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the option to delete. (wire: optionId)</td>
</tr>
<tr id="parameter-jql">
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td>A JQL query that specifies the issues to be updated. For example, *project=10000*.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-only_options">
    <td><CopyableCode code="only_options" /></td>
    <td><code>boolean</code></td>
    <td>Whether only options are returned. (wire: onlyOptions)</td>
</tr>
<tr id="parameter-option_id">
    <td><CopyableCode code="option_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the option. (wire: optionId)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>Case-insensitive literal substring of the option value. Blank queries do not filter. Combined with optionId and onlyOptions before pagination; totals count matching options.</td>
</tr>
<tr id="parameter-replaceWith">
    <td><CopyableCode code="replaceWith" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the option that will replace the currently selected option.</td>
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
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of all custom field option for a context. Options are returned first then cascading options, in the order they display in Jira.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). *Edit Workflow* &#91;edit workflow permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Edit-Workflows)

```sql
SELECT
id,
option_id,
disabled,
value
FROM jira.fields.custom_field_options
WHERE field_id = '{{ field_id }}' -- required
AND context_id = '{{ context_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND option_id = '{{ option_id }}'
AND query = '{{ query }}'
AND only_options = '{{ only_options }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
<TabItem value="get">

Returns a custom field option. For example, an option in a select list.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** The custom field option is returned as follows:&lt;br /&gt;&lt;br /&gt; *  if the user has the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).&lt;br /&gt; *  if the user has the *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for at least one project the custom field is used in, and the field is visible in at least one layout the user has permission to view.

```sql
SELECT
self,
value
FROM jira.fields.custom_field_options
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.&lt;br /&gt;&lt;br /&gt;The maximum number of options that can be created per request is 1000 and each field can have a maximum of 10000 options.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.fields.custom_field_options (
options,
field_id,
context_id,
cloud_id
)
SELECT 
'{{ options }}',
'{{ field_id }}',
'{{ context_id }}',
'{{ cloud_id }}'
RETURNING
options
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: custom_field_options
  props:
    - name: field_id
      value: "{{ field_id }}"
      description: Required parameter for the custom_field_options resource.
    - name: context_id
      value: "{{ context_id }}"
      description: Required parameter for the custom_field_options resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the custom_field_options resource.
    - name: options
      description: |
        Details of options to create.
      value:
        - disabled: {{ disabled }}
          optionId: "{{ optionId }}"
          value: "{{ value }}"
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

Updates the options of a custom field.&lt;br /&gt;&lt;br /&gt;If any of the options are not found, no options are updated. Options where the values in the request match the current values aren't updated and aren't reported in the response.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect apps.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.fields.custom_field_options
SET 
options = '{{ options }}'
WHERE 
field_id = '{{ field_id }}' --required
AND context_id = '{{ context_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
options;
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

Deletes a custom field option.&lt;br /&gt;&lt;br /&gt;Options with cascading options cannot be deleted without deleting the cascading options first.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.fields.custom_field_options
WHERE field_id = '{{ field_id }}' --required
AND context_id = '{{ context_id }}' --required
AND option_id = '{{ option_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="reorder"
    values={[
        { label: 'reorder', value: 'reorder' },
        { label: 'replace_on_issues', value: 'replace_on_issues' }
    ]}
>
<TabItem value="reorder">

Changes the order of custom field options or cascading options in a context.&lt;br /&gt;&lt;br /&gt;This operation works for custom field options created in Jira or the operations from this resource. **To work with issue field select list options created for Connect apps use the &#91;Issue custom field options (apps)&#93;(#api-group-issue-custom-field-options--apps-) operations.**&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_options.reorder 
@fieldId='{{ fieldId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"after": "{{ after }}", 
"customFieldOptionIds": "{{ customFieldOptionIds }}", 
"position": "{{ position }}"
}'
;
```
</TabItem>
<TabItem value="replace_on_issues">

Replaces the options of a custom field.&lt;br /&gt;&lt;br /&gt;Note that this operation **only works for issue field select list options created in Jira or using operations from the &#91;Issue custom field options&#93;(#api-group-Issue-custom-field-options) resource**, it cannot be used with issue field select list options created by Connect or Forge apps.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.custom_field_options.replace_on_issues 
@fieldId='{{ fieldId }}' --required, 
@optionId='{{ optionId }}' --required, 
@contextId='{{ contextId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@replaceWith='{{ replaceWith }}', 
@jql='{{ jql }}'
;
```
</TabItem>
</Tabs>
