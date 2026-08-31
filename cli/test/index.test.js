import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import { buildProgram, statusCommand } from "../bin/index.js";
import { hashFile } from "../lib/managed-tree.js";

test("CLI exposes safe lifecycle commands", () => {
    const program = buildProgram();
    const commands = new Map(program.commands.map((command) => [command.name(), command]));

    assert.deepEqual([...commands.keys()], ["init", "update", "rollback", "status"]);
    assert.ok(commands.get("update").options.some((option) => option.long === "--strategy"));
    assert.ok(commands.get("update").options.some((option) => option.long === "--dry-run"));
    assert.ok(commands.get("rollback").options.some((option) => option.long === "--backup"));
    assert.match(commands.get("init").description(), /root entrypoints/);
    assert.match(commands.get("update").description(), /managed entrypoints/);
});

test("status reports managed and conflicting root entrypoints", async (t) => {
    const projectDir = await fse.mkdtemp(path.join(os.tmpdir(), "ag-kit-status-"));
    t.after(async () => fse.remove(projectDir));
    const agentDir = path.join(projectDir, ".agents");
    await fse.ensureDir(path.join(agentDir, ".ag-kit"));
    await fse.writeFile(path.join(projectDir, "AGENTS.md"), "managed", "utf8");
    await fse.writeFile(path.join(projectDir, "CLAUDE.md"), "local", "utf8");
    const agentsHash = await hashFile(path.join(projectDir, "AGENTS.md"));
    await fse.writeJson(path.join(agentDir, ".ag-kit/manifest.json"), {
        schemaVersion: 1,
        toolkitVersion: "1.0.0",
        files: {},
        entrypoints: { "AGENTS.md": agentsHash },
    });
    const output = [];
    const originalLog = console.log;
    console.log = (value = "") => output.push(String(value));
    t.after(() => { console.log = originalLog; });

    await statusCommand({ path: projectDir, quiet: true });

    const text = output.join("\n");
    assert.match(text, /AGENTS\.md=managed/);
    assert.match(text, /CLAUDE\.md=conflicting/);
    assert.match(text, /GEMINI\.md=missing/);
});
