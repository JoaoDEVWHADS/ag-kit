# AG Kit

AG Kit is a modular `.agents/` toolkit for routing software-engineering tasks to specialist agents, loading focused skills, and verifying changes with executable checks.

Its Markdown core is portable across Codex, Claude Code, and Gemini. Thin root entrypoints select a native-capability adapter without duplicating shared rules:

| Host | Entrypoint | Adapter |
| :--- | :--- | :--- |
| Codex | `AGENTS.md` | `platforms/codex.md` |
| Claude Code | `CLAUDE.md` | `platforms/claude-code.md` |
| Gemini and Google Antigravity | `GEMINI.md` | `platforms/gemini.md` |

All adapters implement `platforms/orchestration-contract.md`. They inspect capabilities at runtime and, when native concurrency is unavailable, queue the three analysis envelopes and serialize dependent writes without weakening the contract.

Every coordinated request starts with the **Eager Analysis Triad**: exactly three independent analysis envelopes are dispatched before the coordinator waits, each result is reviewed individually, and synthesis begins only afterward. Use primary analysis, risk/edge cases, and verification planning when fewer than three domains exist; group larger domain sets into exactly three envelopes. Dependent writes remain sequential. Hosts without concurrency queue the three envelopes and declare the fallback without implying simultaneous execution.

## Quick start

1. Copy the `.agents/` directory into a project root.
2. Read `.agents/rules/core-protocol.md` and `.agents/memory/MEMORY.md` at session start.
3. Route work through the matching agent and load only the relevant skill sections.
4. Validate changes before completion:

```bash
python .agents/scripts/checklist.py .
```

For release verification:

```bash
python .agents/scripts/verify_all.py . --url http://localhost:3000
```

To verify AG Kit itself after editing agents, skills, workflows, rules, scripts, or links:

```bash
python .agents/scripts/generate_manifest.py
python .agents/scripts/dependency_graph.py
python .agents/scripts/validate_kit.py
```

Use `--check` with the first two commands in CI to detect stale generated files without rewriting them.

| Agent | Description |
| :--- | :--- |
| `game-developer.md` | Game developer (Unity, Godot, Phaser) |
| `teamtalk-developer.md` | TeamTalk 5 SDK developer (C++, Python, C#, Java/Android) |

## Core concepts

- **Agents** define role, boundaries, tools, SemVer, and skill dependencies.
- **Skills** contain selectively loaded domain knowledge, SemVer contracts, and optional executable scripts.
- **Rules** define workspace-wide precedence and routing behavior.
- **Workflows** provide reusable slash-command procedures.
- **Memory** stores durable project conventions and decisions.
- **Registry and lock files** make dependencies machine-readable and detect drift.
- **Runtime scripts** turn guidance into repeatable evidence.
- **Platform adapters** map detected native capabilities to one portable orchestration contract.

## Configuration

`mcp_config.json` is valid JSON. Replace `YOUR_API_KEY` before enabling the Context7 MCP server and keep the real credential outside version control whenever your runtime supports environment-based secret injection.

## Documentation

- [Architecture and inventory](ARCHITECTURE.md)
- [Platform-neutral orchestration contract](platforms/orchestration-contract.md)
- [Generated dependency graph](DEPENDENCY_GRAPH.md)
- [Runtime scripts](scripts/README.md)
- [Toolkit change history](CHANGELOG.md)
- [Repository change history](../CHANGELOG.md)
- [Quick routing reference](rules/quick-reference.md)
