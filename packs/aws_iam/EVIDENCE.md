# AWS IAM access keys API evidence

Requires a separate short-lived STS response principal with iam:ListAccessKeys and iam:UpdateAccessKey on the target user. Provide all three STS credential fields; rotate expired session credentials through the credential store. This version targets the standard AWS partition/global IAM endpoint, signed in us-east-1. UserName is always explicit, so this pack does not operate on implicit/root-user credentials. ListAccessKeys returns one 100-item XML page; honor IsTruncated/Marker instead of assuming a short page is complete. Capture the prior status: the inverse only re-enables a key that was Active before containment. Key secret values are never returned.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### List user access keys

`GET https://iam.amazonaws.com/`

Read one page of key IDs, statuses and creation metadata as the documented XML response; no secret access key is disclosed. API documentation: https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListAccessKeys.html

Inputs: `user_name` (string), `marker` (string). Outputs: `response_xml`.

Read-only; no automatic pagination or asynchronous completion claim.

### Disable Access Key

`POST https://iam.amazonaws.com/`

Set one explicit IAM user key status. Preserve its original status and use a separate response principal. API documentation: https://docs.aws.amazon.com/IAM/latest/APIReference/API_UpdateAccessKey.html

Inputs: `user_name` (string), `target_access_key_id` (string). Outputs: `receipt_xml`.

Inverse: `enable_access_key`.

### Enable Access Key

`POST https://iam.amazonaws.com/`

Set one explicit IAM user key status. Preserve its original status and use a separate response principal. API documentation: https://docs.aws.amazon.com/IAM/latest/APIReference/API_UpdateAccessKey.html

Inputs: `user_name` (string), `target_access_key_id` (string). Outputs: `receipt_xml`.

Inverse: `disable_access_key`.
