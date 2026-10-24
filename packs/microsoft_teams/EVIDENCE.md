# Microsoft Teams channel notifications

Uses global Graph v1.0 with a delegated work/school token carrying `ChannelMessage.Send`; its user needs channel access. Personal accounts and application-only migration permissions are unsupported. Keep ACCESS_TOKEN in the encrypted credential store and refresh/rotate it through your identity system before expiry; this pack does not mint delegated tokens. Expired tokens fail closed. Only `graph.microsoft.com:443` is allowed; team/channel IDs are encoded as path segments. A 201 message receipt is required. Content is plain text, bounded to 8,192 characters. [API reference](https://learn.microsoft.com/en-us/graph/api/channel-post-messages?view=graph-rest-1.0).

## Actions and evidence

- `post_message`: Post with a delegated work/school token carrying ChannelMessage.Send. Application-only migration tokens are unsupported. API reference: https://learn.microsoft.com/en-us/graph/api/channel-post-messages?view=graph-rest-1.0

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
