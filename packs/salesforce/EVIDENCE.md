# Salesforce API evidence

The official UserLogin field reference defines Id/UserId/IsFrozen and Manage Users; the official freeze help article states to update IsFrozen using UserLogin Id, never UserId. Generic REST Query and Update a Record references define the wire format. The access token is issued through a vendor-supported OAuth flow and kept in the native credential store; expiration returns AuthFailed, requiring token rotation. No refresh token or credentials enter templates. My Domain public hosts only; sandboxes/private proxies require separately reviewed origins. Both freeze and unfreeze require approval. Supplemental official fields: https://developer.salesforce.com/docs/platform/field-reference/references/field-reference/salesforce-field-reference-userlogin.html . Freeze semantics: https://help.salesforce.com/s/articleView?id=000337702&language=en_US&type=1 .

## Find user login

`GET {{config.base_url}}/services/data/v68.0/query`

Find at most one UserLogin record by a pattern-restricted User ID. Read Id, UserId and IsFrozen. Freeze/unfreeze requires the returned UserLogin Id, not UserId. Empty records is a valid no-match result. No free SOQL or nextRecordsUrl is accepted. Official endpoint reference: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_query.htm

Effect: `read`. Read only.

## Freeze User

`PATCH {{config.base_url}}/services/data/v68.0/sobjects/UserLogin/{{input.user_login_id}}`

Update one UserLogin IsFrozen boolean. Requires Manage Users and API access. This changes login eligibility; it does not delete the user, reclaim a license or promise existing-session revocation. Re-read via get_user_login to verify. Official endpoint reference: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm

Effect: `destructive`. Inverse: `unfreeze_user`.

## Unfreeze User

`PATCH {{config.base_url}}/services/data/v68.0/sobjects/UserLogin/{{input.user_login_id}}`

Update one UserLogin IsFrozen boolean. Requires Manage Users and API access. This changes login eligibility; it does not delete the user, reclaim a license or promise existing-session revocation. Re-read via get_user_login to verify. Official endpoint reference: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/dome_update_fields.htm

Effect: `destructive`. Inverse: `freeze_user`.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
