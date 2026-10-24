# Prisma Cloud CSPM API evidence

The region list is the explicit official OpenAPI server list. Access-key ID and secret stay in native connection credentials. Session login POST /login returns token, sent as x-redlock-auth only to that exact origin; the local session cache expires conservatively after 540 seconds and refreshes once on 401. Permission scope is the key owner role and selected account groups. Dismiss/reopen is a separately approval-gated inverse pair, not automatic remediation. The epoch range does not replace the single explicit alert selector. Requests are accepted receipts; verify with get_alert.

## Get alert

`GET {{config.base_url}}/alert/{{input.alert_id}}`

Get one CSPM alert by ID. Returns structured evidence only; there is no remediation or asset mutation. Official endpoint reference: https://pan.dev/prisma-cloud/api/cspm/get-alert/

Effect: `read`. Read only.

## Dismiss Alert

`POST {{config.base_url}}/alert/dismiss`

Change one explicit alert ID only. The required filter supplies an epoch-to-now range, and no policy IDs or broad user-controlled filters are accepted. Dismissal has no snooze interval. A 200 response acknowledges the requested status update; re-read the alert to verify state. Official endpoint reference: https://pan.dev/prisma-cloud/api/cspm/dismiss-alerts/

Effect: `destructive`. Inverse: `reopen_alert`.

## Reopen Alert

`POST {{config.base_url}}/alert/reopen`

Change one explicit alert ID only. The required filter supplies an epoch-to-now range, and no policy IDs or broad user-controlled filters are accepted. Dismissal has no snooze interval. A 200 response acknowledges the requested status update; re-read the alert to verify state. Official endpoint reference: https://pan.dev/prisma-cloud/api/cspm/reopen-alerts/

Effect: `destructive`. Inverse: `dismiss_alert`.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
