# History

What shipped, newest first. Plugin versions are `version` in jrg-skills' `.claude-plugin/plugin.json`.

## 2026-10-05

- **0.6.3** — `/jrg-start` run outside any project with no hub now offers to create or point to a hub, instead of guessing a project. New rule in `/jrg-start` and the root lookup: never pick a project by guessing (open files, recent activity, scanning folders). Found on the first real run from `~/projects`.
- Notes for jrg-skills moved into the hub (`project-hub/projects/jrg-skills/`); the repo stays plugin code only. Stray `__pycache__` files removed from the repo and ignored.

## 2026-10-04

- **0.6.2** — hub setup saves the hub's location itself (with consent): `pluginConfigs.jrg-skills@jrg-skills.hub_path` and the hub in `additionalDirectories`, in one question.
- **0.6.1** — upgrades: `workflow.md` scaffold version 2; `/jrg-start upgrade` (`jrg-hub upgrade`) replaces `workflow.md`, `status.py` and templates, never tickets or knowledge.
- **0.6.0** — `/jrg-build` and `workflows/jrg-build.js`: the multi-agent build → independent review → fix workflow, generalized from fretwork's `multi-agent-task`. Every ticket now starts with open questions first, then works in the project's build mode (`multi-agent` / `inline`, asked once per project); work stops whenever a question comes up.
- The user's personal git guard got one exception: `git -C <hub> pull|add|commit|push`, hub path read from `pluginConfigs`. (Personal setup, not part of the plugin.)

## 2026-10-03

- **0.5.0** — hub mode, slices 1–5: hub layout and `bin/jrg-hub` helper; root lookup in every skill; `/jrg-projects` (locations, scan, register, new, link, relink, archive, make private, remove); `/jrg-overview`; project picker; hub auto-sync with consent and a session-start check hook; branches (`awaiting_merge`, pending knowledge, merge sweep); privacy (visibility checks, `private/`); stats pages. Design: [hub-mode.md](hub-mode.md).
- **0.3.x** — plugin restructure to 8 skills with one-line descriptions; `jrg-ticket` takes the user's word for done; workflow folder moved from `docs/` to `jrg/`; setup and migration stopped touching `CLAUDE.md`, `.gitignore` and agent rules; migrate-or-start-clean choice; subagents-or-inline migration mode; version-bump pre-commit hook.
- Global rules cleanup (separate from the plugin): minimal `~/.claude/CLAUDE.md`; 71 behaviour-rule memory files and behaviour sections in 5 project `CLAUDE.md` files removed. Backup in `~/projects/backups/claude/`.

## 2026-10-02

- **0.1–0.2** — jrg-skills created: football-cards' ticket workflow generalized, installed as a Claude Code plugin from its own marketplace.
