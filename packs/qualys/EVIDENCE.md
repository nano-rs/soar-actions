# Qualys VMDR — batch=C

Requires a Qualys VM/VMDR API-enabled Reader (or higher) account scoped to the target hosts, plus KnowledgeBase permission; Auditor lacks detection/KnowledgeBase rights. Select the exact public Qualys API platform from the official identification list. HTTP Basic stays inside native auth and X-Requested-With identifies this client. All calls target one explicit host ID or QID and never launch scans or update host/vulnerability state. Host pages are truncated to one host; inspect WARNING/URL metadata in the raw XML before claiming completeness. Follow-up URLs are data and never fetched. Native output is the full bounded XML document as a string, not a fabricated JSON parse or clean verdict; a Qualys SIMPLE_RETURN error is not an accepted data root. Private Cloud Platform origins are outside this public pack and require self-hosted/sovereign deployment policy.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get Asset

`GET {{config.base_url}}/api/2.0/fo/asset/host/` — read.

Read one explicit scanned host ID as the documented XML view. API documentation: https://cdn2.qualys.com/docs/qualys-api-vmpc-user-guide.pdf

Inputs: `host_id` (int). Outputs: `response_xml`: string.

### Get Asset Detections

`GET {{config.base_url}}/api/2.0/fo/asset/host/vm/detection/` — read.

Read the selected QID detections for one host, preserving all XML state and warning metadata. API documentation: https://cdn2.qualys.com/docs/qualys-api-vmpc-user-guide.pdf

Inputs: `host_id` (int), `qid` (int). Outputs: `response_xml`: string.

### Get Vulnerability

`GET {{config.base_url}}/api/2.0/fo/knowledge_base/vuln/` — read.

Read KnowledgeBase metadata for one explicit Qualys vulnerability ID. API documentation: https://cdn2.qualys.com/docs/qualys-api-vmpc-user-guide.pdf

Inputs: `qid` (int). Outputs: `response_xml`: string.

Official platform origins: https://www.qualys.com/platform-identification . Official API guide sections: KnowledgeBase v2 (printed page 477), Host List v2 (995), Host List Detection v2 (1119). XML fixture fields come only from those API definitions.
