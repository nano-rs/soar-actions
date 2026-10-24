# Zscaler ZIA denylist response API evidence

Uses the officially documented ZIA Cloud Service API with an already registered Okta OAuth authorization server, client-credentials Basic authentication and the connection-scoped ZIA API-role scope. This is the legacy Cloud Service API endpoint family, not OneAPI/ZIdentity or a username/password obfuscated-key login. Cloud origins are the six examples in https://help.zscaler.com/legacy-apis/getting-started-zia-api ; token origins are exact tenant Okta .okta.com hosts from https://help.zscaler.com/zia/oauth-2.0-configuration-guide-okta . The role needs Security Policy Settings read/write authority. Incremental add/remove changes only the supplied URL; it does not replace the 25,000-item denylist. Request body evidence comes from the linked official Postman collection, and response shape from the official Security Policy Settings Swagger schema. ZIA requires a later configuration activation, which can include unrelated pending changes. These actions stage membership only and never activate shared policy state or claim enforcement. An operator must review/activate pending changes separately. Preserve original membership before an approved inverse; a read may stop at the engine body cap rather than claim a partial response is complete.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get configured denylist

`GET {{config.base_url}}/api/v1/security/advanced`

Read the configured denylist; this view does not prove activation or downstream enforcement. API documentation: https://help.zscaler.com/legacy-apis/security-policy-settings

Inputs: . Outputs: `urls`.

Read-only; no automatic pagination or asynchronous completion claim.

### Stage Block Url

`POST {{config.base_url}}/api/v1/security/advanced/blacklistUrls`

Stage one incremental denylist membership change without activating shared pending policy edits. A second approval is required for the inverse. API documentation: https://help.zscaler.com/legacy-apis/security-policy-settings

Inputs: `url_value` (string). Outputs: `urls`.

Inverse: `stage_unblock_url`.

### Stage Unblock Url

`POST {{config.base_url}}/api/v1/security/advanced/blacklistUrls`

Stage one incremental denylist membership change without activating shared pending policy edits. A second approval is required for the inverse. API documentation: https://help.zscaler.com/legacy-apis/security-policy-settings

Inputs: `url_value` (string). Outputs: `urls`.

Inverse: `stage_block_url`.

Official request-body examples: https://help.zscaler.com/sites/default/files/zia_cloud_service.postman_collection_10_09_2026.json?VersionId=l8zBKfgs9ljJzpf6DFkaGM4gOlZ44nZS (`document_sha256`: `9476b1d62aec10e6bbd88e4d04686aeb2da9b4a7250a76b76eed103d29ce63a5`). The incremental POST uses the documented blacklistUrls array with action=ADD_TO_LIST/REMOVE_FROM_LIST.
