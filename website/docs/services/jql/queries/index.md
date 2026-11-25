--- 
title: queries
hide_title: false
hide_table_of_contents: false
keywords:
  - queries
  - jql
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the queries resource in the jira jql service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>queries</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="queries" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.jql.queries" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#parse"><CopyableCode code="parse" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-validation"><code>validation</code></a>, <a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-queries"><code>queries</code></a></td>
    <td></td>
    <td>Parses and validates JQL queries.&lt;br /&gt;&lt;br /&gt;Validation is performed in context of the current user.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.</td>
</tr>
<tr>
    <td><a href="#convert_user_identifiers"><CopyableCode code="convert_user_identifiers" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a></td>
    <td></td>
    <td>Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.&lt;br /&gt;&lt;br /&gt;You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the &#91;migration guide&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.</td>
</tr>
<tr>
    <td><a href="#sanitize"><CopyableCode code="sanitize" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-queries"><code>queries</code></a></td>
    <td></td>
    <td>Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to view the entity.&lt;br /&gt;&lt;br /&gt;For example, if the query contains the clause *project = 'Secret project'*, and a user does not have browse permission for the project "Secret project", the sanitized query replaces the clause with *project = 12345"* (where 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If the account ID is null, sanitizing is performed for an anonymous user.&lt;br /&gt;&lt;br /&gt;Note that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers (username or user key). If you need to make queries GDPR-compliant, use &#91;Convert user identifiers to account IDs in JQL queries&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).&lt;br /&gt;&lt;br /&gt;Before sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).</td>
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
<tr id="parameter-validation">
    <td><CopyableCode code="validation" /></td>
    <td><code>string</code></td>
    <td>How to validate the JQL query and treat the validation results. Validation options include:   *  `strict` Returns all errors. If validation fails, the query structure is not returned.  *  `warn` Returns all errors. If validation fails but the JQL query is correctly formed, the query structure is returned.  *  `none` No validation is performed. If JQL query is correctly formed, the query structure is returned.</td>
</tr>
</tbody>
</table>

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="parse"
    values={[
        { label: 'parse', value: 'parse' },
        { label: 'convert_user_identifiers', value: 'convert_user_identifiers' },
        { label: 'sanitize', value: 'sanitize' }
    ]}
>
<TabItem value="parse">

Parses and validates JQL queries.&lt;br /&gt;&lt;br /&gt;Validation is performed in context of the current user.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** None.

```sql
EXEC jira.jql.queries.parse 
@validation='{{ validation }}' --required, 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"queries": "{{ queries }}"
}'
;
```
</TabItem>
<TabItem value="convert_user_identifiers">

Converts one or more JQL queries with user identifiers (username or user key) to equivalent JQL queries with account IDs.&lt;br /&gt;&lt;br /&gt;You may wish to use this operation if your system stores JQL queries and you want to make them GDPR-compliant. For more information about GDPR-related changes, see the &#91;migration guide&#93;(https:​//developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** Permission to access Jira.

```sql
EXEC jira.jql.queries.convert_user_identifiers 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"queryStrings": "{{ queryStrings }}"
}'
;
```
</TabItem>
<TabItem value="sanitize">

Sanitizes one or more JQL queries by converting readable details into IDs where a user doesn't have permission to view the entity.&lt;br /&gt;&lt;br /&gt;For example, if the query contains the clause *project = 'Secret project'*, and a user does not have browse permission for the project "Secret project", the sanitized query replaces the clause with *project = 12345"* (where 12345 is the ID of the project). If a user has the required permission, the clause is not sanitized. If the account ID is null, sanitizing is performed for an anonymous user.&lt;br /&gt;&lt;br /&gt;Note that sanitization doesn't make the queries GDPR-compliant, because it doesn't remove user identifiers (username or user key). If you need to make queries GDPR-compliant, use &#91;Convert user identifiers to account IDs in JQL queries&#93;(https:​//developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-rest-api-3-jql-sanitize-post).&lt;br /&gt;&lt;br /&gt;Before sanitization each JQL query is parsed. The queries are returned in the same order that they were passed.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required:** *Administer Jira* &#91;global permission&#93;(https:​//confluence.atlassian.com/x/x4dKLg).

```sql
EXEC jira.jql.queries.sanitize 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set 
@@json=
'{
"queries": "{{ queries }}"
}'
;
```
</TabItem>
</Tabs>
