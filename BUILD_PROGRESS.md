# BUILD_PROGRESS — CIT Website V2

Durable checkpoint log. Re-read with `AGENTS.md` and `PLAN.md` after any long gap.

## Current checkpoint

**Demo News on the public site (2026-09-07):** three fictional News articles overlay in memory on every environment so they are visible on the site. They remain labelled as demonstration examples in source metadata and are not confirmed CIT news, events, partnerships or results. They are still not in `seedStore()` / `npm run seed` and cannot be saved to local or Supabase CMS. People fixtures stay behind `CIT_DEV_FIXTURES=1`.

## Previous checkpoint

**Release audit — Goal 3 (2026-09-07):** final release-readiness pass on the Goal 1+2 baseline (`4759311e` on `main`). Not a visual redesign. `CIT_ALLOW_INDEXING` was not enabled. No inquiry inbox was invented.

Primary navigation (header, mobile menu, footer) is now About → Methodology → Projects → News → Insights → Team → Work with us. This supersedes the 2026-09-06 order (News before Projects). Homepage document order is unchanged. Insights remains a `/insights` route with no homepage section; homepage scroll-spy is About → Methodology → Projects → News → Team → Work with us. Mobile hash clicks wait until body-scroll unlock so spy state is not stale.

Published News is sorted newest source publication date first (slug tie-breaker) via `src/lib/news-order.ts`. Homepage preview limit is **5**. `/news` lists the full published set. Sitemap fallback no longer places News slugs on Insights.

Canonical Vercel project: **cit-website** (`prj_wAfaaYeSPdHI7u8dzGIDA0lA0FSx`). GitHub is not connected; CLI deploys only. Current production alias `cit-website-psi.vercel.app` still serves dirty `720e58cf` from `preview/homepage-uacg-video-hero` (Insights still on the home scroll). `cit-uasg` is a parallel non-canonical production. Do not delete sibling projects.

Goal 3 preview (not promoted, no DNS, no indexing): `dpl_31obAhTuvr4GtAfAGmdjBrs7AgzB` → https://cit-website-nvxh4u55i-darinatodorova2025-6319s-projects.vercel.app — `githubCommitSha=4759311e`, `githubCommitRef=main`, `gitDirty=1`, `source=cli`, `target=preview`, no production alias. Local production `localhost:3011` was used for browser QA of the same tree. Do not treat `cit-website-psi.vercel.app` as Goal 3 evidence. The Goal 3 preview was built from a dirty tree on `4759311e`; after this commit, a new preview or production deploy is required for a clean SHA match.

Hosted Supabase `insights.hero_media_id` is **not** applied (`42703`). Public pages work without it. Apply `supabase/migrations/20260907120000_insight_hero_media.sql` before editors attach insight/news card media.

Quality: `npm run check` pass (typecheck, eslint, 65 tests, production build). Local production runtime: `/` → 307 `/bg`; unknown slugs 404; admin 307 `/admin/login`; `X-Robots-Tag: noindex, nofollow`; robots `Disallow: /`. Browser: BG 1440×1000 hash nav + spy; BG 1280×800 desktop nav; BG/EN 768×1024 and 390×844 — no horizontal overflow; mobile menu News hash lands below the header; reduced motion has no video; Work with us has no form/mailto.

## Previous checkpoint

**Homepage / News / visual refinement — Goal 2 (2026-09-07):** public editorial surface is a finished Drafting Editorial institution page, not a prototype dump. Goal 1 CMS/auth/indexing/platform was not reopened. `CIT_ALLOW_INDEXING` was not enabled. No inquiry inbox was invented.

Homepage document order: Hero → Why CIT / Core System Model → pillars → Institutional anchor → ASAESIS → Featured project → News strip → Team → Work with us → Footer. Insights preview and GovernanceList are off the homepage; `/insights`, nav Insights, About/Team governance remain.

News: CSS scroll-snap editorial strip (no library, no autoplay). Prev/next only when more than one item overflows. One confirmed UASG article uses a drafting-grid fallback — no campus filler photos, no YouTube thumbnails as card images. `/news` uses the same card hierarchy as a vertical row list. Insights stay a ruled concept-note list.

ASAESIS: desktop ten-stage loop retained; homepage mobile is a compact index (one open body). `/methodology` keeps the full rail. Official method remains ten stages.

Institutional homepage: concise UASG statement + contained grayscale hall figure. Planned agreement/council rows stay on About. Featured Wine × Tourism precedes News; status remains Pilot concept.

CIT curve experiment: prototyped between Methodology → Featured and News → Team; **rejected** in the browser (marine bite under the sticky header, not rigid architecture + adaptive flow). Hairline joins remain.

Navigation: denser header (`4.75–5.25rem`, 48px mark). IA routes unchanged. Type families and colour tokens unchanged.

Docs aligned: `DESIGN_DECISIONS.md` §7, `PLAN.md` milestone B, `AGENTS.md` homepage line, `docs/02_INFORMATION_ARCHITECTURE.md`, `docs/00_README.md`, `docs/07_BUILD_WORKFLOW.md`, `docs/TEMP_IMAGE_SOURCES.md`. Stanford HAI V1 “no carousel” is preserved as history; Goal 2 authorizes a CIT-native editorial strip.

Quality: `npm run check` pass (typecheck, eslint, 57 tests, production build). Browser (Playwright vs `localhost:3005`): BG 1440×1000, 1280×800, 768×1024, 390×844 — no horizontal overflow; EN 1280×800 and 390×844 likewise. Homepage section ids: about → pillars → network → methodology → featured-project → news → people → work-with-us. No `#insights`. Insights header/mobile links go to `/bg/insights`. Compact ASAESIS visible at 768/390, hidden at 1440; desktop ten-stage buttons keyboard-activate stage 05. News: one card, no prev/next, drafting fallback. Reduced motion: no hero video. Work with us: no mailto/form. About 768 wrap holds. CIT curve absent.

## Previous checkpoint

**Production hardening Goal 1 (2026-09-07):** technically production-ready for performance, signing secrets, CMS/News integrity, env/indexing, hygiene and `npm run check`. Not the homepage visual Goal 2. `CIT_ALLOW_INDEXING` was not enabled. No contact inbox was invented.

Hero: 15s grayscale loop of the same infrastructure footage — `hero.mp4` 1920×1080 ~2.3 MiB, `hero-mobile.mp4` 960×540 ~0.5 MiB, `preload="none"`, poster first paint. Replaces the previous 3 min / ~51 MiB `preload="auto"` encode; concept (muted loop, pause, reduced-motion poster) unchanged.

Auth: production requires `CIT_ADMIN_SESSION_SECRET`; known strings `cit-dev-session-not-for-production` / `cit-preview-dev` never sign preview or production. Preview may use a configured password. Local dev fallback remains.

News/CMS: date/author/heroMediaId survive seed → record → Supabase → admin → public. Saving a partial admin form no longer nulls omitted metadata. News publish requires date + BG/EN source; concept notes do not. Homepage card media is optional. CMS seed fallback is preserved and logged (`[cit-cms]`) plus an `/admin` banner.

SEO: canonical, BG/EN/x-default, OG/Twitter, admin/preview noindex, robots Disallow:/ unless indexable. Privacy removed from the sitemap (page is noindex). Preview canonical no longer prefers the production host.

News detail 500 (`static → dynamic` via cookies) fixed with `force-dynamic` on news/insights/projects slug routes.

Ruflo: untracked `.ruflo/runtime/node_modules` (~49,929 files). Tooling kept.

Quality: `npm run check` pass (typecheck, eslint, 54 tests, production build). Browser: BG 1440×1000 pause/play; 390×844 loads `hero-mobile.mp4` without overflow; EN 1280×800 reduced-motion has poster and no video; 768×1024 news article shows date/source; `/admin` noindex and login gate.

## Earlier checkpoints

**Homepage overlay (2026-09-06):** local muted loop from `Video/202609062306.mp4`, served as grayscale `public/videos/hero.mp4`, pause control, poster under reduced motion. Not the previous UASG YouTube mock. Footage is transport infrastructure and is not captioned as CIT activity. Stanford HAI video is not used. Insight YouTube embeds remain without autoplay.

**IA order (2026-09-06, superseded by Goal 3):** header, footer and mobile menu then shared About → Methodology → News → Insights → Projects → Team. Goal 3 (2026-09-07) reordered homepage-mapped items to About → Methodology → Projects → News → Insights → Team. Work with us stays last as the collaboration CTA. Homepage *document* order was changed in Goal 2 (Insights off the home scroll; featured project before News).

Public labels: People → Team (Екип / Team). News channel (`/news`) now has one confirmed UASG article (`kogato-praktikata-vleze-v-universiteta`, source uacg.bg 02.12.2025) with YouTube `kfV3dGGHO5s` as a mid-body embed. Distinct from Insights concept notes. STRABAG, Stara Zagora, EQE-Control and NSORB are named in the UASG source only — not CIT partners. The source line `съм Строителен факултет` is republished as `към`.

Team portraits: grayscale cutouts over a circular `marine-tint` plate (`marine` on hover); the person breaks the circle. Order: Boris Tsankov, Georgi Vassilev, Ivan Todorov. Titles in `name` only; no invented CIT roles. One quiet “+” slot for profiles still to be announced. Ivan has a confirmed LinkedIn URL.

**V2 complete for the available repository, browser, network and credentials.** Public editorial V2, Methodology Explorer, project executive layer, structured admin, truth controls, environment-aware noindex, tests and `npm run check` all pass. Live hosted Supabase Auth remains an external setup step.

Insight body may include a whole-line YouTube URL (watch / youtu.be / Shorts); it renders as a hairline 16:9 `youtube-nocookie` embed with no autoplay. Not a page builder and not raw HTML.

## V1 strengths preserved (verified 2026-09-05)

- Intellectual positioning and ASAESIS structure.
- IA: About · Methodology · Projects · News · Insights · Team · Work with us · BG/EN (Goal 3, 2026-09-07; supersedes 2026-09-06 News-before-Projects). Team keeps the `/people` URL. News reuses insight records with `type: news` (text + YouTube); no invented articles.
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
- Named people may appear without invented CIT roles. No confirmed inquiry inbox, partner universities, funding awards, or measured results.

## Conflicts logged

- Public name vs source “Център за смарт технологии” — confirmed public name stands.
- Methodology 10 vs mandate 12 vs teaser 5 — public method remains the 10 stages.
- V1 Stanford HAI note said a news carousel was not taken. Goal 2 (2026-09-07) authorizes a CIT-native editorial strip; history is preserved in `DESIGN_DECISIONS.md` §1 and §7.
- V1/V2 homepage placed Insights and governance on the home scroll. Goal 2 removes those previews without removing the routes.
- 2026-09-06 nav order (About → Methodology → News → Insights → Projects → Team) is superseded by Goal 3 so homepage-mapped items match document order. Insights stays in the strip but is skipped by scroll-spy.

## External blockers (not workarounds for incomplete V2)

- **Supabase** is connected for production CMS (`cit-website` / Frankfurt). Enable leaked-password protection in Auth settings when convenient. Preview and production currently share this database — separate projects are documented in `docs/ENVIRONMENTS.md` and cannot be created from this repository. Apply `supabase/migrations/20260907120000_insight_hero_media.sql` to the hosted project before editors rely on insight card/hero media.
- **Temporary UASG photographs** must be replaced before a final public launch (`docs/TEMP_IMAGE_SOURCES.md`). Homepage hall photo is a contained figure, not a full-bleed marine plate.
- **`CIT_ALLOW_INDEXING` must stay unset/false** on the current Vercel preview alias. No production DNS was changed.
- **No confirmed inquiry inbox** — Work with us has no submission form by design.
- **News media library:** the one confirmed article has no `heroMediaId`. Card/hero photos appear only when editors attach legitimate media.

## Quality gates

- Goal 3 (2026-09-07): `npm run check` pass — typecheck, eslint, 65 tests, production build.
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
