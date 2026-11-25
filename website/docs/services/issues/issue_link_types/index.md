--- 
title: issue_link_types
hide_title: false
hide_table_of_contents: false
keywords:
  - issue_link_types
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issue_link_types resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issue_link_types</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issue_link_types" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.issue_link_types" /></td></tr>
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
    <td>The ID of the issue link type and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is read only.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue link type and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="inward" /></td>
    <td><code>string</code></td>
    <td>The description of the issue link type inward link and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="outward" /></td>
    <td><code>string</code></td>
    <td>The description of the issue link type outward link and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue link type. Read only.</td>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue link type and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `name` isn't provided. Otherwise, read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is read only.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the issue link type and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when `id` isn't provided. Otherwise, read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="inward" /></td>
    <td><code>string</code></td>
    <td>The description of the issue link type inward link and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="outward" /></td>
    <td><code>string</code></td>
    <td>The description of the issue link type outward link and is used as follows:   *  In the &#91; issueLink&#93;(#api-rest-api-3-issueLink-post) resource it is read only.  *  In the &#91; issueLinkType&#93;(#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue link type. Read only.</td>
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
    <td><a href="#parameter-issue_link_type_id"><code>issue_link_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for a project in the site.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a list of all issue link types.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for a project in the site.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue link type consists of a name and descriptions for a link's inward and outward relationships.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_link_type_id"><code>issue_link_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Updates an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_link_type_id"><code>issue_link_type_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-issue_link_type_id">
    <td><CopyableCode code="issue_link_type_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue link type. (wire: issueLinkTypeId)</td>
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

Returns an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for a project in the site.

```sql
SELECT
id,
name,
inward,
outward,
self
FROM jira.issues.issue_link_types
WHERE issue_link_type_id = '{{ issue_link_type_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns a list of all issue link types.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for a project in the site.

```sql
SELECT
id,
name,
inward,
outward,
self
FROM jira.issues.issue_link_types
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The issue link type consists of a name and descriptions for a link's inward and outward relationships.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
INSERT INTO jira.issues.issue_link_types (
id,
inward,
name,
outward,
cloud_id
)
SELECT 
'{{ id }}',
'{{ inward }}',
'{{ name }}',
'{{ outward }}',
'{{ cloud_id }}'
RETURNING
id,
name,
inward,
outward,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: issue_link_types
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the issue_link_types resource.
    - name: id
      value: "{{ id }}"
      description: |
        The ID of the issue link type and is used as follows:
        *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when \`name\` isn't provided. Otherwise, read only.
        *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is read only.
    - name: inward
      value: "{{ inward }}"
      description: |
        The description of the issue link type inward link and is used as follows:
        *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.
        *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the issue link type and is used as follows:
        *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is the type of issue link. Required on create when \`id\` isn't provided. Otherwise, read only.
        *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.
    - name: outward
      value: "{{ outward }}"
      description: |
        The description of the issue link type outward link and is used as follows:
        *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it is read only.
        *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it is required on create and optional on update. Otherwise, read only.
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

Updates an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.issues.issue_link_types
SET 
id = '{{ id }}',
inward = '{{ inward }}',
name = '{{ name }}',
outward = '{{ outward }}'
WHERE 
issue_link_type_id = '{{ issue_link_type_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
inward,
outward,
self;
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

Deletes an issue link type.&lt;br /&gt;&lt;br /&gt;To use this operation, the site must have &#91;issue linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.issues.issue_link_types
WHERE issue_link_type_id = '{{ issue_link_type_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
