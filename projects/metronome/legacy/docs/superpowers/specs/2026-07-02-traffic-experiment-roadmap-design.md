# Traffic experiment roadmap — design

_2026-07-02_

## Context & purpose

metronomnom is a **proving ground** for learning the full end-to-end process of launching an
app (see memory `project-is-launch-proving-ground`). "Get traffic / market it" is one of the
stages we're deliberately learning — **not** a "make money now" task. A metronome is a
commodity; there is no magic feature hook (the Bluetooth-latency calibration is a footnote, not
a sales point). So the goal is **not** to pick one growth hack, but to:

1. **Catalog** the realistic traffic techniques available to a solo builder.
2. Run each as a **measurable, time-boxed experiment** → learn *which are feasible for me*, in
   what order, at what effort/cost.
3. Walk away with **reusable assets** (conventions, checklists, templates, infra) that port to
   the next project — reusability is a first-class deliverable, not a byproduct.

The roadmap's real output is a **scored table**: eyes-per-unit-effort, by channel, backed by
evidence instead of guesses.

## Hard constraint

**No new third-party SaaS** (no LaunchDarkly, no Segment, no analytics vendor onboarding). Use
what's already installed: **Google Analytics via `gtag`** + **`@vercel/analytics`**. UTM
tracking requires no software — UTMs are query-string tags on inbound links; GA4 auto-buckets
`utm_*` into acquisition reports and Vercel captures referrers. **This effort is essentially
code-free** — a naming convention, a Google config task, and a log. (Custom engaged-action
instrumentation is deliberately *not* here — it's its own epic; see Related efforts.)

## Architecture: measurement-first, experiments on top

```
Phase 0  Measurement foundation  ── the reusable backbone; prerequisite for everything
   │
   ├─ Phase 1  Fast/cheap experiments      (signal in days)
   ├─ Phase 2  Compounding experiments     (signal in weeks)
   └─ Phase 3  Paid learning experiments   (learn CAC, not ROI)
                      │
                      ▼
        Scored results table + portable launch kit
```

Everything downstream is judged by Phase 0's metrics. Each experiment is logged with the same
schema so results are comparable and the *process* is reusable.

### Experiment schema (used for every technique)

> **name · what it is · what it proves · effort (S/M/L) · cost · time-to-signal · primary
> metric · keep/kill threshold · reusable output**

- **primary metric** is always sourced from Phase 0 (engaged sessions by UTM source, not raw
  hits) so "did it work" is unambiguous.
- **reusable output** is the asset the experiment leaves behind for the next project.

## Phase 0 — Measurement setup (non-code prerequisite)

Intentionally tiny and **code-free** — it leans on GA's built-in attribution as-is. (Richer
engaged-action instrumentation is deliberately **not** here — see Related efforts.)

1. **UTM convention** (doc). A markdown table of the canonical `utm_source` / `utm_medium` /
   `utm_campaign` strings per channel, so inbound links are tagged consistently and GA's reports
   don't fragment (`reddit` vs `Reddit` vs `r/drums`). Optionally a 5-line `campaignUrl()` helper
   to generate tagged links. GA reads the params — nothing to build. _Reusable verbatim._
2. **Source view.** Confirm GA4 Traffic-acquisition attributes sources correctly + a one-page
   "where to look" note (which report, which metric). Uses GA's built-in engagement metric for
   now — its limits on a single-page tool are exactly why the engaged-events epic exists (below).
3. **Search Console** (absorbs **SEO-12**): DNS/HTML verification, submit `sitemap.xml` — the
   organic-search surface (impressions/clicks/queries) the SEO experiments need. Config, not code.
4. **Experiment log** — a markdown template under `docs/growth/experiments/` (one file per
   experiment: schema fields + result + decision) with a rollup scored table in
   `docs/growth/README.md`. This log *is* the learning artifact and the reusable process.

**Phase 0 done when:** the UTM table is written, a tagged link attributes correctly in GA,
Search Console is verified with the sitemap submitted, and the experiment-log template exists
with Phase 1 experiments stubbed. **No app code required.**

## Related efforts (separate epics — not built here)

- **Analytics event instrumentation** — a proper `src/analytics.ts` + "engaged" events (first
  **play** / **tap** / **settings-change** via `gtag`) is **its own epic**, not part of this
  traffic effort. It's an *enabler*: once it lands, every experiment's "did real users show up?"
  upgrades from pageviews (which mislead on a single-page tool) to engaged events. This roadmap
  runs fine without it on GA's built-ins; it just sharpens the signal. Scoped + built separately.

## Phase 1 — Fast / cheap experiments (signal in days)

Catalog entries (each run + logged via the schema):

- **Community seeding** — genuinely-helpful posts where musicians gather (r/drums, r/guitar,
  r/piano, r/WeAreTheMusicMakers, teacher FB groups). _Proves:_ do communities send engaged
  users? _Reusable:_ target list + non-spammy post template.
- **Coordinated launch** — Product Hunt + Show HN + r/InternetIsBeautiful + r/SideProject in one
  window, led by the *charm/personality* (mascot), not the feature list. _Proves:_ spike size +
  what messaging lands. _Reusable:_ **launch checklist** + asset kit (OG image, demo gif, copy).
- **Roundup / directory outreach** — get listed in existing "best free online metronome"
  articles + tool directories. _Proves:_ referral + backlink lift. _Reusable:_ **outreach email
  template + tracker** (target, contact, status, result).

## Phase 2 — Compounding experiments (signal in weeks)

- **Programmatic tempo pages** — template-generated `/N-bpm` pages (+ optionally a song-BPM
  set) targeting exact long-tail queries. _Proves:_ can we capture existing search intent at
  scale? _Metric:_ Search Console impressions/clicks per template. _Reusable:_ a data→template→
  page generator pattern.
- **Product-led referral** — UTM-tagged **share links** (teacher → student) + an **embeddable
  widget** (iframe + backlink) for teachers'/bloggers' sites. _Proves:_ does the tool travel on
  its own? _Reusable:_ share-link + embed infra pattern.

## Phase 3 — Paid learning experiments (learn CAC, not ROI)

- **Small paid test** (Reddit or Pinterest before Google search). _Proves:_ the *mechanics* of
  running paid + a real cost-per-engaged-visitor — explicitly a learning exercise, since paid
  won't pay back on a free tool. _Reusable:_ a "$X paid test + how to read CAC" playbook.

## Reusable launch kit (the payoff)

The assets the experiments yield, collected as a portable kit for future projects:

- UTM convention + optional `campaignUrl()` helper _(the `analytics.ts` engaged-events module
  belongs to the separate instrumentation epic, not this effort)_
- Launch checklist + asset kit (OG image, demo gif, copy templates)
- Outreach email templates + tracker
- Share-link + embed-widget pattern
- The experiment-log template + the filled-in scored results table

## Success criteria

- Every experiment run is **attributable** (Phase 0 works) and **logged** with a keep/kill call.
- After Phase 1, we can name **which cheap channels returned engaged users for this builder**.
- The reusable kit exists and is generic enough to drop into the next project.
- Not a success criterion: revenue, or a specific traffic number. This stage proves *process +
  feasibility*, not a monetization outcome.

## Out of scope

- Choosing a monetization model (deferred — "get the audience first").
- **Analytics event instrumentation** / `src/analytics.ts` (its own epic — see Related efforts).
- A fully self-owned analytics/event store (would tempt a new dependency; revisit only if GA +
  Vercel prove insufficient).
- Actually executing Phases 1–3 in this slice — they're **cataloged** here and stubbed in the
  experiment log; the first thing we *build* is Phase 0.
