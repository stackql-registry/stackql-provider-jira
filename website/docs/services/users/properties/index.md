--- 
title: properties
hide_title: false
hide_table_of_contents: false
keywords:
  - properties
  - users
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the properties resource in the jira users service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>properties</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="properties" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.users.properties" /></td></tr>
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
    <td><a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-user_key"><code>user_key</code></a>, <a href="#parameter-username"><code>username</code></a></td>
    <td>Returns the value of a user's property. If no property key is provided &#91;Get user property keys&#93;(#api-rest-api-3-user-properties-get) is called.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to get a property from any user.&lt;br /&gt; *  Access to Jira, to get a property from the calling user's record.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-user_key"><code>user_key</code></a>, <a href="#parameter-username"><code>username</code></a></td>
    <td>Returns the keys of all properties for a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to access the property keys on any user.&lt;br /&gt; *  Access to Jira, to access the calling user's property keys.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-user_key"><code>user_key</code></a>, <a href="#parameter-username"><code>username</code></a></td>
    <td>Sets the value of a user's property. Use this resource to store custom data against a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to set a property on any user.&lt;br /&gt; *  Access to Jira, to set a property on the calling user's record.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-property_key"><code>property_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-user_key"><code>user_key</code></a>, <a href="#parameter-username"><code>username</code></a></td>
    <td>Deletes a property from a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to delete a property from any user.&lt;br /&gt; *  Access to Jira, to delete a property from the calling user's record.</td>
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
<tr id="parameter-property_key">
    <td><CopyableCode code="property_key" /></td>
    <td><code>string</code></td>
    <td>The key of the user's property.</td>
</tr>
<tr id="parameter-account_id">
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. (wire: accountId)</td>
</tr>
<tr id="parameter-user_key">
    <td><CopyableCode code="user_key" /></td>
    <td><code>string</code></td>
    <td>This parameter is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. (wire: userKey)</td>
</tr>
<tr id="parameter-username">
    <td><CopyableCode code="username" /></td>
    <td><code>string</code></td>
    <td>This parameter is no longer available and will be removed from the documentation soon. See the &#91;deprecation notice&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details.</td>
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

Returns the value of a user's property. If no property key is provided &#91;Get user property keys&#93;(#api-rest-api-3-user-properties-get) is called.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to get a property from any user.&lt;br /&gt; *  Access to Jira, to get a property from the calling user's record.

```sql
SELECT
key,
value
FROM jira.users.properties
WHERE property_key = '{{ property_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND account_id = '{{ account_id }}'
AND user_key = '{{ user_key }}'
AND username = '{{ username }}'
;
```
</TabItem>
<TabItem value="list">

Returns the keys of all properties for a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to access the property keys on any user.&lt;br /&gt; *  Access to Jira, to access the calling user's property keys.

```sql
SELECT
key,
self
FROM jira.users.properties
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND account_id = '{{ account_id }}'
AND user_key = '{{ user_key }}'
AND username = '{{ username }}'
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

Sets the value of a user's property. Use this resource to store custom data against a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to set a property on any user.&lt;br /&gt; *  Access to Jira, to set a property on the calling user's record.

```sql
UPDATE jira.users.properties
SET 
-- No updatable properties
WHERE 
property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND account_id = '{{ account_id}}'
AND user_key = '{{ user_key}}'
AND username = '{{ username}}';
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

Deletes a property from a user.&lt;br /&gt;&lt;br /&gt;Note: This operation does not access the &#91;user properties&#93;(https:​//confluence.atlassian.com/x/8YxjL) created and maintained in Jira.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg), to delete a property from any user.&lt;br /&gt; *  Access to Jira, to delete a property from the calling user's record.

```sql
DELETE FROM jira.users.properties
WHERE property_key = '{{ property_key }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND account_id = '{{ account_id }}'
AND user_key = '{{ user_key }}'
AND username = '{{ username }}'
;
```
</TabItem>
</Tabs>
