#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cursorDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rufloRoot = path.resolve(cursorDir, '..');
const project = path.dirname(rufloRoot);
const configPath = path.join(cursorDir, 'config.json');
const routingPath = path.join(cursorDir, 'model-routing.json');
const runtimeBin = path.join(rufloRoot, 'runtime', 'node_modules', '.bin', 'ruflo');
const runDir = path.join(cursorDir, 'run');
const metricsDir = path.join(cursorDir, 'metrics');
const stateDir = path.join(rufloRoot, 'state');
const enabledPath = path.join(cursorDir, 'enabled');

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJsonAtomic(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temp, file);
}
function argValue(args, name) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}
function hasArg(args, name) { return args.includes(name); }
function sha256(value) { return createHash('sha256').update(value).digest('hex'); }

function resolveAgent() {
  const configured = readJson(configPath).agentBin || 'agent';
  if (configured !== 'agent' && fs.existsSync(configured)) return { bin: configured, prefix: [] };
  const homeAgent = path.join(os.homedir(), '.local', 'bin', 'agent');
  if (fs.existsSync(homeAgent)) return { bin: homeAgent, prefix: [] };
  const which = spawnSync('which', ['agent'], { encoding: 'utf8' });
  if (which.status === 0 && which.stdout.trim()) return { bin: which.stdout.trim(), prefix: [] };
  const cursor = '/Applications/Cursor.app/Contents/Resources/app/bin/cursor';
  if (fs.existsSync(cursor)) return { bin: cursor, prefix: ['agent'] };
  throw new Error('Cursor Agent CLI `agent` was not found.');
}

function scoreTask(task) {
  const text = task.toLowerCase();
  let score = Math.min(3, Math.floor(task.length / 500));
  const complex = ['architecture', 'security', 'vulnerability', 'migration', 'distributed', 'race condition', 'cross-system', 'hard debug', 'root cause', 'production incident'];
  const normal = ['implement', 'refactor', 'debug', 'integration', 'database', 'api', 'frontend', 'backend', 'test'];
  const simple = ['typo', 'rename', 'format', 'copy edit', 'documentation cleanup', 'simple transformation'];
  if (complex.some((word) => text.includes(word))) score += 3;
  if (normal.some((word) => text.includes(word))) score += 1;
  if (simple.some((word) => text.includes(word))) score -= 2;
  if (/\b(auth|permission|credential|payment|delete|destructive)\b/.test(text)) score += 2;
  if (/\b(multiple|across|several|unknown|ambiguous)\b/.test(text)) score += 1;
  if (score <= 0) return 'simple';
  if (score <= 2) return 'normal';
  if (score <= 4) return 'complex';
  return 'very-complex';
}

function rufloRoute(task) {
  if (!fs.existsSync(runtimeBin)) return { ok: false, exitCode: null, parsed: null, output: 'runtime missing' };
  fs.mkdirSync(stateDir, { recursive: true });
  const result = spawnSync(runtimeBin, ['hooks', 'route', '--task', task, '--json'], {
    cwd: stateDir,
    env: { ...process.env, CLAUDE_FLOW_DB_PATH: path.join(stateDir, 'ruflo.db'), RUFLO_TELEMETRY_ENABLED: 'false', CLAUDE_FLOW_TELEMETRY_ENABLED: 'false' },
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 2 * 1024 * 1024
  });
  const combined = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.trim();
  let parsed = null;
  for (const candidate of [result.stdout, combined]) {
    try { parsed = JSON.parse(candidate); break; } catch {}
  }
  return { ok: result.status === 0, exitCode: result.status, parsed, output: combined.slice(0, 4000) };
}

function translateRufloTier(ruflo, fallbackTier) {
  const raw = JSON.stringify(ruflo.parsed ?? ruflo.output ?? '').toLowerCase();
  if (/opus|very.?complex|tier.?3|high complexity/.test(raw)) return fallbackTier === 'very-complex' ? fallbackTier : 'complex';
  if (/sonnet|tier.?2|medium complexity/.test(raw)) return fallbackTier === 'simple' ? 'normal' : fallbackTier;
  if (/haiku|tier.?1|low complexity/.test(raw)) return fallbackTier;
  return fallbackTier;
}

function chooseRoute(task, requestedTier) {
  const routing = readJson(routingPath);
  const fallbackTier = requestedTier ?? scoreTask(task);
  const ruflo = rufloRoute(task);
  const tier = requestedTier ?? translateRufloTier(ruflo, fallbackTier);
  const selected = routing.routes[tier] ?? routing.fallback;
  return { tier, ...selected, ruflo, localComplexityTier: fallbackTier };
}

function extractUsage(payload) {
  const usage = { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, reasoningTokens: 0, totalTokens: 0, captured: false };
  const candidates = [payload?.usage, payload?.token_usage, payload?.result?.usage].filter(Boolean);
  for (const item of candidates) {
    usage.captured = true;
    usage.inputTokens = Number(item.input_tokens ?? item.inputTokens ?? 0);
    usage.cachedInputTokens = Number(item.cached_input_tokens ?? item.cachedInputTokens ?? 0);
    usage.outputTokens = Number(item.output_tokens ?? item.outputTokens ?? 0);
    usage.reasoningTokens = Number(item.reasoning_tokens ?? item.reasoningTokens ?? 0);
    usage.totalTokens = Number(item.total_tokens ?? item.totalTokens ?? 0);
  }
  return usage;
}

function parseAgentOutput(stdout) {
  const lines = stdout.split(/\r?\n/).filter(Boolean);
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try { return { parsed: JSON.parse(lines[i]), raw: stdout }; } catch {}
  }
  return { parsed: null, raw: stdout };
}

function updateTotals() {
  const files = fs.existsSync(metricsDir) ? fs.readdirSync(metricsDir).filter((name) => name.startsWith('worker-') && name.endsWith('.json')) : [];
  const records = files.map((name) => readJson(path.join(metricsDir, name)));
  const totals = records.reduce((acc, item) => {
    acc.workers += 1;
    if (item.status === 'completed') acc.completed += 1; else acc.failed += 1;
    acc.byModel[item.model] ??= { workers: 0 };
    acc.byModel[item.model].workers += 1;
    if (item.usage?.captured) {
      for (const key of ['inputTokens', 'cachedInputTokens', 'outputTokens', 'reasoningTokens', 'totalTokens']) {
        acc.usage[key] += Number(item.usage?.[key] ?? 0);
        acc.usage.captured = true;
      }
    }
    return acc;
  }, { generatedAt: new Date().toISOString(), host: 'cursor', workers: 0, completed: 0, failed: 0, usage: { captured: false, inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, reasoningTokens: 0, totalTokens: 0 }, byModel: {}, note: 'Token totals are recorded only when Cursor Agent CLI JSON includes usage. No estimated savings are invented.' });
  writeJsonAtomic(path.join(metricsDir, 'session-totals.json'), totals);
}

function runHook(name, args) {
  if (!fs.existsSync(runtimeBin)) return { ok: false };
  fs.mkdirSync(stateDir, { recursive: true });
  const result = spawnSync(runtimeBin, ['hooks', name, ...args, '--json'], {
    cwd: stateDir,
    env: { ...process.env, CLAUDE_FLOW_DB_PATH: path.join(stateDir, 'ruflo.db'), RUFLO_TELEMETRY_ENABLED: 'false', CLAUDE_FLOW_TELEMETRY_ENABLED: 'false' },
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 1024 * 1024
  });
  return { ok: result.status === 0 };
}

async function runWorker(options) {
  if (!fs.existsSync(enabledPath)) throw new Error('Cursor Ruflo is OFF. Run ruflo-cursor-on first.');
  const task = options.task;
  const role = options.role ?? 'worker';
  const cwd = path.resolve(options.cwd ?? project);
  const route = chooseRoute(task, options.tier);
  if (options.model) route.model = options.model;
  const id = `${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}`;
  const registryPath = path.join(runDir, `${id}.json`);
  const start = new Date();
  const readOnly = Boolean(options.readOnly);
  const agent = resolveAgent();
  const args = [
    ...agent.prefix, '-p',
    '--trust',
    '--output-format', 'json',
    '--workspace', cwd,
    '--model', route.model,
    '--approve-mcps'
  ];
  if (readOnly) args.push('--mode', 'ask');
  args.push(`[cursor-ruflo worker ${id}; role=${role}; tier=${route.tier}] ${task}`);
  const before = runHook('pre-task', ['--description', task]);
  const registry = { id, pid: null, role, task, model: route.model, tier: route.tier, cwd, readOnly, startedAt: start.toISOString(), command: 'agent', status: 'starting' };
  fs.mkdirSync(runDir, { recursive: true });
  writeJsonAtomic(registryPath, registry);
  const child = spawn(agent.bin, args, { cwd, env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
  registry.pid = child.pid;
  registry.status = 'running';
  writeJsonAtomic(registryPath, registry);
  let stdout = '';
  let stderr = '';
  child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
  const exitCode = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', resolve);
  });
  const end = new Date();
  const parsed = parseAgentOutput(stdout);
  const usage = extractUsage(parsed.parsed);
  const after = runHook('post-task', ['--task-id', id, '--success', exitCode === 0 ? 'true' : 'false']);
  const metric = {
    workerId: id,
    host: 'cursor',
    role,
    task,
    tier: route.tier,
    localComplexityTier: route.localComplexityTier,
    rufloRouting: { ok: route.ruflo.ok, exitCode: route.ruflo.exitCode, outputSha256: sha256(route.ruflo.output ?? '') },
    model: route.model,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    durationMs: end - start,
    cliDurationMs: parsed.parsed?.duration_ms ?? null,
    sessionId: parsed.parsed?.session_id ?? null,
    result: parsed.parsed?.result ?? stdout.slice(0, 4000),
    usage,
    status: exitCode === 0 && parsed.parsed?.is_error !== true ? 'completed' : 'failed',
    exitCode,
    retries: 0,
    workingDirectory: cwd,
    worktree: cwd,
    pid: child.pid,
    outputStatus: parsed.parsed ? 'json' : 'text',
    hooks: { preTask: before.ok, postTask: after.ok },
    stderrTail: stderr.slice(-2000)
  };
  fs.mkdirSync(metricsDir, { recursive: true });
  writeJsonAtomic(path.join(metricsDir, `worker-${id}.json`), metric);
  registry.status = metric.status;
  registry.completedAt = end.toISOString();
  writeJsonAtomic(registryPath, registry);
  updateTotals();
  if (parsed.parsed?.result) console.log(String(parsed.parsed.result));
  else if (stdout.trim()) console.log(stdout.trim());
  if (exitCode !== 0 && stderr.trim()) console.error(stderr.trim());
  return exitCode === 0 && metric.status === 'completed' ? 0 : 1;
}

async function parallel(specPath) {
  const config = readJson(configPath);
  const spec = readJson(path.resolve(specPath));
  if (!Array.isArray(spec.workers) || spec.workers.length === 0) throw new Error('Spec must contain a non-empty workers array.');
  const max = Math.min(Number(config.maxConcurrentWorkers ?? 3), 3);
  const writingCwds = new Set();
  for (const worker of spec.workers) {
    if (!worker.readOnly) {
      const cwd = path.resolve(worker.cwd ?? project);
      if (writingCwds.has(cwd)) throw new Error(`Unsafe parallel spec: multiple writing workers share ${cwd}`);
      writingCwds.add(cwd);
    }
  }
  let cursor = 0;
  let failed = false;
  async function lane() {
    while (cursor < spec.workers.length) {
      const worker = spec.workers[cursor++];
      const code = await runWorker({ task: worker.task, role: worker.role, tier: worker.tier, model: worker.model, cwd: worker.cwd, readOnly: Boolean(worker.readOnly) });
      if (code !== 0) failed = true;
    }
  }
  await Promise.all(Array.from({ length: Math.min(max, spec.workers.length) }, lane));
  return failed ? 1 : 0;
}

async function main() {
  const [command, ...args] = process.argv.slice(2);
  if (!command || ['help', '--help', '-h'].includes(command)) {
    console.log('Usage: adapter.mjs route "TASK" | run --task "TASK" [--role ROLE] [--tier TIER] [--model MODEL] [--read-only] [--cwd DIR] | parallel SPEC.json | totals');
    return 0;
  }
  if (command === 'route') {
    const task = args.join(' ').trim();
    if (!task) throw new Error('route requires a task');
    const route = chooseRoute(task);
    console.log(JSON.stringify({ host: 'cursor', tier: route.tier, model: route.model, localComplexityTier: route.localComplexityTier, rufloRouteOk: route.ruflo.ok }, null, 2));
    return 0;
  }
  if (command === 'run') {
    const task = argValue(args, '--task');
    if (!task) throw new Error('run requires --task');
    return runWorker({ task, role: argValue(args, '--role'), tier: argValue(args, '--tier'), model: argValue(args, '--model'), cwd: argValue(args, '--cwd'), readOnly: hasArg(args, '--read-only') });
  }
  if (command === 'parallel') {
    if (!args[0]) throw new Error('parallel requires a JSON spec path');
    return parallel(args[0]);
  }
  if (command === 'totals') {
    updateTotals();
    console.log(fs.readFileSync(path.join(metricsDir, 'session-totals.json'), 'utf8').trim());
    return 0;
  }
  throw new Error(`Unknown command: ${command}`);
}

main().then((code) => { process.exitCode = code; }).catch((error) => { console.error(`ruflo-cursor-adapter: ${error.message}`); process.exitCode = 1; });
