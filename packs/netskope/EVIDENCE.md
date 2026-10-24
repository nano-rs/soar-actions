# Netskope API evidence

Requires a scoped REST API v2 token with destination-profile Read/Write permission and the tenant feature/license. Destination profiles must already be selected by the intended security policy. list_destination_profiles fetches one 100-item offset page; use the returned total_count to request further offsets. append/remove stage or update one exact value and preserve unrelated values; status is returned without an enforcement/completion claim. Review/apply pending destination-profile changes separately using the vendor workflow; this pack never deploys unrelated pending policy changes. Read/preserve prior membership before an approved inverse.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### List destination profiles

`GET {{config.base_url}}/api/v2/profiles/destinations`

Read one offset page of destination profiles. API documentation: https://docs.netskope.com/en/threat-exchange-plugin/

Inputs: `offset` (int). Outputs: `profiles`, `total_count`.

Read-only; no automatic pagination or asynchronous completion claim.

### Add Profile Value

`POST {{config.base_url}}/api/v2/profiles/destinations/{{input.profile_id}}/values`

Update one destination-profile value. Returned status is vendor state; this action does not deploy pending policies. API documentation: https://docs.netskope.com/en/threat-exchange-plugin/

Inputs: `profile_id` (string), `value` (string). Outputs: `profile_id`, `status`, `values_count`.

Inverse: `remove_profile_value`.

### Remove Profile Value

`POST {{config.base_url}}/api/v2/profiles/destinations/{{input.profile_id}}/values`

Update one destination-profile value. Returned status is vendor state; this action does not deploy pending policies. API documentation: https://docs.netskope.com/en/threat-exchange-plugin/

Inputs: `profile_id` (string), `value` (string). Outputs: `profile_id`, `status`, `values_count`.

Inverse: `add_profile_value`.

Output contract: each action declares output_types for every extracted field. Native execution checks JSON types without coercion; missing/wrong-type data fails a Read and leaves an accepted mutation ambiguous. Private/on-prem origins are outside these SaaS packs. Any future support requires typed self-hosted/sovereign policy; hosted egress remains public-only.
