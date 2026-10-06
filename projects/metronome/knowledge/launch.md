# Launch

metronomnom is a proving ground for launching an app end to end. This doc owns the reusable launch playbook, how launch success is measured, the SEO setup, and the monetization decision. metronomnom is test case #1.

## Why this project exists

- The goal is to learn and write down every step of launching a real app, marketing and traffic included. Making money from the metronome right now is not the goal.
- Each stage is an **experiment**: what can one builder working alone actually do, in what order, for how much effort.
- **Reusable assets come first**: conventions, checklists, templates and infra that carry over to the next app (UTM convention, launch checklist, outreach templates, experiment log).
- A metronome is a commodity, so be honest about it. Don't sell features as the hook. Latency calibration is a footnote, not the pitch. See [product](product.md).

**Status:** the playbook is written. The launch has not been run yet.

## Deploy

Live at **https://metronomnom.com/**. It is the canonical URL, `og:url` and JSON-LD `url` in `index.html`, and the only URL in `public/sitemap.xml`. Hosted on Vercel; build and deploy details are in [development](development.md).

## Measurement

**Decision: no new third-party SaaS.** No analytics vendor to onboard, no event pipeline. Use only what is already installed:

| Tool | Where |
| --- | --- |
| Google Analytics 4 (`gtag`, `G-Z6ENKCZ67G`) | inline script at the top of `index.html` `<head>` |
| Vercel Web Analytics (`<Analytics />`) | `src/main.tsx`, package `@vercel/analytics` |
| Vercel Speed Insights (`<SpeedInsights />`) | `src/main.tsx`, package `@vercel/speed-insights` |

UTM tracking needs no code. GA4 sorts `utm_*` params into its acquisition reports, and Vercel records referrers. Custom "engaged" event instrumentation is deliberately kept out of the launch work; it is a separate effort.

## SEO

It is a single-page app with an empty `#root`, so everything a crawler needs sits in static `index.html`:

- **Keyword title**: the searchable fields lead with the keyword. `<title>`, `og:title` and `twitter:title` all read `metronomnom — Free Online Metronome`. There is also a meta description and `<link rel="canonical">`.
- **Share cards**: Open Graph (`og:image` = `/og.png`, 1200×630) plus a Twitter `summary_large_image` card. Source art is `public/og.svg`, and the rendered image is `public/og.png`.
- **JSON-LD**: one `WebApplication` block (`MusicApplication`, price 0) and one `FAQPage` block.
- **Crawlable About copy**: `<section id="about-content">` at the end of `<body>`. It is hidden by CSS, and `src/components/AboutModal.tsx` reads its `innerHTML` and shows it in a dialog, opened from the About button at the bottom of the expanded control deck (`ControlDeck.tsx`). That makes it real content users can reach, not a hidden SEO slab. **Its FAQ must match the `FAQPage` JSON-LD word for word.**
- **One `<h1>`**: the wordmark (`src/components/Wordmark.tsx`), with an `sr-only` " — Free Online Metronome" descriptor. Headings in `#about-content` start at `<h2>`.
- **Crawl files**: `public/robots.txt` (allow all, points to the sitemap) and `public/sitemap.xml` (the single root URL).

## Monetization

**Decision: affiliate links through FlexOffers, chosen over AdSense and EthicalAds.**

- At launch traffic levels, display networks pay almost nothing and bring a consent-banner cost.
- Affiliate links to music gear fit the musician audience and work at any traffic level. They need no third-party script.
- A one-time "remove ads" purchase stays possible later through adkit's `removeAds` entitlement. No payment flow exists.

Current state in code:

- The FlexOffers site-verification tag `<meta name="fo-verify" …>` is in `index.html`.
- `src/main.tsx` wraps the app in `<AdsProvider config={adsConfig}>`. In dev, it exposes `window.entitlementStore`.
- `src/ads.config.ts` uses the **house provider** with placeholder copy ("Your ad here") and no `href`/`cta`.
- **No ad renders on screen.** `MetronomeApp.tsx` has no `<AdSlot>`.
- To show an affiliate ad: add `<AdSlot … hideWhenEntitled="removeAds" />` back and give the house ad a real `href` + `cta` in `ads.config.ts`. Moving to a display network later only means swapping the provider (`createAdsenseProvider` / `createEthicalAdsProvider`); see [architecture](architecture.md).

## Launch playbook

The playbook works for any app. Go through it top to bottom for each new app. Each section is either a **checklist** (do these things) or a **worksheet** (answer these questions). Copy the template pack into the new project.

### 1. Readiness gate

Don't send traffic to a page that loses visitors. All of these must hold first:

- A stranger understands the one-line value prop within 5 seconds.
- The landing page turns a visitor into a *user*: the core action is obvious and works right away.
- Share/OG and Twitter cards render when the URL is tested in a card debugger.
- `robots.txt` and `sitemap.xml` exist, and analytics is installed and firing.
- There is no "why would I use this over X" question you can't answer.

### 2. Positioning worksheet

- **Who is it for?** The sharpest single user, not "everyone".
- **What job does it do?** The task they are in the middle of when they need it.
- **Why pick it over the alternatives?** Or, honestly: is it a commodity?
- **One-line hook**: what a person would actually say to a friend. Not a spec.

> metronomnom: for musicians, to keep time while practicing. **It is a commodity.** The only thing that sets it apart is charm (the mascot; see [branding](branding.md)). Hook: "a cute, free metronome", not any feature.

### 3. Channel universe and selection

Pick 2–3 channels; don't try them all.

| Channel | When it fits | Effort | Time to signal |
| --- | --- | --- | --- |
| Launch communities (Product Hunt, Show HN, r/InternetIsBeautiful, r/SideProject) | Anything with a demo; charm or novelty helps | Low | Days |
| SEO: programmatic long-tail | A finite set of high-intent queries exists (e.g. one page per value) | Med | Weeks–months |
| SEO: localization | A commodity tool where English results are crowded and other-language demand is real | Med | Weeks–months |
| App stores (PWA to Play, extension stores) | Users search *stores* for this category | Med | Weeks |
| Directories / "best X" roundups | Established listicles already rank for your term | Low (outreach) | Days–weeks |
| Default listing in communities (wiki, sidebar, Discord resource lists) | An active community recommends tools | Low (outreach) | Weeks |
| Influencer / creator mentions | Creators in the niche have the audience you want | Med (outreach) | Days |
| Referral loops (share links, embed widget) | The tool gets shared naturally (teacher to student, etc.) | Med (build) | Weeks |
| Content (articles, short video) | You will keep it up, or partner with existing creators | High | Weeks–months |
| Paid | To *learn CAC* or fund a spike; it rarely pays back on a free tool | Low | Days |

**Selection scorer:** rate each candidate 1–5 on each factor and multiply:

`audience-fit × effort-you'll-actually-sustain × (6 − cost) × (6 − time-to-signal)`

Take the top 2–3, and write down *why*. The reasoning is reusable.

> metronomnom's candidate first moves (not scored yet): a launch spike on r/InternetIsBeautiful and Product Hunt for attention and backlinks, and localization for SEO that compounds where competition is low.

### 4. Launch sequence

1. **Prep**: pass the readiness gate, build the asset kit, write the posts, pick channels.
2. **Soft/seed launch**: share quietly in 1–2 friendly communities and fix whatever confuses people.
3. **Launch day**: post to the chosen launch communities in one window, and be around to reply.
4. **Follow-up (that week)**: send the roundup/directory emails and the creator outreach emails.
5. **Compounding**: start the slow channels (SEO, localization, app stores) that pay off over weeks.

### 5. Measure and decide

Keep it light: use whatever analytics is installed (see [Measurement](#measurement)).

- **UTM convention**: tag every inbound link the same way,
  `?utm_source=<channel>&utm_medium=<type>&utm_campaign=<slug>`. Keep the strings standard so reports don't split (`reddit`, not `Reddit` or `r/x`). Analytics reads the params with no extra code.
- **Define "engaged"**: pick the one action that marks *a real user, not a bounce*. This matters most for single-page apps, where pageviews mislead. Instrumenting custom events for it is a separate project, so don't squeeze it into a launch.
- **Search Console**: verify the domain and submit the sitemap to get organic query and impression data.
- **Run each channel as a time-boxed experiment**: hypothesis, metric, keep or kill. Log every one with the experiment-log template. The primary metric is engaged sessions by UTM source, not raw hits.

### 6. Template pack

Copy these into each new project:

- Launch-day checklist
- Post templates for Show HN, Product Hunt and subreddits, each in that community's tone
- Outreach email template plus a tracker (target · contact · status · result)
- Asset checklist: OG image (1200×630), demo GIF or video, one-liner plus short and long copy
- Channel-scoring sheet (the scorer above)
- Experiment-log template, one entry per channel:
  `name · what · proves · effort · cost · time-to-signal · metric · keep/kill · reusable output`

### 7. Retro

After each launch, record what actually brought engaged users, effort against payoff for each channel, and what the playbook was missing. Fold those findings back into this doc so the playbook improves with every app.

Success is measured as process and feasibility (every experiment can be attributed and logged, and you can name which cheap channels returned engaged users). It is not measured as revenue or a traffic number.
