--- 
title: autocomplete_suggestions
hide_title: false
hide_table_of_contents: false
keywords:
  - autocomplete_suggestions
  - jql
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the autocomplete_suggestions resource in the jira jql service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>autocomplete_suggestions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="autocomplete_suggestions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.jql.autocomplete_suggestions" /></td></tr>
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
    <td><CopyableCode code="display_name" /></td>
    <td><code>string</code></td>
    <td>The display name of a suggested item. If `fieldValue` or `predicateValue` are provided, the matching text is highlighted with the HTML bold tag. (wire: displayName)</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The value of a suggested item.</td>
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
    <td><a href="#parameter-field_name"><code>field_name</code></a>, <a href="#parameter-field_value"><code>field_value</code></a>, <a href="#parameter-predicate_name"><code>predicate_name</code></a>, <a href="#parameter-predicate_value"><code>predicate_value</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns the JQL search auto complete suggestions for a field.&lt;br /&gt;&lt;br /&gt;Suggestions can be obtained by providing:&lt;br /&gt;&lt;br /&gt; *  `fieldName` to get a list of all values for the field.&lt;br /&gt; *  `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.&lt;br /&gt; *  `fieldName` and `predicateName` to get a list of all predicate values for the field.&lt;br /&gt; *  `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in `predicateValue`.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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
<tr id="parameter-field_name">
    <td><CopyableCode code="field_name" /></td>
    <td><code>string</code></td>
    <td>The name of the field. (wire: fieldName)</td>
</tr>
<tr id="parameter-field_value">
    <td><CopyableCode code="field_value" /></td>
    <td><code>string</code></td>
    <td>The partial field item name entered by the user. (wire: fieldValue)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>EXPERIMENTAL. A hint for the maximum number of suggestions to return for each of the field and predicate values. The value is capped at 50 and may be ignored, in which case the default of 15 is used. It is subject to change and may be removed without notice. (wire: maxResults)</td>
</tr>
<tr id="parameter-predicate_name">
    <td><CopyableCode code="predicate_name" /></td>
    <td><code>string</code></td>
    <td>The name of the &#91; CHANGED operator predicate&#93;(https:​//confluence.atlassian.com/x/hQORLQ#Advancedsearching-operatorsreference-CHANGEDCHANGED) for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*. (wire: predicateName)</td>
</tr>
<tr id="parameter-predicate_value">
    <td><CopyableCode code="predicate_value" /></td>
    <td><code>string</code></td>
    <td>The partial predicate item name entered by the user. (wire: predicateValue)</td>
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

Returns the JQL search auto complete suggestions for a field.&lt;br /&gt;&lt;br /&gt;Suggestions can be obtained by providing:&lt;br /&gt;&lt;br /&gt; *  `fieldName` to get a list of all values for the field.&lt;br /&gt; *  `fieldName` and `fieldValue` to get a list of values containing the text in `fieldValue`.&lt;br /&gt; *  `fieldName` and `predicateName` to get a list of all predicate values for the field.&lt;br /&gt; *  `fieldName`, `predicateName`, and `predicateValue` to get a list of predicate values containing the text in `predicateValue`.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
display_name,
value
FROM jira.jql.autocomplete_suggestions
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND field_name = '{{ field_name }}'
AND field_value = '{{ field_value }}'
AND predicate_name = '{{ predicate_name }}'
AND predicate_value = '{{ predicate_value }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
