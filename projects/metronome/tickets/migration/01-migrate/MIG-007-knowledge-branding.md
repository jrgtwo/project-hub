# MIG-007 — Write the branding knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/branding.md` holds the current, code-checked version of every branding fact from the old docs.

## Work

1. Read only the inventory rows mapped to `branding.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/branding.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/branding.md`. Corrections found against code:
- Tap-hero-to-enlarge is gone; the mascot is an alternative centerpiece view toggled by a corner button, persisted to `metronomnom.centerpiece` (`src/centerpieceView.ts:4-14`).
- Themes are app-owned tokens, not lib re-skins (`src/styles/index.css:29-33`).
- `--pearl` no longer exists; `--beat` is an app token.
- `--range-fill` / `.metro-range--mint` gone; sliders are shadcn.
- Wordmark accent is `--pop` specifically (`Wordmark.tsx:17`).
- Stale code comment: `src/theme.ts:3-6` ("over the lib design tokens").
Review fixes: `--mint` role corrected to unused; mockup location rewritten as archived (no link into legacy). Mockups in `docs/branding-mockups/` were not in the inventory; the retire ticket moves them.
