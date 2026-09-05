# Ruflo for this Codex project

This project uses Ruflo as an optional, project-local orchestration layer. The global Codex installation and `~/.codex` are not replaced or reconfigured.

## Turn it on

Run `ruflo-on` from this project, then open a new Codex task in this directory so Codex reloads the Ruflo-managed `AGENTS.md` block.

## Turn it off

Run `ruflo-off`. It stops registered Ruflo workers and removes only the Ruflo-managed project instruction block. Open a new Codex task to get a clean normal-Codex session.

## Check status

Run `ruflo-status` to see the pinned Ruflo/Codex versions, project, existing `CODEX_HOME`, integration state, global-config checksum comparison, and registered workers.

## Stop workers

Run `ruflo-stop`. It sends `SIGTERM` only to PIDs in `.ruflo/run/` whose process command still identifies a `codex exec` worker. It never uses `killall`.

## Reset

Run `ruflo-reset --yes`. It removes Ruflo-owned state from this project only and leaves `~/.codex` untouched. The user-local control commands remain available so Ruflo can be enabled again.

## Verify worker model and usage

Run `.ruflo/bin/ruflo-codex route "TASK"` to preview routing. Run `.ruflo/bin/ruflo-codex run --role ROLE --task "TASK" --read-only` to start a real Codex worker.

Each completed worker writes a JSON record under `.ruflo/metrics/`. Check its `model`, `reasoningEffort`, `usage`, `status`, timestamps, PID, role, task, and working directory. Aggregate totals are maintained in `.ruflo/metrics/session-totals.json`.
