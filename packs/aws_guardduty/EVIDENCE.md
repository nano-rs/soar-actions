# AWS GuardDuty findings API evidence

Requires guardduty:ListFindings and guardduty:GetFindings using STS response credentials. Select matching endpoint and signing region from the reviewed explicit region set. List calls return at most fifty finding IDs. The first-page and next-page actions are separate so the caller explicitly supplies the opaque nextToken; no page is claimed complete when a token remains. get_finding reads one explicit finding ID. No finding archive/delete or cloud mutation is performed.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### List Findings

`POST {{config.base_url}}/detector/{{input.detector_id}}/findings`

Read one bounded page of finding identifiers and the returned pagination token. API documentation: https://docs.aws.amazon.com/guardduty/latest/APIReference/API_ListFindings.html

Inputs: `detector_id` (string). Outputs: `finding_ids`, `next_token`.

Read-only; no automatic pagination or asynchronous completion claim.

### List Findings Page

`POST {{config.base_url}}/detector/{{input.detector_id}}/findings`

Read one bounded page of finding identifiers and the returned pagination token. API documentation: https://docs.aws.amazon.com/guardduty/latest/APIReference/API_ListFindings.html

Inputs: `detector_id` (string), `next_token` (string). Outputs: `finding_ids`, `next_token`.

Read-only; no automatic pagination or asynchronous completion claim.

### Get finding details

`POST {{config.base_url}}/detector/{{input.detector_id}}/findings/get`

Read one explicit finding and return its documented structured metadata. API documentation: https://docs.aws.amazon.com/guardduty/latest/APIReference/API_GetFindings.html

Inputs: `detector_id` (string), `finding_id` (string). Outputs: `findings`.

Read-only; no automatic pagination or asynchronous completion claim.
