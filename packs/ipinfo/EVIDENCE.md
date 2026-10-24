# IPinfo — batch=A

Uses the current IPinfo Lite API with a token supplied by the native query-key plugin. Replay excludes only the token query parameter. This free-tier schema documents only ip as required; missing optional ASN/geolocation fields are the string unknown, never a fabricated location or benign risk. The minimal-object fixture proves that contract. IP geolocation/ASN is contextual metadata, not a threat score. One IP per call, no pagination or current-caller me endpoint. Vendor entitlement and rate failures surface.

## Actions and typed outputs

- `lookup_ip`: [official API](https://ipinfo.io/developers/lite-api); `ip: string`, `asn: string`, `as_name: string`, `as_domain: string`, `country_code: string`, `country: string`, `continent_code: string`, `continent: string`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
