# URLhaus — batch=A

Requires the abuse.ch Auth-Key header. These POST requests are documented read queries, never URL submissions or sample downloads. Host lookup accepts IPv4 or domain; the IPv4 grammar excludes IPv6, which this endpoint does not document. Host/payload `urls` are capped at 100 by the vendor; the string `url_count` can exceed returned rows. URL payload lists are also capped at 100. Counts and byte sizes remain strings as documented; they are not silently coerced. No automatic pagination. The host response example misspells query_status as query_staus; admission follows the documented field table, and fails closed if that required success field is absent. Commercial use may require a paid license under the abuse.ch fair-use rules. no_results and invalid-input body statuses fail instead of asserting benignness.

## Actions and typed outputs

- `lookup_ip`: [official API](https://urlhaus-api.abuse.ch/#host); `host: string`, `url_count: string`, `rows: array`, `first_seen: string`.
- `lookup_domain`: [official API](https://urlhaus-api.abuse.ch/#host); `host: string`, `url_count: string`, `rows: array`, `first_seen: string`.
- `lookup_url`: [official API](https://urlhaus-api.abuse.ch/#url); `id: string`, `url: string`, `url_status: string`, `threat: string`, `payloads: array`.
- `lookup_sha256`: [official API](https://urlhaus-api.abuse.ch/#payload); `sha256: string`, `file_type: string`, `file_size_bytes: string`, `malware_family: string`, `rows: array`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
