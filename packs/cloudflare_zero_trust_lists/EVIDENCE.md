# Cloudflare Zero Trust lists API evidence

Requires an account-scoped API token with Zero Trust Read/Write permission. An existing DOMAIN list must already be referenced by the intended Gateway policy; list edits do not create a blocking rule. append/remove change only the supplied exact domain. Read the list first and preserve whether the value was already present before authorizing a later inverse. Domain values are data for Cloudflare, not additional egress destinations.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get Gateway list

`GET https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/gateway/lists/{{input.list_id}}`

Read the selected list and its reported entries. API documentation: https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/get/

Inputs: `list_id` (string). Outputs: `list`.

Read-only; no automatic pagination or asynchronous completion claim.

### Add Domain

`PATCH https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/gateway/lists/{{input.list_id}}`

Patch one domain in an existing Gateway list; the response is the list receipt, not a claim about downstream policy enforcement. API documentation: https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/edit/

Inputs: `list_id` (string), `domain` (domain). Outputs: `list`.

Inverse: `remove_domain`.

### Remove Domain

`PATCH https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/gateway/lists/{{input.list_id}}`

Patch one domain in an existing Gateway list; the response is the list receipt, not a claim about downstream policy enforcement. API documentation: https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists/methods/edit/

Inputs: `list_id` (string), `domain` (domain). Outputs: `list`.

Inverse: `add_domain`.
