# GreyNoise — batch=A

Uses the documented Community API and `key` header; a business-email Community account is needed for key-level access. The endpoint supports routable IPv4 only, enforced by a bounded IPv4 grammar. A documented 404 containing IP/noise/riot is accepted as unobserved, with classification `unknown`; it is not a benign verdict. Invalid/auth/429/server responses fail. The Community quota is 50 searches/week shared with the Visualizer; this connection defaults to 5/day and account usage can still exhaust that allowance. There is no pagination and no asynchronous job.

## Actions, permissions and official references

- `lookup_ip`: [Look up community IPv4 context](https://docs.greynoise.io/reference/getcommunityip).

## Stable output contracts

Every output is checked against `output_types` after native execution and secret redaction. Missing required evidence fails; missing risk measurements are never replaced with a clean verdict. Objects and arrays preserve JSON values for Judge evidence. Scalar types are usable in branch/match expressions and later step inputs.

- `lookup_ip`: `ip: string`, `noise: boolean`, `riot: boolean`, `classification: string`, `last_seen: string`.

## Bounds and replay

Only the declared HTTPS host and path prefixes are allowed; redirects and links returned inside vendor data are not followed. The action host applies tenant/connection request budgets and bounded response/time limits. HTTP authentication, rate-limit and provider failures produce action errors; they never imply a benign indicator. All operations are Read lookups through the declared endpoint set. Scan-submission, containment and mutation endpoints are outside this pack.

Connection defaults: 5/minute, 5/day, 20-second timeout. Vendor account-wide limits still apply. Native sequences do not automatically resend requests after 429 or ambiguous transport errors.

Fixtures are independently authored HTTP mocks from the cited official endpoint examples/schemas. Values are synthetic/public examples, not customer recordings or live responses. The evidence ledger pins downloaded documentation bytes with SHA-256; supporting schemas are listed separately. Request authentication is supplied by the native credential plugin; no usable credential appears in a fixture.

Read-only XSOAR inspection selected the command families and informed protocol research. It is not HTTP evidence. Reviewed engine output-contract support is required; this content change performs no catalog import or publication.
