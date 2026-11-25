--- 
title: bulk_editable_fields
hide_title: false
hide_table_of_contents: false
keywords:
  - bulk_editable_fields
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the bulk_editable_fields resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>bulk_editable_fields</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="bulk_editable_fields" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.bulk_editable_fields" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The unique ID of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The display name of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>Description of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="field_options" /></td>
    <td><code>array</code></td>
    <td>A list of options related to the field, applicable in contexts where multiple selections are allowed. (wire: fieldOptions)</td>
</tr>
<tr>
    <td><CopyableCode code="is_required" /></td>
    <td><code>boolean</code></td>
    <td>Indicates whether the field is mandatory for the operation. (wire: isRequired)</td>
</tr>
<tr>
    <td><CopyableCode code="multi_select_field_options" /></td>
    <td><code>array</code></td>
    <td>Specifies supported actions (like add, replace, remove) on multi-select fields via an enum. (wire: multiSelectFieldOptions)</td>
</tr>
<tr>
    <td><CopyableCode code="search_url" /></td>
    <td><code>string</code></td>
    <td>A URL to fetch additional data for the field (wire: searchUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The type of the field.</td>
</tr>
<tr>
    <td><CopyableCode code="unavailable_message" /></td>
    <td><code>string</code></td>
    <td>A message indicating why the field is unavailable for editing. (wire: unavailableMessage)</td>
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
    <td><a href="#parameter-issue_ids_or_keys"><code>issue_ids_or_keys</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-search_text"><code>search_text</code></a>, <a href="#parameter-ending_before"><code>ending_before</code></a>, <a href="#parameter-starting_after"><code>starting_after</code></a></td>
    <td>Use this API to get a list of fields visible to the user to perform bulk edit operations. You can pass single or multiple issues in the query to get eligible editable fields. This API uses pagination to return responses, delivering 50 fields at a time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  Depending on the field, any field-specific permissions required to edit it.</td>
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
<tr id="parameter-issue_ids_or_keys">
    <td><CopyableCode code="issue_ids_or_keys" /></td>
    <td><code>string</code></td>
    <td>The IDs or keys of the issues to get editable fields from. (wire: issueIdsOrKeys)</td>
</tr>
<tr id="parameter-ending_before">
    <td><CopyableCode code="ending_before" /></td>
    <td><code>string</code></td>
    <td>(Optional)The end cursor for use in pagination. (wire: endingBefore)</td>
</tr>
<tr id="parameter-search_text">
    <td><CopyableCode code="search_text" /></td>
    <td><code>string</code></td>
    <td>(Optional)The text to search for in the editable fields. (wire: searchText)</td>
</tr>
<tr id="parameter-starting_after">
    <td><CopyableCode code="starting_after" /></td>
    <td><code>string</code></td>
    <td>(Optional)The start cursor for use in pagination. (wire: startingAfter)</td>
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

Use this API to get a list of fields visible to the user to perform bulk edit operations. You can pass single or multiple issues in the query to get eligible editable fields. This API uses pagination to return responses, delivering 50 fields at a time.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Global bulk change &#91;permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).&lt;br /&gt; *  Browse &#91;project permission&#93;(https:​//support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in all projects that contain the selected issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  Depending on the field, any field-specific permissions required to edit it.

```sql
SELECT
id,
name,
description,
field_options,
is_required,
multi_select_field_options,
search_url,
type,
unavailable_message
FROM jira.issues.bulk_editable_fields
WHERE issue_ids_or_keys = '{{ issue_ids_or_keys }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND search_text = '{{ search_text }}'
AND ending_before = '{{ ending_before }}'
AND starting_after = '{{ starting_after }}'
;
```
</TabItem>
</Tabs>
