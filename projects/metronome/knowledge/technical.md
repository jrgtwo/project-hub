# Technical

The stack, the two git dependencies, and the technical decisions behind the app, with the reason for each. How the code fits together is in [architecture](architecture.md). Commands and testing are in [development](development.md).

## Stack

Versions are the `package.json` ranges.

| Area | Choice |
| --- | --- |
| UI | React `^19.2.7` (with `react-dom`) |
| Build | Vite `^8.1.0` (Rolldown), `@vitejs/plugin-react` `^6.0.3` |
| Language | TypeScript `^6.0.3`. `tsconfig.app.json` sets `strict`, `noUnusedLocals` and `noUnusedParameters` |
| Styling | Tailwind `^3.4.17` + `tailwindcss-animate`, PostCSS, autoprefixer |
| UI primitives | shadcn/ui on Radix (see [shadcn/ui and Radix](#shadcnui-and-radix)) |
| Icons | `lucide-react` |
| Tests | Vitest `^4.1.9` + jsdom + Testing Library |
| Lint | ESLint `^9.39.4` + `typescript-eslint` (see [Linting gate](#linting-gate)) |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights`, Google `gtag` (see [Analytics](#analytics)) |
| Package manager | pnpm |

**Tailwind stays on 3.4.** Tailwind 4 was left out of the June 2026 major upgrade (React 19, TypeScript 6, Vite 8, Vitest 4). shadcn/ui was then adopted on 3.4, and v4 has not been pursued since. The app's tokens live in `tailwind.config.ts` (`theme.extend`), which is the v3 config model.

## Git dependencies

Two dependencies come from GitHub tags, not npm (`package.json`):

| Dep | Spec | Provides |
| --- | --- | --- |
| `@fretwork/lib` | `github:jrgtwo/fretwork-lib#v0.2.0` | The metronome engine and store (`useMetronome`), time signature and feel helpers, `forceSampleRate`, and the latency and calibration primitives. Used **for logic only.** |
| `adkit` | `github:jrgtwo/adkit#v0.1.0` | `AdsProvider`, `AdSlot`, `entitlementStore`, and ad providers (house, AdSense, EthicalAds, native no-op) |

- **Why git deps:** both are the author's own sibling libraries. Pinning a tag lets the app share their code without publishing to npm. To upgrade, tag the dep repo and change the `#vX.Y.Z` here.
- **`pnpm.onlyBuiltDependencies: ["adkit", "@fretwork/lib"]`:** both repos build their `dist/` in a `prepare` script on install. pnpm runs install scripts only for packages on this allowlist.
- The lib's `dist/` barrel uses directory imports that Node's ESM loader rejects, so `vite.config.ts` inlines it for tests (`test.server.deps.inline`).
- Both repos must be reachable when Vercel builds.

## Decisions

### The app owns its whole design system

Every color is a CSS variable in `src/styles/index.css`, and every size is a named token in `tailwind.config.ts`. No styling comes from `@fretwork/lib`: the app does not import the lib's `styles/tokens.css`, and Tailwind `content` scans only `./index.html` and `./src/**`. **Why:** the lib is a fretboard library. Its palette and tokens belong to another product, and this app needs two "fun" themes plus Rock Mode's neon look. The token rules and theme blocks are in [architecture](architecture.md).

### shadcn/ui and Radix

The primitives in `src/components/ui/` (`button`, `slider`, `toggle`, `toggle-group`, `dialog`) are vendored from shadcn/ui (`components.json`: style `new-york`, `cssVariables`, lucide icons). They sit on `@radix-ui/react-{dialog,slider,slot,toggle,toggle-group}`, with `class-variance-authority`, `clsx` and `tailwind-merge` (`cn` in `src/lib/utils.ts`). **Why:** Radix gives dialog accessibility, slider focus handling and one shared button for free. These replaced hand-rolled versions and cleared the old accessibility lint disables. ESLint skips some rules for `src/components/ui/**`, since that code is vendored.

### Linting gate

ESLint 9 flat config (`eslint.config.js`): `recommendedTypeChecked` from typescript-eslint with `projectService`, plus `jsx-a11y`, `react-hooks` and `react-refresh`. `reportUnusedDisableDirectives: 'error'` fails any stale `eslint-disable`. The Husky pre-commit hook (`.husky/pre-commit`) runs `pnpm lint`. **Why:** type-aware rules such as `no-floating-promises` catch async mistakes. Together with `tsc -b` and the `noUnused*` flags, dead code and type errors block a commit or a build.

### `forceSampleRate(48000)` first

`src/audio-context-init.ts` calls the lib's `forceSampleRate(48000)`, and `src/main.tsx` imports it before anything else. **Why:** some systems report 192 kHz, and that makes the whole Tone.js audio graph do four times the work per sample. 48 kHz is supported everywhere, and the browser resamples once at output. The call has to run before any module triggers Tone's lazy creation of its AudioContext.

### `void` for fire-and-forget

Promises that are intentionally not awaited are written `void m.toggle()` or `void (async () => …)()` (`src/MetronomeApp.tsx`, `src/calibration/useCalibration.ts`). **Why:** it marks the choice in the code, and it satisfies `no-floating-promises`.

### Memoized props

`useMetronome()` re-renders `MetronomeApp` on every tick. Controls that don't change with the beat are wrapped in `React.memo`: `BpmControl`/`TempoReadout`, `TimeSignaturePicker`, `FeelControl`, `TransportButton`, `MuteButton`, `ThemeToggle`, `Wordmark`, `ControlDeck`, `TrainerButton` and `TrainerBar`. Each takes primitives and stable callbacks (store actions, or `useCallback` like `handleToggle`). **Why:** while the metronome plays, those controls don't re-render. Only the beat display follows the clock. A new prop must keep a stable identity.

### Path alias

`@` maps to `src/`, set in both `vite.config.ts` (`resolve.alias`) and `tsconfig.json`/`tsconfig.app.json` (`paths`). shadcn's aliases in `components.json` rely on it.

### Fonts from the Google Fonts CDN

`index.html` loads Anton, Inter, JetBrains Mono, Fredoka and Baloo 2 from Google Fonts without blocking render: a `media="print"` stylesheet switched to `all` on load, `display=swap`, and a `<noscript>` fallback. **Decision:** whether to self-host is judged on performance, LCP and SEO only. There is no privacy, no-CDN or no-telemetry goal. On those grounds the CDN is fine, and self-hosting is only worth doing if a Core Web Vitals audit points to it.

### Analytics

Three are installed: Google Analytics through `gtag` (`index.html`, property `G-Z6ENKCZ67G`), `<Analytics />` from `@vercel/analytics/react`, and `<SpeedInsights />` from `@vercel/speed-insights/react` (`src/main.tsx`). **Decision:** no new third-party SaaS (no analytics vendors, flag services or CDPs). Measurement uses these tools. For example, UTM tags on inbound links are reported by GA4 with no extra software.

### Bundle splitting

`vite.config.ts` uses Rolldown `codeSplitting.groups` to put `tone` and React (`react`, `react-dom`, `scheduler`) in separate vendor chunks for caching. `AboutModal` and `CalibrationSheet` are loaded with `React.lazy`, so they stay out of the first bundle. Tone.js still loads eagerly. Deferring it until the first Play would need a change in the lib.

## `@fretwork/lib` surface

Checked against the installed `v0.2.0` build (`node_modules/@fretwork/lib/dist`).

**Used by the app:**
- `useMetronome({ events })`: state and actions, subscribed to the `measure` and `start` events only. `currentMeasure` is used by Rock Mode, and `setVolume` only to restore saved settings.
- Metronome helpers: `TIME_SIGNATURES`, `subdivisionCount`, `FEEL_OPTIONS`, `FEEL_LABELS`, `feelToSubdivision`, `feelIsSwung`, `deriveFeel`, `DEFAULT_SWUNG_INTENSITY`, and the types `SubdivisionId` and `Feel`.
- Audio and calibration: `forceSampleRate`, `getEffectiveLatencySec`, `getCalibrationOffsetMs`, `setCalibrationOffsetMs`, `clearCalibrationOffset`, `scheduleCalibrationClick`, `installDeviceChangeListener`, `refreshOutputDeviceLabel`, `requestDeviceLabelPermission`, `isOutputBluetooth` and `getCurrentDeviceLabel` (in `src/calibration/useCalibration.ts`).

**Available but unused:**
- **Accents:** `setAccents`, `toggleAccentEnabled` (hook), `setAccentEnabled` (store). `BeatDots`/`MascotHero` already render `accents` and `accentEnabled`. These stay at each meter's defaults.
- **Volume level:** `volume` and `setVolume` exist, and `volume` is persisted, but the only control in the UI is mute.
- **Click voices:** `Metronome.setSounds({ accent?, regular?, subdivision? })` with the `ClickSound` type (Synth, Sampler or `{ url }`), reached through the hook's `metronome` instance. `createDefaultClickVoices` and `ClickRole` exist inside the lib but are not exported from the barrel. No named sample presets ship with it.
- **Notes/drone bus:** `notesVolume`/`setNotesVolume` on `useMetronomeStore`, over an internal `NotesBus`.
- **Transport:** `Metronome.start(startTick?)`, `preWarm()`, `dispose()`. The hook's `start`/`toggle` take no arguments.
- **Events:** `tick`, `accent`, `subdivision`, `stop`, `bpmChange`, `timeSignatureChange`, `subdivisionChange`, `swingChange`.
- **Audio primitives:** `listOutputDevices`, `scheduleAtTransportTick`/`clearTransportSchedule` (one-shot callbacks aligned to a tick) and `getTransportTicks`.
- **Fretwork-side engines in the same barrel:** `GROOVE_PRESETS`, `EventScheduler`, `PatternSource`; `useAuthStore`, `useCloudSync` (Supabase); `TIERS`, `canCreate` (subscription tiers); `VOICE_PRESETS`, `SAMPLE_PACKS`.
