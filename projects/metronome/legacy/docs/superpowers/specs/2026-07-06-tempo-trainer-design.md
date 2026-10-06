# Tempo Trainer (FT-7) — design

_2026-07-06. App-only feature. Brainstormed + planned with the user._

> **Status (2026-07-11): shipped, then extended.** The trainer landed as designed below, then grew
> into **Rock Mode** — the trainer as a full-screen punk/glam concert takeover (launch count-in →
> climb HUD → victory) with a beat-synced shredding mascot, reusing the real metronome untouched in a
> spotlight pool. See `src/rockMode.ts` + `src/components/RockMode.tsx`/`RockstarMascot.tsx`/
> `RansomText.tsx`, and the status docs (`.claude/working-docs/current-status.md`, `docs/STATUS.md`).

## Problem / intent

A tempo trainer is a classic practice tool: play a passage slow, and let the metronome creep the
tempo up as you get it clean. metronomnom has none. FT-7 (P2, feature backlog) adds one.

It's **app-only**: `@fretwork/lib` already exposes a per-measure event (`measure`) and `setBpm`, so
nothing in the lib changes.

## Behavior (locked with user)

- **Ramp to target.** When the trainer is *armed* and the metronome is *playing*, every **N bars**
  do `setBpm(min(currentBpm + step, target))`. When `bpm >= target`, hold at target (keep playing)
  and **disarm**.
- **Reached-target cue.** On reaching target: the toggle flips off, the big BPM readout flashes,
  and the trainer row briefly highlights. Both cues auto-clear.
- **Three knobs + toggle.** Steppers for **Target BPM**, **Step (+BPM)**, **Interval (bars)**, plus
  an on/off toggle. Defaults: target **140**, step **+5**, interval **4**.
- **Manual override disarms.** Any user tempo change — stepper, slider, tap button, or Space — turns
  the trainer **off**. The user takes over; nothing creeps. The trainer never fights the user.
- **Counting.** The bar counter starts when the trainer begins driving (arm-while-playing or
  play-while-armed) and **resets on each playback (re)start**. It only runs while playing (the lib
  emits `measure` only when running), so a stopped metronome inherently pauses the trainer.
- **Edge — target ≤ current at arm.** Disarm **silently** (no ramp-down, no cue). A trainer only
  accelerates.
- **Placement.** An inline row in the **expanded** control deck, under Feel/Swing and above the
  About link — hidden when the deck is collapsed (but stays mounted, like the other deck controls).
- **Persistence.** Config `{target, step, interval}` persists to **localStorage and the URL**
  (`tt`/`ts`/`ti` query keys). The `enabled` flag persists to **localStorage only**, default off,
  never in the URL (so a shared link arrives set-up but not secretly running).

Out of scope (YAGNI): a second level of deck collapse, cycle/loop-back mode, auto-stopping the
metronome at target.

## Architecture

Reuse existing patterns; **no hardcoded colors/sizes** (the app owns its design system — add a CSS
var + tailwind token if a new one is genuinely needed).

### `src/tempoTrainer.ts` — pure helpers + hook (mirrors `settings.ts` / `tapTempo.ts`)

Pure, unit-testable (no audio engine):
- `TrainerConfig = {target, step, interval}`; `TRAINER_DEFAULTS = {target:140, step:5, interval:4}`.
- `clampTarget` (40–240), `clampStep` (1–30), `clampInterval` (1–16).
- `nextTrainerBpm(cur, step, target) = Math.min(cur + step, target)` (hold at target, no overshoot).
- `reachedTarget(cur, target) = cur >= target`.
- Persistence: `parseTrainer` (per-field validation, drops junk — like `parseSettings`),
  `serializeTrainer` (version-stamped), `readStoredTrainer` / `writeTrainer`, key
  `metronomnom.trainer`, blob `{v, target, step, interval, enabled}`. `TRAINER_VERSION = 1`.

`useTempoTrainer(m: TempoTrainerPort)` where `Port = {bpm, isRunning, setBpm}`. Returns:
- config (`target/step/interval`) + clamping setters, `enabled` + `toggleEnabled`/`setEnabled`,
  `applyConfig(partial)` (URL restore path).
- `justReached: boolean` (drives the cue; a tracked `setTimeout` clears it).
- `handleUserBpm(bpm)` — the **disarm choke point**: if armed, `setEnabled(false)`, then
  `m.setBpm(bpm)`.
- `driver = {onMeasure, onStart}` — stable identity (all live values held in refs), so the
  MetronomeApp ref-bridge always calls current closures. `onMeasure` gates on armed+running, counts
  bars, on the Nth bar computes `nextTrainerBpm` and calls `m.setBpm` **directly** (so the trainer's
  own step never disarms itself — the distinction from `handleUserBpm` is structural), and on reach
  disarms + fires the cue. `onStart` resets the bar counter.

Config lazy-inits from localStorage; a debounced effect writes on change (`SAVE_DEBOUNCE_MS` idiom).

### `src/components/TempoTrainerControl.tsx` — presentational (`memo`)

Props: `enabled`, `target`, `step`, `interval`, `onToggle`, `onTarget`, `onStep`, `onInterval`,
`justReached`. A labeled block (`flex w-full flex-col items-center gap-2`, label
`font-mono text-2xs uppercase tracking-label text-muted-foreground`) with an icon on/off toggle
(`Button variant="3d" size="icon"`, `aria-pressed`, `text-pop` when on — MuteButton idiom) and three
compact steppers (BpmControl idiom: `Minus`/`Plus` `Button variant="3d" size="icon"` around a
`tabular-nums` value, `onClick={() => onTarget(target + delta)}`). Root highlight via
`clsx(justReached && 'bg-pop/10 ring-2 ring-pop')` + a color/shadow transition (auto-clears when
`justReached` flips back).

### Wiring

- **`MetronomeApp.tsx`** — ref-bridge: `useMetronome({ events: { measure: e =>
  driverRef.current?.onMeasure(e), start: () => driverRef.current?.onStart() } })`; then
  `const trainer = useTempoTrainer(m); driverRef.current = trainer.driver;`. Pass
  `onBpm={trainer.handleUserBpm}` to `<ControlDeck>` (the single BPM choke point). Pass
  `flash={trainer.justReached}` to the two large `TempoReadout`s. `useUrlState(m, trainer)`.
- **`ControlDeck.tsx`** — thread the trainer props (flat); render `<TempoTrainerControl/>` after
  `<FeelControl>`, before the About button.
- **`urlState.ts`** — extend the single URL authority (no second `replaceState` writer):
  `useUrlState(m, trainer?)`; keys `tt/ts/ti` with `TRAINER_URL_DEFAULTS = TRAINER_DEFAULTS`;
  `buildUrlQuery`/`parseUrlSettings` handle them (omit at default); on mount call
  `trainer?.applyConfig(...)` so a link wins over localStorage; extend the write-effect deps.
- **`BpmControl.tsx`** — `TempoReadout` gains `flash?: boolean`; when true add `animate-bpm-flash`.
- **`tailwind.config.ts`** — add a `bpm-flash` keyframe + animation reusing `--beat`↔`--pop`
  (no new color token).

## Tests

- `src/tempoTrainer.test.ts` — pure math, `parseTrainer` valid/corrupt/partial + round-trip +
  version, localStorage round-trip, hook via `renderHook` + fake timers with a mock `m` (drive
  `driver.onMeasure`: steps on the Nth bar, holds at target, disarms + `justReached` true→false,
  no-op when disarmed/stopped, `onStart` resets, `handleUserBpm` disarms + calls `setBpm`, setter
  clamping, target ≤ current → silent disarm).
- `src/urlState.test.ts` (extend) — `tt/ts/ti` round-trip + default-omission; on-mount `applyConfig`
  from a query; debounced write reflects/strips trainer config.
- `src/components/TempoTrainerControl.test.tsx` — renders label + toggle + 3 steppers; callbacks fire
  with correct args; `aria-pressed` reflects `enabled`; `justReached` adds the highlight class.
- `src/components/ControlDeck.test.tsx` (extend) — add trainer props to `base`; assert the row
  renders when expanded.

## Verification

`pnpm test` / `pnpm build` / `pnpm lint` green. Manual `pnpm dev`: expand deck → trainer row under
Feel; set target 130 / step 5 / interval 2, Play + arm → BPM steps +5 every 2 bars to 130, then
readout flashes + row highlights + toggle off; while armed, nudge slider/tap/Space → disarms, BPM
obeys; reload → config restored (enabled off); open a `?tt/ts/ti` link fresh → config applied,
`enabled` absent from URL. Tune flash/highlight timing + look live.
