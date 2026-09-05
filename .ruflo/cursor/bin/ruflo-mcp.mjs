#!/usr/bin/env node
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const cursorDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rufloRoot = path.resolve(cursorDir, '..');
const runtimeBin = path.join(rufloRoot, 'runtime', 'node_modules', '.bin', 'ruflo');
const stateDir = path.join(rufloRoot, 'state');

if (!fs.existsSync(runtimeBin)) {
  console.error(`Ruflo runtime missing: ${runtimeBin}`);
  process.exit(1);
}

const requestedProtocols = new Map();
const child = spawn(runtimeBin, ['mcp', 'start'], {
  cwd: stateDir,
  env: {
    ...process.env,
    CLAUDE_FLOW_DB_PATH: path.join(stateDir, 'ruflo.db'),
    RUFLO_TELEMETRY_ENABLED: 'false',
    CLAUDE_FLOW_TELEMETRY_ENABLED: 'false'
  },
  stdio: ['pipe', 'pipe', 'pipe']
});

const input = readline.createInterface({ input: process.stdin, crlfDelay: Infinity });
input.on('line', (line) => {
  try {
    const message = JSON.parse(line);
    if (message.method === 'initialize' && message.id !== undefined) {
      requestedProtocols.set(String(message.id), message.params?.protocolVersion);
    }
  } catch {}
  child.stdin.write(`${line}\n`);
});
input.on('close', () => child.stdin.end());

const output = readline.createInterface({ input: child.stdout, crlfDelay: Infinity });
output.on('line', (line) => {
  try {
    const message = JSON.parse(line);
    const requested = requestedProtocols.get(String(message.id));
    if (requested && message.result?.protocolVersion) message.result.protocolVersion = requested;
    process.stdout.write(`${JSON.stringify(message)}\n`);
  } catch {
    process.stderr.write(`Ignored non-JSON Ruflo MCP stdout: ${line.slice(0, 300)}\n`);
  }
});
child.stderr.pipe(process.stderr);
child.on('error', (error) => { console.error(error.message); process.exit(1); });
child.on('close', (code) => { process.exitCode = code ?? 1; });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
