---
name: coordinate
description: Coordinate bounded agent tasks with capability-aware dispatch and synthesis.
version: 1.1.0
requires_agents: orchestrator
requires_skills: coordinator-mode, parallel-agents
artifact_outputs: coordination-plan, phase-status, audit-trail, final-synthesis
---

# /coordinate — Capability-Aware Coordination

$ARGUMENTS

Use the `orchestrator` and follow `.agents/platforms/orchestration-contract.md`.

1. Select the available platform adapter and inspect its declared capabilities.
2. Run `DECOMPOSE → CLASSIFY → DISPATCH → MONITOR → SYNTHESIZE → VERIFY`.
3. Dispatch complete task envelopes to the smallest sufficient set of specialists.
4. Run independent reads concurrently; serialize dependencies and overlapping writes.
5. Apply adaptive approval: low automatically, medium only when material ambiguity exists, high always before destructive or external execution.
6. Keep implementation with specialists; the coordinator owns decomposition, monitoring, conflict resolution, synthesis, and completion decisions.
7. Require result envelopes, bounded retries, capability-safe fallback, independent verification, and an audit trail.

Return a concise coordination report containing task states, assignments, evidence, artifacts, approvals, fallbacks, verification, unresolved risks, and final synthesis.
