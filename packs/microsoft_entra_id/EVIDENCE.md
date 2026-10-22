# Microsoft Entra ID / Graph API references

Disable/enable requires User.EnableDisableAccount.All plus User.Read.All and the applicable Entra role. Revocation requires User.RevokeSessions.All; propagation can take minutes and external-user sessions are excluded. Only immutable GUID user object IDs are accepted. Enabling does not restore revoked sessions. Only the global Graph origin is supported. Rate guidance: https://learn.microsoft.com/en-us/graph/throttling and https://learn.microsoft.com/en-us/graph/throttling-limits .

## Disable user

Set accountEnabled to false for an explicit object ID. Requires User.EnableDisableAccount.All plus User.Read.All and the applicable Entra role. This does not revoke existing sessions. API documentation: https://learn.microsoft.com/en-us/graph/api/user-update?view=graph-rest-1.0

`PATCH https://graph.microsoft.com/v1.0/users/{{input.user_id}}`

Inverse action: `enable_user`.

## Enable user

Set accountEnabled to true for an explicit object ID. Requires User.EnableDisableAccount.All plus User.Read.All and the applicable Entra role. This does not revoke existing sessions. API documentation: https://learn.microsoft.com/en-us/graph/api/user-update?view=graph-rest-1.0

`PATCH https://graph.microsoft.com/v1.0/users/{{input.user_id}}`

Inverse action: `disable_user`.

## Revoke sign-in sessions

Invalidate refresh tokens and browser session cookies. Requires User.RevokeSessions.All. Microsoft documents propagation delay and excludes external-user sessions. Returns the reported Boolean; false is refused. API documentation: https://learn.microsoft.com/en-us/graph/api/user-revokesigninsessions?view=graph-rest-1.0

`POST https://graph.microsoft.com/v1.0/users/{{input.user_id}}/revokeSignInSessions`

Revoked sign-in sessions cannot be recreated; the user must authenticate again.

## Hosts and request budgets

Host: `graph.microsoft.com`. Paths: `/v1.0/users`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
