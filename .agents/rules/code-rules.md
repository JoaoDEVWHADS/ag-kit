---
name: code-rules
version: 1.1.0
priority: P0
trigger: model_decision
description: Apply to code changes for domain routing, adaptive approval, scoped implementation, and relevant verification.
---

# Code Rules (TIER 1) - AG Kit

## Project Type Routing

| Project Type | Primary Agent | Skills |
|---|---|---|
| Mobile | `mobile-developer` | mobile-design |
| Game | `game-developer` | game-development |
| TeamTalk | `teamtalk-developer` | teamtalk-sdk |
| Web | `frontend-specialist` | frontend-design |
| Backend/API/Data | `backend-specialist` or `database-architect` | api-patterns, database-design |

The orchestrator coordinates multi-domain work; the selected specialists implement within their domains.

## Adaptive Approval

Classify risk according to `.agents/platforms/orchestration-contract.md` before action:

- **Low:** reversible, bounded, clear, in-scope changes proceed automatically.
- **Medium:** proceed when intent and impact are clear; ask only when ambiguity materially changes outcome, scope, cost, compatibility, or user-visible behavior.
- **High:** obtain explicit approval before destructive, privileged, security-sensitive, production, publication, costly, or external action.

Do not ask questions whose answers are already available. A direct instruction to proceed clears ordinary ambiguity but never waives high-risk approval. Scope expansion requires reassessment.

## Planning and Execution

Use planning proportional to complexity. A plan may be internal unless the workflow or user requires an artifact. Multi-agent work MUST use `DECOMPOSE → CLASSIFY → DISPATCH → MONITOR → SYNTHESIZE → VERIFY` and complete task/result envelopes.

## Verification

Run checks relevant to the affected surface and acceptance criteria. Examples: lint for code, tests for logic, schema checks for data, accessibility for UI, and security checks for exposed or security-sensitive changes. Do not require an unrelated security scan for every task. Completion requires direct evidence; failures remain explicit.
