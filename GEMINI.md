# AG Kit — Gemini Entry Point

This file is intentionally thin. Shared rules, agents, skills, workflows, and orchestration semantics live under `.agents/` and must not be duplicated here. Google Antigravity is treated as a Gemini host and uses this entrypoint.

1. Read `AGENTS.md` first and preserve its mandatory announcement header for every response.
2. Read `.agents/rules/core-protocol.md`, the remaining applicable rules in `.agents/rules/`, and `.agents/memory/MEMORY.md`.
3. For multi-agent work, read `.agents/platforms/orchestration-contract.md` and `.agents/platforms/gemini.md`.
4. Route coordination through `.agents/agent/orchestrator.md` and load only the specialist agents and skills required by the task.

Use only capabilities actually exposed by the active Gemini host. If native agent or subagent capabilities are unavailable, follow the contract's sequential fallback while preserving adaptive approval, task boundaries, evidence, bounded retries, auditability, and independent verification.
