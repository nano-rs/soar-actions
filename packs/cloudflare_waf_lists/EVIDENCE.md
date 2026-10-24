# Cloudflare WAF lists API evidence

Requires an account-scoped API token with Account Filter Lists Read/Edit permission as appropriate. This pack edits an existing IP list; an operator must already reference it in an approved WAF rule. Add/remove are asynchronous and may be refused while another account list operation is running. Use get_bulk_operation and list_items to verify before reversing; removing an item requires its item ID. Each list_items call fetches one bounded 100-item cursor page, not the full list. Do not remove a pre-existing containment item when reversing a run.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### List IP list items

`GET https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/rules/lists/{{input.list_id}}/items`

Read one cursor page of IP list items and the returned paging cursor. API documentation: https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/list/

Inputs: `list_id` (string), `cursor` (string). Outputs: `items`, `cursors`.

Read-only; no automatic pagination or asynchronous completion claim.

### Get list operation status

`GET https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/rules/lists/bulk_operations/{{input.operation_id}}`

Read the asynchronous list operation state; pending or failed remains reported data. API documentation: https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/bulk_operations/methods/get/

Inputs: `operation_id` (string). Outputs: `operation_id`, `status`.

Read-only; no automatic pagination or asynchronous completion claim.

### Add Ip

`POST https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/rules/lists/{{input.list_id}}/items`

Queue a one-item list mutation. Read operation state and resolve the item ID before a later approved inverse. API documentation: https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/create/

Inputs: `list_id` (string), `ip` (ip). Outputs: `operation_id`.

Inverse: `remove_ip`.

### Remove Ip

`DELETE https://api.cloudflare.com/client/v4/accounts/{{config.account_id}}/rules/lists/{{input.list_id}}/items`

Queue a one-item list mutation. Read operation state and resolve the item ID before a later approved inverse. API documentation: https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items/methods/delete/

Inputs: `list_id` (string), `item_id` (string). Outputs: `operation_id`.

Inverse: `add_ip`.

Output contract: each action declares output_types for every extracted field. Native execution checks JSON types without coercion; missing/wrong-type data fails a Read and leaves an accepted mutation ambiguous. Private/on-prem origins are outside these SaaS packs. Any future support requires typed self-hosted/sovereign policy; hosted egress remains public-only.
