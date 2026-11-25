--- 
title: fields
hide_title: false
hide_table_of_contents: false
keywords:
  - fields
  - fields
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the fields resource in the jira fields service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.fields.fields" /></td></tr>
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

Details of a field.

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
    <td>The ID of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="stable_id" /></td>
    <td><code>string</code></td>
    <td>The stable ID of the field. (wire: stableId)</td>
</tr>
<tr>
    <td><CopyableCode code="translated_name" /></td>
    <td><code>string</code></td>
    <td>The translated (i18n) name of the field for the current locale. Returned for custom fields. (wire: translatedName)</td>
</tr>
<tr>
    <td><CopyableCode code="type_display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of the field type (wire: typeDisplayName)</td>
</tr>
<tr>
    <td><CopyableCode code="contexts_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of contexts where the field is used. (wire: contextsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="is_locked" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is locked. (wire: isLocked)</td>
</tr>
<tr>
    <td><CopyableCode code="is_unscreenable" /></td>
    <td><code>boolean</code></td>
    <td>Whether the field is shown on screen or not. (wire: isUnscreenable)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="last_used" /></td>
    <td><code>object</code></td>
    <td>Information about the most recent use of a field. (wire: lastUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="projects_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of projects where the field is used. (wire: projectsCount)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema of a field.</td>
</tr>
<tr>
    <td><CopyableCode code="screens_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>Number of screens where the field is used. (wire: screensCount)</td>
</tr>
<tr>
    <td><CopyableCode code="searcher_key" /></td>
    <td><code>string</code></td>
    <td>The searcher key of the field. Returned for custom fields. (wire: searcherKey)</td>
</tr>
<tr>
    <td><CopyableCode code="translated_description" /></td>
    <td><code>string</code></td>
    <td>The translated (i18n) description of the field for the current locale. Returned for custom fields. (wire: translatedDescription)</td>
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
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-query"><code>query</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-project_ids"><code>project_ids</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of fields for Classic Jira projects. The list can include:&lt;br /&gt;&lt;br /&gt; *  all fields&lt;br /&gt; *  specific fields, by defining `id`&lt;br /&gt; *  fields that contain a string in the field name or description, by defining `query`&lt;br /&gt; *  specific fields that contain a string in the field name or description, by defining `id` and `query`&lt;br /&gt;&lt;br /&gt;Use `type` must be set to `custom` to show custom fields only.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>Creates a custom field.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-field_id"><code>field_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates a custom field.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a custom field. The custom field is deleted whether it is in the trash or not. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#list_all"><CopyableCode code="list_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns system and custom issue fields according to the following rules:&lt;br /&gt;&lt;br /&gt; *  Fields that cannot be added to the issue navigator are always returned.&lt;br /&gt; *  Fields that cannot be placed on an issue screen are always returned.&lt;br /&gt; *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.&lt;br /&gt; *  Fields that are not associated to any used field configurations or screens are not returned.&lt;br /&gt; *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.)&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#remove_associations"><CopyableCode code="remove_associations" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-associationContexts"><code>associationContexts</code></a>, <a href="#parameter-fields"><code>fields</code></a></td>
    <td></td>
    <td>Unassociates a set of fields with a project and issue type context.&lt;br /&gt;&lt;br /&gt;Fields will be unassociated with all projects/issue types that share the same field configuration which the provided project and issue types are using. This means that while the field will be unassociated with the provided project and issue types, it will also be unassociated with any other projects and issue types that share the same field configuration.&lt;br /&gt;&lt;br /&gt;If a success response is returned it means that the field association has been removed in any applicable contexts where it was present.&lt;br /&gt;&lt;br /&gt;Up to 50 fields and up to 100 projects and issue types can be unassociated in a single request. If more fields or projects are provided a 400 response will be returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#create_associations"><CopyableCode code="create_associations" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-associationContexts"><code>associationContexts</code></a>, <a href="#parameter-fields"><code>fields</code></a></td>
    <td></td>
    <td>Associates fields with projects.&lt;br /&gt;&lt;br /&gt;Fields will be associated with each issue type on the requested projects.&lt;br /&gt;&lt;br /&gt;Fields will be associated with all projects that share the same field configuration which the provided projects are using. This means that while the field will be associated with the requested projects, it will also be associated with any other projects that share the same field configuration.&lt;br /&gt;&lt;br /&gt;If a success response is returned it means that the field association has been created in any applicable contexts where it wasn't already present.&lt;br /&gt;&lt;br /&gt;Up to 50 fields and up to 100 projects can be associated in a single request. If more fields or projects are provided a 400 response will be returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#restore"><CopyableCode code="restore" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Restores a custom field from trash. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#trash"><CopyableCode code="trash" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves a custom field to trash. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-field_id">
    <td><CopyableCode code="field_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the custom field. (wire: fieldId)</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of a custom field.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:   *  `key` returns the key for each field  *  `stableId` returns the stableId for each field  *  `lastUsed` returns the date when the value of the field last changed  *  `screensCount` returns the number of screens related to a field  *  `contextsCount` returns the number of contexts related to a field  *  `isLocked` returns information about whether the field is locked  *  `searcherKey` returns the searcher key for each custom field</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The IDs of the custom fields to return or, where `query` is specified, filter.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by:   *  `contextsCount` sorts by the number of contexts related to a field  *  `lastUsed` sorts by the date when the value of the field last changed  *  `name` sorts by the field name  *  `screensCount` sorts by the number of screens related to a field (wire: orderBy)</td>
</tr>
<tr id="parameter-project_ids">
    <td><CopyableCode code="project_ids" /></td>
    <td><code>array</code></td>
    <td>The IDs of the projects to filter the fields by. Fields belonging to project Ids that the user does not have access to will not be returned (wire: projectIds)</td>
</tr>
<tr id="parameter-query">
    <td><CopyableCode code="query" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with field names or descriptions.</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>array</code></td>
    <td>The type of fields to search.</td>
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

Returns a &#91;paginated&#93;(#pagination) list of fields for Classic Jira projects. The list can include:&lt;br /&gt;&lt;br /&gt; *  all fields&lt;br /&gt; *  specific fields, by defining `id`&lt;br /&gt; *  fields that contain a string in the field name or description, by defining `query`&lt;br /&gt; *  specific fields that contain a string in the field name or description, by defining `id` and `query`&lt;br /&gt;&lt;br /&gt;Use `type` must be set to `custom` to show custom fields only.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
SELECT
id,
name,
stable_id,
translated_name,
type_display_name,
contexts_count,
description,
is_locked,
is_unscreenable,
key,
last_used,
projects_count,
schema,
screens_count,
searcher_key,
translated_description
FROM jira.fields.fields
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND type = '{{ type }}'
AND id = '{{ id }}'
AND query = '{{ query }}'
AND order_by = '{{ order_by }}'
AND expand = '{{ expand }}'
AND project_ids = '{{ project_ids }}'
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

Creates a custom field.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.fields.fields (
description,
name,
searcher_key,
type,
cloud_id
)
SELECT 
'{{ description }}',
'{{ name }}' /* required */,
'{{ searcher_key }}',
'{{ type }}' /* required */,
'{{ cloud_id }}'
RETURNING
id,
name,
clause_names,
custom,
key,
navigable,
orderable,
schema,
scope,
searchable
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: fields
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the fields resource.
    - name: description
      value: "{{ description }}"
      description: |
        The description of the custom field, which is displayed in Jira.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the custom field, which is displayed in Jira. This is not the unique identifier.
    - name: searcher_key
      value: "{{ searcher_key }}"
      description: |
        The searcher defines the way the field is searched in Jira. For example, *com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher*.
        The search UI (basic search and JQL search) will display different operations and values for the field, based on the field searcher. You must specify a searcher that is valid for the field type, as listed below (abbreviated values shown):
        *  \`cascadingselect\`: \`cascadingselectsearcher\`
        *  \`datepicker\`: \`daterange\`
        *  \`datetime\`: \`datetimerange\`
        *  \`float\`: \`exactnumber\` or \`numberrange\`
        *  \`grouppicker\`: \`grouppickersearcher\`
        *  \`importid\`: \`exactnumber\` or \`numberrange\`
        *  \`labels\`: \`labelsearcher\`
        *  \`multicheckboxes\`: \`multiselectsearcher\`
        *  \`multigrouppicker\`: \`multiselectsearcher\`
        *  \`multiselect\`: \`multiselectsearcher\`
        *  \`multiuserpicker\`: \`userpickergroupsearcher\`
        *  \`multiversion\`: \`versionsearcher\`
        *  \`project\`: \`projectsearcher\`
        *  \`radiobuttons\`: \`multiselectsearcher\`
        *  \`readonlyfield\`: \`textsearcher\`
        *  \`select\`: \`multiselectsearcher\`
        *  \`textarea\`: \`textsearcher\`
        *  \`textfield\`: \`textsearcher\`
        *  \`url\`: \`exacttextsearcher\`
        *  \`userpicker\`: \`userpickergroupsearcher\`
        *  \`version\`: \`versionsearcher\`
        If no searcher is provided, the field isn't searchable. However, [Forge custom fields](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-) have a searcher set automatically, so are always searchable.
      valid_values: ['com.atlassian.jira.plugin.system.customfieldtypes:cascadingselectsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:daterange', 'com.atlassian.jira.plugin.system.customfieldtypes:datetimerange', 'com.atlassian.jira.plugin.system.customfieldtypes:exactnumber', 'com.atlassian.jira.plugin.system.customfieldtypes:exacttextsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:labelsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:numberrange', 'com.atlassian.jira.plugin.system.customfieldtypes:projectsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:textsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:userpickergroupsearcher', 'com.atlassian.jira.plugin.system.customfieldtypes:versionsearcher']
    - name: type
      value: "{{ type }}"
      description: |
        The type of the custom field. These built-in custom field types are available:
        *  \`cascadingselect\`: Enables values to be selected from two levels of select lists (value: \`com.atlassian.jira.plugin.system.customfieldtypes:cascadingselect\`)
        *  \`datepicker\`: Stores a date using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:datepicker\`)
        *  \`datetime\`: Stores a date with a time component (value: \`com.atlassian.jira.plugin.system.customfieldtypes:datetime\`)
        *  \`float\`: Stores and validates a numeric (floating point) input (value: \`com.atlassian.jira.plugin.system.customfieldtypes:float\`)
        *  \`grouppicker\`: Stores a user group using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:grouppicker\`)
        *  \`importid\`: A read-only field that stores the ID the issue had in the system it was imported from (value: \`com.atlassian.jira.plugin.system.customfieldtypes:importid\`)
        *  \`labels\`: Stores labels (value: \`com.atlassian.jira.plugin.system.customfieldtypes:labels\`)
        *  \`multicheckboxes\`: Stores multiple values using checkboxes (value: \`\`)
        *  \`multigrouppicker\`: Stores multiple user groups using a picker control (value: \`\`)
        *  \`multiselect\`: Stores multiple values using a select list (value: \`com.atlassian.jira.plugin.system.customfieldtypes:multicheckboxes\`)
        *  \`multiuserpicker\`: Stores multiple users using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:multigrouppicker\`)
        *  \`multiversion\`: Stores multiple versions from the versions available in a project using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:multiversion\`)
        *  \`project\`: Stores a project from a list of projects that the user is permitted to view (value: \`com.atlassian.jira.plugin.system.customfieldtypes:project\`)
        *  \`radiobuttons\`: Stores a value using radio buttons (value: \`com.atlassian.jira.plugin.system.customfieldtypes:radiobuttons\`)
        *  \`readonlyfield\`: Stores a read-only text value, which can only be populated via the API (value: \`com.atlassian.jira.plugin.system.customfieldtypes:readonlyfield\`)
        *  \`select\`: Stores a value from a configurable list of options (value: \`com.atlassian.jira.plugin.system.customfieldtypes:select\`)
        *  \`textarea\`: Stores a long text string using a multiline text area (value: \`com.atlassian.jira.plugin.system.customfieldtypes:textarea\`)
        *  \`textfield\`: Stores a text string using a single-line text box (value: \`com.atlassian.jira.plugin.system.customfieldtypes:textfield\`)
        *  \`url\`: Stores a URL (value: \`com.atlassian.jira.plugin.system.customfieldtypes:url\`)
        *  \`userpicker\`: Stores a user using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:userpicker\`)
        *  \`version\`: Stores a version using a picker control (value: \`com.atlassian.jira.plugin.system.customfieldtypes:version\`)
        To create a field based on a [Forge custom field type](https://developer.atlassian.com/platform/forge/manifest-reference/modules/#jira-custom-field-type--beta-), use the ID of the Forge custom field type as the value. For example, \`ari:cloud:ecosystem::extension/e62f20a2-4b61-4dbe-bfb9-9a88b5e3ac84/548c5df1-24aa-4f7c-bbbb-3038d947cb05/static/my-cf-type-key\`.
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

Updates a custom field.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.fields.fields
SET 
description = '{{ description }}',
name = '{{ name }}',
searcher_key = '{{ searcher_key }}'
WHERE 
field_id = '{{ field_id }}' --required
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

Deletes a custom field. The custom field is deleted whether it is in the trash or not. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;This operation is &#91;asynchronous&#93;(#async). Follow the `location` link in the response to determine the status of the task and use &#91;Get task&#93;(#api-rest-api-3-task-taskId-get) to obtain subsequent updates.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.fields.fields
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_all"
    values={[
        { label: 'list_all', value: 'list_all' },
        { label: 'remove_associations', value: 'remove_associations' },
        { label: 'create_associations', value: 'create_associations' },
        { label: 'restore', value: 'restore' },
        { label: 'trash', value: 'trash' }
    ]}
>
<TabItem value="list_all">

Returns system and custom issue fields according to the following rules:&lt;br /&gt;&lt;br /&gt; *  Fields that cannot be added to the issue navigator are always returned.&lt;br /&gt; *  Fields that cannot be placed on an issue screen are always returned.&lt;br /&gt; *  Fields that depend on global Jira settings are only returned if the setting is enabled. That is, timetracking fields, subtasks, votes, and watches.&lt;br /&gt; *  Fields that are not associated to any used field configurations or screens are not returned.&lt;br /&gt; *  For all other fields, this operation only returns the fields that the user has permission to view (that is, the field is used in at least one project that the user has *Browse Projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.)&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
EXEC jira.fields.fields.list_all 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="remove_associations">

Unassociates a set of fields with a project and issue type context.&lt;br /&gt;&lt;br /&gt;Fields will be unassociated with all projects/issue types that share the same field configuration which the provided project and issue types are using. This means that while the field will be unassociated with the provided project and issue types, it will also be unassociated with any other projects and issue types that share the same field configuration.&lt;br /&gt;&lt;br /&gt;If a success response is returned it means that the field association has been removed in any applicable contexts where it was present.&lt;br /&gt;&lt;br /&gt;Up to 50 fields and up to 100 projects and issue types can be unassociated in a single request. If more fields or projects are provided a 400 response will be returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.fields.remove_associations 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"associationContexts": "{{ associationContexts }}", 
"fields": "{{ fields }}"
}'
;
```
</TabItem>
<TabItem value="create_associations">

Associates fields with projects.&lt;br /&gt;&lt;br /&gt;Fields will be associated with each issue type on the requested projects.&lt;br /&gt;&lt;br /&gt;Fields will be associated with all projects that share the same field configuration which the provided projects are using. This means that while the field will be associated with the requested projects, it will also be associated with any other projects that share the same field configuration.&lt;br /&gt;&lt;br /&gt;If a success response is returned it means that the field association has been created in any applicable contexts where it wasn't already present.&lt;br /&gt;&lt;br /&gt;Up to 50 fields and up to 100 projects can be associated in a single request. If more fields or projects are provided a 400 response will be returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.fields.create_associations 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"associationContexts": "{{ associationContexts }}", 
"fields": "{{ fields }}"
}'
;
```
</TabItem>
<TabItem value="restore">

Restores a custom field from trash. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.fields.restore 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="trash">

Moves a custom field to trash. See &#91;Edit or delete a custom field&#93;(https:​//confluence.atlassian.com/x/Z44fOw) for more information on trashing and deleting custom fields.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.fields.fields.trash 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
