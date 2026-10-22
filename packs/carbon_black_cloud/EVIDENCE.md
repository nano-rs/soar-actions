# Carbon Black Cloud API references

Requires device.quarantine EXECUTE. X-Auth-Token uses API Secret/API ID. Only the six configured production origins are supported; EAP and the separate on-premises Response API are unsupported. Requests acknowledge action creation, not observed endpoint state. Rate guidance: https://developer.carbonblack.com/reference/carbon-black-cloud/rate-limiting/ .

## Quarantine devices

Quarantine devices. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/devices-api/#quarantine

`POST {{config.base_url}}/appservices/v6/orgs/{{config.org_key}}/device_actions`

Inverse action: `unquarantine_devices`.

## Unquarantine devices

Unquarantine devices. Request acknowledgment only; this action does not claim asynchronous completion. API documentation: https://developer.carbonblack.com/reference/carbon-black-cloud/platform/latest/devices-api/#quarantine

`POST {{config.base_url}}/appservices/v6/orgs/{{config.org_key}}/device_actions`

Inverse action: `quarantine_devices`.

## Hosts and request budgets

base_url: `https://dashboard.confer.net`, `https://defense.conferdeploy.net`, `https://defense-prod05.conferdeploy.net`, `https://defense-eu.conferdeploy.net`, `https://defense-prodnrt.conferdeploy.net`, `https://defense-prodsyd.conferdeploy.net`.

Host: `{{config.base_url}}`. Paths: `/appservices/v6/orgs`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
