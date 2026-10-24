# Opsgenie — batch=C

Requires an existing Opsgenie API integration key scoped to the intended team/integration and allowed alert operations. US and EU API origins are explicitly enumerated in the official reference. Creation may route notifications through configured responders/escalation rules; read existing alert state first when updating. A supplied alias participates in vendor de-duplication but does not turn this action into an automatic retry. Create/message/description updates return asynchronous 202 request receipts; get_request_status returns vendor processing state as data. The native runtime does not follow status URLs or poll automatically. Authentication, entitlement, 404 and 429 errors stop the action.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get alert

`GET {{config.base_url}}/v2/alerts/{{input.alert_id}}` — read.

Read the alert by immutable ID, including closed alerts. API documentation: https://docs.opsgenie.com/docs/alert-api

Inputs: `alert_id` (string). Outputs: `alert`: object.

### Get asynchronous request status

`GET {{config.base_url}}/v2/alerts/requests/{{input.request_id}}` — read.

Return success/failure processing metadata as data without reinterpreting failed or pending requests as completed alerts. API documentation: https://docs.opsgenie.com/docs/alert-api

Inputs: `request_id` (string). Outputs: `request`: object.

### Create alert

`POST {{config.base_url}}/v2/alerts` — write.

Submit an alert to the configured integration; the request ID acknowledges dispatch and may trigger paging. API documentation: https://docs.opsgenie.com/docs/alert-api

Inputs: `message` (string), `description` (string), `alias` (string). Outputs: `request_id`: string.

### Update Message

`PUT {{config.base_url}}/v2/alerts/{{input.alert_id}}/message` — write.

Submit a replacement for one explicit alert field. Inspect request state separately before claiming completion or attempting another update. API documentation: https://docs.opsgenie.com/docs/alert-api-continued

Inputs: `alert_id` (string), `message` (string). Outputs: `request_id`: string.

### Update Description

`PUT {{config.base_url}}/v2/alerts/{{input.alert_id}}/description` — write.

Submit a replacement for one explicit alert field. Inspect request state separately before claiming completion or attempting another update. API documentation: https://docs.opsgenie.com/docs/alert-api-continued

Inputs: `alert_id` (string), `description` (string). Outputs: `request_id`: string.
