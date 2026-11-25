// The atlassian_tenant service: one authored operation, not part of either
// vendor document. Every Jira Cloud site answers
//   GET https://<site>.atlassian.net/_edge/tenant_info
// without authentication with {"cloudId": "<uuid>"} - the value the gateway
// server variable cloud_id (ATLASSIAN_CLOUD_ID) needs and the one users find
// hardest to look up. bin/split.mjs emits this document as
// provider-dev/source/atlassian_tenant.yaml so it flows through mappings,
// normalize, generate and the tests like a vendor service.
//
// The endpoint ignores any Authorization header (measured: a valid bearer, a
// garbage bearer and none all answer 200), so the provider's OAuth2 token
// being sent with it is harmless. A site that does not exist answers 404 with
// an HTML body.

import { SERVERS } from './spec_helpers.mjs';

export const TENANT_SERVICE = 'atlassian_tenant';

export function tenantServiceDoc() {
  return {
    openapi: '3.0.1',
    info: {
      title: 'Atlassian Tenant',
      description: 'Public, unauthenticated site metadata: the cloud ID of a Jira Cloud site, looked up by its subdomain.',
      version: '1.0.0'
    },
    servers: JSON.parse(JSON.stringify(SERVERS.site)),
    paths: {
      '/_edge/tenant_info': {
        get: {
          operationId: 'getTenantInfo',
          summary: 'Get the cloud ID of a site',
          description: 'Returns the cloud ID of the Jira Cloud site addressed by the site server variable (the subdomain of https://<site>.atlassian.net). The endpoint is public: it needs no credentials. The cloud ID is the value ATLASSIAN_CLOUD_ID (the cloud_id server variable of every other jira service) takes.',
          tags: ['Tenant'],
          responses: {
            200: {
              description: 'Returned if the site exists.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TenantInfo' }
                }
              }
            },
            404: { description: 'Returned if no site has this subdomain.' }
          }
        }
      }
    },
    components: {
      schemas: {
        TenantInfo: {
          type: 'object',
          description: 'Site metadata.',
          properties: {
            cloudId: { type: 'string', description: 'The cloud ID of the site.', example: '1b5c9234-a0db-4a03-b735-6b3a3ed66889' }
          }
        }
      }
    },
    tags: [{ name: 'Tenant', description: 'Site metadata.' }]
  };
}
