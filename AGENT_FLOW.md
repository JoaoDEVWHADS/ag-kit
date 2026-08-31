# 🔄 Agent Flow Architecture

> **AG Kit 2026.7.18** — Comprehensive AI Agent Workflow Documentation

---


## 🔐 Version Resolution Layer

Before an agent is invoked, AG Kit resolves the component contract recorded in `.agents/manifest.json`, verifies the selected skill version against the agent's SemVer range, and rejects stale registry/lock state during validation. Workflow metadata declares required agents, required skills, and expected artifacts, enabling deterministic orchestration without changing the existing Markdown-first runtime.

The portable core officially supports Codex, Claude Code, and Gemini. Google Antigravity is a Gemini host. OpenCode has an experimental configuration but is not an officially supported orchestration runtime.

```text
Request → Workflow metadata → Agent version → Skill range → Tool boundary → Verification artifact
```

The generated dependency graph is available at `.agents/DEPENDENCY_GRAPH.md`.

---

## 📊 Overview Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REQUEST CLASSIFICATION                        │
│  • Analyze intent (build, debug, test, deploy, etc.)           │
│  • Identify domain (frontend, backend, mobile, etc.)           │
│  • Detect complexity (simple, medium, complex)                  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌───────────────────┐      ┌──────────────────┐
    │ WORKFLOW COMMAND  │      │  DIRECT AGENT    │
    │  (Slash Command)  │      │  ASSIGNMENT      │
    └─────────┬─────────┘      └────────┬─────────┘
              │                         │
              ▼                         ▼
    ┌───────────────────┐      ┌──────────────────┐
    │ /brainstorm       │      │ Agent Selection  │
    │ /create           │      │ Based on Domain  │
    │ /debug            │      │                  │
    │ /deploy           │      │ • frontend-*     │
    │ /enhance          │      │ • backend-*      │
    │ /orchestrate      │      │ • mobile-*       │
    │ /plan             │      │ • database-*     │
    │ /preview          │      │ • devops-*       │
    │ /status           │      │ • test-*         │
    │ /test             │      │ • security-*     │
    └─────────┬─────────┘      └────────┬─────────┘
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │       AGENT INITIALIZATION          │
         │  • Load agent persona/role          │
         │  • Load required skills             │
         │  • Set behavioral mode              │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │      SKILL LOADING PROTOCOL         │
         │                                      │
         │  1. Read SKILL.md metadata          │
         │  2. Load references/ (if needed)    │
         │  3. Execute scripts/ (if needed)    │
         │  4. Apply rules and patterns        │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │         TASK EXECUTION              │
         │                                      │
         │  • Analyze codebase                 │
         │  • Apply best practices             │
         │  • Generate/modify code             │
         │  • Run validations                  │
         │  • Execute tests                    │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │      VALIDATION LAYER               │
         │                                      │
         │  Quick Check (checklist.py):        │
         │  • Security scan                    │
         │  • Code quality (lint/types)        │
         │  • Schema validation                │
         │  • Test suite                       │
         │  • UX audit                         │
         │  • SEO check                        │
         │                                      │
         │  Full Check (verify_all.py):        │
         │  • All above + Lighthouse           │
         │  • E2E tests (Playwright)           │
         │  • Bundle analysis                  │
         │  • Mobile audit                     │
         │  • i18n check                       │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │         RESULT DELIVERY             │
         │  • Present changes to user          │
         │  • Provide explanations             │
         │  • Suggest next steps               │
         └─────────────────────────────────────┘
```

---

## 🎯 Detailed Agent Workflow

### 1️⃣ **Request Entry Points**

```
User Input Types:
┌─────────────────────────────────────────────────────────────┐
│ A. Natural Language Request                                 │
│    "Build a React dashboard with charts"                    │
│                                                              │
│ B. Slash Command                                            │
│    "/create feature: user authentication"                   │
│                                                              │
│ C. Domain-Specific Request                                  │
│    "Optimize database queries" → database-architect         │
│    "Fix security vulnerability" → security-auditor          │
│    "Deploy to AWS" → devops-engineer                        │
└─────────────────────────────────────────────────────────────┘
```

#### Socratic Gate Protocol

Before implementation, verify:

- **New Feature** → ASK 3 strategic questions
- **Bug Fix** → Confirm understanding + ask impact
- **Vague request** → Ask Purpose, Users, Scope

### 2️⃣ **Agent Selection Matrix**

#### Agent Routing Checklist (Mandatory)

Before ANY code/design work:

| Step | Check                        | If Unchecked                             |
| ---- | ---------------------------- | ---------------------------------------- |
| 1    | Identify correct agent       | → Analyze request domain                 |
| 2    | Read agent's .md file        | → Open `.agents/agent/{agent}.md`         |
| 3    | Announce agent               | → `🤖 Applying knowledge of @[agent]...` |
| 4    | Load skills from frontmatter | → Check `skills:` field                  |

```
Request Domain → Agent Mapping:

┌──────────────────────┬─────────────────────┬──────────────────────────┐
│ Domain               │ Primary Agent       │ Skills Loaded            │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ UI/UX Design         │ frontend-specialist │ nextjs-react-expert      │
│                      │                     │ frontend-architecture    │
│                      │                     │ frontend-design          │
│                      │                     │ tailwind-patterns        │
|                      │                     │ web-design-guidelines    │
│                      │                     │ lint-and-validate        │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ API Development      │ backend-specialist  │ api-patterns             │
│                      │                     │ nodejs-best-practices    │
│                      │                     │ python-patterns          │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Database Design      │ database-architect  │ database-design          │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Mobile App           │ mobile-developer    │ mobile-design            │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Game Development     │ game-developer      │ game-development         │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ DevOps/Deployment    │ devops-engineer     │ deployment-procedures    │
│                      │                     │ server-management        │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Security Audit       │ security-auditor    │ vulnerability-scanner    │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Penetration Testing  │ penetration-tester  │ red-team-tactics         │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Testing              │ test-engineer       │ testing-patterns         │
│                      │                     │ webapp-testing           │
│                      │                     │ tdd-workflow             │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Debugging            │ debugger            │ systematic-debugging     │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Performance          │ performance-        │ performance-profiling    │
│                      │ optimizer           │                          │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ SEO                  │ seo-specialist      │ seo-fundamentals         │
│                      │                     │ geo-fundamentals         │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Documentation        │ documentation-      │ documentation-templates  │
│                      │ writer              │                          │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Planning/Discovery   │ project-planner     │ brainstorming            │
│                      │                     │ plan-writing             │
│                      │                     │ architecture             │
├──────────────────────┼─────────────────────┼──────────────────────────┤
│ Multi-Agent Tasks    │ orchestrator        │ parallel-agents          │
│                      │                     │ behavioral-modes         │
└──────────────────────┴─────────────────────┴──────────────────────────┘
```

### 3️⃣ **Skill Loading Protocol**

```
┌─────────────────────────────────────────────────────────────┐
│                    SKILL LOADING FLOW                        │
└─────────────────────────────────────────────────────────────┘

Step 1: Match Request to Skill
┌──────────────────────────────────────────┐
│ User: "Build a REST API"                 │
│   ↓                                       │
│ Keyword Match: "API" → api-patterns      │
└──────────────────────────────────────────┘
                    ↓
Step 2: Load Skill Metadata
┌──────────────────────────────────────────┐
│ Read: .agents/skills/api-patterns/        │
│       └── SKILL.md (main instructions)   │
└──────────────────────────────────────────┘
                    ↓
Step 3: Load References (if needed)
┌──────────────────────────────────────────┐
│ Read: api-patterns/rest.md               │
│       api-patterns/graphql.md            │
│       api-patterns/auth.md               │
│       api-patterns/documentation.md      │
└──────────────────────────────────────────┘
                    ↓
Step 4: Execute Scripts (if needed)
┌──────────────────────────────────────────┐
│ Run: scripts/api_validator.py            │
│      (validates API design)              │
└──────────────────────────────────────────┘
                    ↓
Step 5: Apply Knowledge
┌──────────────────────────────────────────┐
│ Agent now has:                           │
│ • API design patterns                    │
│ • Authentication strategies              │
│ • Documentation templates                │
│ • Validation scripts                     │
└──────────────────────────────────────────┘

### Related Skills Pattern

Skills now link to each other:
- `frontend-design` → `web-design-guidelines` (after coding)
- `web-design-guidelines` → `frontend-design` (before coding)

> **Note**: Scripts are NOT auto-executed. AI suggests running them, user approves.
```

### 4️⃣ **Workflow Command Execution**

```
Slash Command Flow:

/brainstorm
    ↓
    1. Load: brainstorming skill
    2. Apply: Socratic questioning
    3. Output: Structured discovery document

/create
    ↓
    1. Detect: Project type (web/mobile/api/game)
    2. Load: app-builder skill + domain-specific skills
    3. Select: Template from app-builder/templates/
    4. Scaffold: Generate project structure
    5. Validate: Run checklist.py

/debug
    ↓
    1. Load: systematic-debugging skill
    2. Analyze: Error logs, stack traces
    3. Apply: Root cause analysis
    4. Suggest: Fix with code examples
    5. Test: Verify fix works

/deploy
    ↓
    1. Load: deployment-procedures skill
    2. Detect: Platform (Vercel, AWS, Docker, etc.)
    3. Prepare: Build artifacts
    4. Execute: Deployment scripts
    5. Verify: Health checks
    6. Output: Deployment URL

/test
    ↓
    1. Load: testing-patterns + webapp-testing skills
    2. Detect: Test framework (Jest, Vitest, Playwright)
    3. Generate: Test cases
    4. Execute: Run tests
    5. Report: Coverage + results

/orchestrate
    ↓
    1. Load: parallel-agents skill
    2. Decompose: Task into subtasks
    3. Assign: Each subtask to specialist agent
    4. Coordinate: Native workers when available; sequential fallback otherwise
    5. Synthesize: Resolve dependencies and combine results
    6. Validate: Run full verification

/plan
    ↓
    1. Load: plan-writing + architecture skills
    2. Analyze: Requirements
    3. Break down: Tasks with estimates
    4. Output: Structured plan with milestones

```

### 5️⃣ **Multi-Agent Orchestration**

```
Complex Task → /orchestrate → Chief Coordinator → Specialist Agents

Example: "Build a full-stack e-commerce app"

┌─────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR AGENT                       │
│  Decomposes, delegates, monitors, synthesizes, and verifies │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ FRONTEND      │   │ BACKEND       │   │ DATABASE      │
│ SPECIALIST    │   │ SPECIALIST    │   │ ARCHITECT     │
│               │   │               │   │               │
│ Skills:       │   │ Skills:       │   │ Skills:       │
│ • react-*     │   │ • api-*       │   │ • database-*  │
│ • nextjs-*    │   │ • nodejs-*    │   │ • prisma-*    │
│ • tailwind-*  │   │ • nestjs-*    │   │               │
│               │   │               │   │               │
│ Builds:       │   │ Builds:       │   │ Builds:       │
│ • UI/UX       │   │ • REST API    │   │ • Schema      │
│ • Components  │   │ • Auth        │   │ • Migrations  │
│ • Pages       │   │ • Business    │   │ • Indexes     │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
        └─────────────────┬─┴───────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────────┐
        │      SYNTHESIS                       │
        │  • Resolve specialist findings      │
        │  • Reconcile shared contracts       │
        │  • Preserve dependency order        │
        └──────────────┬──────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────┐
        │    VALIDATION (All Agents)          │
        │  • test-engineer → Tests            │
        │  • security-auditor → Security      │
        │  • performance-optimizer → Perf     │
        └──────────────┬──────────────────────┘
                       │
                       ▼
        ┌─────────────────────────────────────┐
        │    DEPLOYMENT                       │
        │  • devops-engineer → Deploy         │
        └─────────────────────────────────────┘
```

#### Capability and Approval Model

Before waiting for analysis results, the coordinator MUST dispatch exactly three independent analysis envelopes as the **Eager Analysis Triad**. It then reviews each result individually before synthesis. Fewer than three natural domains map to `primary analysis`, `risk and edge cases`, and `verification planning`; more than three domains are grouped into exactly three coherent envelopes. This triad governs analysis only: dependent writes and shared writable resources remain sequential.

If the host cannot run workers concurrently, it queues the same three envelopes before consuming their results, records that execution is sequential, and MUST NOT imply simultaneous execution.

| Host | Dispatch capability | Fallback | Support |
| --- | --- | --- | --- |
| Codex | Native subagents when exposed | Queue three analysis envelopes; serialize dependent writes | Official |
| Claude Code | Native agent/task facilities when exposed | Queue three analysis envelopes; serialize dependent writes | Official |
| Gemini / Antigravity | Native agent/subagent facilities when exposed | Queue three analysis envelopes; serialize dependent writes | Official |
| OpenCode | Configuration-dependent | No official guarantee | Experimental |

Independent tasks may run concurrently only when the active host exposes a safe native capability. Dependencies, shared state, and overlapping writes remain sequential. The fallback must preserve task boundaries, adaptive approval, evidence, bounded retries, auditability, and independent verification.

Adaptive approval is risk-based: low-risk bounded changes are automatic; medium-risk changes require approval when ambiguity materially affects scope or behavior; high-risk destructive, privileged, costly, production, publication, or other external actions always require explicit approval.

### 6️⃣ **Validation & Quality Gates**

```
┌─────────────────────────────────────────────────────────────┐
│                 VALIDATION PIPELINE                          │
└─────────────────────────────────────────────────────────────┘

During Development (Quick Checks):
┌──────────────────────────────────────────┐
│ python .agents/scripts/checklist.py .     │
├──────────────────────────────────────────┤
│ ✓ Security Scan (vulnerabilities)        │
│ ✓ Code Quality (ESLint, TypeScript)      │
│ ✓ Schema Validation (Prisma/DB)          │
│ ✓ Test Suite (Unit tests)                │
│ ✓ UX Audit (Accessibility)               │
│ ✓ SEO Check (Meta tags, performance)     │
└──────────────────────────────────────────┘
        Time: ~30 seconds

Pre-Deployment (Full Verification):
┌──────────────────────────────────────────────────────┐
│ python .agents/scripts/verify_all.py .                │
│        --url http://localhost:3000                   │
├──────────────────────────────────────────────────────┤
│ ✓ All Quick Checks                                   │
│ ✓ Lighthouse Audit (Core Web Vitals)                 │
│ ✓ Playwright E2E Tests                               │
│ ✓ Bundle Analysis (Size, tree-shaking)               │
│ ✓ Mobile Audit (Responsive, touch targets)           │
│ ✓ i18n Check (Translations, locale)                  │
└──────────────────────────────────────────────────────┘
        Time: ~3-5 minutes
```

---

## 🧩 Skill-to-Script Mapping

```
Skills with Automated Scripts:

┌─────────────────────────┬──────────────────────────────────┐
│ Skill                   │ Script                           │
├─────────────────────────┼──────────────────────────────────┤
│ api-patterns            │ scripts/api_validator.py         │
│ database-design         │ scripts/schema_validator.py      │
│ frontend-design         │ scripts/accessibility_checker.py │
│                         │ scripts/ux_audit.py              │
│ geo-fundamentals        │ scripts/geo_checker.py           │
│ i18n-localization       │ scripts/i18n_checker.py          │
│ lint-and-validate       │ scripts/lint_runner.py           │
│                         │ scripts/type_coverage.py         │
│ mobile-design           │ scripts/mobile_audit.py          │
│ performance-profiling   │ scripts/lighthouse_runner.py     │
│                         │ scripts/bundle_analyzer.py       │
│ seo-fundamentals        │ scripts/seo_checker.py           │
│ testing-patterns        │ scripts/test_runner.py           │
│ vulnerability-scanner   │ scripts/security_scanner.py      │
│ webapp-testing          │ scripts/e2e_runner.py            │
└─────────────────────────┴──────────────────────────────────┘
```

---

## 🔄 Complete Request Lifecycle Example

```
User Request: "Build a Next.js dashboard with authentication"

1. REQUEST CLASSIFICATION
   ├─ Type: Build new feature
   ├─ Domain: Frontend + Backend
   ├─ Complexity: Medium-High
   └─ Suggested: /create or /orchestrate

2. WORKFLOW SELECTION
   └─ User chooses: /orchestrate (multi-agent approach)

3. ORCHESTRATOR DECOMPOSITION
   ├─ Frontend: Dashboard UI (React components)
   ├─ Backend: Auth API (JWT, session management)
   ├─ Database: User schema (Prisma)
   └─ Testing: E2E auth flow

4. EAGER ANALYSIS TRIAD
   ├─ Envelope 1: Primary implementation analysis
   ├─ Envelope 2: Risk and edge-case analysis
   └─ Envelope 3: Verification planning

5. AGENT ASSIGNMENT
   ├─ frontend-specialist
   │   └─ Skills: nextjs-react-expert, tailwind-patterns, frontend-design
   ├─ backend-specialist
   │   └─ Skills: api-patterns, nodejs-best-practices
   ├─ database-architect
   │   └─ Skills: database-design
   └─ test-engineer
       └─ Skills: testing-patterns, webapp-testing

6. CAPABILITY-AWARE MULTI-DOMAIN EXECUTION
   Native workers may execute independent tasks concurrently when the host exposes that capability.
   Otherwise, the coordinator runs the same scoped specialist tasks sequentially.

   ├─ Frontend builds:
   │   ├─ app/dashboard/page.tsx (Server Component)
   │   ├─ components/DashboardLayout.tsx
   │   ├─ components/LoginForm.tsx
   │   └─ lib/auth-client.ts
   ├─ Backend builds:
   │   ├─ app/api/auth/login/route.ts
   │   ├─ app/api/auth/logout/route.ts
   │   ├─ lib/jwt.ts
   │   └─ middleware.ts
   ├─ Database builds:
   │   ├─ prisma/schema.prisma (User, Session models)
   │   └─ prisma/migrations/
   └─ Testing builds:
       ├─ tests/auth.spec.ts (Playwright)
       └─ tests/dashboard.spec.ts

7. RESULT REVIEW AND SYNTHESIS
   The coordinator reviews each triad result individually before synthesis.
   The coordinator reconciles specialist outputs, shared contracts, dependencies, and conflicts.

   └─ AI maintains coherence across domains
       ├─ Resolves import paths
       ├─ Ensures type safety
       └─ Connects API routes to UI

8. VALIDATION
   ├─ checklist.py
   │   ✓ Security: No leaked secrets
   │   ✓ Lint: No ESLint errors
   │   ✓ Types: TypeScript passes
   │   ✓ Tests: Auth flow passes
   └─ verify_all.py
       ✓ E2E: Login → Dashboard → Logout works
       ✓ Accessibility: WCAG AA compliant
       ✓ Performance: Lighthouse score > 90

8. RESULT DELIVERY
   └─ User receives:
       ├─ Complete codebase
       ├─ Documentation (how to run)
       ├─ Test reports
       └─ Deployment instructions
```

---

## 📈 Statistics & Metrics

```
┌──────────────────────────────────────────────────────────┐
│                    SYSTEM CAPABILITIES                    │
├──────────────────────────────────────────────────────────┤
│ Total Agents:              21                            │
│ Total Skills:              48                            │
│ Total Workflows:           14                            │
│ Master Scripts:            2 (checklist, verify_all)     │
│ Skill-Level Scripts:       16                            │
│ Coverage:                  ~95% web/mobile + orchestration│
│                                                          │
│ Orchestration & Memory:                                  │
│ ├─ Coordinator Mode (native workers + sequential fallback)│
│ ├─ Persistent Memory System (MEMORY.md)                  │
│ ├─ Context Compression (auto-compact)                    │
│ ├─ Conditional Skill Loading (when_to_use)               │
│ └─ Verification by Execution (/verify)                   │
│                                                          │
│ Supported Frameworks:                                    │
│ ├─ Frontend: React 19, Next.js 16, Vue, Nuxt 4, Astro 6 │
│ ├─ Backend: Node.js 24, FastAPI, Express 5, Rust        │
│ ├─ Mobile: React Native, Flutter                        │
│ ├─ Database: Prisma, Drizzle, PostgreSQL                │
│ ├─ Testing: Jest, Vitest, Playwright, Cypress          │
│ └─ DevOps: Docker, Vercel, AWS, GitHub Actions         │
└──────────────────────────────────────────────────────────┘
```

---

## 🎓 Best Practices

### When to Use Each Workflow

```
/brainstorm
  ✓ Unclear requirements
  ✓ Need to explore options
  ✓ Complex problem needs breaking down

/create
  ✓ New feature in existing project
  ✓ Small-to-medium complexity
  ✓ Single domain (frontend OR backend)

/orchestrate
  ✓ Full-stack features
  ✓ Complex multi-step tasks
  ✓ Need multiple specialist agents

/debug
  ✓ Bug reports
  ✓ Unexpected behavior
  ✓ Performance issues

/test
  ✓ Need test coverage
  ✓ Before deployment
  ✓ After major changes

/deploy
  ✓ Ready to ship
  ✓ After all tests pass
  ✓ Need production URL

/plan
  ✓ Large projects
  ✓ Need time estimates
  ✓ Team coordination needed
```

---

## 🔗 Quick Reference Links

- **Architecture**: `.agents/ARCHITECTURE.md`
- **Agents**: `.agents/agent/`
- **Skills**: `.agents/skills/`
- **Workflows**: `.agents/workflows/`
- **Scripts**: `.agents/scripts/`

---

**Last Updated**: 2026-05-31
**Version**: 2026.5.31
