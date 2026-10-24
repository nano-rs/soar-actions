# Kandji API evidence

The official Kandji documentation redirects to the Iru Endpoint Management API, which still documents .api.kandji.io origins. Only that documented suffix is admitted; other regions require a separately reviewed origin. This first pack is Read-only. Device-list pages are explicit and bounded, and empty lists are supported. The official lock response contains a generated unlock PIN, so lock is not exposed by these Read actions. No Kandji-specific integration exists in the inspected XSOAR snapshot; the analogous Jamf device lookup workflow informed action selection. API-token permissions are set per endpoint in the vendor console. The public collection documents request limits; vendor quotas may be lower than local caps.

## Get device

`GET {{config.base_url}}/api/v1/devices/{{input.device_id}}`

Get one device from the documented Kandji/Iru API. Optional fields remain in the typed device object; no command or unlock PIN is requested. Official endpoint reference: https://api-docs.iru.com/

Effect: `read`. Read only.

## List one device page

`GET {{config.base_url}}/api/v1/devices`

Return at most 100 device records from one explicit offset page. The documented limit is at most 300; this pack uses 100. Empty pages are valid. This is not a complete inventory and does not follow response-supplied URLs. Official endpoint reference: https://api-docs.iru.com/

Effect: `read`. Read only.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
