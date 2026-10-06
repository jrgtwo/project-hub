# MIG-009 — Retire the old docs

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md), [MIG-002 — Import every work item into pre-migration](MIG-002-import-work-items.md), [MIG-003 — Write the product knowledge doc](MIG-003-knowledge-product.md), [MIG-004 — Write the architecture knowledge doc](MIG-004-knowledge-architecture.md), [MIG-005 — Write the technical knowledge doc](MIG-005-knowledge-technical.md), [MIG-006 — Write the development knowledge doc](MIG-006-knowledge-development.md), [MIG-007 — Write the branding knowledge doc](MIG-007-knowledge-branding.md), [MIG-008 — Write the launch knowledge doc](MIG-008-knowledge-launch.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

The old docs move to `jrg/legacy/`, leaving one current copy of each fact.

## Work

Move every doc, command and skill listed in the inventory into `jrg/legacy/`, keeping relative structure. Add one row per item to `jrg/legacy/README.md`: what it was and where its content went. Confirm nothing outside `jrg/legacy/` links into it, and run `git check-ignore -q jrg` once more. Never delete an old doc. (The memory folder is read-only and is not moved.)

## Acceptance criteria

- [x] Every inventoried doc is under `jrg/legacy/` with a README row.
- [x] No link outside `jrg/legacy/` points into it.
- [x] `jrg/` is not gitignored.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. Moved into `jrg/legacy/`, keeping relative paths: `.claude/commands/` (2), `.claude/working-docs/` (5), `DEVELOPMENT.md`, `docs/` (5 docs, `branding-mockups/`, `superpowers/specs/` ×4). Removed the then-empty `docs/` folders. One README row per item in `jrg/legacy/README.md`. Memory folder untouched (read-only source). `CLAUDE.md` not moved (harness instructions, not an old doc).

- Links: nothing in `jrg/knowledge/`, `README.md` or `CLAUDE.md` points into `jrg/legacy/`. Ticket and pre-migration text name old paths as provenance only.
- With the user's approval, edited outside `jrg/`: `.gitignore` lines 18 and 23 anchored to `/.claude` and `/docs` (the unanchored patterns matched `jrg/legacy/.claude/` and `jrg/legacy/docs/`); `README.md:70` now links `jrg/knowledge/development.md`.
- `git check-ignore`: `jrg/` and every legacy file not ignored; root `.claude/` and `docs/` still ignored.
- Accepted: the old `/start-new-session` and `/start-new-task` slash commands no longer exist (replaced by `/jrg-start`, `/jrg-ticket`).
