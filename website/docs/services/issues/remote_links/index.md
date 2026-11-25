--- 
title: remote_links
hide_title: false
hide_table_of_contents: false
keywords:
  - remote_links
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the remote_links resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>remote_links</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="remote_links" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.remote_links" /></td></tr>
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
    <td><code>integer (int64)</code></td>
    <td>The ID of the link.</td>
</tr>
<tr>
    <td><CopyableCode code="global_id" /></td>
    <td><code>string</code></td>
    <td>The global ID of the link, such as the ID of the item on the remote system. (wire: globalId)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>object</code></td>
    <td>Details of the remote application the linked item is in.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>object</code></td>
    <td>Details of the item linked to.</td>
</tr>
<tr>
    <td><CopyableCode code="relationship" /></td>
    <td><code>string</code></td>
    <td>Description of the relationship between the issue and the linked item.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the link.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

Details of an issue remote link.

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
    <td><code>integer (int64)</code></td>
    <td>The ID of the link.</td>
</tr>
<tr>
    <td><CopyableCode code="global_id" /></td>
    <td><code>string</code></td>
    <td>The global ID of the link, such as the ID of the item on the remote system. (wire: globalId)</td>
</tr>
<tr>
    <td><CopyableCode code="application" /></td>
    <td><code>object</code></td>
    <td>Details of the remote application the linked item is in.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>object</code></td>
    <td>Details of the item linked to.</td>
</tr>
<tr>
    <td><CopyableCode code="relationship" /></td>
    <td><code>string</code></td>
    <td>Description of the relationship between the issue and the linked item.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the link.</td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-link_id"><code>link_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-global_id"><code>global_id</code></a></td>
    <td>Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http:​//www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-object"><code>object</code></a></td>
    <td></td>
    <td>Creates or updates a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;If a `globalId` is provided and a remote issue link with that global ID is found it is updated. Any fields without values in the request are set to null. Otherwise, the remote issue link is created.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-link_id"><code>link_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-object"><code>object</code></a></td>
    <td></td>
    <td>Updates a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;Note: Fields without values in the request are set to null.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-link_id"><code>link_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a remote issue link from an issue.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects*, *Edit issues*, and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#delete_by_global_id"><CopyableCode code="delete_by_global_id" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-issueIdOrKey"><code>issueIdOrKey</code></a>, <a href="#parameter-globalId"><code>globalId</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http:​//www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security permission to view the issue.</td>
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
<tr id="parameter-globalId">
    <td><CopyableCode code="globalId" /></td>
    <td><code>string</code></td>
    <td>The global ID of a remote issue link.</td>
</tr>
<tr id="parameter-issueIdOrKey">
    <td><CopyableCode code="issueIdOrKey" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the issue.</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-link_id">
    <td><CopyableCode code="link_id" /></td>
    <td><code>string</code></td>
    <td>The ID of a remote issue link. (wire: linkId)</td>
</tr>
<tr id="parameter-global_id">
    <td><CopyableCode code="global_id" /></td>
    <td><code>string</code></td>
    <td>The global ID of the remote issue link. (wire: globalId)</td>
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

Returns a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
id,
global_id,
application,
object,
relationship,
self
FROM jira.issues.remote_links
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND link_id = '{{ link_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
<TabItem value="list">

Returns the remote issue links for an issue. When a remote issue link global ID is provided the record with that global ID is returned, otherwise all remote issue links are returned. Where a global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http:​//www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
SELECT
id,
global_id,
application,
object,
relationship,
self
FROM jira.issues.remote_links
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND global_id = '{{ global_id }}'
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

Creates or updates a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;If a `globalId` is provided and a remote issue link with that global ID is found it is updated. Any fields without values in the request are set to null. Otherwise, the remote issue link is created.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
INSERT INTO jira.issues.remote_links (
application,
global_id,
object,
relationship,
issue_id_or_key,
cloud_id
)
SELECT 
'{{ application }}',
'{{ global_id }}',
'{{ object }}' /* required */,
'{{ relationship }}',
'{{ issue_id_or_key }}',
'{{ cloud_id }}'
RETURNING
id,
self
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: remote_links
  props:
    - name: issue_id_or_key
      value: "{{ issue_id_or_key }}"
      description: Required parameter for the remote_links resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the remote_links resource.
    - name: application
      description: |
        Details of the remote application the linked item is in. For example, trello.
      value:
        name: "{{ name }}"
        type: "{{ type }}"
    - name: global_id
      value: "{{ global_id }}"
      description: |
        An identifier for the remote item in the remote system. For example, the global ID for a remote item in Confluence would consist of the app ID and page ID, like this: \`appId=456&pageId=123\`.
        Setting this field enables the remote issue link details to be updated or deleted using remote system and item details as the record identifier, rather than using the record's Jira ID.
        The maximum length is 255 characters.
    - name: object
      description: |
        Details of the item linked to.
      value:
        icon:
          link: "{{ link }}"
          title: "{{ title }}"
          url16x16: "{{ url16x16 }}"
        status:
          icon:
            link: "{{ link }}"
            title: "{{ title }}"
            url16x16: "{{ url16x16 }}"
          resolved: {{ resolved }}
        summary: "{{ summary }}"
        title: "{{ title }}"
        url: "{{ url }}"
    - name: relationship
      value: "{{ relationship }}"
      description: |
        Description of the relationship between the issue and the linked item. If not set, the relationship description "links to" is used in Jira.
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

Updates a remote issue link for an issue.&lt;br /&gt;&lt;br /&gt;Note: Fields without values in the request are set to null.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
UPDATE jira.issues.remote_links
SET 
application = '{{ application }}',
global_id = '{{ global_id }}',
object = '{{ object }}',
relationship = '{{ relationship }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND link_id = '{{ link_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND object = '{{ object }}' --required;
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

Deletes a remote issue link from an issue.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects*, *Edit issues*, and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
DELETE FROM jira.issues.remote_links
WHERE issue_id_or_key = '{{ issue_id_or_key }}' --required
AND link_id = '{{ link_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="delete_by_global_id"
    values={[
        { label: 'delete_by_global_id', value: 'delete_by_global_id' }
    ]}
>
<TabItem value="delete_by_global_id">

Deletes the remote issue link from the issue using the link's global ID. Where the global ID includes reserved URL characters these must be escaped in the request. For example, pass `system=http:​//www.mycompany.com/support&id=1` as `system%3Dhttp%3A%2F%2Fwww.mycompany.com%2Fsupport%26id%3D1`.&lt;br /&gt;&lt;br /&gt;This operation requires &#91;issue linking to be active&#93;(https:​//confluence.atlassian.com/x/yoXKM).&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is implemented, issue-level security permission to view the issue.

```sql
EXEC jira.issues.remote_links.delete_by_global_id 
@issueIdOrKey='{{ issueIdOrKey }}' --required, 
@globalId='{{ globalId }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
