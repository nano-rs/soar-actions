# SOAR actions

Declarative response actions for endpoint security, identity, email, network security and ticketing APIs. Packs define typed inputs, authentication, allowed HTTPS hosts, bounded requests, response checks and outputs. Containment actions include their inverse; irreversible operations explain their limits. Mutations follow their effect and flow approval policy. Notification writes can run automatically in human-managed flows; AI-originated and API/agent-key-triggered runs still require human approval.

Every pack is reviewed, approved and signed by nano before any tenant can run it. Downloading content does not authorize execution. Tenants receive signed releases through the distribution index API.

## Layout

`packs/<vendor>/` contains `pack.yaml`, declared `fixtures/*.json`, API references in `EVIDENCE.md` and `evidence.json`, and `NOTICE`. `unsupported.json` lists unavailable operations and their API references. A vendor with only unsupported operations has no executable pack or fixtures.

## Author a pack

Use the [request and authentication documentation](https://github.com/nano-rs/nano/blob/main/nano-connector/docs/AUTHORING.md) and [connector schema](https://github.com/nano-rs/nano/blob/main/nano-connector/docs/connector.schema.json).

- Use version 1, kind `action_pack`, a lowercase underscore name, and `source: {kind: nano_authored}`.
- Declare typed inputs and required credentials by name. Put credentials in the credential store, never in configuration, outputs or fixtures.
- Restrict HTTPS requests to documented vendor hosts and path prefixes. Tenant-specific origins require vendor-owned suffixes; regional origins use an explicit allowed set.
- Cite the official endpoint reference for every action. Prefer documented request/response examples. When only an official endpoint schema is available, use only its defined fields and types. Otherwise list the action as unsupported, including when definitions require vendor login.
- Declare successful status/body checks and expected outputs. Distinguish accepted or queued requests from completed operations.
- Pair containment with an inverse and require approval for destructive operations. Explain irreversibility, authorization, rate limits and regional restrictions.
- Supply a replay fixture for each action, with its API reference URL and expected HTTP exchanges. Keep examples free of credentials and customer information.

See [CONTRIBUTING.md](CONTRIBUTING.md) to propose a pack or update. Licensed under Apache-2.0; vendor attribution is retained in each NOTICE.
