---
name: claude-code
description: Capability adapter for AG Kit orchestration in Claude Code environments.
version: 1.1.0
---

# Claude Code Platform Adapter

This adapter translates Claude Code capabilities into `.agents/platforms/orchestration-contract.md`. It defines no runtime or external API and does not assume fixed native tool names.

## Detection

Select this adapter only when the active environment identifies itself as Claude Code. Inspect the tools and agent facilities exposed in the current session before dispatch.

## Capability Map

When available, map an exposed Agent, Task, or subagent facility to these semantics:

| Contract operation | Required semantic capability |
|---|---|
| Start bounded worker | Create or invoke an agent/task with scoped instructions |
| Continue work | Resume or send follow-up context to the same task |
| Monitor | Read exposed task state or await completion |
| Stop | Cancel or interrupt work when supported |
| Inspect | Enumerate active tasks or agents when supported |

The coordinator MUST use only facilities actually exposed. Labels such as Agent, Task, or subagent are descriptive possibilities, not promised command names.

## Dispatch Rules

Every executable multi-agent flow MUST form an Eager Analysis Triad of exactly three agents, dispatching all three independent analysis envelopes before awaiting a result. Fill missing domains with primary, risk/edge, and verification-planning roles or group broader domains into three envelopes. Every invocation MUST carry the contract task envelope. Analysis begins eagerly; dependencies and shared or overlapping writes are applied sequentially. Apply adaptive approval before dispatch and after scope expansion.

## Monitoring

Record task identity, assignment, state transitions, evidence, approvals, retries, fallbacks, blockers, and the final result envelope. If the environment exposes no asynchronous status, treat each sequential invocation as a monitored transition and record its outcome.

## Fallback

When real concurrency is unavailable, enqueue all three triad envelopes before consuming results, explicitly declare sequential fallback, and do not claim parallelism. Preserve specialist boundaries, approval, task/result envelopes, bounded retries, audit trail, and independent verification. Mark work `blocked` when independent analysis or verification cannot be preserved.

## Limitations

Available Agent, Task, subagent, resume, cancellation, and status behavior varies by Claude Code host and configuration. This adapter does not promise concurrency, durable worker identity, shared context, or any particular native command.
