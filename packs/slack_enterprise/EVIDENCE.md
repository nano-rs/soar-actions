# Slack Enterprise API evidence

Enterprise Admin API requires organization-installed authorized user tokens; workspace bot tokens are insufficient. Existing native bearer auth stores the OAuth access token. Slack Tier 2 (20+ requests/minute) applies to reset; our cap is 10/minute and 500/day. HTTP 429 and auth/rbac failures stop, without retrying mutations. This operation is session revocation, not user deactivation.

## Get user

`GET https://slack.com/api/users.info`

Look up one explicit Slack user. Requires users:read. Slack can return HTTP 200 with ok:false; this is rejected. Official endpoint reference: https://docs.slack.dev/reference/methods/users.info/

Effect: `read`. Read only.

## Revoke user sessions

`POST https://slack.com/api/admin.users.session.reset`

Revoke sessions on all supported devices for one user in an Enterprise organization. Requires admin.users:write and an org-installed user token authorized by an Org Admin/Owner. No mobile_only/web_only filters are sent, so both classes use vendor defaults. HTTP 200 ok:false never establishes success. No account deletion or token revocation endpoint is exposed. Official endpoint reference: https://docs.slack.dev/reference/methods/admin.users.session.reset/

Effect: `destructive`. Revoked sessions cannot be restored by an API inverse. The user must authenticate again according to organization policy.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
