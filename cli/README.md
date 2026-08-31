# AG Kit CLI

CLI for installing and safely updating [AG Kit](https://github.com/vudovn/ag-kit), a portable multi-agent engineering team for Codex, Claude Code, and Gemini. Google Antigravity uses the Gemini entrypoint.

## Installation

```bash
npx @vudovn/ag-kit init
```

Or install globally:

```bash
npm install -g @vudovn/ag-kit
ag-kit init
```

## Commands

| Command | Description |
|---|---|
| `ag-kit init` | Install `.agents` and missing root entrypoints (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) |
| `ag-kit update` | Update managed files and unchanged root entrypoints while preserving local changes |
| `ag-kit rollback` | Restore the newest or a selected pre-update backup |
| `ag-kit status` | Show installation, manifest, toolkit version, backups, and CLI status |

## Safe update model

AG Kit records SHA-256 baselines in `.agents/.ag-kit/manifest.json`. During an update it compares the previous upstream version, the current local file, and the new upstream file.

- Clean managed files are updated automatically.
- Files changed only locally are preserved.
- User-created files are preserved.
- Files changed both locally and upstream are reported as conflicts.
- Incoming conflict copies are written under `.agents/.ag-kit/conflicts/`.
- Existing root entrypoints are never overwritten unless their hash still matches the stored installation baseline.
- Conflicting incoming entrypoints are preserved for review using the same managed-tree conflict model as `.agents/` files.
- A full pre-update backup is stored under `.ag-kit-backups/` by default.

```bash
ag-kit update --dry-run
ag-kit update --strategy merge
ag-kit update --strategy replace
ag-kit rollback
ag-kit rollback --backup 20260712-090000-000
```

`merge` is the default strategy. `replace` is intentionally explicit and still creates a backup unless `--no-backup` is supplied.

## Common options

```bash
ag-kit init --path ./myapp
ag-kit init --branch dev
ag-kit update --force
ag-kit update --quiet --force
ag-kit update --conflict-report ./ag-kit-update.json
ag-kit rollback --dry-run
```

When `--quiet` is used against an existing installation, `--force` is required because the CLI cannot safely ask for confirmation.

## Included toolkit

- **21 agents**, including the chief coordinator
- **48 skills**
- **14 workflows**
- Shared rules, persistent memory conventions, MCP configuration, and validation scripts
- Root entrypoints for Codex (`AGENTS.md`), Claude Code (`CLAUDE.md`), and Gemini/Antigravity (`GEMINI.md`)

Native multi-agent execution is used only when the active host exposes it. AG Kit otherwise preserves the same decompose → delegate → monitor → synthesize → verify lifecycle through sequential specialist execution. OpenCode configuration is experimental and is not an officially supported runtime.

## Exit codes

| Code | Meaning |
|---:|---|
| `0` | Success or no changes required |
| `1` | Download, validation, filesystem, or configuration failure |
| `2` | Update completed, but one or more conflicts require manual review |
| `130` | Interrupted by the user |

## License

MIT
