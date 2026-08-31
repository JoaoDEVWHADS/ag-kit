---
name: coordinator-mode
description: Platform-neutral lifecycle for decomposing, dispatching, monitoring, synthesizing, and verifying multi-agent work.
when_to_use: "When a request requires coordinated tasks, multiple domains, dependency management, or independent verification. NOT for a single bounded task."
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, Agent
version: 1.1.0
effort: high
---

# Coordinator Mode

The coordinator MUST follow `.agents/platforms/orchestration-contract.md` and MUST NOT assume vendor-specific tool names. Before dispatch it selects the available adapter, reads declared capabilities, and chooses a compliant native operation or safe fallback.

## Lifecycle

`DECOMPOSE → CLASSIFY → DISPATCH → MONITOR → SYNTHESIZE → VERIFY`

- **DECOMPOSE:** create bounded tasks, dependencies, ownership, and acceptance criteria.
- **CLASSIFY:** assign research, implementation, or verification type and low, medium, or high risk.
- **DISPATCH:** send complete task envelopes to qualified specialists.
- **MONITOR:** record transitions, evidence, approvals, retries, blockers, and fallbacks.
- **SYNTHESIZE:** understand results, resolve conflicts, and make integration decisions.
- **VERIFY:** independently prove acceptance criteria and report residual risk.

## Coordinator Boundary

The coordinator coordinates; specialists implement. It may inspect context and integrate results, but it MUST delegate domain implementation to the proper specialist and preserve file ownership boundaries.

## Approval

- Low-risk, reversible, bounded work proceeds automatically.
- Medium-risk work asks only when ambiguity materially changes result or impact.
- High-risk destructive, privileged, production, costly, publication, or external work always requires explicit approval.

Risk is reassessed whenever scope changes.

## Dispatch and Concurrency

Use the smallest sufficient agent set. Independent reads may run in parallel. Writes run in parallel only with non-overlapping ownership. Dependencies and shared resources run sequentially. Never delegate vague understanding: every task envelope must identify the exact objective, context, scope, exclusions, dependencies, acceptance criteria, risk, attempts, and evidence.

## Monitoring and Recovery

Use only the states defined in the contract. A fallback cannot weaken safety or evidence. Retries are limited, increment the attempt, and address a recorded cause. Exhaustion becomes `failed` or `blocked`.

## Synthesis and Verification

Synthesis is a coordinator responsibility and cannot be skipped. Verification must be independent of implementation, relevant to the changed surface, and supported by direct evidence. The final report includes task states, artifacts, approvals, fallbacks, evidence, unresolved risks, and the audit trail.
