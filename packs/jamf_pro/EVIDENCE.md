# Jamf Pro API evidence

Cloud tenant origins only: .jamfcloud.com. Jamf Pro API client credentials require 10.49 or later; the v4 inventory contract is from 11.33.0. On-prem/private Jamf servers are self-hosted/sovereign only and are not admitted by this cloud pack. The native oauth2_json_credential wrapper delegates token handling to the existing OAuth plugin, then injects the LOCK_PIN credential only for DEVICE_LOCK. The connection requires LOCK_PIN for native auth-field admission; other actions do not inject it. Commands are queued asynchronously, may wait for device check-in and are never described as completed. Lock and local-account unlock are separate operations; they are not falsely paired as inverses. The six-digit unlock PIN is stored as a native connection secret and inserted after template/exfiltration checks. It is never a flow input, URL value or output, and HTTP summaries redact it. Fixture 824671 is synthetic. Rate limits and permissions are instance-specific; respect HTTP 429.

## Get computer inventory

`GET {{config.base_url}}/api/v4/computers-inventory/{{input.computer_id}}`

Get the General section of one computer using the current v4 inventory endpoint. Requires Read Computers. The General data includes the management ID used by MDM commands; inventory record IDs are not substituted for management IDs. Official endpoint reference: https://developer.jamf.com/jamf-pro/reference/get_v4-computers-inventory-id

Effect: `read`. Read only.

## Lock Computer

`POST {{config.base_url}}/api/v2/mdm/commands`

Queue one fixed MDM command for one explicit management UUID. Requires View MDM command information plus permission to send the selected command. A nonempty first command ID and typed receipt array are required; all returned receipts are preserved. HTTP 201 means queued, not completed. A device lock has no generic remote device-unlock inverse. The authorized operator must retain the transient unlock PIN and use the supported physical unlock procedure; the PIN is held in native credential storage and injected only into DEVICE_LOCK requests. Official endpoint reference: https://developer.jamf.com/jamf-pro/reference/post_v2-mdm-commands

Effect: `destructive`. A device lock has no generic remote device-unlock inverse. The authorized operator must retain the transient unlock PIN and use the supported physical unlock procedure; the PIN is held in native credential storage and injected only into DEVICE_LOCK requests.

## Unlock User Account

`POST {{config.base_url}}/api/v2/mdm/commands`

Queue one fixed MDM command for one explicit management UUID. Requires View MDM command information plus permission to send the selected command. A nonempty first command ID and typed receipt array are required; all returned receipts are preserved. HTTP 201 means queued, not completed. Unlocking a local user account is not an inverse for DEVICE_LOCK. There is no paired MDM lock-user-account operation in this pack. Official endpoint reference: https://developer.jamf.com/jamf-pro/reference/post_v2-mdm-commands

Effect: `destructive`. Unlocking a local user account is not an inverse for DEVICE_LOCK. There is no paired MDM lock-user-account operation in this pack.

## Restart Computer

`POST {{config.base_url}}/api/v2/mdm/commands`

Queue one fixed MDM command for one explicit management UUID. Requires View MDM command information plus permission to send the selected command. A nonempty first command ID and typed receipt array are required; all returned receipts are preserved. HTTP 201 means queued, not completed. A queued restart cannot be recalled or undone; this pack exposes no arbitrary command string. Official endpoint reference: https://developer.jamf.com/jamf-pro/reference/post_v2-mdm-commands

Effect: `destructive`. A queued restart cannot be recalled or undone; this pack exposes no arbitrary command string.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.

The native engine validates declared auth fields before every action, so LOCK_PIN is required for this connection, including reads. It is used only for DEVICE_LOCK. Rotate it in the connection secret store between independently authorized lock commands.
