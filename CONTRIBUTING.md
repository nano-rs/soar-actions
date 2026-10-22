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
