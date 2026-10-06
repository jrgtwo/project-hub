<!-- jrg-scaffold: 2 -->
# Ticket workflow

## Layout

Everything the workflow manages lives under `jrg/`. It never edits files outside `jrg/`, and outside a migration it reads only `jrg/` and the code — not other docs in the repo, unless the user points to them.

```text
jrg/
  knowledge/    how the project works — kept current, owned by no workflow
    plans/      plan packets, one folder per plan
  tickets/      work tracking — this workflow
  legacy/       superseded material, kept for history and never cited
```

**Knowledge and tracking are separate on purpose.** `knowledge/` must make sense without `tickets/`, so the tracking layer can be replaced without losing anything.

## Sources of truth

- **Ticket file: its `Status` line is the only place status is written.** The file also owns scope, direct dependencies, acceptance criteria, verification, working notes and completion evidence.
- Milestone `index.md`: goal, entry conditions, exit criteria, outcome evidence, and the ticket list — **the list order is working order**.
- Initiative `index.md`: outcome, scope and milestone sequence, plus a ledger table generated from the tickets.
- [`STATUS.md`](STATUS.md): generated view of every initiative, milestone, active ticket and open plan question, with consistency problems. Read this first.
- `knowledge/`: how the project works. A ticket that changes how something works updates the owning knowledge doc in the same change.
- [Deferred](deferred/index.md), [backlog](backlog/index.md) and, after a migration, [pre-migration](pre-migration/index.md): holding lists outside any initiative.

## Generated views

the status command (the status command in a repo; `python3 status.py projects/<name>` from a hub) reads every ticket's `Status` line, the milestone ticket lists and each plan's decision register, then rewrites `STATUS.md` and each initiative ledger (between its `ledger:begin`/`ledger:end` markers). Never edit those by hand; change the ticket and re-run. **Re-run after every status change, new ticket, reordering or answered question, in the same change.** `--check` exits non-zero if the views are stale or the tickets are inconsistent.

The script's consistency checks: every ticket file is listed in its milestone index exactly once and every listed file exists; IDs are unique; statuses are valid; `in_progress` and `blocked` tickets have a `Next:` line; `Depends on` and `Parent` links resolve; a parent depends on its sub-tickets; nothing is `done` while a dependency is open. Fix reported problems as their own change, not silently.

## Status values

| Status | Meaning |
| --- | --- |
| `todo` | Work has not started; consult dependencies and entry conditions before selecting it |
| `in_progress` | Work is actively underway |
| `blocked` | Progress needs a specific external answer, access or dependency that cannot currently be resolved |
| `awaiting_merge` | Hub projects only: the work is finished on a branch that hasn't reached the default branch yet |
| `done` | Acceptance criteria are satisfied and completion evidence is recorded |
| `cancelled` | Intentionally removed or superseded; reason and replacement/scope decision are recorded |

Future dependent tickets remain `todo`; not every not-yet-ready task is blocked.

## Working a ticket

1. Choose a `todo` ticket whose direct dependencies are done and whose milestone entry condition permits the work.
2. Set its `Status` to `in_progress`, write its `Next:` line and regenerate the views. Prefer finishing a bounded task before starting another.
   Then, before any work: **open questions first** — anything the plan's decision register or the ticket leaves for the user is asked and answered before building. With none left, work starts in the project's **build mode** (`Build mode:` in [index.md](index.md)): `multi-agent` builds with `/jrg-build` (build → independent review → fix), `inline` works in the session. Either way, work stops whenever a question comes up that changes what the user gets.
3. Implement only its scope. When a decision is made, record it in the owning knowledge doc (or the plan's decision register) in the same change.
4. Check off acceptance criteria with evidence: a command and its result, a reviewed file, a recorded decision, or the user's word. When the user says a ticket is done or committed, that is their confirmation; run any remaining checks the agent can run itself instead of asking.
5. Set `Status` to `done` and write `Completion evidence`: date, changed files or commit, verification results, accepted limitations. **Anything worth knowing later goes into `knowledge/`, not only into the ticket.**
6. If blocked, record the concrete blocker, who or what resolves it, and progress so far; set `Status` to `blocked`.
7. At a milestone exit, record outcome evidence in its index and continue to the next ready ticket.

## Sessions

The ticket files are the only session state; there is no separate handoff document.

- **Start** with `/jrg-start`: regenerate and read `STATUS.md`, then resume or pick a ticket. A session has one current ticket; switching is explicit.
- **The ticket's `Notes and blockers` section is its working state.** Keep a `Next:` line at the top stating the concrete next step, so anyone can resume cold. Rewrite the section as work moves; delete what is no longer true rather than appending history.
- **End** (or pause) with `/jrg-ticket`.

## Adding and changing work

An initiative is a folder with an `index.md`, a unique ID prefix and numbered milestone folders (`01-…`, `02-…`). Add new initiatives to [`index.md`](index.md), with ledger markers in the initiative index.

IDs are stable and increase monotonically within an initiative (`PRE-001`); never reuse cancelled IDs or renumber history. A ticket file is `<id>-<short-slug>.md` in its milestone folder, listed in the milestone index at its place in working order.

Each ticket has one reviewable outcome. Separate an unresolved decision from implementation when the answer changes behavior. Split a ticket that becomes more than one independently deliverable change.

Newly discovered defects belong in the current milestone if they block its acceptance. Do not quietly move required acceptance work into the backlog.

Keep completed folders and IDs in place so history and links remain stable.

## Branches (hub projects only)

In a repo's own `jrg/`, notes live on the branch and merge with it, so nothing here applies. In a hub, one copy of the notes serves every branch, so: **knowledge follows the project's default branch; tickets follow branches.**

- When work starts on a non-default branch, the ticket gets `- Branch: <name>`.
- Knowledge changes made on that branch go to `knowledge/pending/<ticket-id>.md` as short bullets of what changed, and the ticket gets `- Knowledge pending: knowledge/pending/<ticket-id>.md`. Nothing reads that file during normal work.
- Finished on the branch → `Status: awaiting_merge`. It becomes `done` when the branch is in the default branch: then the pending file is applied to the knowledge docs and deleted. A cancelled ticket's pending file is deleted unapplied.
- `/jrg-start` checks every `awaiting_merge` ticket at the start of each session (`jrg-hub merged`), so merges are picked up without anyone remembering.

## Sub-tickets

When work on a ticket uncovers additional **required** work, cut a sub-ticket rather than widening the ticket.

- Take the next unused ID in the initiative. Place the file in the parent's milestone folder.
- Add `- Parent: [ID — Title](link)` to its header and add it to the parent's `Depends on`. The parent cannot be `done` while a sub-ticket is open.
- List it in the milestone index directly below the parent (after earlier sub-tickets of the same parent).
- Work sub-tickets in list order, then return to the parent. The parent's `Next:` names the sub-ticket being worked.
- Work not required for the parent's acceptance is a later ticket, a backlog entry or a deferred entry.

## Plans

Large or unclear work is planned before it is ticketed. **A plan is a milestone of tickets**, so it can take days and be resumed by any session.

- The initiative's first milestone is `00-plan`. Its tickets are the plan's passes — typically brief, draft, review, answer questions, consolidate, readiness. A second review round is another ticket.
- The plan's documents live in `knowledge/plans/<initiative-slug>/`: `brief.md`, `plan.md` and `decisions.md` (the decision register).
- Size is proposed by the agent in the brief, with its reason, and can change: more open questions than expected means another pass; an obvious single change means skip straight to tickets.
- The plan's last step adds the build milestones after `00-plan`. Build tickets cite plan sections in `Sources:`.
- When the build is done, the plan's still-true content is folded into the owning knowledge docs and the plan folder moves to `legacy/`.

## Decision questions

Open questions live in the plan's `decisions.md`, not as one ticket each. Each entry has an ID, `Status: open | answered | parked`, the tickets it blocks, and an `Answer:` written by the agent when the user answers.

When asking:

- **Plain product terms first**: what is being decided, a concrete example, why it matters, a recommendation. Never put a register ID in front of the user without saying what it means.
- **Say the count up front** ("3 questions in this pass"), ask one at a time, and show progress.
- The agent settles technical or mechanical questions itself with a stated default; only questions that change what the user gets reach the user.
- New questions found mid-pass go into the register for a later pass, not into the current stream.
- **Questions can be paused.** Answers are written the moment they are given, so leaving mid-stream loses nothing. The user can answer later in any session by just saying so; the agent records it. Only tickets listed under a question's `Blocks` wait on it.

## Holding lists

Each list's `index.md` header declares `What`, `Add when`, `Remove when` and `Last groomed`. Entries are sections with a one-line heading, a few metadata lines and two or three lines of prose. Record entries directly in the list; do not stage them elsewhere.

- **[Deferred](deferred/index.md)**: noticed during a ticket, uncertain, may be nothing.
- **[Backlog](backlog/index.md)**: definitely wanted, not yet placed in an initiative and milestone.
- **[Pre-migration](pre-migration/index.md)** (only after a migration): every work item imported unverified from the docs this workflow replaced. Grooming sorts each into history, a ticket, backlog, deferred, or dropped.

Neither list may hold work that blocks the current milestone's acceptance; that becomes a ticket now.

## Grooming

`/jrg-groom` reviews a holding list one entry at a time, applying its header's `Remove when`. For each entry the user decides; the agent never bulk-classifies. An entry that cannot be settled quickly stays, marked `unverified: <date>`. Update `Last groomed` when finished.
