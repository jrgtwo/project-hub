# Product

metronomnom is a free, single-screen, latency-honest web metronome that runs in the browser, with no sign-up and no install. It is live at metronomnom.com (see [launch](launch.md)). Name and brand are in [branding](branding.md).

## Who it is for

Musicians keeping time while they practice, on phone, tablet or desktop. A shareable link also lets a teacher send a student an exact setup.

## Why it exists

metronomnom is a **launch proving-ground**. The goal is to learn and document every stage of launching an app end to end, marketing and traffic included. Making money from a metronome right now is not the goal.

- Treat each launch stage as an experiment, and favor reusable assets (checklists, conventions, templates) that carry over to the next project. The playbook lives in [launch](launch.md).
- Be honest that a metronome is a commodity. Its charm (the mascot, Rock Mode) is the hook, not a feature list. Latency calibration is the app's technical differentiator, but it is not marketed as a selling point.

## What works today

All timing and musical state comes from `@fretwork/lib`'s `useMetronome()`. The app is composition and layout ([architecture](architecture.md)).

### Screen layout: pulse zone and control deck
- **Header:** wordmark with the small mascot mark (`Wordmark.tsx`), theme toggle, and a **Calibrate** button.
- **Pulse zone (the hero):** shows either the **beat-dots arc** around the BPM number (`BeatDots`) or the **mascot** above the BPM number (`MascotHero`). A quiet corner swap button switches between them. The choice persists (`src/centerpieceView.ts`, default dots). The whole pulse scales as one unit: large while the deck is collapsed, smaller while it is expanded.
- **Transport row:** **Mute** (`MuteButton`), **Play/Stop** (`TransportButton`) and **Tempo trainer** (`TrainerButton`), side by side.
- **Docked control deck** (`ControlDeck.tsx`) at the bottom:
  - **Tempo** is always visible: steppers, a slider (40–240 BPM) and a **Tap tempo** button (`BpmControl`).
  - A grab handle ("More" / "Less") expands it to show **Meter**, **Feel + Swing**, and the **About metronomnom** link.
  - Expanded or collapsed state persists (`src/deckState.ts`, default collapsed).

### Metronome controls
- **Meter:** 8 time signatures from the lib's `TIME_SIGNATURES`: 2/4, 3/4, 4/4, 5/4, 6/8, 7/8, 9/8, 12/8 (`TimeSignaturePicker`).
- **Feel:** 7 options: off, straight 8ths, swung 8ths, triplets, straight 16ths, swung 16ths, sextuplets (`FeelControl`). The **Swing** intensity slider only works for the two swung feels.
- **Tap tempo:** the Tap button, or **Space** (`src/tapTempo.ts`). Space is turned off while the About or Calibrate dialog is open and while Rock Mode is running.
- **Mute** silences the click. There is **no volume slider**, by design.

### Tempo trainer (`src/tempoTrainer.ts`)
- Turning on the Tempo trainer button shows a **trainer bar** (`TrainerBar.tsx`) between the transport and the deck. It has three steppers: **Target** (default 140, range 40–240), **Step** (+5, range 1–30) and **Interval** (4 bars, range 1–16).
- While the trainer is on and the metronome is playing, BPM goes up by *step* every *interval* bars, never past the target. When it reaches the target, it holds there and plays a short cue: the BPM readout flashes and the bar highlights.
- A **"+step in N bars" chip** under the BPM number counts down to the next increase.
- A **manual tempo change** (stepper, slider, tap or Space) **restarts the count**. The trainer stays on, and a full interval passes at the new tempo before the next increase. It never yanks the tempo mid-interval and never fights the user.
- If the target is at or below the current BPM, it just holds: no slowing down and no cue. A trainer only speeds up.
- The count starts again each time playback (re)starts.

### Rock Mode (`src/rockMode.ts`, `src/components/RockMode.tsx`)
Pressing Play with the trainer on, and with room left to climb, takes over the whole screen with a three-act punk/glam concert:
1. **Launch:** a count-in lasting one full measure, set by the meter (4 in 4/4, 3 in 3/4), then "GO!".
2. **Climb:** the real metronome sits in a spotlight, with a neon amp-gain meter showing progress from start to target, a LEVEL-UP flare on each BPM increase, a countdown to the next increase, and the shredding mascot (`RockstarMascot.tsx`).
3. **Victory:** "YOU SHREDDED IT", the final BPM and confetti. The show then closes and turns the trainer off.

**Stop** ends the show and leaves the trainer on. **Exit** (✕) stops playback and turns the trainer off. Reduced-motion users still get the show, without the spinning, flashing and bouncing.

**Decision:** the metronome is **never redrawn** in Rock Mode. The real `BeatDots` and `TempoReadout` appear unchanged, so the beat stays the legible, precise centerpiece in both themes. Details are in [architecture](architecture.md).

### Mascot
A wind-up metronome that eats notes. A conveyor of notes, drawn at their rhythmic value, slides into its mouth on the beat. The pendulum and body motion follow a steady beat clock, so it feels like a real metronome and ignores feel/swing. It rests upright when stopped or when the user prefers reduced motion. Character and brand rationale are in [branding](branding.md).

### Themes
Two playful skins, **light** (default) and **dark**, switched with a sun/moon toggle (`ThemeToggle`, `src/theme.ts`). The choice persists and is applied before first paint, so there is no flash. Users do not pick colors. See [branding](branding.md).

### Latency calibration (`src/calibration/`)
The **Calibrate** button opens a sheet (`CalibrationSheet`) that compensates for audio output latency so clicks land on time. It uses the browser-reported output latency plus a per-device offset that the user saves through a **tap-in** flow. Values refresh live when the output device changes. Mechanics are in [architecture](architecture.md).

### Persistence and shareable URLs
- **Saved settings** (`src/settings.ts`): bpm, meter, feel/subdivision, swing, volume and mute survive a reload. Other saved preferences are theme, pulse view, deck state and trainer settings (including whether it is on).
- **Bookmarkable URL** (`src/urlState.ts`): the musical setup (`bpm`, `sig`, `sub`, `swing`) is mirrored to the query string. Values left at their defaults are omitted, so an untouched app has a clean URL. When the trainer is on, the URL also carries `tr=1` plus any non-default `tt`/`ts`/`ti`. When the trainer is off, no trainer params appear. A link's params win over saved settings on load. Personal settings (volume and mute) are kept out of the URL.

### About / FAQ
The About link in the expanded deck opens a dialog (`AboutModal`) showing the crawlable `#about-content` copy from `index.html`: an intro, how to use it, and an FAQ. The wordmark is the page's only `<h1>`. The SEO reasoning is in [launch](launch.md).

### Ads and analytics
- **No ad renders on screen.** The footer ad slot was removed in the single-screen redesign. `adkit`'s `<AdsProvider>` still wraps the app (`src/main.tsx`), and `src/ads.config.ts` holds a house-ad placeholder. Monetization plans are in [launch](launch.md).
- Analytics: Google `gtag` (in `index.html`), `@vercel/analytics` and `@vercel/speed-insights` (`src/main.tsx`).

## Product decisions and why

- **No privacy-first / no-CDN / no-telemetry constraint.** That framing came from boilerplate copied over from another project. It was never a metronomnom goal. The app uses Google Fonts from a CDN, Google and Vercel analytics, third-party affiliate ads, and Vercel hosting. Judge items such as self-hosting fonts on performance, LCP and SEO merits only.
- **One screen, one loud thing.** The beat (the pulse) is the hero, and controls sit quieter in a docked deck. Nothing hides in a modal except About and Calibrate.
- **Mute only, no volume slider.** Device volume covers loudness. Fewer controls keeps the deck quiet.
- **No ad on screen for now.** It was removed with the redesign to keep the single screen clean.
- **Presets and setlists: declined.** Won't be built. That also dropped the planned in-app affiliate placement that would have sat on them.
- **The tempo trainer only speeds up.** No slowing down, no loop-back cycle mode, no auto-stop at the target. It holds at the target and keeps playing until the user stops.
- **The trainer never fights the user.** A manual tempo change re-bases the ramp instead of overriding it.
- **The URL carries only the musical setup.** That includes the trainer when it is on, so a shared link reproduces the practice drill. Personal settings (volume and mute) stay local.
- **Never redraw the metronome.** Rock Mode and any future overlays reuse the real `BeatDots` / `TempoReadout`, so timing stays readable.
