# Beat-dots arc — design spec

## Context

The beat indicator (`BeatDots`) is a single horizontal flex row of pills + sub-pills.
On mobile, larger time signatures and/or finer subdivisions (worst case **12/8 ×
sextuplets** = 72 elements) make the row overflow both screen edges — `justify-center`
just centers the overflow and the ends clip off-screen. We need the indicator to keep
long configurations on-screen.

After several design passes (captured as mockups under `.superpowers/brainstorm/`), the
chosen direction is: **lay the beats on a single continuous arc that curves over the top
of the tempo counter.** Few beats → a shallow curve hugging the top; more beats/
subdivisions → the arc opens wider around the counter (and down the sides) so nothing
runs off-screen. This replaces the straight row entirely (no mode-switching).

## Visual design (validated in mockups)

- **One arc, always.** Beats + subdivisions are evenly spaced along an arc centered on
  the top (12 o'clock) of a circle whose center is the BPM readout.
- **Pills, radial.** Main beats are the original pills (accents taller + amber, regular
  cream); subdivisions are **small pills** (thinner/shorter). Each pill is rotated to
  point outward (radially) and its **inner end sits on the arc**, growing outward — the
  arc is the "baseline" (the curved analogue of today's `items-end`).
- **Active state** drives off the engine exactly as today: a main pill lights when
  `currentBeat === i`; a sub-pill lights when `currentBeat === i && currentSubdivisionIndex === subIdx`.
  Lit elements use `animate-beat-pop`.
- **Graceful extremes.** Desired arc-length spacing between elements is fixed; the arc
  is allowed to open up to a max span (~265°, leaving a gap at the bottom). Past that,
  spacing compresses to fit the span, and element sizes scale down proportionally so
  they stay distinct and on-screen.
- `off` subdivision → only main pills on the arc (no sub-pills), same as today.

## Layout integration

The arc must be centered on the **BPM number**, so the number sits inside the curve.

- `BeatDots` becomes a self-measuring, full-width `relative` container. It measures its
  own width via a ref + `ResizeObserver` (already stubbed in tests, native in-app) and
  derives the radius `R` from that width so the widest arc stays in view. It renders the
  arc pills absolutely positioned around the circle center, and renders **`children` at
  that center** (a center slot for the tempo readout).
- **Split `BpmControl`:** the number + `BPM` label move into `BeatDots`' center slot;
  the fine steppers + slider become a compact control row rendered **below** the arc
  (steppers flank the slider). Keeping only the number in the arc center keeps the
  center content narrow so the arc clears it even on small phones (steppers flanking the
  number would be too wide at small radii).
- `MetronomeApp` main section becomes: `<BeatDots> <TempoReadout/> </BeatDots>` then the
  tempo control row, then `<TransportButton/>`.

## Geometry (parameters, tunable)

- Circle center: horizontal center of the container; vertical at `R` from the top
  (apex pill near the top, center at the bottom of the arc's bounding box).
- `R = clamp(width/2 - maxPillReach - margin, Rmin, Rmax)` where `maxPillReach` ≈ the
  tallest accent pill length.
- `spacing` ≈ 22px desired arc-length between elements; `maxSpan` ≈ 265°.
- `step = spacing / R`, compressed to `maxSpan/(n-1)` when needed; `sizeScale =
  clamp(actualArcLen / spacing, 0.4, 1)` applied to pill dimensions.
- Element angles: `start = -90° - span/2`, `angle_i = start + i*step`; pill rotation =
  `angle_i + 90°` (long axis radial); inner end on radius `R`, center at `R + L/2`.

## Files

- `src/components/BeatDots.tsx` — rewrite from flex row to measured arc; add `children`
  center slot. Keep the same engine-driven props (`beats`, `accents`, `accentEnabled`,
  `currentBeat`, `subdivision`, `currentSubdivisionIndex`, `isRunning`). Keep
  `data-testid="sub-dot"` (and add one for mains) so the existing count/active tests hold.
- `src/components/BpmControl.tsx` — split into `TempoReadout` (number + label, for the
  arc center) and a tempo control row (steppers + slider).
- `src/MetronomeApp.tsx` — restructure the `main` tempo cluster.
- `src/components/BeatDots.test.tsx` — update: counts and active-state assertions still
  apply (they don't depend on layout); add a main-pill testid if useful.

## Verification

- `pnpm test -- src/components/BeatDots.test.tsx` — element counts per subdivision, the
  single lit sub-pill at `currentBeat`/`currentSubdivisionIndex`, none lit when stopped.
- `pnpm build` — `tsc -b && vite build` clean.
- `pnpm dev` — eyeball at 3/4 straight, 4/4 · 8ths, 5/4 · 16ths, and 12/8 · sextuplets;
  confirm the arc stays on-screen and centered on the BPM number, and resizes responsively.
```
