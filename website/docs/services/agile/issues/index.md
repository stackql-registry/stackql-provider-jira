--- 
title: issues
hide_title: false
hide_table_of_contents: false
keywords:
  - issues
  - agile
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the issues resource in the jira agile service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>issues</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="issues" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.agile.issues" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list_by_board_epic"
    values={[
        { label: 'list_by_board_epic', value: 'list_by_board_epic' },
        { label: 'list_by_board_sprint', value: 'list_by_board_sprint' },
        { label: 'list_by_board', value: 'list_by_board' },
        { label: 'list_by_epic', value: 'list_by_epic' },
        { label: 'get', value: 'get' },
        { label: 'list_by_sprint', value: 'list_by_sprint' },
        { label: 'list_without_epic', value: 'list_without_epic' }
    ]}
>
<TabItem value="list_by_board_epic">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_board_sprint">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_board">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_epic">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get">

Returns the requested issue.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_sprint">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_without_epic">

Returns the requested issues, at the specified page of the results.

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
    <td>The ID of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="changelog" /></td>
    <td><code>object</code></td>
    <td>Details of changelogs associated with the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="editmeta" /></td>
    <td><code>object</code></td>
    <td>The metadata for the fields on the issue that can be amended.</td>
</tr>
<tr>
    <td><CopyableCode code="fields" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fields_to_include" /></td>
    <td><code>object</code></td>
    <td> (wire: fieldsToInclude)</td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The key of the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="names" /></td>
    <td><code>object</code></td>
    <td>The ID and name of each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="operations" /></td>
    <td><code>object</code></td>
    <td>The operations that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="properties" /></td>
    <td><code>object</code></td>
    <td>Details of the issue properties identified in the request.</td>
</tr>
<tr>
    <td><CopyableCode code="rendered_fields" /></td>
    <td><code>object</code></td>
    <td>The rendered value of each field present on the issue. (wire: renderedFields)</td>
</tr>
<tr>
    <td><CopyableCode code="schema" /></td>
    <td><code>object</code></td>
    <td>The schema describing each field present on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="self" /></td>
    <td><code>string (uri)</code></td>
    <td>The URL of the issue details.</td>
</tr>
<tr>
    <td><CopyableCode code="transitions" /></td>
    <td><code>array</code></td>
    <td>The transitions that can be performed on the issue.</td>
</tr>
<tr>
    <td><CopyableCode code="versioned_representations" /></td>
    <td><code>object</code></td>
    <td>The versions of each field on the issue. (wire: versionedRepresentations)</td>
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
    <td><a href="#list_by_board_epic"><CopyableCode code="list_by_board_epic" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-epic_id"><code>epic_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all issues that belong to an epic on the board, for the given epic ID and the board ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.</td>
</tr>
<tr>
    <td><a href="#list_by_board_sprint"><CopyableCode code="list_by_board_sprint" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Get all issues you have access to that belong to the sprint from the board. Result pagination is token-based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from this resource contains additional fields like: sprint, closedSprints, flagged, and epic. Issues are returned ordered by rank. JQL order has higher priority than default rank.</td>
</tr>
<tr>
    <td><a href="#list_by_board"><CopyableCode code="list_by_board" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-board_id"><code>board_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all issues from a board, for a given board ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belong to scrum boards. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.</td>
</tr>
<tr>
    <td><a href="#list_by_epic"><CopyableCode code="list_by_epic" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-epic_id_or_key"><code>epic_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all issues that belong to the epic, for the given epic ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a Team Managed project, do not use this operation. Instead, search for issues that belong to an epic by using the &#91;Search for issues using JQL enhanced search&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) operation in the Jira platform REST API. Build your JQL query using the `parent` clause. For more information on the `parent` JQL field, see &#91;Advanced searching&#93;(https:​//confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-issue_id_or_key"><code>issue_id_or_key</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a>, <a href="#parameter-update_history"><code>update_history</code></a></td>
    <td>Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.</td>
</tr>
<tr>
    <td><a href="#list_by_sprint"><CopyableCode code="list_by_sprint" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-sprint_id"><code>sprint_id</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all issues in a sprint, for a given sprint ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.</td>
</tr>
<tr>
    <td><a href="#list_without_epic"><CopyableCode code="list_without_epic" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td><a href="#parameter-next_page_token"><code>next_page_token</code></a>, <a href="#parameter-max_results"><code>max_results</code></a>, <a href="#parameter-reconcile_issues"><code>reconcile_issues</code></a>, <a href="#parameter-jql"><code>jql</code></a>, <a href="#parameter-validate_query"><code>validate_query</code></a>, <a href="#parameter-fields"><code>fields</code></a>, <a href="#parameter-expand"><code>expand</code></a></td>
    <td>Returns all issues that do not belong to any epic. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a Team Managed project, do not use this operation. Instead, search for issues that don't belong to an epic by using the &#91;Search for issues using JQL enhanced search&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) operation in the Jira platform REST API. Build your JQL query using the `parent is empty` clause. For more information on the `parent` JQL field, see &#91;Advanced searching&#93;(https:​//confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).</td>
</tr>
<tr>
    <td><a href="#rank"><CopyableCode code="rank" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.&lt;br /&gt;&lt;br /&gt;This operation may fail for some issues, although this will be rare. In that case the 207 status code is returned for the whole response and detailed information regarding each issue is available in the response body.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.</td>
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
<tr id="parameter-board_id">
    <td><CopyableCode code="board_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the board that contains the requested issues.</td>
</tr>
<tr id="parameter-cloud_id">
    <td><CopyableCode code="cloud_id" /></td>
    <td><code>string</code></td>
    <td>The cloud ID of the Jira Cloud site. Resolved from ATLASSIAN_CLOUD_ID when set; SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '&lt;site&gt;' answers it. (x-stackQL-envVar: ATLASSIAN_CLOUD_ID)</td>
</tr>
<tr id="parameter-epic_id">
    <td><CopyableCode code="epic_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the epic that contains the requested issues.</td>
</tr>
<tr id="parameter-epic_id_or_key">
    <td><CopyableCode code="epic_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the epic that contains the requested issues.</td>
</tr>
<tr id="parameter-issue_id_or_key">
    <td><CopyableCode code="issue_id_or_key" /></td>
    <td><code>string</code></td>
    <td>The ID or key of the requested issue.</td>
</tr>
<tr id="parameter-sprint_id">
    <td><CopyableCode code="sprint_id" /></td>
    <td><code>integer (int64)</code></td>
    <td>The ID of the sprint that contains the requested issues.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>A comma-separated list of the parameters to expand.</td>
</tr>
<tr id="parameter-fields">
    <td><CopyableCode code="fields" /></td>
    <td><code>array</code></td>
    <td>The list of fields to return for each issue. By default, all navigable and Software project fields are returned.</td>
</tr>
<tr id="parameter-jql">
    <td><CopyableCode code="jql" /></td>
    <td><code>string</code></td>
    <td>Filters results using a JQL query. If you define an order in your JQL query, it will override the default order of the returned issues.   Note that `username` and `userkey` can't be used as search terms for this parameter due to privacy reasons. Use `accountId` instead.</td>
</tr>
<tr id="parameter-max_results">
    <td><CopyableCode code="max_results" /></td>
    <td><code>integer (int32)</code></td>
    <td>The maximum number of items to return per page. To manage page size, the API may return fewer items per page where there is a large number of fields or properties returned. It returns max 5000 issues. (wire: maxResults)</td>
</tr>
<tr id="parameter-next_page_token">
    <td><CopyableCode code="next_page_token" /></td>
    <td><code>string</code></td>
    <td>The token for a page to fetch that is not the first page. The first page has a `nextPageToken` of `null`. Use the `nextPageToken` to fetch the next page of issues.  Note: The `nextPageToken` field is **not included** in the response for the last page, indicating there is no next page. (wire: nextPageToken)</td>
</tr>
<tr id="parameter-reconcile_issues">
    <td><CopyableCode code="reconcile_issues" /></td>
    <td><code>array</code></td>
    <td>Strong consistency issue IDs to be reconciled with search results. Accepts max 50 IDs. This list of IDs should be consistent with each paginated request across different pages. (wire: reconcileIssues)</td>
</tr>
<tr id="parameter-update_history">
    <td><CopyableCode code="update_history" /></td>
    <td><code>boolean</code></td>
    <td>A boolean indicating whether the issue retrieved by this method should be added to the current user's issue history (wire: updateHistory)</td>
</tr>
<tr id="parameter-validate_query">
    <td><CopyableCode code="validate_query" /></td>
    <td><code>boolean</code></td>
    <td>Specifies whether to validate the JQL query or not. Default: true. (wire: validateQuery)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list_by_board_epic"
    values={[
        { label: 'list_by_board_epic', value: 'list_by_board_epic' },
        { label: 'list_by_board_sprint', value: 'list_by_board_sprint' },
        { label: 'list_by_board', value: 'list_by_board' },
        { label: 'list_by_epic', value: 'list_by_epic' },
        { label: 'get', value: 'get' },
        { label: 'list_by_sprint', value: 'list_by_sprint' },
        { label: 'list_without_epic', value: 'list_without_epic' }
    ]}
>
<TabItem value="list_by_board_epic">

Returns all issues that belong to an epic on the board, for the given epic ID and the board ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE board_id = '{{ board_id }}' -- required
AND epic_id = '{{ epic_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list_by_board_sprint">

Get all issues you have access to that belong to the sprint from the board. Result pagination is token-based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. Issues returned from this resource contains additional fields like: sprint, closedSprints, flagged, and epic. Issues are returned ordered by rank. JQL order has higher priority than default rank.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE board_id = '{{ board_id }}' -- required
AND sprint_id = '{{ sprint_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list_by_board">

Returns all issues from a board, for a given board ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Note, if the user does not have permission to view the board, no issues will be returned at all. An issue belongs to the board if its status is mapped to the board's column. Epic issues do not belong to scrum boards. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE board_id = '{{ board_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list_by_epic">

Returns all issues that belong to the epic, for the given epic ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a Team Managed project, do not use this operation. Instead, search for issues that belong to an epic by using the [Search for issues using JQL enhanced search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) operation in the Jira platform REST API. Build your JQL query using the `parent` clause. For more information on the `parent` JQL field, see [Advanced searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE epic_id_or_key = '{{ epic_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="get">

Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields, like sprint, closedSprints, flagged, and epic.

```sql
SELECT
id,
expand,
fields,
key,
self
FROM jira.agile.issues
WHERE issue_id_or_key = '{{ issue_id_or_key }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
AND update_history = '{{ update_history }}'
;
```
</TabItem>
<TabItem value="list_by_sprint">

Returns all issues in a sprint, for a given sprint ID. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank.

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE sprint_id = '{{ sprint_id }}' -- required
AND cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
<TabItem value="list_without_epic">

Returns all issues that do not belong to any epic. Result pagination is token based, using `nextPageToken` and `maxResults`. This only includes issues that the user has permission to view. Issues returned from this resource include Software project fields, like sprint, closedSprints, flagged, and epic. By default, the returned issues are ordered by rank. **Note:** If you are querying a Team Managed project, do not use this operation. Instead, search for issues that don't belong to an epic by using the [Search for issues using JQL enhanced search](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-rest-api-3-search-jql-get) operation in the Jira platform REST API. Build your JQL query using the `parent is empty` clause. For more information on the `parent` JQL field, see [Advanced searching](https://confluence.atlassian.com/x/dAiiLQ#Advancedsearching-fieldsreference-Parent).

```sql
SELECT
id,
changelog,
editmeta,
fields,
fields_to_include,
key,
names,
operations,
properties,
rendered_fields,
schema,
self,
transitions,
versioned_representations
FROM jira.agile.issues
WHERE cloud_id = '{{ cloud_id }}' -- required unless ATLASSIAN_CLOUD_ID is set
AND next_page_token = '{{ next_page_token }}'
AND max_results = '{{ max_results }}'
AND reconcile_issues = '{{ reconcile_issues }}'
AND jql = '{{ jql }}'
AND validate_query = '{{ validate_query }}'
AND fields = '{{ fields }}'
AND expand = '{{ expand }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="rank"
    values={[
        { label: 'rank', value: 'rank' }
    ]}
>
<TabItem value="rank">

Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.&lt;br /&gt;&lt;br /&gt;This operation may fail for some issues, although this will be rare. In that case the 207 status code is returned for the whole response and detailed information regarding each issue is available in the response body.&lt;br /&gt;&lt;br /&gt;If rankCustomFieldId is not defined, the default rank field will be used.

```sql
EXEC jira.agile.issues.rank 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"issues": "{{ issues }}", 
"rankAfterIssue": "{{ rankAfterIssue }}", 
"rankBeforeIssue": "{{ rankBeforeIssue }}", 
"rankCustomFieldId": {{ rankCustomFieldId }}
}'
;
```
</TabItem>
</Tabs>
