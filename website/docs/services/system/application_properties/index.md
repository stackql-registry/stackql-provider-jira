--- 
title: application_properties
hide_title: false
hide_table_of_contents: false
keywords:
  - application_properties
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the application_properties resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>application_properties</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="application_properties" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.application_properties" /></td></tr>
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

Details of an application property.

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
    <td>The ID of the application property. The ID and key are the same.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the application property.</td>
</tr>
<tr>
    <td><CopyableCode code="allowed_values" /></td>
    <td><code>array</code></td>
    <td>The allowed values, if applicable. (wire: allowedValues)</td>
</tr>
<tr>
    <td><CopyableCode code="default_value" /></td>
    <td><code>string</code></td>
    <td>The default value of the application property. (wire: defaultValue)</td>
</tr>
<tr>
    <td><CopyableCode code="desc" /></td>
    <td><code>string</code></td>
    <td>The description of the application property.</td>
</tr>
<tr>
    <td><CopyableCode code="example" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the application property. The ID and key are the same.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>The data type of the application property.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>The new value.</td>
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
    <td><a href="#parameter-key"><code>key</code></a>, <a href="#parameter-permission_level"><code>permission_level</code></a>, <a href="#parameter-key_filter"><code>key_filter</code></a></td>
    <td>Returns all application properties or an application property.&lt;br /&gt;&lt;br /&gt;If you specify a value for the `key` parameter, then an application property is returned as an object (not in an array). Otherwise, an array of all editable application properties is returned. See &#91;Set application property&#93;(#api-rest-api-3-application-properties-id-put) for descriptions of editable properties.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Changes the value of an application property. For example, you can change the value of the `jira.clone.prefix` from its default value of *CLONE -* to *Clone -* if you prefer sentence case capitalization. Editable properties are described below along with their default values.&lt;br /&gt;&lt;br /&gt;#### Advanced settings ####&lt;br /&gt;&lt;br /&gt;The advanced settings below are also accessible in &#91;Jira&#93;(https:​//confluence.atlassian.com/x/vYXKM).&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.clone.prefix` | The string of text prefixed to the title of a cloned issue. | `CLONE -` |  &lt;br /&gt;| `jira.date.picker.java.format` | The date format for the Java (server-side) generated dates. This must be the same as the `jira.date.picker.javascript.format` format setting. | `d/MMM/yy` |  &lt;br /&gt;| `jira.date.picker.javascript.format` | The date format for the JavaScript (client-side) generated dates. This must be the same as the `jira.date.picker.java.format` format setting. | `%e/%b/%y` |  &lt;br /&gt;| `jira.date.time.picker.java.format` | The date format for the Java (server-side) generated date times. This must be the same as the `jira.date.time.picker.javascript.format` format setting. | `dd/MMM/yy h:mm a` |  &lt;br /&gt;| `jira.date.time.picker.javascript.format` | The date format for the JavaScript (client-side) generated date times. This must be the same as the `jira.date.time.picker.java.format` format setting. | `%e/%b/%y %I:%M %p` |  &lt;br /&gt;| `jira.issue.actions.order` | The default order of actions (such as *Comments* or *Change history*) displayed on the issue view. | `asc` |  &lt;br /&gt;| `jira.view.issue.links.sort.order` | The sort order of the list of issue links on the issue view. | `type, status, priority` |  &lt;br /&gt;| `jira.comment.collapsing.minimum.hidden` | The minimum number of comments required for comment collapsing to occur. A value of `0` disables comment collapsing. | `4` |  &lt;br /&gt;| `jira.newsletter.tip.delay.days` | The number of days before a prompt to sign up to the Jira Insiders newsletter is shown. A value of `-1` disables this feature. | `7` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;#### Look and feel ####&lt;br /&gt;&lt;br /&gt;The settings listed below adjust the &#91;look and feel&#93;(https:​//confluence.atlassian.com/x/VwCLLg).&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.lf.date.time` | The &#91; time format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `h:mm a` |  &lt;br /&gt;| `jira.lf.date.day` | The &#91; day format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `EEEE h:mm a` |  &lt;br /&gt;| `jira.lf.date.complete` | The &#91; date and time format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `dd/MMM/yy h:mm a` |  &lt;br /&gt;| `jira.lf.date.dmy` | The &#91; date format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `dd/MMM/yy` |  &lt;br /&gt;| `jira.date.time.picker.use.iso8061` | When enabled, sets Monday as the first day of the week in the date picker, as specified by the ISO8601 standard. | `false` |  &lt;br /&gt;| `jira.lf.logo.url` | The URL of the logo image file. | `/images/icon-jira-logo.png` |  &lt;br /&gt;| `jira.lf.logo.show.application.title` | Controls the visibility of the application title on the sidebar. | `false` |  &lt;br /&gt;| `jira.lf.favicon.url` | The URL of the favicon. | `/favicon.ico` |  &lt;br /&gt;| `jira.lf.favicon.hires.url` | The URL of the high-resolution favicon. | `/images/64jira.png` |  &lt;br /&gt;| `jira.lf.navigation.bgcolour` | The background color of the sidebar. | `#0747A6` |  &lt;br /&gt;| `jira.lf.navigation.highlightcolour` | The color of the text and logo of the sidebar. | `#DEEBFF` |  &lt;br /&gt;| `jira.lf.hero.button.base.bg.colour` | The background color of the hero button. | `#3b7fc4` |  &lt;br /&gt;| `jira.title` | The text for the application title. The application title can also be set in *General settings*. | `Jira` |  &lt;br /&gt;| `jira.option.globalsharing` | Whether filters and dashboards can be shared with anyone signed into Jira. | `true` |  &lt;br /&gt;| `xflow.product.suggestions.enabled` | Whether to expose product suggestions for other Atlassian products within Jira. | `true` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;#### Other settings ####&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.issuenav.criteria.autoupdate` | Whether instant updates to search criteria is active. | `true` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;*Note: Be careful when changing &#91;application properties and advanced settings&#93;(https:​//confluence.atlassian.com/x/vYXKM).*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td>The key of the application property to update.</td>
</tr>
<tr id="parameter-key">
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the application property.</td>
</tr>
<tr id="parameter-key_filter">
    <td><CopyableCode code="key_filter" /></td>
    <td><code>string</code></td>
    <td>When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*. (wire: keyFilter)</td>
</tr>
<tr id="parameter-permission_level">
    <td><CopyableCode code="permission_level" /></td>
    <td><code>string</code></td>
    <td>The permission level of all items being returned in the list. (wire: permissionLevel)</td>
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

Returns all application properties or an application property.&lt;br /&gt;&lt;br /&gt;If you specify a value for the `key` parameter, then an application property is returned as an object (not in an array). Otherwise, an array of all editable application properties is returned. See &#91;Set application property&#93;(#api-rest-api-3-application-properties-id-put) for descriptions of editable properties.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
SELECT
id,
name,
allowed_values,
default_value,
desc,
example,
key,
type,
value
FROM jira.system.application_properties
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND key = '{{ key }}'
AND permission_level = '{{ permission_level }}'
AND key_filter = '{{ key_filter }}'
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

Changes the value of an application property. For example, you can change the value of the `jira.clone.prefix` from its default value of *CLONE -* to *Clone -* if you prefer sentence case capitalization. Editable properties are described below along with their default values.&lt;br /&gt;&lt;br /&gt;#### Advanced settings ####&lt;br /&gt;&lt;br /&gt;The advanced settings below are also accessible in &#91;Jira&#93;(https:​//confluence.atlassian.com/x/vYXKM).&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.clone.prefix` | The string of text prefixed to the title of a cloned issue. | `CLONE -` |  &lt;br /&gt;| `jira.date.picker.java.format` | The date format for the Java (server-side) generated dates. This must be the same as the `jira.date.picker.javascript.format` format setting. | `d/MMM/yy` |  &lt;br /&gt;| `jira.date.picker.javascript.format` | The date format for the JavaScript (client-side) generated dates. This must be the same as the `jira.date.picker.java.format` format setting. | `%e/%b/%y` |  &lt;br /&gt;| `jira.date.time.picker.java.format` | The date format for the Java (server-side) generated date times. This must be the same as the `jira.date.time.picker.javascript.format` format setting. | `dd/MMM/yy h:mm a` |  &lt;br /&gt;| `jira.date.time.picker.javascript.format` | The date format for the JavaScript (client-side) generated date times. This must be the same as the `jira.date.time.picker.java.format` format setting. | `%e/%b/%y %I:%M %p` |  &lt;br /&gt;| `jira.issue.actions.order` | The default order of actions (such as *Comments* or *Change history*) displayed on the issue view. | `asc` |  &lt;br /&gt;| `jira.view.issue.links.sort.order` | The sort order of the list of issue links on the issue view. | `type, status, priority` |  &lt;br /&gt;| `jira.comment.collapsing.minimum.hidden` | The minimum number of comments required for comment collapsing to occur. A value of `0` disables comment collapsing. | `4` |  &lt;br /&gt;| `jira.newsletter.tip.delay.days` | The number of days before a prompt to sign up to the Jira Insiders newsletter is shown. A value of `-1` disables this feature. | `7` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;#### Look and feel ####&lt;br /&gt;&lt;br /&gt;The settings listed below adjust the &#91;look and feel&#93;(https:​//confluence.atlassian.com/x/VwCLLg).&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.lf.date.time` | The &#91; time format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `h:mm a` |  &lt;br /&gt;| `jira.lf.date.day` | The &#91; day format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `EEEE h:mm a` |  &lt;br /&gt;| `jira.lf.date.complete` | The &#91; date and time format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `dd/MMM/yy h:mm a` |  &lt;br /&gt;| `jira.lf.date.dmy` | The &#91; date format&#93;(https:​//docs.oracle.com/javase/6/docs/api/index.html?java/text/SimpleDateFormat.html). | `dd/MMM/yy` |  &lt;br /&gt;| `jira.date.time.picker.use.iso8061` | When enabled, sets Monday as the first day of the week in the date picker, as specified by the ISO8601 standard. | `false` |  &lt;br /&gt;| `jira.lf.logo.url` | The URL of the logo image file. | `/images/icon-jira-logo.png` |  &lt;br /&gt;| `jira.lf.logo.show.application.title` | Controls the visibility of the application title on the sidebar. | `false` |  &lt;br /&gt;| `jira.lf.favicon.url` | The URL of the favicon. | `/favicon.ico` |  &lt;br /&gt;| `jira.lf.favicon.hires.url` | The URL of the high-resolution favicon. | `/images/64jira.png` |  &lt;br /&gt;| `jira.lf.navigation.bgcolour` | The background color of the sidebar. | `#0747A6` |  &lt;br /&gt;| `jira.lf.navigation.highlightcolour` | The color of the text and logo of the sidebar. | `#DEEBFF` |  &lt;br /&gt;| `jira.lf.hero.button.base.bg.colour` | The background color of the hero button. | `#3b7fc4` |  &lt;br /&gt;| `jira.title` | The text for the application title. The application title can also be set in *General settings*. | `Jira` |  &lt;br /&gt;| `jira.option.globalsharing` | Whether filters and dashboards can be shared with anyone signed into Jira. | `true` |  &lt;br /&gt;| `xflow.product.suggestions.enabled` | Whether to expose product suggestions for other Atlassian products within Jira. | `true` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;#### Other settings ####&lt;br /&gt;&lt;br /&gt;| Key | Description | Default value |  &lt;br /&gt;| -- | -- | -- |  &lt;br /&gt;| `jira.issuenav.criteria.autoupdate` | Whether instant updates to search criteria is active. | `true` |  &lt;br /&gt;&lt;br /&gt;&lt;br /&gt;*Note: Be careful when changing &#91;application properties and advanced settings&#93;(https:​//confluence.atlassian.com/x/vYXKM).*&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
UPDATE jira.system.application_properties
SET 
id = '{{ id }}',
value = '{{ value }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
RETURNING
id,
name,
allowed_values,
default_value,
desc,
example,
key,
type,
value;
```
</TabItem>
</Tabs>
