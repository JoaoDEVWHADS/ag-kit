# Multi-Agent Orchestration

## Goal

Turn AG Kit into a portable agent team with a risk-aware chief coordinator and native adapters for Codex, Claude Code, and Gemini.

## Tasks

- [ ] Define the platform-neutral orchestration contract and adaptive approval policy. → Verify: toolkit validation accepts every changed component.
- [ ] Refactor the chief orchestrator around decomposition, delegation, monitoring, synthesis, and independent verification. → Verify: orchestration workflow references the shared contract.
- [ ] Add Codex, Claude Code, and Gemini adapter guidance without duplicating specialist definitions. → Verify: each platform has a complete invocation mapping and fallback behavior.
- [ ] Align routing rules, memory, architecture catalog, and installation assets with multi-platform support. → Verify: generated manifests and dependency graph remain synchronized.
- [ ] Add automated checks for adapter completeness and orchestration invariants. → Verify: targeted tests and the full toolkit validation pass.
- [ ] Update user-facing documentation and examples. → Verify: documented commands and file paths match the shipped tree.

## Done When

- [ ] One request can be routed through a chief coordinator to bounded specialists on all three supported platforms.
- [ ] Simple safe work runs automatically while ambiguous, destructive, or high-impact work requires approval.
- [ ] Every logical change is stored in its own local commit on `main`, with no remote push.

## Notes

The implementation uses native agent capabilities first and a shared contract that leaves room for a future standalone runtime.
