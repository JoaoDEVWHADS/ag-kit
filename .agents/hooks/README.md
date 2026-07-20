# Portable Lifecycle Hooks

AG Kit defines a runtime-neutral lifecycle contract so policy checks, audit logging, validation, and automation can be described once and adapted to multiple agent runtimes.

The default [`hooks.json`](hooks.json) is intentionally empty. It enables validation and safe opt-in without executing commands merely because `.agents/` was installed.

## Contracts

- [`lifecycle-event.schema.json`](schemas/lifecycle-event.schema.json) defines the portable event envelope.
- [`lifecycle-hooks.schema.json`](schemas/lifecycle-hooks.schema.json) defines hook registrations.
- `hooks.json` is the project-owned registration file.

## Portable events

| AG Kit event | Typical runtime lifecycle point |
| --- | --- |
| `session.started` | Session begins or resumes |
| `instructions.loaded` | Project instructions or rules enter context |
| `prompt.received` | User prompt accepted before model processing |
| `permission.requested` | A tool or action needs approval |
| `permission.denied` | A policy or user denies an action |
| `tool.before_call` | Before tool execution; may block |
| `tool.after_call` | Tool execution succeeded |
| `tool.failed` | Tool execution failed |
| `agent.started` | A subagent or delegated role starts |
| `agent.completed` | A subagent or delegated role finishes |
| `task.created` | A durable task is created |
| `task.completed` | A durable task reaches completion |
| `worktree.created` | An isolated Git worktree is created |
| `worktree.removed` | An isolated Git worktree is removed |
| `context.pre_compact` | Before context compaction |
| `context.post_compact` | After context compaction |
| `turn.completed` | An agent turn ends successfully |
| `turn.failed` | An agent turn ends because of an error |
| `session.completed` | The session terminates |

## Adapter guidance

Claude Code exposes direct equivalents for most events, including `SessionStart`, `InstructionsLoaded`, `UserPromptSubmit`, `PreToolUse`, `PostToolUse`, `SubagentStart`, `TaskCreated`, `WorktreeCreate`, `PreCompact`, `PostCompact`, and `SessionEnd`. Other runtimes may expose traces, callbacks, plugin hooks, or streamed events instead. Adapters should normalize runtime payloads into the AG Kit event envelope rather than leaking runtime-specific field names into project policy.

OpenAI Agents SDK traces can be normalized into the same vocabulary for agent spans, tool spans, handoffs, and guardrail checks. Events that cannot block execution should be treated as observational even when the portable registration uses `mode: "blocking"`.

## Security defaults

- No hook runs unless it is explicitly registered and enabled.
- Use `fail_closed` only for deterministic policy checks with bounded execution time.
- Redact secrets, credentials, prompts, source code, and tool outputs before exporting telemetry.
- Prefer executable-plus-argument arrays over shell interpolation for command hooks.
- Keep network destinations allowlisted and avoid embedding credentials in hook targets.
- Runtime adapters must preserve the runtime's native permission system; hooks are not a substitute for sandboxing or least-privilege tool grants.

## Example

```json
{
  "$schema": "schemas/lifecycle-hooks.schema.json",
  "schemaVersion": "1.0.0",
  "defaults": {
    "timeoutMs": 5000,
    "failureMode": "warn"
  },
  "hooks": [
    {
      "id": "block-destructive-shell",
      "event": "tool.before_call",
      "runtime": "portable",
      "mode": "blocking",
      "failureMode": "fail_closed",
      "matcher": {"tool": "shell"},
      "handler": {
        "type": "command",
        "target": ".agents/hooks/block-destructive-shell.py"
      }
    }
  ]
}
```

This example is documentation only; the referenced handler is not shipped.

## Primary references

- Claude Code hooks reference: <https://code.claude.com/docs/en/hooks>
- OpenAI Agents SDK tracing: <https://openai.github.io/openai-agents-js/guides/tracing/>
- MCP roadmap: <https://modelcontextprotocol.io/development/roadmap>
