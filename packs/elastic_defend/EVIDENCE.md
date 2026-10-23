# Elastic Defend API references

Actions use the Kibana Security endpoint management API (API reference v9, generated from the Kibana 9.5 branch; current release 9.5.5; retrieved 2026-10-22: https://www.elastic.co/docs/api/doc/kibana/v9 ). Authentication uses a Kibana API key sent as `Authorization: ApiKey <encoded key>`. POST requests send `kbn-xsrf: true`; Kibana keeps the kbn-xsrf check for all non-GET requests by default (`server.xsrf.allowedSchemes`, https://www.elastic.co/docs/reference/kibana/configuration-reference/general-settings ). Required Kibana privileges: Host Isolation (isolate, release), Process Operations (processes, kill-process, suspend-process), File Operations (get-file), Execute Operations (execute) and Scan Operations (scan), per https://www.elastic.co/docs/solutions/security/endpoint-response-actions . Every create request returns HTTP 200 with a pending response action; it does not mean the endpoint has completed it. Use get_action_details for isCompleted and wasSuccessful. Requests target the default Kibana space and agent type `endpoint` (Elastic Defend). Process actions identify the process by entity ID, which the response actions guide calls more reliable than a PID. Isolation and release send only the endpoint ID, as in the documented single-host example. The API reference documents no rate limit for these operations.

## Get action details

Get the details of a response action by its action ID, to follow asynchronous actions to completion. Reports isCompleted and wasSuccessful as returned by Kibana. Read-only. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetactionsdetails

`GET {{config.base_url}}/api/endpoint/action/{{input.action_id}}`

## Isolate host

Request network isolation of an Elastic Defend endpoint. The endpoint remains isolated until it is released. Requires the Host Isolation privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointisolateaction

`POST {{config.base_url}}/api/endpoint/action/isolate`

Inverse action: `release_host`.

## Release host from isolation

Request release of an isolated Elastic Defend endpoint so it can rejoin the network. Requires the Host Isolation privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointunisolateaction

`POST {{config.base_url}}/api/endpoint/action/unisolate`

Inverse action: `isolate_host`.

## Terminate process

Request termination of a running process, identified by its process entity ID, on an Elastic Defend endpoint. Requires the Process Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointkillprocessaction

`POST {{config.base_url}}/api/endpoint/action/kill_process`

A terminated process cannot be restored; the API has no inverse operation.

## Suspend process

Request suspension of a running process, identified by its process entity ID, on an Elastic Defend endpoint. Requires the Process Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointsuspendprocessaction

`POST {{config.base_url}}/api/endpoint/action/suspend_process`

The Security endpoint management API documents no resume-process operation, so a suspended process cannot be resumed through this pack.

## Get running processes

Request a list of all processes running on an Elastic Defend endpoint. Creates a response action on the endpoint; the process list is delivered asynchronously. Requires the Process Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetprocessesaction

`POST {{config.base_url}}/api/endpoint/action/running_procs`

## Get file

Request retrieval of a file, by full path, from an Elastic Defend endpoint into Kibana. Requires the File Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetfileaction

`POST {{config.base_url}}/api/endpoint/action/get_file`

A retrieved file copy is stored outside the endpoint and cannot be recalled by this pack.

## Run command

Request execution of a shell command on an Elastic Defend endpoint, with a timeout in seconds. The command runs as the account running the Elastic Defend integration. Requires the Execute Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointexecuteaction

`POST {{config.base_url}}/api/endpoint/action/execute`

Effects of an arbitrary shell command cannot be reversed generically.

## Scan file or directory

Request a malware scan of a file or directory on an Elastic Defend endpoint, using the malware protection settings of its integration policy (which may block or quarantine files). Requires the Scan Operations privilege. Returns the queued response action identity and its reported status; this is request acknowledgment only. Follow completion with get_action_details. API documentation: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointscanaction

`POST {{config.base_url}}/api/endpoint/action/scan`

Policy-driven scan outcomes, such as quarantine, are not reversed by this pack.

## Hosts and request budgets

Host: `{{config.base_url}}`. Paths: `/api/endpoint/action`.

Tenant suffixes: `.elastic-cloud.com`, `.cloud.es.io`. Elastic Cloud Hosted application endpoints take the form `https://<alias>.<product>.<region>.<provider>.elastic-cloud.com` or `...cloud.es.io`; Kibana uses the `kb` product, for example `my-deployment-d53192.kb.vpce.us-east-1.aws.elastic-cloud.com` (private) and `my-deployment-d53192.es.us-central1.gcp.cloud.es.io` (public Elasticsearch). References: https://www.elastic.co/docs/deploy-manage/security/private-connectivity-aws , https://www.elastic.co/docs/deploy-manage/security/private-connectivity-gcp , https://www.elastic.co/docs/deploy-manage/security/private-connectivity-azure (retrieved 2026-10-22). Requests use HTTPS on port 443.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `on_prem_execute`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointexecuteaction.
- `on_prem_get_action_details`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetactionsdetails.
- `on_prem_get_file`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetfileaction.
- `on_prem_get_running_processes`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointgetprocessesaction.
- `on_prem_isolate_host`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointisolateaction.
- `on_prem_kill_process`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointkillprocessaction.
- `on_prem_release_host`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointunisolateaction.
- `on_prem_scan`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointscanaction.
- `on_prem_suspend_process`: Self-hosted Kibana uses customer-managed hosts, which require an on-premises relay and are unsupported. References: https://www.elastic.co/docs/api/doc/kibana/v9/operation/operation-endpointsuspendprocessaction.
