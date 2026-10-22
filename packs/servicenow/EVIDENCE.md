# ServiceNow incident ticketing API references

Only connected .service-now.com tenant origins are supported. Requires Table API access and incident/field ACLs; instance business rules can impose additional requirements. Creation uses an explicit assignment-group sys_id and urgency/impact 2. Comments are customer-visible journal entries, not internal work notes. Record identifiers are returned; workflow completion is separate. Basic auth uses an integration account. History, business-rule effects and notifications cannot be undone by deletion. Rate limits are instance-configured: https://www.servicenow.com/docs/r/api-reference/rest-api-explorer/c_RESTAPI.html .

## Create investigation incident

Create an incident with an explicit assignment-group sys_id and fixed urgency/impact 2. Requires Table API access and applicable incident/field ACLs; instance business rules may impose additional requirements. Returns the created record identifiers. API documentation: https://developer.servicenow.com/print_page.do?category=null&identifier=c_TableAPI&module=api&release=zurich

`POST {{config.base_url}}/api/now/table/incident`

Incident creation can trigger business rules, audit and notifications; no automatic delete is supplied as an undo.

## Add incident customer-visible comment

Append a customer-visible comments journal entry to one incident. Requires Table API and incident/comments write ACLs. This is not an internal work note: review content before approval. Changes only comments; no assignment, urgency or workflow-state change. API documentation: https://developer.servicenow.com/print_page.do?category=null&identifier=c_TableAPI&module=api&release=zurich

`PATCH {{config.base_url}}/api/now/table/incident/{{input.sys_id}}`

A journal append and resulting notifications/audit cannot be undone by an inverse Table API write.

## Hosts and request budgets

Host: `{{config.base_url}}`. Paths: `/api/now/table/incident`.

Tenant suffixes: `.service-now.com`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `on_prem_create_incident`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://developer.servicenow.com/print_page.do?category=null&identifier=c_TableAPI&module=api&release=zurich.
- `on_prem_add_incident_comment`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://developer.servicenow.com/print_page.do?category=null&identifier=c_TableAPI&module=api&release=zurich.
