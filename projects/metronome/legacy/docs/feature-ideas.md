# Feature ideas — brainstorm backlog

_Captured 2026-07-06, grounded in a full sweep of the current app + the `@fretwork/lib`
capability surface. This is a **brainstorm menu** to return to — not a committed plan. The
actionable, prioritized backlog still lives in [`../.claude/working-docs/prioritized-work.md`]
and [`improvement-roadmap.md`]; move an item there (with a P-level) when we decide to build it._

**Tags:** `[app-only]` buildable in this repo now · `[needs-lib]` requires a `@fretwork/lib`
change + version bump · `[backlog: ID]` already tracked in prioritized-work.

## Key finding — the lib exposes a lot the app doesn't use

The app wires only a slice of `useMetronome()`. Unused/underused capabilities that can seed
features (exact names so future work starts fast):

- **Accents** — `setAccents(number[])`, `setAccentEnabled(bool)`, `toggleAccentEnabled()` are in
  the store/hook but never called. `BeatDots`/`MascotHero` already *render* `accents` +
  `accentEnabled`; today they're frozen to each meter's `defaultAccents`.
- **Volume** — `setVolume(v)` / `volume` exist and `volume` is already persisted (`settings.ts`),
  but there is **no UI** — only binary mute.
- **Click voices** — `Metronome.setSounds({ accent?, regular?, subdivision? })` (per-role) with
  `ClickSound = Synth | Sampler | { url }`; `createDefaultClickVoices()`, `ClickRole`. Reachable
  via the unused `m.metronome` instance. No named sample presets ship — supply `{url}` or synths.
- **Notes / drone bus** — `useMetronomeStore` exposes `notesVolume` / `setNotesVolume` over a
  separate `NotesBus`, completely unused. Could drive a sustained reference pitch.
- **Transport** — `Metronome.start(startTick)` (start at an arbitrary tick), `preWarm()`
  (glitch-free first click), `dispose()`. Hook only exposes zero-arg `start`/`toggle`.
- **Events** — the app subscribes to only `measure` + `start`. Also available: `tick`, `accent`,
  `subdivision`, `stop`, `bpmChange`, `timeSignatureChange`, `subdivisionChange`, `swingChange`,
  each with `audioTime` for sample-accurate sync. `currentMeasure` (hook) is also unused.
- **Audio primitives** (calibration surface) — unused: `listOutputDevices()` (device picker;
  offsets are already per-device), `scheduleAtTransportTick`/`clearTransportSchedule` (tick-aligned
  one-shots → auto-stop, scheduled tempo changes, count-in), `getTransportTicks(ppq)`.
- **Cross-over engines** (fretwork side of the barrel, unused here) — `GROOVE_PRESETS`,
  `EventScheduler`, `PatternSource` (drum/backing grooves on the same transport); `useAuthStore`,
  `useCloudSync` (Supabase); `TIERS`/`canCreate` (subscription gating); `VOICE_PRESETS`/`SAMPLE_PACKS`.

## Quick wins (small; lib already supports)

- **Accent pattern editor** `[app-only]` — tap a beat dot to accent/de-accent, plus an accents
  on/off toggle. Uses `setAccents` / `toggleAccentEnabled`; `BeatDots` already renders the state.
  _Likely the highest value/effort item._ Touches `BeatDots.tsx`, a new control, `MetronomeApp`,
  and would finally use the `settings.ts` "accents when editing lands" hook.
- **Click volume slider** `[app-only]` — expose `setVolume`; `volume` is already persisted. Nearly
  free (reuse the shadcn `Slider`, e.g. beside the mute button or in the deck).
- **Typed BPM entry** `[app-only]` — click the readout to type an exact tempo (today: slider/
  stepper/tap only). `TempoReadout` → editable input.
- **Screen wake lock** `[app-only]` `[backlog: FT-4]` — keep the screen awake while playing.
- **Reduced-motion polish** `[app-only]` — the mascot honors `prefers-reduced-motion`; the
  beat-dots pop animation + transitions don't. Small a11y gap.

## Medium

- **Count-in / pre-roll** `[app-only]` `[backlog: FT-6]` — N count-in bars before the metronome
  "really" starts. Doable app-side off the `measure` event; `start(startTick)` + `preWarm()` help
  make the first click glitch-free.
- **Bar counter / practice timer** `[app-only]` — surface `currentMeasure` as a live bar count
  and/or a session stopwatch. Pairs naturally with the tempo trainer.
- **Silent / visual-only practice mode** `[app-only]` `[backlog: FT-9]` — explicit "no audio, just
  the pulse" mode (mute + emphasized visual, optional `aria-live` / haptics).
- **Subdivision click on/off** `[app-only]` — the lib already ships a distinct softer subdivision
  voice; expose a toggle to hear the "and"s.

## Large / marquee

- **Selectable click voices / sound packs** `[needs-lib-ish]` `[backlog: FT-10]` — `setSounds` swaps
  accent/regular/subdivision voices at runtime (synth presets like woodblock/cowbell/beep, or `{url}`
  samples). Needs assets + UI; the per-role API is there. Reachable via `m.metronome` today.
- **Pitched drone / tuning-note layer** `[needs-lib]` — use the unused `notesVolume` / `NotesBus`
  for a sustained reference pitch alongside the click (intonation/drone practice). Distinctive;
  likely needs the hook to re-expose `notesVolume`/`setNotesVolume`.
- **Custom / odd time signatures with groupings** `[needs-lib]` `[backlog: FT-3]` — e.g. 7/8 as
  2+2+3, per-beat accents. The lib excludes custom meters in v1 → lib work + a design pass.
- **Backing-groove / drum-pattern mode** `[needs-lib]` — ride `GROOVE_PRESETS` / `EventScheduler` /
  `PatternSource` on the same transport. Big, but a strong differentiator vs. plain metronomes.
- **PWA / offline install** `[app-only infra]` `[backlog: SEO-10/11]` — manifest + service worker;
  "install to home screen," works offline.
- **Cloud-synced settings / accounts** `[needs-lib]` — `useAuthStore` / `useCloudSync` (Supabase)
  to sync presets across devices. Expands product scope.

## Explicitly parked / declined

- **Presets & setlists (old FT-8)** — dropped by user decision (2026-06-26); was also the planned
  FlexOffers in-app monetization surface. Revisit only if we deliberately reopen it.
