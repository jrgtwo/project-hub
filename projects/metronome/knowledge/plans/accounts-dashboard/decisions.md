# Decisions — Accounts and progress dashboard

[Brief](brief.md) · [Plan](plan.md)

The decision register. Written only by the agent; the user answers in conversation. `Status: open | answered | parked`. The status script counts the open and parked entries into `STATUS.md`.

Entry format:

```markdown
## Q1 — <plain-language question>

- Status: open
- Blocks: <ticket titles, or "plan only">
- Asked: <date>

<What is being decided, one concrete example, why it matters.>

Recommendation: <one line>.

Answer: <the user's words> — read as: <one line> (<date>)
```

## Questions

## Q1 — Which free service should hold accounts and practice data?

- Status: open
- Blocks: every build ticket (Accounts, Practice recording, Progress dashboard milestones)
- Asked: 2026-10-04

Supabase is out. The service decides how sign-in works, whether the app needs server code, and what happens at the free-tier limits. For example: with Neon's Data API the browser saves a finished trainer run straight to the database, and the database's own rules keep each user to their own rows. With typing-tutor's setup, the same save goes through a Vercel function, which is more code, and Vercel's Hobby plan is non-commercial while this app shows ads. The comparison is in [plan.md](plan.md#backend-and-sign-in).

Recommendation: Neon Postgres + Neon Auth + Data API, as a new Neon project.

## Q2 — How should people sign in?

- Status: open
- Blocks: Accounts milestone (sign-in tickets)
- Asked: 2026-10-04

The choice is which buttons the sign-in screen shows. Google sign-in is free and needs no email setup. A "magic link" emailed to any address needs an email-sending provider and its free limits. Apple needs a $99/yr developer account. Each extra method is more setup and more to test.

Recommendation: Google only for the first release; add magic link later if people ask.

## Q3 — What happens to practice before someone signs in?

- Status: open
- Blocks: Practice recording milestone
- Asked: 2026-10-04

Example: someone uses the trainer for two weeks without an account, then signs up. Either those two weeks show up on their new dashboard, or the dashboard starts empty on sign-up day. Keeping them means recording on the device all the time and uploading on sign-in. It also means a signed-out visitor could be shown a small "sign in to save your progress" hint.

Recommendation: always record on the device and upload on sign-in, so no practice is lost.

## Q4 — What should the dashboard show?

- Status: open
- Blocks: Practice recording milestone (what is recorded), Progress dashboard milestone
- Asked: 2026-10-04

"Progress" can mean several things. Two examples of the same week: "your trainer runs climbed from 100 to a best of 132 in 4/4", or "you practised 3 h 10 m across 9 sessions". The trainer is the main focus, but plain metronome use could be counted too. What gets recorded follows from this, and data not recorded now can't be shown later.

Recommendation: trainer runs over time (start BPM and highest BPM held), personal bests per time signature, targets reached, practice time per week, and a recent-sessions list. Record plain metronome sessions too, as a secondary series.

## Q5 — Where does the dashboard live?

- Status: open
- Blocks: Progress dashboard milestone
- Asked: 2026-10-04

The app is one screen today. About and Calibrate open as overlays on top of it. The dashboard can be another overlay, or its own page with its own address (`metronomnom.com/progress`) that can be bookmarked and has room for charts. A page is the app's first route, which touches the build's loading skeleton and the hosting config.

Recommendation: its own page at `/progress`, opened from an account button on the main screen.
