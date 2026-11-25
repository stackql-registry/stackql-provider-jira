--- 
title: comments
hide_title: false
hide_table_of_contents: false
keywords:
  - comments
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the comments resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>comments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="comments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.comments" /></td></tr>
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
    <td>The ID of the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="author" /></td>
    <td><code>object</code></td>
    <td>The ID of the user who created the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="body" /></td>
    <td><code>object</code></td>
    <td>The comment text in &#91;Atlassian Document Format&#93;(https:​//developer.atlassian.com/cloud/jira/platform/apis/document/structure/).</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time at which the comment was created.</td>
</tr>
<tr>
    <td><CopyableCode code="jsd_author_can_see_request" /></td>
    <td><code>boolean</code></td>
    <td>Whether the comment was added from an email sent by a person who is not part of the issue. See &#91;Allow external emails to be added as comments on issues&#93;(https:​//support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for information on setting up this feature. (wire: jsdAuthorCanSeeRequest)</td>
</tr>
<tr>
    <td><CopyableCode code="jsd_public" /></td>
    <td><code>boolean</code></td>
    <td>Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API &#91;Create request comment&#93;(https:​//developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation. (wire: jsdPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>A list of comment properties. Optional on create and update.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_body" /></td>
    <td><code>string</code></td>
    <td>The rendered version of the comment. (wire: renderedBody)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="update_author" /></td>
    <td><code>object</code></td>
    <td>The ID of the user who updated the comment last. (wire: updateAuthor)</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time at which the comment was updated last.</td>
</tr>
<tr>
    <td><CopyableCode code="visibility" /></td>
    <td><code>object</code></td>
    <td>The group or role to which this comment is visible. Optional on create and update.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

A comment.

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
    <td>The ID of the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="author" /></td>
    <td><code>object</code></td>
    <td>The ID of the user who created the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="body" /></td>
    <td><code>object</code></td>
    <td>The comment text in &#91;Atlassian Document Format&#93;(https:​//developer.atlassian.com/cloud/jira/platform/apis/document/structure/).</td>
</tr>
<tr>
    <td><CopyableCode code="created" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time at which the comment was created.</td>
</tr>
<tr>
    <td><CopyableCode code="jsd_author_can_see_request" /></td>
    <td><code>boolean</code></td>
    <td>Whether the comment was added from an email sent by a person who is not part of the issue. See &#91;Allow external emails to be added as comments on issues&#93;(https:​//support.atlassian.com/jira-service-management-cloud/docs/allow-external-emails-to-be-added-as-comments-on-issues/)for information on setting up this feature. (wire: jsdAuthorCanSeeRequest)</td>
</tr>
<tr>
    <td><CopyableCode code="jsd_public" /></td>
    <td><code>boolean</code></td>
    <td>Whether the comment is visible in Jira Service Desk. Defaults to true when comments are created in the Jira Cloud Platform. This includes when the site doesn't use Jira Service Desk or the project isn't a Jira Service Desk project and, therefore, there is no Jira Service Desk for the issue to be visible on. To create a comment with its visibility in Jira Service Desk set to false, use the Jira Service Desk REST API &#91;Create request comment&#93;(https:​//developer.atlassian.com/cloud/jira/service-desk/rest/#api-rest-servicedeskapi-request-issueIdOrKey-comment-post) operation. (wire: jsdPublic)</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>array</code></td>
    <td>A list of comment properties. Optional on create and update.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_body" /></td>
    <td><code>string</code></td>
    <td>The rendered version of the comment. (wire: renderedBody)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td>The URL of the comment.</td>
</tr>
<tr>
    <td><CopyableCode code="update_author" /></td>
    <td><code>object</code></td>
    <td>The ID of the user who updated the comment last. (wire: updateAuthor)</td>
</tr>
<tr>
    <td><CopyableCode code="updated" /></td>
    <td><code>string (date-time)</code></td>
    <td>The date and time at which the comment was updated last.</td>
</tr>
<tr>
    <td><CopyableCode code="visibility" /></td>
    <td><code>object</code></td>
    <td>The group or role to which this comment is visible. Optional on create and update.</td>
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
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a comment.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-start_at"><code>start_at</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all comments for an issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Comments are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Adds a comment to an issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Add comments* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-notify_users"><code>notify_users</code></a>, <a href="#parameter-override_editable_flag"><code>override_editable_flag</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Updates a comment.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit all comments*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.&lt;br /&gt;&lt;br /&gt;**WARNING:** Child comments inherit visibility from their parent comment. Attempting to update a child comment's visibility will result in a 400 (Bad Request) error.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes a comment.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all comments*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#list_by_ids"><CopyableCode code="list_by_ids" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-ids"><code>ids</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns a &#91;paginated&#93;(#pagination) list of comments specified by a list of comment IDs.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Comments are returned where the user:&lt;br /&gt;&lt;br /&gt; *  has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
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
    <td>The ID of the comment.</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the issue. (wire: issueIdOrKey)</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information about comments in the response. This parameter accepts a comma-separated list. Expand options include:   *  `renderedBody` Returns the comment body rendered in HTML.  *  `properties` Returns the comment's properties.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. (wire: maxResults)</td>
</tr>
<tr id="parameter-notify_users">
    <td><CopyableCode code="notify_users" /></td>
    <td><code>boolean</code></td>
    <td>Whether users are notified when a comment is updated. (wire: notifyUsers)</td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td>&#91;Order&#93;(#ordering) the results by a field. Accepts *created* to sort comments by their created date. (wire: orderBy)</td>
</tr>
<tr id="parameter-override_editable_flag">
    <td><CopyableCode code="override_editable_flag" /></td>
    <td><code>boolean</code></td>
    <td>Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with the *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg). (wire: overrideEditableFlag)</td>
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

Returns a comment.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.

```sql
SELECT
id,
author,
body,
created,
jsd_author_can_see_request,
jsd_public,
properties,
rendered_body,
self,
update_author,
updated,
visibility
FROM jira.issues.comments
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list">

Returns all comments for an issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Comments are included in the response where the user has:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is role visibility is restricted to.

```sql
SELECT
id,
author,
body,
created,
jsd_author_can_see_request,
jsd_public,
properties,
rendered_body,
self,
update_author,
updated,
visibility
FROM jira.issues.comments
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND start_at = '{{ start_at }}'
AND max_results = '{{ max_results }}'
AND order_by = '{{ order_by }}'
AND expand = '{{ expand }}'
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

Adds a comment to an issue.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* and *Add comments* &#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.

```sql
INSERT INTO jira.issues.comments (
body,
properties,
visibility,
issue_id_or_key,
cloud_id,
expand
)
SELECT 
'{{ body }}',
'{{ properties }}',
'{{ visibility }}',
'{{ issue_id_or_key }}',
'{{ cloud_id }}',
'{{ expand }}'
RETURNING
id,
author,
body,
created,
jsd_author_can_see_request,
jsd_public,
properties,
rendered_body,
self,
update_author,
updated,
visibility
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: comments
  props:
    - name: issue_id_or_key
      value: "{{ issue_id_or_key }}"
      description: Required parameter for the comments resource.
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the comments resource.
    - name: body
      value: "{{ body }}"
      description: |
        The comment text in [Atlassian Document Format](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/).
    - name: properties
      description: |
        A list of comment properties. Optional on create and update.
      value:
        - key: "{{ key }}"
          value: "{{ value }}"
    - name: visibility
      description: |
        The group or role to which this comment is visible. Optional on create and update.
      value:
        identifier: "{{ identifier }}"
        type: "{{ type }}"
        value: "{{ value }}"
    - name: expand
      value: "{{ expand }}"
      description: Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts \`renderedBody\`, which returns the comment body rendered in HTML.
      description: Use [expand](#expansion) to include additional information about comments in the response. This parameter accepts \`renderedBody\`, which returns the comment body rendered in HTML.
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

Updates a comment.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Edit all comments*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to update any comment or *Edit own comments* to update comment created by the user.&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.&lt;br /&gt;&lt;br /&gt;**WARNING:** Child comments inherit visibility from their parent comment. Attempting to update a child comment's visibility will result in a 400 (Bad Request) error.

```sql
UPDATE jira.issues.comments
SET 
body = '{{ body }}',
properties = '{{ properties }}',
visibility = '{{ visibility }}'
WHERE 
issue_id_or_key = '{{ issue_id_or_key }}' --required
AND id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
AND notify_users = {{ notify_users}}
AND override_editable_flag = {{ override_editable_flag}}
AND expand = '{{ expand}}'
RETURNING
id,
author,
body,
created,
jsd_author_can_see_request,
jsd_public,
properties,
rendered_body,
self,
update_author,
updated,
visibility;
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

Deletes a comment.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue containing the comment is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  *Delete all comments*&#91; project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) to delete any comment or *Delete own comments* to delete comment created by the user,&lt;br /&gt; *  If the comment has visibility restrictions, the user belongs to the group or has the role visibility is restricted to.

```sql
DELETE FROM jira.issues.comments
WHERE issue_id_or_key = '{{ issue_id_or_key }}' --required
AND id = '{{ id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="list_by_ids"
    values={[
        { label: 'list_by_ids', value: 'list_by_ids' }
    ]}
>
<TabItem value="list_by_ids">

Returns a &#91;paginated&#93;(#pagination) list of comments specified by a list of comment IDs.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Comments are returned where the user:&lt;br /&gt;&lt;br /&gt; *  has *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project containing the comment.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
EXEC jira.issues.comments.list_by_ids 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}' 
@@json=
'{
"ids": "{{ ids }}"
}'
;
```
</TabItem>
</Tabs>
