# BUILD_PROGRESS — CIT Website V1

Durable checkpoint log. Update after each checkpoint. Re-read with `AGENTS.md` and `PLAN.md` after any long gap.

## Current checkpoint

**A — Foundation** (in progress)

## Verified work

- 2026-09-05 — Read all Build Pack files (00–09, 11) and the three authoritative sources (`references/source/`: CIT Action plan BG, Wine mandate CST BG, Българско вино × Български туризъм).
- Build Pack normalized to `docs/00_…08_*.md` (interleaved passages from the .docx export repaired by hand in 03 and 07).
- Root `AGENTS.md` written (Ruflo managed block preserved). `PLAN.md` created.
- Git repository initialized on `main`. Next.js 16.3.4 / React 19.2 / Tailwind 4.3 / TypeScript scaffold configured (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`).

## Source facts established (for the content-truth audit)

- Center: interdisciplinary platform for education, academic research and applied science on the architecture, engineering, testing and continuous adaptation of social-institutional systems (Action Plan, Мисия).
- Leading research programme: „Алгоритмизация на социалните процеси“ (Action Plan, Стълб II).
- Operational methodology: **ASAESIS** — Алгоритмичен системен анализ и инженеринг на социално-институционални системи (Wine mandate). The Action Plan defines a 10-stage "Стандартна методология на системното инженерство"; the mandate applies a 12-stage project-specific sequence; the teaser uses a 5-stage working method plus Design → Implement → Measure → Test → Adapt.
- Three pillars: Образование · Академични изследвания · Приложна наука (и консултантски услуги на търговска основа). Integrated operating model described explicitly (Action Plan, Интегриран модел).
- Planned governance functions (no appointees): Директор, Ръководител на звеното, Научен и програмен съвет, Проектни екипи, Външен консултативен съвет.
- Funding: diversified model *sought* (university, state, EU, private sponsorship, consulting income). No award confirmed. The Center "все още… не разполага с трайно осигурено финансиране" (mandate).
- Wine × tourism: **pilot concept / project teaser**; proposed to a future advisory council incl. ministries and branch organizations — these are *proposed addressees*, not partners. Budgets and person-day estimates are internal negotiation figures — not published.
- Broader mandate: „Системна архитектура и стратегическа трансформация на българския лозаро-винарски сектор“ — proposed first applied research project; currently at resource-estimation stage.
- Confirmed institutional anchor: UASG only. Partner universities: unnamed, agreement being finalized (Year 1 priority).

## Conflicts logged

- **Name**: sources use „Център за смарт технологии – Лаборатория за архитектура и инженеринг на социално-институционални системи“; the goal prompt and Build Pack fix the public name as „Център за интелигентни технологии / Center for Intelligent Technologies“. Higher-authority confirmed decision applied; the "laboratory for architecture and engineering of social-institutional systems" descriptor is retained as a supported tagline.
- **Methodology stage naming**: Action Plan (10 stages) vs mandate (12) vs teaser (5 + loop). Public Methodology page follows the Action Plan's 10 stages under the ASAESIS name; the project pages show their own project-specific sequences; the homepage shows a compressed loop labelled as a simplified view.
- **Author of the mandate letter** (Георги Василев) has no confirmed CIT role in the sources → not published as a team member.

## Remaining work

Checkpoints B–I (see PLAN.md).

## Blockers

None so far. Deployment credentials to be checked at checkpoint I (`npx vercel whoami`).
