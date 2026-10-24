# Box API evidence

Existing native bearer auth accepts a vendor-issued OAuth token, stored only as a connection credential. Token issuance/rotation is external; no refresh token or JWT private key is embedded. Session termination is an asynchronous enterprise-admin API, with 202 plus the documented SessionTerminationMessage. No job ID, polling URL or completion state is invented. No redirect/follow-up URL from vendor responses is followed. Single-user selection only.

## Get user

`GET https://api.box.com/2.0/users/{{input.user_id}}`

Retrieve one user in the enterprise. Requires the application and authenticated user to have permission to look up enterprise users. External users can have a limited representation. Official endpoint reference: https://developer.box.com/reference/get-users-id/

Effect: `read`. Read only.

## End user sessions

`POST https://api.box.com/2.0/users/terminate_sessions`

Create asynchronous jobs to terminate sessions for one explicit enterprise user ID. Both required array fields are sent; user_logins is empty, so it cannot select additional users. Requires enterprise administrator/co-admin session-termination permission. HTTP 202 with a message acknowledges scheduling only; check Box admin events for eventual results. Official endpoint reference: https://developer.box.com/reference/post-users-terminate-sessions/

Effect: `destructive`. Terminated sessions cannot be restored through an inverse API. The user must authenticate again; an accepted asynchronous job is not proof all sessions have ended.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
