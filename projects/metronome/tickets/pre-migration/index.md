# Pre-migration

[Tickets](../index.md) · [Workflow](../workflow.md#holding-lists)

- **What:** every work item imported, unverified, from the docs this workflow replaced — shipped work, queues, ideas, known issues, parked items.
- **Add when:** only during migration. Nothing new is added here afterwards.
- **Remove when:** groomed — moved to history, a ticket, the backlog or deferred, or dropped. When this list is empty, delete the folder and its row in the tickets index.
- **Last groomed:** never.

Entry format:

```markdown
## <one line naming the item, in the old doc's words>

- From: `<old path>` lines <a–b> (now in `jrg/legacy/`)
- Old state: shipped | in progress | queued | idea | parked | known issue | dropped
- Imported: <date>

<The item as the old doc described it, condensed to two or three lines. Not checked against the code.>
```

Entries are ordered by old state: queued and parked work first, then known issues, ideas, shipped history, dropped. Old item IDs (`FT-7`, `CQ-4`, …) are kept in headings because they are how the old docs cross-reference each other.

## FlexOffers affiliate: verify the site, await approval, then wire the affiliate link

- From:
  - `memory/ads-flexoffers.md` lines 10–27 (memory folder; not moved)
  - `.claude/working-docs/current-status.md` lines 109
  - `docs/STATUS.md` lines 140–146, 169–176
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

Signed up 2026-06-26; `fo-verify` meta tag added to `index.html`; after redeploy, click "Verify Website". Approval expected ~2026-06-30. Once approved, set the house-ad `href`/`cta` in `src/ads.config.ts`. (Memory says in progress; the status docs say parked. The footer ad slot was later removed in the single-screen redesign.)

## Commit the session's work; redeploy so the fo-verify tag goes live

- From: `docs/STATUS.md` lines 182 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Open follow-up for the user from the 2026-06-26 session.

## SEO-12 — Google Search Console: verify domain + submit sitemap

- From:
  - `.claude/working-docs/prioritized-work.md` lines 69
  - `docs/improvement-roadmap.md` lines 82, 106
  - `.claude/working-docs/current-tasks.md` lines 5–6
  - `.claude/working-docs/current-status.md` lines 65–66, 108–109
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 68–69
  - `docs/app-launch-runbook.md` lines 78
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Search Console via DNS/HTML verification, then submit `sitemap.xml` — the organic-search surface (impressions/clicks/queries). P1, the only remaining P1. The traffic spec's Phase 0 absorbs it; the runbook's measure loop lists it.

## SEO P0 cluster is the recommended next task

- From: `.claude/working-docs/memory.md` lines 23–24 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Triage call (2026-06-26): the SEO P0 cluster is the recommended next task.

## Verify domain availability for metronomnom.com before purchase

- From: `docs/branding-naming.md` lines 10–18 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

`metronomnom.com` is canonical. "Availability was **not** checked — verify at a registrar before purchase."

## Register metro-nomnom.com and metro-nom-nom.com as redirects

- From:
  - `docs/branding-naming.md` lines 15–16
  - `memory/app-name-metronomnom.md` lines 10 (memory folder; not moved)
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Register both as redirects to canonical metronomnom.com; availability not verified.

## Readiness gate: one-line value prop a stranger understands in 5s

- From: `docs/app-launch-runbook.md` lines 21 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked box in the runbook's §1 readiness gate: one-line value prop a stranger understands in 5s.

## Readiness gate: landing converts visitor to *user*

- From: `docs/app-launch-runbook.md` lines 22 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked box in the runbook's §1 readiness gate: landing converts visitor to *user* (core action obvious + immediate).

## Readiness gate: Share/OG + Twitter card render

- From: `docs/app-launch-runbook.md` lines 23 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked box in the runbook's §1 readiness gate: Share/OG + Twitter card render (test the URL in a debugger).

## Readiness gate: `robots.txt` + `sitemap.xml` present; analytics installed and firing

- From: `docs/app-launch-runbook.md` lines 24 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked box in the runbook's §1 readiness gate: `robots.txt` + `sitemap.xml` present; analytics installed and firing.

## Readiness gate: no obvious "why would I use this over X" gap you can't answer

- From: `docs/app-launch-runbook.md` lines 25 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked box in the runbook's §1 readiness gate: no obvious "why would I use this over X" gap you can't answer.

## Template pack: launch-day checklist

- From: `docs/app-launch-runbook.md` lines 83 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked §6 box: launch-day checklist.

## Template pack: post templates (Show HN / Product Hunt / subreddit)

- From: `docs/app-launch-runbook.md` lines 84 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked §6 box: post templates, per-community tone.

## Template pack: outreach email template + tracker

- From: `docs/app-launch-runbook.md` lines 85 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked §6 box: outreach email template + tracker (target · contact · status · result).

## Template pack: asset checklist (OG image, demo GIF/video, copy)

- From: `docs/app-launch-runbook.md` lines 86 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked §6 box: OG image (1200×630), demo GIF/video, one-liner + short/long copy.

## Template pack: channel-scoring sheet

- From: `docs/app-launch-runbook.md` lines 87 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Unchecked §6 box: channel-scoring sheet for the §3 selection scorer.

## Experiment log template

- From:
  - `docs/app-launch-runbook.md` lines 88–89
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 70–76
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

One entry per channel/experiment: `name · what · proves · effort · cost · time-to-signal · metric · keep/kill · reusable output`. The traffic spec put it under `docs/growth/experiments/` with a scored rollup; its Phase 0 is done when UTM table, GA attribution, Search Console and this template exist.

## UTM convention for inbound links

- From:
  - `docs/app-launch-runbook.md` lines 72–74
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 61–64
  - `memory/project-is-launch-proving-ground.md` lines 17–18 (memory folder; not moved)
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Canonical `utm_source=<channel>&utm_medium=<type>&utm_campaign=<slug>` strings per channel, lowercase, so GA reports don't fragment. Optional 5-line `campaignUrl()` helper. Listed as a reusable deliverable.

## Traffic Phase 0: source view ("where to look" note)

- From: `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 65–67 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Confirm GA4 Traffic-acquisition attributes sources correctly; write a one-page note on which report and metric to read.

## Score and run candidate channels for metronomnom (runbook test case #1)

- From: `docs/app-launch-runbook.md` lines 98–104 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Runbook drafted, not yet executed. Channels to be scored with the §3 scorer; Learnings empty; retro (§7) after launch.

## Coordinated launch spike: Product Hunt, Show HN, r/InternetIsBeautiful, r/SideProject

- From:
  - `docs/app-launch-runbook.md` lines 102–103
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 93–95
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Candidate first move for eyes + backlinks, led by the mascot's charm rather than features. Reusable output: launch checklist and asset kit. Runbook: "to be scored + run"; traffic spec: Phase 1 idea.

## Localization for compounding low-competition SEO

- From: `docs/app-launch-runbook.md` lines 102–103 (now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

Candidate first move in the runbook's test-case log; to be scored + run.

## FT-3 — Build-your-own time signature (groupings, per-beat accents)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 79
  - `docs/improvement-roadmap.md` lines 52, 110, 140–141
  - `docs/feature-ideas.md` lines 72–73
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P2; needs a design pass and maybe lib work. Reframed in the roadmap walkthrough; subsumes tap-to-edit accents.

## FT-6 — Count-in / pre-roll

- From:
  - `.claude/working-docs/prioritized-work.md` lines 80
  - `docs/improvement-roadmap.md` lines 55, 63, 110
  - `docs/feature-ideas.md` lines 54–56
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P2. The roadmap says cleanest via the lib; feature-ideas says doable app-side.

## FT-10 — Selectable click voices

- From:
  - `.claude/working-docs/prioritized-work.md` lines 87
  - `docs/improvement-roadmap.md` lines 59, 63, 110
  - `docs/feature-ideas.md` lines 66–68
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P2, via the lib's `setSounds`; a lib change.

## FT-4 — Screen wake lock

- From:
  - `.claude/working-docs/prioritized-work.md` lines 102
  - `docs/improvement-roadmap.md` lines 53, 114
  - `docs/feature-ideas.md` lines 48–49
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P3, app-only.

## FT-9 — Accessible silent practice (vibrate, flash, aria-live)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 103
  - `docs/improvement-roadmap.md` lines 58, 114
  - `docs/feature-ideas.md` lines 59–60
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P3.

## CQ-1 — Self-host fonts

- From:
  - `.claude/working-docs/prioritized-work.md` lines 94
  - `docs/improvement-roadmap.md` lines 17, 28, 113, 133–134
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P3, judged on performance only (the privacy rationale was struck).

## CQ-11 — Observe prefers-reduced-motion changes in Mascot.tsx

- From:
  - `.claude/working-docs/prioritized-work.md` lines 100
  - `docs/improvement-roadmap.md` lines 38, 113
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P3.

## CQ-13 — Stable keys on the beat-pill list

- From:
  - `.claude/working-docs/prioritized-work.md` lines 101
  - `docs/improvement-roadmap.md` lines 40, 113
  - (repo docs now in `jrg/legacy/`)
- Old state: queued
- Imported: 2026-10-03

P3, latent only.

## Defer Tone.js until first Play

- From:
  - `.claude/working-docs/current-status.md` lines 113–114
  - `docs/STATUS.md` lines 109
  - (repo docs now in `jrg/legacy/`)
- Old state: known issue
- Imported: 2026-10-03

Biggest remaining perf lever; needs a `@fretwork/lib` change because the engine is imported eagerly via `useMetronome`.

## Brief default-to-restored flash on load

- From: `.claude/working-docs/current-status.md` lines 115 (now in `jrg/legacy/`)
- Old state: known issue
- Imported: 2026-10-03

Settings have no pre-paint script (by design), so there is a brief default-to-restored flash on load.

## Keep the theme pre-paint script in sync with src/theme.ts

- From: `.claude/working-docs/memory.md` lines 45–46 (now in `jrg/legacy/`)
- Old state: known issue
- Imported: 2026-10-03

Theme is applied pre-paint by an inline script in `index.html` that mirrors `src/theme.ts`; the two must be kept in sync.

## Mascot "hula" body sway

- From:
  - `.claude/working-docs/current-tasks.md` lines 285–309
  - `.claude/working-docs/current-status.md` lines 104–106, 113
  - `docs/STATUS.md` lines 134–136
  - `docs/superpowers/specs/2026-06-26-mascot-hula-sway-design.md` lines 1–87
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

Beat-synced body sway on `MascotHero`; implemented and tested (`mascotAnim.ts`, `Mascot.tsx`) but the user is "not quite happy" with the look. To resume: re-tune amp/rhythm or rethink the motion, show options in `pnpm dev`. Spec risks: hip bulge near the pendulum pivot; phase choice is a one-line swap.

## FT-5 — Tempo markings + BPM chips

- From:
  - `.claude/working-docs/prioritized-work.md` lines 106
  - `docs/improvement-roadmap.md` lines 54, 117
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

P4 icebox.

## FT-11 — Drop-beat / gap trainer

- From:
  - `.claude/working-docs/prioritized-work.md` lines 107
  - `docs/improvement-roadmap.md` lines 60, 117
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

P4 icebox.

## SEO-10 — PWA manifest + icons

- From:
  - `.claude/working-docs/prioritized-work.md` lines 108
  - `docs/improvement-roadmap.md` lines 80, 118
  - `docs/feature-ideas.md` lines 76–77
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

P4 icebox. Feature-ideas treats PWA/offline install as one item with SEO-11.

## SEO-11 — Offline service worker (vite-plugin-pwa)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 109
  - `docs/improvement-roadmap.md` lines 81, 118
  - `docs/feature-ideas.md` lines 76–77
  - (repo docs now in `jrg/legacy/`)
- Old state: parked
- Imported: 2026-10-03

P4 icebox.

## Accent pattern editor (tap a beat dot to accent)

- From:
  - `docs/feature-ideas.md` lines 40–43
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Tap a beat dot to accent/de-accent plus an on/off toggle; "likely highest value/effort". Overlaps FT-3's accent piece.

## Click volume slider

- From:
  - `docs/feature-ideas.md` lines 44–45
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Expose `setVolume` via the shadcn `Slider`; `volume` is already persisted.

## Typed BPM entry

- From:
  - `docs/feature-ideas.md` lines 46–47
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Click `TempoReadout` to type an exact tempo.

## Reduced-motion polish for beat dots and transitions

- From: `docs/feature-ideas.md` lines 49–50 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Beat-dot pop animation and transitions ignore reduced-motion; distinct from CQ-11 (mascot).

## Bar counter / practice timer

- From: `docs/feature-ideas.md` lines 57–58 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Surface `currentMeasure` as a bar count and/or session stopwatch.

## Subdivision click toggle

- From: `docs/feature-ideas.md` lines 61–62 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Toggle for the softer subdivision voice.

## Pitched drone / tuning-note layer

- From:
  - `docs/feature-ideas.md` lines 69–71
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Via `notesVolume` / `NotesBus`; needs lib.

## Backing-groove mode

- From:
  - `docs/feature-ideas.md` lines 74–75
  - `.claude/working-docs/current-status.md` lines 65–67
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Ride `GROOVE_PRESETS` / `EventScheduler` / `PatternSource`; needs lib.

## Cloud-synced settings

- From: `docs/feature-ideas.md` lines 78–79 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

`useAuthStore` / `useCloudSync` (Supabase); needs lib.

## Rock Mode: a "frontman" mascot on the launch count-in

- From:
  - `.claude/working-docs/current-tasks.md` lines 62–63
  - `.claude/working-docs/current-status.md` lines 62–64
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Listed as open/optional for Rock Mode; logic is settled.

## Rock Mode: intensity tuning (bolt/speed-lines, mascot size/placement)

- From:
  - `.claude/working-docs/current-tasks.md` lines 62–63
  - `.claude/working-docs/current-status.md` lines 62–64
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Optional: run `pnpm dev`, arm trainer + Play, tune to taste.

## More polished mascot illustration

- From: `docs/branding-naming.md` lines 78 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Listed under "Still open".

## Mascot polish: tune X_MOUTH; swing-feel interpolation between ticks

- From: `docs/STATUS.md` lines 178–179 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Tune `X_MOUTH` if note-on-beat looks early/late; swing-feel interpolation is approximate between ticks (snaps correct on each tick).

## Open question: wordmark styling of "nomnom"

- From: `docs/branding-naming.md` lines 84–85 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

E.g. the two `o`s as chomping mouths; how obvious should the metronome read be. (The same doc also records a wordmark as resolved.)

## Open question: mascot character design and one-line personality

- From: `docs/branding-naming.md` lines 86 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

The beat-eater; the mascot concept itself was decided later in the same doc.

## Open question: palette from existing tokens or own brand colors

- From: `docs/branding-naming.md` lines 87–88 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Charcoal / amber / pearl tokens vs own brand colors; the palette was decided earlier in the same doc.

## Open question: mascot/wordmark fit with the arc beat indicator

- From: `docs/branding-naming.md` lines 89–90 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

How the mascot and wordmark play with the arc of pills over the tempo readout.

## Audience check: does playful resonate with musicians

- From: `docs/branding-naming.md` lines 37–40, 91–92 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Confirm the playful direction works for musicians, or define a more restrained variant.

## Analytics event instrumentation ("engaged" events)

- From:
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 78–85
  - `docs/app-launch-runbook.md` lines 75–77
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

A proper `src/analytics.ts` with engaged events (first play / tap / settings change via `gtag`). "Its own epic — don't shoehorn it into a launch."

## Traffic Phase 1: community seeding

- From: `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 90–92 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Helpful posts where musicians gather (r/drums, r/guitar, r/piano, r/WeAreTheMusicMakers, teacher FB groups). Output: target list + non-spammy post template.

## Traffic Phase 1: roundup / directory outreach

- From: `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 96–98 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Get listed in "best free online metronome" articles and directories. Output: outreach template + tracker.

## Traffic Phase 2: programmatic /N-bpm tempo pages

- From: `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 102–105 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Template-generated pages for long-tail queries; metric: Search Console impressions/clicks per template.

## Product-led referral: share links + embeddable widget

- From:
  - `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 106–108
  - `docs/app-launch-runbook.md` lines 50
  - `memory/project-is-launch-proving-ground.md` lines 17–19 (memory folder; not moved)
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

UTM-tagged share links (teacher → student) and an iframe widget with a backlink. Memory lists share-link/embed infra as reusable infrastructure.

## Traffic Phase 3: small paid test (Reddit or Pinterest)

- From: `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` lines 112–114 (now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

Learn paid mechanics and cost per engaged visitor, not ROI. Output: a paid-test + CAC playbook.

## Build reusable launch assets

- From: `memory/project-is-launch-proving-ground.md` lines 10–19 (memory folder; not moved)
- Old state: idea
- Imported: 2026-10-03

Purpose is learning end-to-end launching; UTM/analytics conventions, launch checklist, outreach templates, share-link/embed infra and an experiment log are first-class deliverables. Overlaps the runbook template pack.

## Treat traffic/marketing stages as experiments

- From: `memory/project-is-launch-proving-ground.md` lines 14–17 (memory folder; not moved)
- Old state: idea
- Imported: 2026-10-03

Prove stages out in order rather than "make money now".

## Switch to a real ad network later (provider swap)

- From: `memory/ads-flexoffers.md` lines 23–25 (memory folder; not moved)
- Old state: idea
- Imported: 2026-10-03

One-line provider swap to `createAdsenseProvider` / `createEthicalAdsProvider`.

## "Remove ads" purchase (removeAds entitlement)

- From:
  - `docs/STATUS.md` lines 180
  - `memory/ads-flexoffers.md` lines 25–26 (memory folder; not moved)
  - (repo docs now in `jrg/legacy/`)
- Old state: idea
- Imported: 2026-10-03

The dormant `removeAds` entitlement seam exists; no payment flow built.

## Rock Mode — the tempo trainer as a punk/glam concert takeover

- From:
  - `.claude/working-docs/current-tasks.md` lines 10–63
  - `.claude/working-docs/current-status.md` lines 31–41, 55–76
  - `docs/STATUS.md` lines 23–52
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Arming the trainer + Play runs a full-screen three-act show (count-in, climb HUD, victory) reusing the real `BeatDots` + `TempoReadout` in a spotlight pool. `RockstarMascot` (flying-V, mohawk; rAF phase-locked), `RansomText`, theme-invariant `--rk-*` palette, Anton `font-punk`. 2026-07-08→11, commits bc8483c, 3467fd5, 9ecb2d3, 4a1734c, 3d56f11; 212 tests.

## Rock Mode fixes: count-in from time signature, milestone-only flare, mascot motion via rAF

- From: `.claude/working-docs/current-tasks.md` lines 51–55 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Count-in tied to the time signature; LEVEL-UP flare only on a milestone; pendulum pivots at the base; mascot motion moved from bpm-derived CSS durations to rAF beat-phase refs so it no longer restarts on a BPM bump (3d56f11).

## FT-7 — Tempo trainer (auto-accelerate)

- From:
  - `.claude/working-docs/current-tasks.md` lines 65–134
  - `.claude/working-docs/current-status.md` lines 26–30, 78–83
  - `docs/STATUS.md` lines 8–21
  - `docs/superpowers/specs/2026-07-06-tempo-trainer-design.md` lines 1–122
  - `.claude/working-docs/prioritized-work.md` lines 81–86
  - `docs/improvement-roadmap.md` lines 56, 110
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Armed + playing: BPM rises by a step every N bars to the target, then holds and disarms with a cue (defaults 140, +5, 4 bars). Manual tempo change disarms. Config in localStorage + URL `tt/ts/ti`; `enabled` in localStorage only. 2026-07-06→07, commits 489da4c + 65508df.

## FT-7 follow-on: "+step in N bars" hint under the BPM readout

- From: `.claude/working-docs/current-tasks.md` lines 123–126 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-07. `useTempoTrainer` exposes `barsUntilNext`; `TempoReadout` renders the hint with a `ChevronsUp` icon. 160 tests.

## UI-1 — Single-screen redesign: instrument + collapsible control deck

- From:
  - `.claude/working-docs/current-tasks.md` lines 136–187
  - `.claude/working-docs/current-status.md` lines 20–25, 88–91
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-05. Scaling pulse zone (dots-arc or mascot), mute-only button beside Play (volume slider removed), docked `ControlDeck` with grab handle (Meter, Feel, Swing, About), collapse persisted and default collapsed, footer ad removed. 118 tests; commits 368a954 + 81ee8a8.

## CQ-14 — Tests for calibration state machine, theme localStorage, nativeLatency seam

- From:
  - `.claude/working-docs/current-tasks.md` lines 189–257
  - `.claude/working-docs/current-status.md` lines 91
  - `.claude/working-docs/prioritized-work.md` lines 56–62
  - `docs/improvement-roadmap.md` lines 41, 104
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-04. Test-only: `nativeLatency.test.ts`, `theme.test.ts`, `useCalibration.test.ts` (+22, total 100). The note "Remaining: user commits" is stale.

## CQ-10 — CalibrationSheet Space-keydown effect churn

- From:
  - `.claude/working-docs/current-tasks.md` lines 262–266
  - `.claude/working-docs/current-status.md` lines 91
  - `.claude/working-docs/prioritized-work.md` lines 95–99
  - `docs/improvement-roadmap.md` lines 37, 113
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-03. Destructured `{ tapRunning, registerTap }` so the effect stops re-subscribing; regression test. Commit e220ade.

## FT-12 — Bookmarkable URL state

- From:
  - `.claude/working-docs/current-tasks.md` lines 267–270
  - `.claude/working-docs/current-status.md` lines 100
  - `docs/STATUS.md` lines 81–85
  - `.claude/working-docs/prioritized-work.md` lines 88–91
  - `docs/improvement-roadmap.md` lines 61, 110
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-02. `src/urlState.ts` / `useUrlState(m)` two-way bind bpm/meter/subdivision/swing to the query string; URL wins over saved settings; defaults omitted.

## FT-2 — Tap tempo

- From:
  - `.claude/working-docs/current-tasks.md` lines 271–273
  - `.claude/working-docs/current-status.md` lines 99
  - `docs/STATUS.md` lines 77–79
  - `.claude/working-docs/prioritized-work.md` lines 66–68
  - `docs/improvement-roadmap.md` lines 51, 105
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-02. `src/tapTempo.ts` (median interval) + Tap button in `BpmControl`; Space also taps, gated while a dialog is open or a control focused.

## FT-1 — Persist settings

- From:
  - `.claude/working-docs/current-tasks.md` lines 274–275
  - `.claude/working-docs/current-status.md` lines 98
  - `docs/STATUS.md` lines 72–75
  - `.claude/working-docs/prioritized-work.md` lines 63–65
  - `docs/improvement-roadmap.md` lines 50, 105
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-07-01. bpm/meter/feel/swing/volume/mute to `localStorage['metronomnom.settings']` via `src/settings.ts` / `usePersistSettings(m)`. Accents deferred.

## CQ-4 — App owns its whole design system + shadcn/ui migration

- From:
  - `.claude/working-docs/current-tasks.md` lines 276–278
  - `.claude/working-docs/current-status.md` lines 93–97
  - `docs/STATUS.md` lines 56–70
  - `.claude/working-docs/prioritized-work.md` lines 50–55
  - `docs/improvement-roadmap.md` lines 31, 104, 135–137
  - `.claude/working-docs/memory.md` lines 22–23
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-28. Dropped lib styling; all color tokens in `index.css`, size tokens in `tailwind.config.ts`, zero hardcoded values. Full shadcn (Button, Slider, ToggleGroup, Dialog sheet); `--pearl` renamed `--beat`. Absorbed CQ-5/CQ-12, resolved CQ-8.

## SEO rework into the About modal

- From:
  - `.claude/working-docs/current-tasks.md` lines 279–280
  - `.claude/working-docs/current-status.md` lines 101
  - `docs/STATUS.md` lines 99–104
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27. Wordmark as the single h1; crawlable copy in hidden `#about-content`; About opens a shadcn Dialog; FAQPage JSON-LD single-sourced from it. Started shadcn adoption.

## Perf pass: non-blocking fonts, code-split modals, vendor chunks

- From:
  - `.claude/working-docs/current-tasks.md` lines 280–281
  - `.claude/working-docs/current-status.md` lines 101
  - `docs/STATUS.md` lines 106–109
  - `.claude/working-docs/prioritized-work.md` lines 34–38
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27, from a mobile Lighthouse (Perf 80, LCP 4.1s): non-blocking Google Fonts, `React.lazy` modals, tone/react vendor chunks. Kept both analytics.

## Auto-generated paint-shell skeleton

- From:
  - `.claude/working-docs/current-tasks.md` lines 280–281
  - `.claude/working-docs/current-status.md` lines 47–48, 101
  - `docs/STATUS.md` lines 111–117
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

`scripts/gen-skeleton.mjs` (playwright-core) snapshots `#root` into `skeleton.html`, injected at build; Husky pre-commit regenerates it. Replaced a drifting hand-written skeleton.

## CQ-2 — React.memo on beat-independent controls

- From:
  - `.claude/working-docs/current-tasks.md` lines 281
  - `.claude/working-docs/current-status.md` lines 101
  - `docs/STATUS.md` lines 119–121
  - `.claude/working-docs/prioritized-work.md` lines 18–23
  - `docs/improvement-roadmap.md` lines 29, 89
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27. Memo on beat-independent controls + AdSlot, stabilized inline `onToggle`; 0 re-renders during playback.

## CQ-3 — devicechange listener in useCalibration

- From:
  - `.claude/working-docs/current-tasks.md` lines 281
  - `.claude/working-docs/current-status.md` lines 101
  - `docs/STATUS.md` lines 121–122
  - `.claude/working-docs/prioritized-work.md` lines 24–29
  - `docs/improvement-roadmap.md` lines 30, 90, 139
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27. Calibration sheet updates live on output-device change.

## CQ-0 — ESLint 9 type-checked + Husky pre-commit

- From:
  - `.claude/working-docs/current-tasks.md` lines 281
  - `.claude/working-docs/current-status.md` lines 101
  - `docs/STATUS.md` lines 124–128
  - `.claude/working-docs/prioritized-work.md` lines 41–49
  - `docs/improvement-roadmap.md` lines 27, 104
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27. Flat config with react-hooks, jsx-a11y, react-refresh; `pnpm lint`/`lint:fix`. Folded in CQ-6, resolved CQ-7.

## CQ-6 — vitest/config defineConfig

- From:
  - `.claude/working-docs/prioritized-work.md` lines 72–73
  - `docs/improvement-roadmap.md` lines 33, 109
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Folded into CQ-0.

## CQ-7 — Mascot eslint-disable now live

- From:
  - `.claude/working-docs/prioritized-work.md` lines 74–76
  - `docs/improvement-roadmap.md` lines 34, 109
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Resolved by CQ-0.

## CQ-8 — Stale theme comments

- From:
  - `.claude/working-docs/prioritized-work.md` lines 77–78
  - `docs/improvement-roadmap.md` lines 35, 109
  - `.claude/working-docs/current-status.md` lines 96–97
  - `docs/STATUS.md` lines 69
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Resolved by CQ-4 (2026-06-28).

## Major-version upgrades: React 19, TS 6, Vite 8, Vitest 4

- From:
  - `.claude/working-docs/current-tasks.md` lines 281
  - `.claude/working-docs/current-status.md` lines 8–10, 102
  - `docs/STATUS.md` lines 130–132
  - `.claude/working-docs/prioritized-work.md` lines 34–38
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-27. React 18.3→19.2, TS 5.7→6.0 (dropped baseUrl), Vite 6→8.1, Vitest 3→4.1, plugin-react 4→6. Tailwind stays 3.4.

## SEO-1 — Keyword title and description

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 71, 91
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-2 — Canonical, Open Graph, Twitter Card

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 72, 92
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-3 — WebApplication JSON-LD

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 73, 93
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-4 — robots.txt and sitemap.xml

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 74, 94
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-5 — OG share image 1200×630

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 75, 95
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-6 — Static crawlable content (now #about-content in the About modal)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 76, 96
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-7 — FAQPage JSON-LD

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 77, 97
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## SEO-8 — Wordmark as the single h1

- From:
  - `.claude/working-docs/prioritized-work.md` lines 30–32
  - `docs/improvement-roadmap.md` lines 78, 98
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

P0, shipped 2026-06-27.

## Beat-dots arc

- From: `docs/superpowers/specs/2026-06-25-beat-arc-design.md` lines 1–82 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-25. `BeatDots` pills laid along an arc over the tempo readout so large meters/subdivisions (worst case 72 elements) stop overflowing on mobile.

## Mascot: wind-up metronome eating notes, phase-locked to the beat clock

- From:
  - `docs/STATUS.md` lines 157–167
  - `.claude/working-docs/current-status.md` lines 42–44
  - `docs/branding-naming.md` lines 66–76
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Decided 2026-06-26. `Mascot.tsx` + `mascotAnim.ts`: header mark + hero; pendulum and notes phase-locked to the engine beat clock; accumulator drift fixed; tap hero to enlarge. Pac-Man drafts rejected.

## Branding: two fun themes (light Retro 70s default, dark Warm Dark Playful)

- From:
  - `docs/branding-naming.md` lines 42–64
  - `.claude/working-docs/memory.md` lines 28–32, 37–41
  - `.claude/working-docs/current-status.md` lines 42
  - `docs/STATUS.md` lines 148–155
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

`src/theme.ts` + pre-paint script, `:root.theme-light/.theme-dark`, Fredoka display font, `Wordmark.tsx`, sun/moon `ThemeToggle`, 3D buttons, themed sliders. No "pro" theme.

## Branding resolved: wordmark, calmer palettes, control styling, readout/mascot spacing

- From: `docs/branding-naming.md` lines 54–56, 66–67 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Recorded as resolved in the branding doc.

## Name chosen: metronomnom

- From:
  - `docs/branding-naming.md` lines 5–8, 20–33
  - `.claude/working-docs/memory.md` lines 26–27
  - `memory/app-name-metronomnom.md` lines 10–14 (memory folder; not moved)
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-25: metronome + "nom nom". Rejected Metronaut, Metrognome, pendulum names, over-silly food names.

## Branding mockups explored in docs/branding-mockups/

- From:
  - `.claude/working-docs/memory.md` lines 47–49
  - `docs/branding-naming.md` lines 44–48, 69–71
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Tone, palette and mascot concepts as self-contained HTML mockups.

## --pearl → dedicated --beat token

- From:
  - `.claude/working-docs/current-status.md` lines 116–117
  - `docs/STATUS.md` lines 181
  - `docs/branding-naming.md` lines 78–80
  - `.claude/working-docs/memory.md` lines 42–44
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Older docs list it as an open lib follow-up; the newer status docs record it resolved by CQ-4 as an app-owned `--beat` token.

## Roadmap triaged into prioritized-work.md

- From: `.claude/working-docs/memory.md` lines 20–25 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

2026-06-26 three-perspective analysis (code quality / features / SEO) prioritized; detail in the improvement roadmap.

## Backlog housekeeping: feature-ideas.md created, CQ-15 removed

- From: `.claude/working-docs/current-status.md` lines 84–86 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Brainstorm of unbuilt features + unused lib capabilities; CQ-15 removed per the user.

## App-launch runbook written (metronomnom as test case #1)

- From: `docs/STATUS.md` lines 87–91 (now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Reusable app-agnostic launch runbook; supersedes the traffic-experiment spec.

## Analytics: Google gtag + @vercel/analytics

- From:
  - `.claude/working-docs/current-status.md` lines 53
  - `docs/STATUS.md` lines 108
  - (repo docs now in `jrg/legacy/`)
- Old state: shipped
- Imported: 2026-10-03

Both kept.

## FT-8 — Presets & setlists (won't do)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 115
  - `docs/improvement-roadmap.md` lines 57, 124, 142
  - `docs/feature-ideas.md` lines 81–84
  - `.claude/working-docs/memory.md` lines 24–25
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

User decision 2026-06-26. Also removed the planned in-app FlexOffers surface.

## CQ-5 — Slider focus ring

- From:
  - `.claude/working-docs/prioritized-work.md` lines 112
  - `docs/improvement-roadmap.md` lines 32, 121
  - `.claude/working-docs/current-status.md` lines 96–97
  - `docs/STATUS.md` lines 69
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

Folded into CQ-4.

## CQ-12 — Duplicated 3D button string

- From:
  - `.claude/working-docs/prioritized-work.md` lines 112
  - `docs/improvement-roadmap.md` lines 39, 121
  - `.claude/working-docs/current-status.md` lines 96–97
  - `docs/STATUS.md` lines 69
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

Folded into CQ-4.

## CQ-9 — Remove apparent cruft (providerId, setTheme, refresh)

- From:
  - `.claude/working-docs/prioritized-work.md` lines 113
  - `docs/improvement-roadmap.md` lines 36, 122, 138–139
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

Not cruft: forward seams, and `refresh` is CQ-3's other half.

## SEO-9 — Self-host fonts

- From:
  - `.claude/working-docs/prioritized-work.md` lines 114
  - `docs/improvement-roadmap.md` lines 79, 123
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

Duplicate of CQ-1.

## Tempo trainer out of scope: second deck-collapse level, loop-back mode, auto-stop at target

- From:
  - `docs/superpowers/specs/2026-07-06-tempo-trainer-design.md` lines 41–42
  - `.claude/working-docs/current-tasks.md` lines 99–100
  - (repo docs now in `jrg/legacy/`)
- Old state: dropped
- Imported: 2026-10-03

Listed as YAGNI for the trainer.
