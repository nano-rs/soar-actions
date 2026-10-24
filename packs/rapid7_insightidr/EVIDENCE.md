# Rapid7 InsightIDR API evidence

The official OpenAPI supplies seven public region origins. X-Api-Key uses the existing native header plugin. No multi-customer/RRN expansion or live API call is used. Read permissions are those of the key owner; update requires investigation edit permission. The official enum encodes comma-separated values in a single enum string but examples and descriptions explicitly define the individual uppercase status values. Status changes conservatively require approval.

## Get investigation

`GET {{config.base_url}}/idr/v2/investigations/{{input.investigation_id}}`

Read one investigation UUID in the connection organization. No multi-customer query is exposed. Official endpoint reference: https://help.rapid7.com/insightidr/en-us/api/v2/docs.html#tag/Investigations

Effect: `read`. Read only.

## List investigation page

`GET {{config.base_url}}/idr/v2/investigations`

Read one explicit page of at most 100 investigations. Default vendor time range applies. Empty pages are valid; this pack does not iterate or follow response URLs. Official endpoint reference: https://help.rapid7.com/insightidr/en-us/api/v2/docs.html#tag/Investigations

Effect: `read`. Read only.

## Set investigation status

`PATCH {{config.base_url}}/idr/v2/investigations/{{input.investigation_id}}`

Update only status; omitted fields remain unchanged under the documented PATCH contract. Read the returned state. Closure of investigations associated with Threat Command can require additional close-reason fields; those combinations are not exposed. Official endpoint reference: https://help.rapid7.com/insightidr/en-us/api/v2/docs.html#tag/Investigations

Effect: `destructive`. The prior status is not known at authoring time. An authorized operator can re-read and explicitly restore it using this same approved action. No automatic rollback is performed.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
