---
name: coordinate
description: Coordinate bounded agent tasks with capability-aware dispatch and synthesis.
version: 1.2.0
requires_agents: orchestrator
requires_skills: coordinator-mode, parallel-agents
artifact_outputs: coordination-plan, phase-status, audit-trail, final-synthesis
---

# /coordinate — Capability-Aware Coordination

$ARGUMENTS

Use the `orchestrator` and follow `.agents/platforms/orchestration-contract.md`.

1. Select the available platform adapter and inspect its declared capabilities.
2. Run `DECOMPOSE → CLASSIFY → DISPATCH → MONITOR → SYNTHESIZE → VERIFY`.
3. Form an Eager Analysis Triad of exactly three agents with independent envelopes and dispatch all three before awaiting any result.
4. Use primary analysis, risk/edge analysis, and verification planning when domains are fewer than three; group broader scope into three envelopes when domains are greater than three.
5. Review the three results one by one, then synthesize. Start analysis eagerly, but apply dependent and overlapping writes sequentially by ownership.
6. Without real concurrency, enqueue all three before synthesis, declare sequential fallback, and do not claim parallelism.
7. Apply adaptive approval: low automatically, medium only when material ambiguity exists, high always before destructive or external execution.
8. Keep implementation with specialists; the coordinator owns decomposition, monitoring, conflict resolution, synthesis, and completion decisions.
9. Require result envelopes, bounded retries, capability-safe fallback, independent verification, and an audit trail.

Return a concise coordination report containing task states, assignments, evidence, artifacts, approvals, fallbacks, verification, unresolved risks, and final synthesis.
