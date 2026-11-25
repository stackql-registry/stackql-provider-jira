--- 
title: issue_properties
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_properties
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_properties resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_properties</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_properties" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.issue_properties" /></td></tr>
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
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the property. Required on create and update.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code></code></td>
    <td>The value of the property. Required on create and update.</td>
</tr>
</tbody>
</table>
</TabItem>
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
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the property.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the property.</td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the key and value of an issue's property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the URLs and keys of an issue's properties.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Property details are only returned where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-value"><code>value</code></a></td>
    <td></td>
    <td>Sets the value of an issue's property. Use this resource to store custom data against an issue.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes an issue's property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
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
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The key or ID of the issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-property_key">
    <td><CopyableCode code="property_key" /></td>
    <td><code>string</code></td>
    <td>The key of the property. (wire: propertyKey)</td>
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

Returns the key and value of an issue's property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
key,
value
FROM jira.issues.issue_properties
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND property_key = '{{ property_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns the URLs and keys of an issue's properties.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Property details are only returned where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
key,
self
FROM jira.issues.issue_properties
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
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

Sets the value of an issue's property. Use this resource to store custom data against an issue.&lt;br /&gt;&lt;br /&gt;The value of the request body must be a &#91;valid&#93;(http:​//tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
UPDATE jira.issues.issue_properties
SET 
value = '{{ value }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND value = '{{ value }}' --required;
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

Deletes an issue's property.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Edit issues* &#91;project permissions&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the issue.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
DELETE FROM jira.issues.issue_properties
WHERE issue_id_or_key = '{{ issue_id_or_key }}' --required
AND property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
