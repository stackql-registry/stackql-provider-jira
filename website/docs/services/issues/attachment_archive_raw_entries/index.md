--- 
title: attachment_archive_raw_entries
hide_title: false
hide_table_of_contents: false
keywords:
  - attachment_archive_raw_entries
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the attachment_archive_raw_entries resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>attachment_archive_raw_entries</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="attachment_archive_raw_entries" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.attachment_archive_raw_entries" /></td></tr>
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

Returned if the request is successful. If an empty list is returned in the response, the attachment is empty, corrupt, or not an archive.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="abbreviated_name" /></td>
    <td><code>string</code></td>
    <td> (wire: abbreviatedName)</td>
</tr>
<tr>
    <td><CopyableCode code="entry_index" /></td>
    <td><code>integer (int64)</code></td>
    <td> (wire: entryIndex)</td>
</tr>
<tr>
    <td><CopyableCode code="media_type" /></td>
    <td><code>string</code></td>
    <td> (wire: mediaType)</td>
</tr>
<tr>
    <td><CopyableCode code="size" /></td>
    <td><code>integer (int64)</code></td>
    <td></td>
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
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is supported.&lt;br /&gt;&lt;br /&gt;Use this operation if you are processing the data without presenting it to the user, as this operation only returns the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use &#91; Get all metadata for an expanded attachment&#93;(#api-rest-api-3-attachment-id-expand-human-get) which also returns the metadata for the attachment itself, such as the attachment's ID and name.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** For the issue containing the attachment:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If attachments are added in private comments, the comment-level restriction will be applied.</td>
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
    <td>The ID of the attachment.</td>
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

Returns the metadata for the contents of an attachment, if it is an archive. For example, if the attachment is a ZIP archive, then information about the files in the archive is returned. Currently, only the ZIP archive format is supported.&lt;br /&gt;&lt;br /&gt;Use this operation if you are processing the data without presenting it to the user, as this operation only returns the metadata for the contents of the attachment. Otherwise, to retrieve data to present to the user, use &#91; Get all metadata for an expanded attachment&#93;(#api-rest-api-3-attachment-id-expand-human-get) which also returns the metadata for the attachment itself, such as the attachment's ID and name.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** For the issue containing the attachment:&lt;br /&gt;&lt;br /&gt; *  *Browse projects* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for the project that the issue is in.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If attachments are added in private comments, the comment-level restriction will be applied.

```sql
SELECT
name,
abbreviated_name,
entry_index,
media_type,
size
FROM jira.issues.attachment_archive_raw_entries
WHERE id = '{{ id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
