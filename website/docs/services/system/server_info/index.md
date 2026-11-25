--- 
title: server_info
hide_title: false
hide_table_of_contents: false
keywords:
  - server_info
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the server_info resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>server_info</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="server_info" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.server_info" /></td></tr>
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
    <td><CopyableCode code="base_url" /></td>
    <td><code>string</code></td>
    <td>The base URL of the Jira instance. (wire: baseUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="build_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The timestamp when the Jira version was built. (wire: buildDate)</td>
</tr>
<tr>
    <td><CopyableCode code="build_number" /></td>
    <td><code>integer (int32)</code></td>
    <td>The build number of the Jira version. (wire: buildNumber)</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_type" /></td>
    <td><code>string</code></td>
    <td>The type of server deployment. This is always returned as *Cloud*. (wire: deploymentType)</td>
</tr>
<tr>
    <td><CopyableCode code="display_url" /></td>
    <td><code>string</code></td>
    <td>The display URL of the Jira instance. (wire: displayUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="display_url_confluence" /></td>
    <td><code>string</code></td>
    <td>The display URL of Confluence. (wire: displayUrlConfluence)</td>
</tr>
<tr>
    <td><CopyableCode code="display_url_servicedesk_help_center" /></td>
    <td><code>string</code></td>
    <td>The display URL of the Servicedesk Help Center. (wire: displayUrlServicedeskHelpCenter)</td>
</tr>
<tr>
    <td><CopyableCode code="health_checks" /></td>
    <td><code>array</code></td>
    <td>Jira instance health check results. Deprecated and no longer returned. (wire: healthChecks)</td>
</tr>
<tr>
    <td><CopyableCode code="scm_info" /></td>
    <td><code>string</code></td>
    <td>The unique identifier of the Jira version. (wire: scmInfo)</td>
</tr>
<tr>
    <td><CopyableCode code="server_time" /></td>
    <td><code>string (date-time)</code></td>
    <td>The time in Jira when this request was responded to. (wire: serverTime)</td>
</tr>
<tr>
    <td><CopyableCode code="server_time_zone" /></td>
    <td><code>string</code></td>
    <td>The default timezone of the Jira server. In a format known as Olson Time Zones, IANA Time Zones or TZ Database Time Zones. (wire: serverTimeZone)</td>
</tr>
<tr>
    <td><CopyableCode code="server_title" /></td>
    <td><code>string</code></td>
    <td>The name of the Jira instance. (wire: serverTitle)</td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>string</code></td>
    <td>The version of Jira.</td>
</tr>
<tr>
    <td><CopyableCode code="version_numbers" /></td>
    <td><code>array</code></td>
    <td>The major, minor, and revision version numbers of the Jira version. (wire: versionNumbers)</td>
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
    <td>Returns information about the Jira instance.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
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

Returns information about the Jira instance.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
SELECT
base_url,
build_date,
build_number,
deployment_type,
display_url,
display_url_confluence,
display_url_servicedesk_help_center,
health_checks,
scm_info,
server_time,
server_time_zone,
server_title,
version,
version_numbers
FROM jira.system.server_info
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
