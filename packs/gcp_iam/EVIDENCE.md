# GCP IAM service account keys API evidence

Requires a separate response service account with iam.serviceAccountKeys.get/disable/enable on the target service account, using a stored PKCS#8 key and service-account email for RFC 7523 token exchange. The bearer token and signed assertion stay inside the auth plugin and are redacted. Do not use the key being contained as the connection credential. Key disable does not revoke already-issued short-lived credentials; verify the key state with get_key. Re-enable only a key that was enabled before containment. IAM is a global public endpoint. The backend validates catalog replay with an ephemeral in-memory RSA key; neither that key nor an assertion is stored in the pack or fixture.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get service account key metadata

`GET https://iam.googleapis.com/v1/projects/{{config.project_id}}/serviceAccounts/{{input.service_account_email}}/keys/{{input.key_id}}`

Read key metadata without returning private key material. A missing disabled flag follows the API protobuf default of false. API documentation: https://docs.cloud.google.com/iam/docs/reference/rest/v1/projects.serviceAccounts.keys/get

Inputs: `service_account_email` (email), `key_id` (string). Outputs: `metadata`.

Read-only; no automatic pagination or asynchronous completion claim.

### Disable Key

`POST https://iam.googleapis.com/v1/projects/{{config.project_id}}/serviceAccounts/{{input.service_account_email}}/keys/{{input.key_id}}:disable`

Request one explicit service account key state change and require the documented empty JSON success body. Verify resulting state with get_key. API documentation: https://docs.cloud.google.com/iam/docs/reference/rest/v1/projects.serviceAccounts.keys/disable

Inputs: `service_account_email` (email), `key_id` (string). Outputs: .

Inverse: `enable_key`.

### Enable Key

`POST https://iam.googleapis.com/v1/projects/{{config.project_id}}/serviceAccounts/{{input.service_account_email}}/keys/{{input.key_id}}:enable`

Request one explicit service account key state change and require the documented empty JSON success body. Verify resulting state with get_key. API documentation: https://docs.cloud.google.com/iam/docs/reference/rest/v1/projects.serviceAccounts.keys/enable

Inputs: `service_account_email` (email), `key_id` (string). Outputs: .

Inverse: `disable_key`.
