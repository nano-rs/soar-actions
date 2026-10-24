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

CI in this public repository runs only
`node scripts/check-notification-contract.mjs`, including for fork pull requests.
It checks canonical helper bindings and fixture/evidence agreement. It never
checks out private source or requires a private-repository credential.

Cross-repository byte conformance runs entirely in the private nanosiem
repository. That repository pins a reviewed public soar-actions commit in
`scripts/notification-catalog-ref.txt` and tests it against the production core
formatters and connector engine on a cargo-slot/farm-capable runner. Before
catalog approval or publication, update the private pin to the candidate commit
and run that private gate. No backend revision is pinned by this public catalog.

New structured actions require the NAN-4478 backend before catalog approval or
publication. A merge alone never installs a pack on a tenant. No runner,
credential, catalog publication or live-tenant change is provisioned here.

Device mutations must read and bind their exact target in the approved native sequence before dispatch; a UUID-shaped input alone is not identity evidence. State-restoration actions must consume captured pre-state. A separately approved opposite action must document its pre-state requirement and must not promise unconditional restoration. Native conformance runs in private nanosiem against pinned public commits; public CI requires no private credential.
