# Project status / archive

Rolling log of completed-or-parked tasks, newest first. Active work lives in
`.claude/working-docs/current-tasks.md`.

---

## 2026-07-06 → 11 — tempo trainer (FT-7) + Rock Mode (the trainer as a concert)

Committed. Build + lint + **212 tests** green.

**FT-7 — tempo trainer (auto-accelerate).** An armable "Tempo trainer" row in the expanded control
deck: while armed + playing, BPM rises by a set step every N bars until it reaches a target, then
holds at target and disarms with a cue (big-readout flash + row highlight). Manual tempo changes
disarm it (never fights the user); target ≤ current at arm disarms silently. A live "+step in N
bars" chip under the BPM number counts down to the next bump. Config `{target,step,interval}`
persists to localStorage **and** URL (`tt/ts/ti`); `enabled` is localStorage-only. New
`src/tempoTrainer.ts` (pure helpers + `useTempoTrainer`) + `src/components/TempoTrainerControl.tsx`,
wired via a `useMetronome({ events:{measure,start} })` ref-bridge with `handleUserBpm` as the disarm
choke point. Built test-first. Commits `489da4c` + `65508df`. Spec:
`docs/superpowers/specs/2026-07-06-tempo-trainer-design.md`.

**Rock Mode — the trainer as a punk/glam concert takeover.** The user wanted the trainer to feel
exciting ("like entering a competition / rock'n'roll mode"), so arming the trainer + Play now runs a
full-screen three-act "show": a meter-scaled **launch count-in** (one measure) → a **climb HUD** →
a **victory payoff**, then it disarms. Hard constraint honored throughout: **the real metronome is
never redrawn** — `BeatDots` + `TempoReadout` are reused verbatim inside a lit **spotlight pool**
(a lens of the per-theme `--background`) so the precise, legible metronome stays the centerpiece on
the dark stage in both themes.

- **The look** (inspiration: Bowie, the Sex Pistols poster, comic speed-lines, a retro glitter
  stage, Sgt-Pepper): flanking Bowie/Ziggy **lightning bolts**, spinning comic **speed-lines**,
  **halftone** texture, Sex-Pistols **ransom-note** lettering (`RansomText.tsx`), Anton condensed
  type, a neon **amp-gain meter**, a punk **STOP**, and a **LEVEL-UP flare** that fires only on a
  real bump.
- **The mascot** (`RockstarMascot.tsx`) — the beat-eater metronome character dressed to shred: a
  flying-V held low (face stays clear), a **lightning bolt over one eye**, a punk **mohawk**, an
  open **shout**. It headbangs, swings its pendulum **from the base** (like a real metronome), and
  strums — **phase-locked to the beat clock** via a single rAF loop (the `MascotHero` pattern,
  reusing `bodySway`/`pendulumAngle`), so a trainer BPM bump re-paces it continuously instead of
  restarting a CSS animation. Performs stage-left during the climb; is the hero of the victory
  screen with confetti.
- **Design system:** all app-owned tokens, zero hardcoded values — a **theme-invariant neon palette**
  (`--rk-pink/blue/yellow/red/cyan/ink/ink-2/outline/paper` → `rk-*` Tailwind tokens), Anton
  `font-punk` (added to the font URLs), rock keyframes/animations, and `.rock-*` component classes
  (multi-layer gradients/masks) in `src/styles/index.css`. Removed the superseded `--stage`/
  `--spotlight`/`--stage-foreground` tokens from the tamer first cut.
- **Files:** `src/rockMode.ts` (pure act state machine + `useRockMode`) + `rockMode.test.ts`;
  `src/components/RockMode.tsx` / `RockstarMascot.tsx` / `RansomText.tsx` (+ tests). Wired in
  `MetronomeApp.tsx` (`useRockMode(m, trainer)`; trainer row + spacebar gated while the show runs).
- Commits `3467fd5`/`9ecb2d3`/`bc8483c` (initial rockstar trainer) → `4a1734c` (v5 punk/glam concert
  + mascot) → `3d56f11` (mascot animation restart-on-bump fix).

---

## 2026-06-28 → 07-02 — design-system ownership (CQ-4), settings (FT-1), tap tempo (FT-2), bookmarkable URL (FT-12)

Committed. Build + lint + **77 tests** green.

**CQ-4 — the app owns its entire design system.** Dropped the `@fretwork/lib/styles/tokens.css`
import; the app now defines every **color** token in `src/styles/index.css` (a base `:root` +
per-theme blocks) and every **size** token in `tailwind.config.ts`. Pruned the unused fretboard
palette; consolidated `--degree-root`→`--primary`; renamed `--pearl`→`--beat`,
`--degree-third`→`--pop`, `--degree-fifth`→`--info`. Tokenized all remaining hardcoded values
(3D shadows, glows, `text-2xs`, letter-spacing, border/max-width, overlay, Mascot colors) — only
structural mechanics remain. Full **shadcn/ui** migration: `Button` (`3d`/`transport` variants),
`Slider` (gradient look rebuilt on Radix), `ToggleGroup` (meter/feel), `CalibrationSheet` →
`Dialog position="sheet"` — cleared both `jsx-a11y` eslint-disables. Resting look preserved
pixel-for-pixel. Absorbed CQ-5/CQ-12, resolved CQ-8. Rewrote `CLAUDE.md` + `ARCHITECTURE.md`.
The lib stays **logic-only** (its own purification is tracked in the lib repo, not here).

**FT-1 — settings persistence.** `src/settings.ts` (`parseSettings` w/ per-field validation,
`serializeSettings` `v:1`, localStorage wrappers, `usePersistSettings(m)` — restore-on-mount +
debounced save) wired into `MetronomeApp`. bpm/meter/subdivision/swing/volume/mute survive reload
via `localStorage['metronomnom.settings']`. Accents deferred to the future accent-editing UI.

**FT-2 — tap tempo.** `src/tapTempo.ts` (`bpmFromTaps` median interval, `pushTap` reset/window,
`useTapTempo` hook) + a Tap button in `BpmControl`; Space also taps, gated while a dialog is open
or a control is focused; no auto-start.

**FT-12 — bookmarkable URL state.** `src/urlState.ts` (`parseUrlSettings`, `buildUrlQuery`
omit-defaults, `useUrlState(m)`) two-way binds the *musical* setup (bpm/meter/subdivision/swing)
to the query string, so the current setup is bookmarkable. A URL with params wins over saved
settings on load; defaults are omitted so an untouched app keeps a clean URL. The win is
bookmarkability (not "sharing"). FT-1/2/12 all built test-first (TDD).

**Note (growth/marketing):** a session exploring "how to get traffic" landed on the real intent —
metronomnom is a **proving ground** for learning to launch apps (memory
`project-is-launch-proving-ground`). Output: `docs/app-launch-runbook.md` (reusable, app-agnostic
launch runbook; metronomnom = test case #1). The superseded brainstorm spec still sits at
`docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md`.

---

## 2026-06-27 session — SEO modal, perf/auto-skeleton, CQ-0/2/3, major upgrades

All verified (build + lint + 36 tests green); committed.

**SEO → utility-page About modal (started CQ-4).** Replaced the below-the-fold SEO slab
with: wordmark as the single `<h1>` (`Wordmark.tsx`, + `sr-only` descriptor); crawlable
copy in a hidden static `#about-content` surfaced via a footer **About** button →
**shadcn Dialog** (`AboutModal.tsx`). Adopted **shadcn/ui** (`components.json`,
`src/lib/utils.ts` `cn`, `src/components/ui/dialog.tsx`) — themed through the existing lib
CSS vars, no tailwind/theme changes. `FAQPage` JSON-LD single-sourced from `#about-content`.

**Perf (from a mobile Lighthouse: Perf 80, FCP 3.0s / LCP 4.1s the only bad metrics).**
Non-blocking Google Fonts (`media=print` swap); code-split the modals (`React.lazy`) +
`tone`/`react` vendor chunks. Kept both analytics (Google `gtag` + `@vercel/analytics`).
Remaining lever (defer Tone.js until Play) needs a lib change.

**Auto-generated paint-shell.** First a hand-written `#ps` skeleton (with inline critical
CSS), then — because it drifted/mismatched (the "120" sat ~60px too high → jarring reload
jump) — replaced with one **generated from the real app**: `scripts/gen-skeleton.mjs`
(`playwright-core`, auto-installs the headless Chromium shell) renders the build and
snapshots `#root` → committed `skeleton.html`; a build-time Vite plugin injects it into
`#root` painted as gray placeholders (`.skel` CSS). Husky pre-commit regenerates on
`src/`/`index.html` changes. Layout now matches within ~3px.

**P0s (the last two).** **CQ-2** — `React.memo` on the beat-independent controls +
`AdSlot`, stabilized the inline `onToggle`; verified those re-render 0× during playback.
**CQ-3** — app-side `navigator.mediaDevices` `devicechange` listener in `useCalibration`
so the sheet updates live on output-device change.

**CQ-0 — linting.** ESLint 9 flat config, **type-checked** (typescript-eslint
`recommendedTypeChecked` + `projectService`) + react-hooks + jsx-a11y + react-refresh;
`pnpm lint`/`lint:fix`; **Husky pre-commit**. Folded in **CQ-6** (`vite.config` →
`vitest/config`, no `as any`); resolved **CQ-7** (the Mascot `exhaustive-deps` disable is
now live). Cleanup: `nativeLatency` `require-await`, CalibrationSheet a11y disables (→ CQ-4).

**Major-version upgrades (Tailwind 4 deferred to CQ-4).** React 18.3 → **19.2** (zero code
changes — already 19-ready), TypeScript 5.7 → **6.0** (dropped deprecated `baseUrl`), Vite
6 → **8.1** + Vitest 3 → **4.1** + plugin-react 4 → **6** (`manualChunks` → `codeSplitting`).

**Mascot "hula" body sway — PAUSED** (user not happy with the look; resumable). Steady
per-beat pendulum/body decoupled from feel/swing; smooth conveyor; note glyphs by feel.
Details in `.claude/working-docs/current-tasks.md`.

---

## Branding + mascot + ads (parked on FlexOffers approval) — archived 2026-06-26

**Goal:** Real visual brand (light/dark "fun" themes), a metronome mascot that
animates in sync with the engine, and ads enabled on metronomnom.com.

**Status at archive:** Branding + mascot **done & verified**. Ads **parked**
pending FlexOffers approval (expected ~by 2026-06-30).

### Done — branding/themes
- Two "fun" themes `light` (Retro 70s) + `dark` (Warm Dark Playful); default
  light. `src/theme.ts` + pre-paint script in `index.html`;
  `:root.theme-light/.theme-dark` blocks + font swaps in `index.css`;
  `fontFamily.display` (Fredoka) in `tailwind.config.ts`.
- `Wordmark.tsx`, `ThemeToggle.tsx` (sun/moon), 3D pushable buttons + themed
  sliders (`--range-fill`, `.metro-range--mint`).
- Meter + Feel rows fit one line (short Feel labels via `FEEL_SHORT`).

### Done — mascot (`Mascot.tsx` + `mascotAnim.ts`)
- Mascot = a **classic wind-up metronome eating notes off a staff** ("Feeding
  in" concept). Explorations in `docs/branding-mockups/mascots/`.
  `MascotMark` = bare metronome (header); `MascotHero` = metronome + staff.
- **Pendulum** swings; **notes** derived from current meter+feel and scroll into
  the mouth. Both **phase-locked to the engine beat clock**
  (`currentBeat`/`currentSubdivisionIndex`) — pure math in `mascotAnim.ts`,
  unit-tested (`mascotAnim.test.ts`). Fixed an accumulator bug that drifted on
  tempo/meter/feel changes by deriving from current position (like BeatDots).
- **Tap the hero to enlarge it in place** (`heroExpanded`): metronome grows,
  BeatDots arc + BPM readout shrink (`TempoReadout` `compact` prop).

### Done — ads groundwork
- Chose **affiliate via FlexOffers** (privacy-clean, audience-matched) over
  AdSense/EthicalAds.
- Added FlexOffers verification `<meta name="fo-verify" …>` to `index.html`.

### Open follow-ups (carried forward)
- **Ads:** once FlexOffers approves (~by 2026-06-30) → get affiliate link → wire
  the footer house-ad `href`/`cta` in `src/ads.config.ts` (one change). Verify
  FlexOffers ownership after deploying the meta tag.
- Mascot polish: tune `X_MOUTH` if note-on-beat looks early/late; swing-feel
  interpolation is approximate between ticks (snaps correct on each tick).
- Consider a "remove ads" purchase (the `removeAds` entitlement seam exists).
- `--pearl` → dedicated `--beat` token in the lib (light theme re-tunes it).
- (User) commit the session's work; redeploy for the fo-verify tag.
