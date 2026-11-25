--- 
title: issue_security_levels
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_security_levels
  - permissions
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_security_levels resource in the jira permissions service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_security_levels</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_security_levels" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.permissions.issue_security_levels" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_security_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue level security scheme. (wire: issueSecuritySchemeId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether the issue level security item is the default. (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue level security item.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of an issue level security item.

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
    <td>The ID of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="issue_security_scheme_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue level security scheme. (wire: issueSecuritySchemeId)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the issue level security item.</td>
</tr>
<tr>
    <td><CopyableCode code="is_default" /></td>
    <td><code>boolean</code></td>
    <td>Whether the issue level security item is the default. (wire: isDefault)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the issue level security item.</td>
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
    <td>Returns details of an issue security level.&lt;br /&gt;&lt;br /&gt;Use &#91;Get issue security scheme&#93;(#api-rest-api-3-issuesecurityschemes-id-get) to obtain the IDs of issue security levels associated with the issue security scheme.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-scheme_id"><code>scheme_id</code></a>, <a href="#parameter-only_default"><code>only_default</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of issue security levels.&lt;br /&gt;&lt;br /&gt;Only issue security levels in the context of classic projects are returned.&lt;br /&gt;&lt;br /&gt;Filtering using IDs is inclusive: if you specify both security scheme IDs and level IDs, the result will include both specified issue security levels and all issue security levels from the specified schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#set_default"><CopyableCode code="set_default" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-defaultValues"><code>defaultValues</code></a></td>
    <td></td>
    <td>Sets default issue security levels for schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The ID of the issue security level.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of issue security scheme level IDs. To include multiple issue security levels, separate IDs with an ampersand: `id=10000&id=10001`.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>string</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-only_default">
    <td><CopyableCode code="only_default" /></td>
    <td><code>boolean</code></td>
    <td>When set to true, returns multiple default levels for each security scheme containing a default. If you provide scheme and level IDs not associated with the default, returns an empty page. The default value is false. (wire: onlyDefault)</td>
</tr>
<tr id="parameter-scheme_id">
    <td><CopyableCode code="scheme_id" /></td>
    <td><code>array</code></td>
    <td>The list of issue security scheme IDs. To include multiple issue security schemes, separate IDs with an ampersand: `schemeId=10000&schemeId=10001`. (wire: schemeId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>string</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns details of an issue security level.&lt;br /&gt;&lt;br /&gt;Use &#91;Get issue security scheme&#93;(#api-rest-api-3-issuesecurityschemes-id-get) to obtain the IDs of issue security levels associated with the issue security scheme.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
id,
name,
issue_security_scheme_id,
description,
is_default,
self
FROM jira.permissions.issue_security_levels
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of issue security levels.&lt;br /&gt;&lt;br /&gt;Only issue security levels in the context of classic projects are returned.&lt;br /&gt;&lt;br /&gt;Filtering using IDs is inclusive: if you specify both security scheme IDs and level IDs, the result will include both specified issue security levels and all issue security levels from the specified schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
issue_security_scheme_id,
description,
is_default,
self
FROM jira.permissions.issue_security_levels
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND id = '{{ id }}'
AND scheme_id = '{{ scheme_id }}'
AND only_default = '{{ only_default }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="set_default"
    values={[
        { label: 'set_default', value: 'set_default' }
    ]}
>
<TabItem value="set_default">

Sets default issue security levels for schemes.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.permissions.issue_security_levels.set_default 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"defaultValues": "{{ defaultValues }}"
}'
;
```
</TabItem>
</Tabs>
