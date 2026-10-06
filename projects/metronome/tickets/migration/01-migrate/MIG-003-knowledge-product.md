# MIG-003 — Write the product knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/product.md` holds the current, code-checked version of every product fact from the old docs.

## Work

1. Read only the inventory rows mapped to `product.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/product.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/product.md`. Corrections found against code:
- Manual tempo change re-bases the trainer ramp; it no longer disarms (`src/tempoTrainer.ts:136-138, 207-218`). Old docs and CLAUDE.md say it disarms.
- Reaching the target holds and stays on (`tempoTrainer.ts:5-7, 254-258`); only Rock Mode's end-of-show / Exit turn it off (`rockMode.ts:175-177`, `MetronomeApp.tsx:259-262`).
- Target ≤ current BPM holds, no silent disarm (`tempoTrainer.ts:236-238`).
- Trainer is a `TrainerButton` beside Play + `TrainerBar`, not a deck row; `TempoTrainerControl.tsx` is gone.
- Trainer on/off is in the URL (`tr=1`, `urlState.ts:7-12, 48-52, 177-180`), not localStorage-only.
- Transport row is Mute · Play · Trainer.
- Analytics also include `@vercel/speed-insights`.
- `src/ads.config.ts` comments are stale (footer slot, "privacy-first").
