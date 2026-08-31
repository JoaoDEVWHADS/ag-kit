---
type: project
created: 2026-05-25
updated: 2026-08-31
---

# Project Conventions

## Git Workflow
- For the current multi-agent initiative, work directly on the main branch as explicitly requested by the user.
- Create one local commit per logical change and do not push unless explicitly requested.

## Supported AI platforms (AG Kit)
- AG Kit officially supports Codex, Claude Code, and Gemini.
- Google Antigravity is treated as a Gemini host and uses the Gemini adapter.
- Do not claim official support for OpenCode, Cursor, Copilot, Windsurf, or other assistants unless their adapters and validation are added explicitly.
- Distinguish the portable Markdown core from capability-dependent native orchestration. Never promise native concurrency when the active host exposes only sequential execution.

## Orchestration Analysis
- Dispatch exactly three independent Eager Analysis Triad envelopes before waiting for results.
- Review each result individually before synthesis.
- Keep dependent writes sequential and disclose queued fallback on hosts without concurrency.
