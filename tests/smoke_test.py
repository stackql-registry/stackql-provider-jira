#!/usr/bin/env python3
"""pystackql smoke test for the jira stackql provider.

Exercises the salient resources against a real Jira Cloud site (a dedicated
trial or free site, never production): read smokes across the surface (the
cloud ID lookup, identity, projects, the offset-paginated reads, the JQL
search, schemes, the audit log), then self-cleaning write lifecycles in a
dedicated project - an issue (INSERT, UPDATE, transition EXEC, ADF comment
INSERT / UPDATE / DELETE, an issue link, DELETE), a version (the UPDATE typed
boolean probe), a component, a saved filter, a project property and a project
category - and, only behind --with-project-lifecycle, a whole project
create / update / delete. The resources and mutations are the ones the
community Terraform provider for Jira manages (jira_issue, jira_comment,
jira_issue_link, jira_component, jira_filter, jira_project,
jira_project_category).

Budget: Jira Cloud does not bill per API call; the suite creates nothing
billable (0.00).

Everything created is named or labelled `stackql-smoke...`; before running,
the script sweeps every stackql-smoke breadcrumb so each run starts clean.

The suite runs in the project named by JIRA_SMOKE_PROJECT (default SQLUAT).
If it does not exist it is created (a Jira administrator identity is needed
once), with the identity as lead and in the project's Administrators role,
so the identity can delete what it creates.

Credentials come from the environment, exactly as the provider reads them
(`make smoke*` sources .env):

    export ATLASSIAN_CLIENT_ID=...       # service account OAuth 2.0 credential
    export ATLASSIAN_CLIENT_SECRET=...
    export ATLASSIAN_CLOUD_ID=...        # SELECT cloud_id FROM jira.atlassian_tenant.info WHERE site = '<site>'

Pacing: Jira Cloud rate limits by cost per time window; every statement is
paced by INTER_REQUEST_DELAY_S and a 429 is a harness bug that fails the run.

Usage:
    python tests/smoke_test.py                            # local provider-dev/openapi registry (default)
    python tests/smoke_test.py --live                     # the published provider in the stackql registry
    python tests/smoke_test.py --read-only                # read smokes only, no writes
    python tests/smoke_test.py --with-project-lifecycle   # also create / update / delete a whole project
    python tests/smoke_test.py --cleanup-only             # just sweep breadcrumbs
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import urlparse

BASE_DIR = Path(__file__).resolve().parents[1]
PROVIDER = "jira"
P = PROVIDER
SMOKE = "stackql-smoke"
INTER_REQUEST_DELAY_S = 0.5
CLOUD_ID_ENV = "ATLASSIAN_CLOUD_ID"
SMOKE_PROJECT = os.environ.get("JIRA_SMOKE_PROJECT", "SQLUAT")
# pystackql manages its own stackql binary; the harness upgrades it when
# older than the release the provider was verified on (omnisdk engine).
MIN_STACKQL_VERSION = (1, 1, 959)

ERROR_RE = re.compile(
    r"http response status code: [45]|over HTTP error|error assembling|was rejected|"
    r"cannot find matching operation|no matching operation|no such column|"
    r"cannot find any viable servers|parser error|panic|"
    r"requires an input|cannot be used|not provided|could not locate symbol",
    re.I,
)
RATE_LIMIT_RE = re.compile(r"status code: 429|TooManyRequests|rate limit", re.I)
SCOPE_RE = re.compile(r"scope does not match", re.I)


def sql_str(value) -> str:
    """A single-quoted SQL literal."""
    return "'" + str(value).replace("'", "''") + "'"


def adf(text: str) -> str:
    """An Atlassian Document Format document with one paragraph."""
    return json.dumps({"type": "doc", "version": 1, "content": [{"type": "paragraph", "content": [{"type": "text", "text": text}]}]})


class Smoke:
    def __init__(self, args: argparse.Namespace) -> None:
        self.args = args
        self.stamp = str(int(time.time()))[-6:]
        self.name = f"{SMOKE}-{self.stamp}"
        self.results: list[tuple[str, str, str]] = []
        self.requests = 0
        for var in ("ATLASSIAN_CLIENT_ID", "ATLASSIAN_CLIENT_SECRET", CLOUD_ID_ENV):
            if not os.environ.get(var):
                sys.exit(f"{var} is not set - see the module docstring and .env.example")
        self.cloud_id = os.environ[CLOUD_ID_ENV]

        from pystackql import StackQL

        kwargs = {"output": "dict"}
        self.registry_arg = None
        if not args.live:
            reg_path = (BASE_DIR / "provider-dev" / "openapi").resolve()
            reg_url = "file://" + reg_path.as_posix()
            self.sq = StackQL(custom_registry=reg_url, **kwargs)
            # pystackql only serialises {"url": ...}; a local file registry
            # additionally needs localDocRoot + nopVerify - patch the exec
            # params in place (compact JSON, shell-quoted).
            full = json.dumps(
                {"url": reg_url, "localDocRoot": reg_path.as_posix(), "verifyConfig": {"nopVerify": True}},
                separators=(",", ":"),
            )
            self.registry_arg = full
            if sys.platform.startswith("win"):
                quoted = '"' + full.replace('"', '\\"') + '"'
            else:
                import shlex
                quoted = shlex.quote(full)
            params = self.sq.local_query_executor.params
            for i, p in enumerate(params):
                if p == "--registry":
                    params[i + 1] = quoted
                    break
        else:
            self.sq = StackQL(**kwargs)
        self.ensure_stackql_version()
        if args.live:
            self.sq.executeStmt(f"REGISTRY PULL {PROVIDER}")
        self.account_id = None

    def ensure_stackql_version(self) -> None:
        def parse(v: str) -> tuple[int, ...]:
            return tuple(int(x) for x in re.findall(r"\d+", str(v))[:3])

        current = parse(getattr(self.sq, "version", "") or "")
        if current and current >= MIN_STACKQL_VERSION:
            return
        print(f"stackql {self.sq.version} at {self.sq.bin_path} is older than "
              f"v{'.'.join(map(str, MIN_STACKQL_VERSION))} - upgrading pystackql's binary")
        self.sq.upgrade(showprogress=False)
        if parse(self.sq.version) < MIN_STACKQL_VERSION:
            sys.exit(f"stackql {self.sq.version} is still too old after upgrade")

    # ------------------------------------------------------------------ core
    def q(self, sql: str):
        """Run one statement with the stackql binary pystackql manages.

        pystackql returns an empty result for a read whose HTTP call failed
        (stackql prints null on stdout and the failure on stderr, and
        pystackql keeps stdout), so a failed read would pass as "no rows".
        The harness therefore runs `stackql exec` itself and reads both
        streams: rows from stdout, a failure from stderr.
        """
        if self.requests:
            time.sleep(INTER_REQUEST_DELAY_S)
        self.requests += 1
        cmd = [self.sq.bin_path, "exec", "--output", "json"]
        if self.registry_arg:
            cmd.append(f"--registry={self.registry_arg}")
        cmd.append(sql)
        try:
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=300, cwd=str(BASE_DIR))
        except Exception as exc:  # noqa: BLE001
            return [], str(exc)
        out, err = proc.stdout.strip(), proc.stderr.strip()
        if RATE_LIMIT_RE.search(out + err):
            return [], "RATE LIMITED (429) - harness pacing bug: " + (err or out)
        if ERROR_RE.search(err) or (proc.returncode != 0 and err):
            return [], err
        if not out or out == "null":
            return [], None
        try:
            rows = json.loads(out)
        except json.JSONDecodeError:
            return [], (out if ERROR_RE.search(out) else None)
        return (rows if isinstance(rows, list) else [rows]), None

    def record(self, name: str, ok: bool, note: str = "", status: str | None = None):
        status = status or ("PASS" if ok else "FAIL")
        self.results.append((name, status, note))
        print(f"  {status:4s}  {name}" + ("" if status == "PASS" else f"  [{note[:180]}]"))
        return ok

    def step(self, name: str, sql: str, expect_rows: bool = False, contains: str | None = None, check=None):
        rows, err = self.q(sql)
        if err:
            self.record(name, False, err[:240])
            return None
        blob = json.dumps(rows, default=str)
        if expect_rows and not rows:
            self.record(name, False, "expected rows, got none")
            return None
        if contains and contains not in blob:
            self.record(name, False, f"'{contains}' not in result: {blob[:160]}")
            return None
        if check is not None and not check(rows):
            self.record(name, False, f"unexpected result: {blob[:200]}")
            return None
        self.record(name, True)
        return rows

    def wait_for(self, name: str, sql: str, pred, timeout: int = 90, interval: int = 5):
        """Poll until pred(rows) holds - for the eventually consistent JQL index."""
        start = time.time()
        last = None
        while time.time() - start < timeout:
            rows, err = self.q(sql)
            last = err or json.dumps(rows, default=str)[:160]
            if not err and pred(rows):
                self.results.append((name, "PASS", f"{int(time.time() - start)}s"))
                print(f"  PASS  {name}  ({int(time.time() - start)}s)")
                return rows
            time.sleep(interval)
        self.record(name, False, f"timeout: {last}")
        return None

    # ------------------------------------------------------- breadcrumb sweep
    def cleanup_breadcrumbs(self) -> None:
        print("== breadcrumb sweep ==")
        swept = 0
        rows, err = self.q(f"SELECT key FROM {P}.issues.issues WHERE jql = {sql_str(f'project = {SMOKE_PROJECT} AND labels = {SMOKE}')}")
        if err and "does not exist" not in err:
            print(f"  WARN issue sweep failed: {err[:160]}")
        for r in rows if not err else []:
            print(f"  sweeping issue {r.get('key')}")
            self.q(f"DELETE FROM {P}.issues.issues WHERE issue_id_or_key = {sql_str(r.get('key'))}")
            swept += 1
        for resource, method_where, id_col, delete_where in (
            ("versions", f"project_id_or_key = {sql_str(SMOKE_PROJECT)}", "id", "id"),
            ("components", f"project_id_or_key = {sql_str(SMOKE_PROJECT)}", "id", "id"),
        ):
            rows, err = self.q(f"SELECT {id_col}, name FROM {P}.projects.{resource} WHERE {method_where}")
            for r in rows if not err else []:
                if str(r.get("name", "")).startswith(SMOKE):
                    print(f"  sweeping {resource} {r.get('name')}")
                    self.q(f"DELETE FROM {P}.projects.{resource} WHERE {delete_where} = {sql_str(r.get(id_col))}")
                    swept += 1
        # smoke scrum boards (and their sprints) before the filters they use
        # not WHERE name = ...: Jira's name parameter matches "contains", but
        # stackql also applies it to the name column as an exact match
        rows, err = self.q(f"SELECT id, name FROM {P}.agile.boards")
        for r in rows if not err else []:
            if str(r.get("name", "")).startswith(SMOKE):
                sprints, serr = self.q(f"SELECT id, name FROM {P}.agile.board_sprints WHERE board_id = {sql_str(r.get('id'))}")
                for sp in sprints if not serr else []:
                    if str(sp.get("name", "")).startswith(SMOKE):
                        print(f"  sweeping sprint {sp.get('name')}")
                        self.q(f"DELETE FROM {P}.agile.sprints WHERE sprint_id = {sql_str(sp.get('id'))}")
                        swept += 1
                print(f"  sweeping board {r.get('name')}")
                self.q(f"DELETE FROM {P}.agile.boards WHERE board_id = {sql_str(r.get('id'))}")
                swept += 1
        rows, err = self.q(f"SELECT id, name FROM {P}.filters.filters WHERE filter_name = {sql_str(SMOKE)}")
        for r in rows if not err else []:
            if str(r.get("name", "")).startswith(SMOKE):
                print(f"  sweeping filter {r.get('name')}")
                self.q(f"DELETE FROM {P}.filters.filters WHERE id = {sql_str(r.get('id'))}")
                swept += 1
        rows, err = self.q(f"SELECT id, name FROM {P}.projects.project_categories")
        for r in rows if not err else []:
            if str(r.get("name", "")).startswith(SMOKE):
                print(f"  sweeping project category {r.get('name')}")
                self.q(f"DELETE FROM {P}.projects.project_categories WHERE id = {sql_str(r.get('id'))}")
                swept += 1
        rows, err = self.q(f"SELECT key FROM {P}.projects.project_properties WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)}")
        for r in rows if not err else []:
            if str(r.get("key", "")).startswith(SMOKE):
                print(f"  sweeping project property {r.get('key')}")
                self.q(f"DELETE FROM {P}.projects.project_properties WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)} "
                       f"AND property_key = {sql_str(r.get('key'))}")
                swept += 1
        rows, err = self.q(f"SELECT id, key, name FROM {P}.projects.projects WHERE query = {sql_str(SMOKE)}")
        for r in rows if not err else []:
            if str(r.get("name", "")).startswith(SMOKE):
                print(f"  sweeping project {r.get('key')}")
                self.q(f"DELETE FROM {P}.projects.projects WHERE project_id_or_key = {sql_str(r.get('key'))} AND enable_undo = false")
                swept += 1
        print(f"  swept {swept} breadcrumb(s)")

    # -------------------------------------------------------------- reads
    def read_smokes(self) -> None:
        print("== read smokes ==")
        rows = self.step("system.server_info", f"SELECT base_url, version, deployment_type FROM {P}.system.server_info",
                         expect_rows=True, contains="Cloud")
        site = urlparse(rows[0]["base_url"]).hostname.split(".")[0] if rows and rows[0].get("base_url") else None
        if site:
            self.step(f"atlassian_tenant.info answers ATLASSIAN_CLOUD_ID for site {site}",
                      f"SELECT cloud_id FROM {P}.atlassian_tenant.info WHERE site = {sql_str(site)}",
                      expect_rows=True, check=lambda r: r[0].get("cloud_id") == self.cloud_id)
        rows = self.step("users.myself", f"SELECT account_id, account_type, display_name FROM {P}.users.myself", expect_rows=True)
        if rows:
            self.account_id = rows[0].get("account_id")
        self.step("projects.projects (expand as a request parameter)",
                  f"SELECT id, key, name, project_type_key, description, json_extract(lead, '$.displayName') AS lead "
                  f"FROM {P}.projects.projects WHERE expand = 'description,lead'", expect_rows=True,
                  check=lambda r: any(x.get("lead") for x in r))
        self.step("issue_types.issue_types (bare array)", f"SELECT id, name, hierarchy_level FROM {P}.issue_types.issue_types", expect_rows=True)
        self.step("issue_attributes.priorities: every page at 2 per page",
                  f"SELECT id, name FROM {P}.issue_attributes.priorities WHERE max_results = 2", expect_rows=True,
                  check=lambda r: len(r) >= 3)
        self.step("fields.fields: offset pagination past the first page",
                  f"SELECT count(*) AS n FROM {P}.fields.fields", expect_rows=True, check=lambda r: int(r[0].get("n", 0)) > 50)
        self.step("users.groups", f"SELECT name, group_id FROM {P}.users.groups", expect_rows=True)
        self.step("workflows.statuses (offset paging through the gateway)", f"SELECT id, name, status_category FROM {P}.workflows.statuses", expect_rows=True)
        self.step("workflows.workflows (offset paging through the gateway)", f"SELECT id, name FROM {P}.workflows.workflows", expect_rows=True)
        self.step("workflows.workflow_schemes", f"SELECT id, name FROM {P}.workflows.workflow_schemes", expect_rows=True)
        self.step("permissions.permission_schemes", f"SELECT id, name FROM {P}.permissions.permission_schemes", expect_rows=True)
        self.step("permissions.my_permissions: one row per permission",
                  f"SELECT key, have_permission FROM {P}.permissions.my_permissions "
                  f"WHERE permissions = 'BROWSE_PROJECTS,CREATE_ISSUES' AND project_key = {sql_str(SMOKE_PROJECT)}",
                  expect_rows=True, check=lambda r: len(r) == 2)
        self.step("issue_types.issue_type_schemes", f"SELECT id, name FROM {P}.issue_types.issue_type_schemes", expect_rows=True)
        self.step("screens.screens", f"SELECT id, name FROM {P}.screens.screens", expect_rows=True)
        self.step("notifications.notification_schemes", f"SELECT id, name FROM {P}.notifications.notification_schemes", expect_rows=True)
        self.step("dashboards.dashboards", f"SELECT id, name FROM {P}.dashboards.dashboards", expect_rows=True)
        self.step("filters.filters", f"SELECT id, name FROM {P}.filters.filters")
        self.step("system.audit_records (offset + limit, LIMIT pushdown)", f"SELECT id, summary, category FROM {P}.system.audit_records LIMIT 5")
        self.step("system.application_roles", f"SELECT key, name FROM {P}.system.application_roles", expect_rows=True)
        self.step("jql.autocomplete_data", f"SELECT json_array_length(visible_field_names) AS n FROM {P}.jql.autocomplete_data", expect_rows=True)
        self.step("issues.labels (strings as rows)", f"SELECT label FROM {P}.issues.labels")
        self.step("projects.valid_project_keys (scalar as a value row)",
                  f"SELECT value FROM {P}.projects.valid_project_keys WHERE key = 'STACKQL'", expect_rows=True)
        # Jira Software needs granular *:jira-software scopes on the credential
        rows, err = self.q(f"SELECT id, name, type FROM {P}.agile.boards")
        if err and SCOPE_RE.search(err):
            self.record("agile.boards", False, "the credential has no Jira Software scopes (read:board-scope:jira-software ...)", status="SKIP")
        else:
            self.record("agile.boards", not err, err or "")

    # ------------------------------------------------------- write lifecycles
    def ensure_project(self) -> bool:
        rows, err = self.q(f"SELECT id, key FROM {P}.projects.projects WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)}")
        if not err and rows:
            self.project_id = rows[0].get("id")
        else:
            print(f"  creating the smoke project {SMOKE_PROJECT}")
            rows = self.step(f"projects INSERT {SMOKE_PROJECT} (first run)",
                             f"INSERT INTO {P}.projects.projects (key, name, project_type_key, project_template_key, lead_account_id, "
                             f"assignee_type, description) SELECT {sql_str(SMOKE_PROJECT)}, 'StackQL UAT', 'software', "
                             f"'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic', {sql_str(self.account_id)}, 'UNASSIGNED', "
                             f"'Dedicated project for the stackql jira provider smoke suite' RETURNING id, key", expect_rows=True)
            if not rows:
                return False
            self.project_id = rows[0].get("id")
        perms, err = self.q(f"SELECT key, have_permission FROM {P}.permissions.my_permissions "
                            f"WHERE permissions = 'DELETE_ISSUES' AND project_key = {sql_str(SMOKE_PROJECT)}")
        if not err and perms and str(perms[0].get("have_permission")).lower() != "true":
            roles, _ = self.q(f"SELECT id, name FROM {P}.projects.project_roles WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)}")
            admin = next((r["id"] for r in roles if r.get("name") == "Administrators"), None)
            if admin:
                self.step(f"project_roles.add_actors: the identity joins {SMOKE_PROJECT} Administrators",
                          f"EXEC {P}.projects.project_roles.add_actors @project_id_or_key = {sql_str(SMOKE_PROJECT)}, "
                          f"@id = {sql_str(admin)}, @user = {sql_str(json.dumps([self.account_id]))}")
        return True

    def issue_lifecycle(self) -> None:
        print("== issue lifecycle ==")
        fields = {"project": {"key": SMOKE_PROJECT}, "summary": self.name, "issuetype": {"name": "Task"}, "labels": [SMOKE]}
        rows = self.step("issues INSERT ... RETURNING key (fields as a JSON object)",
                         f"INSERT INTO {P}.issues.issues (fields) SELECT {sql_str(json.dumps(fields))} RETURNING id, key", expect_rows=True)
        key = rows[0].get("key") if rows else None
        if not key:
            return
        other = None
        try:
            self.step("issues get by key", f"SELECT key, json_extract(fields, '$.summary') AS summary FROM {P}.issues.issues "
                      f"WHERE issue_id_or_key = {sql_str(key)}", expect_rows=True, contains=self.name)
            self.wait_for("issues search (JQL) finds the new issue",
                          f"SELECT key, json_extract(fields, '$.summary') AS summary, json_extract(fields, '$.status.name') AS status "
                          f"FROM {P}.issues.issues WHERE jql = {sql_str(f'project = {SMOKE_PROJECT} AND labels = {SMOKE} ORDER BY created DESC')}",
                          lambda r: any(x.get("key") == key for x in r))
            self.step("issues UPDATE summary", f"UPDATE {P}.issues.issues SET fields = {sql_str(json.dumps({'summary': self.name + ' (updated)'}))} "
                      f"WHERE issue_id_or_key = {sql_str(key)}")
            self.step("issues read back the update", f"SELECT json_extract(fields, '$.summary') AS summary FROM {P}.issues.issues "
                      f"WHERE issue_id_or_key = {sql_str(key)}", contains="(updated)")
            trans = self.step("issues.transitions", f"SELECT id, name, json_extract(\"to\", '$.statusCategory.key') AS category "
                              f"FROM {P}.issues.transitions WHERE issue_id_or_key = {sql_str(key)}", expect_rows=True) or []
            done = next((t for t in trans if t.get("category") == "done"), None)
            if done:
                self.step(f"issues EXEC transition to {done.get('name')}",
                          f"EXEC {P}.issues.issues.transition @issue_id_or_key = {sql_str(key)}, @transition = {sql_str(json.dumps({'id': done['id']}))}")
                self.step("issues read back the status category done",
                          f"SELECT json_extract(fields, '$.status.statusCategory.key') AS category FROM {P}.issues.issues "
                          f"WHERE issue_id_or_key = {sql_str(key)}", contains="done")
            rows = self.step("comments INSERT (ADF body) ... RETURNING id",
                             f"INSERT INTO {P}.issues.comments (issue_id_or_key, body) SELECT {sql_str(key)}, {sql_str(adf('stackql smoke comment'))} RETURNING id",
                             expect_rows=True)
            cid = rows[0].get("id") if rows else None
            self.step("comments list (ADF via json_extract)", f"SELECT id, json_extract(body, '$.content[0].content[0].text') AS text "
                      f"FROM {P}.issues.comments WHERE issue_id_or_key = {sql_str(key)}", contains="stackql smoke comment")
            if cid:
                self.step("comments UPDATE", f"UPDATE {P}.issues.comments SET body = {sql_str(adf('stackql smoke comment (edited)'))} "
                          f"WHERE issue_id_or_key = {sql_str(key)} AND id = {sql_str(cid)}")
                self.step("comments read back the edit", f"SELECT json_extract(body, '$.content[0].content[0].text') AS text "
                          f"FROM {P}.issues.comments WHERE issue_id_or_key = {sql_str(key)} AND id = {sql_str(cid)}", contains="(edited)")
                self.step("comments DELETE", f"DELETE FROM {P}.issues.comments WHERE issue_id_or_key = {sql_str(key)} AND id = {sql_str(cid)}")
            # an issue link between two smoke issues
            fields2 = dict(fields, summary=self.name + " (linked)")
            rows = self.step("issues INSERT a second issue", f"INSERT INTO {P}.issues.issues (fields) SELECT {sql_str(json.dumps(fields2))} RETURNING key",
                             expect_rows=True)
            other = rows[0].get("key") if rows else None
            if other:
                self.step("issue_links INSERT (Relates)", f"INSERT INTO {P}.issues.issue_links (type, inward_issue, outward_issue) "
                          f"SELECT '{{\"name\": \"Relates\"}}', {sql_str(json.dumps({'key': key}))}, {sql_str(json.dumps({'key': other}))}")
                links = self.step("issue links read back through the issuelinks field",
                                  f"SELECT json_extract(fields, '$.issuelinks[0].id') AS link_id FROM {P}.issues.issues "
                                  f"WHERE issue_id_or_key = {sql_str(key)}", expect_rows=True, check=lambda r: bool(r[0].get("link_id")))
                if links:
                    self.step("issue_links DELETE", f"DELETE FROM {P}.issues.issue_links WHERE link_id = {sql_str(links[0]['link_id'])}")
        finally:
            for k in (other, key):
                if k:
                    self.step(f"issues DELETE {k}", f"DELETE FROM {P}.issues.issues WHERE issue_id_or_key = {sql_str(k)}")

    def version_lifecycle(self) -> None:
        print("== version lifecycle ==")
        rows = self.step("versions INSERT ... RETURNING id (typed project_id)",
                         f"INSERT INTO {P}.projects.versions (name, project_id, description) "
                         f"SELECT {sql_str(self.name)}, {int(self.project_id)}, 'stackql smoke' RETURNING id, name", expect_rows=True)
        vid = rows[0].get("id") if rows else None
        if not vid:
            return
        try:
            self.step("versions UPDATE (typed boolean released = true)",
                      f"UPDATE {P}.projects.versions SET released = true, description = 'released by stackql smoke' WHERE id = {sql_str(vid)}")
            self.step("versions read back released", f"SELECT name, released FROM {P}.projects.versions WHERE id = {sql_str(vid)}",
                      expect_rows=True, check=lambda r: str(r[0].get("released")).lower() == "true")
            self.step("versions list by project", f"SELECT id, name FROM {P}.projects.versions WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)}",
                      contains=self.name)
        finally:
            self.step("versions DELETE", f"DELETE FROM {P}.projects.versions WHERE id = {sql_str(vid)}")

    def component_lifecycle(self) -> None:
        print("== component lifecycle ==")
        rows = self.step("components INSERT ... RETURNING id",
                         f"INSERT INTO {P}.projects.components (name, project, description) "
                         f"SELECT {sql_str(self.name)}, {sql_str(SMOKE_PROJECT)}, 'stackql smoke' RETURNING id", expect_rows=True)
        cid = rows[0].get("id") if rows else None
        if not cid:
            return
        try:
            self.step("components UPDATE description", f"UPDATE {P}.projects.components SET description = 'updated' WHERE id = {sql_str(cid)}")
            self.step("components list by project", f"SELECT id, name, description FROM {P}.projects.components "
                      f"WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)}", contains="updated")
        finally:
            self.step("components DELETE", f"DELETE FROM {P}.projects.components WHERE id = {sql_str(cid)}")

    def filter_lifecycle(self) -> None:
        print("== filter lifecycle ==")
        jql = f"project = {SMOKE_PROJECT} AND labels = {SMOKE}"
        rows = self.step("filters INSERT ... RETURNING id", f"INSERT INTO {P}.filters.filters (name, jql, description) "
                         f"SELECT {sql_str(self.name)}, {sql_str(jql)}, 'stackql smoke' RETURNING id, name", expect_rows=True)
        fid = rows[0].get("id") if rows else None
        if not fid:
            return
        try:
            self.step("filters UPDATE description", f"UPDATE {P}.filters.filters SET name = {sql_str(self.name)}, description = 'updated' "
                      f"WHERE id = {sql_str(fid)}")
            self.step("filters get", f"SELECT id, name, jql, description FROM {P}.filters.filters WHERE id = {sql_str(fid)}", contains="updated")
        finally:
            self.step("filters DELETE", f"DELETE FROM {P}.filters.filters WHERE id = {sql_str(fid)}")

    def agile_lifecycle(self) -> None:
        """Jira Software: a scrum board on a smoke filter, a sprint created,
        updated and given an issue, the sprint and board issue lists, then
        everything deleted. Needs the *:jira-software scopes."""
        print("== agile lifecycle (scrum board, sprint) ==")
        rows, err = self.q(f"SELECT id FROM {P}.agile.boards")
        if err and SCOPE_RE.search(err):
            self.record("agile lifecycle", False, "the credential has no Jira Software scopes", status="SKIP")
            return
        fid = board = sprint = issue = None
        name = f"{self.name}-scrum"
        try:
            rows = self.step("filters INSERT for the board", f"INSERT INTO {P}.filters.filters (name, jql) "
                             f"SELECT {sql_str(name)}, {sql_str(f'project = {SMOKE_PROJECT} ORDER BY Rank ASC')} RETURNING id", expect_rows=True)
            fid = rows[0].get("id") if rows else None
            if not fid:
                return
            rows = self.step("boards INSERT a scrum board ... RETURNING id",
                             f"INSERT INTO {P}.agile.boards (name, type, filter_id, location) SELECT {sql_str(name)}, 'scrum', {int(fid)}, "
                             f"{sql_str(json.dumps({'type': 'project', 'projectKeyOrId': SMOKE_PROJECT}))} RETURNING id, type", expect_rows=True)
            board = rows[0].get("id") if rows else None
            if not board:
                return
            self.step("board_configurations reads the board's filter", f"SELECT id, name, json_extract(filter, '$.id') AS filter_id "
                      f"FROM {P}.agile.board_configurations WHERE board_id = {sql_str(board)}", expect_rows=True, contains=str(fid))
            rows = self.step("sprints INSERT ... RETURNING id, state",
                             f"INSERT INTO {P}.agile.sprints (name, origin_board_id, goal) SELECT {sql_str(name)}, {int(board)}, 'stackql smoke' "
                             f"RETURNING id, state", expect_rows=True)
            sprint = rows[0].get("id") if rows else None
            if not sprint:
                return
            self.step("sprints UPDATE goal (the partial update)", f"UPDATE {P}.agile.sprints SET goal = 'updated by stackql smoke' "
                      f"WHERE sprint_id = {sql_str(sprint)}")
            self.step("sprints get reads back the goal", f"SELECT id, name, state, goal FROM {P}.agile.sprints WHERE sprint_id = {sql_str(sprint)}",
                      expect_rows=True, contains="updated by stackql smoke")
            self.step("board_sprints lists the sprint", f"SELECT id, name, state FROM {P}.agile.board_sprints WHERE board_id = {sql_str(board)}",
                      contains=name)
            fields = {"project": {"key": SMOKE_PROJECT}, "summary": f"{self.name} (sprint)", "issuetype": {"name": "Task"}, "labels": [SMOKE]}
            rows = self.step("issues INSERT an issue for the sprint", f"INSERT INTO {P}.issues.issues (fields) SELECT {sql_str(json.dumps(fields))} RETURNING key",
                             expect_rows=True)
            issue = rows[0].get("key") if rows else None
            if issue:
                self.step("sprints EXEC move_issues", f"EXEC {P}.agile.sprints.move_issues @sprint_id = {sql_str(sprint)}, "
                          f"@issues = {sql_str(json.dumps([issue]))}")
                self.wait_for("sprint_issues lists the moved issue (token pagination)",
                              f"SELECT key FROM {P}.agile.sprint_issues WHERE sprint_id = {sql_str(sprint)}",
                              lambda r: any(x.get("key") == issue for x in r), timeout=60)
                self.wait_for("board_issues on the scrum board lists it",
                              f"SELECT key FROM {P}.agile.board_issues WHERE board_id = {sql_str(board)}",
                              lambda r: any(x.get("key") == issue for x in r), timeout=60)
        finally:
            if issue:
                self.step(f"issues DELETE {issue}", f"DELETE FROM {P}.issues.issues WHERE issue_id_or_key = {sql_str(issue)}")
            if sprint:
                self.step("sprints DELETE", f"DELETE FROM {P}.agile.sprints WHERE sprint_id = {sql_str(sprint)}")
            if board:
                self.step("boards DELETE", f"DELETE FROM {P}.agile.boards WHERE board_id = {sql_str(board)}")
            if fid:
                self.step("filters DELETE (the board's filter)", f"DELETE FROM {P}.filters.filters WHERE id = {sql_str(fid)}")

    def property_and_category(self) -> None:
        print("== project property and project category ==")
        prop = f"{SMOKE}-{self.stamp}"
        self.step("project_properties UPDATE (set a JSON value)",
                  f"UPDATE {P}.projects.project_properties SET value = '{{\"by\": \"stackql\"}}' "
                  f"WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)} AND property_key = {sql_str(prop)}")
        self.step("project_properties read back", f"SELECT key, value FROM {P}.projects.project_properties "
                  f"WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)} AND property_key = {sql_str(prop)}", contains="stackql")
        self.step("project_properties DELETE", f"DELETE FROM {P}.projects.project_properties "
                  f"WHERE project_id_or_key = {sql_str(SMOKE_PROJECT)} AND property_key = {sql_str(prop)}")
        rows = self.step("project_categories INSERT ... RETURNING id (Jira administrator)",
                         f"INSERT INTO {P}.projects.project_categories (name, description) SELECT {sql_str(self.name)}, 'stackql smoke' RETURNING id",
                         expect_rows=True)
        cat = rows[0].get("id") if rows else None
        if cat:
            try:
                self.step("project_categories UPDATE", f"UPDATE {P}.projects.project_categories SET description = 'updated' WHERE id = {sql_str(cat)}")
                self.step("project_categories get", f"SELECT name, description FROM {P}.projects.project_categories WHERE id = {sql_str(cat)}",
                          contains="updated")
            finally:
                self.step("project_categories DELETE", f"DELETE FROM {P}.projects.project_categories WHERE id = {sql_str(cat)}")

    def project_lifecycle(self) -> None:
        print("== gated project lifecycle ==")
        key = "SQ" + "".join(chr(ord("A") + int(c)) for c in self.stamp[-4:])
        rows = self.step(f"projects INSERT {key} ... RETURNING id",
                         f"INSERT INTO {P}.projects.projects (key, name, project_type_key, project_template_key, lead_account_id, assignee_type) "
                         f"SELECT {sql_str(key)}, {sql_str(self.name)}, 'software', 'com.pyxis.greenhopper.jira:gh-simplified-kanban-classic', "
                         f"{sql_str(self.account_id)}, 'UNASSIGNED' RETURNING id, key", expect_rows=True)
        if not rows:
            return
        try:
            self.step("projects UPDATE description", f"UPDATE {P}.projects.projects SET description = 'stackql smoke project' "
                      f"WHERE project_id_or_key = {sql_str(key)}")
            self.step("projects read back the description", f"SELECT key, description FROM {P}.projects.projects "
                      f"WHERE project_id_or_key = {sql_str(key)} AND expand = 'description'", contains="stackql smoke project")
        finally:
            self.step("projects DELETE (enable_undo = false)", f"DELETE FROM {P}.projects.projects WHERE project_id_or_key = {sql_str(key)} "
                      f"AND enable_undo = false")

    def write_lifecycles(self) -> None:
        print("== write lifecycles ==")
        if not self.account_id:
            self.record("the identity is known (users.myself)", False, "skipping writes")
            return
        if not self.ensure_project():
            return
        self.issue_lifecycle()
        self.version_lifecycle()
        self.component_lifecycle()
        self.filter_lifecycle()
        self.agile_lifecycle()
        self.property_and_category()

    # ---------------------------------------------------------------- summary
    def summary(self) -> int:
        print("\n== summary ==")
        counts = {"PASS": 0, "FAIL": 0, "SKIP": 0}
        for name, status, note in self.results:
            counts[status] = counts.get(status, 0) + 1
            if status != "PASS":
                print(f"  {status:4s} {name}  [{note[:160]}]")
        registry = "public" if self.args.live else "local"
        print(f"  {counts['PASS']} passed, {counts['FAIL']} failed, {counts['SKIP']} skipped; {self.requests} statements, "
              f"paced at {INTER_REQUEST_DELAY_S}s (registry: {registry})")
        return 1 if counts["FAIL"] else 0


def main() -> int:
    ap = argparse.ArgumentParser(description=f"{PROVIDER} provider smoke test")
    ap.add_argument("--live", action="store_true",
                    help="run against the published provider in the stackql registry (default: the local provider-dev/openapi file registry)")
    ap.add_argument("--cleanup-only", action="store_true", help="sweep stackql-smoke breadcrumbs and exit")
    ap.add_argument("--read-only", action="store_true", help="read smokes only")
    ap.add_argument("--with-project-lifecycle", action="store_true", help="also create / update / delete a whole project")
    args = ap.parse_args()

    smoke = Smoke(args)
    print(f"{PROVIDER} smoke test  registry={'public' if args.live else 'local'}  name={smoke.name}  "
          f"stackql={smoke.sq.version}  project={SMOKE_PROJECT}")
    smoke.cleanup_breadcrumbs()
    if args.cleanup_only:
        return 0
    smoke.read_smokes()
    if not args.read_only:
        smoke.write_lifecycles()
        if args.with_project_lifecycle:
            smoke.project_lifecycle()
    return smoke.summary()


if __name__ == "__main__":
    sys.exit(main())
