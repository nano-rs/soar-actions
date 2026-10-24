# Contributing SOAR actions

Propose changes in a pull request. Keep each change focused on one vendor or a small related set of actions.

1. Add or update `packs/<vendor>/pack.yaml` and its declared request/response fixtures.
2. Link the official vendor endpoint reference for every operation. Document permissions, allowed regions and hosts, rate limits, outputs and rollback behavior in `EVIDENCE.md`; retain neutral API references in `evidence.json`.
3. Prefer the vendor request/response examples. If only the official endpoint schema is available, use only its defined fields and types. List operations with unavailable or login-restricted definitions in `unsupported.json`.
4. Pair containment actions with their inverse. Require approval for destructive actions and explain any irreversible effect. Do not add arbitrary customer hosts or automatic retries for uncertain mutations.
5. Check every fixture against the action's method, URL, parameters, body, response checks and outputs. Include negative cases for foreign hosts, missing inverses, failed responses and invalid inputs. Never include credentials or customer information.
6. Keep each NOTICE to: Vendor names and API documentation belong to their respective owners.

nano validates the pack and its request replay, reviews the exact content and approval policy, approves it, signs a release, and publishes it to the distribution index. A pull request, merge or download does not grant tenant execution. Tenants receive only signed releases through the distribution index API.

Use the schema and authentication documentation linked in [README.md](README.md). Contributions use the repository's Apache-2.0 license.

Structured notifications use `notify_event` with a typed canonical `notification`
object (the alert/case `WebhookPayload`), rather than repeating a vendor body in a
pack. `notification_body` calls the backend's canonical channel formatter. The
legacy freeform actions keep their existing bodies and authentication.

Run `node scripts/check-notification-contract.mjs` here, then run
`node scripts/validate-soar-notification-packs.mjs /path/to/soar-actions --conformance`
from the backend checkout. The latter snapshots the actual four packs and runs
core/native SOAR byte conformance and all their authored fixture replays through
cargo-slot, including the farm. Catalog content is test input only; no pack is
bundled in a binary. Update fixture evidence when intentionally changing a shape.

CI runs both checks. The native job uses the reviewed backend commit pinned in
`backend-conformance-ref.txt` and needs the read-only
`NANOSIEM_CONFORMANCE_READ_TOKEN` repository secret to check out that private
repository. This change does not provision that secret or enable publishing.
Fork pull requests run the public contract check; a maintainer must put the
candidate on a repository branch for the private native check before merging.
New structured actions require the NAN-4478 backend before catalog approval or
publication. A merge alone never installs a pack on a tenant.

Native compiler diagnostics stay out of this public repository's job logs and
artifacts, because they may include private backend source. Maintainers reproduce
failures in the backend checkout to inspect details.
