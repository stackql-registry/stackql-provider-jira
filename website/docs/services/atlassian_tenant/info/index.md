--- 
title: info
hide_title: false
hide_table_of_contents: false
keywords:
  - info
  - atlassian_tenant
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the info resource in the jira atlassian_tenant service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>info</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="info" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.atlassian_tenant.info" /></td></tr>
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

Returned if the site exists.

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
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the site. (example: 1b5c9234-a0db-4a03-b735-6b3a3ed66889) (wire: cloudId)</td>
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
    <td><a href="#parameter-site"><code>site</code></a></td>
    <td></td>
    <td>Returns the cloud ID of the Jira Cloud site addressed by the site server variable (the subdomain of https:​//&lt;site&gt;.atlassian.net). The endpoint is public: it needs no credentials. The cloud ID is the value ATLASSIAN_CLOUD_ID (the cloud_id server variable of every other jira service) takes.</td>
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
<tr id="parameter-site">
    <td><CopyableCode code="site" /></td>
    <td><code>string</code></td>
    <td>The site subdomain, e.g. acme for https:​//acme.atlassian.net. (default: your-domain)</td>
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

Returns the cloud ID of the Jira Cloud site addressed by the site server variable (the subdomain of https://&lt;site&gt;.atlassian.net). The endpoint is public: it needs no credentials. The cloud ID is the value ATLASSIAN_CLOUD_ID (the cloud_id server variable of every other jira service) takes.

```sql
SELECT
cloud_id
FROM jira.atlassian_tenant.info
WHERE site = '{{ site }}' -- required
;
```
</TabItem>
</Tabs>
