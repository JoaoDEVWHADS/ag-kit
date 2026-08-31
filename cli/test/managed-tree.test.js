import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fse from "fs-extra";
import {
    applyUpdatePlan,
    createUpdatePlan,
    installFreshTree,
    listBackups,
    loadManifest,
    getEntrypointStatus,
    restoreBackup,
} from "../lib/managed-tree.js";

const makeTempProject = async (t) => {
    const root = await fse.mkdtemp(path.join(os.tmpdir(), "ag-kit-test-"));
    t.after(async () => fse.remove(root));
    return root;
};

const writeFiles = async (root, files) => {
    for (const [relativePath, content] of Object.entries(files)) {
        const destination = path.join(root, relativePath);
        await fse.ensureDir(path.dirname(destination));
        await fse.writeFile(destination, content, "utf8");
    }
};

const writeToolkit = async (root, version) => {
    const incomingDir = path.join(root, ".agents");
    await writeFiles(incomingDir, { "agent/orchestrator.md": `orchestrator-${version}` });
    await writeFiles(root, {
        "AGENTS.md": `agents-${version}`,
        "CLAUDE.md": `claude-${version}`,
        "GEMINI.md": `gemini-${version}`,
    });
    return incomingDir;
};

test("fresh install writes a managed-file manifest", async (t) => {
    const projectDir = await makeTempProject(t);
    const incomingDir = path.join(projectDir, "incoming");
    const currentDir = path.join(projectDir, ".agents");
    await writeFiles(incomingDir, {
        "agent/orchestrator.md": "orchestrator-v1",
        "platforms/codex.md": "codex-adapter-v1",
        "platforms/claude-code.md": "claude-adapter-v1",
        "platforms/gemini.md": "gemini-adapter-v1",
        "platforms/orchestration-contract.md": "contract-v1",
        "skills/example/SKILL.md": "skill-v1",
    });

    const report = await installFreshTree({
        projectDir,
        incomingDir,
        currentDir,
        toolkitVersion: "1.0.0",
        runId: "install-test",
    });

    assert.equal(report.strategy, "install");
    const manifest = await loadManifest(currentDir);
    assert.equal(manifest.toolkitVersion, "1.0.0");
    assert.deepEqual(Object.keys(manifest.files).sort(), [
        "agent/orchestrator.md",
        "platforms/claude-code.md",
        "platforms/codex.md",
        "platforms/gemini.md",
        "platforms/orchestration-contract.md",
        "skills/example/SKILL.md",
    ]);
});

test("merge updates clean files, preserves local files, and reports true conflicts", async (t) => {
    const projectDir = await makeTempProject(t);
    const incomingV1 = path.join(projectDir, "incoming-v1");
    const incomingV2 = path.join(projectDir, "incoming-v2");
    const currentDir = path.join(projectDir, ".agents");

    await writeFiles(incomingV1, {
        "a.txt": "a-v1",
        "b.txt": "b-v1",
        "obsolete.txt": "remove-me",
    });
    await installFreshTree({
        projectDir,
        incomingDir: incomingV1,
        currentDir,
        toolkitVersion: "1.0.0",
        runId: "v1",
    });

    await writeFiles(currentDir, {
        "b.txt": "b-local",
        "user-notes.md": "keep me",
    });
    await writeFiles(incomingV2, {
        "a.txt": "a-v2",
        "b.txt": "b-upstream",
        "new.txt": "new-file",
    });

    const manifest = await loadManifest(currentDir);
    const plan = await createUpdatePlan({
        currentDir,
        incomingDir: incomingV2,
        strategy: "merge",
        manifest,
    });

    assert.deepEqual(
        plan.actions.map((item) => [item.type, item.file]),
        [
            ["update", "a.txt"],
            ["add", "new.txt"],
            ["delete", "obsolete.txt"],
        ],
    );
    assert.deepEqual(plan.conflicts.map((item) => item.file), ["b.txt"]);
    assert.ok(plan.preserved.some((item) => item.file === "user-notes.md"));

    const report = await applyUpdatePlan({
        projectDir,
        currentDir,
        incomingDir: incomingV2,
        plan,
        toolkitVersion: "2.0.0",
        runId: "merge-test",
    });

    assert.equal(await fse.readFile(path.join(currentDir, "a.txt"), "utf8"), "a-v2");
    assert.equal(await fse.readFile(path.join(currentDir, "b.txt"), "utf8"), "b-local");
    assert.equal(await fse.readFile(path.join(currentDir, "new.txt"), "utf8"), "new-file");
    assert.equal(await fse.readFile(path.join(currentDir, "user-notes.md"), "utf8"), "keep me");
    assert.equal(await fse.pathExists(path.join(currentDir, "obsolete.txt")), false);
    assert.equal(
        await fse.readFile(
            path.join(currentDir, ".ag-kit", "conflicts", "merge-test", "b.txt.incoming"),
            "utf8",
        ),
        "b-upstream",
    );
    assert.equal(report.summary.conflicts, 1);
    assert.ok(await fse.pathExists(report.backupDir));
    assert.ok(await fse.pathExists(report.reportPath));

    const updatedManifest = await loadManifest(currentDir);
    assert.equal(updatedManifest.toolkitVersion, "2.0.0");
    assert.ok(updatedManifest.files["b.txt"]);
});

test("legacy installation never overwrites an existing differing file", async (t) => {
    const projectDir = await makeTempProject(t);
    const currentDir = path.join(projectDir, ".agents");
    const incomingDir = path.join(projectDir, "incoming");
    await writeFiles(currentDir, { "rules/local.md": "local-version" });
    await writeFiles(incomingDir, {
        "rules/local.md": "upstream-version",
        "rules/new.md": "new-rule",
    });

    const plan = await createUpdatePlan({
        currentDir,
        incomingDir,
        strategy: "merge",
        manifest: null,
    });

    assert.deepEqual(plan.conflicts.map((item) => item.file), ["rules/local.md"]);
    assert.deepEqual(plan.actions.map((item) => item.file), ["rules/new.md"]);

    await applyUpdatePlan({
        projectDir,
        currentDir,
        incomingDir,
        plan,
        toolkitVersion: "2.0.0",
        runId: "legacy-test",
    });

    assert.equal(
        await fse.readFile(path.join(currentDir, "rules/local.md"), "utf8"),
        "local-version",
    );
    assert.equal(
        await fse.readFile(path.join(currentDir, "rules/new.md"), "utf8"),
        "new-rule",
    );
});


test("malformed manifest paths are rejected before planning file operations", async (t) => {
    const projectDir = await makeTempProject(t);
    const currentDir = path.join(projectDir, ".agents");
    await writeFiles(currentDir, { "safe.txt": "safe" });
    await fse.ensureDir(path.join(currentDir, ".ag-kit"));
    await fse.writeJson(path.join(currentDir, ".ag-kit", "manifest.json"), {
        schemaVersion: 1,
        files: {
            "../../outside.txt": "0".repeat(64),
        },
    });

    assert.equal(await loadManifest(currentDir), null);
});

test("replace creates a backup that can be rolled back", async (t) => {
    const projectDir = await makeTempProject(t);
    const currentDir = path.join(projectDir, ".agents");
    const incomingDir = path.join(projectDir, "incoming");
    await writeFiles(currentDir, {
        "old.txt": "old",
        "local-only.txt": "local",
    });
    await writeFiles(incomingDir, { "new.txt": "new" });

    const plan = await createUpdatePlan({
        currentDir,
        incomingDir,
        strategy: "replace",
        manifest: null,
    });
    await applyUpdatePlan({
        projectDir,
        currentDir,
        incomingDir,
        plan,
        toolkitVersion: "2.0.0",
        runId: "replace-test",
    });

    assert.equal(await fse.pathExists(path.join(currentDir, "old.txt")), false);
    assert.equal(await fse.pathExists(path.join(currentDir, "local-only.txt")), false);
    assert.equal(await fse.readFile(path.join(currentDir, "new.txt"), "utf8"), "new");

    const backups = await listBackups(projectDir);
    assert.equal(backups[0].id, "replace-test");

    await restoreBackup({
        projectDir,
        agentDir: currentDir,
        backupId: "replace-test",
        keepCurrent: false,
        runId: "rollback-test",
    });

    assert.equal(await fse.readFile(path.join(currentDir, "old.txt"), "utf8"), "old");
    assert.equal(await fse.readFile(path.join(currentDir, "local-only.txt"), "utf8"), "local");
    assert.equal(await fse.pathExists(path.join(currentDir, "new.txt")), false);
});

test("fresh install creates missing root entrypoints and preserves pre-existing files", async (t) => {
    const root = await makeTempProject(t);
    const projectDir = path.join(root, "project");
    const incomingRoot = path.join(root, "toolkit");
    const incomingDir = await writeToolkit(incomingRoot, "v1");
    const currentDir = path.join(projectDir, ".agents");
    await fse.ensureDir(projectDir);
    await fse.writeFile(path.join(projectDir, "CLAUDE.md"), "local-claude", "utf8");

    const report = await installFreshTree({
        projectDir,
        incomingDir,
        incomingRoot,
        currentDir,
        toolkitVersion: "1.0.0",
        runId: "entrypoint-install",
    });

    assert.equal(await fse.readFile(path.join(projectDir, "AGENTS.md"), "utf8"), "agents-v1");
    assert.equal(await fse.readFile(path.join(projectDir, "CLAUDE.md"), "utf8"), "local-claude");
    assert.equal(await fse.readFile(path.join(projectDir, "GEMINI.md"), "utf8"), "gemini-v1");
    assert.equal(report.summary.entrypointConflicts, 1);
    const manifest = await loadManifest(currentDir);
    assert.deepEqual(Object.keys(manifest.entrypoints).sort(), ["AGENTS.md", "GEMINI.md"]);
    const status = await getEntrypointStatus(projectDir, manifest);
    assert.equal(status.find((item) => item.name === "CLAUDE.md").state, "conflicting");
});

test("clean entrypoints update and rollback with the managed tree", async (t) => {
    const root = await makeTempProject(t);
    const projectDir = path.join(root, "project");
    const incomingRootV1 = path.join(root, "toolkit-v1");
    const incomingRootV2 = path.join(root, "toolkit-v2");
    const incomingV1 = await writeToolkit(incomingRootV1, "v1");
    const incomingV2 = await writeToolkit(incomingRootV2, "v2");
    const currentDir = path.join(projectDir, ".agents");
    await fse.ensureDir(projectDir);
    await installFreshTree({
        projectDir,
        incomingDir: incomingV1,
        incomingRoot: incomingRootV1,
        currentDir,
        toolkitVersion: "1.0.0",
        runId: "entrypoint-v1",
    });

    const manifest = await loadManifest(currentDir);
    const plan = await createUpdatePlan({
        currentDir,
        incomingDir: incomingV2,
        manifest,
        strategy: "replace",
    });
    const report = await applyUpdatePlan({
        projectDir,
        currentDir,
        incomingDir: incomingV2,
        incomingRoot: incomingRootV2,
        plan,
        toolkitVersion: "2.0.0",
        runId: "entrypoint-v2",
    });

    assert.equal(report.summary.entrypointConflicts, 0);
    assert.equal(await fse.readFile(path.join(projectDir, "AGENTS.md"), "utf8"), "agents-v2");
    await restoreBackup({
        projectDir,
        agentDir: currentDir,
        backupId: "entrypoint-v2",
        keepCurrent: false,
    });
    assert.equal(await fse.readFile(path.join(projectDir, "AGENTS.md"), "utf8"), "agents-v1");
    assert.equal((await loadManifest(currentDir)).toolkitVersion, "1.0.0");
});

test("update preserves a locally changed managed entrypoint and reports conflict", async (t) => {
    const root = await makeTempProject(t);
    const projectDir = path.join(root, "project");
    const incomingRootV1 = path.join(root, "toolkit-v1");
    const incomingRootV2 = path.join(root, "toolkit-v2");
    const incomingV1 = await writeToolkit(incomingRootV1, "v1");
    const incomingV2 = await writeToolkit(incomingRootV2, "v2");
    const currentDir = path.join(projectDir, ".agents");
    await fse.ensureDir(projectDir);
    await installFreshTree({ projectDir, incomingDir: incomingV1, incomingRoot: incomingRootV1, currentDir, runId: "conflict-v1" });
    await fse.writeFile(path.join(projectDir, "AGENTS.md"), "local-agents", "utf8");

    const manifest = await loadManifest(currentDir);
    const plan = await createUpdatePlan({ currentDir, incomingDir: incomingV2, manifest });
    const report = await applyUpdatePlan({
        projectDir,
        currentDir,
        incomingDir: incomingV2,
        incomingRoot: incomingRootV2,
        plan,
        runId: "conflict-v2",
    });

    assert.equal(await fse.readFile(path.join(projectDir, "AGENTS.md"), "utf8"), "local-agents");
    assert.equal(report.summary.entrypointConflicts, 1);
    assert.equal(
        await fse.readFile(path.join(currentDir, ".ag-kit/conflicts/conflict-v2/entrypoints/AGENTS.md.incoming"), "utf8"),
        "agents-v2",
    );
});
