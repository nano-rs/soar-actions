# Shodan — batch=A

Requires a Shodan API key and applicable host/DNS entitlement. The native query-key plugin supplies `key`; replay explicitly excludes only that authentication query field and stores no key value. Host lookup uses minify=true and history=false, avoiding banner payloads. Domain lookup returns only the first 100-record page and preserves the vendor `more` flag; it consumes one query credit. No scan initiation or network-alert mutations are exposed. Account API limits and credit exhaustion are surfaced; the platform never contacts the indicator itself.

## Actions, permissions and official references

- `lookup_ip`: [Look up host service summary](https://developer.shodan.io/api#shodan-host-ip).
- `lookup_domain`: [Look up first page of DNS information](https://developer.shodan.io/api#dns-domain).

## Stable output contracts

Every output is checked against `output_types` after native execution and secret redaction. Missing required evidence fails; missing risk measurements are never replaced with a clean verdict. Objects and arrays preserve JSON values for Judge evidence. Scalar types are usable in branch/match expressions and later step inputs.

- `lookup_ip`: `ip: string`, `ports: array`, `hostnames: array`, `domains: array`, `organization: string`, `asn: string`.
- `lookup_domain`: `domain: string`, `rows: array`, `subdomains: array`, `more: boolean`.

## Bounds and replay

Only the declared HTTPS host and path prefixes are allowed; redirects and links returned inside vendor data are not followed. The action host applies tenant/connection request budgets and bounded response/time limits. HTTP authentication, rate-limit and provider failures produce action errors; they never imply a benign indicator. All operations are Read lookups through the declared endpoint set. Scan-submission, containment and mutation endpoints are outside this pack.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits still apply. Native sequences do not automatically resend requests after 429 or ambiguous transport errors.

Fixtures are independently authored HTTP mocks from the cited official endpoint examples/schemas. Values are synthetic/public examples, not customer recordings or live responses. The evidence ledger pins downloaded documentation bytes with SHA-256; supporting schemas are listed separately. Request authentication is supplied by the native credential plugin; no usable credential appears in a fixture.

Read-only XSOAR inspection selected the command families and informed protocol research. It is not HTTP evidence. Reviewed engine output-contract support is required; this content change performs no catalog import or publication.
