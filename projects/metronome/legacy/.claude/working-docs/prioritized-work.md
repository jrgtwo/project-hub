# Prioritized work — metronomnom

The triaged backlog of **bugs / code-quality / features / SEO**, from the
three-perspective codebase analysis (2026-06-26). This is the **actionable list**;
full findings (file:line, fixes, rationale) live in
[`docs/improvement-roadmap.md`](../../docs/improvement-roadmap.md).

**Legend:** P0 do-first · P1 high · P2 medium · P3 low · P4 icebox.
IDs: `CQ-*` code quality · `FT-*` feature · `SEO-*` SEO.

> **Feature brainstorm** (unbuilt ideas + unused `@fretwork/lib` capabilities, 2026-07-06):
> [`../../docs/feature-ideas.md`](../../docs/feature-ideas.md). Promote an item here with a
> P-level when we decide to build it.

---

## P0 — do first
- ~~**CQ-2**~~ — ✅ **DONE (2026-06-27)**. `React.memo` on the beat-independent components
  (TimeSignaturePicker, FeelControl, VolumeControl, BpmControl, TempoReadout,
  TransportButton, ThemeToggle, Wordmark) + memo'd the `AdSlot`; stabilized the inline
  `onToggle` with `useCallback`. Store actions were already stable refs. Verified via
  render-count: during playback the memo'd controls re-render 0× while BeatDots tracks
  the clock.
- ~~**CQ-3**~~ — ✅ **DONE (2026-06-27)**. Added an app-side `navigator.mediaDevices`
  `devicechange` listener in `useCalibration` that re-reads label/Bluetooth/offset, so
  the UI updates live on a speaker→Bluetooth switch. (Since `CalibrationSheet` is now
  lazy/gated, the hook also mounts fresh on every sheet open.) The lib's
  `installDeviceChangeListener()` takes no callback — it only refreshes the engine's
  cache — so the listener had to live in the app. Permanent tests → **CQ-14**.
- ~~**SEO-1…SEO-8**~~ — ✅ **DONE**, reworked 2026-06-27 into a utility-page approach
  (wordmark = single `<h1>`; the static content is now `#about-content`, surfaced via
  an **About modal**, not a page slab). Committed. See `current-tasks.md`.

> **All P0s done; CQ-0 also done.** Next up is the rest of P1 — **CQ-4** (finish shadcn),
> **CQ-14** (calibration/theme tests), **FT-1** (persist settings), **FT-2** (tap tempo),
> **SEO-12** (Search Console). Also shipped this session but not on the original list: a
> **perf pass** (non-blocking fonts, **auto-generated paint-shell** skeleton, code-split)
> and **major-version upgrades** (React 19 · TS 6 · Vite 8 + Vitest 4) — see `docs/STATUS.md`.

## P1
- ~~**CQ-0**~~ — ✅ **DONE (2026-06-27)**. ESLint 9 flat config, **type-checked**
  (typescript-eslint `recommendedTypeChecked` + `projectService`), react-hooks, jsx-a11y,
  react-refresh. Scripts `lint`/`lint:fix` + **Husky pre-commit runs `pnpm lint`** (the
  enforcement gate; verified it blocks violations). `eslint.config.js`. Cleanup done:
  folded in **CQ-6** (vite.config → `vitest/config`, dropped `as any`); resolved **CQ-7**
  (the Mascot `react-hooks/exhaustive-deps` disable is now *live*, with
  `reportUnusedDisableDirectives` guarding it); fixed `nativeLatency` `require-await`;
  aliased `m.toggle` for the hook dep. The CalibrationSheet overlay a11y has targeted
  disables deferring to **CQ-4** (shadcn Dialog). Lint clean, build + 36 tests green.
- ~~**CQ-4**~~ — ✅ **DONE (2026-06-28)**. Grew into a clean break: full **shadcn/ui**
  migration (button/slider/toggle-group/dialog) **+** the app now **owns its entire design
  system** (colors + sizes; zero hardcoded values) and imports **no styling** from
  `@fretwork/lib` (logic-only). Cleared the CalibrationSheet a11y eslint-disables; absorbed
  **CQ-5** (slider) + **CQ-12** (button de-dup); also resolved **CQ-8** (stale theme comments).
  42 tests green. Committed.
- ~~**CQ-14**~~ — ✅ **DONE (2026-07-04)**. Test-only, all three surfaces: `nativeLatency.test.ts`
  (web-provider contract: `id`, resolves `null`, never throws, is the active provider),
  `theme.test.ts` (`useTheme` init variants + toggle/setTheme persist + `<html>` class +
  throwing-`localStorage` private-mode paths), and `useCalibration.test.ts` (the tap-in state
  machine — mocked `@fretwork/lib` + fake audio clock + fake timers: arm/schedule, no-op before a
  click passes, TAP_MIN_SAMPLES gating, ≥0 clamp, TAP_WINDOW=8 running median, finish commits /
  cancel doesn't, unmount stops the scheduler). +22 tests (→ **100**); lint + build green.
- ~~**FT-1**~~ — ✅ **DONE (2026-07-01)**. `src/settings.ts` + `usePersistSettings(m)` persist
  bpm/meter/subdivision/swing/volume/mute to `localStorage['metronomnom.settings']` (versioned,
  validated, debounced). Accents deferred to the future accent-editing UI. 12 tests; committed.
- ~~**FT-2**~~ — ✅ **DONE (2026-07-02)**. `src/tapTempo.ts` (`bpmFromTaps` median, `pushTap`
  reset/window, `useTapTempo` hook) + a Tap button in `BpmControl`; Space also taps, gated while
  dialogs are open / a control is focused. 12 tests; committed.
- **SEO-12** — Google Search Console verification via DNS/HTML (not GA); submit sitemap.

## P2
- ~~**CQ-6**~~ — ✅ **DONE** (folded into CQ-0: `vite.config.ts` now uses `vitest/config`'s
  `defineConfig`, no `as any`).
- ~~**CQ-7**~~ — ✅ **RESOLVED** by CQ-0: the Mascot `eslint-disable` is now a live,
  enforced directive (react-hooks runs; `reportUnusedDisableDirectives` errors if it
  ever goes stale).
- ~~**CQ-8**~~ — ✅ **DONE (2026-06-28)**, folded into CQ-4 (stale `theme-playful` / "standard
  theme" comments removed from `tailwind.config.ts`).
- **FT-3** — build-your-own time signature (custom meter + groupings + per-beat accents). ⚑ Needs its own design pass.
- **FT-6** — count-in / pre-roll (likely a lib change).
- ~~**FT-7**~~ — ✅ **DONE (2026-07-06 → 11)**. Tempo trainer (auto-accelerate every N bars via
  `on('measure')`): `src/tempoTrainer.ts` + `TempoTrainerControl.tsx`, config persisted LS+URL
  (`tt/ts/ti`), `489da4c` + `65508df`. Then grew into **Rock Mode** — the trainer as a full-screen
  punk/glam concert takeover (launch count-in → climb HUD → victory) that reuses the real metronome
  untouched in a spotlight pool + a beat-synced shredding mascot: `src/rockMode.ts` +
  `RockMode.tsx`/`RockstarMascot.tsx`/`RansomText.tsx`, `4a1734c` + `3d56f11`. +94 tests → 212.
- **FT-10** — selectable click voices (lib: synth-based presets via `setSounds`).
- ~~**FT-12**~~ — ✅ **DONE (2026-07-02)**. `src/urlState.ts` (`parseUrlSettings`, `buildUrlQuery`
  omit-defaults, `useUrlState(m)`) two-way binds bpm/meter/subdivision/swing to the query string
  so the current setup is **bookmarkable**. A URL with params wins over saved settings on load;
  defaults omitted → clean URL. 11 tests; committed.

## P3
- **CQ-1** — self-host fonts (perf/LCP only; bottom of the list — revisit if a CWV audit flags it).
- ~~**CQ-10**~~ — ✅ **DONE (2026-07-03)**. `CalibrationSheet` destructures the stable
  `{ tapRunning, registerTap }` off `cal` and the Space keydown effect depends on those
  (not the whole `cal` object, a fresh literal each render) → no per-render listener
  re-subscription. Regression test asserts no re-subscribe on unrelated re-render (the mock
  now uses a stable `registerTap`, matching the real `useCallback([])`). 78 tests; lint clean.
- **CQ-11** — observe `prefers-reduced-motion` changes (not just read once).
- **CQ-13** — stable keys on the beat-pill list (latent only).
- **FT-4** — screen wake lock while running.
- **FT-9** — accessible silent practice (haptic + visual flash + `aria-live`).

## P4 — icebox
- **FT-5** — tempo markings + common-BPM chips.
- **FT-11** — drop-beat / gap trainer.
- **SEO-10** — PWA manifest + apple-touch-icon + 192/512 icons.
- **SEO-11** — offline service worker (`vite-plugin-pwa`).

## Dropped / won't do
- **CQ-5**, **CQ-12** → folded into **CQ-4** (shadcn provides them).
- **CQ-9** → not cruft; intentional forward seams (`providerId`, `setTheme`) + `refresh` is CQ-3's other half.
- **SEO-9** → duplicate of CQ-1 (it's a perf item, not SEO).
- **FT-8** presets & setlists → won't do (user decision 2026-06-26); was also the FlexOffers monetization surface.

---

_Last updated 2026-07-11 (FT-7 tempo trainer → Rock Mode shipped). Update this list and the roadmap
together as items ship. Only remaining P1: **SEO-12** (Search Console)._
