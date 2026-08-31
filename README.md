<p align="center">
  <img src="https://raw.githubusercontent.com/vudovn/ag-kit/main/web/public/images/logo.png" width="128" height="128" alt="AGKIT">
</p>

<h1 align="center">AG KIT</h1>

<p align="center">
    A portable multi-agent engineering team for Codex, Claude Code, and Gemini — with a chief coordinator, specialist agents, skills, and verified workflows.
</p>

<div align="center">
    <a href="https://unikorn.vn/p/antigravity-kit?ref=unikorn" target="_blank"><img src="https://unikorn.vn/api/widgets/badge/antigravity-kit?theme=dark" alt="AG Kit - Nổi bật trên Unikorn.vn" style="width: 210px; height: 54px;" width="210" height="54" /></a>
    <a href="https://trendshift.io/repositories/21490" target="_blank"><img src="https://trendshift.io/api/badge/repositories/21490" alt="vudovn%2Fantigravity-kit | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>
    <a href="https://launch.j2team.dev/products/antigravity-kit" target="_blank"><img src="https://launch.j2team.dev/badge/antigravity-kit/dark" alt="AG Kit on J2TEAM Launch" width="250" height="54" /></a>
</div>

<p align="center">
  <strong>🇻🇳 <a href="./README-VI.md">Tiếng Việt (Vietnamese Version)</a></strong>
</p>

---

## ⚡ Quick Start

Install and initialize AG Kit to add the portable `.agents/` core and thin host entrypoints (`AGENTS.md`, `CLAUDE.md`, and `GEMINI.md`) to your project.

### Method 1: On-demand Execution (Recommended)

```bash
npx @vudovn/ag-kit init
```

### Method 2: Global Installation

```bash
npm install -g @vudovn/ag-kit
ag-kit init
```

---

## 🛡️ Safe Updates and Rollback

AG Kit updates are merge-aware by default. Files you created or changed locally are preserved, while clean managed files receive upstream updates.

The CLI also manages unchanged root entrypoints. User-edited entrypoints are preserved and conflicting incoming copies are reported for manual review.

```bash
ag-kit update --dry-run          # Preview the exact update plan
ag-kit update                    # Safe merge with backup and conflict report
ag-kit update --strategy replace # Explicit full replacement, with backup
ag-kit rollback                  # Restore the newest pre-update backup
```

Update metadata is stored in `.agents/.ag-kit/`. Backups are stored outside the toolkit at `.ag-kit-backups/`, so an interrupted or conflicting update can be reviewed or rolled back safely.

---

## 🌍 Global Shared Setup (Symlinks)

If you work across multiple repositories and want to avoid duplicating the `.agents/` folder in every single project, you can centralize AG Kit and use symbolic links.

1. **Install centrally** (e.g., to a global folder like `~/.ag-kit`):
   ```bash
   mkdir -p ~/.ag-kit && cd ~/.ag-kit
   npx @vudovn/ag-kit init
   ```

2. **Link it locally** from inside your project root:
   - **macOS / Linux:**
     ```bash
     ln -s ~/.ag-kit/.agents .agents
     ```
   - **Windows (CMD - Run as Administrator):**
     ```cmd
     mklink /D .agents "%USERPROFILE%\.ag-kit\.agents"
     ```
   - **Windows (PowerShell - Run as Administrator):**
     ```powershell
     New-Item -ItemType SymbolicLink -Path ".agents" -Target "$env:USERPROFILE\.ag-kit\.agents"
     ```

---

## ⚠️ Important Note on `.gitignore`

If your AI coding host indexes project instructions (for example Codex, Claude Code, Gemini, or Google Antigravity), adding the `.agents/` directory to `.gitignore` may prevent it from discovering workflows or enabling slash-command autocomplete.

### Recommended Solution:
To keep `.agents/` out of your remote repository without losing editor integration:
1. Ensure `.agents/` is **NOT** listed in your project's `.gitignore`.
2. Add `.agents/` to your local Git exclude file: `.git/info/exclude` instead.

---

## 📦 What's Included

AG Kit packages domain-specific knowledge, specialized agent personas, and automated workflows optimized for modern AI coding tools.

| Component | Count | Description |
| :--- | :--- | :--- |
| **Agents** | 21 | Chief coordinator and specialist personas for frontend, backend, security, QA, and more |
| **Skills** | 48 | Domain-specific context modules with conditional loading rules |
| **Workflows** | 14 | Pre-configured interactive developer procedures (slash commands) |

---


## 🔐 Versioned Agent Components

Starting with `2026.7.18`, every agent, skill, workflow, and rule has a strict SemVer contract. The `.agents/manifest.json` registry and `.agents/manifest.lock.json` integrity lock make dependencies machine-readable and prevent documentation/configuration drift.

```bash
npm run generate:agents # regenerate registry, lock, and dependency graph
npm run check:agents    # non-mutating release/CI verification
```

The generated `.agents/DEPENDENCY_GRAPH.md` shows workflow → agent → skill relationships. Official host support covers Codex, Claude Code, and Gemini; Google Antigravity uses the Gemini adapter. OpenCode configuration remains experimental and is not part of the official support matrix.

## 🤝 How the Agent Team Works

The chief coordinator owns the full lifecycle while specialists remain inside explicit task and file boundaries:

```text
Request → Decompose → Delegate → Monitor → Synthesize → Verify → Result
```

The coordinator assesses risk before dispatch. Low-risk, reversible work can proceed automatically; medium-risk work pauses when ambiguity would materially change the outcome; high-risk, destructive, privileged, costly, or external actions require explicit approval.

| Host | Native worker capability | Safe fallback |
| :--- | :--- | :--- |
| Codex | Uses exposed subagent capabilities when available | Queue the three analysis envelopes; serialize dependent writes |
| Claude Code | Uses exposed agent/task capabilities when available | Queue the three analysis envelopes; serialize dependent writes |
| Gemini / Antigravity | Uses exposed agent/subagent capabilities when available | Queue the three analysis envelopes; serialize dependent writes |
| OpenCode | Experimental configuration only | No official runtime guarantee |

Native concurrency depends on the capabilities exposed by the active host. The sequential fallback preserves scope, approval, evidence, bounded retries, and independent verification; AG Kit does not promise universal parallel execution.

Every orchestration begins with the **Eager Analysis Triad**: the coordinator dispatches exactly three independent analysis envelopes before waiting for any result, then reviews the three results one by one before synthesis. When the request has fewer than three natural domains, the envelopes cover primary analysis, risk/edge cases, and verification planning. When it has more, related domains are grouped into exactly three envelopes. Dependent writes remain sequential. A host without concurrent workers queues all three envelopes and explicitly reports the sequential fallback instead of pretending they ran simultaneously.

---

## 🛠️ Usage

### 1. Zero-Setup Agent Auto-Routing

You don't need to manually orchestrate agents. The system silently classifies your request, auto-routes to the best domain experts, and applies their rules instantly:

```
You: "Add JWT authentication to the login API"
Agent: Applying @security-auditor + @backend-specialist...

You: "Align the checkout button to the center and fix dark mode"
Agent: Using @frontend-specialist...
```

### 2. Interactive Workflows (Slash Commands)

Execute structured development workflows by typing slash commands in your AI agent chat:

| Command | Description |
| :--- | :--- |
| `/brainstorm` | Structured exploration of options and architecture before coding |
| `/coordinate` | Coordinate specialist agents with capability-aware dispatch and synthesis |
| `/create` | Create new features or full applications from scratch |
| `/debug` | Activate evidence-based systematic debugging |
| `/deploy` | Execute pre-flight checks and deploy to production |
| `/enhance` | Safely add or update features in an existing codebase |
| `/plan` | Generate a structured implementation plan and checklist |
| `/preview` | Start, stop, or check status of local preview servers |
| `/remember` | Save custom project conventions to persistent memory |
| `/status` | Generate a clear status report of the agent's progress |
| `/test` | Generate and execute comprehensive tests |
| `/verify` | Prove code works via execution rather than simple inspection |

---

## 🧠 Core Architectural Concepts

AG Kit is built on production-tested agentic design patterns designed to reduce token usage by **13% to 33%** while yielding higher output quality:

*   **Coordinator Mode:** Capability-aware delegation, monitoring, synthesis, and independent verification, with native workers when available and a sequential fallback otherwise.
*   **Persistent Memory:** A 4-type taxonomy memory engine index (`MEMORY.md`) to prevent re-explaining project guidelines across sessions.
*   **Context Compression:** Automated summarization and micro-compaction routines to prevent context degradation in long-lived sessions.
*   **Conditional Skill Loading:** Context-aware loading of rules via custom frontmatter, preventing your context window from bloating with idle instructions.

---

## 📚 References & Attribution

AG Kit represents an original implementation of markdown-based prompt and rules engineering. It was built by analyzing production agent patterns to distill core agentic behaviors:
*   *No proprietary code or files were copied.*
*   All templates, rules, and scripts are rewritten as original, open-source implementations under the MIT license.

---

## ☕ Support the Project

If AG Kit has made your AI programming sessions more productive, consider supporting the project:

<a href="https://buymeacoffee.com/vudovn" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me a Coffee" /></a>

**Vietnamese Bank (MBBank QR):**<br/>
<img src="https://img.vietqr.io/image/mbbank-0779440918-compact.jpg" alt="Donate QR" width="140" style="border-radius: 8px; margin-top: 10px;" />

---

CA: Gjpatn3d24dCRhUng7F37K6xJba4R8SDBC18xs1Apump

## 📄 License

Released under the [MIT License](LICENSE) © [Vudovn](https://github.com/vudovn).
