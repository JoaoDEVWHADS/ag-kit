# AG Kit production release checklist

Use this checklist for release `2026.7.21` and later Antigravity-first releases. A checked box is evidence of a completed gate, not a substitute for reviewing its output.

## 1. Release identity and source control

| Gate | Evidence | Status |
| --- | --- | --- |
| Release branch is based on latest `main` | PR comparison shows no missing main commits | [ ] |
| PR remains Draft during validation | GitHub PR state | [ ] |
| Root, CLI, web, locks, and `.agents/VERSION` use the same CalVer | `2026.7.21` in all version files | [ ] |
| Changelog and web changelog include the release | `CHANGELOG.md`, `web/src/services/changelog.json` | [ ] |
| No direct push, auto-merge, package publish, release, or deploy occurred | GitHub audit/history | [ ] |

## 2. Automated repository gates

Run locally:

```bash
npm run check:agents
npm run test:toolkit
npm run check:antigravity
npm run test:antigravity
npm run build:antigravity-plugin
npm run test:cli
npm run lint:web
npm run typecheck:web
npm run build:web
```

| Required GitHub check | Status |
| --- | --- |
| Toolkit validation | [ ] |
| CLI tests and package validation | [ ] |
| Web lint, typecheck, build, and audit | [ ] |
| Antigravity native contract | [ ] |
| Dependency Review | [ ] |

Any failure caused by the release must be fixed in the same Draft PR. Do not dismiss a failing security or dependency check merely to unblock the release.

## 3. Antigravity hands-on smoke test

Perform in a trusted disposable or staging workspace.

| Scenario | Expected result | Status |
| --- | --- | --- |
| Open repository | Workspace opens without configuration errors | [ ] |
| Rules discovery | `.agents/rules/` constraints are available | [ ] |
| Skill discovery | Relevant `.agents/skills/*/SKILL.md` content is selected progressively | [ ] |
| Workflow discovery | `/plan`, `/coordinate`, and `/orchestrate` appear and load | [ ] |
| Normal command | `npm test` or an equivalent safe command is allowed | [ ] |
| Destructive payload simulation | Mocked `rm -rf /` payload is blocked without executing the command | [ ] |
| Agent orchestration | `/agents` shows delegated work and `/tasks` reflects status | [ ] |
| Approval checkpoint | `/orchestrate` stops after planning until explicit approval | [ ] |
| Memory behavior | `/remember` updates the intended memory topic/index only | [ ] |
| Context behavior | A long task can summarize/compact without losing accepted decisions | [ ] |

Record the Antigravity build/channel and operating system used for the smoke test in the PR.

## 4. MCP and secret safety

| Gate | Expected result | Status |
| --- | --- | --- |
| Repository contains no real MCP credential | Only placeholders or environment references | [ ] |
| `sync-mcp --check` performs no write | Home config timestamp/content unchanged | [ ] |
| Placeholder blocks `--apply` | Command exits non-zero | [ ] |
| Conflict without `--force` is preserved | Existing same-name server remains unchanged | [ ] |
| Explicit apply creates a backup | `.ag-kit-backup-*` exists when target existed | [ ] |
| Applied MCP server is visible in Antigravity | Staging server connects successfully | [ ] |

Do not attach home-directory MCP files, command payloads, prompts, tokens, or private source to a public PR or issue.

## 5. Hook security verification

Use mocked stdin payloads only:

```bash
printf '%s' '{"tool_args":{"CommandLine":"npm test"}}' \
  | node .agents/hooks/validate-tool-call.mjs

printf '%s' '{"tool_args":{"CommandLine":"rm -rf /"}}' \
  | node .agents/hooks/validate-tool-call.mjs
```

| Gate | Expected result | Status |
| --- | --- | --- |
| Safe command | Exit 0 and `APPROVED by AG Kit` | [ ] |
| Unix root deletion | Non-zero and `BLOCKED by AG Kit` | [ ] |
| Filesystem formatting | Non-zero | [ ] |
| Raw disk overwrite | Non-zero | [ ] |
| Windows drive formatting/root deletion | Non-zero | [ ] |
| Invalid JSON | Warning and fail-open exit 0 | [ ] |
| Payload over 1 MiB | Warning and fail-open exit 0 | [ ] |
| Antigravity native permissions remain enabled | Verified in workspace settings | [ ] |

## 6. Plugin artifact review

```bash
npm run build:antigravity-plugin
```

| Gate | Expected result | Status |
| --- | --- | --- |
| `gemini-extension.json` version matches release | `2026.7.21` | [ ] |
| `GEMINI.md` is included | File exists | [ ] |
| Skills, agents, rules, and commands are included | Counts are non-zero | [ ] |
| Hook files are included | `hooks/hooks.json` and policy script exist | [ ] |
| MCP content is an example only | No real credential | [ ] |
| `PLUGIN_CONTENTS.json` inventories every artifact file | SHA-256 list reviewed | [ ] |
| Local install works | `agy plugin install` succeeds in staging | [ ] |
| Plugin appears in list | `agy plugin list` shows `ag-kit` | [ ] |

Do not commit `dist/` unless a release process explicitly requires checked-in artifacts.

## 7. Documentation and migration

| Document | Required review | Status |
| --- | --- | --- |
| `README.md` | English installation, runtime scope, safety, MCP, plugin, gates | [ ] |
| `README-VI.md` | Vietnamese equivalent | [ ] |
| `MIGRATION.md` | Upgrade, compatibility, rollback | [ ] |
| `SECURITY.md` | Threat model, reporting, hook/MCP/plugin boundaries | [ ] |
| `AGENT_FLOW.md` | Antigravity runtime boundary and six phases | [ ] |
| `.agents/README.md` | Toolkit operator guide | [ ] |
| `.agents/ARCHITECTURE.md` | Runtime files and inventory | [ ] |
| `.github/RELEASE_SETUP.md` | Branch protection and environments | [ ] |
| `CHANGELOG.md` and web changelog | Release notes match implementation | [ ] |

## 8. Release approval

| Role | Sign-off | Notes |
| --- | --- | --- |
| Maintainer | [ ] | Version, scope, and migration accepted |
| Security review | [ ] | Hook, MCP, dependencies, and secrets accepted |
| Antigravity smoke tester | [ ] | Runtime behavior accepted |
| Release operator | [ ] | npm/deployment environments and rollback ready |

Only after every blocking item is complete:

1. mark the PR ready for review;
2. obtain required approval;
3. merge using the repository's approved method;
4. create the release/tag through the existing release workflow;
5. monitor publish/deploy results;
6. execute rollback if production verification fails.
