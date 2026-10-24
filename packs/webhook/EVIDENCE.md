# Signed HTTPS case notifications

Requires the NAN-4471 backend companion's explicit `https_endpoint` field. Only immutable connection config selects the complete URL. HTTPS, port 443 and a DNS hostname are required; userinfo, query and fragment are refused. A non-secret path is supported. Both the broker and tenant/revision-bound proxy inventory/helper resolve one exact configured host. No `*:443`, wildcard hostname or port range is added. Public-DNS/private-address checks, metadata denial and platform denies remain active. This is a nano receiver protocol, not a Slack/Teams webhook format.

## Receiver contract

Body: `case_id` (case UUID) and `message` (up to 8,192 characters). Bind case_id to the current case. HTTP 200/201/202/204 is a receipt, without claiming downstream completion. Responses are text. Keep HMAC_KEY only in the encrypted credential store.

`X-Nano-Timestamp` contains Unix seconds. `X-Nano-Signature` is `sha256=` plus lowercase hex HMAC-SHA256. Canonical bytes: timestamp, method, host, path, and raw body, separated by LF, with no trailing LF after the body. Method is the uppercase HTTP verb. Host is the lowercase ASCII/IDNA DNS name without a port. Path is the exact percent-encoded request path as transmitted, before URL decoding. Query is always absent in this pack. Verify the exact received bytes with a constant-time comparison; reject stale/future timestamps with a short acceptance window and cache accepted signatures within that window to reject replay. Never reserialize JSON before verifying. Signing happens after native JSON rendering. [HTTP POST](https://www.rfc-editor.org/rfc/rfc9110.txt); [HMAC](https://www.rfc-editor.org/rfc/rfc2104.txt).

## Actions and evidence

- `post`: POST bounded JSON to the exact connection endpoint with native HMAC-SHA256. No script or secret template. Success means an HTTP receipt only. POST semantics: https://www.rfc-editor.org/rfc/rfc9110.txt

## Execution and review

These notification actions have effect `write`, like native email. A human-managed flow with `approval: auto` can notify on-call without a human click. AI-originated and API/agent-key-triggered runs still require human approval under NAN-4377, and explicit required approval remains enforced. Notification delivery cannot be recalled; the rollback limit still applies. Requests use the existing tenant connection budgets: 10/minute, 500/day, 20-second timeout. Redirects and automatic retries after uncertain mutations are refused. Fixtures are independent offline HTTP mocks based on the cited schemas, not customer recordings or live calls. They contain no usable credential. Reviewed and signed catalog publication is required; this change does not publish or bundle packs.
