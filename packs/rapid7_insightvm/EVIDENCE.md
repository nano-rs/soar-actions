# Rapid7 InsightVM Cloud — batch=C

Uses the documented InsightVM Cloud Integrations v4 API with a scoped platform API key and access to the selected assets. Region hosts are exactly the seven Region enum values in the public OpenAPI schema. This is the Cloud API, not the private/on-prem Security Console. get_asset includes the provider current vulnerability assessment view (includeSame=true); asset and vulnerability searches send bounded explicit criteria in the documented vendor search DSL and request one 50-record page. Vulnerability-only filtering of an asset search filters findings within assets, not the asset population: use the asset chunk for asset eligibility. Search criteria cannot select a destination URL, transport header or arbitrary API path. The full page preserves metadata/cursor/links; none is auto-followed and an empty view is not a clean verdict. No scans, exports, remediation or asset deletion are performed.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get cloud asset assessment

`GET {{config.base_url}}/vm/v4/integration/assets/{{input.asset_id}}` — read.

Read one compound cloud asset ID with the current assessment/vulnerability view; response IPs are data, not egress destinations. API documentation: https://help.rapid7.com/insightvm/en-us/api/insightvm-api-v4.json

Inputs: `asset_id` (string). Outputs: `asset`: object.

### Search Assets

`POST {{config.base_url}}/vm/v4/integration/assets` — read.

Read one 50-record cloud search page using explicit vendor criteria. Inspect metadata before a separate caller-requested next page. API documentation: https://help.rapid7.com/insightvm/en-us/api/insightvm-api-v4.json

Inputs: `asset_filter` (text), `vulnerability_filter` (text), `cursor` (string). Outputs: `page`: object.

### Search Vulnerabilities

`POST {{config.base_url}}/vm/v4/integration/vulnerabilities` — read.

Read one 50-record cloud search page using explicit vendor criteria. Inspect metadata before a separate caller-requested next page. API documentation: https://help.rapid7.com/insightvm/en-us/api/insightvm-api-v4.json

Inputs: `vulnerability_filter` (text), `cursor` (string). Outputs: `page`: object.
