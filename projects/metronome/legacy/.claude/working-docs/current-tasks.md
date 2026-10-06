# Current tasks

## ACTIVE: _(none — between tasks)_

Rock Mode shipped + committed (below). Next candidates: **SEO-12** (only remaining P1) or a pick
from the **`docs/feature-ideas.md`** brainstorm.

---

### DONE (2026-07-08 → 11): Rock Mode — the tempo trainer as a punk/glam concert

_User-driven feature built mockup-first (design locked via faithful HTML mockups, "show don't
quiz"). Verified 212 tests / build / lint green. **Committed** `bc8483c`/`3467fd5`/`9ecb2d3`
(initial rockstar trainer) → `4a1734c` (v5 punk/glam concert + mascot) → `3d56f11` (mascot
animation fix)._

**Goal / what shipped:** arming the tempo trainer + pressing Play now enters a full-screen
concert "takeover" — a three-act show that dramatizes the climb to the target tempo, then disarms.
The **metronome itself is never redrawn**: the real `BeatDots` + `TempoReadout` are reused verbatim
inside a lit **spotlight pool** so they stay the legible, precise centerpiece on the dark stage in
both themes (the user's hard constraint: "don't change how the metronome looks / it must stay
visible").

- **Act 1 — Launch count-in:** a beat-synced count-in of **one full measure** (meter-scaled: 4 in
  4/4, 3 in 3/4), big punk poster numerals → "GO!".
- **Act 2 — Climb HUD:** the spotlight-pool metronome as centerpiece; a **neon amp-gain meter**
  (start → target); a **LEVEL-UP ransom flare** that fires only on an actual BPM bump; a next-bump
  marquee; a punk STOP; and the **shredding mascot** performing stage-left.
- **Act 3 — Victory:** "YOU SHREDDED IT" ransom title, the mascot as hero, the final BPM, confetti;
  a timer closes the show and disarms.

**The mascot (`RockstarMascot.tsx`):** the existing beat-eater metronome character kitted out — a
flying-V held low (face stays clear), a Bowie/Ziggy **lightning bolt over one eye**, a punk
**mohawk**, an open **shout**, little hands on the neck + strings. It **headbangs, swings its
pendulum from the base (like a real metronome), and strums**, all **phase-locked to the engine beat
clock** via a single rAF loop (the `MascotHero` pattern, reusing `bodySway`/`pendulumAngle`).

**Punk/glam look** (inspiration: Bowie, Sex Pistols poster, comic speed-lines, Buddy-Holly stage,
Sgt-Pepper collage): comic speed-lines, two flanking lightning bolts, halftone texture, ransom-note
lettering (`RansomText.tsx`), Anton condensed type, a clashing neon palette. **Zero hardcoded
values** — a **theme-invariant neon palette** (`--rk-pink/blue/yellow/red/cyan/ink/ink-2/outline/paper`
→ `rk-*` Tailwind tokens), Anton `font-punk`, rock keyframes/animations, and `.rock-*` component
classes (multi-layer gradients/masks) in `src/styles/index.css`.

**Files:** `src/rockMode.ts` (pure act state machine `nextAct` + progress/countdown helpers +
`useRockMode` hook: captures start-BPM, times the victory screen, disarms) + `rockMode.test.ts`;
`src/components/RockMode.tsx` (presentational overlay, all state via props) + `RockMode.test.tsx`;
`RockstarMascot.tsx` + test; `RansomText.tsx` + test. Wired in `MetronomeApp.tsx`
(`useRockMode(m, trainer)`; trainer row + spacebar gated to `act === 'idle'`; overlay mounted).

**Notable fixes along the way:** count-in tied to the time signature (not hardcoded 3-2-1);
LEVEL-UP flare only on a milestone (no forwards fill → flashes then hides); mascot pendulum pivots
at the **base** (`transform-origin` at the rod base, not the top); and the mascot no longer
**restarts its animation on a BPM bump** — motion moved from bpm-derived CSS `animation-duration`
(which hitched on every bump) to rAF phase-locked from continuous beat-phase refs (`3d56f11`).

**Verified:** `pnpm test` **212** (+52: `rockMode` 25, `RockMode` 13, `RansomText` 3, `RockstarMascot`
2, plus earlier trainer additions), `pnpm build` ✓, `pnpm lint` clean; drove the real app into Rock
Mode and screenshotted launch + climb + victory in both themes, and confirmed no animation restart
across live tempo bumps.

**Open / optional:** a "frontman" mascot on the launch count-in; further intensity tuning. Logic
settled.

---

### DONE (2026-07-06 → 07): FT-7 — Tempo trainer (auto-accelerate)

_App-only feature (P2). Brainstormed + planned; design spec at
`docs/superpowers/specs/2026-07-06-tempo-trainer-design.md`; plan at
`~/.claude/plans/refactored-scribbling-minsky.md`. **Committed** `489da4c` + `65508df`._

(UI-1 is **committed** — `368a954` "moved controls into a drawer" + `81ee8a8` "ui touchups"
on `main`; the earlier "uncommitted" notes are stale.)

**Goal / done looks like:** an armable "Tempo trainer" row in the expanded control deck. While
armed + playing, BPM rises by a set step every N bars until it reaches a target, then holds at
target and disarms with a subtle cue (readout flash + row highlight). Config persists across
reloads and travels in shareable URLs. `pnpm test`/`build`/`lint` green; works end-to-end in
`pnpm dev`.

**Why / context:** classic practice tool (start slow, creep the tempo up as a passage gets
clean). App-only — `@fretwork/lib` already exposes the `measure` event + `setBpm`, so no lib
bump. Chosen as the next feature-backlog task.

**Requirements (observable "what"):**
- Ramp-to-target: every N bars `setBpm(min(bpm + step, target))`; at `bpm >= target`, hold +
  disarm. Only runs while playing; bar counter resets on each (re)start.
- Reached-target cue: toggle flips off + big BPM readout flashes + trainer row highlights
  (auto-clear).
- Three steppers (Target / Step / Interval) + an on/off toggle. Defaults: target 140, +5, 4 bars.
- Manual tempo change (stepper/slider/tap/Space) **disarms** the trainer (never fights the user).
- Edge: target ≤ current at arm → disarm silently (no ramp-down, no cue).
- Persist config `{target,step,interval}` to localStorage **and** URL (`tt/ts/ti`); `enabled`
  to localStorage only (default off), never in the URL.

**Constraints & out of scope:** app-only (no lib change); reuse existing control/hook/persistence
idioms; **no hardcoded colors/sizes** (app owns its design system — CSS var + tailwind token if a
new one is needed). No new deps. (No privacy/no-CDN constraint — n/a.) Not in scope: second level
of deck collapse, cycle/loop mode, auto-stop-metronome.

**Plan / steps:**
1. `src/tempoTrainer.ts` (TDD) — pure helpers (`nextTrainerBpm`, `reachedTarget`, clamps,
   `parseTrainer`/`serializeTrainer`/read/write, key `metronomnom.trainer`) + `useTempoTrainer(m)`
   hook (config+setters, enabled, `applyConfig`, `justReached`, `handleUserBpm`, stable `driver`).
2. `src/components/TempoTrainerControl.tsx` (+ test) — label + on/off toggle + 3 steppers +
   `justReached` highlight, reusing MuteButton/BpmControl idioms.
3. Wire: ref-bridge `events:{measure,start}` into `useMetronome`; `onBpm={trainer.handleUserBpm}`;
   thread trainer props into `ControlDeck` (row after Feel, before About); extend `useUrlState(m,
   trainer)` with `tt/ts/ti`; add `flash` prop to `TempoReadout` + `bpm-flash` keyframe in
   `tailwind.config.ts`. Extend `ControlDeck.test` + `urlState.test`.
4. Verify: `pnpm test` / `build` / `lint`; hand user a `pnpm dev` walkthrough.

**Progress:** Implementation complete + verified. New `src/tempoTrainer.ts` (pure helpers +
`useTempoTrainer`) and `src/components/TempoTrainerControl.tsx`; wired via a ref-bridge
(`events:{measure,start}`) in `MetronomeApp.tsx` with `handleUserBpm` as the disarm choke point;
`ControlDeck` renders the row (after Feel, before About); `useUrlState(m, trainer)` folds in
`tt/ts/ti`; `bpm-flash` keyframe + `TempoReadout` `flash` prop for the cue. **`pnpm test` 154 green
(+36: tempoTrainer 24, control 4, ControlDeck +1, urlState +7), `pnpm build` ✓, `pnpm lint` clean.**
Remaining: user's `pnpm dev` walkthrough (verify feel/timing live; tune flash + highlight look) and
git.

**Follow-on (2026-07-07):** added a live **"bars until next step" indicator** under the BPM readout.
`useTempoTrainer` now exposes `barsUntilNext` (counts `interval`→1 while armed+playing, `null`
otherwise); `TempoReadout` renders a `+{step} in {n} bar(s)` hint (accent `text-pop`, `ChevronsUp`
icon) below "BPM" in both hero views. +6 tests → **160 green**; build + lint clean.

**Open questions / decisions:** none open. Decisions locked 2026-07-06 (ramp-to-target;
hold+cue on reach; three knobs; manual-override disarms; persist config LS+URL, enabled LS-only;
inline in expanded deck; silent disarm when target ≤ current).

**Done when:** ✅ `pnpm test` (160) / `build` / `lint` green; config persists (localStorage + URL);
committed (`489da4c` + `65508df`). Only-optional remainder: eyeball the look in `pnpm dev` and tune
the countdown-chip size / cue timing if desired (cosmetic).

---

### DONE (this session): UI-1 — single-screen layout redesign ("instrument + collapsible control deck")

_Designed via faithful mockup + built iteratively with the user 2026-07-05. Build/lint green, 118 tests._

**Outcome (what shipped):**
- **Pulse zone** — dots-arc / mascot swap (corner ⇄ button) with the BPM number; the whole
  pulse **scales as one transform** (full size when the deck is collapsed, scales down when
  expanded) so the beat markers animate in sync, crisp, no mobile overflow.
- **Docked control deck** (`src/components/ControlDeck.tsx`) — page-colored surface bled to the
  edges (`-mx-5`), flush to the viewport bottom (container `pt-4`, no `pb`). **Tempo always
  visible**; a grab handle expands **Meter + Feel + Swing + About** via the CSS `grid-rows`
  `0fr↔1fr` height animation, **bottom-anchored** (`justify-end`) so content fills up from the
  bottom with no padding gap. Collapse state persists (`src/deckState.ts`, default collapsed).
- **Mute-only** button beside Play (`src/components/MuteButton.tsx`); the **volume slider +
  `VolumeControl.tsx` were removed**. **Ad removed** (`<AdSlot>` dropped from `MetronomeApp`).
- **About** moved from a bottom row into the bottom of the expanded deck; header stays 2 items.
- **Tests +6** (`deckState` earlier; `MuteButton`, `ControlDeck` now) → 118. New size token
  `boxShadow.deck`, `maxWidth.arc-lg`; `TempoReadout` gained a `large` prop.

**Original design record (for reference):**

**Problem being fixed:** the current screen is a long, scrolly page — the metronome floats
mid-screen with a dead gap, and meter/feel/volume are stranded at the bottom, reading as a
"widget + settings list" rather than one designed app.

**Approved design — "one instrument, two zones":**
- **Pulse zone (top, the hero, unchanged):** the `BeatDots` arc wrapping the BPM number, or
  the mascot (the existing swap toggle stays). The arc-wrap is *functional* (keeps large
  meters/subdivisions from running off the page) — do NOT change it. The BPM number stays as
  the arc's anchor. Transport (Play) sits just below, with a **mute/unmute button beside it**.
- **Control deck (docked at the bottom, quiet + subordinate):** a single grounded surface,
  **collapsible via a grab handle**. **Tempo is ALWAYS visible** (steppers + slider + tap).
  Collapsed = tempo only. Expanded = tempo + **Meter** (all 8 time sigs) + **Feel** (all 7,
  incl. the swing slider). Everything present; nothing in a modal.
- **Volume:** the slider is **removed** — only **mute/unmute** remains (by the transport).
- Controls are visually quieter than the pulse (muted labels, smaller/monochrome), so exactly
  one thing is loud: the beat.

**Reuse (not new UI):** existing `BeatDots`, `BpmControl`, `TimeSignaturePicker`, `FeelControl`,
shadcn `ToggleGroup`/`Slider`, `MascotHero`. Net-new: the docked deck wrapper + collapse handle,
a mute-only button, and layout restructuring in `MetronomeApp`.

**Decisions (confirmed 2026-07-05):**
1. Persist collapsed/expanded across reloads (like theme), **default collapsed** — yes.
2. Mute button **beside Play** — yes.
3. **Ad removed for now** (drop the `<AdSlot>` from `MetronomeApp`); About link kept (small,
   below the deck).

**Verify:** `pnpm test` / `build` / `lint` green (done). Mockup lived in the session scratchpad
(not the repo).

---

### DONE (2026-07-04): CQ-14 — tests for calibration state machine + theme localStorage + nativeLatency seam

_Started + completed 2026-07-04. Test-coverage task (P1). Depth (a): all three surfaces; calibration thorough._

**Goal / done looks like:** the app's one differentiator (the calibration tap-in
state machine) and its two seams (theme persistence, the `nativeLatency` platform
seam) have real regression coverage, so future refactors + the eventual Tauri swap
are guarded. `pnpm test` green with the new suites; no production-code changes.

**Why / context:** these three files carry the app's most important + most subtle
logic yet are the least covered. `useCalibration.ts` is the differentiator (output-
latency compensation via tap-in median); `theme.ts` owns persistence that must stay
in sync with the pre-paint script; `nativeLatency.ts` is the seam a future Tauri
shell swaps — its web contract (`null`, never throws) must be pinned. Deferred here
from CQ-3 (device-change) + CQ-4. This is a **test-only** task.

**Requirements (observable "what"):**
- **`nativeLatency.ts`** — `webNativeLatency.id === 'web'`; `getOutputLatencyMs()`
  resolves `null` and never throws; `activeNativeLatency` is the web provider.
- **`theme.ts` (`useTheme`)** — initializes from `localStorage['metronomnom.theme']`
  (`light`/`dark`), falls back to `light` for missing/garbage values; toggling
  persists the new value + applies the `theme-*` class on `<html>`; a throwing
  `localStorage` (private mode) is swallowed and the class is still applied.
- **`useCalibration.ts` tap-in state machine (thorough):**
  - `startTapIn` sets `tapRunning`, resets `tapCount`/`tapMeasuredMs`, schedules a
    click immediately + on the interval.
  - `registerTap` no-ops when no scheduled click has passed (`tapCount` stays 0).
  - `tapMeasuredMs` stays `null` until `TAP_MIN_SAMPLES` (4) taps, then is numeric
    (= median(deltas) − outputLatency, clamped ≥ 0).
  - running median honors the `TAP_WINDOW` (8) sample window.
  - `finishTapIn` commits via `setCalibrationOffsetMs(measured)` + clears `tapRunning`;
    `cancelTapIn` clears state and does **not** commit.
  - unmount stops the scheduler (no leaked `setInterval`).

**Constraints & out of scope:**
- **Test-only** — no changes to `useCalibration.ts` / `theme.ts` / `nativeLatency.ts`
  production code (if a bug surfaces, stop and flag it, don't silently fix).
- Unit-test the **app's** logic, not the lib: `vi.mock('@fretwork/lib')` with a
  controllable fake `audioNow()` clock + spies (`setCalibrationOffsetMs`,
  `scheduleCalibrationClick`); `vi.useFakeTimers()` for the `setInterval` scheduler.
- Device-change / label-permission paths are lightly touched at most (already
  exercised by the CQ-3 work); not the focus.
- No new deps. (metronomnom has no privacy/no-CDN constraint — n/a.)

**Plan / steps:**
1. `nativeLatency.test.ts` — the web-provider contract (small, first, easy green).
2. `theme.test.ts` — `useTheme` via `@testing-library/react` renderHook: init
   variants (light/dark/missing/garbage), toggle→persist+class, throwing-storage.
3. `useCalibration.test.ts` — set up the `@fretwork/lib` mock + fake audio clock +
   fake timers; then drive the tap-in flow through the requirements above,
   one behavior per test (TDD: each test written to fail first where meaningful).
4. Verify each file as it lands (`pnpm test -- <file>`), then full `pnpm test`,
   `pnpm build`, `pnpm lint`.

**Progress:** ✅ Done. Three new suites, all green, **zero production-code changes**:
`src/calibration/nativeLatency.test.ts` (4), `src/theme.test.ts` (8),
`src/calibration/useCalibration.test.ts` (10). The calibration suite mocks
`@fretwork/lib` with a controllable fake `audioNow()` clock + spies and uses
`vi.useFakeTimers()` for the scheduler; a `tapAt(i, delta)` helper drives clicks via
interval ticks. The TAP_WINDOW test uses a 55ms-vs-50ms discriminator so it genuinely
proves the 8-sample window (not a vacuous pass). Verified: `pnpm test` **100 green**,
`pnpm lint` clean, `pnpm build` ✓.

**Open questions / decisions:** none — depth (a); lib-mock + fake-timers approach used.

**Done when:** ✅ all three suites green; `pnpm test` / `build` / `lint` green; no
production-code changes. **Remaining: user commits.**

---

### Recently shipped
- **CQ-10 (2026-07-03)** — fixed the `CalibrationSheet` Space-keydown effect churn:
  destructure `{ tapRunning, registerTap }` off `cal` and depend on those (not the
  whole fresh-every-render `cal` object) → no per-render re-subscribe; lint-clean
  (avoids the `exhaustive-deps` warning `[…, cal.registerTap]` would raise). Regression
  test added (mock reworked to a stable `registerTap`). 78 tests. Committed `e220ade`.
- **FT-12 (2026-07-02)** — **bookmarkable URL state**: `src/urlState.ts` +
  `useUrlState(m)` two-way binds bpm/meter/subdivision/swing to the query string so a setup is
  bookmarkable; a URL with params wins over saved settings on load; defaults omitted (clean URL).
  11 tests.
- **FT-2 (2026-07-02)** — **tap tempo**: `src/tapTempo.ts` (`bpmFromTaps` median, `pushTap`
  reset/window, `useTapTempo`) + a Tap button in `BpmControl`; Space also taps, gated while a
  dialog is open / a control is focused. 12 tests.
- **FT-1 (2026-07-01)** — **persist settings** (bpm/meter/feel/swing/volume/mute) to
  `localStorage['metronomnom.settings']`; `src/settings.ts` + `usePersistSettings(m)`. 12 tests.
- **CQ-4 (2026-06-28)** — app now **owns its whole design system** (decoupled from `@fretwork/lib`
  styling, zero hardcoded values) + full shadcn migration; cleared CalibrationSheet a11y disables;
  absorbed CQ-5/CQ-12, resolved CQ-8.
- **2026-06-27 batch** — SEO rework → About modal (started shadcn); perf (non-blocking fonts,
  code-split, auto-generated paint-shell); **CQ-2** (React.memo) · **CQ-3** (calibration
  device-change); **CQ-0** (ESLint type-checked + Husky); React 19 · TS 6 · Vite 8 · Vitest 4.

Full history in `docs/STATUS.md`; backlog in `prioritized-work.md`. Tests total: **77**.

---

## PAUSED: Mascot "hula" body sway — _implemented + tested; user "not quite happy", will return_

A second beat-synced motion on `MascotHero`: on top of the pendulum tick, the body bends
side to side ("hula") — feet planted, hips swing, small vertical hop; the **pendulum is
independent** (tick only). Spec: `docs/superpowers/specs/2026-06-26-mascot-hula-sway-design.md`.

**Where it stands (all green, build + tests):**
- `src/components/mascotAnim.ts` — pure, unit-tested: `bodySway`, `bodyOffset`
  (whole-body profile: 0 at planted feet, bulges mid-body, top counters), `bodyBob`,
  `bodyPath` (`s=0` == authored silhouette), `beatDurationMs`, `noteFlags`. Tunables:
  `BODY_AMP=6`, `BODY_BOB=1.5`, `BEATS_PER_SWAY=2`, internal `TOP_COUNTER=0.35`.
- `src/components/Mascot.tsx` — the hero drives body `d` + face/base offset + a root bob
  each rAF frame; pendulum keeps only its tick. **Pendulum + body run on a steady BEAT
  clock** (re-anchored per counted pulse via `beatDurationMs(bpm, denominator)`), so they
  ignore subdivisions/swing (real-metronome feel). The note **conveyor also runs off the
  beat clock** (smooth, no swing hiccup). Notes are drawn at their **rhythmic value by
  feel** (`noteFlags`: off=quarter, 8ths/triplets=eighth, 16ths/sextuplets=sixteenth).
  Staff + notes are static; the body covers/reveals the staff so there's no gap. New
  `denominator` prop from `m.timeSignature.denominator`. (`currentSubdivisionIndex` prop
  removed.)

**Unresolved:** the user isn't happy with the body-sway *look*. Resume by re-tuning the
sway (amp/top-counter/rhythm) or rethinking the motion — show options via `pnpm dev`.
