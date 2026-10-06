# Memory — durable preferences, decisions & lessons

_Append-only-ish. Newest decisions near the top of each section._

## User preferences (how to work)
- **Plan/brainstorm before building.** Session runs in plan mode; explore + confirm
  direction via questions before writing code. The user actively re-opens questions
  to clarify rather than rubber-stamping — offer real options.
- **You never run** git, dev servers, or llama servers — **give the user the
  command** (e.g. `pnpm dev`). On WSL, translate paths with `wslpath -w` and offer
  the `\\wsl.localhost\Ubuntu\...` / `file://wsl.localhost/...` form.
- **No "privacy-first / no-CDN / no-telemetry" constraint.** That line was generic
  `/start-new-task` boilerplate carried over from another project — it is **not** a
  metronomnom goal (the app uses Google Fonts CDN, FlexOffers affiliate, Vercel).
  Judge perf items like font-hosting on LCP/SEO merits, not privacy. (Corrected 2026-06-26.)
- **Prefer plain-text, one-at-a-time decisions** over the `AskUserQuestion` popup —
  the user works through choices conversationally (see "show, don't quiz" below).

## Product decisions (+ rationale)
- **Roadmap triaged (2026-06-26):** a 3-perspective analysis (code quality / features /
  SEO) was prioritized into `.claude/working-docs/prioritized-work.md` (detail in
  `docs/improvement-roadmap.md`). Notable calls: **adopt shadcn/ui** (CQ-4, replaces
  hand-rolled modal/sliders/buttons); **SEO P0 cluster is the recommended next task**;
  **presets & setlists dropped** (FT-8, won't do) — which also removes the planned
  FlexOffers in-app monetization surface (ads stay footer-only).
- **App name: `metronomnom`** (metronome + "nom nom"); canonical domain
  `metronomnom.com`. See `docs/branding-naming.md`.
- **Branding = a light/dark pair, BOTH "fun"** (2026-06-25). `light` = Retro 70s
  (cream, **default**), `dark` = Warm Dark Playful (espresso). No separate "pro"
  theme; **end users don't pick colors** — just light/dark. Rationale: the user
  loved the playful direction and wanted two takes on it, not a pro/playful split.
  Both carry the mascot (wordmark mark + hero), rounded type, and chunky 3D controls.
- **Process note:** decided palette by iterating mockups, not by asking the user to
  choose hex values. The user reacts to *seeing* options (screenshots/mockups) and
  finds abstract "should we add a picker?" questions confusing — show, don't quiz.

## Technical decisions / lessons
- **Themes re-skin lib CSS variables via `:root.theme-light` / `:root.theme-dark`
  overrides** in `src/styles/index.css` (there is no `theme-playful` class — both
  themes are "fun") — keeps the "no raw colors in tailwind.config.ts; themed colors
  are lib-owned" rule intact while still allowing a bold light palette.
- **`--pearl` is re-tuned dark in the playful theme** so `BeatDots`' `bg-pearl`
  beats read on cream. Known semantic stretch; cleaner fix later = a dedicated
  `--beat` token added to `@fretwork/lib`.
- **Theme applied pre-paint** via an inline script in `index.html` mirroring
  `src/theme.ts` (avoids palette flash). Keep the two in sync.
- **Mockups before code:** branding directions were explored as self-contained
  HTML in `docs/branding-mockups/` (faithful to real tokens + BeatDots geometry),
  which sidestepped the lib-token constraint during exploration.
