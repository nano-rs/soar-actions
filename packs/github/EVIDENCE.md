# GitHub — batch=C

Uses a fine-grained personal access token restricted to the selected repositories, with Metadata read and Issues read/write permissions as required. GitHub.com public REST only; enterprise/self-hosted origins are outside this pack. Every request pins API version 2022-11-28 and the vendor JSON media type. Repository/issue/comment reads are explicit and comment pages are capped at 100. Returned HTML and pagination URLs are evidence only. Read current state before replacing title/body/state: update is not a compare-and-swap operation and may overwrite concurrent edits of those fields. Create/comment actions can trigger notifications and account automations. No repository content, releases, binaries, workflow runs or attachments are downloaded or created.

Reads use effect=read. Ticket/alert creation and updates use effect=write and follow the existing flow approval policy; API/agent-key and AI-originated runs still require human approval. No containment, deletion, scan launch, arbitrary URL fetch, automatic pagination or uncertain mutation retry is introduced. An accepted write may have effects even if the response is lost: verify state before any later attempt.

Every action declares a complete JSON output_types contract. Missing/wrong-type results fail Reads and leave accepted mutations ambiguous; redaction runs before output type checking. Native budgets bound each request, response bytes and 20-second deadline. Local limits are 5 requests/minute and 500/day; account-wide vendor quotas/429s may be stricter and stop execution. Links/cursors in responses are data; links are never followed.

Independent sanitized fixtures use only the official endpoint examples or defined fields/types. document_sha256 pins retrieved official documentation bytes. Auth is injected by native credential plugins; no credentials, customer data or third-party integration code are included. These public SaaS endpoints use exact static or connection-resolved vendor hosts through tenant egress. Private/on-prem origins are outside this pack.

## Actions

### Get repository

`GET https://api.github.com/repos/{{input.owner}}/{{input.repository}}` — read.

Read repository metadata for the explicitly selected owner/name. API documentation: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string). Outputs: `repository`: object.

### Get issue

`GET https://api.github.com/repos/{{input.owner}}/{{input.repository}}/issues/{{input.issue_number}}` — read.

Read one issue-number resource; the GitHub issues API can also return pull-request metadata. API documentation: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string), `issue_number` (int). Outputs: `issue`: object.

### List issue comment page

`GET https://api.github.com/repos/{{input.owner}}/{{input.repository}}/issues/{{input.issue_number}}/comments` — read.

Read one numbered page of comments. A short page is not treated as proof that another page cannot exist. API documentation: https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string), `issue_number` (int), `page` (int). Outputs: `comments`: array.

### Create issue

`POST https://api.github.com/repos/{{input.owner}}/{{input.repository}}/issues` — write.

Create one issue in the explicit repository; notifications/automations may run. API documentation: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string), `title` (string), `body` (string). Outputs: `issue`: object.

### Update issue fields

`PATCH https://api.github.com/repos/{{input.owner}}/{{input.repository}}/issues/{{input.issue_number}}` — write.

Replace the explicitly supplied title/body/state after reading current values; no atomic collision guarantee is implied. API documentation: https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string), `issue_number` (int), `title` (string), `body` (string), `state` (string). Outputs: `issue`: object.

### Add issue comment

`POST https://api.github.com/repos/{{input.owner}}/{{input.repository}}/issues/{{input.issue_number}}/comments` — write.

Append one investigation comment; verify existing comments before a later attempt after an uncertain acknowledgment. API documentation: https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28

Inputs: `owner` (string), `repository` (string), `issue_number` (int), `body` (string). Outputs: `comment`: object.
