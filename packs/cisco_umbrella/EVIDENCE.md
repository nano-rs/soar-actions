# Cisco Umbrella destination response API evidence

Requires a scoped Umbrella OAuth API key with policies.destinations:read/write on the selected destination list. The reusable OAuth plugin authenticates the token exchange with HTTP Basic; credentials are not repeated in the grant form. Only the public Umbrella v2 endpoint is supported. The list must already be an approved blocking list assigned to the intended policy; verify its access setting before approval. Read one bounded 100-item page and honor meta.total/page; deleting a destination requires its numeric ID from that read. Only domains are added, avoiding the documented high-volume-domain URL behavior. Success requires status.code=200 and a blocking-list receipt; HTTP 200 alone is insufficient. Preserve original membership: the inverse is a separate approved operation and must not remove a pre-existing entry.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### List destination page

`GET https://api.umbrella.com/policies/v2/destinationlists/{{input.list_id}}/destinations`

Read one destination page, preserving destination IDs for an exact inverse. API documentation: https://developer.cisco.com/docs/cloud-security/umbrella-api-api-reference-policies-destination-lists-api-destinations-get-destinations-in-destination-list/

Inputs: `list_id` (int), `page` (int). Outputs: `page`.

Read-only; no automatic pagination or asynchronous completion claim.

### Add Domain

`POST https://api.umbrella.com/policies/v2/destinationlists/{{input.list_id}}/destinations`

Mutate one domain/destination ID in an operator-approved blocking list; inspect the returned application status and resolve membership before inverse approval. API documentation: https://developer.cisco.com/docs/cloud-security/umbrella-api-api-reference-policies-destination-lists-api-destinations-add-destinations-to-destination-list/

Inputs: `list_id` (int), `domain` (domain). Outputs: `list`.

Inverse: `remove_destination`.

### Remove Destination

`DELETE https://api.umbrella.com/policies/v2/destinationlists/{{input.list_id}}/destinations/remove`

Mutate one domain/destination ID in an operator-approved blocking list; inspect the returned application status and resolve membership before inverse approval. API documentation: https://developer.cisco.com/docs/cloud-security/umbrella-api-api-reference-policies-destination-lists-api-destinations-delete-destinations-from-destination-list/

Inputs: `list_id` (int), `destination_id` (int). Outputs: `list`.

Inverse: `add_domain`.
