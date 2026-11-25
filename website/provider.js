// The only site-local identity the microsite needs. Everything else comes
// from the shared stackql/docusaurus-config, vendored to .shared-config/ at
// build time (see package.json vendor-config).
export const providerName = 'jira';
export const providerTitle = 'Jira';

// The scoping server variable and its environment variable
// (x-stackQL-envVar): every Jira service is served through the Atlassian API
// gateway, addressed by the site's cloud ID. scripts/sanitize-docs.mjs
// annotates the generated examples "required unless ATLASSIAN_CLOUD_ID is
// set".
export const scopeVariable = 'cloud_id';
export const scopeEnvVar = 'ATLASSIAN_CLOUD_ID';
