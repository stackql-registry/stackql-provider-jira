#!/usr/bin/env bash

# Downloads the pinned Jira Cloud OpenAPI specs into provider-dev/downloaded/
# and records the fetch date and content hashes in
# provider-dev/config/spec_pin.json.
#
# Jira Cloud is a continuously delivered API - the published spec URLs are not
# versioned, so the pin is the only record of what was built. If a download
# does not match the recorded pin the script fails without writing anything;
# pass --update to accept the upstream change and rewrite the pin (treat the
# resulting source diff as a reviewed spec refresh).
#
# Usage: bin/fetch-specs.sh [--update]

set -euo pipefail

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REPO_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
DOWNLOAD_DIR="$REPO_ROOT/provider-dev/downloaded"
PIN_FILE="$REPO_ROOT/provider-dev/config/spec_pin.json"

UPDATE=false
if [ "${1:-}" = "--update" ]; then
  UPDATE=true
fi

# name|url|filename
SPECS=(
  "jira-platform-v3|https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json|jira-platform-v3.json"
  "jira-software-agile|https://dac-static.atlassian.com/cloud/jira/software/swagger.v3.json|jira-software-agile.json"
)

mkdir -p "$DOWNLOAD_DIR"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

for entry in "${SPECS[@]}"; do
  IFS='|' read -r name url filename <<< "$entry"
  echo "Fetching $name from $url"
  curl -fsSL "$url" -o "$TMP_DIR/$filename"
done

# Verify against the pin (or write it), then move downloads into place.
# All hash/JSON work is done in node for portability.
UPDATE="$UPDATE" TMP_DIR="$TMP_DIR" DOWNLOAD_DIR="$DOWNLOAD_DIR" PIN_FILE="$PIN_FILE" \
node "$SCRIPT_DIR/../provider-dev/scripts/record_spec_pin.mjs" "${SPECS[@]}"

echo "Specs downloaded to $DOWNLOAD_DIR, pin recorded in $PIN_FILE"
