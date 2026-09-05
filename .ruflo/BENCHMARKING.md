# Ruflo benchmark protocol

Use the same task, explicit model, reasoning effort, sandbox, and working directory for both arms.

- Pure Codex arm: `.ruflo/bin/ruflo-codex run --mode pure --benchmark-label NAME --model MODEL --reasoning EFFORT --task "TASK"`
- Ruflo arm: `.ruflo/bin/ruflo-codex run --mode ruflo --benchmark-label NAME --model MODEL --reasoning EFFORT --task "TASK"`
- Aggregate: `.ruflo/bin/ruflo-codex totals`

The JSON records under `.ruflo/metrics/` use actual `codex exec --json` usage. Total tokens and model/credit/cost efficiency are separate. Ruflo's own savings estimate is never treated as ground truth, and pricing is not invented when account-native credit or cost telemetry is unavailable.
