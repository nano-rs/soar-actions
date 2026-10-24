# urlscan.io — batch=A

Requires an API key with search/result read access in the `api-key` header. Only existing scans are read: URL submission, screenshots, DOM downloads, visibility changes and deletion are excluded. Search uses an exact bounded 25-result first page; URL text is JSON-quoted inside the vendor query grammar. `total_count` is exact only up to 10,000; `has_more` means the vendor has more than 10,000 matches, not that this 25-row page is complete. No full-coverage claim is made. Follow-up search_after pagination is not automatic. Results are a one-shot read of a completed scan: 404 (pending/missing) and 410 (deleted) fail instead of claiming a clean verdict. Vendor quotas and Retry-After vary by plan; the explicit flow controls later polling.

## Actions, permissions and official references

- `search_domain`: [Search existing scans by domain](https://docs.urlscan.io/apis/urlscan-openapi/search/searchdatasource).
- `search_ip`: [Search existing scans by ip](https://docs.urlscan.io/apis/urlscan-openapi/search/searchdatasource).
- `search_url`: [Search existing scans by url](https://docs.urlscan.io/apis/urlscan-openapi/search/searchdatasource).
- `get_result`: [Get completed scan result](https://docs.urlscan.io/apis/urlscan-openapi/scanning/getresult).

## Stable output contracts

Every output is checked against `output_types` after native execution and secret redaction. Missing required evidence fails; missing risk measurements are never replaced with a clean verdict. Objects and arrays preserve JSON values for Judge evidence. Scalar types are usable in branch/match expressions and later step inputs.

- `search_domain`: `rows: array`, `total_count: integer`, `has_more: boolean`.
- `search_ip`: `rows: array`, `total_count: integer`, `has_more: boolean`.
- `search_url`: `rows: array`, `total_count: integer`, `has_more: boolean`.
- `get_result`: `scan_id: string`, `url: string`, `domain: string`, `ip: string`, `malicious_count: integer`, `verdicts: object`.

## Bounds and replay

Only the declared HTTPS host and path prefixes are allowed; redirects and links returned inside vendor data are not followed. The action host applies tenant/connection request budgets and bounded response/time limits. HTTP authentication, rate-limit and provider failures produce action errors; they never imply a benign indicator. All operations are Read lookups through the declared endpoint set. Scan-submission, containment and mutation endpoints are outside this pack.

Connection defaults: 10/minute, 500/day, 20-second timeout. Vendor account-wide limits still apply. Native sequences do not automatically resend requests after 429 or ambiguous transport errors.

Fixtures are independently authored HTTP mocks from the cited official endpoint examples/schemas. Values are synthetic/public examples, not customer recordings or live responses. The evidence ledger pins downloaded documentation bytes with SHA-256; supporting schemas are listed separately. Request authentication is supplied by the native credential plugin; no usable credential appears in a fixture.

Read-only XSOAR inspection selected the command families and informed protocol research. It is not HTTP evidence. Reviewed engine output-contract support is required; this content change performs no catalog import or publication.
