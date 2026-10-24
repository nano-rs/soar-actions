# Palo Alto Cortex XDR API evidence

Requires a standard Cortex XDR API key and its ID, with endpoint read and response-action RBAC. Advanced API keys requiring nonce/timestamp hashing are not selected by this connection. Use the tenant API FQDN from Cortex; the vendor-owned suffix is resolved to that exact host. Isolation receipts contain a string action ID and endpoint count; they acknowledge dispatch only. get_action_status takes the vendor's numeric group action ID. Endpoint reads filter one explicit ID, avoiding an unbounded endpoint walk.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get endpoint

`POST {{config.base_url}}/public_api/v1/endpoints/get_endpoint`

Read the endpoint selected by its immutable ID. API documentation: https://cortex-docs.paloaltonetworks.com/xdr-5-api/cortex-platform/endpoint-management.md

Inputs: `endpoint_id` (string). Outputs: `endpoints`.

Read-only; no automatic pagination or asynchronous completion claim.

### Get action status

`POST {{config.base_url}}/public_api/v1/actions/get_action_status`

Read reported response-action state; a successful lookup does not assert that every endpoint succeeded. API documentation: https://cortex-docs.paloaltonetworks.com/xdr-5-api/cortex-platform/response-action.md

Inputs: `group_action_id` (int). Outputs: `status_by_agent`.

Read-only; no automatic pagination or asynchronous completion claim.

### Isolate Endpoint

`POST {{config.base_url}}/public_api/v1/endpoints/isolate`

Dispatch one endpoint response action. Read its state separately; this receipt is not completion. API documentation: https://cortex-docs.paloaltonetworks.com/xdr-5-api/cortex-platform/response-action.md

Inputs: `endpoint_id` (string). Outputs: `action_id`, `endpoints_count`.

Inverse: `unisolate_endpoint`.

### Unisolate Endpoint

`POST {{config.base_url}}/public_api/v1/endpoints/unisolate`

Dispatch one endpoint response action. Read its state separately; this receipt is not completion. API documentation: https://cortex-docs.paloaltonetworks.com/xdr-5-api/cortex-platform/response-action.md

Inputs: `endpoint_id` (string). Outputs: `action_id`, `endpoints_count`.

Inverse: `isolate_endpoint`.
