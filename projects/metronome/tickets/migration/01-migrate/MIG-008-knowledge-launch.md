# MIG-008 — Write the launch knowledge doc

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

`jrg/knowledge/launch.md` holds the current, code-checked version of every launch fact from the old docs.

## Work

1. Read only the inventory rows mapped to `launch.md`.
2. Write the doc from the newest copy of each fact.
3. Check every factual claim against the code; fix stale claims and list each fix in the completion evidence.
4. Show the user the finished outline and the list of corrections, once, for review.

*Subagents:* one agent drafts from the sources; agents check its claims against the code. Runs in parallel with the other knowledge-doc tickets; reviews happen one doc at a time.

## Acceptance criteria

- [x] `jrg/knowledge/launch.md` exists, built from the newest copies.
- [x] Every factual claim was checked against the code; corrections listed.
- [x] The user reviewed the outline and corrections.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. User approved. Wrote `jrg/knowledge/launch.md`. Corrections found against code:
- Measurement also includes Vercel Speed Insights (`src/main.tsx:9,32`).
- No `<AdSlot>` renders anywhere; showing an ad needs the slot re-added plus a real href/cta (memory said "just give the footer house-ad a real href").
- FlexOffers rationale rewritten without "privacy-first brand".
- About opens from the bottom of the expanded control deck (`ControlDeck.tsx:98`), not a footer button.
- Stale code comments: `src/ads.config.ts:8` ("no public URLs yet"), `src/main.tsx:20`.
Unverifiable: Vercel hosting (no vercel.json), launch not yet run, Search Console status (no meta tag; could be DNS).
