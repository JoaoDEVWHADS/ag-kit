# AG Kit Toolkit Changelog

## Unreleased

### Added

- Mandatory Eager Analysis Triad with exactly three independent analysis envelopes, per-result coordinator review, and synthesis only after all three reviews.
- Thin root entrypoints for Codex, Claude Code, and Gemini without duplicating the shared rules or specialist definitions.
- A platform-neutral orchestration contract with native-capability adapters and a contract-preserving sequential fallback.

### Changed

- Sequential-only hosts queue all three analysis envelopes and disclose the fallback; dependent writes remain sequential.
- Official runtime support now covers Codex, Claude Code, and Gemini; Google Antigravity is documented as a Gemini host.
- The chief coordinator uses adaptive approval: low-risk work is automatic, material ambiguity is conditional, and high-risk work requires explicit approval.
- Project Git convention records logical local commits on the main branch for the current initiative.
- Corrected the internal inventory to 21 agents, 48 skills, and 14 workflows.

## 2026.7.18

### Added

- Strict SemVer metadata for the managed agents, skills, workflows, and 6 rules.
- Machine-readable `manifest.json` with agent-to-skill and workflow dependencies.
- Deterministic `manifest.lock.json` with SHA-256 integrity hashes.
- Generated `DEPENDENCY_GRAPH.md` for workflow → agent → skill orchestration.
- JSON schemas for component metadata, manifest, lock, and memory topics.
- Standard memory topic files for user preferences, technical decisions, and feedback history.
- Registry and graph generation scripts with non-mutating `--check` modes.

### Changed

- Toolkit version advanced from `2026.7.12` to `2026.7.18`.
- Self-validation now checks component versions, workflow references, dependency compatibility, registry drift, lock integrity, graph drift, and memory contracts.
- CI now treats generated registry files as release artifacts that must remain synchronized.

### Compatibility

- At this release, official runtime support was Gemini CLI and Google Antigravity.
- The component metadata and dependency format were portable and avoided platform-specific runtime assumptions.

## 2026.7.12

- Release-safety upgrade, non-destructive CLI updates, rollback support, CI, dependency review, and hardened publishing.
