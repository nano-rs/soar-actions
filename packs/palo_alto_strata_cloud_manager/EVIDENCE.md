# Palo Alto Strata Cloud Manager API references

Requires a current SCM bearer token and appropriate service-account roles/TSG. Only api.strata.paloaltonetworks.com is supported. The action uses a host ID rather than an IP address. Acceptance does not establish downstream enforcement. The inverse removes that quarantine entry. Rate and authorization guidance: https://pan.dev/scm/docs/api-best-practices/ .

## Quarantine device

Change the SCM quarantined-device record for an explicit host ID. This is the vendor-hosted SCM API, not an on-premises PAN-OS call. Acknowledgment does not verify downstream endpoint/network state. API documentation: https://pan.dev/scm/api/config/ngfw/objects/create-quarantined-devices/

`POST https://api.strata.paloaltonetworks.com/config/objects/v1/quarantined-devices`

Inverse action: `unquarantine_device`.

## Release device from quarantine

Change the SCM quarantined-device record for an explicit host ID. This is the vendor-hosted SCM API, not an on-premises PAN-OS call. Acknowledgment does not verify downstream endpoint/network state. API documentation: https://pan.dev/scm/api/config/ngfw/objects/delete-quarantined-devices/

`DELETE https://api.strata.paloaltonetworks.com/config/objects/v1/quarantined-devices`

Inverse action: `quarantine_device`.

## Hosts and request budgets

Host: `api.strata.paloaltonetworks.com`. Paths: `/config/objects/v1/quarantined-devices`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `pan_os_block_ip`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://pan.dev/panos/docs/tutorials/automating-ip-blocking/.
- `pan_os_unblock_ip`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://pan.dev/panos/docs/tutorials/automating-ip-blocking/.
