# PLAN — CIT Website V1 (Cursor /goal run)

Objective: a polished, production-ready bilingual BG/EN V1 website for the Center for Intelligent Technologies, truthful to the approved sources, visually verified at the four reference viewports, technically healthy and ready for stakeholder review / preview deployment. Definition of Done: see `docs/08_ACCEPTANCE_CRITERIA.md` and section 16 of the Cursor goal prompt.

## Milestones

- **A. Foundation** — sources read; Build Pack normalized to `/docs`; `AGENTS.md`; Next.js 16 + TS + Tailwind 4 scaffold; git.
- **B. Reference inspection** — Stanford HAI (home/about) for editorial grammar; minimal targeted looks at IDSS (framework compression), Dark Matter Labs (system maps), Turing (project template) only if a concrete question arises. Notes → `docs/DESIGN_DECISIONS.md`.
- **C. Original design system** — tokens (paper/ink/marine/amber), type (Source Serif 4 display · IBM Plex Sans body · IBM Plex Mono labels), spacing/container, diagram grammar, motion rules. Opening composition explored as two coded alternatives, screenshot-compared, one selected.
- **D. Homepage** — all eleven sections in BG and EN, composed from shared components.
- **E. System visuals** — `SystemAnatomy` (components → failure modes), `PillarsCycle`, `MethodologyLoop` (10 ASAESIS-aligned stages), `ValueChain` (wine × tourism). Mobile reflow + textual fallback.
- **F. Internal pages** — About, Methodology, Projects (list + 2 truthful details), Insights (list + concept notes), People (planned structure, no invented people), Work with us (collaboration routes), Privacy, bilingual 404.
- **G. Bilingual + truth audit** — every route in both locales; no mixed-language UI; BG wrapping checked; no unsupported facts.
- **H. QA** — 1440/1280/768/390 screenshots; axe on all routes; Lighthouse; SEO (titles, descriptions, canonical/hreflang, sitemap, robots, OG, Organization JSON-LD with confirmed fields only); `npm run check`.
- **I. Release readiness** — final fidelity pass; preview deploy if Vercel auth exists (no domain changes); final report.

## Key decisions (summary — details in docs/DESIGN_DECISIONS.md and BUILD_PROGRESS.md)

- Public name: Център за интелигентни технологии / Center for Intelligent Technologies (confirmed decision; sources use „Център за смарт технологии“ — conflict logged).
- Methodology naming: ASAESIS is the approved operational methodology; the 10 stages of the Action Plan are the canonical public methodology; the homepage loop is a compressed view labelled as such.
- Featured project: „Българско вино × Български туризъм“ — status *Pilot concept*. Second entry: the broader sector mandate — status *Proposed research mandate*.
- People: no names; planned governance functions from the Action Plan only.
- Network: UASG only; partner universities "to be confirmed".
- Contact: no invented channels; neutral "to be published" treatment.
- i18n: `/[locale]` segment (bg, en), shared typed content with per-locale text fields, `/` → locale redirect.
