# Brief — Accounts and progress dashboard

[Plan](plan.md) · [Decisions](decisions.md) · Initiative: [Accounts and progress dashboard](../../../tickets/accounts-dashboard/index.md)

## Intent

In the user's words (2026-10-04): "adding user auth and building a user dashboard so the users can track their progress when using the metronome, mainly for the training mode".

So: people can sign in, and a dashboard shows their progress over time. The tempo trainer is the main thing tracked; general metronome use is secondary.

## Sources

- The user's request, 2026-10-04 (above).
- The metronome code at `github.com/jrgtwo/metronome`, surveyed 2026-10-04. Paths below are relative to the repo root.
- `@fretwork/lib` as installed (`#v0.2.0`, lockfile commit `7caa288`), under `node_modules/@fretwork/lib/dist/`.
- `guitar-tutor`'s `supabase/` folder, which holds the schema the lib's auth expects.
- Knowledge docs: [product](../../product.md), [architecture](../../architecture.md), [technical](../../technical.md), [launch](../../launch.md).
- Background only, unverified: pre-migration entries "Cloud-synced settings", "Bar counter / practice timer" and "Remove ads purchase" in [pre-migration](../../../tickets/pre-migration/index.md).

## What exists today

**The tempo trainer has no notion of a session and records nothing.**
- **Config:** target, step and bar interval, with defaults 140 / 5 / 4 (`src/tempoTrainer.ts:15-38`). The trainer counts as armed while `enabled` is true.
- **Ramping:** happens in `driver.onMeasure` while the trainer is armed and the metronome is running (`src/tempoTrainer.ts:237-265`).
- **Events a recorder could hook into:**
  - arm and disarm (`setEnabled`, `:200-207`)
  - play start, which resets the bar count (`:233-236`)
  - each tempo bump (`:254-256`)
  - target reached, which fires once (`:257-261`)
  - a manual tempo change, which re-bases the ramp but doesn't disarm (`:220-226`)
  - stop, which is visible only through `isRunning` (`:273-276`)
- **Starting tempo:** only Rock Mode captures it, on its idle→launch transition (`src/rockMode.ts:165-169`).
- **Rock Mode acts:** idle → launch → climb → victory → done. Victory holds 3.5 s, and done disarms the trainer (`src/rockMode.ts:14, 20, 175-177`).
- **Nothing is recorded:** no timestamps, durations or history anywhere in `src/`.

**Plain metronome use isn't tracked either.** Play and stop go through `useMetronome()` (`src/MetronomeApp.tsx:53, 71-72`). Vercel Analytics is mounted but sends no custom events (`src/main.tsx:31-32`).

**All state lives in the browser.**
- **localStorage:** `metronomnom.settings` and `metronomnom.trainer` (each `{v, …}`, saved 300 ms after a change), plus theme, centerpiece and deck.
- **URL:** `src/urlState.ts` mirrors settings and the armed trainer into the query string, and the URL wins over saved values.
- **Version field:** `v` is written but never read, so nothing migrates stored data (`src/settings.ts:118-138`, `src/tempoTrainer.ts:69-85`).
- **Calibration:** the lib stores it per output device (`fretwork:audio-cal:<device>`).

**There is no backend.** No `api/`, no `vercel.json`, no `.env*`, no database and no network calls in `src/`. The app deploys to Vercel with the Vite preset.

**It's a single screen with no router.** About and Calibrate are boolean-state overlays (`src/MetronomeApp.tsx:67-68, 218-225`). `index.html` is built around `/`:
- canonical URL and `og:url` (`:24, 29`)
- a JSON-LD WebApplication (`:53-65`)
- an FAQ JSON-LD that must mirror `#about-content`, with one answer saying **"no sign-up"** (`:79`)
- a build-time paint-shell snapshot of the single screen

`public/sitemap.xml` lists only `/`.

**There is no identity code in the app.** adkit's `entitlementStore` is a dormant localStorage string set, and nothing grants `removeAds` (`src/main.tsx:19-25`).

**The fretwork lib already ships Supabase auth, which metronome doesn't use.**
- **Sign-in:** Google OAuth only (`auth/useAuth.js:148-149`).
- **Store:** `useAuthStore` with statuses idle, loading, signed-out, needs-profile and signed-in.
- **Config:** it reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- **Profile:** it expects a `profiles` row with music fields (instruments, skill level). A missing row puts the user in `needs-profile`.
- **Schema:** it lives in guitar-tutor's Supabase project (`supabase/migrations/0001…0011`), not in the lib.
- **Cloud sync:** `useCloudSync` is hard-wired to fretboard patterns and voices, so practice data would need its own tables.
- **Tiers:** `TIERS` / `canCreate` gate fretboard content only.
- **Version note:** the sibling lib checkout is 29 commits ahead (tags up to v0.5.1), but nothing in auth, cloud or subscription changed since v0.2.0.

**Privacy.** There is no privacy policy, terms page or consent handling. Google Analytics, Vercel Analytics and Speed Insights load unconditionally (`index.html:8-16`, `src/main.tsx:31-32`).

**Platform.** The app is browser-only today. The only native seam is the latency provider (`src/calibration/nativeLatency.ts`).

## Constraints

- **No Supabase** (user, 2026-10-04): "we cant use supabase, im out of free accounts". This also rules out the lib's auth (`useAuthStore`, `useCloudSync`), which is Supabase-only.
- **A free tier.** The user named Neon and Firebase as candidates and is open to other free services (2026-10-04). Which one is a draft-pass question. `typing-tutor` in the same projects folder already uses Neon (its `.env.example` lists `VITE_NEON_AUTH_URL` and `DATABASE_URL`).

These are questions for the draft pass, not constraints:
- which backend and auth service, among free options
- whether signing in is optional
- what "progress" means
- whether practice works logged out
- privacy

## Size

Proposed: **large**. It adds the app's first backend, identity, a stored data model, a second screen and a privacy surface, and several product choices are open. All plan passes apply. Confirmed by the user: large (2026-10-04).
