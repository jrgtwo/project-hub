# Migration inventory

Written 2026-10-03 for [the migration](index.md). One section per old doc: path, lines, git state, last modified, then its sections by line range with a content kind and a target home. Classified by skimming only; nothing here is checked against code.

Homes are abbreviated: `product`, `architecture`, `technical`, `development`, `branding`, `launch` = `jrg/knowledge/<name>.md`; `pre-mig` = `jrg/tickets/pre-migration/`; `legacy` = `jrg/legacy/`; `drop` = nothing worth keeping.

## Summary

| Path | Lines | Git | Last modified | Main homes |
| --- | --- | --- | --- | --- |
| `.claude/commands/start-new-session.md` | 40 | ignored | 2026-06-26 (mtime) | legacy |
| `.claude/commands/start-new-task.md` | 42 | ignored | 2026-06-26 (mtime) | legacy |
| `.claude/working-docs/ARCHITECTURE.md` | 146 | ignored | 2026-07-11 (mtime) | architecture, technical, development |
| `.claude/working-docs/current-status.md` | 123 | ignored | 2026-07-11 (mtime) | product, pre-mig |
| `.claude/working-docs/current-tasks.md` | 309 | ignored | 2026-07-11 (mtime) | pre-mig, architecture, product |
| `.claude/working-docs/memory.md` | 49 | ignored | 2026-06-26 (mtime) | product, branding, legacy |
| `.claude/working-docs/prioritized-work.md` | 120 | ignored | 2026-07-11 (mtime) | pre-mig |
| `DEVELOPMENT.md` | 181 | tracked | 2026-06-27 (commit) | development, architecture, technical |
| `docs/STATUS.md` | 182 | ignored | 2026-07-11 (mtime) | pre-mig, architecture, launch |
| `docs/app-launch-runbook.md` | 104 | ignored | 2026-07-02 (mtime) | launch |
| `docs/branding-naming.md` | 92 | ignored | 2026-06-26 (mtime) | branding |
| `docs/feature-ideas.md` | 84 | ignored | 2026-07-06 (mtime) | pre-mig, technical |
| `docs/improvement-roadmap.md` | 144 | ignored | 2026-07-11 (mtime) | pre-mig, legacy |
| `docs/superpowers/specs/2026-06-25-beat-arc-design.md` | 82 | ignored | 2026-06-25 (mtime) | architecture + legacy |
| `docs/superpowers/specs/2026-06-26-mascot-hula-sway-design.md` | 87 | ignored | 2026-06-26 (mtime) | architecture, product + legacy |
| `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` | 142 | ignored | 2026-07-02 (mtime) | launch, pre-mig + legacy |
| `docs/superpowers/specs/2026-07-06-tempo-trainer-design.md` | 122 | ignored | 2026-07-11 (mtime) | product, architecture + legacy |
| `~/.claude/projects/-home-jonat-projects-metronome/memory/` (5 files) | 91 | outside repo | 2026-06-25 → 2026-10-03 | product, launch, branding — **read-only, never moved** |

**Not inventoried, used as a reference:** `CLAUDE.md` (gitignored, mtime 2026-10-03) is the harness instruction file, not an old workflow doc. It stays where it is. It is the **newest** copy of most architecture/technical/development facts, so knowledge-doc tickets should treat it as the tie-breaker when old docs disagree.

**Git note:** `.claude/`, `docs/` and `CLAUDE.md` are deliberately gitignored (`.gitignore` lines 18–23). `jrg/` is not ignored. Moving the old docs into `jrg/legacy/` and writing their content into `jrg/knowledge/` makes that content trackable. Confirm with the user before the retire ticket.

## Duplicates and newest copies

| Content | Copies | Newest / best |
| --- | --- | --- |
| Commands, git deps, import order, state-from-lib, calibration, conventions | `CLAUDE.md`; `ARCHITECTURE.md` 12–22, 23–28, 135–146; `DEVELOPMENT.md` 19–35, 47–60, 87–99, 114–120, 138–152 | `CLAUDE.md`, then `ARCHITECTURE.md`. `DEVELOPMENT.md` is oldest and stale (says tokens are lib-owned; lists only `ui/dialog.tsx`; 2 test suites; predates UI-1, trainer, Rock Mode) |
| File map | `ARCHITECTURE.md` 23–118; `DEVELOPMENT.md` 62–85 | `ARCHITECTURE.md` (stale spot: ads.config line 100–102 still mentions the footer AdSlot) |
| Theming | `ARCHITECTURE.md` 119–134; `DEVELOPMENT.md` 101–112; `memory.md` 37–46; `branding-naming.md` 58–64; `CLAUDE.md` Conventions | `CLAUDE.md` + `ARCHITECTURE.md`. The others say "lib-owned" tokens / `--pearl`; stale |
| Shipped-work history (Rock Mode, trainer, UI-1, CQ/FT/SEO items) | `current-tasks.md` 10–283; `current-status.md` 68–102; `docs/STATUS.md` 8–172; `prioritized-work.md` 17–115; `improvement-roadmap.md` 23–124 | `prioritized-work.md` (2026-07-11) for item state; `docs/STATUS.md` for the fullest write-ups; `current-tasks.md` has UI-1 and hula, which no roadmap doc has. `improvement-roadmap.md` done markers are inconsistent |
| Queued/idea work items (FT-3/4/6/9/10, SEO-10/11/12, CQ-1/11/13) | `prioritized-work.md`; `improvement-roadmap.md`; `feature-ideas.md`; `current-status.md` 61–66, 108–117 | `prioritized-work.md`; `feature-ideas.md` adds items found nowhere else |
| No privacy / no-CDN / no-telemetry constraint | memory `no-privacy-constraint.md`; `memory.md` 12–15; both commands; `improvement-roadmap.md` 14–19 | memory note. `ads-flexoffers.md` 12–14 "privacy-first brand" contradicts it |
| App name + domains | memory `app-name-metronomnom.md`; `memory.md` 26–27; `branding-naming.md` 5–18 | `branding-naming.md` (fullest) |
| FlexOffers ads | memory `ads-flexoffers.md`; `docs/STATUS.md` 140–182; `current-status.md` 108–109 | memory note; its "how to apply" (footer house ad) is stale since the footer AdSlot was removed |
| Launch proving-ground framing | memory `project-is-launch-proving-ground.md`; traffic spec 1–21; `docs/STATUS.md` 87–91; runbook 1–9 | runbook (newest launch doc); traffic spec is marked superseded by `docs/STATUS.md` |

## Per-doc sections

### `.claude/commands/start-new-session.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–38 | Session bootstrap command (load working docs, brief, route) | Old workflow command | legacy |
| 39–40 | Rule: no privacy / no-CDN / no-telemetry constraint | Command + product decision (dup) | legacy; product |

### `.claude/commands/start-new-task.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–42 | Product-interview a task into current-tasks.md (privacy note at 21–23 is the dup) | Old workflow command | legacy |

### `.claude/working-docs/ARCHITECTURE.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–5 | Intro; points to CLAUDE.md as authoritative | Meta | drop |
| 6–11 | What it is; stack; lib/adkit split | Stack + how it works | technical; architecture |
| 12–22 | Commands | Commands | development |
| 24–28 | `main.tsx`, load-bearing import order, AdsProvider | How it works | architecture |
| 29–37 | `MetronomeApp.tsx`, UI-1 layout, trainer/rock gating | How it works | architecture |
| 38–74 | `src/components/` incl. Rock Mode + branding components, About SEO copy | File map | architecture |
| 75–76 | View-state hooks (`centerpieceView`, `deckState`) | How it works | architecture |
| 77–90 | shadcn/ui migration, variants, Radix deps | Technical decision + file map | technical; architecture |
| 91–95 | `theme.ts`, localStorage key, pre-paint sync | How it works | architecture |
| 96–99 | `src/calibration/` | How it works | architecture |
| 100–102 | `ads.config.ts` (footer AdSlot mention is stale) | How it works + monetization | architecture; launch |
| 103–109 | `styles/index.css`, `tailwind.config.ts` | How it works | architecture |
| 110–118 | `index.html`, `inject-skeleton`, `skeleton.html`, `gen-skeleton.mjs` | How it works + dev workflow | architecture; development |
| 119–134 | Theming: themes, tokens, 3D look, add-a-color/size rule | Design system | architecture |
| 135–146 | Gotchas: git deps, lib inlining for tests, ResizeObserver stub, `void`, no-privacy note | Technical + testing + product | technical; development; product |

### `.claude/working-docs/current-status.md` (newest snapshot, 2026-07-11)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–4 | Header | Meta | drop |
| 5–10 | Health: green checks, 212 tests, toolchain versions, Tailwind stays 3.4 | Stack + checks | technical; development |
| 11–14 | Git state + commit hashes | Stale snapshot | drop |
| 15 | Deployed live at metronomnom.com | Deploy fact | launch |
| 17–54 | What works today (full feature list) | What works | product |
| 55–60 | Current focus: between tasks | Stale status | drop |
| 61–66 | To resume: frontman mascot idea, SEO-12, feature-ideas pointer | Work items (queued/idea) | pre-mig |
| 68–102 | Shipped: Rock Mode, FT-7, UI-1, CQ-14, CQ-10, CQ-4, FT-1/2/12, SEO/perf/upgrades | Shipped history (dup of STATUS) | pre-mig; technical (CQ-4 decision) |
| 104–106 | Parked: mascot hula sway | Work item (parked) | pre-mig |
| 108–109 | Next: SEO-12; ads parked on FlexOffers approval | Work items | pre-mig; launch |
| 111–117 | Known issues: hula look, defer Tone.js needs lib change, default-to-restored flash | Known issues | pre-mig |
| 119–123 | How to verify (manual QA, snapshot Chromium) | Testing | development |

### `.claude/working-docs/current-tasks.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–8 | Header, "ACTIVE: none"; next = SEO-12, feature-ideas | Stale status + queued pointer | pre-mig (SEO-12 dup) |
| 10–61 | Rock Mode (shipped 2026-07-08→11): acts, mascot, look, files, fixes | Shipped + decisions | pre-mig; architecture (never redraw metronome, spotlight pool, `--rk-*`, rAF phase-lock, act state machine); product |
| 62–63 | Open/optional: frontman mascot on count-in, intensity tuning | Work item (idea) | pre-mig |
| 65–134 | Tempo trainer (shipped 2026-07-06→07): goal, requirements, plan, bars-until-next | Shipped + decisions | pre-mig; product + architecture (manual change disarms, silent disarm, localStorage + URL `tt/ts/ti`) |
| 73–74 | Stray note: UI-1 committed | Stale | drop |
| 136–187 | UI-1 single-screen redesign (shipped 2026-07-05): outcome, design record, decisions | Shipped + decisions + spec | pre-mig; product + architecture (pulse zone, deck, mute-only, ad removed, collapse persisted); design record → legacy |
| 189–257 | CQ-14 calibration/theme/nativeLatency tests (shipped 2026-07-04) | Shipped + testing approach | pre-mig; development (fake audio clock, fake timers) |
| 259–282 | Recently shipped: CQ-10, FT-12, FT-2, FT-1, CQ-4, 2026-06-27 batch | Shipped history | pre-mig; technical (CQ-4, stack bump); architecture (persistence keys, URL state) |
| 283 | Pointers; "Tests total: 77" | Stale | drop |
| 285–309 | Paused: mascot hula sway (implemented; user not happy) | Work item (parked) + beat-clock decision | pre-mig; architecture |

### `.claude/working-docs/memory.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–4 | Header | Meta | drop |
| 5–11, 16–17, 33–36 | Working preferences (plan first, no git/servers, WSL paths, plain-text questions, show-don't-quiz mockups) | Working preference | legacy (covered by global CLAUDE.md) |
| 12–15 | No privacy constraint (corrected 2026-06-26) | Product decision (dup) | product |
| 19–25 | Roadmap triage 2026-06-26: adopt shadcn, SEO P0 next, presets/setlists dropped | Work items + decisions | pre-mig; product; technical |
| 26–32 | Name + domain; light/dark both fun; users don't pick colors | Branding | branding |
| 37–44 | Themes re-skin lib vars; `--pearl` → `--beat` follow-up | Stale technical + known issue (likely done) | legacy; pre-mig |
| 45–46 | Pre-paint script mirrors `theme.ts` | Gotcha | architecture |
| 47–49 | Mockups in `docs/branding-mockups/` | Pointer | branding |

### `.claude/working-docs/prioritized-work.md` (newest work-item state, 2026-07-11)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–15 | Header, P0–P4 legend, pointers | Meta | legacy |
| 17–38 | P0 CQ-2, CQ-3, SEO-1..8 (shipped); perf pass + major upgrades (shipped) | Shipped + stack | pre-mig; technical |
| 41–68 | P1 CQ-0, CQ-4, CQ-14, FT-1, FT-2 (shipped) | Shipped | pre-mig; technical |
| 69 | P1 SEO-12 Search Console + sitemap (queued) | Work item | pre-mig |
| 72–78 | P2 CQ-6/7/8 (done) | Shipped | pre-mig |
| 79–80 | P2 FT-3 custom time signature, FT-6 count-in (queued) | Work items | pre-mig |
| 81–91 | P2 FT-7 trainer + Rock Mode, FT-12 URL state (shipped) | Shipped | pre-mig |
| 87 | P2 FT-10 click voices (queued, lib change) | Work item | pre-mig |
| 94–103 | P3 CQ-1 self-host fonts (parked), CQ-10 (shipped), CQ-11, CQ-13, FT-4, FT-9 (queued low) | Work items | pre-mig |
| 105–109 | P4 icebox FT-5, FT-11, SEO-10, SEO-11 | Work items (parked) | pre-mig |
| 111–115 | Dropped: CQ-5, CQ-9, CQ-12, SEO-9, FT-8 presets/setlists | Dropped + product decision | pre-mig; product |
| 117–120 | Footer | Meta | drop |

### `DEVELOPMENT.md` (oldest; partly stale)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–11 | Intro, stack | Stack | technical |
| 13–17 | Prerequisites (Node ≥20.19, pnpm, network) | Setup | development |
| 19–35 | Git deps: tags, onlyBuiltDependencies, link, bump | Deps + setup | technical; development |
| 37–60 | Getting started; scripts | Setup, commands | development |
| 62–85 | Project structure | File map (stale) | architecture |
| 87–120 | Import order, state, theming, calibration | How it works (stale on tokens) | architecture |
| 122–136 | Paint-shell skeleton (snapshot, plugin, Husky regen, why not SSR) | How it works | architecture; development |
| 138–152 | Conventions | Technical + testing | technical; development |
| 154–163 | Testing | Testing (stale counts) | development |
| 165–170 | Deployment (Vercel) | Deploy | development |
| 172–181 | Troubleshooting | Troubleshooting | development |

### `docs/STATUS.md` (fullest history; rolling log)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–6 | Header | Meta | drop |
| 8–21 | Tempo trainer: behavior, persistence keys, files, commits | Shipped + detail | pre-mig; product; architecture |
| 23–52 | Rock Mode: never-redraw constraint, look, mascot, tokens, files | Shipped + detail | pre-mig; product; architecture; technical |
| 56–85 | CQ-4 design system + shadcn, FT-1, FT-2, FT-12 | Shipped + decision | pre-mig; technical; architecture |
| 87–91 | Proving-ground insight; points to runbook; traffic spec superseded | Launch | launch |
| 95–136 | 2026-06-27 session: SEO About modal, Lighthouse perf, paint-shell, CQ-0/2/3, upgrades; hula paused (134–136) | Shipped + technical | pre-mig; technical; architecture; development |
| 140–172 | Branding/mascot/ads archive: themes, mascot, FlexOffers chosen over AdSense/EthicalAds | Shipped + decisions | pre-mig; branding; architecture; launch |
| 174–182 | Open follow-ups: wire FlexOffers href; mascot X_MOUTH polish; remove-ads purchase idea; `--pearl` (done); commit/redeploy (stale) | Work items | pre-mig |

### `docs/app-launch-runbook.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–15 | Intro: app-agnostic launch playbook; how to use | Launch | launch |
| 17–25 | §1 Readiness gate checklist (unchecked items) | Launch + work items | launch; pre-mig |
| 27–35 | §2 Positioning worksheet + metronomnom example | Launch + product | launch; product |
| 37–79 | §3 Channel table + scorer; §4 sequence; §5 measure-and-decide (UTM, "engaged", Search Console) | Launch | launch |
| 81–89 | §6 Template pack checklist (unchecked) | Launch + work items | launch; pre-mig |
| 91–94 | §7 Retro | Launch | launch |
| 98–104 | Test-case log: not yet executed; candidate first moves | Launch + work item (queued) | launch; pre-mig |

### `docs/branding-naming.md`

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–40 | Name decision, domains (availability unverified), rejected names, brand direction | Branding | branding (+ pre-mig: verify/register redirect domains) |
| 42–56 | Direction chosen: playful; Retro 70s light / Warm Dark Playful dark; mockup folders | Branding + mockup record | branding; legacy |
| 58–64 | Implementation: theme class, CSS var blocks, toggle, pre-paint (mentions lib vars; stale) | How it works | architecture |
| 66–76 | Mascot decision (2026-06-26): metronome eating notes, phase-locked | Branding + how it works | branding; architecture |
| 78–80 | Still open: polished mascot illustration; `--pearl` → `--beat` (likely done) | Work items | pre-mig |
| 82–92 | Open questions (partly answered at 66–76) | Work items + branding | pre-mig (unanswered); branding |

### `docs/feature-ideas.md` (2026-07-06; partly stale on trainer/count-in)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–9 | Header, legend | Meta | drop |
| 11–36 | Unused `@fretwork/lib` capabilities with API names | Lib surface | technical |
| 38–50 | Quick wins: accent editor, click volume, typed BPM, wake lock, reduced motion | Ideas | pre-mig |
| 52–62 | Medium: count-in, bar counter/practice timer, silent practice, subdivision click toggle | Ideas | pre-mig |
| 64–79 | Large: click voices, pitched drone, custom time signatures, backing groove, PWA, cloud sync | Ideas | pre-mig |
| 81–84 | Declined: presets and setlists | Dropped + product decision | pre-mig; product |

### `docs/improvement-roadmap.md` (2026-06-26 audit; older, inconsistent done markers)

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–12 | Header, legend (only one defining TBD) | Audit header | legacy |
| 14–19 | Privacy constraint struck; CQ-1 demoted | Decision (dup) | product; legacy |
| 23–41 | Code-quality table CQ-0..14 with file:line findings | Work items + audit | pre-mig; legacy |
| 43–63 | Features table FT-1..12 | Work items | pre-mig |
| 65–82 | SEO table SEO-1..12; SPA empty-root rationale | Work items + SEO strategy | pre-mig; launch |
| 86–124 | Prioritized roll-up (redundant with tables + prioritized-work) | Work items (dup) | drop |
| 128–144 | Walkthrough decisions: CQ-4 → shadcn, CQ-9 dropped, FT-3 reframed, FT-8 removed, SEO P0 rationale | Decisions | product; technical; launch; legacy |

### `docs/superpowers/specs/2026-06-25-beat-arc-design.md` — shipped

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–16 | Context: beat row overflowed on mobile; arc over tempo counter | Spec rationale | architecture; legacy |
| 17–74 | Visual design, layout, geometry tunables, files | How it works | architecture |
| 75–82 | Verification checklist | Stale | legacy |

### `docs/superpowers/specs/2026-06-26-mascot-hula-sway-design.md` — implemented, parked

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–28 | Goal + brainstorm decisions | Product decisions | product; legacy |
| 29–71 | Mascot geometry, `mascotAnim.ts` pure functions, rAF in `MascotHero` | How it works | architecture |
| 72–81 | Testing | Tests exist | legacy |
| 82–87 | Risks/tuning notes (speculative) | Weak work item | pre-mig (fold into the parked hula entry) |

### `docs/superpowers/specs/2026-07-02-traffic-experiment-roadmap-design.md` — not shipped, superseded by runbook

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–21 | Purpose: launch proving ground, measurable experiments | Launch | launch |
| 22–30 | Constraint: no new SaaS; GA + Vercel analytics; UTM | Launch/technical decision | launch; technical |
| 31–55 | Measurement-first architecture; experiment schema | Launch process | launch |
| 56–77 | Phase 0: UTM, source view, Search Console (absorbs SEO-12), experiment log | Work items | pre-mig; launch (UTM convention) |
| 78–85 | Analytics event instrumentation epic | Work item (idea) | pre-mig |
| 86–115 | Phase 1–3 experiments (seeding, PH/HN/Reddit, outreach, `/N-bpm` pages, share/embed, paid test) | Work items (ideas) | pre-mig; launch (channel catalog) |
| 116–142 | Reusable kit, success criteria, out of scope | Launch | launch |

### `docs/superpowers/specs/2026-07-06-tempo-trainer-design.md` — shipped, grew into Rock Mode

| Lines | Section | Kind | Home |
| --- | --- | --- | --- |
| 1–10 | Status banner | History | legacy |
| 11–43 | Problem, intent, locked behavior; line 41 out-of-scope items (second collapse level, loop-back mode, auto-stop) | Product decisions + ideas | product; pre-mig (line 41) |
| 44–101 | `tempoTrainer.ts`, component (name stale: now TrainerBar/TrainerButton), wiring | How it works | architecture |
| 102–122 | Tests, verification | Stale | legacy |

### Memory folder (read-only; not moved)

| File | Lines | Section | Kind | Home |
| --- | --- | --- | --- | --- |
| `MEMORY.md` | 1–4 | Index | Pointer | drop |
| `ads-flexoffers.md` | 10–14 | FlexOffers affiliate chosen, rationale ("privacy-first brand" is stale) | Monetization decision | launch |
| `ads-flexoffers.md` | 16–27 | Verification pending (~2026-06-30); how to wire once approved (footer step stale) | Work items + mechanics | pre-mig; launch |
| `app-name-metronomnom.md` | 10–14 | Name, domains, redirect domains to register, playful direction | Branding + work item | branding; pre-mig |
| `no-privacy-constraint.md` | 10–23 | No privacy-first constraint; judge fonts on perf/LCP/SEO | Product decision | product; technical |
| `project-is-launch-proving-ground.md` | 10–22 | Purpose: learn launching; experiments + reusable assets; no hype features | Product decision + launch | product; launch |

## Knowledge-doc coverage

Every target home has a ticket: product, architecture, technical, development, branding, launch. Candidate extra topics (design system, paint-shell, Rock Mode) fit inside architecture, so no extra knowledge-doc tickets were added.
