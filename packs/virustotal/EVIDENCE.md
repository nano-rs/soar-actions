# VirusTotal — batch=A

Uses the API v3 key in `x-apikey`. These actions retrieve reports, not submissions/rescans. URL inputs are converted to the documented unpadded URL-safe Base64 identifier by a bounded native helper. There is no pagination for a single report. Public API quotas are account-wide and license-dependent; respect VirusTotal terms for commercial use. **Vendor privacy rule:** even an indicator query can cause scanning/dataset inclusion; send only indicators approved for sharing with VirusTotal. HTTP 404 or an incomplete report is an error, not a zero-risk result.

## Actions, permissions and official references

- `lookup_ip`: [Look up ip report](https://docs.virustotal.com/reference/ip-info).
- `lookup_domain`: [Look up domain report](https://docs.virustotal.com/reference/domain-info).
- `lookup_hash`: [Look up hash report](https://docs.virustotal.com/reference/file-info).
- `lookup_url`: [Look up url report](https://docs.virustotal.com/reference/url-info).

## Stable output contracts

Every output is checked against `output_types` after native execution and secret redaction. Missing required evidence fails; missing risk measurements are never replaced with a clean verdict. Objects and arrays preserve JSON values for Judge evidence. Scalar types are usable in branch/match expressions and later step inputs.

- `lookup_ip`: `indicator_id: string`, `malicious_count: integer`, `suspicious_count: integer`, `reputation: integer`, `analysis_stats: object`.
- `lookup_domain`: `indicator_id: string`, `malicious_count: integer`, `suspicious_count: integer`, `reputation: integer`, `analysis_stats: object`.
- `lookup_hash`: `indicator_id: string`, `malicious_count: integer`, `suspicious_count: integer`, `reputation: integer`, `analysis_stats: object`.
- `lookup_url`: `indicator_id: string`, `malicious_count: integer`, `suspicious_count: integer`, `reputation: integer`, `analysis_stats: object`, `url: string`.

## Bounds and replay

Only the declared HTTPS host and path prefixes are allowed; redirects and links returned inside vendor data are not followed. The action host applies tenant/connection request budgets and bounded response/time limits. HTTP authentication, rate-limit and provider failures produce action errors; they never imply a benign indicator. All operations are Read lookups through the declared endpoint set. Scan-submission, containment and mutation endpoints are outside this pack.

Connection defaults: 4/minute, 400/day, 20-second timeout. Vendor account-wide limits still apply. Native sequences do not automatically resend requests after 429 or ambiguous transport errors.

Fixtures are independently authored HTTP mocks from the cited official endpoint examples/schemas. Values are synthetic/public examples, not customer recordings or live responses. The evidence ledger pins downloaded documentation bytes with SHA-256; supporting schemas are listed separately. Request authentication is supplied by the native credential plugin; no usable credential appears in a fixture.

Read-only XSOAR inspection selected the command families and informed protocol research. It is not HTTP evidence. Reviewed engine output-contract support is required; this content change performs no catalog import or publication.
