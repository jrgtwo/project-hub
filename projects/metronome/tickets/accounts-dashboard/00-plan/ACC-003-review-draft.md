# ACC-003 — Review the draft

- Type: plan
- Milestone: [M00 — Plan](index.md)
- Status: in_progress
- Depends on: [ACC-002 — Draft the plan](ACC-002-draft-plan.md)
- Sources: [brief](../../../knowledge/plans/accounts-dashboard/brief.md), [plan](../../../knowledge/plans/accounts-dashboard/plan.md), [decisions](../../../knowledge/plans/accounts-dashboard/decisions.md)

## Outcome

Independent reviewers check draft 1 against the brief and the metronome code for gaps, contradictions, wrong assumptions and missing decisions; their findings become fixes to the draft or new questions in the register.

## Work

- Two independent reviews: one against the code (hook points, persistence, build and routing), one against the brief and the backend facts (Neon Auth, Data API, row-level security, free-tier limits).
- Fold the findings into `plan.md` or `decisions.md`.

Excluded: answering the open questions.

## Acceptance criteria

- [ ] Every finding is either fixed in the draft, added as a question, or rejected with a reason in the completion evidence.
- [ ] The user has seen a short summary of the findings.

## Verification

The reviewers' findings and their disposition, recorded in the completion evidence.

## Notes and blockers

Next: fold both reviews' findings below into `plan.md` / `decisions.md`, then show the user a short summary. Paused at the user's request, 2026-10-04; both reviews are in.

**Code review findings (2026-10-04), not yet folded in:**

1. High: a run's start can't hook `onStart`. Arming while already playing starts Rock Mode without it (`rockMode.ts:81-82,165`; `MetronomeApp.tsx:56`; `tempoTrainer.ts:233`). Start on "armed && running" becoming true. Arming at or above target is not a run (default).
2. High: `useUrlState` rebuilds the query from known keys only and calls `replaceState` 300 ms after mount (`urlState.ts:116-137`). That wipes Neon Auth's `?neon_auth_session_verifier=`. The callback URL must also carry `?bpm…&tr=1` through the round trip.
3. High: the end of a run is undefined. After victory, `done` disarms but the click keeps playing; stop inside the show stays armed (`rockMode.ts:175-177`, `MetronomeApp.tsx:249-254`); closing the tab mid-run ends nothing. Default: flush on `pagehide`/`visibilitychange`; decide whether post-victory play is a free session.
4. Medium (user question): a manual tempo jump can trigger victory (`rockMode.ts:87`) and fake `max_bpm` and `reached_target`. Do manual changes or meter changes invalidate a run's best?
5. Medium: `startBpm` is Rock Mode state driving `rampStart`, `beatsElapsed` and the reset (`rockMode.ts:144-145,179`). Keep Rock's copy; the recorder subscribes to the same edge.
6. Medium: the "Vercel Hobby non-commercial" argument against typing-tutor's setup applies to current hosting too. Drop it or raise hosting separately. Typing-tutor has no RLS and no Data API, so the client-only path is new, not proven.
7. Medium: account deletion from the client may need server code. Verify Better Auth `deleteUser` in Neon Auth.
8. Medium: second route. The SPA fallback serves `/`'s skeleton, canonical, JSON-LD and `#about-content` on `/progress`; `main.tsx:4` always loads Tone; the sign-in UI needs an `/auth/*` route too. Settle: noindex, sitemap, skeleton, router vs pathname switch, the `vercel.json` rewrite.
9. Medium: `gen-skeleton.mjs` waits for `networkidle` (`:28-33`) and runs on every `src/` commit. Default: auth is a no-op without `VITE_NEON_AUTH_URL`; the snapshot shows the signed-out pose.
10. Medium (user questions): a local-only dashboard for signed-out visitors? On a shared device, whose account gets queued anonymous sessions? The queue on sign-out? A cap on local history?
11. Low: StrictMode double effects (`main.tsx:28`). Default: client UUID primary key with ignore-duplicates upsert; the recorder lives in driver callbacks and refs.
12. Low: no test or mock strategy. Default: pure recorder reducer tests, with the Data API behind an injectable port. `VITE_*` vars are baked at build time per Vercel environment; preview origins need allowing for OAuth.
13. Low: arming restored from saved state or `tr=1` at load must not count as a start.

**Backend-docs review findings (2026-10-04, Neon docs fetched that day; Neon Auth is now "Managed Better Auth"), not yet folded in:**

1. High: Safari and third-party cookies. The session is an HttpOnly `__Secure-neonauth.session_token` cookie, `SameSite=None`, on the Neon Auth host (https://neon.com/docs/auth/authentication-flow). From metronomnom.com that cookie is third-party, so Safari/iOS may block it. Neon's cross-subdomain cookie option applies only within one parent domain. Make a spike the first Accounts item: sign in with Google, reload, and check the session holds on iOS and desktop Safari.
2. High: account deletion. Better Auth's `deleteUser` is off by default and enabled server-side. Google-only users need a sign-in from the last day or a verification email (https://www.better-auth.com/docs/concepts/users-accounts). Neon's user-management page lists deletion but has no content for it, and Neon's client rejects extra plugins. Spike it; tables reference `neon_auth.user` `ON DELETE CASCADE`; keep a fallback (an email request, or a Neon Function).
3. Medium: the free plan now includes Neon Functions (1M invocations, https://neon.com/pricing), so a small server is possible without Vercel. The Vercel Hobby non-commercial point applies to current hosting too (the hosting plan wasn't checked). Reword Q1, and list Neon Functions as the fallback for 1 and 2.
4. Medium: production Google sign-in needs our own Google OAuth client and consent screen; otherwise the shared credentials show Neon's branding. The redirect URI is `{NEON_AUTH_BASE_URL}/callback/google`. It's per Neon branch (https://neon.com/docs/auth/guides/setup-oauth). Needs its own ticket.
5. Medium: trusted domains. "Allow Localhost" is on by default and should be off in production. Wildcards like `https://*.x.vercel.app` are accepted (https://neon.com/docs/auth/guides/configure-domains, https://neon.com/docs/auth/production-checklist). Data API CORS defaults to any origin. Decide whether previews use a Neon branch or production.
6. Medium: client versions. `@neondatabase/neon-js` is at `0.7.0-beta` (2026-08-11) and `@neondatabase/auth` at `0.5.0-beta`; both are beta. The 0.7 API is `createClient({ dataApi: { url, getToken } })`. Typing-tutor's 0.4 setup is out of date.
7. Low: the Data API sends `Authorization: Bearer <JWT>` from `authClient.token()`, runs as role `authenticated`, and `auth.user_id()` is correct (https://neon.com/docs/data-api/access-control). Access is GRANTs plus RLS only; run Neon's Data API advisors.
8. Low: limits to add: 100 CU-hours a month per project, 5 GB egress per project, 1 GB storage per project (over the limit, writes are blocked) (https://neon.com/docs/introduction/plans). A sleeping database wakes on request, so drop "database asleep" as a reason for the queue.
9. Low: magic link through Neon's built-in email is rate-limited and meant for testing; production needs custom SMTP.
10. Low: add Appwrite's 90-day deletion of paused projects. Convex's 1 GB is function↔database traffic, and Convex accepts third-party auth.

New user question from this review: if the Safari spike fails, which is acceptable — a small server endpoint (a Neon Function or Vercel), a different auth provider, or Safari users signing in again on each visit?

## Completion evidence

Not completed.
