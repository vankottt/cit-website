# BUILD_PROGRESS — CIT Website V2

Durable checkpoint log. Re-read with `AGENTS.md` and `PLAN.md` after any long gap.

## Current checkpoint

**Homepage overlay (2026-09-06):** local muted loop from `Video/202609062306.mp4`, served as grayscale `public/videos/hero.mp4`, pause control, poster under reduced motion. Not the previous UASG YouTube mock. Footage is transport infrastructure and is not captioned as CIT activity. Stanford HAI video is not used. Insight YouTube embeds remain without autoplay.

**IA order (2026-09-06):** header, footer, mobile menu and homepage share About → Methodology → News → Insights → Projects → Team. Work with us stays last as the collaboration CTA. Institutional network sits in the About cluster (after pillars) so scroll-spy does not jump back to About later. Build Pack 02 listed Projects → Insights → News; confirmed team decision supersedes it.

Public labels: People → Team (Екип / Team). News channel (`/news`) now has one confirmed UASG article (`kogato-praktikata-vleze-v-universiteta`, source uacg.bg 02.12.2025) with YouTube `kfV3dGGHO5s` as a mid-body embed. Distinct from Insights concept notes. STRABAG, Stara Zagora, EQE-Control and NSORB are named in the UASG source only — not CIT partners. The source line `съм Строителен факултет` is republished as `към`.

Team portraits: grayscale cutouts over a circular `marine-tint` plate (`marine` on hover); the person breaks the circle. Order: Boris Tsankov, Georgi Vassilev, Ivan Todorov. Titles in `name` only; no invented CIT roles. One quiet “+” slot for profiles still to be announced. Ivan has a confirmed LinkedIn URL.

**V2 complete for the available repository, browser, network and credentials.** Public editorial V2, Methodology Explorer, project executive layer, structured admin, truth controls, environment-aware noindex, tests and `npm run check` all pass. Live hosted Supabase Auth remains an external setup step.

Insight body may include a whole-line YouTube URL (watch / youtu.be / Shorts); it renders as a hairline 16:9 `youtube-nocookie` embed with no autoplay. Not a page builder and not raw HTML.

## V1 strengths preserved (verified 2026-09-05)

- Intellectual positioning and ASAESIS structure.
- IA: About · Methodology · News · Insights · Projects · Team · Work with us · BG/EN (confirmed 2026-09-06; supersedes Build Pack order Projects → Insights → News). Team keeps the `/people` URL. News reuses insight records with `type: news` (text + YouTube); no invented articles.
- Drafting Editorial system (serif display, Plex body/mono labels, marine + amber).
- Truthful project status and empty public people list.
- Temporary UASG photography (`campus-facade`, `campus-hall`) with captions that refuse CIT attribution.

## V2 delivered

- Homepage: photo-led editorial hero; copy tightened; only two signature visuals (Core System Model + ASAESIS); heading “Human-designed systems have algorithmic structures”.
- Methodology Explorer: desktop tab journey + mobile full sequence; keyboard tabs; source-backed fields only.
- Wine × Tourism: executive layer + sticky contents; detailed framework retained; status remains Pilot concept.
- `/admin`: ADMIN/EDITOR, draft/review/published/archived, preview cookies, media library, settings slots, BG/EN fields, truth validation.
- CMS adapters: `supabase` | `local` (file store, including hosted demo when `CIT_ADMIN_DEV_PASSWORD` is set; `/tmp` on Vercel) | `seed` (read-only fallback). Public lists read published CMS records with seed fallback.
- Indexing: `CIT_ALLOW_INDEXING=true` required; preview/dev always `noindex,nofollow`; `/admin` always noindex; `robots.txt` disallows `/` unless indexable.
- Tests: 25 passing (indexing, truth, preview, routing/CMS mode, YouTube body blocks). `npm run check` green.

## Browser QA (local, 2026-09-05)

| Viewport | Surfaces |
|---|---|
| 1440×1000 | Homepage hero + Core System Model, methodology explorer (stage 05), wine executive + TOC, people (no named staff), admin login/dashboard/projects/editor/media |
| 768×1024 | Homepage stacked editorial hero + photo |
| 390×844 | BG homepage (no horizontal overflow), mobile menu, work-with-us routes, methodology explorer sequential list |

Rendered `meta robots` and `X-Robots-Tag`: `noindex, nofollow`. Missing project slug returns 404. Admin login (`admin@cit.local`) works with `CIT_ADMIN_DEV_PASSWORD`. Preview EN from the project editor reaches the public project page.

## Source facts (unchanged)

- Center: interdisciplinary platform for education, research and applied science on social-institutional systems (Action Plan, Мисия).
- Programme: „Алгоритмизация на социалните процеси“. Method: **ASAESIS**, 10 public stages.
- Confirmed institution: UASG only.
- Wine × tourism: pilot concept. Sector mandate: proposed research mandate.
- No confirmed team, contact channels, partners, funding, or measured results.

## Conflicts logged

- Public name vs source “Център за смарт технологии” — confirmed public name stands.
- Methodology 10 vs mandate 12 vs teaser 5 — public method remains the 10 stages.

## External blockers (not workarounds for incomplete V2)

- **Supabase** is connected for production CMS (`cit-website` / Frankfurt). Public People remains empty until appointed people are confirmed. Enable leaked-password protection in Auth settings when convenient. Preview and production currently share this database.
- **Temporary UASG photographs** must be replaced before a final public launch (`docs/TEMP_IMAGE_SOURCES.md`).
- **`CIT_ALLOW_INDEXING` must stay unset/false** on the current Vercel preview alias. No production DNS was changed.
- **No confirmed inquiry inbox** — Work with us has no submission form by design.

## Quality gates

- `npm run check` — pass (typecheck, eslint, 17 tests, production build).
- Hydration warnings observed in the Cursor browser were `data-cursor-ref` instrumentation, not production markup.

## Preview deployment (2026-09-05)

- Preview URL: https://cit-website-f78jrwkqh-darinatodorova2025-6319s-projects.vercel.app
- Inspector: https://vercel.com/darinatodorova2025-6319s-projects/cit-website/782pv2TXKhNPSCswamT2Etc2hekP
- Target: preview only (`target: null`). Production DNS and `cit-website-psi.vercel.app` were not promoted.
- Verified via `vercel curl`: `meta robots` and `X-Robots-Tag` are `noindex, nofollow`; `robots.txt` is `Disallow: /`; homepage title and V2 copy are present.
- Vercel Deployment Protection (SSO) is on for this preview; unauthenticated curl redirects to Vercel login. That is hosting protection, not an application defect.
- Hosted demo (2026-09-05): `CIT_ADMIN_DEV_PASSWORD` on Vercel enabled `/admin` before Supabase. Durable CMS (2026-09-06) uses Supabase Auth + `staff`; local file store remains for `npm run dev` without Supabase env.

## 2026-09-07 — Team portrait sizing
- Increased shared TeamGrid portrait tile cap from 232px to 264px using the supplied screenshot as approximate size reference; updated responsive image sizes.
- BG browser verification at 1440x1000, 1280x800, 768x1024, 390x844: portraits resize and no horizontal overflow.
- Typecheck passes. npm run check stops at three existing react-hooks/set-state-in-effect errors in useHomeSectionSpy.ts, InView.tsx and MethodologyLoop.tsx; unrelated files unchanged.

- Clarification: user meant person scale relative to circle. Restored 232px circle cap; inset portrait to 23% from top with contain/bottom alignment, retaining seated cutout framing to account for its transparent padding. Desktop browser verified. Existing source crops limit the torso visible compared with the supplied reference.


## 2026-09-07 — Fresh matched team portraits
- Reprocessed the three original photographs in Team Photos using imagegen, requesting identity preservation, natural monochrome skin texture and consistent framing. Source files preserved. Selected edits keyed to alpha with the installed remove_chroma_key helper; new versioned public PNG assets all have transparent corners.
- Replaced prior cutouts in typed people content; updated existing portrait-path test. Removed grayscale CSS filtering, filename-specific framing and portrait scaling/translation effects. Shared circular clipping now hides torso image boundaries; uniform inset controls head scale.
- Visual QA: BG 1440x1000, 1280x800, 768x1024, 390x844, EN 1440x1000. All three assets render; no horizontal overflow or console errors in scoped check. Existing mobile header crowding is outside portrait scope.
- Typecheck, 40 tests and production build pass. Full npm run check remains blocked at three pre-existing react-hooks/set-state-in-effect lint errors in useHomeSectionSpy.ts, InView.tsx, MethodologyLoop.tsx.
- Local only; no publication.
