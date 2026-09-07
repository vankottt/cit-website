# DESIGN_DECISIONS — CIT Website

V1 direction remains the production spec. V2 refines pacing, photography and diagram hierarchy; it does not replace Drafting Editorial.


This file records the selected original CIT design direction and every material benchmark influence. Once selected, the direction is the internal production design spec (see `docs/03_DESIGN_SYSTEM.md`, "Design approval rule").

## 1. Reference inspection (2026-09-05, live pages)

### Stanford HAI — https://hai.stanford.edu/ (visual north star)
Observed (principles only, no values copied): a five-item primary nav plus a small utility group and a compact lockup that names the university; a single-statement hero over one large media surface with two restrained actions; large section headings with tight tracking and a 27px lead paragraph next to them; 18px body; section padding in the 48–96px range; full-width tinted bands alternating with white; numbered section markers in a mono face; large photographic tiles; a deep plum block for one section only.
Taken for CIT: nav restraint and institutional anchor in the lockup; one-statement hero with ≤2 actions; the heading + lead pairing; 96px vertical rhythm; alternating white / tinted bands; a single dark band reserved for methodology.
Explicitly not taken: Circular typeface, plum/lavender/blue palette, rounded photo panels, video hero, carousel news strip, the "01 Research" numbered section labels, any layout composition.

### Dark Matter Labs — https://darkmatterlabs.org/
Taken: the idea that system components can carry short codes (e.g. "A-1") and that a methodology can be shown as a matrix of intersecting elements. Translated into CIT's mono "stage code" labels on nodes (`01`–`10`) and the component → failure-mode table.
Not taken: dark experimental identity, ambient animation, philosophical density.

### MIT IDSS — https://idss.mit.edu/
Taken: compressing the institute into one sentence built on an *intersection* of disciplines. CIT's hero support copy and About opening follow this "at the intersection of…" logic using the Action Plan's own list (systems architecture, systems engineering, statistics, economics, AI, behavioural analysis, public-policy research).
Not taken: layout, colour, dated news-grid pattern.

### Not opened (no concrete question arose during the build)
CSH, Turing, IfM, OII, Connected Places Catapult, VTT, Digital Catapult. Their functional patterns were applied from the Build Pack descriptions: Turing-style project metadata (status / type / domain) and section order; IfM Research × Education × Knowledge-Transfer feedback framing for the pillars; Catapult/VTT audience-segmented "Work with us" routes.

## 2. Selected direction — "Drafting Editorial"

One sentence: an institutional editorial page (calm, serif, white space) onto which the Center's systems are drawn the way an engineer draws — hairline rules, coded nodes, arrows, feedback loops, one amber marker for what is being adapted.

Why this direction: it satisfies the Build Pack (HAI-level editorial clarity, engineered differentiation), is distinct from the AI-startup and SaaS idioms, differentiates from HAI (which is sans-only and photo-led), and reads as "research institution" in both Bulgarian and English because the serif carries Cyrillic well.

### Typography
- Display / headings: **Source Serif 4** (400, 500, 600; Latin + Cyrillic). Tracking −0.01em to −0.02em above 32px.
- Body / UI: **IBM Plex Sans** (400, 500, 600; Latin + Cyrillic).
- Technical labels (metadata, stage codes, diagram labels): **IBM Plex Mono** (400, 500; Latin + Cyrillic), 12–13px, uppercase with +0.06em tracking for labels only. Never used for body copy.
- Scale (desktop → mobile): hero 60→38px; h1 52→36px; h2 40→30px; h3 26→22px; lead 22→19px; body 17px; small 15px; meta 12–13px. Line heights: display 1.05–1.1; body 1.6.

### Colour tokens
| token | value | use |
|---|---|---|
| paper | #FFFFFF | page |
| paper-2 | #F4F4F0 | tinted bands |
| paper-3 | #EAEBE5 | deeper tint, table stripes |
| ink | #12161C | headings, body |
| ink-2 | #3D4650 | secondary text |
| ink-3 | #5F6873 | muted text (≥4.5:1 on paper, paper-2 and paper-3 — darkened after axe flagged 4.37:1 on paper-2) |
| line | #DEDFD8 | hairlines |
| line-strong | #B9BBB2 | emphasised rules |
| marine | #102849 | institutional deep tone sampled from the supplied logo: dark band, primary button, footer |
| marine-2 | #1A3A66 | hover of marine |
| marine-tint | #E6EBF3 | light callouts |
| amber | #D98E2B | the CIT accent: diagram marker, active state, focus ring |
| amber-ink | #8A5514 | amber as text on paper (AA) |
| on-dark | #F4F4F0 / #B7C3D0 | text on marine |

Rule: amber is a marker, never a surface. Marine is used for one dark band per page at most, plus footer.

### Layout
- Container 1280px max, gutters 20px (mobile) / 32px (tablet) / 48px (desktop). 12-column mental grid; editorial splits 5/7 and 4/8.
- Section rhythm 96px desktop / 64px mobile. Every section opens with a 1px hairline rule and a small mono label + serif heading pair ("ruled page" signature).
- Media and diagrams are square-cornered with a hairline frame; radius is 2px on controls only.

### Controls
- Primary button: marine surface, paper text, 2px radius, 48px height. Secondary: hairline ink border. Text links: underline offset 3px, amber underline on hover. Arrow links use an inline SVG arrow, never Unicode arrows.
- Focus: 2px amber outline, 2px offset, everywhere.

### Systems diagram grammar (signature asset family)
- Nodes: hairline rectangle (ink 1px, 2px radius) or 6px circle; mono code (`01`) + sans label.
- Relations: 1px lines with 6px triangular arrowheads; feedback relations dashed.
- Emphasis: amber dot or amber stroke; on the marine band, lines are paper at 24% and the marker stays amber.
- Diagram areas may carry a 24px dotted drafting grid at low opacity; never elsewhere.
- Every diagram has a visually hidden or adjacent textual explanation and reflows to a vertical list ≤ 768px.

### Motion
- Only: hover/focus transitions (150–200ms), methodology stage highlight on hover/focus, a single dash-offset draw of the loop path on first view. All disabled under `prefers-reduced-motion`. No scroll-jacking, parallax, autoplay video or ambient animation.

### Imagery and mark
- Signature visual layer remains diagrams. Temporary UASG campus photography (cropped from official homepage sliders) is used only as institutional atmosphere: large facade after the homepage diagram hero; hall on the network band; facade on About / mission; hall on About / context and Work with us. Captions state the source and that the images do not depict CIT activity. Tracked in `docs/TEMP_IMAGE_SOURCES.md`; replace before final public launch. No stock photography, no generated "AI" imagery, no campus photos attached to project or insight records.
- **Team portraits** (2026-09-06, revised): grayscale cutouts over a large circular `marine-tint` plate that turns `marine` on hover. The torso sits inside the circle; only a little of the crown breaks the rim. Never colourised. Hover on the portrait is graphic only (`translateY(-4px) scale(1.018)`, 220ms, gated to `hover: hover` + `pointer: fine`); the portrait is not a link. LinkedIn remains a name+icon control when a URL is confirmed. One quiet “+” slot replaces three equal “Coming Soon” circles. Roles omitted until confirmed.
- **Logo**: the CIT mark is `Logo/Logo.jpg` (navy structure + grey bars, 1600×1600). It is used as `public/brand/cit-mark.png` (white background removed, greys preserved) on paper, `public/brand/cit-mark-white.png` (navy knocked out to `on-dark`, greys lifted) on the marine footer, and `src/app/icon.png` / `apple-icon.png` on white for favicons. The `marine` token stays `#102849`, sampled from this mark. The drafted three-node SVG mark stays retired.

## 3. Opening composition — alternatives evaluated

Two coded alternatives for the first viewport were rendered at 1440×1000 (BG, the longer language) and compared against the Build Pack hero rules (one proposition, ≤2 actions, no kicker, systems hint without dashboard). Screenshots: `home-bg-1440-v2` (A) and `home-bg-1440-stacked` (B) in the QA log.

- **A. Statement + drawing (7/5 split)** — serif headline, lead and actions on the left, the "anatomy of a designed system" loop on the right. Result: the Bulgarian headline wrapped to 6–7 lines even at 56px (Cyrillic words are long and `text-wrap: balance` shortened lines further); the diagram column was ~500px and its node labels rendered at ~10px.
- **B. Full-width statement, then lead/actions beside the drawing (6/6)** — the headline spans the container (4 lines in BG, 3 in EN at 54px), the lead and both actions sit left of a ~570px diagram whose labels render at ~12px. Everything — statement, lead, actions, diagram — is inside the first viewport at 1440×1000; at 1280×800 the diagram's upper half remains visible as the systems hint.

Selected: **B ("stacked")**, implemented as `Hero layout="stacked"`. It resolves Bulgarian wrapping without shrinking the type, gives the signature diagram legible scale, and keeps the composition calm. The split layout remains available in the component for future pages.

Type decision made during the comparison: `text-wrap: pretty` (not `balance`) on the hero headline, and Bulgarian `locl` glyph forms disabled site-wide because Source Serif 4 ships them while IBM Plex Sans does not — mixed conventions between headings and body read as an error.

## 4. Content-presentation decisions with design impact
- Status is always visible on projects as a mono label with a neutral vocabulary: *Pilot concept*, *Proposed research mandate*, *In development*, *Active pilot*, *Completed* (Build Pack provisional vocabulary, extended by one value required by the mandate letter). Only the first two are used in V1.
- People page shows supplied grayscale cutouts over a circular plate, plus the planned governance functions. Names without confirmed titles; no invented roles.
- Institutional network shows UASG as text lockup, not a logo wall.
- Work with us uses four collaboration routes as a ruled list, not pricing cards.

## 5. V2 refinements (2026-09-05)

V1 already had the right identity. Browser evidence on the deployed site showed documentary overload: three homepage diagrams plus an anatomy table, a diagram-led hero, and a categorical “run like algorithms” heading.

### Visual grammar (unchanged tokens, changed rhythm)

Stanford HAI still informs only whitespace, hierarchy and the alternation of statement / large media / short explanation. CIT remains serif + drafting diagrams + marine/amber. No Stanford red, no numbered “01 Research” kickers, no photo carousels.

Homepage signature visuals are limited to two:

1. **Core System Model** (`SystemLoop`) — goals → architecture and roles → rules and decision points → information → actions/outputs → outcomes/performance → feedback → goals, with incentives/constraints as a concurrent input and environment as the dashed boundary. Moved out of the hero so the opening can be photographic.
2. **ASAESIS** (`MethodologyLoop` on the homepage; `MethodologyExplorer` on `/methodology`).

`SystemAnatomy` and `PillarsCycle` stay on internal pages. The featured-project value chain remains a secondary, smaller diagram.

Hero composition **C (“editorial photo”)** replaces stacked diagram-hero B: full-width statement, then lead + ≤2 actions beside a large UASG campus photograph. The Core System Model follows as the first signature visual. Bulgarian wrapping rules from V1 (`text-wrap: pretty`, no `locl` mixing) still apply.

### Copy

“Social systems run like algorithms” is replaced by source-faithful wording: human-designed social-institutional systems *have algorithmic structures* and *operate through repeatable formal and informal decision processes*. The insight slug `why-social-systems-behave-like-algorithms` is kept (stable URL); its body already uses “algorithmic structure”.

Homepage visible copy is tightened by moving anatomy, pillar purposes, the six-item integrated model and the long featured summary to About / Methodology / project pages.

### Photography

Still only temporary UASG assets, captions refusing CIT attribution, inventory in `docs/TEMP_IMAGE_SOURCES.md`. V2 uses the existing facade as the opening visual and the hall for institutional context. Additional uacg.bg news images inspected in V2 were too small, event-group, or portrait and were not added.

### Admin

Operational, not editorial: system UI, no marine hero bands, no diagrams. Public design remains code-controlled; admin edits structured fields only.

## 6. Homepage overlay — local video (2026-09-06)

The opening uses a muted looping `<video>` from the project `Video/` folder (`202609062306.mp4`), served as `public/videos/hero.mp4` (grayscale H.264 encode). Poster / reduced-motion fallback is a frame from that encode (`public/images/hero/poster.jpg`). Pause control remains. The original file in `Video/` stays in colour. Insight YouTube embeds stay without autoplay.

The clip shows transport infrastructure (aerial). It is not captioned as CIT laboratory, team or project activity. The previous UASG YouTube mock is retired.


