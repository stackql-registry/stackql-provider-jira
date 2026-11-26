--- 
title: links
hide_title: false
hide_table_of_contents: false
keywords:
  - links
  - issues
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the links resource in the jira issues service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>links</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="links" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.issues.links" /></td></tr>
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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue link.</td>
</tr>
<tr>
    <td><CopyableCode code="inward_issue" /></td>
    <td><code>object</code></td>
    <td>Provides details about the linked issue. If presenting this link in a user interface, use the `inward` field of the issue link type to label the link. (wire: inwardIssue)</td>
</tr>
<tr>
    <td><CopyableCode code="outward_issue" /></td>
    <td><code>object</code></td>
    <td>Provides details about the linked issue. If presenting this link in a user interface, use the `outward` field of the issue link type to label the link. (wire: outwardIssue)</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue link.</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>object</code></td>
    <td>The type of link between the issues.</td>
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
    <td><a href="#parameter-link_id"><code>link_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Returns an issue link.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse project* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the linked issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-inward_issue"><code>inward_issue</code></a>, <a href="#parameter-outward_issue"><code>outward_issue</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally add a comment to the from (outward) issue. To use this resource the site must have &#91;Issue Linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use `https:​//your-domain.atlassian.net/rest/api/3/issue/&#91;linked issue key&#93;?fields=issuelinks`.&lt;br /&gt;&lt;br /&gt;If the link request duplicates a link, the response indicates that the issue link was created. If the request included a comment, the comment is added.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse project* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the issues to be linked,&lt;br /&gt; *  *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) on the project containing the from (outward) issue,&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-link_id"><code>link_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Deletes an issue link.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Browse project &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the issues in the link.&lt;br /&gt; *  *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for at least one of the projects containing issues in the link.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues.</td>
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
<tr id="parameter-link_id">
    <td><CopyableCode code="link_id" /></td>
    <td><code>string</code></td>
    <td>The ID of the issue link.</td>
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

Returns an issue link.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse project* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the linked issues.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues.

```sql
SELECT
id,
inward_issue,
outward_issue,
self,
type
FROM jira.issues.links
WHERE link_id = '{{ link_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
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

Creates a link between two issues. Use this operation to indicate a relationship between two issues and optionally add a comment to the from (outward) issue. To use this resource the site must have &#91;Issue Linking&#93;(https:​//confluence.atlassian.com/x/yoXKM) enabled.&lt;br /&gt;&lt;br /&gt;This resource returns nothing on the creation of an issue link. To obtain the ID of the issue link, use `https:​//your-domain.atlassian.net/rest/api/3/issue/&#91;linked issue key&#93;?fields=issuelinks`.&lt;br /&gt;&lt;br /&gt;If the link request duplicates a link, the response indicates that the issue link was created. If the request included a comment, the comment is added.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  *Browse project* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the issues to be linked,&lt;br /&gt; *  *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) on the project containing the from (outward) issue,&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission to view the issue.&lt;br /&gt; *  If the comment has visibility restrictions, belongs to the group or has the role visibility is restricted to.

```sql
INSERT INTO jira.issues.links (
comment,
inward_issue,
outward_issue,
type,
cloud_id
)
SELECT 
'{{ comment }}',
'{{ inward_issue }}' /* required */,
'{{ outward_issue }}' /* required */,
'{{ type }}' /* required */,
'{{ cloud_id }}'
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: links
  props:
    - name: cloud_id
      value: "{{ cloud_id }}"
      description: Required parameter for the links resource.
    - name: comment
      description: |
        A comment.
      value:
        author:
          accountId: "{{ accountId }}"
          accountType: "{{ accountType }}"
          active: {{ active }}
          avatarUrls:
            16x16: "{{ 16x16 }}"
            24x24: "{{ 24x24 }}"
            32x32: "{{ 32x32 }}"
            48x48: "{{ 48x48 }}"
          displayName: "{{ displayName }}"
          emailAddress: "{{ emailAddress }}"
          key: "{{ key }}"
          name: "{{ name }}"
          self: "{{ self }}"
          timeZone: "{{ timeZone }}"
        body: "{{ body }}"
        created: "{{ created }}"
        id: "{{ id }}"
        jsdAuthorCanSeeRequest: {{ jsdAuthorCanSeeRequest }}
        jsdPublic: {{ jsdPublic }}
        properties:
          - key: "{{ key }}"
            value: "{{ value }}"
        renderedBody: "{{ renderedBody }}"
        self: "{{ self }}"
        updateAuthor:
          accountId: "{{ accountId }}"
          accountType: "{{ accountType }}"
          active: {{ active }}
          avatarUrls:
            16x16: "{{ 16x16 }}"
            24x24: "{{ 24x24 }}"
            32x32: "{{ 32x32 }}"
            48x48: "{{ 48x48 }}"
          displayName: "{{ displayName }}"
          emailAddress: "{{ emailAddress }}"
          key: "{{ key }}"
          name: "{{ name }}"
          self: "{{ self }}"
          timeZone: "{{ timeZone }}"
        updated: "{{ updated }}"
        visibility:
          identifier: "{{ identifier }}"
          type: "{{ type }}"
          value: "{{ value }}"
    - name: inward_issue
      description: |
        The ID or key of a linked issue.
      value:
        fields:
          assignee:
            accountId: "{{ accountId }}"
            accountType: "{{ accountType }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            emailAddress: "{{ emailAddress }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
            timeZone: "{{ timeZone }}"
          issueType:
            avatarId: {{ avatarId }}
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
          issuetype:
            avatarId: {{ avatarId }}
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
          priority:
            avatarId: {{ avatarId }}
            description: "{{ description }}"
            iconUrl: "{{ iconUrl }}"
            id: "{{ id }}"
            isDefault: {{ isDefault }}
            name: "{{ name }}"
            schemes:
              maxResults: {{ maxResults }}
              startAt: {{ startAt }}
              total: {{ total }}
            self: "{{ self }}"
            statusColor: "{{ statusColor }}"
          status:
            description: "{{ description }}"
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
            statusCategory:
              colorName: "{{ colorName }}"
              id: {{ id }}
              key: "{{ key }}"
              name: "{{ name }}"
              self: "{{ self }}"
          summary: "{{ summary }}"
          timetracking:
            originalEstimate: "{{ originalEstimate }}"
            originalEstimateSeconds: {{ originalEstimateSeconds }}
            remainingEstimate: "{{ remainingEstimate }}"
            remainingEstimateSeconds: {{ remainingEstimateSeconds }}
            timeSpent: "{{ timeSpent }}"
            timeSpentSeconds: {{ timeSpentSeconds }}
        id: "{{ id }}"
        key: "{{ key }}"
        self: "{{ self }}"
    - name: outward_issue
      description: |
        The ID or key of a linked issue.
      value:
        fields:
          assignee:
            accountId: "{{ accountId }}"
            accountType: "{{ accountType }}"
            active: {{ active }}
            avatarUrls:
              16x16: "{{ 16x16 }}"
              24x24: "{{ 24x24 }}"
              32x32: "{{ 32x32 }}"
              48x48: "{{ 48x48 }}"
            displayName: "{{ displayName }}"
            emailAddress: "{{ emailAddress }}"
            key: "{{ key }}"
            name: "{{ name }}"
            self: "{{ self }}"
            timeZone: "{{ timeZone }}"
          issueType:
            avatarId: {{ avatarId }}
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
          issuetype:
            avatarId: {{ avatarId }}
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
          priority:
            avatarId: {{ avatarId }}
            description: "{{ description }}"
            iconUrl: "{{ iconUrl }}"
            id: "{{ id }}"
            isDefault: {{ isDefault }}
            name: "{{ name }}"
            schemes:
              maxResults: {{ maxResults }}
              startAt: {{ startAt }}
              total: {{ total }}
            self: "{{ self }}"
            statusColor: "{{ statusColor }}"
          status:
            description: "{{ description }}"
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
            statusCategory:
              colorName: "{{ colorName }}"
              id: {{ id }}
              key: "{{ key }}"
              name: "{{ name }}"
              self: "{{ self }}"
          summary: "{{ summary }}"
          timetracking:
            originalEstimate: "{{ originalEstimate }}"
            originalEstimateSeconds: {{ originalEstimateSeconds }}
            remainingEstimate: "{{ remainingEstimate }}"
            remainingEstimateSeconds: {{ remainingEstimateSeconds }}
            timeSpent: "{{ timeSpent }}"
            timeSpentSeconds: {{ timeSpentSeconds }}
        id: "{{ id }}"
        key: "{{ key }}"
        self: "{{ self }}"
    - name: type
      description: |
        This object is used as follows:
        *  In the [ issueLink](#api-rest-api-3-issueLink-post) resource it defines and reports on the type of link between the issues. Find a list of issue link types with [Get issue link types](#api-rest-api-3-issueLinkType-get).
        *  In the [ issueLinkType](#api-rest-api-3-issueLinkType-post) resource it defines and reports on issue link types.
      value:
        id: "{{ id }}"
        inward: "{{ inward }}"
        name: "{{ name }}"
        outward: "{{ outward }}"
        self: "{{ self }}"
`}</CodeBlock>

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

Deletes an issue link.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:**&lt;br /&gt;&lt;br /&gt; *  Browse project &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for all the projects containing the issues in the link.&lt;br /&gt; *  *Link issues* &#91;project permission&#93;(https:​//confluence.atlassian.com/x/yodKLg) for at least one of the projects containing issues in the link.&lt;br /&gt; *  If &#91;issue-level security&#93;(https:​//confluence.atlassian.com/x/J4lKLg) is configured, permission to view both of the issues.

```sql
DELETE FROM jira.issues.links
WHERE link_id = '{{ link_id }}' --required
AND cloud_id = '{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set
;
```
</TabItem>
</Tabs>
