# ARCHITECTURE — metronomnom

Agent cold-start reference. Path-precise; invariants/gotchas first. See the
checked-in `CLAUDE.md` for the authoritative version of the rules below.

## What it is
Single-screen, latency-honest metronome. **React 19 + Vite 8 (Rolldown) + Tailwind 3.4**
(TypeScript 6, Vitest 4). The app is mostly **composition + layout**: the timing engine,
audio, design tokens, and calibration primitives live in **`@fretwork/lib`**;
ads/entitlements live in **`adkit`**. Both are **git dependencies** (not npm) — see Gotchas.

## Commands
- `pnpm dev` — vite dev server (you give the user this; you don't run servers).
- `pnpm build` — `tsc -b && vite build` (the build also injects the paint-shell, below).
- `pnpm lint` / `lint:fix` — **ESLint 9 flat config, type-checked** (typescript-eslint +
  react-hooks + jsx-a11y + react-refresh); `eslint.config.js`. Enforced by a **Husky
  pre-commit** hook (which also regenerates the skeleton on `src/`/`index.html` changes).
  `tsconfig.app.json` also sets `noUnusedLocals`/`noUnusedParameters`, so unused
  vars/params + dead code are **build-breaking** too.
- `pnpm test` — vitest (jsdom). Single file: `pnpm test -- src/path/File.test.tsx`.
- `pnpm snapshot` — regenerate the paint-shell `skeleton.html` from the real app.

## File map
- `src/main.tsx` — entry. **Import order is load-bearing (do not reorder):**
  `./audio-context-init` MUST be first (forces 48kHz before Tone.js lazily
  creates the AudioContext). It then imports the app's own `./styles/index.css`
  (no lib stylesheet — the app owns all design tokens; CQ-4, 2026-06-28). Wraps app
  in `<AdsProvider>`; dev-exposes `window.entitlementStore`.
- `src/MetronomeApp.tsx` — the whole screen. Calls `useMetronome()` (lib) for all
  timing/state and spreads it into presentational components. **Layout = "instrument +
  control deck" (UI-1, 2026-07-05):** a **pulse zone** (dots-arc / mascot swapped by a
  corner ⇄ button via `useCenterpieceView`; the whole pulse **scales as one transform**,
  `scale-100`↔`scale-75`, big when the deck is collapsed) over the transport (`MuteButton`
  + `TransportButton`), then the docked `ControlDeck` (bled `-mx-5`, flush bottom via
  container `pt-4`), then modals. Owns theme, centerpiece-view, deck-expanded, and the
  calibration/about open state. Also calls `useTempoTrainer(m)` (arm/ramp) and
  `useRockMode(m, trainer)`, mounts `<RockMode>`, and gates the trainer row + spacebar to
  `rock.act === 'idle'` so the concert takeover owns the screen while it runs.
- `src/components/` — presentational, take engine state as **props** (so they test
  without `useMetronome()`):
  - `BeatDots.tsx` — the centerpiece beat **arc** (pills curve over the readout).
    Geometry constants at top; measures width via ResizeObserver. `BeatDots.test.tsx`.
  - `BpmControl.tsx` — exports `BpmControl` (steppers + slider + tap) and `TempoReadout`
    (the big Fredoka BPM number at the arc center; `large` prop grows it when the deck
    is collapsed).
  - **`ControlDeck.tsx`** (UI-1) — the docked bottom deck: **tempo always shown**; a grab
    handle expands **meter + feel + swing + About** via the CSS `grid-rows` `0fr↔1fr`
    height animation, **bottom-anchored** (`justify-end`) so content fills up with no
    padding gap. Collapse state persisted by `src/deckState.ts`. `ControlDeck.test.tsx`.
  - `TimeSignaturePicker.tsx`, `FeelControl.tsx`, `TransportButton.tsx`,
    **`MuteButton.tsx`** (mute/unmute; replaced the removed `VolumeControl` — no volume
    slider), **`TrainerButton.tsx`** (transport-side arm/disarm), **`TempoTrainerControl.tsx`**
    (the trainer row: Target/Step/Bars steppers + on/off) — segmented/slider/button controls.
  - **Rock Mode (2026-07-08 → 11):** `RockMode.tsx` — the full-screen punk/glam **concert
    overlay** (launch count-in → climb HUD → victory) mounted by `MetronomeApp`; **reuses the
    real metronome untouched** (`BeatDots` + `TempoReadout`) inside a `.rock-pool` spotlight so
    it stays legible on the dark `.rock-stage` in both themes. `RockstarMascot.tsx` — the
    beat-eater metronome dressed to shred; headbang/swing/strum via a rAF loop **phase-locked to
    the beat clock** (the `MascotHero` pattern; NOT bpm-derived CSS durations — those restart on a
    trainer bump). `RansomText.tsx` — ransom-note lettering. All neon is app-owned tokens
    (`--rk-*` palette, `font-punk`/Anton, `rock-*` animations, `.rock-*` classes). Tests for all
    three + `src/rockMode.test.ts`.
  - **Branding (added 2026-06-25):** `Wordmark.tsx` (the page's single `<h1>`:
    wordmark + `sr-only` descriptive suffix), `Mascot.tsx` (`MascotMark` +
    `MascotHero`, token-filled SVGs), `ThemeToggle.tsx` (sun/moon).
  - **`AboutModal.tsx`** — reads the static `#about-content` (in `index.html`) on
    mount and shows it in a shadcn Dialog (opened by the "About" link at the bottom of
    the expanded `ControlDeck`). The static block is the crawlable SEO copy
    (`display:none`), surfaced to users via the modal.
- **View-state hooks (persisted to `localStorage`, like `theme.ts`):**
  `src/centerpieceView.ts` (`useCenterpieceView` — dots vs mascot) and
  `src/deckState.ts` (`useDeckExpanded` — deck collapsed/expanded, default collapsed).
  Both tested (`*.test.ts`).
- `src/components/ui/` + `components.json` + `src/lib/utils.ts` (`cn`) — **shadcn/ui**
  (full migration CQ-4, 2026-06-28): `button`, `slider`, `toggle`/`toggle-group`,
  `dialog`. Themed via the app's **own** CSS-variable tokens (no lib). Custom bits:
  `Button` `3d`/`transport` variants (the chunky 3D look via `shadow-btn`/`transport`
  + `active:translate-y-press`), `Slider` rebuilt to the old `.metro-range` look on
  Radix parts (`--range-color` defaults to `--primary`; `[--range-color:var(--mint)]`
  for volume), `toggle` cva stripped of stock visuals so segmented items self-style,
  `Dialog` `position="sheet"` variant (bottom-sheet on mobile / centered sm+; AboutModal
  uses default `center`). Deps: `@radix-ui/react-{dialog,slider,toggle,toggle-group,slot}`,
  `class-variance-authority`, `tailwind-merge`, `clsx`, `tailwindcss-animate`.
- `src/theme.ts` — `useTheme()` hook: `light` | `dark` (both "fun" themes; default
  `light`), persisted to `localStorage['metronomnom.theme']`, applied as `theme-*`
  class on `<html>`. **Mirrored by an inline pre-paint script in `index.html` — keep
  them in sync.**
- `src/calibration/` — the app's differentiator (output-latency compensation):
  - `nativeLatency.ts` — platform seam; web provider returns `null`. A future Tauri
    shell swaps `activeNativeLatency` to a Rust provider — the only change needed.
  - `useCalibration.ts` — tap-in state machine (schedules clicks, median of taps).
  - `CalibrationSheet.tsx` — the UI behind the header gear.
- `src/ads.config.ts` — house (placeholder) ad provider; one-line swap to a real
  network. `<AdSlot slot="footer" hideWhenEntitled="removeAds" />` in MetronomeApp.
- `src/styles/index.css` — Tailwind layers + the **app-owned design tokens**: a base
  `:root` (theme-invariant: `--wood`, `--mascot-eye`, `--pop-foreground`, `--overlay`)
  + the **`:root.theme-light` / `:root.theme-dark` palette/font override blocks** (both
  "fun" themes; there is no `theme-playful` class). No `.metro-range` (now the shadcn
  Slider). Nothing imported from the lib.
- `tailwind.config.ts` — maps Tailwind names → the app's **own** CSS vars (colors) and
  defines **size tokens** (`boxShadow`, `fontSize.2xs`, `letterSpacing.label*`,
  `translate.press*`, `borderWidth.thumb`, `maxWidth.arc*`, `maxHeight.dialog`);
  `fontFamily.display` (Fredoka) for the wordmark. Path alias `@` → `src/`.
- `index.html` — fonts (Inter/JetBrains + Fredoka/Baloo 2, loaded non-render-blocking)
  + pre-paint theme script. `#root` is empty in source; at **build** time the
  `inject-skeleton` plugin (in `vite.config.ts`, `apply:'build'`) fills it with
  `<div class="skel">` = the committed **`skeleton.html`**, painted as gray placeholders
  by the `.skel` rules in `index.html`. This is the paint-shell (instant FCP for the
  client-rendered SPA); React's `createRoot` clears it on mount.
- **`skeleton.html`** (committed, generated) + **`scripts/gen-skeleton.mjs`** — the
  generator renders the built app in headless Chromium (`playwright-core`) and snapshots
  the real `#root` DOM, so the skeleton's layout always matches the app (no drift/jump).
  Run via `pnpm snapshot` — which **auto-installs the headless Chromium shell on first
  run** (`playwright-core install chromium --only-shell`, then a fast no-op thereafter),
  so there's no manual setup. The **Husky pre-commit** hook auto-regenerates it when
  `src/` or `index.html` change. (The app can't be SSR'd — Tone.js/AudioContext at
  import need a browser.) Build/Vercel needs no browser — it just reads `skeleton.html`.

## Theming (two "fun" themes: light + dark) — all app-owned (CQ-4)
Themes re-skin the app's **own** semantic CSS variables, not component code, via
`:root.theme-light` (Retro 70s, cream) and `:root.theme-dark` (Warm Dark Playful,
espresso) override blocks in `index.css`. Key accents: `--beat` (regular beats +
readout), `--primary` (brand accent: slider fill, active controls, mascot, accented
beats — consolidated from the old fretboard `--degree-root`), `--pop` (transport,
wordmark "nom", mute), `--info` (status), plus `--shadow` (3D offset) and `--mint`
(volume). Both are "fun": mascot + rounded fonts + chunky 3D controls; no pro theme.
The old `--pearl` "re-tuned dark in light" wart is gone — `--beat` is just defined
per-theme. **3D look** lives in the `Button` `3d`/`transport` variants (token
`shadow-btn`/`shadow-transport` + `active:translate-y-press`). **Sliders** are the
shadcn `Slider` (Radix), fill = `--range-color` (defaults `--primary`; volume sets
`[--range-color:var(--mint)]`). **Rule:** to add a color, add a CSS var + map it in
`tailwind.config.ts`; to add a size, add a named token there — never an inline
`[...]` arbitrary value or a raw color. Nothing is lib-owned (see CLAUDE.md).

## Gotchas
- **Git deps** (`package.json`): `@fretwork/lib` = `github:jrgtwo/fretwork-lib#v0.1.0`,
  `adkit` = `github:jrgtwo/adkit#v0.1.0`. The `v0.1.0` tags **now exist** and install
  works; `pnpm install` would only fail if a referenced tag were missing. Local dev:
  `pnpm link ../fretwork-lib` / `pnpm link ../adkit`. Bump = tag dep repo, then change
  `#vX.Y.Z` here. Both must be reachable at Vercel build time.
- Tests must let **Vite resolve `@fretwork/lib`** (config inlines it via
  `test.server.deps.inline`) — Node's ESM loader rejects the dist directory imports.
- `tests/setup.ts` stubs `ResizeObserver` (jsdom lacks it; BeatDots needs it).
- `void m.toggle()` is the deliberate fire-and-forget async style.
- **No "privacy / no-CDN / no-telemetry" constraint** — that was boilerplate bled in
  from another project; the app uses Google Fonts CDN, FlexOffers, and Vercel. (Corrected 2026-06-26.)
