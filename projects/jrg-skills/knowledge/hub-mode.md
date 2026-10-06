# Hub mode — design notes

Status: **built** (slices 1–5: hub basics, sync, branches, privacy checks, stats) — 2026-10-03. Deferred: cross-project dependencies; moving repo docs into the hub; plugin mods (status line, picker).

## Goal

One private, shareable place for a developer's whole workflow across all their projects. Today each project carries its own `jrg/` folder; in hub mode a single **hub repo** holds the `jrg/` folder for every project. Project repos stay pure code.

What it gives:

- **One clone per machine** brings every project's tickets and knowledge along.
- **Docs stay out of project repos**, so public repos don't publish them.
- **One place to choose work**: `/jrg-start` → pick a project → its next ticket; cross-project views become possible (e.g. lib work blocking an app).
- **Builds on today's design**: each project's folder in the hub is exactly today's `jrg/` (tickets, knowledge, legacy). Only where it lives changes.

## Decided

### Hub layout

```
jrg-hub/
  README.md                what the hub is
  projects.json            the project list: name, identity (remote URL, or "no git"), monorepo subfolder
  status.py, templates/,   one shared copy for every project — projects never get their own copies
  workflow.md
  projects/
    <name>/                one folder per project, same layout as an in-repo jrg/
      tickets/  knowledge/  legacy/
  shared/
    knowledge/             facts that apply to several projects
  stats/                   generated stats pages (public numbers only)
  private/                 gitignored: private projects, same layout as projects/
  .local/                  gitignored: this machine's project locations and paths
  .gitignore               private/ and .local/
```

In a hub, `workflow.md`, `status.py` and the templates exist once, at the top; upgrading the hub upgrades every project. (An in-repo `jrg/` keeps its own copies, since it must stand alone.) The helper reports each one's location; "is this project set up?" checks for the project's `tickets/index.md`.

`projects.json` holds nothing machine-specific. Private projects are not listed in it — they are registered only inside `private/`, so even their names stay out of a public hub.

### Finding a project's root

Every skill starts with one shared procedure, written once in the plugin, and then works in `<root>/tickets/…`, `<root>/knowledge/…` wherever today's skills say `jrg/…`. In order:

1. With a hub set, a project registered in the hub wins — even if the repo also has a `jrg/` (one copied into the hub is left in the repo untouched).
2. Otherwise, the current repo has its own `jrg/` → root is `<repo>/jrg/` (in-place mode).
3. Otherwise, with a hub set: look the current folder up in `<hub>/.local/paths.json` → root is `<hub>/projects/<name>/` or `<hub>/private/<name>/`. If the folder isn't there yet (fresh clone, moved folder), identify it by remote / first-commit hash / name, match it against `projects.json` and `private/`, and add it to the local file.
4. In the hub itself or a folder that isn't a project → the user picks a project.
5. A repo the hub doesn't know → the fork: register it in the hub, or work in place.

The skill names the root it found in one line ("Working in metronome — hub"). Hub-wide tools (`status.py`) run from the hub with the project as an argument. Nothing is stored in project repos; the user is only ever asked where the hub is and where a new project's notes go.

### Finding the hub — plugin setting

- `plugin.json` declares a `userConfig` option, e.g. `hub_path`, type `directory`.
- Claude Code asks for it once when the plugin is enabled on a machine, and saves it in that machine's user settings (`~/.claude/settings.json` → `pluginConfigs`). Changeable later in `/config`.
- Skills read it through `${user_config.hub_path}`, substituted into skill content at load, so a skill knows the hub's path from any folder.
- Every Claude Code surface on the machine (terminal, desktop, VS Code) reads the same settings file, so all of them know the hub.
- Not synced across machines: each machine answers once.
- If unset, `/jrg-start` offers: point to an existing hub (e.g. a clone), or create a new one (the user runs git init / remote).

### Project identity — the git remote

- A project is identified by its **git remote URL**, read locally from the repo's git config. No network access or credentials, so private GitHub and GitHub Enterprise work the same as public repos; the GHE host is simply part of the identity.
- SSH and HTTPS forms of one remote are the same project (`git@github.com:o/r.git` = `https://github.com/o/r`).
- Fallback for a git repo with no remote: its first commit's hash, which never changes between clones.
- A plain folder with no git: named in the hub; its path is asked once per machine. No marker file is written into the folder.

### Finding projects on a machine

- Each machine keeps, in a **gitignored local file inside the hub** (e.g. `.local/paths.json`):
  - a **list of project locations** (any number, e.g. `~/projects`, `~/work`, `/mnt/d/old`), and
  - each project's path on this machine.
- Scans search only those locations, never the whole machine. Each git repo's remote is matched against the hub's project list.
- **Rescan** picks up newly cloned or moved repos; it also runs automatically when a project isn't at its saved path.
- A one-off path can be set for a single project without adding its parent as a location.
- A project not found is listed as "not on this machine"; the user can point to it or clone it themselves.

### Management skill — `/jrg-projects`

Add or remove a project location, rescan, list projects with their path on this machine (or "not on this machine"), set one project's path. `/jrg-start` uses the same logic in the background when it needs to find a project.

### Where `/jrg-start` can run

| From | Behavior |
| --- | --- |
| Inside a project | Reads the repo's remote, opens that project in the hub, goes to its next ticket. Code changes in the project; ticket updates in the hub |
| Inside the hub | Shows all projects with what's in progress and next; the user picks. Good for planning and grooming; for coding, the project folder is added to the session (smoother to start from the project) |
| A git repo the hub doesn't know | Offers to register it as a project |
| Any other folder | Behaves like the hub: shows projects, the user picks |

### Project picker (running outside a project, or in the hub)

Prose list, not a menu (AskUserQuestion shows at most 4 options):

```
You're in the hub, not a project. Your projects:

  #  Project            In progress                         Next ready             Last worked
  1  metronome          Rework the trainer                  Accent editor          today
  2  fretwork-composer  —                                   Amp chunk two          3 days ago
  3  football-cards     Migrate dashboard storage (blocked) Rework the proof page  last week
  4  kanban 🔒           —                                   —                      2 weeks ago
  5  recipes-app        Write the brief (plan)              —                      new
     typing-tutor       not on this machine

Which one? (number or name)
```

- Sorted by last worked. 🔒 = private (shown locally only). "Not on this machine" projects are listed but picking one offers to link it first. New projects show their plan ticket.
- The user types a number or a name.
- After picking: planning and grooming continue in place; coding needs the project's folder — add it to the session, or (smoother) start Claude in it.
- `jrg-hub list` needs to return each project's in-progress ticket, next ready ticket (from its `STATUS.md`) and last-worked date for this table — not built yet.

**Follow-up (later):** research Claude Code plugin mods — a status line always showing the current project and ticket, and possibly a custom pane / arrow-key picker for projects.

### New projects that don't exist yet

`/jrg-projects new` creates a project in the hub with just a name — no repo or folder yet — and starts its first initiative as a plan (brief, draft, questions) before any code exists. When the repo is created, `/jrg-start` in it matches by name ("is this *recipes-app*?") and, on a yes, records the repo's remote as the project's identity from then on.

### Archiving and removing projects

- **Archive** — `archived: true` on the project's entry (for a private project, in its `private/<name>/project.json`). Its notes stay where they are, so links keep working. Archived projects drop out of the active list in `/jrg-projects` and `/jrg-start`, and out of current stats. Unarchive clears the mark.
- **Listing:** `/jrg-projects` shows active projects; `/jrg-projects archived` shows only archived ones; `/jrg-projects all` shows everything.
- **Remove** — deletes the project's hub folder and entry, only on the user's explicit OK. Removing a private project affects only this machine (`private/` isn't pushed).

### Overview skill — `/jrg-overview`

Where things stand, without picking work (that's `/jrg-start`).

- **One project:** initiatives with progress ("Hosted dashboard 4/7"), in progress / blocked / next, open plan questions, holding-list sizes, recently closed.
- **All projects:** one line per active project, plus totals (in progress, blocked, closed this week).
- Shares its data with the stats pages: the overview is the full local view; stats pages are the public-safe rendering.

### Repos not in the hub — fork

When `/jrg-start` runs in a repo the hub doesn't know, it asks once:

- **Migrate into the hub** — register the project; if the repo has an in-repo `jrg/`, move its tickets and knowledge into the hub's folder for it.
- **Work in place** — keep (or set up) `jrg/` inside the repo, as today. In-repo mode stays supported.

### Migrating a project into the hub — the repo is read-only

**The hub is the source of truth for everything in the hub; the repo is its owner's business.**

- Migration into the hub only **reads** the repo: it builds the hub's knowledge docs and imports work items into pre-migration. Nothing in the repo is moved, renamed or deleted — live docs, dev docs (e.g. GitHub Pages), anything. There is no "retire the old docs" ticket in hub mode.
- `legacy/` in the hub holds only superseded hub material (e.g. finished plans), never repo docs.
- Some facts will exist in both the repo's docs and the hub's knowledge docs. Accepted: the workflow trusts the hub; the repo's own docs are the owner's to maintain.
- **An in-repo `jrg/` moving to the hub** is copied in and left untouched in the repo. So the root lookup order changes: **a project registered in the hub wins over an in-repo `jrg/`.**
- **Import or start clean.** When a project with existing docs is added to the hub, `/jrg-start` lists them and asks: "Import these docs into the hub, or start clean?" Import = the migration tickets (read-only, as above). Start clean = the hub project begins empty and the repo's docs are never read. `/jrg-start migrate` imports them later. "Migrate" in hub mode always means import, never move.
- **Deferred:** offering to *move* a repo's docs into the hub. It would need per-folder rules for which docs are live and which are leftovers.

### Writing to the hub from a project session

Claude Code only lets a session edit inside the folder it started in plus listed extra folders (`permissions.additionalDirectories` in `~/.claude/settings.json`). A plugin can't set that, so hub setup asks once per machine: "Add the hub to `additionalDirectories` in your user settings, so sessions in any project can update its tickets? (This edits `~/.claude/settings.json`.)" On a yes, Claude adds that one entry and nothing else. The user only grants approval.

(The user's personal "write only inside the repo or scratchpad" rule, which also conflicted, was removed from their global CLAUDE.md on 2026-10-03.)

### Keeping machines in sync — hub auto-sync

The main risk is forgetting to push the hub and finding notes missing on another machine. So hub setup asks once: "Let jrg commit and push the hub automatically? It only ever touches the hub — never your project repos." Declined → the user syncs the hub themselves.

On a yes:

- `/jrg-start` pulls the hub before anything else.
- Every ticket save commits and pushes the hub (`jrg: <project> — <what changed>`).
- All hub git is written as `git -C <hub path> …`, so the target is explicit in the command.
- Project repos stay fully manual.

**Safety net (either answer):** the plugin ships a session-start hook that warns when the hub has unpushed changes or is behind its remote. Plugins carry their own hooks, so no settings edit is needed.

### Personal git guard (this user's setup, not part of the plugin)

The user's `~/.claude/hooks/block-destructive-git.py` denies commit/push/pull everywhere, which would block auto-sync. It gets one exception: when every git call in a command uses `-C <hub path>`, allow it. The hub path is read from the plugin's saved setting in `~/.claude/settings.json` (`pluginConfigs`), never hard-coded. Everything else stays blocked.

### Branches

Rule: **knowledge follows the project's default branch; tickets follow the user's branches.**

- **Tickets record their branch.** When work starts, the ticket gets `Branch: <name>` from the project's current branch. `/jrg-start` lists tickets for the current branch first; others show as in progress on another branch.
- **Knowledge waits for the merge.** On a non-default branch, knowledge changes go to a separate file, `knowledge/pending/<ticket-id>.md`, as short bullets of what changed. The ticket gets one line pointing to it. Nothing reads the file during normal work, so tickets don't grow. Abandoned branch → the file is deleted when the ticket is cancelled.
- **Done means merged.** A ticket finished on a branch is "finished, awaiting merge" until its branch is on the default branch.
- Work directly on the default branch skips all of this.

**What triggers the update after a merge** — no background watcher; the session-start sweep does it:

1. `/jrg-start` runs `git fetch` in the project, then for each ticket awaiting merge checks (read-only git) whether its branch is now in the default branch. For each merged one: apply the pending knowledge file to the knowledge docs and delete it, mark the ticket done, sync the hub, and report one line ("Trainer rework merged → knowledge updated, ticket closed"). The sweep only looks at tickets awaiting merge, so it stays cheap.
2. Or the user says "merged" to `/jrg-ticket`, which does the same immediately.

**Squash merges:** git ancestry can't see them. Fall back to read-only `gh pr view` for the branch's PR state; if there's no PR or no `gh`, ask the user once.

### Privacy — public hub, private projects

Anything in the hub is as public as the hub. A private project's notes must never land in a public hub.

- **Visibility checks** (read-only `gh repo view`; if unavailable, ask once and remember): the hub at setup, each project at registration, and both again at session start (visibility can change later). Private is the recommended default for a new hub.
- **`private/` folder.** The hub's own `.gitignore` excludes `private/`. A private project registered into a public hub goes to `private/<project>/` automatically, with the same layout and every hub feature, and the user is told. Nothing about it — not even its name or remote — is pushed.
- **Catch:** `private/` doesn't sync to other machines and has no backup.
- **Later add-on:** `private/` becomes its own private git repo nested inside the hub (one repo for all private projects, not one per project), synced by the same auto-sync. Adds nothing else to the design.

### Stats pages and private projects

Stats pages (across-projects status, "what did I do this week") can include private projects without revealing them. A setting controls how a private project appears on any page written to the public part of the hub:

| Setting | A private project appears as |
| --- | --- |
| Hidden | Not at all |
| Aggregated (default) | One combined line: "Private work: 7 tickets closed across 2 projects" |
| Anonymous | Its own line under a stable alias: "Private project 1: 4 closed, 1 in progress" (same alias every time, so trends are visible) |

- **Chosen per project at import.** When a private project is registered, the user picks its setting (default: aggregated). It's stored inside that project's `private/<project>/` folder — never in a public file — and can be changed later with `/jrg-projects`.
- Stats are computed locally from public projects and `private/` together.
- Only numbers reach the public hub — never ticket titles, project names, paths, remotes, or dates tied to specific tickets.
- Pages viewed locally and never pushed can show private projects in full.

### Landmines and their answers

1. **Two sessions editing the hub at once** (two terminals, or an offline machine catching up). Auto-sync pulls immediately before every commit and push. On a git conflict it stops and tells the user; it never resolves one itself.
2. **Duplicate ticket IDs** from two machines creating tickets before syncing. Pull before allocating an ID; `status.py` already reports duplicate IDs as a backstop.
3. **A project's remote changes** (rename, transfer, move to a fork). `/jrg-projects` gets a "re-link this repo to project X" action, so the history stays with the project.
4. **Several remotes / forks.** Identity uses `origin` by default; the user can choose a different remote per project.
5. **One repo checked out more than once** (git worktrees, duplicate clones). The per-machine map allows several paths per project, each tracked on its own branch.
6. **Monorepos.** Identity is remote + subfolder, so one repo can hold several projects.

### Conveniences the hub enables

1. **Across-projects view** — in progress and blocked everywhere, one screen.
2. **"What did I do this week"** — summarized from the hub's git history.
3. ~~Cross-project dependencies~~ — **deferred.** For now projects don't share or link tickets; the hub is a central place to stay organized. Revisit later (open issues when it is: link by `project/ID` not paths; private may depend on public, never the reverse; regenerating dependents' status; broken links on rename/archive/remove; cross-project cycles).
4. **Shared knowledge** — facts that apply to several projects (e.g. a library they all use), written once.
5. **One upgrade point** — one `status.py` and template set for the whole hub, so plugin updates reach every project at once.

### Accepted trade-offs

- **Docs don't move with code.** Knowledge docs don't follow a project's branches, and a plain clone of a project doesn't include them. Accepted for a personal setup.
- **Two repos per change.** The hub syncs itself (with consent); project repos are committed by the user as usual.
