# AWS EC2 network containment API evidence

Requires ec2:DescribeNetworkInterfaces, ec2:DescribeSecurityGroups and ec2:ModifyNetworkInterfaceAttribute on the target resources, using separately maintained STS response credentials. Select matching endpoint/signing region from the three reviewed regions. Isolation replaces every security group on one ENI with an operator-prepared quarantine group that has no ingress or egress permissions. Verify that group first. This is not an instance-wide or immediate connection-termination claim: cover every attached ENI and account for AWS connection tracking. Capture the full prior group set before changing it. Restore accepts one required and up to fifteen optional explicit prior group IDs; unknown fields are refused, so no supplied group is silently truncated. Inspect AWS requestId/return receipts and re-read interface membership after each mutation. One exact-resource read per call; no hidden pagination or retries.

All containment and inverse actions use `effect: destructive`; the native execution policy requires approval for both. A reverse operation is a new approved request, not automatic compensation. No uncertain mutation is retried. Local limits: 10 requests/minute, 500/day, 20-second action deadline. Vendor 429s and failed responses stop execution; quotas are shared with other clients.

Replay fixtures are sanitized examples constructed from the official endpoint fields and response schemas. `document_sha256` hashes the retrieved official reference bytes. Fixture responses are acknowledgments unless an action explicitly reads current state. Authentication exchanges use the engine's synthetic replay credentials; no credentials or customer data are included.

Private or on-prem origins are supported only by self-hosted/sovereign deployment policy. These SaaS allowlists resolve to exact configured public HTTPS hosts through tenant egress; no wildcard host or port is granted.

## Actions

### Get network interface and groups

`GET {{config.base_url}}/`

Read one explicit ENI including its current group set; retain the complete XML state for a reviewed restoration. API documentation: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeNetworkInterfaces.html

Inputs: `network_interface_id` (string). Outputs: `response_xml`.

Read-only; no automatic pagination or asynchronous completion claim.

### Get security group permissions

`GET {{config.base_url}}/`

Read the candidate quarantine group; the approver must verify that both ingress and egress permission sets are empty. API documentation: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeSecurityGroups.html

Inputs: `group_id` (string). Outputs: `response_xml`.

Read-only; no automatic pagination or asynchronous completion claim.

### Isolate network interface

`POST {{config.base_url}}/`

Replace the security groups on exactly one ENI with the approved quarantine group. This does not terminate every established connection or cover other ENIs. API documentation: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyNetworkInterfaceAttribute.html

Inputs: `network_interface_id` (string), `quarantine_group_id` (string). Outputs: `receipt_xml`.

Inverse: `restore_network_interface_groups`.

### Restore complete network interface groups

`POST {{config.base_url}}/`

Replace the ENI group set with all explicitly supplied prior group IDs. Supply the complete captured set; omission does not reconstruct original state automatically. API documentation: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyNetworkInterfaceAttribute.html

Inputs: `network_interface_id` (string), `original_group_1` (string), `original_group_2` (string), `original_group_3` (string), `original_group_4` (string), `original_group_5` (string), `original_group_6` (string), `original_group_7` (string), `original_group_8` (string), `original_group_9` (string), `original_group_10` (string), `original_group_11` (string), `original_group_12` (string), `original_group_13` (string), `original_group_14` (string), `original_group_15` (string), `original_group_16` (string). Outputs: `receipt_xml`.

Inverse: `isolate_network_interface`.
