#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VERSION = '3.38.21';
const command = path.basename(process.argv[1]).startsWith('ruflo-cursor-') ? path.basename(process.argv[1]).slice('ruflo-cursor-'.length) : process.argv[2];
const forwarded = path.basename(process.argv[1]).startsWith('ruflo-cursor-') ? process.argv.slice(2) : process.argv.slice(3);
const cursorDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const rufloRoot = path.resolve(cursorDir, '..');
const project = path.dirname(rufloRoot);
const nodeBin = '/Users/ivan.todorov/.local/bin/node';
const mcpWrapper = path.join(cursorDir, 'bin', 'ruflo-mcp.mjs');
const runtimeBin = path.join(rufloRoot, 'runtime', 'node_modules', '.bin', 'ruflo');
const ruleTemplate = path.join(cursorDir, 'rules', 'ruflo-orchestration.mdc');
const activationTemplate = path.join(cursorDir, 'rules', 'ruflo-auto-activation.mdc');
const projectCursor = path.join(project, '.cursor');
const projectMcp = path.join(projectCursor, 'mcp.json');
const projectRule = path.join(projectCursor, 'rules', 'ruflo-orchestration.mdc');
const projectActivationRule = path.join(projectCursor, 'rules', 'ruflo-auto-activation.mdc');
const enabledPath = path.join(cursorDir, 'enabled');
const statePath = path.join(cursorDir, 'integration-state.json');
const isolationPath = path.join(cursorDir, 'codex-isolation.json');
const RUFLO_MCP_NAME = 'ruflo';

function sha256File(file) { return createHash('sha256').update(fs.readFileSync(file)).digest('hex'); }
function writeAtomic(file, content, mode = 0o644) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, content, { mode });
  fs.renameSync(temp, file);
}
function writeJson(file, value) { writeAtomic(file, `${JSON.stringify(value, null, 2)}\n`); }
function readJson(file, fallback = {}) { try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }

function readMcp(file) {
  if (!fs.existsSync(file)) return { mcpServers: {} };
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  parsed.mcpServers ??= {};
  return parsed;
}

function mcpEntry() {
  return {
    command: nodeBin,
    args: ['${workspaceFolder}/.ruflo/cursor/bin/ruflo-mcp.mjs'],
    env: {
      CLAUDE_FLOW_DB_PATH: '${workspaceFolder}/.ruflo/state/ruflo.db',
      RUFLO_TELEMETRY_ENABLED: 'false',
      CLAUDE_FLOW_TELEMETRY_ENABLED: 'false'
    }
  };
}

function captureIsolation() {
  if (fs.existsSync(isolationPath)) return readJson(isolationPath);
  const snapshot = {
    capturedAt: new Date().toISOString(),
    files: {
      'ruflo-codex-control': sha256File(path.join(os.homedir(), '.local', 'share', 'ruflo-codex', 'control.mjs')),
      'ruflo-on': sha256File(path.join(os.homedir(), '.local', 'bin', 'ruflo-on')),
      'ruflo-codex-bin': sha256File(path.join(rufloRoot, 'bin', 'ruflo-codex')),
      'ruflo-config': sha256File(path.join(rufloRoot, 'config.json')),
      'ruflo-model-routing': sha256File(path.join(rufloRoot, 'model-routing.json'))
    },
    globalCursorMcp: path.join(os.homedir(), '.cursor', 'mcp.json'),
    globalCursorMcpSha256: fs.existsSync(path.join(os.homedir(), '.cursor', 'mcp.json')) ? sha256File(path.join(os.homedir(), '.cursor', 'mcp.json')) : null,
    globalCursorMcpNames: Object.keys(readMcp(path.join(os.homedir(), '.cursor', 'mcp.json')).mcpServers).filter((name) => name !== RUFLO_MCP_NAME)
  };
  writeJson(isolationPath, snapshot);
  return snapshot;
}

function isolationStatus() {
  const snapshot = fs.existsSync(isolationPath) ? readJson(isolationPath) : captureIsolation();
  const current = {
    'ruflo-codex-control': sha256File(path.join(os.homedir(), '.local', 'share', 'ruflo-codex', 'control.mjs')),
    'ruflo-on': sha256File(path.join(os.homedir(), '.local', 'bin', 'ruflo-on')),
    'ruflo-codex-bin': sha256File(path.join(rufloRoot, 'bin', 'ruflo-codex')),
    'ruflo-config': sha256File(path.join(rufloRoot, 'config.json')),
    'ruflo-model-routing': sha256File(path.join(rufloRoot, 'model-routing.json'))
  };
  const changed = Object.entries(snapshot.files).filter(([key, hash]) => current[key] !== hash).map(([key]) => key);
  const globalMcp = path.join(os.homedir(), '.cursor', 'mcp.json');
  const globalNames = Object.keys(readMcp(globalMcp).mcpServers);
  const preserved = snapshot.globalCursorMcpNames.every((name) => globalNames.includes(name)) && !globalNames.includes(RUFLO_MCP_NAME);
  return { snapshot, changed, preserved, globalNames };
}

function pidCommand(pid) {
  const result = spawnSync('ps', ['-p', String(pid), '-o', 'command='], { encoding: 'utf8' });
  return result.status === 0 ? result.stdout.trim() : '';
}
function descendantPids(rootPid) {
  const result = spawnSync('ps', ['-axo', 'pid=,ppid='], { encoding: 'utf8' });
  if (result.status !== 0) return [];
  const children = new Map();
  for (const line of result.stdout.split(/\r?\n/)) {
    const match = line.trim().match(/^(\d+)\s+(\d+)$/);
    if (!match) continue;
    const pid = Number(match[1]);
    const ppid = Number(match[2]);
    const list = children.get(ppid) ?? [];
    list.push(pid);
    children.set(ppid, list);
  }
  const ordered = [];
  const visit = (pid) => { for (const child of children.get(pid) ?? []) visit(child); if (pid !== rootPid) ordered.push(pid); };
  visit(rootPid);
  return ordered;
}
function isCursorWorkerCommand(cmd) {
  return /cursor-agent|\/agent |\/bin\/agent|cursor agent|\s-p\s/.test(cmd) && /agent/.test(cmd);
}
function countWorkers() {
  const dir = path.join(cursorDir, 'run');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((name) => name.endsWith('.json')).map((name) => readJson(path.join(dir, name))).filter((item) => item.pid);
}

function stopWorkers(quiet = false) {
  let stopped = 0;
  for (const worker of countWorkers()) {
    const cmd = pidCommand(worker.pid);
    if (!cmd) continue;
    if (!isCursorWorkerCommand(cmd)) {
      if (!quiet) console.error(`Skipped PID ${worker.pid}: registry command no longer matches a Cursor Agent worker.`);
      continue;
    }
    for (const childPid of descendantPids(worker.pid)) {
      const childCmd = pidCommand(childPid);
      if (childCmd && isCursorWorkerCommand(childCmd)) {
        try { process.kill(childPid, 'SIGTERM'); } catch (error) { if (error.code !== 'ESRCH') throw error; }
      }
    }
    try { process.kill(worker.pid, 'SIGTERM'); stopped += 1; } catch (error) { if (error.code !== 'ESRCH') throw error; }
  }
  if (!quiet) console.log(`Cursor Ruflo workers stopped: ${stopped}`);
  return stopped;
}

function cursorVersion() {
  const result = spawnSync('/Applications/Cursor.app/Contents/Resources/app/bin/cursor', ['--version'], { encoding: 'utf8' });
  return result.stdout.trim().split(/\r?\n/)[0] || 'unavailable';
}
function agentVersion() {
  const homeAgent = path.join(os.homedir(), '.local', 'bin', 'agent');
  const bin = fs.existsSync(homeAgent) ? homeAgent : 'agent';
  const result = spawnSync(bin, ['--version'], { encoding: 'utf8' });
  return (result.stdout || result.stderr || 'unavailable').trim().split(/\r?\n/)[0];
}

function validateRuntime() {
  if (!fs.existsSync(runtimeBin)) throw new Error(`Pinned Ruflo runtime missing: ${runtimeBin}`);
  if (!fs.existsSync(mcpWrapper)) throw new Error(`Cursor MCP wrapper missing: ${mcpWrapper}`);
  if (!fs.existsSync(nodeBin)) throw new Error(`node missing: ${nodeBin}`);
  const pkg = readJson(path.join(rufloRoot, 'runtime', 'node_modules', 'ruflo', 'package.json'));
  if (pkg.version !== VERSION) throw new Error(`Ruflo version ${pkg.version} is not pinned ${VERSION}`);
}

function ensureActivationRule() {
  if (!fs.existsSync(activationTemplate)) throw new Error(`Cursor Ruflo activation rule missing: ${activationTemplate}`);
  fs.mkdirSync(path.dirname(projectActivationRule), { recursive: true });
  fs.copyFileSync(activationTemplate, projectActivationRule);
}

function on() {
  validateRuntime();
  captureIsolation();
  fs.mkdirSync(path.join(cursorDir, 'run'), { recursive: true });
  fs.mkdirSync(path.join(cursorDir, 'metrics'), { recursive: true });
  const state = readJson(statePath, {});
  fs.mkdirSync(projectCursor, { recursive: true });
  ensureActivationRule();
  const mcpExisted = fs.existsSync(projectMcp);
  const mcp = readMcp(projectMcp);
  const originalNames = Object.keys(mcp.mcpServers);
  if (!mcp.mcpServers[RUFLO_MCP_NAME]) {
    if (mcpExisted) {
      const backup = path.join(cursorDir, 'backups', `mcp.json.${new Date().toISOString().replace(/[:.]/g, '-')}.bak`);
      fs.mkdirSync(path.dirname(backup), { recursive: true });
      fs.copyFileSync(projectMcp, backup);
    }
    mcp.mcpServers[RUFLO_MCP_NAME] = mcpEntry();
    writeJson(projectMcp, mcp);
    state.projectMcpCreatedByRufloCursor = !mcpExisted;
    state.projectMcpOriginalNames = originalNames;
  }
  fs.mkdirSync(path.dirname(projectRule), { recursive: true });
  const ruleExisted = fs.existsSync(projectRule);
  fs.copyFileSync(ruleTemplate, projectRule);
  if (!ruleExisted) state.projectRuleCreatedByRufloCursor = true;
  state.project = project;
  state.enabledAt = new Date().toISOString();
  writeJson(statePath, state);
  writeAtomic(enabledPath, `${new Date().toISOString()}\n`, 0o600);
  fs.chmodSync(mcpWrapper, 0o755);
  fs.chmodSync(path.join(cursorDir, 'bin', 'adapter.mjs'), 0o755);
  console.log(`Ruflo Cursor: ON\nProject: ${project}\nPinned Ruflo: ${VERSION}\nOpen a NEW Cursor Agent chat in this project so project MCP and the Ruflo rule reload.\nExisting ~/.cursor/mcp.json was not modified.`);
}

function off() {
  stopWorkers(true);
  const state = readJson(statePath, {});
  if (fs.existsSync(projectMcp)) {
    const mcp = readMcp(projectMcp);
    if (mcp.mcpServers[RUFLO_MCP_NAME]) {
      delete mcp.mcpServers[RUFLO_MCP_NAME];
      if (state.projectMcpCreatedByRufloCursor && Object.keys(mcp.mcpServers).length === 0) fs.unlinkSync(projectMcp);
      else writeJson(projectMcp, mcp);
    }
  }
  if (fs.existsSync(projectRule) && state.projectRuleCreatedByRufloCursor) fs.unlinkSync(projectRule);
  ensureActivationRule();
  const rulesDir = path.join(projectCursor, 'rules');
  if (fs.existsSync(rulesDir) && fs.readdirSync(rulesDir).length === 0) fs.rmdirSync(rulesDir);
  if (fs.existsSync(enabledPath)) fs.unlinkSync(enabledPath);
  console.log(`Ruflo Cursor: OFF\nProject: ${project}\nRuflo orchestration removed from Cursor. Open a NEW Cursor Agent chat to reload without Ruflo.\nShared .ruflo runtime and Codex integration were not changed.`);
}

function status() {
  const enabled = fs.existsSync(enabledPath);
  const routing = readJson(path.join(cursorDir, 'model-routing.json'));
  const isolation = isolationStatus();
  const mcp = readMcp(projectMcp);
  const workers = countWorkers().filter((item) => pidCommand(item.pid) && isCursorWorkerCommand(pidCommand(item.pid)));
  console.log(`Ruflo Cursor: ${enabled ? 'ON' : 'OFF'}`);
  console.log(`Cursor version: ${cursorVersion()}`);
  console.log(`Cursor Agent CLI: ${agentVersion()}`);
  console.log(`Ruflo version: ${VERSION}`);
  console.log(`Project path: ${project}`);
  console.log(`Ruflo MCP status: ${mcp.mcpServers[RUFLO_MCP_NAME] ? 'project .cursor/mcp.json entry present' : 'absent'}`);
  console.log(`Cursor Ruflo activation rule: ${fs.existsSync(projectActivationRule) ? 'present' : 'missing'}`);
  console.log(`Cursor Ruflo orchestration rule: ${fs.existsSync(projectRule) ? 'enabled' : 'disabled'}`);
  console.log(`Routing status: ${enabled && routing.routes ? 'enabled' : 'disabled'}`);
  if (routing.routes) {
    console.log('Routing table:');
    for (const [tier, value] of Object.entries(routing.routes)) console.log(`  ${tier} → ${value.model}`);
  }
  console.log(`Running Cursor Ruflo workers: ${workers.length}`);
  for (const worker of workers) console.log(`  PID ${worker.pid} | ${worker.role} | ${worker.model} | ${worker.cwd}`);
  console.log(`Existing non-Ruflo Cursor MCP configuration preserved: ${isolation.preserved ? 'YES' : 'NO'}`);
  console.log(`Codex Ruflo integration modified: ${isolation.changed.length ? `YES (${isolation.changed.join(', ')})` : 'NO'}`);
}

function reset() {
  if (!forwarded.includes('--yes')) throw new Error('ruflo-cursor-reset requires --yes');
  off();
  for (const dir of ['run', 'metrics']) {
    const target = path.join(cursorDir, dir);
    if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: false });
    fs.mkdirSync(target, { recursive: true });
  }
  console.log(`Removed Cursor Ruflo worker/run metrics for ${project}\nCodex Ruflo state and ~/.codex were not touched.`);
}

try {
  if (command === 'on') on();
  else if (command === 'off') off();
  else if (command === 'status') status();
  else if (command === 'stop') stopWorkers();
  else if (command === 'reset') reset();
  else throw new Error(`Unknown command: ${command ?? '<none>'}`);
} catch (error) {
  console.error(`ruflo-cursor-${command ?? 'control'}: ${error.message}`);
  process.exitCode = 1;
}
