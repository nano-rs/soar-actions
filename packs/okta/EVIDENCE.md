# Okta API references

Requires the relevant user lifecycle/session administrator authority for the connected organization. SSWS API tokens inherit their owner permissions. The configured suffixes cover Okta, preview and EMEA organizations. Suspension and restoration are paired. Session revocation is irreversible and requires reauthentication. Rate limits vary by endpoint, org and token principal. Rate guidance: https://developer.okta.com/docs/reference/rate-limits/ .

## Suspend user

Suspend user. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserLifecycle/#tag/UserLifecycle/operation/suspendUser

`POST {{config.base_url}}/api/v1/users/{{input.user_id}}/lifecycle/suspend`

Inverse action: `unsuspend_user`.

## Unsuspend user

Unsuspend user. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserLifecycle/#tag/UserLifecycle/operation/unsuspendUser

`POST {{config.base_url}}/api/v1/users/{{input.user_id}}/lifecycle/unsuspend`

Inverse action: `suspend_user`.

## Revoke sessions

Revoke sessions. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.okta.com/docs/api/openapi/okta-management/management/tag/UserSessions/#tag/UserSessions/operation/revokeUserSessions

`DELETE {{config.base_url}}/api/v1/users/{{input.user_id}}/sessions`

Revoked sessions cannot be recreated; the user must authenticate again. This does not clear sessions established by web or native apps.

## Hosts and request budgets

Host: `{{config.base_url}}`. Paths: `/api/v1/users`.

Tenant suffixes: `.okta.com`, `.oktapreview.com`, `.okta-emea.com`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
