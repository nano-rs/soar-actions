# Zendesk — batch=C

Uses Zendesk Support API token authentication: store the full agent username email/token in API_USERNAME and the API token in API_TOKEN. The agent needs access to the requested users/tickets and permission to create/update tickets. Only the documented subdomain.zendesk.com SaaS endpoint is supported. Creation uses an explicit requester ID; comments are private (public=false), but account automations may still notify people or trigger workflows. Updates require a fresh updated_at stamp with safe_update=true, so a collision is a 409 refusal rather than a blind retry. Status changes exclude terminal closed. Comment reads fetch one 100-item page; returned paging metadata must be inspected before claiming completeness. No attachments are fetched.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get ticket

`GET {{config.base_url}}/api/v2/tickets/{{input.ticket_id}}.json` — read.

Read one explicit ticket and retain its update timestamp for an optimistic guarded update. API documentation: https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/

Inputs: `ticket_id` (int). Outputs: `ticket`: object.

### Get requester

`GET {{config.base_url}}/api/v2/users/{{input.user_id}}.json` — read.

Read a requester by ID without listing the whole account. API documentation: https://developer.zendesk.com/api-reference/ticketing/users/users/

Inputs: `user_id` (int). Outputs: `user`: object.

### List ticket comment page

`GET {{config.base_url}}/api/v2/tickets/{{input.ticket_id}}/comments.json` — read.

Read one cursor page of ticket comments and preserve has_more/cursor/link metadata as data. API documentation: https://developer.zendesk.com/api-reference/ticketing/tickets/ticket_comments/

Inputs: `ticket_id` (int), `cursor` (string). Outputs: `page`: object.

### Create incident ticket

`POST {{config.base_url}}/api/v2/tickets.json` — write.

Create one incident ticket for the explicit requester with an internal comment; business rules may trigger notifications. API documentation: https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/

Inputs: `requester_id` (int), `subject` (string), `comment` (string). Outputs: `ticket`: object.

### Update ticket with collision protection

`PUT {{config.base_url}}/api/v2/tickets/{{input.ticket_id}}.json` — write.

Replace the selected status and append one internal comment only if the supplied update stamp is current; a collision stops the action. API documentation: https://developer.zendesk.com/api-reference/ticketing/tickets/tickets/

Inputs: `ticket_id` (int), `comment` (string), `status` (string), `updated_at` (string). Outputs: `ticket`: object.
