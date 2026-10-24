# Recorded Future — batch=A

Requires an active Connect API subscription and API token in X-RFToken. Requests only entity,risk, avoiding paid/large optional relationship/AI sections. Uses the documented entity prefixes ip:, idn: and hash:. Scores and triggered rule counts retain integer types; missing risk fails rather than becoming zero. Single-entity lookups have no pagination. Vendor 401/403/404/429/server errors surface. URL lookup is separately unsupported because its documented full URL path identity requires encoded path separators currently refused by native egress; no policy bypass or unverified alternate endpoint is added.

## Actions and typed outputs

- `lookup_ip`: [official API](https://docs.recordedfuture.com/reference/ip-lookup); `entity_id: string`, `indicator: string`, `risk_score: integer`, `criticality: string`, `triggered_rules: integer`, `risk_evidence: array`.
- `lookup_domain`: [official API](https://docs.recordedfuture.com/reference/domain-lookup); `entity_id: string`, `indicator: string`, `risk_score: integer`, `criticality: string`, `triggered_rules: integer`, `risk_evidence: array`.
- `lookup_hash`: [official API](https://docs.recordedfuture.com/reference/hash-lookup); `entity_id: string`, `indicator: string`, `risk_score: integer`, `criticality: string`, `triggered_rules: integer`, `risk_evidence: array`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
