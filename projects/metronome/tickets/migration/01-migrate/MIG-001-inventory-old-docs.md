# MIG-001 — Inventory the old docs

- Type: verification
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: None
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

A map of every old doc, so later tickets read only the rows they need.

## Work

Write `jrg/tickets/migration/inventory.md`: one row per old doc — path, lines, git-tracked or ignored, last modified, and its sections by line range with a content kind and a target home (see the kind → home table in the jrg-start migration guide). Include the memory folder as a read-only source. Flag duplicates and name the newest copy. Skim to classify; do not verify claims against code. If the inventory finds a project-specific knowledge topic not covered by an existing ticket, add a knowledge-doc ticket for it before the retire ticket.

*Subagents:* one agent per old doc (or small group of short docs), each returning only its table rows; this session merges the rows and marks duplicates.

## Acceptance criteria

- [x] `inventory.md` has a row for every old doc and the memory folder.
- [x] Every section has a content kind and target home.
- [x] Duplicates are flagged with the newest copy named.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. Wrote `jrg/tickets/migration/inventory.md` from eight parallel per-doc classification agents: 17 repo docs + the memory folder, with a duplicates table naming the newest copy of each overlapping fact. No extra knowledge-doc topics were needed (design system, paint-shell and Rock Mode fit in architecture). Found and recorded: `.claude/`, `docs/` and `CLAUDE.md` are deliberately gitignored, so retiring them into `jrg/legacy/` needs the user's confirmation; `CLAUDE.md` is treated as a reference (newest copy), not an old doc.
