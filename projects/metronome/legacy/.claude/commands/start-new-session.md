---
description: Bootstrap a work session — load the working docs (create any missing), then continue or start a task
---

You are starting a work session. Load project context from the working docs, then route to the right
task. Work through these steps in order.

## 1. Load context — read these (cheap first)
- `.claude/working-docs/current-status.md` — quick "where are we right now" snapshot
- `.claude/working-docs/current-tasks.md` — the active task, if any
- `.claude/working-docs/ARCHITECTURE.md` — how the codebase is structured (file map, gotchas)
- `.claude/working-docs/memory.md` — durable preferences, decisions + rationale, lessons
(For deeper history, `docs/STATUS.md` exists — only read it if you need more than the snapshot.)

## 2. Create + populate any missing docs (before going further)
If any of the four files above is **missing**, create and **populate** it now, then tell the user
which you had to create:
- `ARCHITECTURE.md`, `current-status.md`, `memory.md` → reconstruct accurately by reading the
  codebase + `docs/STATUS.md` + recent git history. Match the existing docs' **agent cold-start
  reference** style (path-precise, scannable, invariants/gotchas forward).
- `current-tasks.md` → create from its template with an empty Active task.

## 3. Brief the user
In 2–4 lines, orient from what you read: current health (tests/build), what works, current focus,
and any known issues / untriaged bugs.

## 4. Route to a task
- **If `current-tasks.md` has an ACTIVE task** (not the empty placeholder): use `AskUserQuestion` to
  ask whether to **(a) continue that task** — summarize where it left off, then proceed — or
  **(b) start a new task**. If they pick a new task: first archive the old task's outcome into
  `docs/STATUS.md` + `current-status.md`, then run the **`/start-new-task`** flow
  (see `.claude/commands/start-new-task.md`).
- **If there is NO active task**: ask whether they want to **start a new task**. If yes → run the
  `/start-new-task` flow. If no → await their direction.

## Rules
- This command bootstraps the session and routes to a task — **do not write feature code here**.
- You never run git or start dev/llama servers — give the user the command.
- metronomnom has **no** "privacy / no-CDN / no-telemetry" constraint (it uses Google
  Fonts CDN, FlexOffers, Vercel). Don't reintroduce that assumption.
