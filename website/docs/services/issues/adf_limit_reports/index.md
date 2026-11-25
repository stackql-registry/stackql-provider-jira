--- 
title: adf_limit_reports
hide_title: false
hide_table_of_contents: false
keywords:
  - adf_limit_reports
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the adf_limit_reports resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>adf_limit_reports</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="adf_limit_reports" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.adf_limit_reports" /></td></tr>
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
    <td><CopyableCode code="entities_breaching_limit" /></td>
    <td><code>object</code></td>
    <td>For each field, the ids of the individual entities breaching the limit, grouped by the id or key of the issue they belong to. Fields that hold a single value, such as description and environment, map to an empty list because the issue itself identifies the breaching content (wire: entitiesBreachingLimit)</td>
</tr>
<tr>
    <td><CopyableCode code="issues_approaching_limit" /></td>
    <td><code>object</code></td>
    <td>A list of ids of issues approaching the limit and their field count (wire: issuesApproachingLimit)</td>
</tr>
<tr>
    <td><CopyableCode code="issues_breaching_limit" /></td>
    <td><code>object</code></td>
    <td>A list of ids of issues breaching the limit and their field count (wire: issuesBreachingLimit)</td>
</tr>
<tr>
    <td><CopyableCode code="limits" /></td>
    <td><code>object</code></td>
    <td>The fields and their defined limits</td>
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
    <td><a href="#parameter-is_returning_keys"><code>is_returning_keys</code></a>, <a href="#parameter-field_type"><code>field_type</code></a></td>
    <td>Returns all issues whose ADF (rich text) field data breaches the universal ADF size limit.&lt;br /&gt;&lt;br /&gt;Unlike the issue limit report, which reports issues breaching per-issue entity *count* limits, this endpoint reports issues whose ADF field *byte size* exceeds that limit. The reported ADF field types are `comment_adf`, `worklog_adf`, `customfield_adf`, `description_adf` and `environment_adf`. The reported value for each issue is the number of breaching entities for that field (always 1 for the single-value description and environment fields).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) is required for the project the issues are in. Results may be incomplete otherwise&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-field_type">
    <td><CopyableCode code="field_type" /></td>
    <td><code>array</code></td>
    <td>Restrict the report to the given ADF field types. Defaults to every ADF field type.  For sites with a high issue volume, consider requesting field types individually to avoid timeouts.  Usage: Add `?fieldType=comment_adf&fieldType=worklog_adf` to the end of the path to report on comments and worklogs only. (wire: fieldType)</td>
</tr>
<tr id="parameter-is_returning_keys">
    <td><CopyableCode code="is_returning_keys" /></td>
    <td><code>boolean</code></td>
    <td>Return issue keys instead of issue ids in the response.  Usage: Add `?isReturningKeys=true` to the end of the path to request issue keys. (wire: isReturningKeys)</td>
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

Returns all issues whose ADF (rich text) field data breaches the universal ADF size limit.&lt;br /&gt;&lt;br /&gt;Unlike the issue limit report, which reports issues breaching per-issue entity *count* limits, this endpoint reports issues whose ADF field *byte size* exceeds that limit. The reported ADF field types are `comment_adf`, `worklog_adf`, `customfield_adf`, `description_adf` and `environment_adf`. The reported value for each issue is the number of breaching entities for that field (always 1 for the single-value description and environment fields).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) is required for the project the issues are in. Results may be incomplete otherwise&lt;br /&gt; *  *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
entities_breaching_limit,
issues_approaching_limit,
issues_breaching_limit,
limits
FROM jira.issues.adf_limit_reports
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND is_returning_keys = '{{ is_returning_keys }}'
AND field_type = '{{ field_type }}'
;
```
</TabItem>
</Tabs>
