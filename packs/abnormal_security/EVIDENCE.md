# Abnormal Security threat response API evidence

Requires the organization Abnormal REST API token with authority to view/modify its threats, plus the documented source-IP allowlist for the tenant egress address. US and EU origins are the exact servers in official OpenAPI 1.4.3. A threat represents a campaign and may include multiple recipients: approval covers that campaign scope. Read message/remediation state first and preserve which messages were already remediated; do not unremediate a pre-existing containment. The documented API accepts remediate/unremediate asynchronously with 202, an action_id and status_url. That URL is returned as data only; get_action_status reconstructs an allowlisted path from explicit IDs. Do not infer completed remediation from acceptance. The threat-detail reference notes pageNumber is currently ignored and only ten messages may be returned despite pageSize; the view is not guaranteed complete. No hidden pagination or retries are performed.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get threat campaign

`GET {{config.base_url}}/v1/threats/{{input.threat_id}}`

Read campaign metadata and the returned message view; documented pagination limitations prevent a completeness claim. API documentation: https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.3

Inputs: `threat_id` (string). Outputs: `threat_id`, `recipient_count`, `messages`, `next_page`.

Read-only; no automatic pagination or asynchronous completion claim.

### Get threat action status

`GET {{config.base_url}}/v1/threats/{{input.threat_id}}/actions/{{input.action_id}}`

Return the documented acknowledged/in_progress/done/error state as data; error is not interpreted as completed remediation. API documentation: https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.3

Inputs: `threat_id` (string), `action_id` (string). Outputs: `status`, `description`.

Read-only; no automatic pagination or asynchronous completion claim.

### Remediate Threat

`POST {{config.base_url}}/v1/threats/{{input.threat_id}}`

Queue a campaign remediation state change. Approval must cover all affected recipients and the captured original state; acceptance is not completion. API documentation: https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.3

Inputs: `threat_id` (string). Outputs: `action_id`, `status_url`.

Inverse: `unremediate_threat`.

### Unremediate Threat

`POST {{config.base_url}}/v1/threats/{{input.threat_id}}`

Queue a campaign remediation state change. Approval must cover all affected recipients and the captured original state; acceptance is not completion. API documentation: https://app.swaggerhub.com/apis-docs/abnormal-security/abx/1.4.3

Inputs: `threat_id` (string). Outputs: `action_id`, `status_url`.

Inverse: `remediate_threat`.

Output contract: each action declares output_types for every extracted field. Native execution checks JSON types without coercion; missing/wrong-type data fails a Read and leaves an accepted mutation ambiguous. Private/on-prem origins are outside these SaaS packs. Any future support requires typed self-hosted/sovereign policy; hosted egress remains public-only.
