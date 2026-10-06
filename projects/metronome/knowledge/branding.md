# Branding

The app's name, domains, brand direction, themes, wordmark and mascot. How themes are applied and how the mascot animates live in [architecture](architecture.md).

## Name

**`metronomnom`**: *metronome* + "nom nom", a character that happily "noms" each beat.

- Wanted: playful, coined (not an existing name), aimed at musicians, not abstract or awkward-sounding.
- The sweet spot was the "metronom-nom" zone: clearly a metronome plus one light, fun twist.
- Used everywhere as one lowercase word: `<title>`, Open Graph/Twitter meta and JSON-LD in `index.html`, `public/favicon.svg` and `public/og.svg` labels, the About dialog title, and the `metronomnom.<feature>` localStorage key prefix (`src/theme.ts`, `src/settings.ts`, …).

### Rejected names

- **Metronaut**: already a company.
- **Metrognome**: already taken, but its mascot-pun spirit set the direction.
- **Pendulum names** (Pendo, Sway, Pendarc…): read off-putting, a bit vulgar. The whole pendulum angle was dropped.
- **Over-silly food names** (Munchrome, Chomptempo, Beatburger…): too far, too abstract.

## Domains

- **Canonical: `metronomnom.com`**: no hyphens, cleanest and most brandable; the first chunk reads as "metronom". The code references only this domain: `<link rel="canonical">`, `og:url`, `og:image`/`twitter:image` (`/og.png`) and JSON-LD `url` in `index.html`; `public/sitemap.xml`; the sitemap line in `public/robots.txt`.
- **Redirect domains (decision): `metro-nomnom.com` and `metro-nom-nom.com`** redirect to canonical. All three spell the same 11 letters. Nothing in the repo references them; whether they are registered is unverified.

## Brand direction

- **Playful, mascot-driven**: a creature that eats the beat. Chosen over a "pro instrument" tone and a "balanced wink" middle ground after comparing mockups of all three.
- **Known tension:** the nom-nom vibe leans "fun consumer app," which pulls against a serious-musician audience. The app keeps the precise metronome legible: the default centerpiece is the beat-dots arc and BPM readout, and the mascot is an optional view. The audience fit is not settled. See [product](product.md).

## Themes

A light/dark pair, **both "fun"**: mascot, rounded type, chunky 3D controls. There is no separate "pro" theme. **Users don't pick colors**, only light or dark, through the sun/moon toggle in the header (`src/components/ThemeToggle.tsx`). Why: the playful direction was the clear favorite, so the pair is two takes on it rather than a pro/playful split.

| Theme | Name | Look | Default |
| --- | --- | --- | --- |
| `light` | **Retro 70s** | warm cream; mustard / burnt orange / avocado | yes |
| `dark` | **Warm Dark Playful** | dim espresso; amber / strawberry / mint | no |

Key accent tokens (`src/styles/index.css`, `:root.theme-light` / `:root.theme-dark`):

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--primary` | brand accent: tempo slider fill, active controls, mascot, accented beats | mustard | amber |
| `--pop` | secondary accent: transport button, wordmark "nomnom", mute | burnt orange | strawberry |
| `--mint` | defined but currently unused in `src/` (was the volume slider, removed in the single-screen redesign) | avocado | mint |
| `--beat` | regular beat pills + readout | dark brown on cream | cream |
| `--info` | status accent (Bluetooth indicator) | sage | sage |

- Type: rounded faces in both themes: **Fredoka** (`font-display`, the wordmark and readout/mono labels) and **Baloo 2** (body).
- Theme-invariant brand color: `--wood` (mascot base and pendulum shading).
- Rock Mode has its own theme-invariant neon palette (`--rk-*`) and the **Anton** poster face (`font-punk`).
- Mechanism (the `<html>` class, the pre-paint script, the token rules): [architecture](architecture.md).

## Wordmark

`src/components/Wordmark.tsx`: the bare-metronome mark (`MascotMark`), then `metro` + **`nomnom`** in `--pop`, set in `font-display` (Fredoka). It is the page's single `<h1>`, with a screen-reader-only " — Free Online Metronome" suffix. It takes its colors from theme tokens, so it works in both themes without branching.

The favicon (`public/favicon.svg`) is the same metronome mascot in fixed colors on a dark rounded square, because a favicon can't follow the app theme.

## Mascot

**A classic wind-up metronome that eats notes off a music staff** ("Feeding in" concept). Early Pac-Man-like drafts were rejected because they read as eating nothing.

- **`MascotMark`** (`src/components/Mascot.tsx`): the bare metronome, static, in the header wordmark.
- **`MascotHero`**: the metronome plus a live staff. The pendulum swings and notes (built from the current meter and feel) scroll into its mouth, **phase-locked to the engine's beat clock**. It is the alternative centerpiece: a corner swap button toggles between the beat-dots arc (default) and the mascot.
- **Rock Mode rockstar** (`src/components/RockstarMascot.tsx`): the same character dressed to shred, with a flying-V guitar, a Bowie/Ziggy lightning bolt over one eye, a punk mohawk and an open shout. It headbangs, swings its pendulum and strums in time. It is decorative only; the real metronome stays the timing reference. Rock Mode itself is described in [product](product.md).
- Animation mechanics (the rAF loop, `mascotAnim.ts`): [architecture](architecture.md).

## Mockups

The exploration mockups are self-contained HTML files, archived with the retired planning docs:

- `1-pro.html`, `2-balanced.html`, `3-playful.html`, `index.html`: the three tone directions.
- `palettes/`: `parchment.html` (Muted Parchment), `dark.html` (Warm Dark Playful), `retro.html` (Retro 70s). These are calmer palettes for the playful direction, because the first cream was too bright.
- `mascots/`: `classic-staff.html` (the chosen concept), `variations.html`.
