# App name — decision summary

_Captured 2026-06-25, for a follow-up branding/design pass in a later session._

## Decision

**Name: `metronomnom`** (playful pun on *metronome* + "nom nom" — a little
character that happily "noms" each beat).

**Domains** (spelling verified — all three collapse to the same 11 letters
`metronomnom`):

- `metronomnom.com` — **canonical** (no hyphens; cleanest, most brandable; the
  first chunk reads as "metronom", reinforcing the metronome).
- `metro-nomnom.com` — register as a **redirect** to canonical.
- `metro-nom-nom.com` — register as a **redirect** to canonical.

> Availability was **not** checked — verify at a registrar before purchase.

## How we landed here

Goal: playful, coined (not an existing name), aimed at **musicians**, not
abstract or awkward-sounding.

Explored and rejected:
- **Metronaut** — already a company.
- **Metrognome** — already taken, but its mascot-pun spirit set the direction.
- **Pendulum-based** names (Pendo, Sway, Pendarc…) — read off-putting / a bit
  vulgar. Dropped the whole pendulum angle.
- **Over-silly food names** (Munchrome, Chomptempo, Beatburger…) — too far,
  too abstract.
- The sweet spot turned out to be the **"Metronom-nom"** zone: clearly a
  metronome + one light, fun twist.

## Brand direction (for the design pass)

- **Tone:** playful, mascot-driven — a creature that eats/noms the beat.
- **Known tension to resolve:** the nom-nom vibe leans "fun consumer app,"
  which pulls against a serious-musician audience. Decide how far to lean
  playful vs. dial it back toward a pro tool.

## Direction chosen (2026-06-25)

First explored three tone mockups (`docs/branding-mockups/`: Pro Instrument /
Balanced Wink / Playful Mascot) → chose the **playful** end. Then explored three
calmer palettes for it (`docs/branding-mockups/palettes/`: Muted Parchment / Warm
Dark Playful / Retro 70s) because the first cream was too bright.

**Final decision: a light/dark pair, BOTH "fun"** (mascot + rounded type + chunky
3D controls). No separate "pro" theme; end users don't pick colors — just light/dark.
- **`light`** — **Retro 70s**: warm cream, mustard / burnt-orange / avocado. *Default.*
- **`dark`** — **Warm Dark Playful**: dim espresso, amber / strawberry / mint.

Both show the beat-eater mascot (mark in the wordmark + a hero below the tempo
readout), the `metro`+accent`nomnom` rounded wordmark, 3D pushable buttons, and
themed sliders (amber/mustard tempo fill, mint/avocado volume, white thumb).

Implementation: themes are a class on `<html>` (`theme-light` / `theme-dark`) that
re-skins the lib's semantic CSS variables via override blocks in
`src/styles/index.css` (plus app-level `--shadow` / `--mint`), so no new color
names enter `tailwind.config.ts`. Sun/moon toggle in the header; choice persists to
`localStorage` (`metronomnom.theme`); `index.html` applies it pre-paint to avoid a
flash. See `src/theme.ts`, `src/components/{Wordmark,Mascot,ThemeToggle}.tsx`, and
the 3D/slider treatment in the control components.

**Resolved:** wordmark, palette (light + dark, calmer than the first cream),
control styling (3D + themed sliders), readout↔mascot spacing.

**Mascot (decided 2026-06-26):** explored cute beat-eater concepts
(`docs/branding-mockups/mascots/`) and landed on a **classic wind-up metronome
that eats notes off a music staff** ("Feeding in"). It's the wordmark mark (bare
metronome) + the centerpiece hero (metronome + staff). The **pendulum swings and
the notes (derived from the live meter+feel) scroll into its mouth, phase-locked
to the engine's beat clock** — see `src/components/Mascot.tsx` +
`mascotAnim.ts`. Tapping the hero enlarges it in place. Pac-Man-ish early drafts
were rejected for reading as eating-nothing.

**Still open:** a more polished mascot illustration; whether `--pearl` should
become a dedicated `--beat` token in the lib (the light theme re-tunes `--pearl`
dark so beats read on cream; dark keeps it light).

## Open questions for next session

- **Wordmark:** how to style "nomnom" — e.g., the two `o`s as little chomping
  mouths? How obvious should the metronome read be?
- **Mascot:** character design + one-line personality (the beat-eater).
- **Palette:** does it use the existing app tokens (charcoal / amber
  `degree-root` / pearl) or get its own brand colors?
- **Fit with the UI:** how the mascot/wordmark plays with the new **arc** beat
  indicator (the curve of pills over the tempo readout).
- **Audience check:** confirm the playful direction resonates with musicians,
  or define a more restrained variant.
