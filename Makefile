# StackQL jira provider - build, test and docs pipeline.
#
# Every step is deterministic and re-runnable; manual mapping decisions live
# in provider-dev/scripts (rules, skip codes, fix classes), never in
# hand-edited artifacts. `make all` runs the full chain:
#   fetch/pin the two Jira documents -> inventory -> split service specs ->
#   mappings -> pre-normalize -> normalize -> generate (+ post-process,
#   views, GraphQL merge) -> offline + integration + meta-route tests ->
#   docs -> website.
# `make all` never needs credentials and never bills; the live targets
# (`make smoke*`, `make survey-pagination`) are separate and source .env when
# present.
#
# Requirements: Node >= 22.19, GNU make + bash, a stackql binary ($STACKQL,
# ./stackql or on PATH - bin/start-server.sh downloads one if none is found),
# Python 3 (a venv with pystackql is created on demand for the smoke suite),
# yarn for the website. Runs on Linux, macOS or WSL.

SHELL := bash
.DEFAULT_GOAL := help

PROVIDER := jira
VERSION := v00.00.00000
OPENAPI_DIR := provider-dev/openapi
SERVICES_DIR := $(OPENAPI_DIR)/src/$(PROVIDER)
PROVIDER_DIR := $(SERVICES_DIR)/$(VERSION)
SOURCE_DIR := provider-dev/source
CONFIG_DIR := provider-dev/config
GRAPHQL_DIR := provider-dev/source-graphql
# The repository docgen links from the Provider Summary on the docs landing
# page (the label is the URL's last path segment). Always the consuming
# repository's URL, never the template's.
SOURCE_PROJECT ?= https://github.com/stackql-registry/stackql-provider-jira
PORT ?= 5444
VENV := .venv
PY := $(VENV)/bin/python
ENV_FILE := .env

.PHONY: help deps fetch-spec refresh-spec inventory split mappings mappings-report pre-normalize normalize generate post-process graphql-merge build \
        test-offline test-integration test-meta test venv smoke smoke-live smoke-read-only smoke-project-lifecycle smoke-cleanup survey-pagination \
        docs website website-start start-server stop-server server-status clean all

help: ## show this help
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-26s %s\n", $$1, $$2}'

deps: ## install node dependencies (latest @stackql/provider-utils per package.json range)
	npm install

# ---------------------------------------------------------------- pipeline

fetch-spec: ## download the two upstream documents and verify them against the pin (fails on drift)
	npm run fetch-spec

refresh-spec: ## download the documents and ACCEPT the upstream change (rewrites the pin - review the diff)
	npm run fetch-spec -- --update

inventory: ## build provider-dev/config/endpoint_inventory.csv from the pinned documents
	npm run build-inventory

split: ## split the pinned documents into per-service specs (ordered rules in service_names.json) + atlassian_tenant
	npm run split -- --overwrite

mappings: ## add new operations to the all_services.csv dictionary (named by the rules); mapped rows are kept as they are
	npm run generate-mappings -- --provider-name $(PROVIDER) --input-dir $(SOURCE_DIR) --output-dir $(CONFIG_DIR)
	npm run map-operations

mappings-report: ## print the mapping and where it differs from the rules, without writing
	npm run map-operations -- --report

pre-normalize: ## provider-specific spec surgery on provider-dev/source before the generic normalize pass
	npm run pre-normalize

normalize: ## generic provider-utils normalize pass (allOf flatten, oneOf/anyOf lowering, bare-array wrap)
	npm run normalize -- --api-dir $(SOURCE_DIR)

# No --servers: bin/split.mjs writes each service's server template (the
# gateway with the cloud_id variable, or the site template for
# atlassian_tenant) and generate keeps it. Views under
# ./views/<service>/views.yaml are spliced automatically.
generate: ## generate the provider (auth, naive request bodies, views), then post-process and GraphQL merge
	rm -rf $(OPENAPI_DIR)/*
	npm run generate-provider -- \
	  --provider-name $(PROVIDER) \
	  --input-dir $(SOURCE_DIR) \
	  --output-dir $(SERVICES_DIR) \
	  --config-path $(CONFIG_DIR)/all_services.csv \
	  --provider-config $(CONFIG_DIR)/provider_config.json \
	  --naive-req-body-translate \
	  --overwrite
	$(MAKE) post-process
	$(MAKE) graphql-merge

post-process: ## re-apply everything the generator cannot express (numbered rules in post_process.mjs)
	npm run post-process

graphql-merge: ## merge GraphQL-backed resources from provider-dev/source-graphql (no-op when the manifest lists no ops)
	npm run graphql-merge -- --provider-dir $(PROVIDER_DIR) --source-dir $(GRAPHQL_DIR)

build: fetch-spec inventory split mappings pre-normalize normalize generate ## full spec -> provider pipeline

# ------------------------------------------------------------------- tests

test-offline: ## offline validation against the local file registry (SHOW / DESCRIBE, no network)
	npm run test-offline

test-integration: ## row-level and wire-level assertions against the mock Jira API
	npm run test-integration

# The server is always torn down and the meta-route walk's exit status is
# preserved so a failure stops `make all`.
test-meta: ## meta-route walk (every service, resource, method) against a local stackql server
	bash bin/start-server.sh --provider $(PROVIDER) --registry "$(CURDIR)/$(OPENAPI_DIR)" --port $(PORT)
	node bin/test-meta-routes.cjs $(PROVIDER) --port $(PORT); status=$$?; bash bin/stop-server.sh --port $(PORT); exit $$status

test: test-offline test-integration test-meta ## all credential-free test layers

start-server: ## start a local stackql server on PORT (default 5444) over provider-dev/openapi
	bash bin/start-server.sh --provider $(PROVIDER) --registry "$(CURDIR)/$(OPENAPI_DIR)" --port $(PORT)

stop-server: ## stop the local stackql server
	bash bin/stop-server.sh --port $(PORT)

server-status: ## status of the local stackql server
	bash bin/server-status.sh --port $(PORT)

# ------------------------------------------------------------------- smoke

$(VENV)/bin/activate:
	python3 -m venv $(VENV)
	$(VENV)/bin/pip install --quiet --upgrade pip pystackql

venv: $(VENV)/bin/activate ## create the python venv with pystackql for the smoke suite

# The live targets source .env when present so a developer checkout works
# without exporting anything; CI sets the variables from secrets.
with_env = set -a; [ -f $(ENV_FILE) ] && source <(tr -d '\r' < $(ENV_FILE)); set +a;

smoke: venv ## live smoke suite with the locally generated provider - reads + self-cleaning write lifecycles (needs .env)
	@$(with_env) $(PY) tests/smoke_test.py

smoke-live: venv ## live smoke suite against the PUBLISHED provider in the stackql registry (post-publish verification)
	@$(with_env) $(PY) tests/smoke_test.py --live

smoke-read-only: venv ## live read smokes only, no writes
	@$(with_env) $(PY) tests/smoke_test.py --read-only

smoke-project-lifecycle: venv ## live suite INCLUDING the project create / update / delete lifecycle (needs a Jira admin identity)
	@$(with_env) $(PY) tests/smoke_test.py --with-project-lifecycle

smoke-cleanup: venv ## sweep stackql-smoke breadcrumbs (issues, versions, components, filters, projects) and exit
	@$(with_env) $(PY) tests/smoke_test.py --cleanup-only

# Read-only. Re-run after a spec refresh and commit the survey: post_process
# enables next-page-URL pagination only on reads whose nextPage the survey saw
# routed through the API gateway (NOTES.md finding on nextPage hosts).
survey-pagination: ## live, read-only: record where each PageBean read's nextPage URL points (writes provider-dev/config/pagination_survey.json)
	@$(with_env) node tests/live/survey_pagination.mjs

# -------------------------------------------------------------------- docs

docs: ## generate the website docs (snake_case surface, source project link), then sanitize for MDX
	npm run generate-docs -- \
	  --provider-name $(PROVIDER) \
	  --provider-dir ./$(PROVIDER_DIR) \
	  --output-dir ./website \
	  --provider-data-dir ./provider-dev/docgen/provider-data \
	  --snake-case-aliases \
	  --source-project $(SOURCE_PROJECT)
	npm run sanitize-docs

website: ## build the docusaurus microsite (vendors the shared stackql config first)
	cd website && yarn install && yarn build

website-start: ## run the docusaurus dev server
	cd website && yarn install && yarn start

# ------------------------------------------------------------------- misc

clean: ## remove generated artifacts (provider output, docs, website build, test registry copy)
	rm -rf $(OPENAPI_DIR)/* website/build website/.docusaurus website/docs/services tests/integration/.registry-tmp stackql-server.log

all: deps build test docs website ## everything non-live: deps, pipeline, tests, docs, site build
