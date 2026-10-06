# MIG-004 — Write the architecture knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/architecture.md` holds the current, code-checked version of every architecture fact from the old docs.

## Work

1. Read only the inventory rows mapped to `architecture.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/architecture.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/architecture.md`. Corrections found against code:
- `TempoTrainerControl.tsx` gone; settings are `TrainerBar.tsx` rendered between transport and deck when trainer on and Rock Mode idle (`MetronomeApp.tsx:184-196`); `TrainerButton` in the transport row.
- Trainer holds at target and stays on; manual change re-bases; target ≤ current holds and Rock Mode doesn't start (`tempoTrainer.ts`, `rockMode.ts:46-48, 82`).
- URL carries `tr=1` while trainer on (`urlState.ts`).
- No `<AdSlot>` rendered anywhere; `ads.config.ts` still configures a footer slot.
- Rock keyframes live in `tailwind.config.ts:121-175`, not `index.css`.
- Tap-to-enlarge mascot gone; `TempoReadout`'s `compact` prop is unused.
- Mascot runs on a beat clock re-anchored per beat, not `currentSubdivisionIndex` (`Mascot.tsx:200-230`).
- No lib stylesheet / `--pearl` / `VolumeControl` / `.metro-range`.
- `--mint` is defined but unused in `src/`.
- `main.tsx` also mounts Vercel `<Analytics/>` and `<SpeedInsights/>`.
