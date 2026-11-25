#!/usr/bin/env bash

# Fetches the upstream Jira Cloud OpenAPI documents and pins them.
#
# Atlassian publishes two documents (SPECS in
# provider-dev/scripts/lib/spec_helpers.mjs): the platform REST API v3 and
# the Jira Software REST API. The whole fetch (download, the deterministic
# fix classes, swagger-parser validation, redaction, pin verification,
# snapshot write) is provider-dev/scripts/record_spec_pin.mjs.
#
# If either document does not match the recorded pin the script fails
# without writing anything; pass --update to accept the upstream change and
# rewrite the pin (treat the resulting spec diff as a reviewed refresh - run
# .claude/skills/stackql-provider-development/scripts/spec_diff.mjs on the old
# and new snapshot and record the summary in NOTES.md).
#
# Usage: bin/fetch-spec.sh [--update]

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

cd "$REPO_ROOT"
node provider-dev/scripts/record_spec_pin.mjs "$@"
