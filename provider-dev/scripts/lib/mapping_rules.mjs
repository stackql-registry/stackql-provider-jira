// Exceptions to the mechanical derivation in lib/mapping.mjs, shared by
// map_operations.mjs (naming operations new to the all_services.csv
// dictionary; a rule change does not rename operations already in it) and
// build_inventory.mjs (proposed columns).
// Patterns match the vendor path with every parameter collapsed to {};
// RESOURCE_RULES match a node (the path with its trailing parameters
// removed) and rename the resource every operation on that node lands in;
// METHOD_RULES match one operation (verb + path) and may set its resource,
// method, SQL verb, objectKey, or a skip code. Every rule must match
// something (map_operations fails on a stale rule).
//
// House conventions the rules apply, so names stay stable across refreshes:
//   - where Jira offers an older "get all" read and a newer paginated search
//     returning the same entity, the search is the resource's `list` and the
//     older read is EXEC `list_all` (unless the vendor deprecated it, then it
//     is skip-coded deprecated_superseded)
//   - a global "<scheme> to project" mapping read is
//     `<scheme>_project_associations`; the projects using one scheme are
//     `<scheme>_projects`
//   - POST reads (bulk fetch by ids, validations, previews) are EXEC on the
//     resource they read
//   - actions are EXEC on the resource they act on (issues.transition,
//     issues.assign, projects.archive, sprints.move_issues)

const A = '/rest/api/3';
const AG = '/rest/agile/1.0';
const SW = '/rest/software/1.0';
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
// exact match of a normalized path or node
const P = (p) => new RegExp(`^${esc(p)}$`);

export const RESOURCE_RULES = [
  // ---------------------------------------------------------------- issues
  { service: 'issues', re: P(`${A}/attachment/meta`), resource: 'attachment_settings' },
  { service: 'issues', re: P(`${A}/attachment/{}/expand/human`), resource: 'attachment_archive_entries' },
  { service: 'issues', re: P(`${A}/attachment/{}/expand/raw`), resource: 'attachment_archive_raw_entries' },
  { service: 'issues', re: P(`${A}/bulk/issues/fields`), resource: 'bulk_editable_fields' },
  { service: 'issues', re: P(`${A}/bulk/issues/transition`), resource: 'bulk_transitions' },
  { service: 'issues', re: P(`${A}/bulk/queue`), resource: 'bulk_tasks' },
  { service: 'issues', re: P(`${A}/issue/{}/editmeta`), resource: 'edit_meta' },
  { service: 'issues', re: P(`${A}/issue/limit/report`), resource: 'issue_limit_reports' },
  { service: 'issues', re: P(`${A}/issue/limit/adf/report`), resource: 'adf_limit_reports' },
  { service: 'issues', re: P(`${A}/issue/picker`), resource: 'picker_suggestions' },
  { service: 'issues', re: P(`${A}/issue/{}/properties`), resource: 'issue_properties' },
  { service: 'issues', re: P(`${A}/events`), resource: 'issue_events' },
  { service: 'issues', re: P(`${A}/redact/status`), resource: 'redaction_jobs' },
  { service: 'issues', re: P(`${A}/worklog/deleted`), resource: 'deleted_worklogs' },
  { service: 'issues', re: P(`${A}/worklog/updated`), resource: 'updated_worklogs' },
  // --------------------------------------------------------------- projects
  { service: 'projects', re: P(`${A}/project/recent`), resource: 'recent_projects' },
  { service: 'projects', re: P(`${A}/project/type`), resource: 'project_types' },
  { service: 'projects', re: P(`${A}/project/type/accessible`), resource: 'accessible_project_types' },
  { service: 'projects', re: P(`${A}/project/type/{}/accessible`), resource: 'accessible_project_types' },
  { service: 'projects', re: P(`${A}/project/{}/avatars`), resource: 'project_avatars' },
  { service: 'projects', re: P(`${A}/project/{}/email`), resource: 'project_emails' },
  { service: 'projects', re: P(`${A}/project/{}/hierarchy`), resource: 'project_hierarchy_levels' },
  { service: 'projects', re: P(`${A}/project/{}/features`), resource: 'project_features' },
  { service: 'projects', re: P(`${A}/project/{}/properties`), resource: 'project_properties' },
  { service: 'projects', re: P(`${A}/project/{}/statuses`), resource: 'project_statuses' },
  { service: 'projects', re: P(`${A}/project/{}/notificationscheme`), resource: 'project_notification_schemes' },
  { service: 'projects', re: P(`${A}/project/{}/role`), resource: 'project_roles' },
  { service: 'projects', re: P(`${A}/component/{}/relatedIssueCounts`), resource: 'component_issue_counts' },
  { service: 'projects', re: P(`${A}/version/{}/relatedIssueCounts`), resource: 'version_issue_counts' },
  { service: 'projects', re: P(`${A}/version/{}/unresolvedIssueCount`), resource: 'version_unresolved_issue_counts' },
  { service: 'projects', re: P(`${A}/version/{}/relatedwork`), resource: 'version_related_works' },
  { service: 'projects', re: P(`${A}/role/{}/actors`), resource: 'default_role_actors' },
  { service: 'projects', re: P(`${A}/projectvalidate/key`), resource: 'project_key_validations' },
  { service: 'projects', re: P(`${A}/projectvalidate/validProjectKey`), resource: 'valid_project_keys' },
  { service: 'projects', re: P(`${A}/projectvalidate/validProjectName`), resource: 'valid_project_names' },
  { service: 'projects', re: P(`${A}/policies/project`), resource: 'project_policies' },
  { service: 'projects', re: P(`${A}/policies/project/{}/rules`), resource: 'project_policy_rules' },
  { service: 'projects', re: P(`${A}/project-template/live-template`), resource: 'project_templates' },
  // ------------------------------------------------------------------ users
  { service: 'users', re: P(`${A}/myself`), resource: 'myself' },
  { service: 'users', re: P(`${A}/mypreferences/locale`), resource: 'my_locales' },
  { service: 'users', re: P(`${A}/user/assignable/search`), resource: 'assignable_users' },
  { service: 'users', re: P(`${A}/user/assignable/multiProjectSearch`), resource: 'multi_project_assignable_users' },
  { service: 'users', re: P(`${A}/user/bulk`), resource: 'bulk_users' },
  { service: 'users', re: P(`${A}/user/bulk/migration`), resource: 'user_migrations' },
  { service: 'users', re: P(`${A}/user/columns`), resource: 'user_columns' },
  { service: 'users', re: P(`${A}/user/email`), resource: 'user_emails' },
  { service: 'users', re: P(`${A}/user/email/bulk`), resource: 'bulk_user_emails' },
  { service: 'users', re: P(`${A}/user/groups`), resource: 'user_groups' },
  { service: 'users', re: P(`${A}/user/permission/search`), resource: 'users_with_permissions' },
  { service: 'users', re: P(`${A}/user/picker`), resource: 'user_picker_suggestions' },
  { service: 'users', re: P(`${A}/user/properties`), resource: 'user_properties' },
  { service: 'users', re: P(`${A}/user/search`), resource: 'user_search_results' },
  { service: 'users', re: P(`${A}/user/search/query`), resource: 'user_query_results' },
  { service: 'users', re: P(`${A}/user/search/query/key`), resource: 'user_key_query_results' },
  { service: 'users', re: P(`${A}/user/viewissue/search`), resource: 'users_with_browse_permission' },
  { service: 'users', re: P(`${A}/group/bulk`), resource: 'groups' },
  { service: 'users', re: P(`${A}/group/member`), resource: 'group_members' },
  { service: 'users', re: P(`${A}/group/user`), resource: 'group_members' },
  { service: 'users', re: P(`${A}/groups/picker`), resource: 'group_picker_suggestions' },
  { service: 'users', re: P(`${A}/groupuserpicker`), resource: 'group_user_picker_suggestions' },
  // ------------------------------------------------------------ permissions
  { service: 'permissions', re: P(`${A}/issuesecurityschemes/level`), resource: 'issue_security_levels' },
  { service: 'permissions', re: P(`${A}/securitylevel`), resource: 'issue_security_levels' },
  { service: 'permissions', re: P(`${A}/issuesecurityschemes/level/member`), resource: 'issue_security_level_members' },
  { service: 'permissions', re: P(`${A}/issuesecurityschemes/project`), resource: 'issue_security_scheme_project_associations' },
  { service: 'permissions', re: P(`${A}/issuesecurityschemes/{}/members`), resource: 'issue_security_scheme_members' },
  { service: 'permissions', re: P(`${A}/permissionscheme/{}/permission`), resource: 'permission_grants' },
  { service: 'permissions', re: P(`${A}/project/{}/issuesecuritylevelscheme`), resource: 'project_issue_security_schemes' },
  { service: 'permissions', re: P(`${A}/project/{}/permissionscheme`), resource: 'project_permission_schemes' },
  { service: 'permissions', re: P(`${A}/project/{}/securitylevel`), resource: 'project_security_levels' },
  // -------------------------------------------------------------- workflows
  { service: 'workflows', re: P(`${A}/workflow/{}/project/{}/issueTypeUsages`), resource: 'workflow_issue_type_usages' },
  { service: 'workflows', re: P(`${A}/workflow/{}/projectUsages`), resource: 'workflow_project_usages' },
  { service: 'workflows', re: P(`${A}/workflow/{}/workflowSchemes`), resource: 'workflow_scheme_usages' },
  { service: 'workflows', re: P(`${A}/workflows/capabilities`), resource: 'workflow_capabilities' },
  { service: 'workflows', re: P(`${A}/workflows/defaultEditor`), resource: 'workflow_default_editors' },
  { service: 'workflows', re: P(`${A}/statuses/{}/project/{}/issueTypeUsages`), resource: 'status_issue_type_usages' },
  { service: 'workflows', re: P(`${A}/statuses/{}/projectUsages`), resource: 'status_project_usages' },
  { service: 'workflows', re: P(`${A}/statuses/{}/workflowUsages`), resource: 'status_workflow_usages' },
  { service: 'workflows', re: P(`${A}/workflowscheme/project`), resource: 'workflow_scheme_project_associations' },
  { service: 'workflows', re: P(`${A}/workflowscheme/{}/projectUsages`), resource: 'workflow_scheme_project_usages' },
  // ----------------------------------------------------------------- fields
  { service: 'fields', re: P(`${A}/config/fieldschemes`), resource: 'field_schemes' },
  { service: 'fields', re: P(`${A}/config/fieldschemes/projects`), resource: 'field_scheme_project_associations' },
  { service: 'fields', re: P(`${A}/config/fieldschemes/{}/projects`), resource: 'field_scheme_projects' },
  { service: 'fields', re: P(`${A}/config/fieldschemes/{}/fields`), resource: 'field_scheme_fields' },
  { service: 'fields', re: P(`${A}/config/fieldschemes/{}/fields/{}/parameters`), resource: 'field_scheme_field_parameters' },
  { service: 'fields', re: P(`${A}/customFieldOption`), resource: 'custom_field_options' },
  { service: 'fields', re: P(`${A}/field/search/trashed`), resource: 'trashed_fields' },
  { service: 'fields', re: P(`${A}/field/{}/association/project`), resource: 'field_project_associations' },
  { service: 'fields', re: P(`${A}/field/{}/context`), resource: 'custom_field_contexts' },
  { service: 'fields', re: P(`${A}/field/{}/context/defaultValues`), resource: 'custom_field_context_default_values' },
  { service: 'fields', re: P(`${A}/field/{}/context/issuetypemapping`), resource: 'custom_field_context_issue_type_mappings' },
  { service: 'fields', re: P(`${A}/field/{}/context/projectmapping`), resource: 'custom_field_context_project_mappings' },
  { service: 'fields', re: P(`${A}/field/{}/context/{}/option`), resource: 'custom_field_options' },
  { service: 'fields', re: P(`${A}/fieldconfiguration/{}/fields`), resource: 'field_configuration_items' },
  { service: 'fields', re: P(`${A}/fieldconfigurationscheme/project`), resource: 'field_configuration_scheme_project_associations' },
  { service: 'fields', re: P(`${A}/projects/fields`), resource: 'project_fields' },
  // ------------------------------------------------------------ issue_types
  { service: 'issue_types', re: P(`${A}/issuetype/project`), resource: 'project_issue_types' },
  { service: 'issue_types', re: P(`${A}/issuetypescheme/project`), resource: 'issue_type_scheme_project_associations' },
  { service: 'issue_types', re: P(`${A}/issuetypescreenscheme/project`), resource: 'issue_type_screen_scheme_project_associations' },
  { service: 'issue_types', re: P(`${A}/issuetypescreenscheme/{}/project`), resource: 'issue_type_screen_scheme_projects' },
  // ---------------------------------------------------------------- screens
  { service: 'screens', re: P(`${A}/screens/tabs`), resource: 'all_screen_tabs' },
  { service: 'screens', re: P(`${A}/screens/{}/tabs`), resource: 'screen_tabs' },
  { service: 'screens', re: P(`${A}/screens/{}/tabs/{}/fields`), resource: 'screen_tab_fields' },
  { service: 'screens', re: P(`${A}/screens/{}/availableFields`), resource: 'screen_available_fields' },
  // ------------------------------------------------------------- dashboards
  { service: 'dashboards', re: P(`${A}/dashboard/gadgets`), resource: 'available_gadgets' },
  { service: 'dashboards', re: P(`${A}/dashboard/{}/items/{}/properties`), resource: 'dashboard_item_properties' },
  // ---------------------------------------------------------------- filters
  { service: 'filters', re: P(`${A}/filter/favourite`), resource: 'favourite_filters' },
  { service: 'filters', re: P(`${A}/filter/my`), resource: 'my_filters' },
  { service: 'filters', re: P(`${A}/filter/{}/columns`), resource: 'filter_columns' },
  { service: 'filters', re: P(`${A}/filter/{}/permission`), resource: 'share_permissions' },
  // ------------------------------------------------------- issue_attributes
  { service: 'issue_attributes', re: P(`${A}/priorityscheme/priorities/available`), resource: 'available_priorities' },
  // ---------------------------------------------------------- notifications
  { service: 'notifications', re: P(`${A}/notificationscheme/project`), resource: 'notification_scheme_project_associations' },
  // -------------------------------------------------------------------- jql
  { service: 'jql', re: P(`${A}/invalid-jqls-access-log`), resource: 'invalid_jql_access_logs' },
  { service: 'jql', re: P(`${A}/jql/autocompletedata/suggestions`), resource: 'autocomplete_suggestions' },
  // ------------------------------------------------------------------ plans
  { service: 'plans', re: P(`${A}/plans/plan/{}/team/atlassian`), resource: 'plan_atlassian_teams' },
  { service: 'plans', re: P(`${A}/plans/plan/{}/team/planonly`), resource: 'plan_only_teams' },
  // ----------------------------------------------------------------- system
  { service: 'system', re: P(`${A}/application-properties/advanced-settings`), resource: 'advanced_settings' },
  { service: 'system', re: P(`${A}/auditing/record`), resource: 'audit_records' },
  { service: 'system', re: P(`${A}/avatar/{}/system`), resource: 'system_avatars' },
  { service: 'system', re: P(`${A}/configuration`), resource: 'global_settings' },
  { service: 'system', re: P(`${A}/configuration/timetracking`), resource: 'selected_time_tracking_providers' },
  { service: 'system', re: P(`${A}/configuration/timetracking/list`), resource: 'time_tracking_providers' },
  { service: 'system', re: P(`${A}/configuration/timetracking/options`), resource: 'time_tracking_settings' },
  { service: 'system', re: P(`${A}/data-policy/project`), resource: 'project_data_policies' },
  { service: 'system', re: P(`${A}/instance/license`), resource: 'licenses' },
  { service: 'system', re: P(`${A}/license/approximateLicenseCount`), resource: 'approximate_license_counts' },
  { service: 'system', re: P(`${A}/license/approximateLicenseCount/product`), resource: 'approximate_license_counts' },
  { service: 'system', re: P(`${A}/serverInfo`), resource: 'server_info' },
  { service: 'system', re: P(`${A}/settings/columns`), resource: 'issue_navigator_columns' },
  { service: 'system', re: P(`${A}/universal_avatar/type/{}/owner`), resource: 'avatars' },
  // ------------------------------------------------------------------ agile
  { service: 'agile', re: P(`${SW}/board/{}/backlog`), resource: 'board_backlog_issues' },
  { service: 'agile', re: P(`${SW}/board/{}/backlog/approximate-count`), resource: 'board_backlog_issue_counts' },
  { service: 'agile', re: P(`${SW}/board/{}/issue/approximate-count`), resource: 'board_issue_counts' },
  { service: 'agile', re: P(`${AG}/board/filter`), resource: 'filter_boards' },
  { service: 'agile', re: P(`${SW}/board/{}/epic/none/issue`), resource: 'board_issues_without_epic' },
  { service: 'agile', re: P(`${AG}/board/{}/quickfilter`), resource: 'board_quick_filters' },
  { service: 'agile', re: P(`${SW}/epic/none/issue`), resource: 'issues_without_epic' },
  // -------------------------------------------------------- atlassian_tenant
  { service: 'atlassian_tenant', re: P('/_edge/tenant_info'), resource: 'info' }
];

export const METHOD_RULES = [
  // ---------------------------------------------------------------- issues
  // JQL issue search is the issues resource's flagship read
  // POST, not GET: the body carries a provider default fields = *navigable
  // (request.base, post_process 5b); without it the API answers {id} only
  { service: 'issues', verb: 'post', re: P(`${A}/search/jql`), resource: 'issues', method: 'search', sqlVerb: 'select', objectKey: '$.issues' },
  { service: 'issues', verb: 'get', re: P(`${A}/search/jql`), resource: 'issues', method: 'search_get', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/search/approximate-count`), resource: 'issues', method: 'approximate_count', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/jql/match`), resource: 'issues', method: 'match_jql', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/{}/transitions`), resource: 'issues', method: 'transition', sqlVerb: 'exec' },
  { service: 'issues', verb: 'put', re: P(`${A}/issue/{}/assignee`), resource: 'issues', method: 'assign', sqlVerb: 'exec' },
  { service: 'issues', verb: 'put', re: P(`${A}/issue/archive`), resource: 'issues', method: 'archive', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/archive`), resource: 'issues', method: 'archive_by_jql', sqlVerb: 'exec' },
  { service: 'issues', verb: 'put', re: P(`${A}/issues/archive/export`), resource: 'issues', method: 'export_archived', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/bulk`), resource: 'issues', method: 'bulk_create', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/properties`), resource: 'issues', method: 'bulk_set_properties_by_list', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/properties/multi`), resource: 'issues', method: 'bulk_set_properties_by_issue', sqlVerb: 'exec' },
  { service: 'issues', verb: 'put', re: P(`${A}/issue/properties/{}`), resource: 'issues', method: 'bulk_set_property', sqlVerb: 'exec' },
  { service: 'issues', verb: 'delete', re: P(`${A}/issue/properties/{}`), resource: 'issues', method: 'bulk_delete_property', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/watching`), resource: 'issues', method: 'bulk_is_watching', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/delete`), resource: 'issues', method: 'bulk_delete', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/fields`), resource: 'issues', method: 'bulk_edit', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/move`), resource: 'issues', method: 'bulk_move', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/transition`), resource: 'issues', method: 'bulk_transition', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/unwatch`), resource: 'issues', method: 'bulk_unwatch', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/bulk/issues/watch`), resource: 'issues', method: 'bulk_watch', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/redact`), resource: 'issues', method: 'redact', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/changelog/bulkfetch`), resource: 'changelogs', method: 'bulk_fetch', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/{}/changelog/list`), resource: 'changelogs', method: 'list_by_ids', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/comment/list`), resource: 'comments', method: 'list_by_ids', sqlVerb: 'exec' },
  { service: 'issues', verb: 'post', re: P(`${A}/worklog/list`), resource: 'worklogs', method: 'list_by_ids', sqlVerb: 'exec' },
  { service: 'issues', verb: 'delete', re: P(`${A}/issue/{}/worklog`), resource: 'worklogs', method: 'bulk_delete', sqlVerb: 'exec' },
  { service: 'issues', verb: 'delete', re: P(`${A}/issue/{}/worklog/{}`), resource: 'worklogs', method: 'delete', sqlVerb: 'delete' },
  { service: 'issues', verb: 'post', re: P(`${A}/issue/{}/worklog/move`), resource: 'worklogs', method: 'bulk_move', sqlVerb: 'exec' },
  { service: 'issues', verb: 'get', re: P(`${A}/issue/createmeta/{}/issuetypes`), resource: 'create_meta_issue_types', method: 'list', sqlVerb: 'select', objectKey: '$.issueTypes' },
  { service: 'issues', verb: 'get', re: P(`${A}/issue/createmeta/{}/issuetypes/{}`), resource: 'create_meta_fields', method: 'list', sqlVerb: 'select', objectKey: '$.fields' },
  { service: 'issues', verb: 'get', re: P(`${A}/issue/{}/remotelink`), resource: 'remote_links', method: 'list', sqlVerb: 'select', objectKey: '' },
  { service: 'issues', verb: 'get', re: P(`${A}/issue/{}/remotelink/{}`), resource: 'remote_links', method: 'get', sqlVerb: 'select' },
  { service: 'issues', verb: 'delete', re: P(`${A}/issue/{}/remotelink`), resource: 'remote_links', method: 'delete_by_global_id', sqlVerb: 'exec' },
  { service: 'issues', verb: 'delete', re: P(`${A}/issue/{}/remotelink/{}`), resource: 'remote_links', method: 'delete', sqlVerb: 'delete' },
  // a page of label strings; post_process turns each into a {label} row
  { service: 'issues', verb: 'get', re: P(`${A}/label`), resource: 'labels', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  // --------------------------------------------------------------- projects
  { service: 'projects', verb: 'get', re: P(`${A}/project/search`), resource: 'projects', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'projects', verb: 'post', re: P(`${A}/project/{}/delete`), resource: 'projects', method: 'delete_async', sqlVerb: 'exec' },
  { service: 'projects', verb: 'put', re: P(`${A}/project/{}/avatar`), resource: 'projects', method: 'set_avatar', sqlVerb: 'exec' },
  { service: 'projects', verb: 'post', re: P(`${A}/project-template`), resource: 'projects', method: 'create_from_template', sqlVerb: 'exec' },
  // the read of the default classification level is skip-coded (untyped)
  { service: 'projects', verb: 'put', re: P(`${A}/project/{}/classification-level/default`), resource: 'projects', method: 'set_default_classification_level', sqlVerb: 'exec' },
  { service: 'projects', verb: 'delete', re: P(`${A}/project/{}/classification-level/default`), resource: 'projects', method: 'remove_default_classification_level', sqlVerb: 'exec' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/component`), resource: 'components', method: 'list_by_project', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/components`), resource: 'components', method: 'list_all_by_project', sqlVerb: 'exec' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/version`), resource: 'versions', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/versions`), resource: 'versions', method: 'list_all', sqlVerb: 'exec' },
  { service: 'projects', verb: 'put', re: P(`${A}/version/{}/mergeto/{}`), resource: 'versions', method: 'merge', sqlVerb: 'exec' },
  { service: 'projects', verb: 'delete', re: P(`${A}/version/{}/relatedwork/{}`), resource: 'version_related_works', method: 'delete', sqlVerb: 'delete' },
  { service: 'projects', verb: 'get', re: P(`${A}/version/{}/relatedIssueCounts`), resource: 'version_issue_counts', method: 'get', sqlVerb: 'select', objectKey: '' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/notificationscheme`), resource: 'project_notification_schemes', method: 'get', sqlVerb: 'select', objectKey: '' },
  // the role name -> URL map has no fixed columns; project_roles.list
  // (roledetails) returns the same roles as rows
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/role`), skip: 'map_response' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/roledetails`), resource: 'project_roles', method: 'list', sqlVerb: 'select', objectKey: '' },
  { service: 'projects', verb: 'get', re: P(`${A}/project/{}/role/{}`), resource: 'project_roles', method: 'get', sqlVerb: 'select' },
  { service: 'projects', verb: 'post', re: P(`${A}/project/{}/role/{}`), resource: 'project_roles', method: 'add_actors', sqlVerb: 'exec' },
  { service: 'projects', verb: 'put', re: P(`${A}/project/{}/role/{}`), resource: 'project_roles', method: 'set_actors', sqlVerb: 'exec' },
  { service: 'projects', verb: 'delete', re: P(`${A}/project/{}/role/{}`), resource: 'project_roles', method: 'delete_actor', sqlVerb: 'exec' },
  // POST /role/{id} is the vendor's partial update; PUT is documented as a
  // full update (EXEC replace - not proven full replacement)
  { service: 'projects', verb: 'get', re: P(`${A}/role/{}`), resource: 'roles', method: 'get', sqlVerb: 'select' },
  { service: 'projects', verb: 'post', re: P(`${A}/role/{}`), resource: 'roles', method: 'update', sqlVerb: 'update' },
  { service: 'projects', verb: 'put', re: P(`${A}/role/{}`), resource: 'roles', method: 'replace', sqlVerb: 'exec' },
  { service: 'projects', verb: 'get', re: P(`${A}/policies/project/{}`), resource: 'project_policies', method: 'get', sqlVerb: 'select' },
  { service: 'projects', verb: 'put', re: P(`${A}/policies/project/{}/policies`), resource: 'project_policies', method: 'update', sqlVerb: 'update' },
  { service: 'projects', verb: 'post', re: P(`${A}/policies/project/{}/validate`), resource: 'project_policies', method: 'validate', sqlVerb: 'exec' },
  { service: 'projects', verb: 'put', re: P(`${A}/project-template/edit-template`), resource: 'project_templates', method: 'update', sqlVerb: 'update' },
  { service: 'projects', verb: 'delete', re: P(`${A}/project-template/remove-template`), resource: 'project_templates', method: 'delete', sqlVerb: 'delete' },
  { service: 'projects', verb: 'post', re: P(`${A}/project-template/save-template`), resource: 'project_templates', method: 'create', sqlVerb: 'insert' },
  // ------------------------------------------------------------------ users
  { service: 'users', verb: 'get', re: P(`${A}/users/search`), resource: 'users', method: 'list', sqlVerb: 'select', objectKey: '' },
  { service: 'users', verb: 'get', re: P(`${A}/users`), resource: 'users', method: 'list_all', sqlVerb: 'exec' },
  { service: 'users', verb: 'post', re: P(`${A}/group/user`), resource: 'group_members', method: 'create', sqlVerb: 'insert' },
  { service: 'users', verb: 'delete', re: P(`${A}/group/user`), resource: 'group_members', method: 'delete', sqlVerb: 'delete' },
  // ------------------------------------------------------------ permissions
  { service: 'permissions', verb: 'get', re: P(`${A}/issuesecurityschemes/search`), resource: 'issue_security_schemes', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'permissions', verb: 'get', re: P(`${A}/issuesecurityschemes`), resource: 'issue_security_schemes', method: 'list_all', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'put', re: P(`${A}/issuesecurityschemes/level/default`), resource: 'issue_security_levels', method: 'set_default', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'put', re: P(`${A}/issuesecurityschemes/{}/level`), resource: 'issue_security_schemes', method: 'add_levels', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'put', re: P(`${A}/issuesecurityschemes/{}/level/{}`), resource: 'issue_security_schemes', method: 'update_level', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'delete', re: P(`${A}/issuesecurityschemes/{}/level/{}`), resource: 'issue_security_schemes', method: 'remove_level', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'put', re: P(`${A}/issuesecurityschemes/{}/level/{}/member`), resource: 'issue_security_schemes', method: 'add_level_members', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'delete', re: P(`${A}/issuesecurityschemes/{}/level/{}/member/{}`), resource: 'issue_security_schemes', method: 'remove_level_member', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'put', re: P(`${A}/issuesecurityschemes/project`), resource: 'issue_security_scheme_project_associations', method: 'associate', sqlVerb: 'exec' },
  { service: 'permissions', verb: 'post', re: P(`${A}/permissions/project`), resource: 'permissions', method: 'get_permitted_projects', sqlVerb: 'exec' },
  // the permission map becomes one row per permission (post_process 4b)
  { service: 'permissions', verb: 'get', re: P(`${A}/permissions`), resource: 'permissions', method: 'list', sqlVerb: 'select' },
  { service: 'permissions', verb: 'get', re: P(`${A}/project/{}/issuesecuritylevelscheme`), resource: 'project_issue_security_schemes', method: 'get', sqlVerb: 'select', objectKey: '' },
  { service: 'permissions', verb: 'get', re: P(`${A}/project/{}/permissionscheme`), resource: 'project_permission_schemes', method: 'get', sqlVerb: 'select', objectKey: '' },
  { service: 'permissions', verb: 'put', re: P(`${A}/project/{}/permissionscheme`), resource: 'project_permission_schemes', method: 'assign', sqlVerb: 'exec' },
  // -------------------------------------------------------------- workflows
  { service: 'workflows', verb: 'get', re: P(`${A}/workflows/search`), resource: 'workflows', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows`), resource: 'workflows', method: 'bulk_get', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/create`), resource: 'workflows', method: 'create', sqlVerb: 'insert' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/create/validation`), resource: 'workflows', method: 'validate_create', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/update`), resource: 'workflows', method: 'bulk_update', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/update/validation`), resource: 'workflows', method: 'validate_update', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/preview`), resource: 'workflows', method: 'preview', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflows/copy`), resource: 'workflows', method: 'copy', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'delete', re: P(`${A}/workflow/{}`), resource: 'workflows', method: 'delete', sqlVerb: 'delete' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflow/history`), resource: 'workflows', method: 'get_history', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflow/history/list`), resource: 'workflows', method: 'list_history', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'get', re: P(`${A}/statuses/search`), resource: 'statuses', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'workflows', verb: 'get', re: P(`${A}/status`), resource: 'statuses', method: 'list_all', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'get', re: P(`${A}/status/{}`), resource: 'statuses', method: 'get', sqlVerb: 'select' },
  { service: 'workflows', verb: 'get', re: P(`${A}/statuses`), resource: 'statuses', method: 'list_by_ids', sqlVerb: 'select', objectKey: '' },
  { service: 'workflows', verb: 'get', re: P(`${A}/statuses/byNames`), resource: 'statuses', method: 'list_by_names', sqlVerb: 'select', objectKey: '' },
  { service: 'workflows', verb: 'get', re: P(`${A}/workflowscheme/{}`), resource: 'workflow_schemes', method: 'get', sqlVerb: 'select' },
  { service: 'workflows', verb: 'put', re: P(`${A}/workflowscheme/{}`), resource: 'workflow_schemes', method: 'update', sqlVerb: 'update' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflowscheme/read`), resource: 'workflow_schemes', method: 'bulk_get', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflowscheme/update`), resource: 'workflow_schemes', method: 'update_scheme', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflowscheme/update/mappings`), resource: 'workflow_schemes', method: 'get_required_mappings', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflowscheme/{}/createdraft`), resource: 'workflow_schemes', method: 'create_draft', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'put', re: P(`${A}/workflowscheme/project`), resource: 'workflow_scheme_project_associations', method: 'assign', sqlVerb: 'exec' },
  { service: 'workflows', verb: 'post', re: P(`${A}/workflowscheme/project/switch`), resource: 'workflow_scheme_project_associations', method: 'switch', sqlVerb: 'exec' },
  // ----------------------------------------------------------------- fields
  { service: 'fields', verb: 'get', re: P(`${A}/field/search`), resource: 'fields', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'fields', verb: 'get', re: P(`${A}/field`), resource: 'fields', method: 'list_all', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/field/association`), resource: 'fields', method: 'create_associations', sqlVerb: 'exec' },
  { service: 'fields', verb: 'delete', re: P(`${A}/field/association`), resource: 'fields', method: 'remove_associations', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/config/fieldschemes/fields`), resource: 'field_schemes', method: 'update_fields', sqlVerb: 'exec' },
  { service: 'fields', verb: 'delete', re: P(`${A}/config/fieldschemes/fields`), resource: 'field_schemes', method: 'remove_fields', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/config/fieldschemes/fields/parameters`), resource: 'field_schemes', method: 'update_field_parameters', sqlVerb: 'exec' },
  { service: 'fields', verb: 'delete', re: P(`${A}/config/fieldschemes/fields/parameters`), resource: 'field_schemes', method: 'remove_field_parameters', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/config/fieldschemes/projects`), resource: 'field_scheme_project_associations', method: 'associate', sqlVerb: 'exec' },
  { service: 'fields', verb: 'post', re: P(`${A}/field/{}/context/mapping`), resource: 'custom_field_contexts', method: 'list_for_projects_and_issue_types', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/field/{}/context/{}/issuetype`), resource: 'custom_field_contexts', method: 'add_issue_types', sqlVerb: 'exec' },
  { service: 'fields', verb: 'post', re: P(`${A}/field/{}/context/{}/issuetype/remove`), resource: 'custom_field_contexts', method: 'remove_issue_types', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/field/{}/context/{}/project`), resource: 'custom_field_contexts', method: 'assign_projects', sqlVerb: 'exec' },
  { service: 'fields', verb: 'post', re: P(`${A}/field/{}/context/{}/project/remove`), resource: 'custom_field_contexts', method: 'remove_projects', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/field/{}/context/{}/option/move`), resource: 'custom_field_options', method: 'reorder', sqlVerb: 'exec' },
  { service: 'fields', verb: 'delete', re: P(`${A}/field/{}/context/{}/option/{}/issue`), resource: 'custom_field_options', method: 'replace_on_issues', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/fieldconfigurationscheme/{}/mapping`), resource: 'field_configuration_schemes', method: 'set_mappings', sqlVerb: 'exec' },
  { service: 'fields', verb: 'post', re: P(`${A}/fieldconfigurationscheme/{}/mapping/delete`), resource: 'field_configuration_schemes', method: 'remove_mappings', sqlVerb: 'exec' },
  { service: 'fields', verb: 'put', re: P(`${A}/fieldconfigurationscheme/project`), resource: 'field_configuration_scheme_project_associations', method: 'assign', sqlVerb: 'exec' },
  // ------------------------------------------------------------ issue_types
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescheme/project`), resource: 'issue_type_scheme_project_associations', method: 'assign', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescreenscheme/project`), resource: 'issue_type_screen_scheme_project_associations', method: 'assign', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescheme/{}/issuetype`), resource: 'issue_type_schemes', method: 'add_issue_types', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescheme/{}/issuetype/move`), resource: 'issue_type_schemes', method: 'reorder_issue_types', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'delete', re: P(`${A}/issuetypescheme/{}/issuetype/{}`), resource: 'issue_type_schemes', method: 'remove_issue_type', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescreenscheme/{}/mapping`), resource: 'issue_type_screen_schemes', method: 'append_mappings', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'put', re: P(`${A}/issuetypescreenscheme/{}/mapping/default`), resource: 'issue_type_screen_schemes', method: 'update_default_screen_scheme', sqlVerb: 'exec' },
  { service: 'issue_types', verb: 'post', re: P(`${A}/issuetypescreenscheme/{}/mapping/remove`), resource: 'issue_type_screen_schemes', method: 'remove_mappings', sqlVerb: 'exec' },
  // ---------------------------------------------------------------- screens
  { service: 'screens', verb: 'post', re: P(`${A}/screens/addToDefault/{}`), resource: 'screens', method: 'add_field_to_default', sqlVerb: 'exec' },
  // ------------------------------------------------------------- dashboards
  { service: 'dashboards', verb: 'get', re: P(`${A}/dashboard/search`), resource: 'dashboards', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'dashboards', verb: 'get', re: P(`${A}/dashboard`), resource: 'dashboards', method: 'list_all', sqlVerb: 'exec' },
  { service: 'dashboards', verb: 'put', re: P(`${A}/dashboard/bulk/edit`), resource: 'dashboards', method: 'bulk_edit', sqlVerb: 'exec' },
  { service: 'dashboards', verb: 'get', re: P(`${A}/dashboard/{}/gadget`), resource: 'gadgets', method: 'list', sqlVerb: 'select', objectKey: '$.gadgets' },
  // ---------------------------------------------------------------- filters
  { service: 'filters', verb: 'get', re: P(`${A}/filter/search`), resource: 'filters', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'filters', verb: 'put', re: P(`${A}/filter/{}/favourite`), resource: 'filters', method: 'add_favourite', sqlVerb: 'exec' },
  { service: 'filters', verb: 'delete', re: P(`${A}/filter/{}/favourite`), resource: 'filters', method: 'remove_favourite', sqlVerb: 'exec' },
  { service: 'filters', verb: 'put', re: P(`${A}/filter/{}/owner`), resource: 'filters', method: 'change_owner', sqlVerb: 'exec' },
  // ------------------------------------------------------- issue_attributes
  { service: 'issue_attributes', verb: 'get', re: P(`${A}/priority/search`), resource: 'priorities', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'issue_attributes', verb: 'put', re: P(`${A}/priority/default`), resource: 'priorities', method: 'set_default', sqlVerb: 'exec' },
  { service: 'issue_attributes', verb: 'get', re: P(`${A}/resolution/search`), resource: 'resolutions', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'issue_attributes', verb: 'put', re: P(`${A}/resolution/default`), resource: 'resolutions', method: 'set_default', sqlVerb: 'exec' },
  { service: 'issue_attributes', verb: 'post', re: P(`${A}/priorityscheme/mappings`), resource: 'priority_schemes', method: 'suggested_mappings', sqlVerb: 'exec' },
  // ---------------------------------------------------------- notifications
  { service: 'notifications', verb: 'put', re: P(`${A}/notificationscheme/{}/notification`), resource: 'notification_schemes', method: 'add_notifications', sqlVerb: 'exec' },
  { service: 'notifications', verb: 'delete', re: P(`${A}/notificationscheme/{}/notification/{}`), resource: 'notification_schemes', method: 'remove_notification', sqlVerb: 'exec' },
  // -------------------------------------------------------------------- jql
  { service: 'jql', verb: 'post', re: P(`${A}/jql/autocompletedata`), resource: 'autocomplete_data', method: 'get_filtered', sqlVerb: 'exec' },
  { service: 'jql', verb: 'post', re: P(`${A}/jql/parse`), resource: 'queries', method: 'parse', sqlVerb: 'exec' },
  { service: 'jql', verb: 'post', re: P(`${A}/jql/sanitize`), resource: 'queries', method: 'sanitize', sqlVerb: 'exec' },
  { service: 'jql', verb: 'post', re: P(`${A}/jql/pdcleaner`), resource: 'queries', method: 'convert_user_identifiers', sqlVerb: 'exec' },
  // ----------------------------------------------------------------- system
  { service: 'system', verb: 'post', re: P(`${A}/agents/bulk/invoke/batch`), resource: 'agent_sessions', method: 'start_batch', sqlVerb: 'exec' },
  { service: 'system', verb: 'post', re: P(`${A}/agents/bulk/invoke/uniform`), resource: 'agent_sessions', method: 'start_uniform', sqlVerb: 'exec' },
  { service: 'system', verb: 'post', re: P(`${A}/expression/analyse`), resource: 'expressions', method: 'analyse', sqlVerb: 'exec' },
  { service: 'system', verb: 'post', re: P(`${A}/expression/evaluate`), resource: 'expressions', method: 'evaluate', sqlVerb: 'exec' },
  { service: 'system', verb: 'post', re: P(`${A}/forge/panel/action/bulk/async`), resource: 'issue_panels', method: 'bulk_pin', sqlVerb: 'exec' },
  { service: 'system', verb: 'post', re: P(`${A}/forge/panel/action/bulk/status`), resource: 'issue_panels', method: 'get_pin_status', sqlVerb: 'exec' },
  { service: 'system', verb: 'get', re: P(`${A}/serverInfo`), resource: 'server_info', method: 'get', sqlVerb: 'select', objectKey: '' },
  { service: 'system', verb: 'get', re: P(`${A}/license/approximateLicenseCount/product/{}`), resource: 'approximate_license_counts', method: 'get_by_product', sqlVerb: 'select' },
  { service: 'system', verb: 'delete', re: P(`${A}/universal_avatar/type/{}/owner/{}/avatar/{}`), resource: 'avatars', method: 'delete', sqlVerb: 'delete' },
  // ------------------------------------------------------------------ agile
  { service: 'agile', verb: 'post', re: P(`${AG}/backlog/issue`), resource: 'board_backlog_issues', method: 'move_to_backlog', sqlVerb: 'exec' },
  { service: 'agile', verb: 'post', re: P(`${AG}/backlog/{}/issue`), resource: 'board_backlog_issues', method: 'move_to_board_backlog', sqlVerb: 'exec' },
  { service: 'agile', verb: 'get', re: P(`${AG}/board/filter/{}`), resource: 'filter_boards', method: 'list', sqlVerb: 'select', objectKey: '$.values' },
  { service: 'agile', verb: 'post', re: P(`${AG}/board/{}/issue`), resource: 'boards', method: 'move_issues', sqlVerb: 'exec' },
  // the report items are untyped objects: one row with a JSON reports column
  { service: 'agile', verb: 'get', re: P(`${AG}/board/{}/reports`), resource: 'board_reports', method: 'get', sqlVerb: 'select', objectKey: '' },
  { service: 'agile', verb: 'post', re: P(`${AG}/epic/{}`), resource: 'epics', method: 'update', sqlVerb: 'update' },
  { service: 'agile', verb: 'post', re: P(`${AG}/epic/{}/issue`), resource: 'epics', method: 'move_issues', sqlVerb: 'exec' },
  { service: 'agile', verb: 'post', re: P(`${AG}/epic/none/issue`), resource: 'epics', method: 'remove_issues', sqlVerb: 'exec' },
  // POST /sprint/{id} is the partial update; PUT is documented as a full
  // update (EXEC replace - not proven full replacement)
  { service: 'agile', verb: 'post', re: P(`${AG}/sprint/{}`), resource: 'sprints', method: 'update', sqlVerb: 'update' },
  { service: 'agile', verb: 'put', re: P(`${AG}/sprint/{}`), resource: 'sprints', method: 'replace', sqlVerb: 'exec' },
  { service: 'agile', verb: 'post', re: P(`${AG}/sprint/{}/issue`), resource: 'sprints', method: 'move_issues', sqlVerb: 'exec' }
];
