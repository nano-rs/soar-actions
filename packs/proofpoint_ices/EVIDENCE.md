# Proofpoint ICES Defend remediation API references

Requires Action Quarantined Emails permission and an API-Token credential. US tenants use .tessian-app.com and EU tenants use .tessian-platform.com. These actions accept events with exactly one protected user: attempted=1, succeeded=1, exactly one result and a present null error. Zero, partial, multiple or malformed receipts fail. Success indicates queued work; wait for the updated event to verify completion. Release and deletion have no documented automatic inverse. The API reference Rate Limits section specifies 429/backoff and notes that exact limits may change.

## Submit release of quarantined email

For ICES Defend events with exactly one protected user. Requires Action Quarantined Emails permission. Accept only exactly one attempted/succeeded receipt and one error:null result; zero, multiple and partial results fail. This reports queued work, not completion: wait for the updated security event. API documentation: https://developer.tessian.com/documentation/api/index.html#tag/Remediation/paths/~1api~1v1~1remediation~1release_from_quarantine/post

`POST {{config.base_url}}/api/v1/remediation/release_from_quarantine`

No inverse for this ICES remediation is defined by the public API reference. Deletion cannot recreate a message; release cannot restore the original quarantine state.

## Submit deletion of quarantined email

For ICES Defend events with exactly one protected user. Requires Action Quarantined Emails permission. Accept only exactly one attempted/succeeded receipt and one error:null result; zero, multiple and partial results fail. This reports queued work, not completion: wait for the updated security event. API documentation: https://developer.tessian.com/documentation/api/index.html#tag/Remediation/paths/~1api~1v1~1remediation~1delete_from_quarantine/post

`POST {{config.base_url}}/api/v1/remediation/delete_from_quarantine`

No inverse for this ICES remediation is defined by the public API reference. Deletion cannot recreate a message; release cannot restore the original quarantine state.

## Submit deletion of inbox email

For ICES Defend events with exactly one protected user. Requires Action Quarantined Emails permission. Accept only exactly one attempted/succeeded receipt and one error:null result; zero, multiple and partial results fail. This reports queued work, not completion: wait for the updated security event. API documentation: https://developer.tessian.com/documentation/api/index.html#tag/Remediation/paths/~1api~1v1~1remediation~1delete_from_inbox/post

`POST {{config.base_url}}/api/v1/remediation/delete_from_inbox`

No inverse for this ICES remediation is defined by the public API reference. Deletion cannot recreate a message; release cannot restore the original quarantine state.

## Hosts and request budgets

Host: `{{config.base_url}}`. Paths: `/api/v1/remediation`.

Tenant suffixes: `.tessian-platform.com`, `.tessian-app.com`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `quarantine_email`: No public ICES reference endpoint/example/schema for moving an email into quarantine; the public Remediation section defines release and deletion only. References: https://developer.tessian.com/documentation/api/index.html#tag/Remediation.
- `trap_quarantine_email`: The official endpoint reference requires vendor portal access; public request and response definitions are unavailable. References: https://ptr-docs.proofpoint.com/extensibility-guides/ptr-api/.
- `trap_release_email`: The official endpoint reference requires vendor portal access; public request and response definitions are unavailable. References: https://ptr-docs.proofpoint.com/extensibility-guides/ptr-api/.
