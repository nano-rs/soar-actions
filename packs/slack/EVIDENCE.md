# Slack channel notifications

Uses the bot-token Web API. Keep BOT_TOKEN in the encrypted connection credential store. Only `slack.com:443`, `/api/chat.postMessage`, is allowed. The bot must join the intended channel; user IDs and free-form URLs are refused. HTTP 200 alone is insufficient: `ok=true` and a timestamp are required. Text is bounded to 4,000 characters; markup and unfurling are disabled. Prefer a case summary/link instead of raw events. [API reference](https://docs.slack.dev/reference/methods/chat.postMessage/).

## Actions and evidence

- `post_message`: Post plain text with markup and link/media unfurling disabled. Requires bot channel membership and chat:write, HTTP 200, ok=true and a message timestamp. API reference: https://docs.slack.dev/reference/methods/chat.postMessage/

## Execution and review

All actions require approval, including AI-authored flows. Their destructive effect records irreversible notifications or downstream consequences. Requests use the existing tenant connection budgets: 10/minute, 500/day, 20-second timeout. Redirects and automatic retries after uncertain mutations are refused. Fixtures are independent offline HTTP mocks based on the cited schemas, not customer recordings or live calls. They contain no usable credential. Reviewed and signed catalog publication is required; this change does not publish or bundle packs.
