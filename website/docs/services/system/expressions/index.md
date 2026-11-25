--- 
title: expressions
hide_title: false
hide_table_of_contents: false
keywords:
  - expressions
  - system
  - jira
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: "Query, deploy and manage the expressions resource in the jira system service using SQL"
custom_edit_url: null
image: /img/stackql-jira-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists an <code>expressions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="expressions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="jira.system.expressions" /></td></tr>
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
    <td><a href="#analyse"><CopyableCode code="analyse" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-expressions"><code>expressions</code></a></td>
    <td><a href="#parameter-check"><code>check</code></a></td>
    <td>Analyses and validates Jira expressions.&lt;br /&gt;&lt;br /&gt;As an experimental feature, this operation can also attempt to type-check the expressions.&lt;br /&gt;&lt;br /&gt;Learn more about Jira expressions in the &#91;documentation&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required**: None.</td>
</tr>
<tr>
    <td><a href="#evaluate"><CopyableCode code="evaluate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_id"><code>cloud_id</code></a>, <a href="#parameter-expression"><code>expression</code></a></td>
    <td><a href="#parameter-expand"><code>expand</code></a></td>
    <td>Evaluates a Jira expression and returns its value. The difference between this and `eval` is that this endpoint uses the enhanced search API when evaluating JQL queries. This API is eventually consistent, unlike the strongly consistent `eval` API. This allows for better performance and scalability. In addition, this API's response for JQL evaluation is based on a scrolling view (backed by a `nextPageToken`) instead of a paginated view (backed by `startAt` and `totalCount`).&lt;br /&gt;&lt;br /&gt;This resource can be used to test Jira expressions that you plan to use elsewhere, or to fetch data in a flexible way. Consult the &#91;Jira expressions documentation&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/) for more details.&lt;br /&gt;&lt;br /&gt;#### Context variables ####&lt;br /&gt;&lt;br /&gt;The following context variables are available to Jira expressions evaluated by this resource. Their presence depends on various factors; usually you need to manually request them in the context object sent in the payload, but some of them are added automatically under certain conditions.&lt;br /&gt;&lt;br /&gt; *  `user` (&#91;User&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)): The current user. Always available and equal to `null` if the request is anonymous.&lt;br /&gt; *  `app` (&#91;App&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)): The &#91;Connect app&#93;(https:​//developer.atlassian.com/cloud/jira/platform/index/#connect-apps) that made the request. Available only for authenticated requests made by Connect apps (read more here: &#91;Authentication for Connect apps&#93;(https:​//developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).&lt;br /&gt; *  `issue` (&#91;Issue&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): The current issue. Available only when the issue is provided in the request context object.&lt;br /&gt; *  `issues` (&#91;List&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list) of &#91;Issues&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): A collection of issues matching a JQL query. Available only when JQL is provided in the request context object.&lt;br /&gt; *  `project` (&#91;Project&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)): The current project. Available only when the project is provided in the request context object.&lt;br /&gt; *  `sprint` (&#91;Sprint&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)): The current sprint. Available only when the sprint is provided in the request context object.&lt;br /&gt; *  `board` (&#91;Board&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)): The current board. Available only when the board is provided in the request context object.&lt;br /&gt; *  `serviceDesk` (&#91;ServiceDesk&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)): The current service desk. Available only when the service desk is provided in the request context object.&lt;br /&gt; *  `customerRequest` (&#91;CustomerRequest&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)): The current customer request. Available only when the customer request is provided in the request context object.&lt;br /&gt;&lt;br /&gt;In addition, you can pass custom context variables along with their types. You can then access them from the Jira expression by key. You can use the following variables in a custom context:&lt;br /&gt;&lt;br /&gt; *  `user`: A &#91;user&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.&lt;br /&gt; *  `issue`: An &#91;issue&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.&lt;br /&gt; *  `json`: A JSON object containing custom content.&lt;br /&gt; *  `list`: A JSON list of `user`, `issue`, or `json` variable types.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required**: None. However, an expression may return different results for different users depending on their permissions. For example, different users may see different comments on the same issue.  &lt;br /&gt;Permission to access Jira Software is required to access Jira Software context variables (`board` and `sprint`) or fields (for example, `issue.sprint`).</td>
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
<tr id="parameter-check">
    <td><CopyableCode code="check" /></td>
    <td><code>string</code></td>
    <td>The check to perform:   *  `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are validated. For example, the expression's length.  *  `type` EXPERIMENTAL. Each expression is type checked and the final type of the expression inferred. Any type errors that would result in the expression failure at runtime are reported. For example, accessing properties that don't exist or passing the wrong number of arguments to functions. Also performs the syntax check.  *  `complexity` EXPERIMENTAL. Determines the formulae for how many &#91;expensive operations&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each expression may execute.</td>
</tr>
<tr id="parameter-expand">
    <td><CopyableCode code="expand" /></td>
    <td><code>string</code></td>
    <td>Use &#91;expand&#93;(#expansion) to include additional information in the response. This parameter accepts `meta.complexity` that returns information about the expression complexity. For example, the number of expensive operations used by the expression and how close the expression is to reaching the &#91;complexity limit&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/#restrictions). Useful when designing and debugging your expressions.</td>
</tr>
</tbody>
</table>

## Lifecycle Methods

EXEC variables use wire (API) names.

<Tabs
    defaultValue="analyse"
    values={[
        { label: 'analyse', value: 'analyse' },
        { label: 'evaluate', value: 'evaluate' }
    ]}
>
<TabItem value="analyse">

Analyses and validates Jira expressions.&lt;br /&gt;&lt;br /&gt;As an experimental feature, this operation can also attempt to type-check the expressions.&lt;br /&gt;&lt;br /&gt;Learn more about Jira expressions in the &#91;documentation&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/).&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required**: None.

```sql
EXEC jira.system.expressions.analyse 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@check='{{ check }}' 
@@json=
'{
"contextVariables": "{{ contextVariables }}", 
"expressions": "{{ expressions }}"
}'
;
```
</TabItem>
<TabItem value="evaluate">

Evaluates a Jira expression and returns its value. The difference between this and `eval` is that this endpoint uses the enhanced search API when evaluating JQL queries. This API is eventually consistent, unlike the strongly consistent `eval` API. This allows for better performance and scalability. In addition, this API's response for JQL evaluation is based on a scrolling view (backed by a `nextPageToken`) instead of a paginated view (backed by `startAt` and `totalCount`).&lt;br /&gt;&lt;br /&gt;This resource can be used to test Jira expressions that you plan to use elsewhere, or to fetch data in a flexible way. Consult the &#91;Jira expressions documentation&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions/) for more details.&lt;br /&gt;&lt;br /&gt;#### Context variables ####&lt;br /&gt;&lt;br /&gt;The following context variables are available to Jira expressions evaluated by this resource. Their presence depends on various factors; usually you need to manually request them in the context object sent in the payload, but some of them are added automatically under certain conditions.&lt;br /&gt;&lt;br /&gt; *  `user` (&#91;User&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)): The current user. Always available and equal to `null` if the request is anonymous.&lt;br /&gt; *  `app` (&#91;App&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)): The &#91;Connect app&#93;(https:​//developer.atlassian.com/cloud/jira/platform/index/#connect-apps) that made the request. Available only for authenticated requests made by Connect apps (read more here: &#91;Authentication for Connect apps&#93;(https:​//developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).&lt;br /&gt; *  `issue` (&#91;Issue&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): The current issue. Available only when the issue is provided in the request context object.&lt;br /&gt; *  `issues` (&#91;List&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list) of &#91;Issues&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): A collection of issues matching a JQL query. Available only when JQL is provided in the request context object.&lt;br /&gt; *  `project` (&#91;Project&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)): The current project. Available only when the project is provided in the request context object.&lt;br /&gt; *  `sprint` (&#91;Sprint&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)): The current sprint. Available only when the sprint is provided in the request context object.&lt;br /&gt; *  `board` (&#91;Board&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)): The current board. Available only when the board is provided in the request context object.&lt;br /&gt; *  `serviceDesk` (&#91;ServiceDesk&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)): The current service desk. Available only when the service desk is provided in the request context object.&lt;br /&gt; *  `customerRequest` (&#91;CustomerRequest&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)): The current customer request. Available only when the customer request is provided in the request context object.&lt;br /&gt;&lt;br /&gt;In addition, you can pass custom context variables along with their types. You can then access them from the Jira expression by key. You can use the following variables in a custom context:&lt;br /&gt;&lt;br /&gt; *  `user`: A &#91;user&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user) specified as an Atlassian account ID.&lt;br /&gt; *  `issue`: An &#91;issue&#93;(https:​//developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue) specified by ID or key. All the fields of the issue object are available in the Jira expression.&lt;br /&gt; *  `json`: A JSON object containing custom content.&lt;br /&gt; *  `list`: A JSON list of `user`, `issue`, or `json` variable types.&lt;br /&gt;&lt;br /&gt;This operation can be accessed anonymously.&lt;br /&gt;&lt;br /&gt;**&#91;Permissions&#93;(#permissions) required**: None. However, an expression may return different results for different users depending on their permissions. For example, different users may see different comments on the same issue.  &lt;br /&gt;Permission to access Jira Software is required to access Jira Software context variables (`board` and `sprint`) or fields (for example, `issue.sprint`).

```sql
EXEC jira.system.expressions.evaluate 
@cloud_id='{{ cloud_id }}' --required unless ATLASSIAN_CLOUD_ID is set, 
@expand='{{ expand }}' 
@@json=
'{
"context": "{{ context }}", 
"expression": "{{ expression }}"
}'
;
```
</TabItem>
</Tabs>
