# Microsoft Intune API evidence

Global public-cloud Graph endpoints only. National-cloud hosts are not inferred. Reads require managed-device read permission; remote actions require PrivilegedOperations.All with admin consent. Mutations return acceptance only; re-read device/deviceActionResults for state. Microsoft throttling uses HTTP 429/Retry-After. No tenant-wide listing or automatic destructive retry. The GET resource contract defines a managedDevice object; fixtures use that schema rather than the inconsistent generic value wrapper in the documentation example.

## Get managed device

`GET https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/{{input.device_id}}`

Get one managed device by its immutable ID. Requires DeviceManagementManagedDevices.Read.All or ReadWrite.All. The response resource is an object; optional vendor properties remain inside the typed device object. Official endpoint reference: https://learn.microsoft.com/en-us/graph/api/intune-devices-manageddevice-get?view=graph-rest-1.0

Effect: `read`. Read only.

## Remote Lock

`POST https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/{{input.device_id}}/remoteLock`

Queue a remote lock. Unlock is performed on the device with its supported local credential; this pack cannot undo it. Requires DeviceManagementManagedDevices.PrivilegedOperations.All and an active Intune license. HTTP 204 is acceptance, not proof the device completed the command. Official endpoint reference: https://learn.microsoft.com/en-us/graph/api/intune-devices-manageddevice-remotelock?view=graph-rest-1.0

Effect: `destructive`. Queue a remote lock. Unlock is performed on the device with its supported local credential; this pack cannot undo it.

## Wipe

`POST https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/{{input.device_id}}/wipe`

Queue a factory wipe without retaining enrollment or user data. Erased data cannot be restored by an API inverse. Requires DeviceManagementManagedDevices.PrivilegedOperations.All and an active Intune license. HTTP 204 is acceptance, not proof the device completed the command. Official endpoint reference: https://learn.microsoft.com/en-us/graph/api/intune-devices-manageddevice-wipe?view=graph-rest-1.0

Effect: `destructive`. Queue a factory wipe without retaining enrollment or user data. Erased data cannot be restored by an API inverse.

## Retire

`POST https://graph.microsoft.com/v1.0/deviceManagement/managedDevices/{{input.device_id}}/retire`

Queue retirement of the managed device. Reenrollment and restoration of removed corporate configuration require an administrator/user workflow. Requires DeviceManagementManagedDevices.PrivilegedOperations.All and an active Intune license. HTTP 204 is acceptance, not proof the device completed the command. Official endpoint reference: https://learn.microsoft.com/en-us/graph/api/intune-devices-manageddevice-retire?view=graph-rest-1.0

Effect: `destructive`. Queue retirement of the managed device. Reenrollment and restoration of removed corporate configuration require an administrator/user workflow.

## Execution limits and permissions

The pack uses existing native auth plugins; credentials stay in the connection secret store. Exact connection origins and path allowlists apply to auth and data requests. The local cap is 10 requests/minute, 500/day and a 30-second action deadline; vendor quotas may be lower. A 429 stops the action. Ambiguous mutations are never retried automatically. Every destructive action, including an inverse, requires approval even in a write-auto flow. No fixture calls a live vendor. All example identities and responses are synthetic schema-based data. HTTP-mock evidence records the expected vendor request independently of native template rendering.
