# Microsoft Defender for Endpoint API references

Isolation requires Machine.Isolate application permission; action lookup requires Machine.Read.All. The global api.securitycenter.microsoft.com origin is supported. MachineAction responses can remain Pending; use get_machine_action to check progress. Isolation limits are 100 calls/minute and 1,500/hour per the operation references. Local budgets share that quota with other clients.

## Get machine action

Get machine action. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://learn.microsoft.com/en-us/defender-endpoint/api/get-machineaction-object

`GET https://api.security.microsoft.com/api/machineactions/{{input.action_id}}`

## Isolate machine

Request full isolation of a managed device (Windows or Linux). Requires Machine.Isolate. Returns the asynchronous MachineAction identity and reported status. Request acknowledgment only; endpoint-state completion must be verified separately. API documentation: https://learn.microsoft.com/en-us/defender-endpoint/api/isolate-machine

`POST https://api.security.microsoft.com/api/machines/{{input.machine_id}}/isolate`

Inverse action: `unisolate_machine`.

## Release machine from isolation

Request release of a managed device from isolation. Requires Machine.Isolate. Returns the asynchronous MachineAction identity and reported status. Request acknowledgment only; endpoint-state completion must be verified separately. API documentation: https://learn.microsoft.com/en-us/defender-endpoint/api/unisolate-machine

`POST https://api.security.microsoft.com/api/machines/{{input.machine_id}}/unisolate`

Inverse action: `isolate_machine`.

## Hosts and request budgets

Host: `api.security.microsoft.com`. Paths: `/api/machineactions`, `/api/machines`.

Local request budgets: 25/minute and 750/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
