--- 
title: my_filters
hide_title: false
hide_table_of_contents: false
keywords:
  - my_filters
  - filters
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the my_filters resource in the jira filters service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>my_filters</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="my_filters" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.filters.my_filters" /></td></tr>
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

Details about a filter.

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
    <td>The unique identifier for the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>The name of the filter. Must be unique.</td>
</tr>
<tr>
    <td><CopyableCode code="approximate_last_used" /></td>
    <td><code>string (date-time)</code></td>
    <td>\&#91;Experimental\&#93; Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate. (wire: approximateLastUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>A description of the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="edit_permissions" /></td>
    <td><code>array</code></td>
    <td>The groups and projects that can edit the filter. (wire: editPermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the filter is selected as a favorite.</td>
</tr>
<tr>
    <td><CopyableCode code="favourited_count" /></td>
    <td><code>integer (int64)</code></td>
    <td>The count of how many users have selected this filter as a favorite, including the filter owner. (wire: favouritedCount)</td>
</tr>
<tr>
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td>The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*.</td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>object</code></td>
    <td>The user who owns the filter. This is defaulted to the creator of the filter, however Jira administrators can change the owner of a shared filter in the admin settings.</td>
</tr>
<tr>
    <td><CopyableCode code="search_url" /></td>
    <td><code>string (uri)</code></td>
    <td>A URL to view the filter results in Jira, using the &#91;Search for issues using JQL&#93;(#api-rest-api-3-filter-search-get) operation with the filter's JQL string to return the filter results. For example, *https:​//your-domain.atlassian.net/rest/api/3/search?jql=project+%3D+SSP+AND+issuetype+%3D+Bug*. (wire: searchUrl)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="share_permissions" /></td>
    <td><code>array</code></td>
    <td>The groups and projects that the filter is shared with. (wire: sharePermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="shared_users" /></td>
    <td><code>object</code></td>
    <td>A paginated list of the users that the filter is shared with. This includes users that are members of the groups or can browse the projects that the filter is shared with. (wire: sharedUsers)</td>
</tr>
<tr>
    <td><CopyableCode code="subscriptions" /></td>
    <td><code>object</code></td>
    <td>A paginated list of the users that are subscribed to the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="view_url" /></td>
    <td><code>string (uri)</code></td>
    <td>A URL to view the filter results in Jira, using the ID of the filter. For example, *https:​//your-domain.atlassian.net/issues/?filter=10100*. (wire: viewUrl)</td>
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
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-include_favourites"><code>include_favourites</code></a></td>
    <td>Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:&lt;br /&gt;&lt;br /&gt; *  owned by the user.&lt;br /&gt; *  shared with a group that the user is a member of.&lt;br /&gt; *  shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  shared with a public project.&lt;br /&gt; *  shared with the public.&lt;br /&gt;&lt;br /&gt;For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation.</td>
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
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `&#91;start-index:end-index&#93;` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers&#91;1001:2000&#93;`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `&#91;start-index:end-index&#93;` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions&#91;1001:2000&#93;`.</td>
</tr>
<tr id="parameter-include_favourites">
    <td><CopyableCode code="include_favourites" /></td>
    <td><code>boolean</code></td>
    <td>Include the user's favorite filters in the response. (wire: includeFavourites)</td>
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

Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:&lt;br /&gt;&lt;br /&gt; *  owned by the user.&lt;br /&gt; *  shared with a group that the user is a member of.&lt;br /&gt; *  shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  shared with a public project.&lt;br /&gt; *  shared with the public.&lt;br /&gt;&lt;br /&gt;For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation.

```sql
SELECT
id,
name,
approximate_last_used,
description,
edit_permissions,
favourite,
favourited_count,
jql,
owner,
search_url,
self,
share_permissions,
shared_users,
subscriptions,
view_url
FROM jira.filters.my_filters
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
AND include_favourites = '{{ include_favourites }}'
;
```
</TabItem>
</Tabs>
