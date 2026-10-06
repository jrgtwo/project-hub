---
description: Product-interview a new task and write it into .claude/working-docs/current-tasks.md
argument-hint: [optional one-line task idea]
---

You are starting a **new task**. Through a short **product interview**, define the task precisely and
record it in `.claude/working-docs/current-tasks.md` so that doc becomes the single source of truth
for what we're doing and where we are.

Initial task idea (may be empty): $ARGUMENTS

## Do this

1. **Protect in-progress work.** Read `.claude/working-docs/current-tasks.md`. If it has an unfinished
   Active task, ask the user whether to archive it (summarize into `docs/STATUS.md` / `current-status.md`)
   before overwriting — never silently discard in-flight work.

2. **Interview the user — one question at a time** (prefer multiple-choice; don't overwhelm) to pin down:
   - **Goal / outcome** — what does "done" look like?
   - **Why / context** — the problem and what prompted it.
   - **Requirements** — the observable "what."
   - **Constraints & out-of-scope** — note: metronomnom has **no** "privacy / no-CDN / no-telemetry"
     constraint (it uses Google Fonts CDN, FlexOffers, Vercel); don't assume one. Capture whatever
     real constraints the task has.
   - **Success criteria + verification** — which tests, `tsc`/`build`, and any manual check.

   Keep it lightweight. If this is substantial creative/feature work, this interview just scopes it —
   hand off to the **superpowers:brainstorming** skill for deep design, then come back and fill the doc.

3. **Draft a bite-sized step plan** and confirm it with the user before writing.

4. **Write the result** into `.claude/working-docs/current-tasks.md`, filling its sections: Active task,
   Goal, Why / context, Requirements, Constraints & out of scope, Plan / steps, Progress (start it),
   Open questions / decisions, Done when. Replace the template placeholders.

5. **Optionally mirror** the steps into the task tracker (`TaskCreate`) for live status.

## Rules
- Do **not** write code in this command — it only *defines* the task. Implementation follows once the
  plan is agreed (and, for features, after the brainstorm → spec → plan flow).
- As work proceeds in later turns, keep `current-tasks.md` updated (check off steps, update Progress).
- You never run git or start servers — give the user the command.
