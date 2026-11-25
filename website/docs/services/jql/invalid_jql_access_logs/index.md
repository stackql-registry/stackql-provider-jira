--- 
title: invalid_jql_access_logs
hide_title: false
hide_table_of_contents: false
keywords:
  - invalid_jql_access_logs
  - jql
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the invalid_jql_access_logs resource in the jira jql service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>invalid_jql_access_logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="invalid_jql_access_logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.jql.invalid_jql_access_logs" /></td></tr>
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

Returned when the request is successful.

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
    <td><CopyableCode code="filter_id" /></td>
    <td><code>string</code></td>
    <td> (wire: filterId)</td>
</tr>
<tr>
    <td><CopyableCode code="caller" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string</code></td>
    <td> (wire: createdAt)</td>
</tr>
<tr>
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="request_url" /></td>
    <td><code>string</code></td>
    <td> (wire: requestUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="user" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="user_agent" /></td>
    <td><code>string</code></td>
    <td> (wire: userAgent)</td>
</tr>
<tr>
    <td><CopyableCode code="validation_message" /></td>
    <td><code>string</code></td>
    <td> (wire: validationMessage)</td>
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
    <td><a href="#parameter-user_account_id"><code>user_account_id</code></a>, <a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a></td>
    <td>Returns JQL searches that need updating because Jira can no longer support them. Use the entries to find affected saved filters and JQL used by apps, automations, scripts, or REST integrations.&lt;br /&gt;&lt;br /&gt;Entries are ordered by creation time, newest first, and retained for three days. Pass the `nextPageToken` returned in a previous response to retrieve the next page. Results may be restricted to a user by external account ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* global permission.</td>
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
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of entries to return, from 1 to 100 and defaulting to 50. (wire: maxResults)</td>
</tr>
<tr id="parameter-next_page_token">
    <td><CopyableCode code="next_page_token" /></td>
    <td><code>string</code></td>
    <td>The token returned by a previous response to retrieve the next page. (wire: nextPageToken)</td>
</tr>
<tr id="parameter-user_account_id">
    <td><CopyableCode code="user_account_id" /></td>
    <td><code>string</code></td>
    <td>The optional external account ID used to restrict the entries returned. (wire: userAccountId)</td>
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

Returns JQL searches that need updating because Jira can no longer support them. Use the entries to find affected saved filters and JQL used by apps, automations, scripts, or REST integrations.&lt;br /&gt;&lt;br /&gt;Entries are ordered by creation time, newest first, and retained for three days. Pass the `nextPageToken` returned in a previous response to retrieve the next page. Results may be restricted to a user by external account ID.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* global permission.

```sql
SELECT
filter_id,
caller,
created_at,
jql,
request_url,
user,
user_agent,
validation_message
FROM jira.jql.invalid_jql_access_logs
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND user_account_id = '{{ user_account_id }}'
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
;
```
</TabItem>
</Tabs>
