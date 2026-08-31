---
name: orchestrate
description: Coordinate specialists through the platform-neutral orchestration lifecycle.
version: 1.2.0
requires_agents: orchestrator
requires_skills: parallel-agents, coordinator-mode
artifact_outputs: task-graph, coordination-status, audit-trail, final-synthesis
---

# /orchestrate — Multi-Agent Orchestration

$ARGUMENTS

Follow `.agents/platforms/orchestration-contract.md`. Select a platform adapter and inspect its declared capabilities before dispatch; if no compliant capability or fallback exists, report the blocked task.

## Lifecycle

1. **DECOMPOSE** the request into bounded tasks with dependencies and acceptance criteria.
2. **CLASSIFY** each task as research, implementation, or verification and assign `low`, `medium`, or `high` risk.
3. **DISPATCH** an Eager Analysis Triad of exactly three independent agents, issuing all three envelopes before awaiting any result.
4. **MONITOR** state transitions, evidence, retries, blockers, approvals, and capability fallbacks.
5. **SYNTHESIZE** results and resolve conflicts before implementation decisions or final reporting.
6. **VERIFY** acceptance criteria independently with relevant evidence.

## Approval

- `low`: proceed automatically.
- `medium`: request approval only when ambiguity materially changes outcome, scope, cost, compatibility, or user-visible behavior.
- `high`: obtain explicit approval before destructive, privileged, costly, production, publication, or external action.

Reassess risk when scope changes. Existing approval never authorizes broader scope.

## Dispatch Rules

- The orchestrator coordinates and synthesizes; domain specialists implement.
- With fewer than three domains, use primary analysis, risk/edge analysis, and verification planning; with more, group domains into three envelopes.
- Review the three results one by one before synthesis.
- Analysis always begins eagerly; dependent and overlapping writes are applied sequentially by ownership.
- Without real concurrency, enqueue all three envelopes first, declare sequential fallback, and never claim parallel execution.
- Every dispatch includes the task envelope defined by the orchestration contract.
- Every completion returns the result envelope defined by the contract.
- Retries are bounded and must address a recorded failure cause.

## Verification and Exit

Choose checks relevant to the changed surface. Security scanning is required only for security-sensitive, dependency, deployment, secret, authentication, or similarly exposed changes. Verification must be independent from implementation and use direct evidence.

Complete only when all required tasks are `completed`, acceptance criteria pass, synthesis is coherent, and the audit trail records assignments, approvals, fallbacks, retries, evidence, and remaining risks. Otherwise report `blocked` or `failed` explicitly.

## Report

Report the task graph, specialists used, state of every task, approvals, evidence, artifacts, verification outcome, unresolved risks, and final synthesis.
