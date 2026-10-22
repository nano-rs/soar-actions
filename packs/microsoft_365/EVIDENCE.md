# Microsoft 365 email remediation API references

Requires application SecurityAnalyzedMessage.ReadWrite.All and applicable Defender for Office 365 licensing. Delegated tokens are unsupported. Only global Graph v1.0 is supported. Each request targets one explicit message/recipient and leaves the sender copy unchanged. A 202 acknowledges submission only; track completion in https://security.microsoft.com/action-center/history . Inbox recovery does not restore original folders or metadata. Hard deletion is irreversible. moveToQuarantine is not currently supported by the operation reference. Rate guidance: https://learn.microsoft.com/en-us/graph/throttling and https://learn.microsoft.com/en-us/graph/throttling-limits .

## Submit recoverable email purge

Submit softDelete for one explicit analyzed message/recipient, without touching the sender copy. Requires application SecurityAnalyzedMessage.ReadWrite.All and applicable Defender for Office 365 licensing. A 202 is submission only; track completion in the Defender Action center. Moving to Inbox does not restore original folder/metadata. API documentation: https://learn.microsoft.com/en-us/graph/api/security-analyzedemail-remediate?view=graph-rest-1.0

`POST https://graph.microsoft.com/v1.0/security/collaboration/analyzedEmails/remediate`

Inverse action: `move_email_to_inbox`.

## Submit email move to Inbox

Submit moveToInbox for one explicit analyzed message/recipient, without touching the sender copy. Requires application SecurityAnalyzedMessage.ReadWrite.All and applicable Defender for Office 365 licensing. A 202 is submission only; track completion in the Defender Action center. Moving to Inbox does not restore original folder/metadata. API documentation: https://learn.microsoft.com/en-us/graph/api/security-analyzedemail-remediate?view=graph-rest-1.0

`POST https://graph.microsoft.com/v1.0/security/collaboration/analyzedEmails/remediate`

Inverse action: `soft_delete_email`.

## Submit permanent email purge

Submit hardDelete for one explicit analyzed message/recipient, without touching the sender copy. Requires application SecurityAnalyzedMessage.ReadWrite.All and applicable Defender for Office 365 licensing. A 202 is submission only; track completion in the Defender Action center. Moving to Inbox does not restore original folder/metadata. API documentation: https://learn.microsoft.com/en-us/graph/api/security-analyzedemail-remediate?view=graph-rest-1.0

`POST https://graph.microsoft.com/v1.0/security/collaboration/analyzedEmails/remediate`

Permanent deletion has no inverse; messages and original state cannot be recreated by this API.

## Hosts and request budgets

Host: `graph.microsoft.com`. Paths: `/v1.0/security/collaboration/analyzedEmails/remediate`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `quarantine_email`: The official v1.0 reference explicitly states moveToQuarantine is not currently supported; no usable supported quarantine request/example/schema is available. References: https://learn.microsoft.com/en-us/graph/api/security-analyzedemail-remediate?view=graph-rest-1.0.
