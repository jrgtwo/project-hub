# ACC-001 — Write the brief

- Type: plan
- Milestone: [M00 — Plan](index.md)
- Status: done
- Depends on: None
- Sources: [brief](../../../knowledge/plans/accounts-dashboard/brief.md), [product](../../../knowledge/product.md), [architecture](../../../knowledge/architecture.md), [technical](../../../knowledge/technical.md), [launch](../../../knowledge/launch.md)

## Outcome

The brief records what the user wants from accounts and the progress dashboard, what exists in the app today that this touches, the user's stated constraints, and a size proposal, so the draft pass starts from facts rather than guesses.

## Work

- Intent in the user's words, with the date.
- Survey the code for what this touches: the tempo trainer, settings and local persistence, the app's lack of a backend, hosting on Vercel, the ads entitlement seam, routing (the app is single-screen).
- Constraints only as the user states them; anything unstated is a question for the draft pass.
- End with a size proposal and its reason.

Excluded: choosing an auth provider, a backend or a data model. Those are draft-pass choices.

## Acceptance criteria

- [x] `brief.md` has Intent, Sources, What exists today, Constraints and Size filled in.
- [x] Every "what exists today" claim cites a file in the repo.
- [x] The user has seen the size proposal.

## Verification

The user reviews the brief.

## Notes and blockers

None.

## Completion evidence

2026-10-04. Wrote [brief.md](../../../knowledge/plans/accounts-dashboard/brief.md) from three parallel code surveys (trainer and persistence; hosting and app shell; the lib's auth and sync). The user added the constraints "no Supabase" and "a free tier (Neon, Firebase or other)", and confirmed the size: large.
