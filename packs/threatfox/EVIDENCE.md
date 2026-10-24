# ThreatFox — batch=A

Requires abuse.ch Auth-Key. Selects search_ioc with exact_match=true for IP/domain/URL and search_hash for MD5/SHA256 only. A bare IP may return ip:port indicators as shown in the official example; exact_match is the provider search behavior, not a local claim that all IOC strings equal the input. Results preserve all returned rows and explicitly label the first IOC/confidence as first, not aggregate risk. No automatic pagination or total-coverage claim. Since 2025-05-01 the vendor expires IOCs older than six months from API/export; no result does not mean an indicator is safe. Only query_status=ok with nonempty typed data is admitted; provider errors/no results fail. Commercial use may require an abuse.ch paid subscription.

## Actions and typed outputs

- `lookup_ip`: [official API](https://threatfox.abuse.ch/api/#search-ioc); `query_status: string`, `rows: array`, `first_ioc: string`, `first_confidence: integer`.
- `lookup_domain`: [official API](https://threatfox.abuse.ch/api/#search-ioc); `query_status: string`, `rows: array`, `first_ioc: string`, `first_confidence: integer`.
- `lookup_url`: [official API](https://threatfox.abuse.ch/api/#search-ioc); `query_status: string`, `rows: array`, `first_ioc: string`, `first_confidence: integer`.
- `lookup_hash`: [official API](https://threatfox.abuse.ch/api/#search-hash); `query_status: string`, `rows: array`, `first_ioc: string`, `first_confidence: integer`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
