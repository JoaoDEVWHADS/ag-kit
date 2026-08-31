---
name: gemini
description: Capability adapter for AG Kit orchestration in Gemini environments.
version: 1.0.0
---

# Gemini Platform Adapter

This adapter translates Gemini coordination capabilities into `.agents/platforms/orchestration-contract.md`. It defines no runtime or external API.

## Detection

Select this adapter only when the active environment identifies itself as Gemini or a compatible Gemini host. Inspect the native agent and subagent capabilities exposed in the current session before dispatch.

## Capability Map

When exposed, map native agent or subagent facilities by semantics:

| Contract operation | Required semantic capability |
|---|---|
| Start bounded worker | Invoke a native agent or subagent with scoped context |
| Continue work | Resume or provide follow-up context when supported |
| Monitor | Observe or await task state when supported |
| Stop | Cancel or interrupt a running task when supported |
| Inspect | Enumerate active tasks or agents when supported |

Do not assume a command name or capability that is absent from the active tool set.

## Dispatch Rules

Send complete task envelopes and use the smallest sufficient specialist set. Parallelize only independent reads or disjoint writes. Serialize dependencies, shared resources, and overlapping writes. Enforce adaptive approval before execution and whenever risk increases.

## Monitoring

Record assignments, lifecycle states, approvals, evidence, fallbacks, retries, blockers, and result envelopes. When asynchronous monitoring is unavailable, record each sequential task transition and outcome directly.

## Fallback

If native agent or subagent capabilities are unavailable, use sequential execution in the active Gemini session with explicit specialist scope. Fallback MUST preserve approval, task/result envelopes, bounded retries, audit trail, and independent verification. If those guarantees cannot be maintained, report the affected task as `blocked`.

## Limitations

Gemini hosts may differ in subagent availability, concurrency, persistence, context transfer, monitoring, and cancellation. This adapter guarantees only the contract semantics supported by capabilities detected in the active environment.
