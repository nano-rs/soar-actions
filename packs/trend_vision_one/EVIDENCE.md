# Trend Vision One API evidence

Requires Response Management permissions to isolate endpoints and view task state; downloading task results needs Download task result. Commercial regions are the exact OpenAPI server set. One agent per request; HTTP 207 is not success by itself: the receipt must contain exactly one item with status 202 and an Operation-Location. The location is returned as data and never followed automatically. get_response_task takes an explicit task ID. No polling, pagination or completion is inferred from dispatch.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get response task

`GET {{config.base_url}}/v3.0/response/tasks/{{input.task_id}}`

Read response-task results without interpreting task status as success of this action. API documentation: https://automation.trendmicro.com/sp-api-open-v3.0.json

Inputs: `task_id` (string). Outputs: `task_id`, `status`.

Read-only; no automatic pagination or asynchronous completion claim.

### Isolate Endpoint

`POST {{config.base_url}}/v3.0/response/endpoints/isolate`

Request a response for exactly one agent. The accepted task receipt does not assert endpoint completion. API documentation: https://automation.trendmicro.com/sp-api-open-v3.0.json

Inputs: `agent_guid` (string). Outputs: `operation_location`.

Inverse: `restore_endpoint`.

### Restore Endpoint

`POST {{config.base_url}}/v3.0/response/endpoints/restore`

Request a response for exactly one agent. The accepted task receipt does not assert endpoint completion. API documentation: https://automation.trendmicro.com/sp-api-open-v3.0.json

Inputs: `agent_guid` (string). Outputs: `operation_location`.

Inverse: `isolate_endpoint`.
