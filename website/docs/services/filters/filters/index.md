--- 
title: filters
hide_title: false
hide_table_of_contents: false
keywords:
  - filters
  - filters
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the filters resource in the jira filters service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>filters</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="filters" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.filters.filters" /></td></tr>
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
<TabItem value="list">

Details of a filter.

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
    <td>The name of the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="approximate_last_used" /></td>
    <td><code>string (date-time)</code></td>
    <td>\&#91;Experimental\&#93; Approximate last used time. Returns the date and time when the filter was last used. Returns `null` if the filter hasn't been used after tracking was enabled. For performance reasons, timestamps aren't updated in real time and therefore may not be exactly accurate. (wire: approximateLastUsed)</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td>The description of the filter.</td>
</tr>
<tr>
    <td><CopyableCode code="edit_permissions" /></td>
    <td><code>array</code></td>
    <td>The groups and projects that can edit the filter. This can be specified when updating a filter, but not when creating a filter. (wire: editPermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="favourite" /></td>
    <td><code>boolean</code></td>
    <td>Whether the filter is selected as a favorite by any users, not including the filter owner.</td>
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
    <td>The user who owns the filter. Defaults to the creator of the filter, however, Jira administrators can change the owner of a shared filter in the admin settings.</td>
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
    <td>The groups and projects that the filter is shared with. This can be specified when updating a filter, but not when creating a filter. (wire: sharePermissions)</td>
</tr>
<tr>
    <td><CopyableCode code="subscriptions" /></td>
    <td><code>array</code></td>
    <td>The users that are subscribed to the filter.</td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_share_permissions"><code>override_share_permissions</code></a></td>
    <td>Returns a filter.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, the filter is only returned where it is:&lt;br /&gt;&lt;br /&gt; *  owned by the user.&lt;br /&gt; *  shared with a group that the user is a member of.&lt;br /&gt; *  shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  shared with a public project.&lt;br /&gt; *  shared with the public.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-filter_name"><code>filter_name</code></a>, <a href="#parameter-account_id"><code>account_id</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-groupname"><code>groupname</code></a>, <a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_share_permissions"><code>override_share_permissions</code></a>, <a href="#parameter-is_substring_match"><code>is_substring_match</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of filters. Use this operation to get:&lt;br /&gt;&lt;br /&gt; *  specific filters, by defining `id` only.&lt;br /&gt; *  filters that match all of the specified attributes. For example, all filters for a user with a particular word in their name. When multiple attributes are specified only filters matching all attributes are returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, only the following filters that match the query parameters are returned:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_share_permissions"><code>override_share_permissions</code></a></td>
    <td>Creates a filter. The filter is shared according to the &#91;default share scope&#93;(#api-rest-api-3-filter-post). The filter is not selected as a favorite.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-override_share_permissions"><code>override_share_permissions</code></a></td>
    <td>Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however the user must own the filter.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Delete a filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
</tr>
<tr>
    <td><a href="#remove_favourite"><CopyableCode code="remove_favourite" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#add_favourite"><CopyableCode code="add_favourite" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Add a filter as a favorite for the user.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user can only favorite:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.</td>
</tr>
<tr>
    <td><a href="#change_owner"><CopyableCode code="change_owner" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-accountId"><code>accountId</code></a></td>
    <td></td>
    <td>Changes the owner of the filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira. However, the user must own the filter or have the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
    <td><code>integer (int64)</code></td>
    <td>The ID of the filter to update.</td>
</tr>
<tr id="parameter-account_id">
    <td><CopyableCode code="account_id" /></td>
    <td><code>string</code></td>
    <td>User account ID used to return filters with the matching `owner.accountId`. This parameter cannot be used with `owner`. (wire: accountId)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  `sharedUsers` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify `sharedUsers`, then the `sharedUsers` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append `&#91;start-index:end-index&#93;` to the expand request. For example, to access the next 1000 users, use `?expand=sharedUsers&#91;1001:2000&#93;`.  *  `subscriptions` Returns the users that are subscribed to the filter. If you don't specify `subscriptions`, the `subscriptions` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append `&#91;start-index:end-index&#93;` to the expand request. For example, to access the next 1000 subscriptions, use `?expand=subscriptions&#91;1001:2000&#93;`.</td>
</tr>
<tr id="parameter-filter_name">
    <td><CopyableCode code="filter_name" /></td>
    <td><code>string</code></td>
    <td>String used to perform a case-insensitive partial match with `name`. (wire: filterName)</td>
</tr>
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>Group ID used to returns filters that are shared with a group that matches `sharePermissions.group.groupId`. This parameter cannot be used with the `groupname` parameter. (wire: groupId)</td>
</tr>
<tr id="parameter-groupname">
    <td><CopyableCode code="groupname" /></td>
    <td><code>string</code></td>
    <td>As a group's name can change, use of `groupId` is recommended to identify a group. Group name used to returns filters that are shared with a group that matches `sharePermissions.group.groupname`. This parameter cannot be used with the `groupId` parameter.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>array</code></td>
    <td>The list of filter IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. Do not exceed 200 filter IDs.</td>
</tr>
<tr id="parameter-is_substring_match">
    <td><CopyableCode code="is_substring_match" /></td>
    <td><code>boolean</code></td>
    <td>When `true` this will perform a case-insensitive substring match for the provided `filterName`. When `false` the filter name will be searched using &#91;full text search syntax&#93;(https:​//support.atlassian.com/jira-software-cloud/docs/search-for-issues-using-the-text-field/). (wire: isSubstringMatch)</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field:   *  `description` Sorts by filter description. Note that this sorting works independently of whether the expand to display the description field is in use.  *  `favourite_count` Sorts by the count of how many users have this filter as a favorite.  *  `is_favourite` Sorts by whether the filter is marked as a favorite.  *  `id` Sorts by filter ID.  *  `name` Sorts by filter name.  *  `owner` Sorts by the ID of the filter owner.  *  `is_shared` Sorts by whether the filter is shared. (wire: orderBy)</td>
</tr>
<tr id="parameter-override_share_permissions">
    <td><CopyableCode code="override_share_permissions" /></td>
    <td><code>boolean</code></td>
    <td>EXPERIMENTAL: Whether share permissions are overridden to enable the addition of any share permissions to filters. Available to users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideSharePermissions)</td>
</tr>
<tr id="parameter-owner">
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td>This parameter is deprecated because of privacy changes. Use `accountId` instead. See the &#91;migration guide&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. User name used to return filters with the matching `owner.name`. This parameter cannot be used with `accountId`.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>Project ID used to returns filters that are shared with a project that matches `sharePermissions.project.id`. (wire: projectId)</td>
</tr>
<tr id="parameter-start_at">
    <td><CopyableCode code="start_at" /></td>
    <td><code>integer (int64)</code></td>
    <td>The index of the first item to return in a page of results (page offset). (wire: startAt)</td>
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

Returns a filter.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, the filter is only returned where it is:&lt;br /&gt;&lt;br /&gt; *  owned by the user.&lt;br /&gt; *  shared with a group that the user is a member of.&lt;br /&gt; *  shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  shared with a public project.&lt;br /&gt; *  shared with the public.

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
FROM jira.filters.filters
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
AND override_share_permissions = '{{ override_share_permissions }}'
;
```
</TabItem>
<TabItem value="list">

Returns a &#91;paginated&#93;(#pagination) list of filters. Use this operation to get:&lt;br /&gt;&lt;br /&gt; *  specific filters, by defining `id` only.&lt;br /&gt; *  filters that match all of the specified attributes. For example, all filters for a user with a particular word in their name. When multiple attributes are specified only filters matching all attributes are returned.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None, however, only the following filters that match the query parameters are returned:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

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
subscriptions,
view_url
FROM jira.filters.filters
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND filter_name = '{{ filter_name }}'
AND account_id = '{{ account_id }}'
AND owner = '{{ owner }}'
AND groupname = '{{ groupname }}'
AND group_id = '{{ group_id }}'
AND project_id = '{{ project_id }}'
AND id = '{{ id }}'
AND order_by = '{{ order_by }}'
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND expand = '{{ expand }}'
AND override_share_permissions = '{{ override_share_permissions }}'
AND is_substring_match = '{{ is_substring_match }}'
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

Creates a filter. The filter is shared according to the &#91;default share scope&#93;(#api-rest-api-3-filter-post). The filter is not selected as a favorite.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
INSERT INTO jira.filters.filters (
description,
edit_permissions,
favourite,
jql,
name,
share_permissions,
cloud_id,
expand,
override_share_permissions
)
SELECT 
'{{ description }}',
'{{ edit_permissions }}',
{{ favourite }},
'{{ jql }}',
'{{ name }}' /* required */,
'{{ share_permissions }}',
'{{ cloud_id }}',
'{{ expand }}',
'{{ override_share_permissions }}'
RETURNING
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
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: filters
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the filters resource.
    - name: description
      value: "{{ description }}"
      description: |
        A description of the filter.
    - name: edit_permissions
      description: |
        The groups and projects that can edit the filter.
      value:
        - group:
            groupId: "{{ groupId }}"
            name: "{{ name }}"
            self: "{{ self }}"
          id: {{ id }}
          project:
            archived: {{ archived }}
            archivedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            archivedDate: "{{ archivedDate }}"
            assigneeType: "{{ assigneeType }}"
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            components:
              - ari: "{{ ari }}"
                assignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                assigneeType: "{{ assigneeType }}"
                description: "{{ description }}"
                id: "{{ id }}"
                isAssigneeTypeValid: {{ isAssigneeTypeValid }}
                lead:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                leadAccountId: "{{ leadAccountId }}"
                leadUserName: "{{ leadUserName }}"
                metadata: "{{ metadata }}"
                name: "{{ name }}"
                project: "{{ project }}"
                projectId: {{ projectId }}
                realAssignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                realAssigneeType: "{{ realAssigneeType }}"
                self: "{{ self }}"
            deleted: {{ deleted }}
            deletedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            deletedDate: "{{ deletedDate }}"
            description: "{{ description }}"
            email: "{{ email }}"
            favourite: {{ favourite }}
            id: "{{ id }}"
            insight:
              lastIssueUpdateTime: "{{ lastIssueUpdateTime }}"
              totalIssueCount: {{ totalIssueCount }}
            isPrivate: {{ isPrivate }}
            issueTypeHierarchy:
              baseLevelId: {{ baseLevelId }}
              levels:
                - aboveLevelId: {{ aboveLevelId }}
                  belowLevelId: {{ belowLevelId }}
                  externalUuid: "{{ externalUuid }}"
                  hierarchyLevelNumber: {{ hierarchyLevelNumber }}
                  id: {{ id }}
                  issueTypeIds: "{{ issueTypeIds }}"
                  level: {{ level }}
                  name: "{{ name }}"
                  projectConfigurationId: {{ projectConfigurationId }}
            issueTypes:
              - avatarId: {{ avatarId }}
                description: "{{ description }}"
                entityId: "{{ entityId }}"
                hierarchyLevel: {{ hierarchyLevel }}
                iconUrl: "{{ iconUrl }}"
                id: "{{ id }}"
                name: "{{ name }}"
                scope:
                  project:
                    avatarUrls: "{{ avatarUrls }}"
                    id: "{{ id }}"
                    key: "{{ key }}"
                    name: "{{ name }}"
                    projectCategory: "{{ projectCategory }}"
                    projectTypeKey: "{{ projectTypeKey }}"
                    self: "{{ self }}"
                    simplified: {{ simplified }}
                  type: "{{ type }}"
                self: "{{ self }}"
                subtask: {{ subtask }}
            key: "{{ key }}"
            landingPageInfo:
              attributes: "{{ attributes }}"
              boardId: {{ boardId }}
              boardName: "{{ boardName }}"
              projectKey: "{{ projectKey }}"
              projectType: "{{ projectType }}"
              queueCategory: "{{ queueCategory }}"
              queueId: {{ queueId }}
              queueName: "{{ queueName }}"
              simpleBoard: {{ simpleBoard }}
              simplified: {{ simplified }}
              url: "{{ url }}"
            lead:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            name: "{{ name }}"
            permissions:
              canEdit: {{ canEdit }}
            projectCategory:
              description: "{{ description }}"
              id: "{{ id }}"
              name: "{{ name }}"
              self: "{{ self }}"
            projectTypeKey: "{{ projectTypeKey }}"
            properties: "{{ properties }}"
            retentionTillDate: "{{ retentionTillDate }}"
            roles: "{{ roles }}"
            self: "{{ self }}"
            simplified: {{ simplified }}
            style: "{{ style }}"
            url: "{{ url }}"
            uuid: "{{ uuid }}"
            versions:
              - approvers: "{{ approvers }}"
                archived: {{ archived }}
                description: "{{ description }}"
                driver: "{{ driver }}"
                id: "{{ id }}"
                issuesStatusForFixVersion:
                  done: {{ done }}
                  inProgress: {{ inProgress }}
                  toDo: {{ toDo }}
                  unmapped: {{ unmapped }}
                moveUnfixedIssuesTo: "{{ moveUnfixedIssuesTo }}"
                name: "{{ name }}"
                operations: "{{ operations }}"
                overdue: {{ overdue }}
                project: "{{ project }}"
                projectId: {{ projectId }}
                releaseDate: "{{ releaseDate }}"
                released: {{ released }}
                self: "{{ self }}"
                startDate: "{{ startDate }}"
                userReleaseDate: "{{ userReleaseDate }}"
                userStartDate: "{{ userStartDate }}"
          role:
            actors:
              - actorGroup:
                  displayName: "{{ displayName }}"
                  groupId: "{{ groupId }}"
                  name: "{{ name }}"
                actorUser:
                  accountId: "{{ accountId }}"
                avatarUrl: "{{ avatarUrl }}"
                displayName: "{{ displayName }}"
                id: {{ id }}
                name: "{{ name }}"
                type: "{{ type }}"
            admin: {{ admin }}
            currentUserRole: {{ currentUserRole }}
            default: {{ default }}
            description: "{{ description }}"
            id: {{ id }}
            name: "{{ name }}"
            roleConfigurable: {{ roleConfigurable }}
            scope:
              project:
                avatarUrls:
                  16x16: "{{ 16x16 }}"
                  24x24: "{{ 24x24 }}"
                  32x32: "{{ 32x32 }}"
                  48x48: "{{ 48x48 }}"
                id: "{{ id }}"
                key: "{{ key }}"
                name: "{{ name }}"
                projectCategory:
                  description: "{{ description }}"
                  id: "{{ id }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                projectTypeKey: "{{ projectTypeKey }}"
                self: "{{ self }}"
                simplified: {{ simplified }}
              type: "{{ type }}"
            self: "{{ self }}"
            translatedName: "{{ translatedName }}"
          type: "{{ type }}"
          user:
            accountId: "{{ accountId }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
    - name: favourite
      value: {{ favourite }}
      description: |
        Whether the filter is selected as a favorite.
    - name: jql
      value: "{{ jql }}"
      description: |
        The JQL query for the filter. For example, *project = SSP AND issuetype = Bug*.
    - name: name
      value: "{{ name }}"
      description: |
        The name of the filter. Must be unique.
    - name: share_permissions
      description: |
        The groups and projects that the filter is shared with.
      value:
        - group:
            groupId: "{{ groupId }}"
            name: "{{ name }}"
            self: "{{ self }}"
          id: {{ id }}
          project:
            archived: {{ archived }}
            archivedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            archivedDate: "{{ archivedDate }}"
            assigneeType: "{{ assigneeType }}"
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            components:
              - ari: "{{ ari }}"
                assignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                assigneeType: "{{ assigneeType }}"
                description: "{{ description }}"
                id: "{{ id }}"
                isAssigneeTypeValid: {{ isAssigneeTypeValid }}
                lead:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                leadAccountId: "{{ leadAccountId }}"
                leadUserName: "{{ leadUserName }}"
                metadata: "{{ metadata }}"
                name: "{{ name }}"
                project: "{{ project }}"
                projectId: {{ projectId }}
                realAssignee:
                  accountId: "{{ accountId }}"
                  accountType: "{{ accountType }}"
                  active: {{ active }}
                  appType: "{{ appType }}"
                  applicationRoles:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  avatarUrls:
                    16x16: "{{ 16x16 }}"
                    24x24: "{{ 24x24 }}"
                    32x32: "{{ 32x32 }}"
                    48x48: "{{ 48x48 }}"
                  displayName: "{{ displayName }}"
                  emailAddress: "{{ emailAddress }}"
                  groups:
                    callback: "{{ callback }}"
                    items: "{{ items }}"
                    max-results: {{ max-results }}
                    pagingCallback: "{{ pagingCallback }}"
                    size: {{ size }}
                  guest: {{ guest }}
                  key: "{{ key }}"
                  locale: "{{ locale }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                  timeZone: "{{ timeZone }}"
                realAssigneeType: "{{ realAssigneeType }}"
                self: "{{ self }}"
            deleted: {{ deleted }}
            deletedBy:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            deletedDate: "{{ deletedDate }}"
            description: "{{ description }}"
            email: "{{ email }}"
            favourite: {{ favourite }}
            id: "{{ id }}"
            insight:
              lastIssueUpdateTime: "{{ lastIssueUpdateTime }}"
              totalIssueCount: {{ totalIssueCount }}
            isPrivate: {{ isPrivate }}
            issueTypeHierarchy:
              baseLevelId: {{ baseLevelId }}
              levels:
                - aboveLevelId: {{ aboveLevelId }}
                  belowLevelId: {{ belowLevelId }}
                  externalUuid: "{{ externalUuid }}"
                  hierarchyLevelNumber: {{ hierarchyLevelNumber }}
                  id: {{ id }}
                  issueTypeIds: "{{ issueTypeIds }}"
                  level: {{ level }}
                  name: "{{ name }}"
                  projectConfigurationId: {{ projectConfigurationId }}
            issueTypes:
              - avatarId: {{ avatarId }}
                description: "{{ description }}"
                entityId: "{{ entityId }}"
                hierarchyLevel: {{ hierarchyLevel }}
                iconUrl: "{{ iconUrl }}"
                id: "{{ id }}"
                name: "{{ name }}"
                scope:
                  project:
                    avatarUrls: "{{ avatarUrls }}"
                    id: "{{ id }}"
                    key: "{{ key }}"
                    name: "{{ name }}"
                    projectCategory: "{{ projectCategory }}"
                    projectTypeKey: "{{ projectTypeKey }}"
                    self: "{{ self }}"
                    simplified: {{ simplified }}
                  type: "{{ type }}"
                self: "{{ self }}"
                subtask: {{ subtask }}
            key: "{{ key }}"
            landingPageInfo:
              attributes: "{{ attributes }}"
              boardId: {{ boardId }}
              boardName: "{{ boardName }}"
              projectKey: "{{ projectKey }}"
              projectType: "{{ projectType }}"
              queueCategory: "{{ queueCategory }}"
              queueId: {{ queueId }}
              queueName: "{{ queueName }}"
              simpleBoard: {{ simpleBoard }}
              simplified: {{ simplified }}
              url: "{{ url }}"
            lead:
              accountId: "{{ accountId }}"
              accountType: "{{ accountType }}"
              active: {{ active }}
              appType: "{{ appType }}"
              applicationRoles:
                callback: "{{ callback }}"
                items:
                  - defaultGroups: "{{ defaultGroups }}"
                    defaultGroupsDetails: "{{ defaultGroupsDetails }}"
                    defined: {{ defined }}
                    groupDetails: "{{ groupDetails }}"
                    groups: "{{ groups }}"
                    hasUnlimitedSeats: {{ hasUnlimitedSeats }}
                    key: "{{ key }}"
                    name: "{{ name }}"
                    numberOfSeats: {{ numberOfSeats }}
                    platform: {{ platform }}
                    remainingSeats: {{ remainingSeats }}
                    selectedByDefault: {{ selectedByDefault }}
                    userCount: {{ userCount }}
                    userCountDescription: "{{ userCountDescription }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              avatarUrls:
                16x16: "{{ 16x16 }}"
                24x24: "{{ 24x24 }}"
                32x32: "{{ 32x32 }}"
                48x48: "{{ 48x48 }}"
              displayName: "{{ displayName }}"
              emailAddress: "{{ emailAddress }}"
              groups:
                callback: "{{ callback }}"
                items:
                  - groupId: "{{ groupId }}"
                    name: "{{ name }}"
                    self: "{{ self }}"
                max-results: {{ max-results }}
                pagingCallback: "{{ pagingCallback }}"
                size: {{ size }}
              guest: {{ guest }}
              key: "{{ key }}"
              locale: "{{ locale }}"
              name: "{{ name }}"
              self: "{{ self }}"
              timeZone: "{{ timeZone }}"
            name: "{{ name }}"
            permissions:
              canEdit: {{ canEdit }}
            projectCategory:
              description: "{{ description }}"
              id: "{{ id }}"
              name: "{{ name }}"
              self: "{{ self }}"
            projectTypeKey: "{{ projectTypeKey }}"
            properties: "{{ properties }}"
            retentionTillDate: "{{ retentionTillDate }}"
            roles: "{{ roles }}"
            self: "{{ self }}"
            simplified: {{ simplified }}
            style: "{{ style }}"
            url: "{{ url }}"
            uuid: "{{ uuid }}"
            versions:
              - approvers: "{{ approvers }}"
                archived: {{ archived }}
                description: "{{ description }}"
                driver: "{{ driver }}"
                id: "{{ id }}"
                issuesStatusForFixVersion:
                  done: {{ done }}
                  inProgress: {{ inProgress }}
                  toDo: {{ toDo }}
                  unmapped: {{ unmapped }}
                moveUnfixedIssuesTo: "{{ moveUnfixedIssuesTo }}"
                name: "{{ name }}"
                operations: "{{ operations }}"
                overdue: {{ overdue }}
                project: "{{ project }}"
                projectId: {{ projectId }}
                releaseDate: "{{ releaseDate }}"
                released: {{ released }}
                self: "{{ self }}"
                startDate: "{{ startDate }}"
                userReleaseDate: "{{ userReleaseDate }}"
                userStartDate: "{{ userStartDate }}"
          role:
            actors:
              - actorGroup:
                  displayName: "{{ displayName }}"
                  groupId: "{{ groupId }}"
                  name: "{{ name }}"
                actorUser:
                  accountId: "{{ accountId }}"
                avatarUrl: "{{ avatarUrl }}"
                displayName: "{{ displayName }}"
                id: {{ id }}
                name: "{{ name }}"
                type: "{{ type }}"
            admin: {{ admin }}
            currentUserRole: {{ currentUserRole }}
            default: {{ default }}
            description: "{{ description }}"
            id: {{ id }}
            name: "{{ name }}"
            roleConfigurable: {{ roleConfigurable }}
            scope:
              project:
                avatarUrls:
                  16x16: "{{ 16x16 }}"
                  24x24: "{{ 24x24 }}"
                  32x32: "{{ 32x32 }}"
                  48x48: "{{ 48x48 }}"
                id: "{{ id }}"
                key: "{{ key }}"
                name: "{{ name }}"
                projectCategory:
                  description: "{{ description }}"
                  id: "{{ id }}"
                  name: "{{ name }}"
                  self: "{{ self }}"
                projectTypeKey: "{{ projectTypeKey }}"
                self: "{{ self }}"
                simplified: {{ simplified }}
              type: "{{ type }}"
            self: "{{ self }}"
            translatedName: "{{ translatedName }}"
          type: "{{ type }}"
          user:
            accountId: "{{ accountId }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
    - name: expand
      value: "{{ expand }}"
      description: Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  \`sharedUsers\` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify \`sharedUsers\`, then the \`sharedUsers\` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append \`[start-index:end-index]\` to the expand request. For example, to access the next 1000 users, use \`?expand=sharedUsers[1001:2000]\`.  *  \`subscriptions\` Returns the users that are subscribed to the filter. If you don't specify \`subscriptions\`, the \`subscriptions\` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append \`[start-index:end-index]\` to the expand request. For example, to access the next 1000 subscriptions, use \`?expand=subscriptions[1001:2000]\`.
      description: Use [expand](#expansion) to include additional information about filter in the response. This parameter accepts a comma-separated list. Expand options include:   *  \`sharedUsers\` Returns the users that the filter is shared with. This includes users that can browse projects that the filter is shared with. If you don't specify \`sharedUsers\`, then the \`sharedUsers\` object is returned but it doesn't list any users. The list of users returned is limited to 1000, to access additional users append \`[start-index:end-index]\` to the expand request. For example, to access the next 1000 users, use \`?expand=sharedUsers[1001:2000]\`.  *  \`subscriptions\` Returns the users that are subscribed to the filter. If you don't specify \`subscriptions\`, the \`subscriptions\` object is returned but it doesn't list any subscriptions. The list of subscriptions returned is limited to 1000, to access additional subscriptions append \`[start-index:end-index]\` to the expand request. For example, to access the next 1000 subscriptions, use \`?expand=subscriptions[1001:2000]\`.
    - name: override_share_permissions
      value: {{ override_share_permissions }}
      description: EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be created. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
      description: EXPERIMENTAL: Whether share permissions are overridden to enable filters with any share permissions to be created. Available to users with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
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

Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however the user must own the filter.

```sql
UPDATE jira.filters.filters
SET 
description = '{{ description }}',
edit_permissions = '{{ edit_permissions }}',
favourite = {{ favourite }},
jql = '{{ jql }}',
name = '{{ name }}',
share_permissions = '{{ share_permissions }}'
WHERE 
id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND name = '{{ name }}' --required
AND expand = '{{ expand}}'
AND override_share_permissions = {{ override_share_permissions}}
RETURNING
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
view_url;
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

Delete a filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
DELETE FROM jira.filters.filters
WHERE id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="remove_favourite"
    values={[
        { label: 'remove_favourite', value: 'remove_favourite' },
        { label: 'add_favourite', value: 'add_favourite' },
        { label: 'change_owner', value: 'change_owner' }
    ]}
>
<TabItem value="remove_favourite">

Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
EXEC jira.filters.filters.remove_favourite 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}'
;
```
</TabItem>
<TabItem value="add_favourite">

Add a filter as a favorite for the user.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira, however, the user can only favorite:&lt;br /&gt;&lt;br /&gt; *  filters owned by the user.&lt;br /&gt; *  filters shared with a group that the user is a member of.&lt;br /&gt; *  filters shared with a private project that the user has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for.&lt;br /&gt; *  filters shared with a public project.&lt;br /&gt; *  filters shared with the public.

```sql
EXEC jira.filters.filters.add_favourite 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}'
;
```
</TabItem>
<TabItem value="change_owner">

Changes the owner of the filter.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira. However, the user must own the filter or have the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.filters.filters.change_owner 
@id='{{ id }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"accountId": "{{ accountId }}"
}'
;
```
</TabItem>
</Tabs>
