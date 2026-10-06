# Architecture

How metronomnom works: what lives where, how state flows, and the mechanisms behind the screen. Stack versions and dependency rationale are in [technical](technical.md); commands, testing and deploy are in [development](development.md).

## The three-package split

| Package | Owns | Consumed as |
| --- | --- | --- |
| this app | Composition, layout, the whole design system, calibration UI, trainer + Rock Mode, persistence | — |
| `@fretwork/lib` | Timing engine, audio (Tone.js), the shared metronome store, calibration primitives | Git dependency, **logic only** (no styles imported) |
| `adkit` | Ad slots, providers, entitlement store | Git dependency |

**To change timing or state behavior, change the lib, not this app.**

## Data flow

- `src/MetronomeApp.tsx` calls `useMetronome()` from the lib. It wires the shared store to the engine singleton and returns all metronome state and actions (`bpm`, `timeSignature`, `currentBeat`, `currentMeasure`, `currentSubdivisionIndex`, `isRunning`, `setBpm`, `toggle`, `stop`, …).
- The app spreads that object into **presentational components** (`src/components/`). They take engine state as props, so they test without the engine.
- App-side hooks take a narrow "port" slice of the `useMetronome()` result, not the whole object: `usePersistSettings(m)`, `useTempoTrainer(m)`, `useUrlState(m, trainer)`, `useRockMode(m, trainer)`. The order in `MetronomeApp` matters: settings restore runs first, then the URL is applied so a link wins over saved settings.
- **Engine events → trainer:** `useMetronome({ events: { measure, start } })` forwards events through a ref (`trainerDriverRef`) to the trainer's stable `driver`. The ref is assigned after `useTempoTrainer` returns.
- **One BPM choke point for user gestures:** the deck's `onBpm` is `trainer.handleUserBpm`, not `m.setBpm`. Steppers, slider, tap and Space all go through it. The trainer's own steps call `setBpm` directly.

## Entry: `src/main.tsx`

**Import order is load-bearing. Do not reorder.**

1. `import './audio-context-init'` **must be first**. It calls `forceSampleRate(48000)` before any module triggers Tone.js's lazy `AudioContext` creation. Some systems report 192 kHz, which quadruples per-sample work.
2. The app's own `./styles/index.css` defines every design token. No lib stylesheet is imported.

The render tree is `<StrictMode>` → `<AdsProvider config={adsConfig}>` → `<MetronomeApp/>` + Vercel `<Analytics/>` + `<SpeedInsights/>`. In dev, `window.entitlementStore` is exposed for testing the ad-hide seam from the console.

## Screen layout (`MetronomeApp.tsx`)

"Instrument + control deck." One screen, top to bottom:

1. **Header:** `Wordmark` (the page's single `<h1>`, with `MascotMark`), `ThemeToggle`, and a **Calibrate** button that opens the calibration sheet.
2. **Pulse zone (the hero):** either the `BeatDots` arc wrapping `TempoReadout`, or `MascotHero` above `TempoReadout`. A quiet corner ⇄ button switches between them (`useCenterpieceView`). The container height is fixed per deck state (`CENTERPIECE_H` 244 when the deck is expanded, `CENTERPIECE_H_LG` 340 when collapsed). The whole pulse **scales as one transform** (`scale-100` collapsed, `scale-75` expanded), so the beat markers stay crisp and in sync and never overflow.
3. **Transport row:** `MuteButton` · `TransportButton` (play/stop) · `TrainerButton` (enter/exit trainer mode).
4. **Trainer bar** (`TrainerBar`): shown only while `trainer.enabled && rock.act === 'idle'`.
5. **Control deck** (`ControlDeck`): docked at the bottom. It bleeds to the edges (`-mx-5`) and sits flush to the bottom. **Tempo (`BpmControl`) is always visible.** A grab handle ("More"/"Less") reveals **Meter + Feel (including swing) + the "About metronomnom" link** using the CSS `grid-rows` `0fr↔1fr` height animation. The content is bottom-anchored (`justify-end`), so it fills upward with no gap. The expanded state is persisted (`useDeckExpanded`, collapsed by default).
6. **Modals:** `AboutModal` and `CalibrationSheet` are `React.lazy` chunks, mounted only while open.
7. **`<RockMode>`:** always mounted. It renders `null` when idle.

Spacebar tap-tempo is gated off while either modal is open or the concert runs (`spacebarEnabled` on `ControlDeck`).

## BeatDots arc (`src/components/BeatDots.tsx`)

- **One continuous arc, always.** Beats and subdivisions sit evenly on an arc centered at 12 o'clock of a circle whose center is the BPM readout (passed as `children` into a center slot). Few beats give a shallow curve. More beats open the arc down the sides, so large meters and fine subdivisions (worst case 12/8 × sextuplets) stay on screen.
- Main beats are pills (accents longer, using `--primary`). Subdivisions are small pills. Each pill points outward, with its inner end on the arc. Lit pills use `animate-beat-pop`.
- **Geometry constants** are at the top of the file: `SPACING` 22px desired arc length, `MAX_SPAN` 265°, `R_MIN`/`R_MAX` 64/150, pill sizes. Past the max span, spacing compresses and pills scale down.
- The component measures its own width with `ResizeObserver` to derive the radius (`FALLBACK_WIDTH` 360 before measuring and in jsdom).
- Active state comes straight from engine props (`currentBeat`, `currentSubdivisionIndex`).

## Mascot animation (`Mascot.tsx`, `mascotAnim.ts`)

- `MascotMark` is the static bare metronome in the wordmark. `MascotHero` is the animated centerpiece: a wind-up metronome eating a meter/feel-derived stream of notes off a staff.
- **Beat clock, not CSS durations.** One `requestAnimationFrame` loop drives the pendulum, the body sway and the note conveyor. They are derived each frame from the **current** engine position: a monotonic beat counter plus the fraction of the beat elapsed since the last beat change (`beatDurationMs(bpm, denominator)`). Nothing accumulates, so tempo, meter and feel changes re-anchor immediately.
- Pendulum and body run one steady swing per counted beat, so they ignore subdivisions and swing (a real-metronome feel). Note glyphs follow the feel (`noteFlags`).
- The pure math in `mascotAnim.ts` (`pendulumAngle`, `bodySway`, `bodyOffset`, `bodyBob`, `bodyPath`, `conveyorTranslate`) is unit-tested.
- The mascot rests when stopped, when `bpm <= 0`, or when `prefers-reduced-motion` is set.

## Tempo trainer (`src/tempoTrainer.ts`)

`useTempoTrainer(m)` is a **mode** toggled by `TrainerButton`. While the mode is on and the metronome is playing, it raises BPM by `step` every `interval` bars until it reaches `target`, then **holds at target and stays in the mode**.

- **Pure helpers** (unit-tested): `nextTrainerBpm` = `min(cur + step, target)`, `reachedTarget`, clamps (target 40–240, step 1–30, interval 1–16), `parseTrainer`/`serializeTrainer`. Defaults are `TRAINER_DEFAULTS` = target 140, step +5, interval 4 bars.
- **Driver:** `driver.onMeasure` counts bars. It skips the opening downbeat of each cycle as the baseline, and on the Nth bar it steps BPM. On reaching the target it fires the `justReached` cue: a `TempoReadout` flash plus a `TrainerBar` highlight, cleared after `CUE_MS`. `driver.onStart` resets the counter.
- **Manual tempo change re-bases** (`handleUserBpm`): it resets the bar window so a full interval elapses at the new tempo. It does **not** leave the mode.
- If the target is ≤ the current BPM there is nothing to climb: the trainer holds with no cue and no ramp-down.
- `barsUntilNext` (counting `interval`→1, or `null` when not counting) feeds the "+step in N bars" hint in `TempoReadout`.

## Rock Mode (`src/rockMode.ts`, `src/components/RockMode.tsx`)

Trainer mode on + Play + room to climb starts a full-screen punk/glam **concert takeover**.

- **Act state machine** (`nextAct`, pure): `idle → launch → climb → victory → done`. Stopping or disarming returns to `idle` from any act.
  - `launch`: a beat-synced count-in of **one measure** (the time signature's numerator).
  - `climb`: progress meter, LEVEL-UP flare on each real BPM bump (`levelUpKey`), next-bump marquee.
  - `victory`: holds `VICTORY_MS` (3.5 s), then `done`.
  - `done`: the hook **disarms the trainer**, which returns the machine to `idle`.
- `useRockMode(m, trainer)` derives the act from live signals each render. It captures the start BPM and start beat on the idle→launch edge, runs the victory timer, and disarms on `done`.
- **Exits:** Stop (`m.stop`) closes the show and the trainer stays armed. Exit (button or Escape) stops and disarms.
- **Never redraw the metronome.** The overlay reuses the real `BeatDots` + `TempoReadout` verbatim, inside a lit `.rock-pool` spotlight (a lens of the per-theme `--background`) on the dark `.rock-stage`. That keeps the metronome legible in both themes.
- `RockstarMascot.tsx` uses the same beat-clock pattern as `MascotHero`: one rAF loop phase-locked to a monotonic beat counter, reusing `bodySway`/`pendulumAngle` for headbang, base-pivot pendulum swing and strum. CSS `animation-duration` derived from BPM is deliberately avoided, because it restarts the animation on every trainer bump. A BPM change only re-reads the pace.
- `RansomText.tsx` renders the ransom-note lettering.
- `RockMode` is purely presentational: all state arrives as props.

## Calibration (`src/calibration/`)

Compensates for audio output latency so beats land on time. The latency sources, in priority order:

1. **Native OS latency** via the `NativeLatencyProvider` seam (`nativeLatency.ts`). The web provider always returns `null`. A future Tauri shell swaps `activeNativeLatency` for a provider that calls Rust (`AVAudioSession.outputLatency`). That swap is the **only** change calibration needs.
2. **Browser `AudioContext.outputLatency` + a saved per-device offset** from the manual tap-in.

The engine applies the lib's `getEffectiveLatencySec()` = browser outputLatency + saved offset. The lib stores the offset per output device in `localStorage['fretwork:audio-cal:<device label>']` (`get/setCalibrationOffsetMs`).

- `useCalibration.ts`: the tap-in state machine. It schedules clicks on the audio clock (`scheduleCalibrationClick`), collects tap deltas, takes a running median, and listens for `devicechange` so the sheet updates when the output device changes.
- `CalibrationSheet.tsx`: the UI behind the header's Calibrate button, a `Dialog position="sheet"`.

## Theming and the design system

- **Two themes, `light` (default) and `dark`**, applied as a `theme-light`/`theme-dark` class on `<html>`. `src/theme.ts` (`useTheme`) toggles the class and persists the choice.
- **Pre-paint script:** an inline `<script>` in `index.html` reads `metronomnom.theme` and adds the class before first paint, which avoids a palette flash. **It mirrors `theme.ts`, including the storage key and default, so keep the two in sync.**
- **Colors** are app-owned CSS variables in `src/styles/index.css`:
  - theme-invariant tokens in the base `:root` (`--wood`, `--mascot-eye`, `--pop-foreground`, `--overlay`, the `--rk-*` Rock Mode neon palette);
  - themed tokens in the `:root.theme-light` / `:root.theme-dark` blocks (`--beat`, `--primary`, `--pop`, `--info`, `--mint`, `--shadow`, and the shadcn semantics like `--background`, `--card`, `--muted`, `--ring`).
  - `tailwind.config.ts` maps Tailwind color names onto them.
- **Sizes** are named tokens in `tailwind.config.ts`: `boxShadow` (`btn`, `transport`, `transport-play*`, `deck`, `thumb`, `glow-*`), `fontSize.2xs`, `letterSpacing.label*`, `translate.press*`, `borderWidth.thumb`, `maxWidth.arc*`, `maxHeight.dialog`. Fonts are `display` (Fredoka) and `punk` (Anton). Keyframes and animations also live there (`beat-pop`, `bpm-flash`, `rock-*`).
- **Rule:** to add a color, add a CSS var and map it in `tailwind.config.ts`. To add a size, add a named token there. Never use an inline `[...]` arbitrary value or a raw color. The only arbitrary values are structural mechanics (centering, Radix `data-[state]`, `transition-[property]`, the slider's `--range-color` var). Nothing is lib-owned.
- **UI primitives are shadcn/ui** (`src/components/ui/`: `button`, `slider`, `toggle`, `toggle-group`, `dialog`; `cn` in `src/lib/utils.ts`; `components.json`), themed through the app's tokens:
  - The chunky 3D look is the `Button` `3d`/`transport` variants (`shadow-btn`/`shadow-transport` + `active:translate-y-press`).
  - `Slider` fill and thumb use `--range-color`, which defaults to `--primary`.
  - `Dialog` has a `position="sheet"` variant: a bottom sheet on mobile, centered from `sm` up.
  - Meter and Feel are `ToggleGroup`s.
- Rock Mode's look is app-owned tokens like everything else: `--rk-*` → `rk-*` Tailwind colors, `font-punk`, `rock-*` animations, and `.rock-*` component classes (`.rock-stage`, `.rock-pool`, `.rock-speed`, `.rock-halftone`, `.rock-meter`, …) in `index.css`.

## Persistence

**localStorage** (`metronomnom.<feature>` convention; every read and write is wrapped for private mode):

| Key | Owner | Holds |
| --- | --- | --- |
| `metronomnom.theme` | `src/theme.ts` (+ `index.html` pre-paint) | `light` / `dark` |
| `metronomnom.settings` | `src/settings.ts` (`usePersistSettings`) | `{v, bpm, timeSignatureId, subdivision, swing, volume, clickMuted}`, debounced save |
| `metronomnom.trainer` | `src/tempoTrainer.ts` | `{v, target, step, interval, enabled}`, debounced save |
| `metronomnom.centerpiece` | `src/centerpieceView.ts` | `dots` (default) / `mascot` |
| `metronomnom.deck` | `src/deckState.ts` | `open` / `closed` (default closed) |
| `fretwork:audio-cal:<device>` | `@fretwork/lib` | calibration offset (ms) per output device |

**URL query** (`src/urlState.ts`, `useUrlState`, the single URL writer):

- The musical setup is mirrored with debounced `replaceState`: `bpm`, `sig`, `sub`, `swing`. Values at their default are omitted, so an untouched app has a clean URL.
- The trainer rides along **only while its mode is on**: `tr=1`, plus `tt` (target), `ts` (step) and `ti` (interval) when they differ from the defaults.
- Params in the URL win over saved settings on load.
- Volume and mute never go in the URL.

## Paint-shell skeleton

The app is client-rendered and can't be server-rendered, because Tone.js and `AudioContext` need a browser at import. To paint instantly, the build fills `#root` with a gray snapshot of the real app:

- `scripts/gen-skeleton.mjs` (`pnpm snapshot`) builds the app, serves it with `vite preview`, renders it in headless Chromium (`playwright-core`, 412×1000 viewport), and writes the mounted `#root` DOM to the committed **`skeleton.html`**.
- The `inject-skeleton` plugin in `vite.config.ts` (`apply: 'build'`) wraps `skeleton.html` in `<div class="skel" aria-hidden="true">` inside `#root`. In dev, or when there is no snapshot, `#root` stays empty.
- The `.skel` rules in an inline `<style>` in `index.html` paint that DOM as flat gray placeholders, with per-theme literal grays. React's `createRoot` clears it on mount.
- The Husky pre-commit hook regenerates `skeleton.html` when staged changes touch `src/` or `index.html`. Vercel needs no browser; the build just reads the file. See [development](development.md).

## About content

`index.html` holds a hidden, crawlable `#about-content` block, the single source for the SEO copy, and an `FAQPage` JSON-LD that must mirror it. `AboutModal.tsx` reads `#about-content` on open and shows it in a shadcn `Dialog`. The modal is opened from the link at the bottom of the expanded deck.

## Ads wiring

- `src/main.tsx` wraps the app in `<AdsProvider config={adsConfig}>`.
- `src/ads.config.ts` uses adkit's **house provider** (a placeholder), with a `footer` slot configured.
- **No `<AdSlot>` is rendered anywhere**: the footer slot was removed from the single-screen layout.
- To show an ad, render `<AdSlot slot="footer" hideWhenEntitled="removeAds" />` and, for a real network, swap the provider in `ads.config.ts`.

Monetization choices are in [launch](launch.md).

## File map (`src/`)

```
main.tsx                  entry; load-bearing import order; AdsProvider + Vercel analytics
audio-context-init.ts     forceSampleRate(48000) before Tone's lazy AudioContext
MetronomeApp.tsx          the whole screen; useMetronome() + app hooks; layout
ads.config.ts             adkit house provider + footer slot config
theme.ts                  useTheme(): theme-* class on <html>, persisted
centerpieceView.ts        useCenterpieceView(): dots | mascot, persisted
deckState.ts              useDeckExpanded(): deck open/closed, persisted
settings.ts               usePersistSettings(): musical + volume/mute to localStorage
urlState.ts               useUrlState(): musical setup + trainer ↔ query string
tapTempo.ts               bpmFromTaps (median), pushTap, useTapTempo (button + Space)
tempoTrainer.ts           trainer pure helpers + useTempoTrainer()
rockMode.ts               act state machine (nextAct) + useRockMode()
lib/utils.ts              cn() (shadcn)
styles/index.css          Tailwind layers, all color tokens, theme blocks, .rock-* classes
calibration/
  nativeLatency.ts        native-latency seam (web → null)
  useCalibration.ts       tap-in state machine, device-change listener
  CalibrationSheet.tsx    calibration UI (Dialog sheet)
components/
  BeatDots.tsx            beat arc with center slot
  BpmControl.tsx          BpmControl (steppers + slider + tap) and TempoReadout (big BPM, trainer hint, flash)
  ControlDeck.tsx         docked collapsible deck
  TimeSignaturePicker.tsx, FeelControl.tsx   meter / feel+swing ToggleGroups
  TransportButton.tsx, MuteButton.tsx, TrainerButton.tsx   transport row
  TrainerBar.tsx          trainer config steppers (target / step / bars)
  RockMode.tsx, RockstarMascot.tsx, RansomText.tsx   concert takeover
  Mascot.tsx, mascotAnim.ts                           MascotMark / MascotHero + pure anim math
  Wordmark.tsx, ThemeToggle.tsx, AboutModal.tsx
  ui/                     shadcn: button, slider, toggle, toggle-group, dialog
```

Tests sit next to their sources as `*.test.ts(x)`. The harness is `tests/setup.ts`. Outside `src/`: `index.html` (pre-paint theme script, `.skel` CSS, `#about-content`, JSON-LD), `vite.config.ts` (`@` → `src/` alias, `inject-skeleton`, vitest config), `tailwind.config.ts`, `scripts/gen-skeleton.mjs`, `skeleton.html`, `.husky/pre-commit`.
