---
name: orchestration-contract
description: Platform-neutral normative contract for multi-agent orchestration.
version: 1.1.0
---

# Platform-Neutral Orchestration Contract

This contract defines required behavior for every AG Kit orchestration runtime. Platform adapters MAY translate native tool names and capabilities, but MUST preserve these semantics.

## Lifecycle

Every orchestration MUST execute these phases in order:

1. **DECOMPOSE** — Split the request into bounded tasks with explicit outcomes and dependencies.
2. **CLASSIFY** — Mark each task as `research`, `implementation`, or `verification`; assess its risk level.
3. **DISPATCH** — Assign each ready task to a qualified agent with a complete task envelope.
4. **MONITOR** — Track state, evidence, retries, blockers, and dependency completion.
5. **SYNTHESIZE** — Resolve conflicts and combine completed results into one coherent outcome.
6. **VERIFY** — Independently check acceptance criteria and report remaining risks.

An orchestration MUST NOT skip synthesis or declare success before verification completes.

## Eager Analysis Triad

Every executable multi-agent flow MUST form an **Eager Analysis Triad** of exactly three agents. The coordinator MUST dispatch all three analysis envelopes before awaiting or consuming any result. Each agent MUST receive a distinct task or perspective and analyze independently; the coordinator then consumes and reviews the three results one by one before synthesis.

- With fewer than three natural domains, use `primary analysis`, `risk/edge analysis`, and `verification planning` roles.
- With more than three domains, group the domains into exactly three coherent analysis envelopes.
- Dependencies and overlapping writes do not delay eager analysis: all three analyses start first, while implementation is applied sequentially according to dependency and ownership.
- A host without real concurrency MUST enqueue all three envelopes before synthesis, declare the sequential fallback in the audit trail, and MUST NOT claim parallel execution.

The triad requirement applies to executable multi-agent flows, not to a bounded single-agent task that does not invoke orchestration.

## Task Envelope

Every dispatched task MUST include:

- `task_id`: unique identifier within the orchestration;
- `type`: `research`, `implementation`, or `verification`;
- `objective`: concrete expected outcome;
- `context`: relevant decisions and known constraints;
- `scope`: allowed files, systems, actions, and explicit exclusions;
- `dependencies`: task IDs that must complete first;
- `acceptance_criteria`: observable conditions for completion;
- `risk_level`: `low`, `medium`, or `high`;
- `attempt`: current attempt number and maximum attempts;
- `expected_evidence`: commands, diffs, references, or artifacts required.

Agents MUST reject or return a blocked result when the requested work exceeds the envelope scope.

## Result Envelope

Every agent result MUST include:

- `task_id` and final `state`;
- concise `summary` of work performed or findings;
- `artifacts` created or changed;
- `evidence` supporting the result;
- `acceptance_criteria` status;
- `risks`, `assumptions`, and unresolved `blockers`;
- `retryable`: whether another bounded attempt can reasonably succeed.

## States

Tasks MUST use only these states:

`pending` → `ready` → `running` → `completed`

A running task MAY instead become `blocked`, `failed`, or `cancelled`. A retried task returns to `ready` with an incremented attempt. Invalid transitions MUST be recorded as failures.

## Scope and Concurrency

- Each agent MUST operate only inside its assigned domain and task scope.
- Read-only tasks MAY run concurrently when independent.
- Write tasks MAY run concurrently only when their file and state ownership do not overlap.
- Tasks with dependencies or shared writable resources MUST run sequentially.
- The coordinator MUST prevent concurrent edits to the same file or external resource.

## Adaptive Approval Policy

Risk MUST be assessed before dispatch and reassessed when scope changes:

- **Low — automatic:** reversible, bounded, in-scope work with no meaningful external impact MAY proceed without approval.
- **Medium — conditional approval:** work MAY proceed automatically when intent and impact are clear. Approval is REQUIRED when ambiguity would materially change the result, affected scope, cost, compatibility, or user-visible behavior.
- **High — mandatory approval:** destructive, difficult-to-recover, privileged, security-sensitive, costly, production, publication, or other external actions MUST receive explicit user approval before execution.

Approval for one task MUST NOT be treated as approval for a broader scope. If risk increases, execution MUST pause and request new approval.

## Independent Verification

Verification MUST be performed by an agent or process independent from the implementation result. It MUST evaluate the original acceptance criteria using direct evidence and MUST NOT rely solely on the implementing agent's claim. Failed verification returns the affected task to `ready` when retryable or marks it `failed` otherwise.

## Capability Fallback and Retry

- Adapters MUST declare available capabilities before dispatch.
- When a native capability is unavailable, the coordinator MAY use a semantically equivalent safe fallback.
- A fallback MUST NOT weaken scope, approval, evidence, or verification requirements.
- If no compliant fallback exists, the task MUST become `blocked` with the missing capability identified.
- Retries MUST be bounded by the task envelope, MUST address a recorded failure cause, and MUST NOT repeat unchanged attempts indefinitely.
- Exhausted retries MUST result in `failed` or `blocked`, never implicit success.

## Audit Trail

The coordinator MUST preserve an ordered audit trail containing lifecycle phase changes, task envelopes, assignments, state transitions, approvals, capability fallbacks, retries, result envelopes, verification evidence, and the final synthesis. Secrets and sensitive payloads MUST be redacted. The audit trail MUST be sufficient to explain who performed each action, why it was allowed, and how completion was verified.
