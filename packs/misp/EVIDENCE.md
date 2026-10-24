# MISP — batch=A

**Deployment scope: self-hosted/sovereign only.** The connection owner supplies the full HTTPS /attributes/restSearch endpoint; immutable typed config pins one exact hostname and the signed pack restricts the path. The current native broker still requires a publicly routable hostname on port 443 and normal verified TLS. It refuses private/reserved DNS answers even for this pack; no private-network bypass is introduced. Private-only MISP instances are explicitly unsupported below pending a separately reviewed self-hosted egress capability.

Requires an automation API key in Authorization with read access to the relevant organisation/sharing groups. Every POST is a read search. Requests JSON, page 1 / limit 25, no attachments. IP source and destination are separate typed lookups. Results obey MISP value-filter semantics and the caller's permissions; there is no full-database or complete-pagination claim. Empty Attribute arrays are valid no-match evidence; first_attribute_id then becomes unknown, not a risk verdict. Attachments, event publication, sightings and other mutations are excluded.

## Actions and typed outputs

- `lookup_ip_source`: [official API](https://www.misp-project.org/openapi/#tag/Attributes/operation/restSearchAttributes); `rows: array`, `first_attribute_id: string`.
- `lookup_ip_destination`: [official API](https://www.misp-project.org/openapi/#tag/Attributes/operation/restSearchAttributes); `rows: array`, `first_attribute_id: string`.
- `lookup_domain`: [official API](https://www.misp-project.org/openapi/#tag/Attributes/operation/restSearchAttributes); `rows: array`, `first_attribute_id: string`.
- `lookup_url`: [official API](https://www.misp-project.org/openapi/#tag/Attributes/operation/restSearchAttributes); `rows: array`, `first_attribute_id: string`.
- `lookup_sha256`: [official API](https://www.misp-project.org/openapi/#tag/Attributes/operation/restSearchAttributes); `rows: array`, `first_attribute_id: string`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
