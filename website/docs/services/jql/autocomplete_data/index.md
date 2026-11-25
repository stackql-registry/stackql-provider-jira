--- 
title: autocomplete_data
hide_title: false
hide_table_of_contents: false
keywords:
  - autocomplete_data
  - jql
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the autocomplete_data resource in the jira jql service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>autocomplete_data</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="autocomplete_data" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.jql.autocomplete_data" /></td></tr>
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
    <td><CopyableCode code="jql_reserved_words" /></td>
    <td><code>array</code></td>
    <td>List of JQL query reserved words. (wire: jqlReservedWords)</td>
</tr>
<tr>
    <td><CopyableCode code="visible_field_names" /></td>
    <td><code>array</code></td>
    <td>List of fields usable in JQL queries. (wire: visibleFieldNames)</td>
</tr>
<tr>
    <td><CopyableCode code="visible_function_names" /></td>
    <td><code>array</code></td>
    <td>List of functions usable in JQL queries. (wire: visibleFunctionNames)</td>
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
    <td></td>
    <td>Returns reference data for JQL searches. This is a downloadable version of the documentation provided in &#91;Advanced searching - fields reference&#93;(https:​//confluence.atlassian.com/x/gwORLQ) and &#91;Advanced searching - functions reference&#93;(https:​//confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.&lt;br /&gt;&lt;br /&gt;To filter visible field details by project or collapse non-unique fields by field type then &#91;Get field reference data (POST)&#93;(#api-rest-api-3-jql-autocompletedata-post) can be used.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#get_filtered"><CopyableCode code="get_filtered" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns reference data for JQL searches. This is a downloadable version of the documentation provided in &#91;Advanced searching - fields reference&#93;(https:​//confluence.atlassian.com/x/gwORLQ) and &#91;Advanced searching - functions reference&#93;(https:​//confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.&lt;br /&gt;&lt;br /&gt;This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored. System fields are always returned.&lt;br /&gt;&lt;br /&gt;It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across all fields with the same name and of the same field type. For example, the collapsed field `Component - Component&#91;Dropdown&#93;` enables dropdown fields `Component - cf&#91;10061&#93;` and `Component - cf&#91;10062&#93;` to be searched simultaneously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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

Returns reference data for JQL searches. This is a downloadable version of the documentation provided in &#91;Advanced searching - fields reference&#93;(https:​//confluence.atlassian.com/x/gwORLQ) and &#91;Advanced searching - functions reference&#93;(https:​//confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.&lt;br /&gt;&lt;br /&gt;To filter visible field details by project or collapse non-unique fields by field type then &#91;Get field reference data (POST)&#93;(#api-rest-api-3-jql-autocompletedata-post) can be used.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
jql_reserved_words,
visible_field_names,
visible_function_names
FROM jira.jql.autocomplete_data
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="get_filtered"
    values={[
        { label: 'get_filtered', value: 'get_filtered' }
    ]}
>
<TabItem value="get_filtered">

Returns reference data for JQL searches. This is a downloadable version of the documentation provided in &#91;Advanced searching - fields reference&#93;(https:​//confluence.atlassian.com/x/gwORLQ) and &#91;Advanced searching - functions reference&#93;(https:​//confluence.atlassian.com/x/hgORLQ), along with a list of JQL-reserved words. Use this information to assist with the programmatic creation of JQL queries or the validation of queries built in a custom query builder.&lt;br /&gt;&lt;br /&gt;This operation can filter the custom fields returned by project. Invalid project IDs in `projectIds` are ignored. System fields are always returned.&lt;br /&gt;&lt;br /&gt;It can also return the collapsed field for custom fields. Collapsed fields enable searches to be performed across all fields with the same name and of the same field type. For example, the collapsed field `Component - Component&#91;Dropdown&#93;` enables dropdown fields `Component - cf&#91;10061&#93;` and `Component - cf&#91;10062&#93;` to be searched simultaneously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
EXEC jira.jql.autocomplete_data.get_filtered 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"includeCollapsedFields": {{ includeCollapsedFields }}, 
"projectIds": "{{ projectIds }}"
}'
;
```
</TabItem>
</Tabs>
