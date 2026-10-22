# Google Workspace Directory API references

Suspend/restore requires admin.directory.user scope and the delegated administrator privilege. Sign-out requires admin.directory.user.security and resets sign-in cookies; users must authenticate again. Only admin.googleapis.com is supported. Domain-wide delegation and token provisioning are managed separately. Rate guidance: https://developers.google.com/workspace/admin/directory/v1/limits documents shared queries, operation and concurrency limits, including 403/429 failures.

## Suspend user

Set only the suspended flag using the documented patch semantics of users.update. Requires admin.directory.user scope and the relevant delegated administrator privilege. Existing sessions are a separate operation. API documentation: https://developers.google.com/workspace/admin/directory/reference/rest/v1/users/update

`PUT https://admin.googleapis.com/admin/directory/v1/users/{{input.user_id}}`

Inverse action: `unsuspend_user`.

## Restore suspended user

Set only the suspended flag using the documented patch semantics of users.update. Requires admin.directory.user scope and the relevant delegated administrator privilege. Existing sessions are a separate operation. API documentation: https://developers.google.com/workspace/admin/directory/reference/rest/v1/users/update

`PUT https://admin.googleapis.com/admin/directory/v1/users/{{input.user_id}}`

Inverse action: `suspend_user`.

## Sign user out

Sign out web/device sessions and reset sign-in cookies. Requires admin.directory.user.security scope and the relevant delegated administrator privilege. The user must authenticate again; this does not recreate sessions. API documentation: https://developers.google.com/workspace/admin/directory/reference/rest/v1/users/signOut

`POST https://admin.googleapis.com/admin/directory/v1/users/{{input.user_id}}/signOut`

Revoked sign-in sessions cannot be recreated; the user must authenticate again.

## Hosts and request budgets

Host: `admin.googleapis.com`. Paths: `/admin/directory/v1/users`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
