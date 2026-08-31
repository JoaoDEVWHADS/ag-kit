---
name: claude-code
description: Capability adapter for AG Kit orchestration in Claude Code environments.
version: 1.0.0
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

Every invocation MUST carry the contract task envelope. Dispatch only ready tasks to qualified specialists. Concurrent reads require independence; concurrent writes require disjoint ownership. Dependencies and shared resources are sequential. Apply adaptive approval before dispatch and again after any scope expansion.

## Monitoring

Record task identity, assignment, state transitions, evidence, approvals, retries, fallbacks, blockers, and the final result envelope. If the environment exposes no asynchronous status, treat each sequential invocation as a monitored transition and record its outcome.

## Fallback

When native multi-agent facilities are unavailable, execute tasks sequentially using the active session and preserve specialist boundaries through explicit scoped prompts. A fallback MUST preserve approval, task/result envelopes, bounded retries, audit trail, and independent verification. Mark work `blocked` when a compliant independent verification path is unavailable.

## Limitations

Available Agent, Task, subagent, resume, cancellation, and status behavior varies by Claude Code host and configuration. This adapter does not promise concurrency, durable worker identity, shared context, or any particular native command.
