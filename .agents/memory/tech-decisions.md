---
type: project
created: 2026-07-18
updated: 2026-08-31
---

# Technical Decisions

- Component metadata uses SemVer while the toolkit release keeps CalVer.
- `manifest.json` and `manifest.lock.json` must remain synchronized with component frontmatter.
- Multi-agent behavior is defined once in `platforms/orchestration-contract.md`; root entrypoints and platform adapters remain thin and must not duplicate the core.
- Codex, Claude Code, and Gemini adapters map capabilities detected in the active host. Google Antigravity uses the Gemini adapter.
- Native multi-agent execution is preferred when available. Otherwise, the coordinator uses a contract-preserving sequential fallback and blocks work when safety or independent verification cannot be maintained.
- The chief coordinator uses adaptive approval: low-risk bounded work may proceed automatically, medium-risk work requires approval when ambiguity materially affects the outcome, and high-risk work always requires explicit approval.
