# Azure ARM NSG response API evidence

Requires an Entra response application with the least-privilege Microsoft.Network/networkSecurityGroups/securityRules/read/write/delete permissions on the selected NSG. Public Azure ARM only; API version 2026-01-01. Rule names must start nano-soar- to distinguish response-owned rules; use a fresh name and capture any pre-existing rule before approval. PUT is create-or-update, not create-only: do not overwrite an existing rule as a containment shortcut. This action adds an outbound deny rule for one IPv4 address/prefix; it does not claim whole-VM isolation or cover inbound traffic. NSG attachment and rule priority must already be suitable. Priority is an integer in the vendor range 100-4096. Creation/update and deletion acknowledgments may be asynchronous: read provisioning state separately. IPv4 prefixes are payload data sent to the scoped ARM API, not egress destinations.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get response rule

`GET https://management.azure.com/subscriptions/{{config.subscription_id}}/resourceGroups/{{input.resource_group}}/providers/Microsoft.Network/networkSecurityGroups/{{input.nsg_name}}/securityRules/{{input.rule_name}}`

Read the current named response rule and provisioning state. API documentation: https://learn.microsoft.com/en-us/rest/api/virtualnetwork/security-rules/get?view=rest-virtualnetwork-2026-01-01

Inputs: `resource_group` (string), `nsg_name` (string), `rule_name` (string). Outputs: `rule`.

Read-only; no automatic pagination or asynchronous completion claim.

### Add outbound deny rule

`PUT https://management.azure.com/subscriptions/{{config.subscription_id}}/resourceGroups/{{input.resource_group}}/providers/Microsoft.Network/networkSecurityGroups/{{input.nsg_name}}/securityRules/{{input.rule_name}}`

Create or update one response-owned outbound deny rule. The reported provisioning state must be checked before claiming enforcement. API documentation: https://learn.microsoft.com/en-us/rest/api/virtualnetwork/security-rules/create-or-update?view=rest-virtualnetwork-2026-01-01

Inputs: `resource_group` (string), `nsg_name` (string), `rule_name` (string), `source_prefix` (string), `priority` (int). Outputs: `rule`.

Inverse: `remove_response_rule`.

### Remove response rule

`DELETE https://management.azure.com/subscriptions/{{config.subscription_id}}/resourceGroups/{{input.resource_group}}/providers/Microsoft.Network/networkSecurityGroups/{{input.nsg_name}}/securityRules/{{input.rule_name}}`

Request deletion of one response-owned rule. Accepted deletion does not prove asynchronous completion; removing a rule also does not prove traffic is restored. API documentation: https://learn.microsoft.com/en-us/rest/api/virtualnetwork/security-rules/delete?view=rest-virtualnetwork-2026-01-01

Inputs: `resource_group` (string), `nsg_name` (string), `rule_name` (string). Outputs: .

Inverse: `add_outbound_deny_rule`.
