# Have I Been Pwned — batch=A

Requires a Core/Pro/High RPM subscription API key in hibp-api-key and an identifying User-Agent. This lookup sends the explicit email address to HIBP; use it only for addresses the operator is authorized to investigate. Returns truncated breach names, excludes unverified breaches and omits sensitive/retired breaches as imposed by the public API. The list is evidence of known matching breaches, not a completeness guarantee. HTTP 404 (not found) is surfaced as an action error; it does not produce a false safe verdict. Other authentication/entitlement/429 failures also fail. No pagination, account creation, domain ownership verification or password submission. The official integration-test email is a public synthetic fixture; no test API key is embedded or called.

## Actions and typed outputs

- `lookup_email`: [official API](https://haveibeenpwned.com/API/v3#BreachesForAccount); `rows: array`, `first_breach: string`.

## Execution and evidence bounds

Every operation has Effect::Read and a complete `output_types` contract checked by the native executor after secret redaction. Arrays/objects retain JSON evidence for Judge and subsequent steps; scalar outputs retain their declared JSON types for branches, matches and later inputs. Missing required fields and wrong types fail; a provider failure is never converted to a clean verdict.

Only declared HTTPS hosts/path prefixes are reachable. Links in returned records are data and are not followed. The native broker applies response size, time and tenant/connection request budgets; redirects are refused. There are no automatic HTTP retries, scans, downloads, submissions or mutations. An explicit later flow invocation is required for polling/retries; rate-limit responses are surfaced.

Fixtures are independently authored mocks based solely on the cited official API references, using public/synthetic values. No live vendor requests were made. Authentication is supplied by the native credential plugin; recordings contain no usable credentials. `evidence.json` pins downloaded documentation bytes by SHA-256 and pairs every fixture with its expected HTTP exchange.

XSOAR command metadata was inspected for analyst action selection and protocol research only; no implementation was copied or used as HTTP evidence. This is catalog authoring only; no catalog import or publication occurs. Requires the typed-output support in nanosiem #7714.

Connection defaults: 5/minute, 500/day, 20-second timeout. Vendor account-wide limits and subscription entitlements still apply.
