# ACC-002 — Draft the plan

- Type: plan
- Milestone: [M00 — Plan](index.md)
- Status: done
- Depends on: [ACC-001 — Write the brief](ACC-001-write-brief.md)
- Sources: [brief](../../../knowledge/plans/accounts-dashboard/brief.md), [plan](../../../knowledge/plans/accounts-dashboard/plan.md), [decisions](../../../knowledge/plans/accounts-dashboard/decisions.md)

## Outcome

A first `plan.md`: the path forward by area, milestones in rough order, and every choice tagged confirmed, proposed or open, with each open choice registered as a question in `decisions.md`.

## Work

- Compare free backend and auth services that fit the brief's constraints (no Supabase; free tier; Neon and Firebase named), and record the comparison in the plan.
- Draft the approach for each area: identity, what a practice session is and how it is recorded, storage, sync and logged-out behaviour, the dashboard screen, privacy and the FAQ promise of "no sign-up".
- Register every open choice in `decisions.md` with the build work it blocks.

Excluded: answering the questions (a later pass) and cutting build tickets.

## Acceptance criteria

- [x] `plan.md` has Outcome, Approach, Milestones and Out of scope, with every choice tagged.
- [x] Every open choice has an entry in `decisions.md`.
- [x] The backend comparison covers at least Neon and Firebase, plus any other free option that fits.

## Verification

The review pass checks the draft against the brief and the code.

## Notes and blockers

None.

## Completion evidence

2026-10-04. Wrote draft 1 of [plan.md](../../../knowledge/plans/accounts-dashboard/plan.md) and registered 5 open questions in [decisions.md](../../../knowledge/plans/accounts-dashboard/decisions.md): the backend service, sign-in methods, signed-out recording, dashboard content, dashboard placement. Inputs: a free-tier comparison of Neon, Firebase, Clerk, Turso, Cloudflare D1, PocketBase, Appwrite, Convex and InstantDB (vendor pages, 2026-10-04, sources in the research hand-back), and a survey of typing-tutor's Neon Auth setup.
