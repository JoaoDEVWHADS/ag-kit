# 🚨 MANDATORY SYSTEM DIRECTIVE (STRICT FIRST TOKENS FOR ALL LLMS)

> **CRITICAL EXECUTION REQUIREMENT FOR ALL LLM MODELS (GEMINI, DEEPSEEK, CLAUDE, OPENAI, LIGHT/LOCAL MODELS):**
> YOUR VERY FIRST OUTPUT TOKENS **MUST** BE THE ANNOUNCEMENT HEADER AND REASONING BLOCK.
> THIS APPLIES TO **EVERY SINGLE RESPONSE AND TURN**, INCLUDING SHORT USER CONFIRMATIONS ("yes", "ok", "sure", "do it"), TOOL OUTPUT RECOVERIES, AND FOLLOW-UPS. DO NOT OMIT, SKIP, OR DELAY THIS BLOCK UNDER ANY CIRCUMSTANCES.

### REQUIRED OUTPUT FORMAT FOR THE FIRST LINES OF ALL RESPONSES:

```markdown
🤖 **Applying knowledge of `@[agent-name]`...**
📚 **Using skills: `@[skill-name]`...**

🧠 **Reasoning & Action Plan:**
- 🔍 **Intent:** [Brief description of what the user requested]
- 🎯 **Strategy:** [What will be analyzed/executed and justification]
- ⚡ **Action:** [Which commands, files, or tools will be used]
```
> *(Note: Replace `[agent-name]` with the actual active agent name, e.g. `teamtalk-developer` or `backend-specialist`, and `[skill-name]` with the actual skill, e.g. `teamtalk-sdk` or `clean-code`).*

❌ **CRITICAL FAILURE CONDITIONS:**
1. Generating ANY response, text, tool execution, or code analysis WITHOUT starting with the exact header `🤖 Applying knowledge of...` and `🧠 Reasoning & Action Plan:`.
2. Omitting the header when responding to short user inputs like "yes", "ok", "sure", "proceed", "do it".
3. Outputting tool execution results or terminal outputs WITHOUT starting the text response with the exact header.

---

# AG Kit - Project Instructions

> This project uses the AG Kit agent framework. OpenCode and all AI assistants must follow all rules below.

## System Map

This project contains a `.agents/` folder with the following structure:

- `.agents/rules/` — Mandatory behavioral rules (always active)
- `.agents/agent/` — Specialist agents (frontend, backend, debugger, etc.)
- `.agents/skills/` — Modular skills loaded on demand
- `.agents/memory/MEMORY.md` — Persistent project memory
- `.agents/workflows/` — Slash command workflows
- `.agents/ARCHITECTURE.md` — Full system catalog

## Core Rules (Always Active)

All rules in `.agents/rules/` are **mandatory** and always active:

1. **core-protocol.md** — Read agents/skills before implementing. Announce skills used & show reasoning.
2. **universal-rules.md** — Clean code, language handling, testing.
3. **request-routing.md** — Classify every request, auto-route to best agent.
4. **code-rules.md** — Project-type routing, Plan Mode, Socratic Gate.
5. **quick-reference.md** — Fast lookup of agents, scripts, skills.
6. **teamtalk-rules.md** — Mandatory routing rule for TeamTalk 5 SDK development and queries.

## How to Use Agents & Skills

Before any code or design work:
1. Identify the domain (frontend, backend, mobile, etc.)
2. Read the matching `.agents/agent/<name>.md`
3. Load skills listed in its frontmatter
4. Announce and show reasoning step-by-step.

## Memory

Always read `.agents/memory/MEMORY.md` at session start to load project conventions and user preferences.

---

## 🔒 7-KEY HARD ENFORCEMENT LOCKS (No Exceptions)

1. 🔑 **TOKEN LOCK:** First output tokens MUST be `🤖 **Applying knowledge of...`
2. 🔑 **TOOL LOCK:** NEVER execute any tool or edit files before outputting the reasoning header.
3. 🔑 **READ LOCK:** ALWAYS read agent `.md` and skill files before writing code.
4. 🔑 **ROUTING LOCK:** ALL requests MUST be classified and routed to an agent.
5. 🔑 **LANGUAGE LOCK:** Always respond in the user's language, code comments/rules in English.
6. 🔑 **CLEAN CODE LOCK:** Follow clean-code principles in all generated code.
7. 🔑 **RECENCY REINFORCEMENT:** Generating text or code without the header is a TOTAL FAILURE.

---

## 🚨 FINAL ENFORCEMENT — Protocol is MANDATORY (No Exceptions)

These rules apply to **every single request**, regardless of complexity, model size, or context length.

### ALWAYS DO ✅

- **ALWAYS** start your response with the agent announcement & reasoning block:
  ```markdown
  🤖 **Applying knowledge of `@[agent-name]`...**
  📚 **Using skills: `@[skill-name]`...**

  🧠 **Reasoning & Action Plan:**
  - 🔍 **Intent:** ...
  - 🎯 **Strategy:** ...
  - ⚡ **Action:** ...
  ```
- **ALWAYS** read the agent `.md` file before generating any code, analysis, or design.

### NEVER DO ❌

- **NEVER** skip the agent announcement and reasoning block.
- **NEVER** write code or run commands without first outputting the header.
