# MIG-006 — Write the development knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/development.md` holds the current, code-checked version of every development fact from the old docs.

## Work

1. Read only the inventory rows mapped to `development.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/development.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/development.md`. Corrections found against code:
- Lib pin is `#v0.2.0` (see technical).
- Node requirement comes from Vite's engines `^20.19.0 || >=22.12.0`; the repo pins none (no `engines`, no `.nvmrc`).
- Tests: 23 files / 212 tests (find + grep), not "two suites"; CLAUDE.md's list omits TempoReadout, TrainerBar, TrainerButton.
- Dropped stale lib-token troubleshooting and the `tokens.css` import-order rule (no such import).
- ResizeObserver stub serves the app's own `BeatDots.tsx:64`, not a lib component.
- Review fixes: manual-verification step said "volume" (now mute); git-deps table replaced with a link to technical.
- Added checked details: `prepare: husky`, snapshot flags, gen-skeleton port 4321 @412px, pre-commit runs lint then snapshot on src/index.html changes, no `vercel.json`.
