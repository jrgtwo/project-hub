# MIG-002 — Import every work item into pre-migration

- Type: implementation
- Milestone: [M01 — Migrate the old docs](index.md)
- Status: done
- Depends on: [MIG-001 — Inventory the old docs](MIG-001-inventory-old-docs.md)
- Sources: [Migration](../index.md), [inventory](../inventory.md)

## Outcome

Every work item from the old docs is in the pre-migration list, so nothing is lost when they retire.

## Work

Mechanical. One entry per item in the pre-migration format, in the old doc's words, with source path, line range and old state. Do not verify, merge or judge. Duplicates across old docs become one entry listing every source.

*Subagents:* one agent per old doc, each returning its items as entries; this session merges duplicates and writes the list.

## Acceptance criteria

- [x] Every work-item row in the inventory has a pre-migration entry.
- [x] Duplicates are merged into single entries listing every source.

## Verification

Review of the written files against the acceptance criteria.

## Notes and blockers

None.

## Completion evidence

2026-10-03. Five parallel import agents (one per doc group) returned entries with merge keys; merged by key in this session into 112 entries in `jrg/tickets/pre-migration/index.md` (40 shipped, 29 queued, 28 idea, 6 parked, 6 dropped, 3 known issue), each listing every source. Ordered by old state. Not verified against code, per the ticket.
