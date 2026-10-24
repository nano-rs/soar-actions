# Cisco Duo user response API evidence

Requires a Duo Admin API integration with Grant resource - Read/Write. Use the exact API hostname shown in the Duo Admin Panel; no Auth API integration key is substituted. The reusable native plugin uses current v5 SHA-512/JSON request signing, including engine Date, sorted query and signed X-Duo headers; legacy SHA-1 is not used. Read the user first. This pair covers an originally active user: disable prevents completion of secondary authentication, and the inverse restores active status with secondary authentication required. It does not restore bypass status, revoke upstream primary-provider sessions or reconstruct prior policy. A directory sync or other admin may concurrently change status; verify state after mutation. One immutable user ID is targeted, with no bulk pagination or hidden retry.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get Duo user

`GET {{config.base_url}}/admin/v1/users/{{input.user_id}}`

Read one user by immutable Duo user ID and preserve the original status. API documentation: https://duo.com/docs/adminapi

Inputs: `user_id` (string). Outputs: `user_id`, `username`, `status`.

Read-only; no automatic pagination or asynchronous completion claim.

### Disable User

`POST {{config.base_url}}/admin/v1/users/{{input.user_id}}`

Set one explicit Duo user status. Only an originally active user has an exact active/disabled inverse; inspect prior status and obtain approval for either direction. API documentation: https://duo.com/docs/adminapi

Inputs: `user_id` (string). Outputs: `user_id`, `status`.

Inverse: `enable_user`.

### Enable User

`POST {{config.base_url}}/admin/v1/users/{{input.user_id}}`

Set one explicit Duo user status. Only an originally active user has an exact active/disabled inverse; inspect prior status and obtain approval for either direction. API documentation: https://duo.com/docs/adminapi

Inputs: `user_id` (string). Outputs: `user_id`, `status`.

Inverse: `disable_user`.

Output contract: each action declares output_types for every extracted field. Native execution checks JSON types without coercion; missing/wrong-type data fails a Read and leaves an accepted mutation ambiguous. Private/on-prem origins are outside these SaaS packs. Any future support requires typed self-hosted/sovereign policy; hosted egress remains public-only.
