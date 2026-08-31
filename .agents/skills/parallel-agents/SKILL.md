---
name: parallel-agents
description: Platform-neutral patterns for safe concurrent and sequential specialist work.
when_to_use: "When independent tasks benefit from multiple specialists or parallel execution. NOT when one bounded specialist task is sufficient."
allowed-tools: Read, Glob, Grep
version: 1.1.0
effort: medium
---

# Parallel Agents

Follow `.agents/platforms/orchestration-contract.md`. Use the selected platform adapter's declared capabilities; native command names are adapter concerns, not part of this skill.

## Selection

- Use the fewest qualified specialists required by the task graph. There is no minimum agent count.
- The coordinator decomposes, dispatches, monitors, synthesizes, and decides completion.
- Specialists perform bounded research, implementation, or verification work.
- Assign ownership by domain and writable resource; never dispatch overlapping writes concurrently.

## Execution Patterns

- Parallel: independent discovery, reviews, or verification checks.
- Sequential: dependencies, shared files, migrations before consumers, or any shared external state.
- Mixed: parallel research, coordinator synthesis, bounded implementation, independent verification.

Every dispatch MUST carry the contract task envelope. Every worker MUST return the result envelope. Prompts must state objective, context, scope, exclusions, dependencies, acceptance criteria, risk, attempt limit, and expected evidence.

## Failure Handling

Use a semantically equivalent fallback only when it preserves scope, approval, evidence, and verification. Otherwise mark the task `blocked`. Retry only a bounded number of times and only after recording and addressing the failure cause.

## Synthesis

The coordinator MUST resolve conflicts and produce one consolidated result containing contributions, evidence, artifacts, decisions, remaining risks, and action items. Worker outputs are inputs, not the final response.

## Verification

Verification must be independent of implementation and proportional to the affected surface. Do not add irrelevant agents or checks merely to increase coverage counts.
