# CIT Website — Repository Instructions

Official website of the Center for Intelligent Technologies (CIT / Център за интелигентни технологии), institutionally anchored at UASG (УАСГ). Bilingual BG/EN, Next.js App Router, TypeScript, Tailwind CSS v4, static-first.

## Authority order
1. Approved CIT source documents in `references/source/` (CIT Action Plan BG, Wine mandate CST BG, Българско вино × Български туризъм) and confirmed project decisions.
2. `/docs` Build Pack (00–08) and `docs/DESIGN_DECISIONS.md`.
3. Selected original CIT design system as implemented in `src/app/globals.css` and `src/components/`.
4. Benchmark websites — patterns only, never facts about CIT.
5. Agent inference.

When sources conflict, prefer the higher authority and record the conflict in `BUILD_PROGRESS.md`. Do not silently reconcile.

## Core idea (do not flatten into AI marketing)
CIT is an interdisciplinary platform for education, academic research and applied science focused on the architecture, engineering, testing, redesign and continuous adaptation of complex social-institutional systems. Institutions, policies, enterprises and markets are treated as human-designed systems with goals, actors, rules, decision points, information flows, incentives, feedback and measurable outcomes. AI is an enabling capability inside this systems approach, not the identity. Approved methodology name: **ASAESIS** (Алгоритмичен системен анализ и инженеринг на социално-институционални системи). Leading research programme: „Алгоритмизация на социалните процеси“.

## Content truth (zero tolerance)
Never invent names, formal roles/titles, partners, clients, funding awards, completed projects, measured results, publications, metrics, contact details or institutional approvals. Only confirmed institutional relationship: UASG. The wine × tourism work is a **pilot concept / proposal** — expected outcomes are never presented as results. Team, contact channels and partner universities are *to be confirmed*; omit or label neutrally. People development fixtures live only behind `CIT_DEV_FIXTURES=1` and never render in production builds. Three demonstration News articles overlay until an editor saves them from `/admin`; they stay labelled as fictional in source metadata unless the editor changes that. Confirmed seed news remains the UASG article only. Three Insights analyses overlay until saved from `/admin`; they are concept notes, not research publications or measured results.

## Information architecture (V1)
Nav: About · Methodology · Projects · News · Insights · Team · Work with us · BG/EN.
Homepage (Goal 2, 2026-09-07; supersedes the V1 Insights-on-homepage scroll): Header → Hero → Why CIT / Core System Model → Education · Research · Applied Science → Institutional anchor → ASAESIS → Featured project → News → Team → Work with us → Footer. Insights remains a primary-nav route, not a homepage preview. Goal 3 (2026-09-07) primary-nav order matches homepage-mapped sections so scroll-spy is monotonic; Insights is route-only and is skipped by homepage scroll-spy.
Routes live under `src/app/[locale]/…` for `bg` and `en`; `/` redirects to a locale.

## Engineering rules
- Page files are composition only; reusable components live in `src/components/{layout,editorial,systems,projects,people,partners,ui}`.
- Content is typed and lives in `src/content/`; UI strings in `src/content/messages.ts`. Runtime CMS (local or Supabase) may override published records; seed remains the fallback. No copy hard-coded in reusable public components; no layout coupled to English text length.
- `/admin` is a structured editorial console (not a page builder). It is always noindex. See `docs/ADMIN.md` and `docs/CONTENT_ARCHITECTURE.md`.
- Preview/staging must not be indexed unless `CIT_ALLOW_INDEXING=true` on an explicit production deployment.
- Server components by default; `"use client"` only where interaction needs it (mobile menu, language switcher, motion opt-ins).
- Diagrams are code-native SVG/HTML with textual meaning; they must reflow on mobile and honour `prefers-reduced-motion`.
- No CMS, database, auth or global state framework in V1.
- Keep the design system consistent: do not add one-off variants to patch drift; fix the primitive.

## Visual direction
Stanford HAI informs only high-level editorial grammar (whitespace, hierarchy, restraint). The implementation reference is the original CIT system recorded in `docs/DESIGN_DECISIONS.md`: light editorial foundation, serif display + humanist sans + mono technical labels, deep marine institutional tone, one amber accent, hairline "drafting" diagram language. Anti-patterns: neon/cyber, glowing brains, gradients/glass, bento filler, fake dashboards/metrics, pill/badge overuse, card grids everywhere, kicker labels without purpose.

## Quality gates
`npm run check` (typegen + tsc, eslint, next build) must pass. Visually verify at 1440×1000, 1280×800, 768×1024, 390×844 in a real browser — a passing build is not visual acceptance. Verify Bulgarian wrapping independently of English. No console errors, no horizontal overflow, no dead controls, WCAG 2.2 AA behaviour where practical.

## Working files
`PLAN.md` — milestone plan. `BUILD_PROGRESS.md` — checkpoint log, verified work, blockers, decisions. Re-read these after any long gap before continuing.

<!-- >>> RUFLO MANAGED BLOCK (ruflo-on) >>> -->
## Optional Ruflo orchestration

Ruflo is ON for this project only. Preserve all normal Codex capabilities and the existing CODEX_HOME. Use `.ruflo/bin/ruflo-codex route "TASK"` before non-trivial delegation. Delegate headless-compatible work with `.ruflo/bin/ruflo-codex run` or a dependency-safe parallel spec; keep App/GUI-only work in the main Codex session. Maximum concurrency is 3. Concurrent writing workers must use separate Git worktrees or distinct working directories. The coordinator owns final integration and verification. Ruflo Claude-style tiers are routing signals only; actual execution must use the verified Codex mappings in `.ruflo/model-routing.json`. Never add external provider credentials. Worker usage and model evidence belong in `.ruflo/metrics/`.
<!-- <<< RUFLO MANAGED BLOCK (ruflo-off) <<< -->

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
