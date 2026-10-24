# Atlassian Cloud API evidence

Current v2 suspend/restore routes use explicit organization and directory IDs. A personal API token for Jira Basic authentication is not an organization API key. No user removal or organization deactivation is exposed. 204 is the documented success response with no body; 429 is a hard stop. Restore has billing impact and requires its own approval. No SCIM/API path is guessed from the XSOAR MCP integration; official Atlassian REST operations alone establish these shapes.

## Suspend User

`POST https://api.atlassian.com/admin/v2/orgs/{{config.organization_id}}/directories/{{config.directory_id}}/users/{{input.account_id}}/suspend`

Use the current directory-aware organization-admin API. Suspend temporarily removes app access and billing; restore reinstates roles/group memberships and resumes billing. Requires organization admin API key and matching directory. Each direction requires approval. Official endpoint reference: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/

Effect: `destructive`. Inverse: `restore_user`.

## Restore User

`POST https://api.atlassian.com/admin/v2/orgs/{{config.organization_id}}/directories/{{config.directory_id}}/users/{{input.account_id}}/restore`

Use the current directory-aware organization-admin API. Suspend temporarily removes app access and billing; restore reinstates roles/group memberships and resumes billing. Requires organization admin API key and matching directory. Each direction requires approval. Official endpoint reference: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/

Effect: `destructive`. Inverse: `suspend_user`.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.

## Get directory user (Read)

GET /admin/v2/orgs/{orgId}/directories/{directoryId}/users/{userId} uses the same account identifier as the suspend/restore routes. The official operation lists the path placeholder as userId and parameter component as accountId; only the placeholder name differs, not the wire position. Response: HTTP 200, MultiDirectoryUserDetails with data.accountId:string. Requires directory-read permission. Provides a Read action for the issue's per-pack test-mode smoke acceptance before any mutation.

Official operation/schema reference: https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/
