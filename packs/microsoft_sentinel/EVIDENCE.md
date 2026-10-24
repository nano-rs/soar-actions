# Microsoft Sentinel API evidence

Only public Azure ARM and Entra token hosts are admitted. Uses the existing OAuth client-credentials plugin. The native bounded with_field helper is required so a status PUT can preserve the full fetched properties instead of silently clearing optional fields. PUT etag is the official optimistic-concurrency field. The update expects 200, not creation 201. API-version is pinned. National clouds and private ARM proxies are not inferred.

## Get incident

`GET https://management.azure.com/subscriptions/{{config.subscription_id}}/resourceGroups/{{config.resource_group}}/providers/Microsoft.OperationalInsights/workspaces/{{config.workspace}}/providers/Microsoft.SecurityInsights/incidents/{{input.incident_id}}`

Read one incident through public-cloud ARM. Requires Microsoft Sentinel Reader or equivalent narrowly scoped role. Official endpoint reference: https://learn.microsoft.com/en-us/rest/api/securityinsights/incidents/get?view=rest-securityinsights-2025-09-01

Effect: `read`. Read only.

## Set active/new incident status

`PUT https://management.azure.com/subscriptions/{{config.subscription_id}}/resourceGroups/{{config.resource_group}}/providers/Microsoft.OperationalInsights/workspaces/{{config.workspace}}/providers/Microsoft.SecurityInsights/incidents/{{input.incident_id}}`

First read the existing incident, then use its etag and complete properties for a PUT that changes status only. This preserves owner, labels, description and unrecognized future properties. An etag conflict fails; no retry, create or close operation is exposed. Requires Microsoft Sentinel Responder or equivalent incident write permission. Official endpoint reference: https://learn.microsoft.com/en-us/rest/api/securityinsights/incidents/create-or-update?view=rest-securityinsights-2025-09-01

Effect: `destructive`. Restore the previous status through a new explicitly approved call after re-reading current state. Closed-state classification updates are not exposed.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
