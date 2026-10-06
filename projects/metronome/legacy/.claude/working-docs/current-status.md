# Current status — metronomnom

_Snapshot. Updated 2026-07-11._

## Health
- **Green:** `pnpm build` (tsc 6 `-b` + Vite 8/Rolldown, ~0.8s, no warnings) · `pnpm lint`
  (ESLint 9 type-checked; Husky pre-commit) · `pnpm test` (**212 tests**).
- **Toolchain (upgraded 2026-06-27):** React **19.2** · TypeScript **6.0** · Vite **8.1**
  (Rolldown) · Vitest **4.1** · @vitejs/plugin-react **6** · ESLint **9**. **Tailwind stays
  3.4** (shadcn adopted on v3.4; v4 not pursued).
- **Git:** branch `main`, clean, up to date with `origin/main`. **UI-1 committed** (`368a954` +
  `81ee8a8`); **FT-7 tempo trainer committed** (`489da4c` + `65508df`); **Rock Mode committed**
  (`3467fd5`/`9ecb2d3`/`bc8483c` initial rockstar trainer → `4a1734c` v5 punk/glam concert + mascot
  → `3d56f11` mascot animation-restart fix). (User runs git/deploys.)
- **Deployed:** live at **metronomnom.com**.

## What works
- Full single-screen metronome (`@fretwork/lib` `useMetronome()`): beat arc, tempo/BPM,
  meter, feel/swing, mute, transport, latency calibration (updates live on output-device change).
- **Layout = "instrument + control deck" (UI-1, 2026-07-05):** a **pulse zone** (dots-arc or
  mascot, swapped by a corner ⇄ button; the whole pulse scales as one transform) over the
  transport (**mute beside Play**), and a **docked collapsible control deck** at the bottom —
  **tempo always visible**, a grab handle expands **meter + feel + swing + About** via a smooth
  `grid-rows` height animation. Collapse state persists (`src/deckState.ts`). **No volume slider
  (mute only) and no footer ad.** See UI-1 in `current-tasks.md`.
- **Tempo trainer (FT-7, new 2026-07-06/07):** armable row in the expanded deck — every N bars
  raises BPM by a step until a target, then holds + disarms with a cue (readout flash + row
  highlight). Manual tempo changes disarm it. A live **"+step in N bars" chip** under the BPM
  number counts down to the next bump. Config persists (localStorage + URL `tt/ts/ti`); armed flag
  is localStorage-only. `src/tempoTrainer.ts` + `src/components/TempoTrainerControl.tsx`.
- **Rock Mode — the trainer as a punk/glam concert (2026-07-08 → 11):** arming the trainer + Play
  runs a full-screen three-act "show" — a meter-scaled **launch count-in** (one measure) → a
  **climb HUD** → a **victory payoff** — then disarms. The **real metronome is reused untouched**
  (`BeatDots` + `TempoReadout`) inside a lit **spotlight pool**, so it stays the legible, precise
  centerpiece on the dark stage in **both themes**. Dressing (all app-owned tokens): Bowie/Ziggy
  **lightning bolts**, comic **speed-lines**, Sgt-Pepper **halftone**, Sex-Pistols **ransom-note**
  lettering (Anton `font-punk`), a neon **amp-gain meter**, a LEVEL-UP flare on each bump, and a
  **shredding mascot** (the beat-eater metronome kitted with a flying-V, mohawk, and bolt-eye) that
  headbangs / swings / strums **phase-locked to the beat clock** (rAF, like `MascotHero` — a BPM
  bump re-paces continuously, never restarts). `src/rockMode.ts` (act state machine + `useRockMode`)
  + `src/components/RockMode.tsx` / `RockstarMascot.tsx` / `RansomText.tsx`.
- Two "fun" light/dark themes (sun/moon, persisted, pre-paint). **Mascot** = wind-up
  metronome eating notes; pendulum/body run on a **steady beat clock** (real-metronome
  feel, decoupled from feel/swing); notes drawn at their rhythmic value.
- **About/FAQ** (in the expanded deck) → **shadcn Dialog** (utility-page SEO; wordmark is the
  single `<h1>`; crawlable copy in a hidden `#about-content`).
- **Paint-shell:** a gray skeleton **auto-generated from the real app** at build, injected
  into `#root` for instant FCP (no drift, no reload jump).
- **Tap tempo** (Tap button + spacebar), **settings persistence** (bpm/meter/feel/swing/
  volume/mute survive reload via `localStorage`), and **bookmarkable URL state** (the musical
  setup lives in the query string; a link's params win over saved settings on load).
- **UI on shadcn/ui**, painted by the app's **own** design tokens (no styling from the lib).
- Analytics: Google `gtag` + `@vercel/analytics`.

## Current focus — _between tasks_ (Rock Mode shipped + committed)

Rock Mode (the tempo trainer as a punk/glam concert takeover, incl. the shredding mascot) is done,
verified (212 tests / build / lint green), and **committed** (`4a1734c` + `3d56f11`). Picking the
next task next.

**To resume:**
1. (Optional) `pnpm dev` — arm the trainer + Play to see Rock Mode; tune to taste (bolt/speed-line
   intensity, mascot size/placement). A "frontman" mascot on the launch count-in is a possible add.
2. Pick the next task — **SEO-12** is the only remaining P1 (`prioritized-work.md`). Or start from
   **`docs/feature-ideas.md`** (quick wins: accent editor / click-volume slider / typed BPM; bigger
   bets: click voices / drone layer / backing groove).

**Just shipped (2026-07-08 → 11, committed):**
- **Rock Mode** — the tempo trainer reimagined as a full-screen punk/glam concert (launch count-in →
  climb HUD → victory), reusing the real metronome untouched in a spotlight pool + a beat-synced
  shredding mascot. New `src/rockMode.ts` (`useRockMode` + pure act state machine) and
  `src/components/RockMode.tsx` / `RockstarMascot.tsx` / `RansomText.tsx`. Design-system additions
  (all tokens, zero hardcoded values): theme-invariant neon palette (`--rk-*` → `rk-*`), Anton
  `font-punk`, rock keyframes/animations + `.rock-*` component classes. Mascot motion is rAF
  phase-locked to the beat clock (fixed a CSS-duration restart-on-bump bug, `3d56f11`). +52 tests
  → 212. Commits `bc8483c`/`3467fd5`/`9ecb2d3` (initial) → `4a1734c` (v5 punk + mascot) → `3d56f11`.

**Earlier (2026-07-06 → 07, committed):**
- **FT-7 tempo trainer** — `489da4c` (core: ramp-to-target every N bars, cue + disarm, manual-
  override disarm, localStorage + URL `tt/ts/ti` persistence) and `65508df` (live "+step in N bars"
  countdown chip under the readout). New `src/tempoTrainer.ts` + `src/components/TempoTrainerControl.tsx`;
  wired via a `useMetronome({ events })` ref-bridge + `handleUserBpm` choke point. +42 tests → 160.
  Spec: `docs/superpowers/specs/2026-07-06-tempo-trainer-design.md`.
- **Backlog housekeeping:** created **`docs/feature-ideas.md`** (brainstorm of unbuilt features +
  unused `@fretwork/lib` capabilities); **removed CQ-15** from `prioritized-work.md` (per user).

**Earlier (2026-07-04 → 05, committed):**
- **UI-1** — single-screen "instrument + collapsible control deck" redesign (`368a954` + `81ee8a8`).
  Removed `VolumeControl` + the footer ad; added `ControlDeck`, `MuteButton`, `deckState`; new
  `boxShadow.deck` / `maxWidth.arc-lg` tokens.
- **CQ-14** — calibration/theme/nativeLatency tests. **CQ-10** — CalibrationSheet listener churn.

**Recently shipped & committed (2026-06-28 → 07-02):**
- **CQ-4** — the app now **owns its entire design system**: decoupled from `@fretwork/lib`
  styling (lib is logic-only — `[[lib-is-logic-only]]`), **zero hardcoded values**, and a full
  **shadcn/ui** migration (button/slider/toggle-group/dialog) with the resting look preserved;
  cleared the CalibrationSheet a11y eslint-disables. Absorbed CQ-5/CQ-12, resolved CQ-8.
- **FT-1** — settings persistence (`src/settings.ts` + `usePersistSettings`).
- **FT-2** — tap tempo (`src/tapTempo.ts` + a Tap button in `BpmControl`).
- **FT-12** — bookmarkable URL state (`src/urlState.ts` + `useUrlState`).
- Earlier (2026-06-27): SEO/About-modal rework, perf pass (non-blocking fonts, code-split,
  auto-generated paint-shell), CQ-0/2/3, and the React 19 / TS 6 / Vite 8 / Vitest 4 upgrades.

**Parked:** the Mascot "hula" body sway — implemented + tested, but the user isn't happy with
the *look* (`src/components/mascotAnim.ts` + `Mascot.tsx`; spec in
`docs/superpowers/specs/2026-06-26-mascot-hula-sway-design.md`).

**Next up (P1):** SEO-12 Search Console. Full backlog:
[`prioritized-work.md`](./prioritized-work.md). Ads remain **parked** on FlexOffers approval.

## Known issues / open
- Mascot "hula" look not yet approved (paused).
- Biggest remaining perf lever — **defer Tone.js until first Play** — needs a
  `@fretwork/lib` change (the engine is imported eagerly via `useMetronome`).
- Minor: brief default→restored flash on load (settings have no pre-paint script — by design).
- _(Resolved by CQ-4: the old `--pearl`-re-tuned-dark wart → now the app-owned `--beat` token;
  the CalibrationSheet a11y `eslint-disable`s → gone with the shadcn Dialog.)_

## How to verify
`pnpm dev` → toggle light/dark; play and change tempo/meter/feel/volume; **Tap** button or
**Space** to set tempo; change settings and **reload** (they persist); open **About** /
**Calibrate**; reload to see the gray paint-shell. The first `pnpm snapshot` auto-installs the
headless Chromium shell; thereafter it's a fast no-op.
