# TheHive — batch=C

Targets the official TheHive v1 API on a customer-owned server. This signed pack requires deployment_scope=self_hosted_sovereign and the trusted runtime must be SelfHosted (including sovereign installations); hosted/shared/demo runtimes refuse before DNS, credential use or sends. Supply exactly one HTTPS FQDN origin on port 443 behind a certificate-valid reverse proxy, not TheHive’s internal HTTP:9000 listener. RFC1918/ULA corporate DNS destinations are admitted only within this scope; platform/tenant denies, metadata/loopback/link-local exclusions, DNS all-answer validation, TLS hostname verification and exact API path allowlists remain. No new environment toggle is used. TheHive Cloud marketing is documented, but no official Cloud API hostname pattern was verified; this pack makes no hosted Cloud claim. API key bearer authentication uses the user’s default organization; multi-organization header selection is outside this initial pack. Use least privilege: case create needs manageCase/create, case update manageCase/update, alert create manageAlert/create and alert update manageAlert/update; reads require visibility of the resource in the selected organization. No delete, merge, promote-to-case, observable fetch or analyzer execution. Description/title updates replace the supplied values and have no atomic concurrency guarantee: read current state first. Create may invoke organization sharing rules and notifications; verify state before manually retrying uncertain mutations.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. Native 204 text-mode acknowledgments have an intentionally empty output contract. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. This customer-owned endpoint uses one connection-resolved FQDN and API path allowlist. The trusted self-managed deployment selects the native pinned-IP route inside the durable authority guards; public packs continue through the egress proxy. Private origins are never added to hosted proxy grants.

## Actions

### Get case

`GET {{config.base_url}}/api/v1/case/{{input.case_id}}` — read.

Read one organization-visible case by its explicit identifier; no list/query expansion. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `case_id` (string). Outputs: `case`: object.

### Create case

`POST {{config.base_url}}/api/v1/case` — write.

Create one case with explicit text and conservative severity/TLP/PAP defaults. Alert uniqueness is provider-enforced on type/source/sourceRef, not a promise to retry. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `title` (string), `description` (text). Outputs: `case`: object.

### Update case text

`PATCH {{config.base_url}}/api/v1/case/{{input.case_id}}` — write.

Replace only title/description after reading current values. A 204 confirms acceptance with an empty receipt; no object or completed workflow is fabricated. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `case_id` (string), `title` (string), `description` (text). Outputs: .

### Get alert

`GET {{config.base_url}}/api/v1/alert/{{input.alert_id}}` — read.

Read one organization-visible alert by its explicit identifier; no list/query expansion. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `alert_id` (string). Outputs: `alert`: object.

### Create alert

`POST {{config.base_url}}/api/v1/alert` — write.

Create one alert with explicit text and conservative severity/TLP/PAP defaults. Alert uniqueness is provider-enforced on type/source/sourceRef, not a promise to retry. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `title` (string), `description` (text), `alert_type` (string), `source_reference` (string). Outputs: `alert`: object.

### Update alert text

`PATCH {{config.base_url}}/api/v1/alert/{{input.alert_id}}` — write.

Replace only title/description after reading current values. A 204 confirms acceptance with an empty receipt; no object or completed workflow is fabricated. API documentation: https://docs.strangebee.com/thehive/api-docs/docs.yaml

Inputs: `alert_id` (string), `title` (string), `description` (text). Outputs: .
