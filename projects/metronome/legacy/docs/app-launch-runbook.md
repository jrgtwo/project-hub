# App-launch runbook

A **reusable, app-agnostic** playbook for taking a new app from zero to traffic. The point is
repeatability: run it, learn what's missing, improve it, reuse it on the next app. metronomnom is
**test case #1** — it validates the runbook and fills in a worked example.

_Living doc. Update it after each launch (see §7)._

---

## 0. How to use this

Work top to bottom for a new app. Each section is either a **checklist** (do these) or a
**worksheet** (answer these). Copy the Template pack (§6) into the new project and fill it in.
The Measure loop (§5) tells you which channels actually worked.

## 1. Readiness gate (before chasing any traffic)

Don't launch into a leaky bucket. All true first:

- [ ] One-line value prop a stranger understands in 5s.
- [ ] Landing converts visitor → *user* (the core action is obvious + immediate).
- [ ] Share/OG + Twitter card render (test the URL in a debugger).
- [ ] `robots.txt` + `sitemap.xml` present; analytics installed and firing.
- [ ] No obvious "why would I use this over X" gap you can't answer.

## 2. Positioning worksheet (fill in per app)

- **Who is it for?** (the sharpest single user, not "everyone")
- **What job does it do?** (the task they're mid-way through when they need it)
- **Why pick it over the alternatives?** (or honestly: *is it a commodity?*)
- **One-line hook** (what a person would actually say to a friend — not a spec)

> _metronomnom example:_ musicians; keep time while practicing; **it's a commodity** — the only
> non-commodity thing is charm (the mascot). Hook = "a cute metronome," not any feature.

## 3. Channel universe + selection

The menu (don't do all — pick 2–3):

| Channel | When it fits | Effort | Time-to-signal |
|---|---|---|---|
| Launch communities (PH, Show HN, r/InternetIsBeautiful, r/SideProject) | anything with a demo; charm/novelty helps | Low | Days |
| SEO — programmatic long-tail | finite high-intent queries exist (e.g. per-value pages) | Med | Weeks–months |
| SEO — **localization** | commodity tool, English is crowded; other-language demand real | Med | Weeks–months |
| App stores (PWA→Play, extension stores) | users search *stores* for this category | Med | Weeks |
| Directories / "best X" roundups | established listicles already rank for your term | Low (outreach) | Days–weeks |
| Community-default placement (wiki/sidebar/Discord resource lists) | an active community recommends tools | Low (outreach) | Weeks |
| Influencer / creator mentions | creators in the niche have the audience you want | Med (outreach) | Days |
| Referral loops (share links, embed widget) | the tool is naturally shared (teacher→student, etc.) | Med (build) | Weeks |
| Content (articles / short video) | you'll sustain it, or partner with existing creators | High | Weeks–months |
| Paid | to *learn CAC* / fund a spike — rarely pays back on a free tool | Low | Days |

**Selection scorer** — for each candidate, rate 1–5 and multiply:

`audience-fit × effort-you'll-actually-sustain × (6 − cost) × (6 − time-to-signal)`

Pick the top 2–3. Write down *why* (that reasoning is reusable).

## 4. Launch sequence

1. **Prep** — finish §1; produce the asset kit (§6); write the posts (§6); pick channels (§3).
2. **Soft/seed** — quietly share in 1–2 friendly communities; fix what confuses people.
3. **Launch day** — post the picked launch communities in one window; be present to reply.
4. **Follow-up (week of)** — send the roundup/directory + creator outreach emails (§6).
5. **Compounding** — start the slow channels (SEO/localization/app-store) that pay off over weeks.

## 5. Measure & decide loop

Keep it light — no new SaaS; use whatever analytics is installed.

- **UTM convention:** tag every inbound link consistently, e.g.
  `?utm_source=<channel>&utm_medium=<type>&utm_campaign=<slug>`. Standardize the strings so
  reports don't fragment (`reddit` not `Reddit`/`r/x`). Analytics reads the params — nothing to build.
- **Define "engaged":** decide the one action that means *a real user, not a bounce* (esp. for
  single-page apps, where pageviews lie). _(Instrumenting custom events for this is its own epic —
  don't shoehorn it into a launch.)_
- **Search Console:** verify domain + submit sitemap → organic query/impression data.
- **Run each channel as a time-boxed experiment:** hypothesis → metric → keep/kill. Log it (§6).

## 6. Template pack (copy into each new project)

- [ ] Launch-day checklist
- [ ] Post templates — Show HN / Product Hunt / subreddit (per-community tone)
- [ ] Outreach email template + a tracker (target · contact · status · result)
- [ ] Asset checklist — OG image (1200×630), demo GIF/video, one-liner + short/long copy
- [ ] Channel-scoring sheet (§3)
- [ ] Experiment-log template — one entry per channel:
  `name · what · proves · effort · cost · time-to-signal · metric · keep/kill · reusable output`

## 7. Retro → version the runbook

After a launch, capture: what actually sent engaged users, effort vs. payoff per channel, what
the runbook was missing. Fold it back in — this doc should get better every app.

---

## Test-case log — metronomnom (#1)

- **Status:** runbook drafted; not yet executed.
- **Positioning (§2):** commodity metronome; only edge is charm/mascot; hook = "a cute, free metronome."
- **Candidate first moves (§3):** launch spike (r/InternetIsBeautiful + Product Hunt) for eyes +
  backlinks; localization for compounding low-competition SEO. _To be scored + run._
- **Learnings:** _(fill in as we go)_
