# Deferred

[Tickets](../index.md) · [Workflow](../../../../workflow.md#holding-lists)

- **What:** something noticed while working a ticket that is uncertain and may turn out to be nothing.
- **Add when:** an observation is worth a later look but is not required for the current ticket or milestone.
- **Remove when:** someone has looked at it — dropped, promoted to a ticket, or moved to the backlog.
- **Last groomed:** never.

Entry format:

```markdown
## <one line saying what was noticed>

- Found during: [<ticket title>](<link>) · <date>
- Priority: low | medium | high

<Two or three lines: what was seen, and why it might matter.>
```

## Entries

## Untested parts of the plugin — check on the next real runs

- Found during: first real run of 0.6.2 · 2026-10-05
- Priority: high

Tested only with scratch folders and stubs so far: hub auto-sync against a real remote; the session-start hub check inside Claude Code; `jrg-hub` on the PATH (the first run fell back to its full path); `/jrg-build` on a live ticket; the one-time settings write.

