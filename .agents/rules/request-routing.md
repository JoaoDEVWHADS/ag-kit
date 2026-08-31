---
name: request-routing
version: 1.2.0
priority: P0
trigger: always_on
---

# Request Routing - AG Kit

Classify each request, select the smallest sufficient specialist set, and apply `.agents/platforms/orchestration-contract.md` whenever coordination is required.

## Request Classes

| Class | Route |
|---|---|
| Question | Answer with the relevant specialist knowledge; no orchestration by default. |
| Read-only discovery | Explorer or relevant specialist; coordinate only independent scopes that materially benefit. |
| Bounded single-domain change | Route directly to its specialist. |
| Multi-domain or dependency-rich change | Route to `orchestrator`, which delegates implementation. |
| New application | `project-planner` with `app-builder`, then `orchestrator` when multiple implementation domains are needed. |
| Explicit workflow | Follow that workflow and the orchestration contract. |

## Routing Protocol

1. Detect domains, writable resources, dependencies, and risk.
2. Read the selected agent instructions and required skills.
3. Announce the applied expertise as required by the core protocol.
4. For orchestration, select the available platform adapter and inspect its declared capabilities.
5. Apply adaptive approval: low automatically; medium only when material ambiguity exists; high always before destructive or external execution.

Do not force orchestration when one specialist can safely complete a bounded task. Once an executable multi-agent flow is selected, it MUST form an Eager Analysis Triad of exactly three independent analysis agents, dispatch all three before awaiting results, and use primary, risk/edge, and verification-planning roles or grouped domains as needed. Analysis starts eagerly; dependent or conflicting writes are applied sequentially by ownership. Do not use vendor-specific modes as the routing contract; adapters translate platform capabilities into AG Kit lifecycle operations.

## Boundaries

The orchestrator owns decomposition, dispatch, monitoring, synthesis, and completion decisions. Specialists own domain implementation. Verification must be independently evidenced and relevant to the changed surface.
