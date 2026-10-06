# Backlog

[Tickets](../index.md) · [Workflow](../../../../workflow.md#holding-lists)

- **What:** work that is definitely wanted but not yet placed in an initiative and milestone.
- **Add when:** the work is wanted, is not required for the current milestone's acceptance, and has no ticket yet.
- **Remove when:** it becomes a ticket, or is rejected.
- **Last groomed:** never.

Entry format:

```markdown
## <one line naming the work>

- Added: <date>
- Type: feature | bug | idea | chore
- Likely home: <initiative/milestone guess, or "future initiative">

<Two or three lines: what it is, and why it is wanted.>
```

## Entries

## Dependencies between projects

- Added: 2026-10-05
- Type: feature
- Likely home: future initiative

Tickets in one hub project depending on tickets in another (e.g. an app waiting on a lib). Deferred to keep the hub simple. Open issues are listed under "Conveniences" in [hub-mode.md](../../knowledge/hub-mode.md): link by `project/ID`, private may depend on public only, regenerating dependents' status, broken links, cycles.

## Moving a repo's docs into the hub

- Added: 2026-10-05
- Type: feature
- Likely home: future initiative

Today migration into a hub only reads the repo. Offering to *move* docs needs per-folder rules for which docs are live (e.g. GitHub Pages dev docs) and which are workflow leftovers.

## Plugin mods: status line and project picker

- Added: 2026-10-05
- Type: idea
- Likely home: future initiative

Research Claude Code plugin mods: a status line always showing the current project and ticket, and possibly a custom pane or arrow-key picker for projects (the built-in picker shows at most 4 options).

