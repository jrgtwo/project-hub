# Improvement roadmap

Findings from a three-perspective codebase analysis (2026-06-26): **code quality**,
**new features**, **SEO**. Priorities are set collaboratively — see the legend.

**Priority legend**
- **P0** — Critical / do first
- **P1** — High
- **P2** — Medium
- **P3** — Low / someday
- **P4** — Icebox / maybe-never
- **TBD** — not yet prioritized

> **Note (2026-06-26):** The "privacy-first / no-CDN / no-telemetry" constraint that
> originally framed this analysis was generic `/start-new-task` boilerplate carried over
> from another project — **not** a real goal for metronomnom. It has been struck. Font
> self-hosting (CQ-1) survives only as a minor LCP/perf item, not a privacy fix.

Priority values below are **TBD** pending the walkthrough.

---

## 1. Code quality

| ID | Prio | Sev | Finding | Fix |
|----|------|-----|---------|-----|
| CQ-0 | **P1** | — | **Add linting** (user-requested 2026-06-26) — repo has no lint script today (only `tsc -b`). Add ESLint (+ typescript-eslint, react-hooks, jsx-a11y) and a `pnpm lint` script. Would catch several items below automatically (CQ-7, CQ-10, CQ-11, a11y gaps). | Add `eslint.config.js` (flat config), deps, `lint` script; wire into build/CI. |
| CQ-1 | **P3** ⬇ | Low | **Google Fonts loaded from CDN** (`index.html:12-14`) — render-blocking third-origin request; self-hosting is a minor LCP/FCP win. (Privacy framing struck — not an app constraint.) | Optionally self-host the 4 families (Inter, JetBrains Mono, Fredoka, Baloo 2) as woff2 + `@font-face` w/ `font-display: swap`. |
| CQ-2 | **P0** | Med | **Whole app re-renders every subdivision** (`MetronomeApp.tsx`) — `useMetronome()` returns fresh state each tick; ~13×/sec at 200 BPM/16ths re-renders picker, sliders, ad slot — none of which need the beat clock. | `React.memo` the beat-independent presentational components (props are primitives/stable callbacks). |
| CQ-3 | **P0** | Med | **Calibration sheet shows stale device/latency** (`useCalibration.ts:126-146`) — device-change listener installed but `refresh()` is wired to nothing; speaker→Bluetooth switch leaves old values. | Pass a callback to `installDeviceChangeListener` → call `refresh()`; or `refresh()` on sheet open. |
| CQ-4 | **P1** | Med | **Integrate shadcn/ui; migrate hand-rolled components where it makes sense** (user-requested 2026-06-26). No component library today — modal, sliders, buttons are all hand-rolled. Adopt shadcn primitives (Dialog, Slider, Button, …) so the `CalibrationSheet` modal gets Escape + focus-trap/restore + scroll-lock for free, and future overlays (presets, click-voice picker) are accessible by default. Includes mapping shadcn's `--background/--foreground/--ring` tokens onto the **lib-owned theme variables** so the light/dark "fun" themes still work. **Absorbs CQ-5 (slider focus ring) and CQ-12 (dup button styles).** Larger effort. | `npx shadcn@latest init` (Vite + Tailwind v3), map tokens, migrate component-by-component starting with Dialog (CalibrationSheet). |
| CQ-5 | **→ CQ-4** | Med | **Sliders strip the focus ring with no replacement** (`styles/index.css:112-139`) — keyboard-operable but no `:focus-visible` indicator. **Folded into CQ-4** (shadcn `Slider` provides the ring). | Handled by shadcn Slider migration; else add `.metro-range:focus-visible { outline: 2px solid hsl(var(--ring)); outline-offset: 2px; }`. |
| CQ-6 | **P2** | Med | **`vite.config.ts` cast `as any`** (`:21`) — disables type-checking of the entire Vite config to silence the vitest `test` key. | Import `defineConfig` from `vitest/config`; drop `as any`. |
| CQ-7 | **P2** | Low | **Dead `eslint-disable` comment** (`Mascot.tsx:134`) — references a linter that doesn't exist in this project. | Remove or replace with a plain explanatory comment. |
| CQ-8 | **P2** | Low | **Stale comments** referencing removed `theme-playful` / "standard theme" (`tailwind.config.ts:55-58`). | Update to `:root.theme-light, :root.theme-dark`. |
| CQ-9 | ~~DROP~~ | — | ~~Dead/unused API surface~~ — **Dropped:** not cruft. `providerId` + `setTheme` are intentional forward seams (Tauri native-latency UI; future theme picker); `refresh` is the consumer half of **CQ-3**. | n/a |
| CQ-10 | ~~DONE~~ | Low | ✅ **DONE (2026-07-03).** Spacebar effect re-subscribed every render (`CalibrationSheet.tsx`) — deps included the freshly-rebuilt `cal` object. | Fixed: destructure `{ tapRunning, registerTap }` and depend on `[open, tapRunning, registerTap]` (avoids the `exhaustive-deps` warning that `[…, cal.registerTap]` would raise). Regression test added; 78 tests. |
| CQ-11 | **P3** | Low | **`prefers-reduced-motion` read once, not observed** (`Mascot.tsx`) — mid-session OS toggle won't take effect until another dep changes. | `matchMedia(...).addEventListener('change', ...)`. |
| CQ-12 | **→ CQ-4** | Low | **Duplicated "3D pushable button" Tailwind string ×5** + duplicated `--range-fill` cast ×3. **Folded into CQ-4** (shadcn `Button` subsumes the duplication). | Handled by shadcn migration; else extract a shared `pushButton` class / `rangeFillStyle(pct)` helper. |
| CQ-13 | **P3** | Low | **Index keys on regenerated beat-pill list** (`BeatDots.tsx:112,122`) — fragile if pills ever gain local state/transitions. | Stable keys if rendering gains state; fine while purely derived. |
| CQ-14 | ~~DONE~~ | Med | ✅ **DONE (2026-07-04).** Test gaps closed — the `useCalibration` tap-in state machine, `useTheme` localStorage paths, and the `nativeLatency` null-contract now have suites. | Test-only: `useCalibration.test.ts` (lib mocked + fake clock/timers), `theme.test.ts`, `nativeLatency.test.ts`. +22 tests → 100. |

## 2. New features

Engine already exposes `setAccents`, `setSounds`, and a `tick`/`measure`/`accent`/`subdivision`
event bus. "Lib change?" = needs work in `@fretwork/lib`, not just this app.

| ID | Prio | Effort | Lib? | Feature | Notes |
|----|------|--------|------|---------|-------|
| FT-1 | **P1** | S | No | **Remember my settings** | Persist bpm/meter/feel/swing/volume/accents to localStorage (mirror `theme.ts`); restore on load. Highest value/effort; unblocks FT-7/FT-8/FT-12. |
| FT-2 | **P1** | S | No | **Tap tempo** | Tap button + spacebar → median of recent intervals → `setBpm`. Reuse `useCalibration` median pattern. Most-requested metronome feature. |
| FT-3 | **P2** | M–L | Maybe | **Build-your-own time signature** ⚑ *needs its own design pass later.* Let users construct a custom meter beyond the preset picker — arbitrary numerator/denominator, compound groupings (e.g. 7 = 3+2+2), and per-beat accent selection. Subsumes the earlier "tap-to-edit accents" idea (BeatDots pills tappable → `setAccents`); engine already honors arbitrary accent sets, but custom groupings may need a lib change. | TBD — design the custom-meter UX (grouping + accents) before scoping. Accent-toggle piece is app-only via `setAccents`. |
| FT-4 | **P3** | S | No | **Screen wake lock while running** | `navigator.wakeLock` on start, release on stop, re-acquire on visibilitychange. |
| FT-5 | **P4** | S | No | **Tempo markings + common-BPM chips** | `bpmToMarking(bpm)` (Largo…Presto) beside readout + quick-jump chips. |
| FT-6 | **P2** | M | Yes* | **Count-in (pre-roll)** | N bars of clicks before transport starts. Lib hints at pre-roll; cleanest via lib. |
| FT-7 | ~~DONE~~ | M | No | ✅ **DONE (2026-07-06 → 11).** Tempo trainer: +BPM every N bars via `on('measure')` (`tempoTrainer.ts` + `TempoTrainerControl.tsx`, config LS+URL). Then grew into **Rock Mode** — the trainer as a full-screen punk/glam concert (launch count-in → climb HUD → victory) reusing the real metronome untouched in a spotlight pool + a beat-synced shredding mascot (`rockMode.ts` + `RockMode.tsx`/`RockstarMascot.tsx`/`RansomText.tsx`). `489da4c`/`65508df` → `4a1734c`/`3d56f11`. +94 tests → 212. | Shipped. |
| ~~FT-8~~ | ~~WON'T DO~~ | — | — | ~~**Presets & setlists**~~ — **Removed** (user decision 2026-06-26). | — |
| FT-9 | **P3** | M | No | **Accessible silent practice** | `navigator.vibrate` + full-screen downbeat flash + `aria-live` tempo announcements; honor reduced-motion. Builds on lights-only `clickMuted`. |
| FT-10 | **P2** | M | Yes | **Selectable click voices** | Pick click/accent timbre via `setSounds`; synth-based presets (no audio sample files to bundle). |
| FT-11 | **P4** | M | No | **Drop-beat / gap trainer** | Periodically mute clicks for a bar/beat so the player holds time; reveals drift. |
| FT-12 | **P2** | S–M | No | **Shareable / bookmarkable URL state** | Encode bpm/meter/feel/accents into `location.hash`; teacher-shareable, no server. Pairs with FT-8. |

\* FT-6/FT-10 prefer a `@fretwork/lib` change; everything else is app-only.

## 3. SEO

Core problem: SPA ships an empty `<div id="root">` — crawlers see only title + description.

| ID | Prio | Phase | Item | Notes |
|----|------|-------|------|-------|
| SEO-1 | **P0** | 1 | **Keyword-optimized title + description** | Drop "latency-honest" jargon from searchable fields; target "free online metronome", subdivisions, time signatures. |
| SEO-2 | **P0** | 1 | **Canonical + Open Graph + Twitter Card** | Without OG, shares render as a bare URL with no card. |
| SEO-3 | **P0** | 1 | **`WebApplication` JSON-LD** | High-ROI for a tool site; rich-result eligibility. |
| SEO-4 | **P0** | 1 | **`robots.txt` + `sitemap.xml`** | Tiny, expected; point robots → sitemap. |
| SEO-5 | **P0** | 1 | **OG share image (1200×630)** | Mascot + wordmark on brand bg; required for SEO-2 cards to render. |
| SEO-6 | **P0** | 2 | **Static below-the-fold content `<section>`** | Sibling to `#root` (React never touches it): real `<h1>`, intro copy, "how to use", FAQ. **The real ranking unlock.** Latency-calibration FAQ = unique content moat. |
| SEO-7 | **P0** | 2 | **`FAQPage` JSON-LD** | Match the FAQ from SEO-6. |
| SEO-8 | **P0** | 2 | **Promote wordmark to single `<h1>`** | Currently a `<span>`; no `<h1>` exists anywhere. |
| ~~SEO-9~~ | ~~DROP~~ | — | ~~**Self-host fonts**~~ — **Dropped as duplicate;** it's a perf item, tracked solely as **CQ-1** (P3). Marginal CWV/LCP upside noted there. |
| SEO-10 | **P4** | 4 | **PWA manifest + apple-touch-icon + 192/512 icons** | A metronome is an ideal installable PWA; engagement + quality signal. |
| SEO-11 | **P4** | 4 | **Optional offline service worker** (`vite-plugin-pwa`) | Strong fit for a fully-local app. |
| SEO-12 | **P1** | 4 | **Search Console via DNS/HTML verification** | Not GA — keeps the no-tracker promise; submit sitemap. |

---

## Prioritized roll-up (walkthrough complete 2026-06-26)

### P0 — do first
- **CQ-2** — `React.memo` beat-independent components (stop full-tree re-render every tick)
- **CQ-3** — fix stale device/latency in the calibration sheet (`refresh()` on device-change)
- **SEO-1** — keyword-optimized title + description
- **SEO-2** — canonical + Open Graph + Twitter Card
- **SEO-3** — `WebApplication` JSON-LD
- **SEO-4** — `robots.txt` + `sitemap.xml`
- **SEO-5** — OG share image (1200×630)
- **SEO-6** — static below-the-fold content `<section>` (h1 + how-to + FAQ) — the ranking unlock
- **SEO-7** — `FAQPage` JSON-LD
- **SEO-8** — promote wordmark to single `<h1>`

> 8 of the 10 P0s are SEO and mostly live in `index.html` + a few static files + one content
> section — a natural **first sprint** (~1 day) before the React work.

### P1
- **CQ-0** add linting · **CQ-4** integrate shadcn (absorbs CQ-5, CQ-12) · ~~**CQ-14** calibration/theme tests~~ ✅ done
- **FT-1** remember settings · **FT-2** tap tempo
- **SEO-12** Search Console verification

### P2
- **CQ-6** drop `vite.config` `as any` · **CQ-7** dead eslint comment · **CQ-8** stale theme comments
- **FT-3** build-your-own time signature (⚑ needs design pass) · **FT-6** count-in · ~~**FT-7** tempo trainer → Rock Mode~~ ✅ done · **FT-10** click voices · ~~**FT-12** shareable URL state~~ ✅ done

### P3
- **CQ-1** self-host fonts (bottom) · ~~**CQ-10** effect dep~~ ✅ done · **CQ-11** reduced-motion observe · **CQ-13** beat-pill keys
- **FT-4** wake lock · **FT-9** accessible silent practice

### P4 — icebox
- **FT-5** tempo markings/chips · **FT-11** drop-beat trainer
- **SEO-10** PWA manifest + icons · **SEO-11** offline service worker

### Dropped / won't do
- **CQ-5**, **CQ-12** → folded into **CQ-4** (shadcn)
- **CQ-9** → intentional forward seams, not cruft
- **SEO-9** → duplicate of CQ-1
- **FT-8** presets & setlists → won't do (user decision)

---

## Walkthrough decisions (rationale for non-obvious calls)

- **Privacy/no-CDN constraint struck** — `/start-new-task` boilerplate bled in from another
  project; not a metronomnom goal. Re-weighted CQ-1 (fonts) from "privacy violation" to a
  minor perf item (P3, bottom). See memory `no-privacy-constraint`.
- **CQ-1 fonts → P3:** without privacy, Google Fonts CDN is fast/cached; self-hosting is a
  speculative micro-opt until a CWV audit says otherwise.
- **CQ-4 broadened to shadcn integration** (user) — gives modal a11y, slider focus rings, and
  button de-duplication for free; absorbs CQ-5 + CQ-12. Includes mapping shadcn tokens onto the
  lib-owned theme variables.
- **CQ-9 dropped** — `providerId`/`setTheme` are intentional seams (Tauri native-latency UI;
  future theme picker); `refresh` is the consumer half of CQ-3.
- **FT-3 reframed** to "build-your-own time signature" (user) — the accent-editing idea is one
  piece of it; flagged for its own design pass.
- **FT-8 removed** (user) — no presets/setlists; this was also the FlexOffers monetization surface.
- **SEO P0 cluster:** title/desc/OG/JSON-LD/robots/sitemap/content/h1 are cheap, high-CTR, and
  unblock indexing — hence all P0.
