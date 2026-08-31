---
name: codex
description: Capability adapter for AG Kit orchestration in Codex environments.
version: 1.0.0
---

# Codex Platform Adapter

This adapter translates available Codex coordination capabilities into `.agents/platforms/orchestration-contract.md`. It defines no runtime or external API.

## Detection

Select this adapter only when the active environment identifies itself as Codex. Inspect the capabilities actually exposed in the current session before planning dispatch; availability MUST NOT be inferred from product name alone.

## Capability Map

When exposed, map capabilities by semantics:

| Contract operation | Codex capability |
|---|---|
| Start bounded worker | `spawn_agent` |
| Continue an idle worker | `followup_task` |
| Deliver context to a running worker | `send_message` |
| Monitor completion or attention | `wait_agent` |
| Stop active work | `interrupt_agent` |
| Inspect active workers | `list_agents` |

Only call capabilities present in the active tool set. Native names are mappings, not guaranteed requirements.

## Dispatch Rules

The coordinator MUST send a complete task envelope, select the fewest qualified workers, and enforce domain and writable-resource boundaries. Independent reads MAY be dispatched concurrently. Dependencies and overlapping writes MUST be sequential. Approval MUST follow the contract's low, medium, and high risk policy.

## Monitoring

Use available wait and listing capabilities to record assignments, state transitions, messages, approvals, retries, blockers, and results. Require a result envelope for every task. Monitoring frequency SHOULD be proportional and MUST NOT fabricate progress when no event is available.

## Fallback

If a coordination capability is absent, execute ready tasks sequentially in the coordinator session or through another exposed capability with equivalent semantics. Fallback MUST preserve task/result envelopes, approval, bounded retries, audit trail, and independent verification. If independence or safety cannot be preserved, mark the task `blocked`.

## Limitations

Worker count, context sharing, interruption, waiting, and messaging behavior depend on the capabilities exposed by the current Codex host. This adapter does not guarantee concurrency, persistence, model selection, or cross-session worker recovery.
