# Plan — Accounts and progress dashboard

[Brief](brief.md) · [Decisions](decisions.md)

Status of every choice below: **confirmed** (the user said so), **proposed** (a recommendation awaiting a yes), **open** (a question in the register).

Draft 1, 2026-10-04.

## Outcome

- A visitor can still use the metronome exactly as today, with no account.
- They can sign in, and from then on their practice is saved to their account.
- A dashboard shows their progress over time, centred on tempo-trainer runs: where they started, how far they climbed, whether they reached the target, and how that changes week to week.

## Approach

### Backend and sign-in

- **No Supabase. Free tier only.** *Confirmed* (brief, Constraints).
- **Service: Neon.** *Open*: [Q1](decisions.md#q1--which-free-service-should-hold-accounts-and-practice-data). Proposed answer: Neon Postgres + Neon Auth + the Neon Data API.
  - The browser talks to the database directly, and Postgres row-level security limits each user to their own rows. That keeps the app client-only, with no server functions, just as today.
  - The free tier covers 60k monthly users and 100 projects. Going over a limit suspends the database until the month ends; it never bills by surprise.
  - Costs: the database sleeps after 5 minutes idle, so the first request after a pause is slower. Neon Auth's browser library is still a beta (`@neondatabase/neon-js@0.4.0-beta` in typing-tutor).
- **Alternatives compared (2026-10-04):**
  - **Firebase.** Mature, with built-in offline support and Apple sign-in. But the free plan sends only 5 magic-link emails a day, the database is proprietary NoSQL, and its 50k-reads-a-day cap shapes the dashboard design.
  - **Convex.** Client-only, but its own auth is still beta, it has 1 GB of bandwidth a month, and the lock-in is high.
  - **Turso and Cloudflare D1.** Both need a server layer.
  - **Appwrite.** Free projects pause after 7 days without development activity.
  - **InstantDB.** Shutting down.
  - **Typing-tutor's own setup** is Neon Auth plus Vercel functions over Neon. It's proven, but it adds server code. Vercel's Hobby plan is also non-commercial, and this app shows ads.
- **New Neon project for metronome, not shared with typing-tutor.** *Proposed*, settled by default: the free tier allows 100 projects, and separate projects keep users and data apart.
- **Sign-in methods.** *Open*: [Q2](decisions.md#q2--how-should-people-sign-in). Proposed answer: Google only for the first release, as in typing-tutor. Magic link needs an email provider. Apple needs a $99/yr developer account.
- **Patterns to reuse from typing-tutor:** the auth client setup, session handling and profile-on-first-request. *Proposed*.
  - The parts that verify tokens on a server don't apply if Q1 lands on the Data API.
  - The code is copied and adapted, not shared as a package.

### What a practice session is and how it's recorded

- **One trainer run is the main thing recorded.** *Proposed*, settled by default. It starts at play while the trainer is armed, and ends at stop, at disarm, or when Rock Mode finishes its victory act. It records:
  - start and end time, and duration
  - starting BPM, target, step and bar interval
  - highest BPM held, and whether the target was reached
  - number of tempo bumps and manual tempo changes
  - time signature and feel

  Hook points: `src/tempoTrainer.ts` (`onStart`, the bump at `:254-256`, `fireCue` at `:257-261`, `handleUserBpm` at `:220-226`), stop through `isRunning`, and Rock Mode's acts. `startBpm` moves out of Rock Mode into the recorder, so both read it from one place.
- **Plain metronome use.** *Open*: [Q4](decisions.md#q4--what-should-the-dashboard-show). Proposed answer: record practice time per session (start, end, BPM range, time signature) as a secondary series.
- **Short runs are ignored.** *Proposed*, settled by default: anything under 30 seconds of play is not recorded, so a stray tap of Play doesn't add noise.
- **Recording works without sign-in.** *Open*: [Q3](decisions.md#q3--what-happens-to-practice-before-someone-signs-in). Proposed answer:
  - Every session is recorded on the device always.
  - Recorded sessions upload when the user signs in, and later ones upload as they finish.
  - A session that can't upload (offline, database asleep) waits in a local queue.
  - Mechanism, settled by default: an IndexedDB or localStorage queue keyed by a session id, so uploads are idempotent.

### Data

- **Tables.** *Proposed*. Two tables, each with an owner policy so a user can read and write only their own rows (`user_id = auth.user_id()`):
  - `practice_sessions`: id, user_id, kind (`trainer` or `free`), started_at, ended_at, duration_ms, start_bpm, end_bpm, max_bpm, target_bpm, step, interval_bars, reached_target, bumps, manual_changes, time_signature, feel, and a metadata jsonb.
  - `profiles`: user_id and preferences jsonb.

  The shape follows typing-tutor's `sessions` table.
- **Schema lives in the metronome repo.** *Proposed*. Migrations go in `db/migrations/` and run with a script like typing-tutor's `scripts/db-migrate.sh`.
- **Settings don't sync.** *Proposed*. Synced tempo and trainer settings and calibration are out of scope (see Out of scope).

### Dashboard

- **What it shows.** *Open*: [Q4](decisions.md#q4--what-should-the-dashboard-show). Proposed answer:
  - a chart of trainer runs over time (start BPM and highest BPM held per run)
  - personal bests per time signature
  - targets reached
  - practice time per week
  - a list of recent sessions
- **Where it lives.** *Open*: [Q5](decisions.md#q5--where-does-the-dashboard-live). Proposed answer: its own page at `/progress`, reached from an account button on the main screen.
  - That brings in the app's first route, and the build needs to handle it in three places: the paint-shell skeleton, which covers `/` only; `vercel.json`, which needs a fallback to the app for routes other than `/`; and `index.html`'s canonical URL.
- **Charts.** *Proposed*, settled by default: hand-drawn SVG built from the app's own design tokens, with no chart library, because the app owns its whole design system. Reconsider if the charts grow.

### Privacy and the public promise

- **Update the "no sign-up" FAQ.** *Proposed*. The FAQ's "no sign-up" answer (`index.html:79`, mirrored in `#about-content`) changes to "sign-up optional, only to save progress".
- **Add a privacy page.** *Proposed*. It's required once accounts exist. It says what is stored (Google profile basics, practice sessions) and lists the analytics already running (Google Analytics, Vercel).
- **Account deletion.** *Proposed*: an in-app "delete my account and data" action in the first release.
- **Cookie consent for the existing Google Analytics** is out of scope, but it's recorded as found (see Out of scope).

## Milestones

Rough order. Each becomes a build milestone when the plan is cut into tickets.

1. **Accounts:** the Neon project and schema, sign-in and sign-out in the app, the account button, account deletion, the privacy page and the FAQ change.
2. **Practice recording:** the session recorder hooked to the trainer and playback, the local queue, and upload on sign-in and on finish.
3. **Progress dashboard:** the `/progress` page (routing, build fallback, skeleton), the stats and charts, and the empty state for new users.
4. **Fold the plan into the knowledge docs.**

## Out of scope

- **Syncing settings across devices** (tempo, trainer config, theme, calibration). That's the pre-migration idea "Cloud-synced settings". Calibration is per device anyway.
- **Paid tiers and the "remove ads" purchase.**
- **Apple sign-in and a native app.**
- **Social features, sharing and leaderboards.**
- **Cookie or consent handling** for the existing Google Analytics. It's a gap that already exists, recorded here because adding accounts makes it more visible.
- **Upgrading `@fretwork/lib`.** Its auth is Supabase-only and isn't used.
