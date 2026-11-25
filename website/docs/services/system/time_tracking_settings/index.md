--- 
title: time_tracking_settings
hide_title: false
hide_table_of_contents: false
keywords:
  - time_tracking_settings
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the time_tracking_settings resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>time_tracking_settings</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="time_tracking_settings" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.time_tracking_settings" /></td></tr>
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
    <td><CopyableCode code="default_unit" /></td>
    <td><code>string</code></td>
    <td>The default unit of time applied to logged time. (minute, hour, day, week) (wire: defaultUnit)</td>
</tr>
<tr>
    <td><CopyableCode code="time_format" /></td>
    <td><code>string</code></td>
    <td>The format that will appear on an issue's *Time Spent* field. (pretty, days, hours) (wire: timeFormat)</td>
</tr>
<tr>
    <td><CopyableCode code="working_days_per_week" /></td>
    <td><code>number (double)</code></td>
    <td>The number of days in a working week. (wire: workingDaysPerWeek)</td>
</tr>
<tr>
    <td><CopyableCode code="working_hours_per_day" /></td>
    <td><code>number (double)</code></td>
    <td>The number of hours in a working day. (wire: workingHoursPerDay)</td>
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
    <td>Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-default_unit"><code>default_unit</code></a>, <a href="#parameter-time_format"><code>time_format</code></a>, <a href="#parameter-working_days_per_week"><code>working_days_per_week</code></a>, <a href="#parameter-working_hours_per_day"><code>working_hours_per_day</code></a></td>
    <td></td>
    <td>Sets the time tracking settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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

Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see &#91;Configuring time tracking&#93;(https:​//confluence.atlassian.com/x/qoXKM).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
default_unit,
time_format,
working_days_per_week,
working_hours_per_day
FROM jira.system.time_tracking_settings
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Sets the time tracking settings.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.system.time_tracking_settings
SET 
default_unit = '{{ default_unit }}',
time_format = '{{ time_format }}',
working_days_per_week = {{ working_days_per_week }},
working_hours_per_day = {{ working_hours_per_day }}
WHERE 
cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND default_unit = '{{ default_unit }}' --required
AND time_format = '{{ time_format }}' --required
AND working_days_per_week = '{{ working_days_per_week }}' --required
AND working_hours_per_day = '{{ working_hours_per_day }}' --required
RETURNING
default_unit,
time_format,
working_days_per_week,
working_hours_per_day;
```
</TabItem>
</Tabs>
