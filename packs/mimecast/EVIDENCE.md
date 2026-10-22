# Mimecast Cloud Gateway policy API references

Requires Gateway | Policies | Edit. The current API 2.0 uses a current bearer token. Only api.services.mimecast.com is supported. Blocking is limited to one explicit sender and recipient, covering envelope/header sender; the policy is enabled, non-bidirectional and non-override. Save the returned policy ID for removal. Re-creating requires the original sender, recipient and description and does not restore IDs or history. Other protections remain in effect. Limits are per resource and subject to change. Authentication and rate guidance: https://developer.services.mimecast.com/api-overview .

## Block sender for one recipient

Create a policy for one explicit sender and recipient, covering envelope/header sender. Requires Gateway | Policies | Edit. Return the policy ID for the inverse action; acknowledgment does not establish delivery enforcement. API documentation: https://developer.services.mimecast.com/docs/policymanagement/1/routes/policy-management%2Fcloud-gateway%2Fv1%2Fblocked-senders%2Fpolicies/post

`POST https://api.services.mimecast.com/policy-management/cloud-gateway/v1/blocked-senders/policies`

Inverse action: `remove_sender_block`.

## Remove sender block policy

Delete the policy ID returned by block_sender. Requires Gateway | Policies | Edit. This removes this policy only, not other protections. Re-creating requires the original sender, recipient and description; IDs/history are not restored. API documentation: https://developer.services.mimecast.com/docs/policymanagement/1/routes/policy-management%2Fcloud-gateway%2Fv1%2Fblocked-senders%2Fpolicies%2F%7Bpolicy_id%7D/delete

`DELETE https://api.services.mimecast.com/policy-management/cloud-gateway/v1/blocked-senders/policies/{{input.policy_id}}`

Inverse action: `block_sender`.

## Hosts and request budgets

Host: `api.services.mimecast.com`. Paths: `/policy-management/cloud-gateway/v1/blocked-senders/policies`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.
