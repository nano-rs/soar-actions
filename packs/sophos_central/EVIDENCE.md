# Sophos Central API evidence

Requires tenant-level API credentials with endpoint read/isolation authority. Select the tenant region reported by Who-am-I; the reviewed regions are enumerated from https://developer.sophos.com/concepts/regions/ . The X-Tenant-ID connection field selects that tenant. The returned enabled flag describes requested isolation settings; verify actual endpoint connectivity separately. Wait for an in-progress operation before reversing it (409 stops the action).

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get isolation settings

`GET {{config.base_url}}/endpoint/v1/endpoints/{{input.endpoint_id}}/isolation`

Read requested isolation settings for one endpoint. API documentation: https://developer.sophos.com/reference/endpoint-v1/endpoint-isolation/get-endpoint-isolation-by-id/

Inputs: `endpoint_id` (string). Outputs: `enabled`.

Read-only; no automatic pagination or asynchronous completion claim.

### Isolate Endpoint

`PATCH {{config.base_url}}/endpoint/v1/endpoints/{{input.endpoint_id}}/isolation`

Request the isolation setting for one explicit endpoint; acknowledgment does not prove agent completion. API documentation: https://developer.sophos.com/reference/endpoint-v1/endpoint-isolation/update-endpoint-isolation-by-id/

Inputs: `endpoint_id` (string). Outputs: `enabled`.

Inverse: `release_endpoint`.

### Release Endpoint

`PATCH {{config.base_url}}/endpoint/v1/endpoints/{{input.endpoint_id}}/isolation`

Request the isolation setting for one explicit endpoint; acknowledgment does not prove agent completion. API documentation: https://developer.sophos.com/reference/endpoint-v1/endpoint-isolation/update-endpoint-isolation-by-id/

Inputs: `endpoint_id` (string). Outputs: `enabled`.

Inverse: `isolate_endpoint`.
