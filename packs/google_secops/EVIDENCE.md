# Google SecOps API evidence

SOAR-free here means native Chronicle HTTP GETs only; no Google SOAR endpoint, SOAR integration, automation or mutation is called. The service account is the existing #7715 native JWT-bearer plugin, not a new signer. Resource availability and IAM are controlled by Google; this pack does not make unavailable case features available to SIEM-only instances. Only the documented US endpoint/location pair is admitted; no arbitrary endpoint/region mapping. No custom-field or migrated-SOAR-only service is used.

## Get Case

`GET https://us-chronicle.googleapis.com/v1/projects/{{config.project_id}}/locations/{{config.location}}/instances/{{config.instance_id}}/cases/{{input.case_id}}`

Read one native Chronicle v1 resource only. No legacy SOAR API, workflow, connector or playbook is invoked. Requires chronicle.cases.get or chronicle.caseAlerts.get respectively and availability of the native resource in the instance. Official endpoint reference: https://docs.cloud.google.com/chronicle/docs/reference/rest/v1/projects.locations.instances.cases/get

Effect: `read`. Read only.

## Get Case Alert

`GET https://us-chronicle.googleapis.com/v1/projects/{{config.project_id}}/locations/{{config.location}}/instances/{{config.instance_id}}/cases/{{input.case_id}}/caseAlerts/{{input.alert_id}}`

Read one native Chronicle v1 resource only. No legacy SOAR API, workflow, connector or playbook is invoked. Requires chronicle.cases.get or chronicle.caseAlerts.get respectively and availability of the native resource in the instance. Official endpoint reference: https://docs.cloud.google.com/chronicle/docs/reference/rest/v1/projects.locations.instances.cases.caseAlerts/get

Effect: `read`. Read only.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
