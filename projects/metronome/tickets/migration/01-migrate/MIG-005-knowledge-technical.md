# MIG-005 — Write the technical knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/technical.md` holds the current, code-checked version of every technical fact from the old docs.

## Work

1. Read only the inventory rows mapped to `technical.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/technical.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/technical.md`. Corrections found against code:
- `@fretwork/lib` is pinned at `#v0.2.0`, not `#v0.1.0` (`package.json:20`, lockfile); adkit is `#v0.1.0`. CLAUDE.md, ARCHITECTURE.md and DEVELOPMENT.md are wrong.
- The lib provides no design tokens; the app imports no lib styling.
- `currentMeasure` is used (`src/rockMode.ts:143`), contrary to feature-ideas.
- `createDefaultClickVoices`, `ClickRole`, `NotesBus` are not exported from the lib barrel.
- Memoized component list updated (`VolumeControl` gone; TrainerButton/TrainerBar/ControlDeck etc. memoized).
- Path alias lives in `tsconfig.json` / `tsconfig.app.json` (plus Vite).
- Stale code comment: `src/main.tsx:19-21` says removeAds "hides the footer ad".
Unverifiable, kept as decisions: why Tailwind stays 3.4; no new SaaS for measurement; font hosting judged on perf; why git deps.
