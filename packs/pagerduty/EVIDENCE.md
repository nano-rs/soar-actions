# PagerDuty Events API v2 notifications

Targets US Events API v2: `events.pagerduty.com:443`, `/v2/enqueue`. ROUTING_KEY is an Events v2 integration key, not a REST API key. The native `json_body_credential` plugin inserts it after rendering; flows cannot override it. Keep it in the encrypted credential store. Fixtures contain only the validator's generated offline marker `fixture-only-ROUTING_KEY-not-a-secret`, never a usable key. Requires the NAN-4471 backend companion.

Bind `case_id` to the current case UUID in every action. There is no separate dedup-key input: trigger, acknowledge and resolve send that same case ID. Trigger also requires a summary (maximum 1,024 characters) and the documented severity enum. Events are asynchronous and can be deduplicated, suppressed or dropped; a 202 receipt does not prove an incident's final state. No REST incident endpoint or uncertain-submit retry is used. [Schema](https://raw.githubusercontent.com/PagerDuty/api-schema/main/reference/events-v2/openapiv3.json).

## Actions and evidence

- `trigger`: Submit trigger with dedup_key equal to the required case_id. A 202 success receipt proves acceptance, not incident completion or delivery to an on-call user. API schema: https://raw.githubusercontent.com/PagerDuty/api-schema/main/reference/events-v2/openapiv3.json
- `acknowledge`: Submit acknowledge with dedup_key equal to the required case_id. A 202 success receipt proves acceptance, not incident completion or delivery to an on-call user. API schema: https://raw.githubusercontent.com/PagerDuty/api-schema/main/reference/events-v2/openapiv3.json
- `resolve`: Submit resolve with dedup_key equal to the required case_id. A 202 success receipt proves acceptance, not incident completion or delivery to an on-call user. API schema: https://raw.githubusercontent.com/PagerDuty/api-schema/main/reference/events-v2/openapiv3.json

## Execution and review

These notification actions have effect `write`, like native email. A human-managed flow with `approval: auto` can notify on-call without a human click. AI-originated and API/agent-key-triggered runs still require human approval under NAN-4377, and explicit required approval remains enforced. Notification delivery cannot be recalled; the rollback limit still applies. Requests use the existing tenant connection budgets: 10/minute, 500/day, 20-second timeout. Redirects and automatic retries after uncertain mutations are refused. Fixtures are independent offline HTTP mocks based on the cited schemas, not customer recordings or live calls. They contain no usable credential. Reviewed and signed catalog publication is required; this change does not publish or bundle packs.


## Canonical alert/case notifications (NAN-4478)

`notify_event` accepts the existing canonical nano `WebhookPayload` as a typed
`notification` input. Its entire JSON body is rendered by the production
`notification_body` helper, whose single vendor definition lives in backend
`nanosiem-core/src/webhooks/channels.rs`. The checked-in mock fixture and
`evidence.json` are verified against that formatter by cross-repository byte
conformance. Existing freeform actions are unchanged.

The Slack bot transport adds its required channel selector to the canonical
Block Kit payload. Teams Graph wraps the canonical Adaptive Card in its string
attachment envelope. PagerDuty's connection routing key is still injected by
native auth after formatting. Generic notifications preserve core's JSON field
order while keeping this pack's existing HMAC protocol. No new credential or host
allowlist is introduced. These writes keep human approval policy and have no
automatic retry or inverse. New actions require NAN-4478 backend support before
catalog review, approval, signing or publication; they are never bundled.
