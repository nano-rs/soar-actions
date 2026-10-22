# CrowdStrike Falcon API references

Containment requires Hosts:WRITE; case tags require Cases:WRITE. The configured origins cover US1, US2, EU1 and Gov. Each containment request accepts one explicit Falcon AID. A 202 response acknowledges the request; verify endpoint state separately. Case-tag responses acknowledge the request rather than verified tag state. Rate limits depend on client and scope and are reported in X-Ratelimit headers. Rate guidance: https://developer.crowdstrike.com/sdks/python/responses/ .

## Add case tag

Add case tag. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.crowdstrike.com/api-reference/collections/case-management/#entitiescase-tagspostv1

`POST {{config.base_url}}/cases/entities/case-tags/v1`

Inverse action: `delete_case_tag`.

## Delete case tag

Delete case tag. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.crowdstrike.com/api-reference/collections/case-management/#entitiescase-tagsdeletev1

`DELETE {{config.base_url}}/cases/entities/case-tags/v1`

Inverse action: `add_case_tag`.

## Contain host

Request contain for one explicit Falcon AID. Requires Hosts:WRITE. Request acknowledgment only; endpoint-state completion must be verified separately. API documentation: https://developer.crowdstrike.com/api-reference/collections/hosts/#performactionv2

`POST {{config.base_url}}/devices/entities/devices-actions/v2`

Inverse action: `lift_containment`.

## Lift containment

Request lift_containment for one explicit Falcon AID. Requires Hosts:WRITE. Request acknowledgment only; endpoint-state completion must be verified separately. API documentation: https://developer.crowdstrike.com/api-reference/collections/hosts/#performactionv2

`POST {{config.base_url}}/devices/entities/devices-actions/v2`

Inverse action: `contain_host`.

## Hosts and request budgets

base_url: `https://api.crowdstrike.com`, `https://api.us-2.crowdstrike.com`, `https://api.eu-1.crowdstrike.com`, `https://api.laggar.gcw.crowdstrike.com`.

Host: `{{config.base_url}}`. Paths: `/oauth2/token`, `/cases/entities/case-tags/v1`, `/devices/entities/devices-actions/v2`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
