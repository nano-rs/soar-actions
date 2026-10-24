# Hybrid Analysis — batch=A

Requires a restricted-or-higher API key in api-key. The official current UI loads its OpenAPI document from https://hybrid-analysis.com/bff/api-docs/v2; the pinned schema is the HTTP evidence. Uses current GET /search/hash, not deprecated POST. Returns SearchByHash sha256s/reports, with nullable report state/verdict represented as unknown. A report may still be queued or failed; lookup does not mean detonation completed, and first fields are not aggregate verdicts. No submissions, detonation, malware downloads, URL quick scans or erased records. No pagination for this endpoint; account Api-Limits apply.

## Actions and typed outputs

- `lookup_hash`: [official API](https://www.hybrid-analysis.com/docs/api/v2); `sha256s: array`, `reports: array`, `first_report_state: string`, `first_verdict: string`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
