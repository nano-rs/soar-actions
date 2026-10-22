# Jira Cloud ticketing API references

Only connected .atlassian.net tenant origins are supported. Creation requires Browse projects/Create issues and tenant-verified project/type IDs; project-specific mandatory fields must be configured appropriately. Comments require Browse projects/Add comments and applicable issue security permissions, and are restricted to an explicit existing role. Basic auth uses an account email and compatible API token. Authentication guidance: https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/ . Rate guidance: https://developer.atlassian.com/cloud/jira/platform/rate-limiting/ . Notifications, automation and history cannot be undone by deleting a record.

## Create investigation issue

Create a Jira Cloud issue using tenant-verified project/issue type IDs. Requires Browse projects and Create issues; project-specific required fields must be configured appropriately. No fields or IDs are discovered automatically. API documentation: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post

`POST {{config.base_url}}/rest/api/3/issue`

Creation triggers issue history, notifications and automation; no automatic delete is supplied as an undo.

## Add role-restricted investigation comment

Add an ADF plain-text comment restricted to an explicit existing project role. Requires Browse projects and Add comments plus any issue security permission. Select the intended role before approval; no public-comment default is provided. API documentation: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-rest-api-3-issue-issueIdOrKey-comment-post

`POST {{config.base_url}}/rest/api/3/issue/{{input.issue_key}}/comment`

Comments may trigger notifications and audit history; deleting a comment does not undo those effects. No automatic delete is supplied.

## Hosts and request budgets

Host: `{{config.base_url}}`. Paths: `/rest/api/3/issue`.

Tenant suffixes: `.atlassian.net`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `self_hosted_create_issue`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://developer.atlassian.com/server/jira/platform/rest-apis/.
- `self_hosted_add_comment`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://developer.atlassian.com/server/jira/platform/rest-apis/.
