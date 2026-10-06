# Mascot Hula Sway — design

_2026-06-26. Approved._

## Goal
Add a second beat-synced motion to the hero mascot (`MascotHero`). Today it ticks a
pendulum in time with the BPM. We add a **smooth "hula" body sway**: the metronome
**bends** side to side — feet planted, hips swing, the body above the mouth stays
roughly still — with a small vertical bob at each side. The existing pendulum tick
and the note conveyor are unchanged.

## Decisions (from brainstorming)
- **Winner: smooth Hula.** A single solid body that *bends* (no stacked layers /
  stair-steps — that was only a mockup artifact).
- **Feet planted, hips swing, head ~still.** The sway's "still point" sits at the
  **mouth** (option A) so notes keep landing in the mouth on the beat. Hips (below
  the mouth) swing; the region at/above the mouth barely moves; a gentle counter
  above is optional and subtle.
- **Pendulum is independent.** It keeps **only** its existing tick rotation — it is
  *not* displaced by the body sway. (Its pivot is low, y≈80; we simply don't apply
  the body offset to it.)
- **Small vertical bob** at each side extreme (the "dancing" hop).
- **Rhythm:** one full sway per **2 beats**, in phase with the pendulum (both reach
  an extreme on each beat). Tunable.
- **Rest:** when stopped or `prefers-reduced-motion`, the body rests upright
  (`sway = 0`), like the pendulum/conveyor already do.
- **Header `MascotMark` is untouched** — only the live hero animates.

## Geometry (current body, `Mascot.tsx`)
Body path `M30 86 L39 33 Q40 28 45 28 L55 28 Q60 28 61 33 L70 86 Z`.
- Feet at `y=86` (x 30..70, half-width 20, center 50).
- Shoulders at `y=33` (half-width 11). Dome top `y≈28`.
- Mouth ≈ `y=70`. Pendulum pivot `(50,80)`.
- `yFoot=86`, `yTop=28`, `span=58`; normalized height `t=(yFoot−y)/span`
  (0 at feet, 1 at top). Mouth still-point `MOUTH_T=(86−70)/58 ≈ 0.276`.

## Pure functions (new, in `src/components/mascotAnim.ts`)
All derived from the engine's **current** position (no accumulation), matching the
existing `pendulumAngle` style so the sway re-anchors across tempo/meter changes.

- `bodySway(monotonicBeat, subIndex, frac, subsPerBeat, beatsPerSway = 2) → s ∈ [−1,1]`
  `beatPhase = monotonicBeat + (subIndex+frac)/subsPerBeat`;
  `s = −cos(2π·beatPhase / beatsPerSway)`. With `beatsPerSway=2` this equals the
  pendulum's normalized swing — hips and pendulum move in phase.
- `bodyOffset(y, s, amp) → px` horizontal bend at height `y`.
  `g(t)`: for `t ≤ MOUTH_T`, `sin(π·t/MOUTH_T)` (hip lobe, peaks ~`t≈0.14`); for
  `t > MOUTH_T`, `−HEAD_RATIO·sin(½π·(t−MOUTH_T)/(1−MOUTH_T))` (subtle counter
  above the mouth, grows toward the top). `bodyOffset = amp·s·g(t)`.
  Invariants: `g(0)=0` (feet), `g(MOUTH_T)=0` (mouth); hips and head offsets have
  opposite sign; `bodyOffset(y,−s,·) = −bodyOffset(y,s,·)`; `s=0 ⇒ 0`.
- `bodyBob(s, bobAmt) → py` vertical hop, `−bobAmt·|s|` (≤ 0, up). Max at extremes.
- `bodyPath(s, amp) → d` the bent body outline. Built from the authored outline with
  the two long edges **subdivided** into several points; each point's x is shifted by
  `bodyOffset(y,…)`. At `s=0` the subdivided points stay collinear, so the rest
  silhouette is identical to today; bending adds the smooth hip bulge.

Defaults to tune in-app: `amp≈9`, `HEAD_RATIO≈0.4`, `bobAmt≈2.5`, `beatsPerSway=2`.

## Rendering (`MascotHero` in `Mascot.tsx`)
The hero already drives the pendulum + conveyor by ref each rAF frame; the body joins
them. Refactor so the hero can drive these (the static header `MascotMark` keeps the
plain authored markup):
- a **body `<path>` ref** — set `d = bodyPath(s, amp)` each frame.
- a **face group** — translated by ≈ `bodyOffset(mouthLine,…)` (≈ 0) so the mouth
  (and the note that lands there) stays put; exact face anchor tuned in app.
- the **base rect** — translated by `bodyOffset(86,…)` (≈ 0; stays planted).
- the **pendulum** — `rotate(pendulumAngle…)` **only** (no body offset).
- a **root group** — translated `(0, bodyBob(s,…))` for the hop.
When `!isRunning || bpm<=0 || prefersReducedMotion()` → rest pose (`s=0`, bob 0):
body upright/centered, pendulum as today.

## Testing (`src/components/mascotAnim.test.ts`)
Extend the existing suite:
- `bodySway`: `s=0` at the start of rest; symmetric/periodic; in-phase with the
  pendulum at `beatsPerSway=2` (same sign as the normalized pendulum swing).
- `bodyOffset`: 0 at feet and at the mouth line; hip vs head opposite sign; odd in
  `s`; 0 when `s=0`; scales with `amp`.
- `bodyBob`: `≤ 0`, 0 at `s=0`, max magnitude at `|s|=1`.
- `bodyPath`: at `s=0` the feet endpoints are at x 30/70 and the path is left/right
  symmetric; at `s=±1` the hip region shifts in the sign of `s`.

## Risks / tuning notes
- The hip bulge peaks near `y≈78`, close to the fixed pendulum pivot (`y80`); if the
  rod looks detached from the swaying base, reduce `amp` or taper `bodyOffset` near
  the pivot. Tune live (`pnpm dev`).
- Phase choice (extreme-on-beat vs center-on-beat) is a one-line swap in `bodySway`
  if the synced feel reads wrong.
