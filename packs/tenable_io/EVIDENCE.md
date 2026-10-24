# Tenable Vulnerability Management — batch=C

Requires a scoped Tenable Vulnerability Management API key pair with the Basic [16] role or the documented VM explore read privilege and access to the selected assets. The native composite-token plugin constructs X-ApiKeys from two credential-store fields; neither key enters a template/config/fixture. Only standard cloud.tenable.com is supported. Workbench calls default to a 30-day lookback here and the documented asset-vulnerability endpoint is capped at 5,000 results; it is not a full or frequent export mechanism. Results may be incomplete due to provider cap, permissions or the lookback. These actions never start scans or exports, change vulnerability state or fetch attachment/linked URLs. Numeric/string values are returned as the provider defines them, without a clean/security verdict.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get asset details

`GET https://cloud.tenable.com/assets/{{input.asset_id}}` — read.

Read metadata for one authorized asset UUID. API documentation: https://developer.tenable.com/reference/assets-asset-info

Inputs: `asset_id` (string). Outputs: `asset`: object.

### List recorded asset vulnerabilities

`GET https://cloud.tenable.com/workbenches/assets/{{input.asset_id}}/vulnerabilities` — read.

Read the provider-capped asset vulnerability view for the past 30 days; do not infer complete coverage from an empty or short result. API documentation: https://developer.tenable.com/reference/workbenches-asset-vulnerabilities

Inputs: `asset_id` (string). Outputs: `page`: object.

### Get plugin vulnerability metadata

`GET https://cloud.tenable.com/workbenches/vulnerabilities/{{input.plugin_id}}/info` — read.

Read the selected plugin findings metadata within the same 30-day workbench view. API documentation: https://developer.tenable.com/reference/workbenches-vulnerability-info

Inputs: `plugin_id` (int). Outputs: `info`: object.
