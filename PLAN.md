# PLAN — CIT Website V2

Objective: refine the accepted V1 into a production-hardened V2 — less documentary density, more institutional presence, an interactive ASAESIS explorer, a scannable project executive layer, and a secure structured admin/content platform — without rebuilding the site.

Definition of Done: section 40 of the V2 goal prompt.

## Preserve (non-negotiable)

- Information architecture and `/[locale]` routes.
- Drafting Editorial identity: Source Serif 4, IBM Plex Sans/Mono, paper/ink/marine/amber, hairline diagrams.
- ASAESIS ten-stage methodology and leading programme name.
- Bilingual BG/EN as equal surfaces.
- Content truth: UASG only confirmed institution; no invented people, partners, funding, results, or contact channels.
- Wine × Tourism as *Pilot concept*; sector mandate as *Proposed research mandate*.
- Typed seed content in `src/content/` as the versioned fallback and import source.

## Milestones

- **A. Audit** — repo, docs, sources, deployed V1, local run. Strengths recorded.
- **B. Visual/editorial refinement** — homepage copy −35–45% visible; photo-led hero; two signature visuals only (Core System Model + ASAESIS); source-faithful heading on algorithmic structure.
- **C. Methodology Explorer** — source-backed stage fields; desktop journey + mobile sequence; reduced motion; textual equivalent.
- **D. Project experience** — executive layer + retained detailed framework; desktop contents; truthful status.
- **E. Content platform** — schema, RLS, storage, roles ADMIN/EDITOR, draft/review/published/archived, preview, media, SEO, truth controls, BG/EN completeness. Seed → CMS migration path. Local adapter when Supabase credentials are absent.
- **F. SEO / robots** — environment-aware `noindex,nofollow` unless `CIT_ALLOW_INDEXING=true`; admin/preview always noindex.
- **G. QA** — `npm run check`, unit tests, browser viewports 1440/1280/768/390, BG wrapping, a11y of explorer and admin forms, preview deploy if Vercel is available.

## Architecture (V2)

- Public site remains Next.js App Router, server-first, static-capable.
- Runtime content: CMS when configured; otherwise versioned seed. Public pages must not fail closed if CMS is down.
- `/admin` is outside the locale tree, never indexed, server-authorized.
- Adapters: `supabase` | `local` (dev only) | `seed` (read-only fallback).
- Never two permanent competing editorial sources: seed is the import/fallback; CMS is runtime truth when connected.

## Explicit non-goals

Page builder, public accounts, chatbot, fake metrics, Stanford clone, WebGL, newsletter, CRM.
