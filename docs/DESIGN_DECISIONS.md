# DESIGN_DECISIONS — CIT Website V1

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
| ink-3 | #6A737D | muted text (≥4.5:1 on paper) |
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
- V1 has no confirmed photography. The visual layer is diagrams. No stock photography, no generated "AI" imagery.
- **Logo**: a mark was supplied during the run (`Logo/Logo.jpg`, 1600×1600 JPEG, navy #102849 + greys). It is adopted as the CIT mark: `public/brand/cit-mark.png` (background removed, original colours) for light surfaces, `public/brand/cit-mark-white.png` (white knockout) for the marine footer, and `src/app/icon.png` / `apple-icon.png` on white for favicons. The institutional `marine` token was re-sampled from the mark so the palette is coherent with it. The earlier drafted three-node SVG mark was retired.

## 3. Opening composition — alternatives evaluated

Two coded alternatives for the first viewport were rendered at 1440×1000 (BG, the longer language) and compared against the Build Pack hero rules (one proposition, ≤2 actions, no kicker, systems hint without dashboard). Screenshots: `home-bg-1440-v2` (A) and `home-bg-1440-stacked` (B) in the QA log.

- **A. Statement + drawing (7/5 split)** — serif headline, lead and actions on the left, the "anatomy of a designed system" loop on the right. Result: the Bulgarian headline wrapped to 6–7 lines even at 56px (Cyrillic words are long and `text-wrap: balance` shortened lines further); the diagram column was ~500px and its node labels rendered at ~10px.
- **B. Full-width statement, then lead/actions beside the drawing (6/6)** — the headline spans the container (4 lines in BG, 3 in EN at 54px), the lead and both actions sit left of a ~570px diagram whose labels render at ~12px. Everything — statement, lead, actions, diagram — is inside the first viewport at 1440×1000; at 1280×800 the diagram's upper half remains visible as the systems hint.

Selected: **B ("stacked")**, implemented as `Hero layout="stacked"`. It resolves Bulgarian wrapping without shrinking the type, gives the signature diagram legible scale, and keeps the composition calm. The split layout remains available in the component for future pages.

Type decision made during the comparison: `text-wrap: pretty` (not `balance`) on the hero headline, and Bulgarian `locl` glyph forms disabled site-wide because Source Serif 4 ships them while IBM Plex Sans does not — mixed conventions between headings and body read as an error.

## 4. Content-presentation decisions with design impact
- Status is always visible on projects as a mono label with a neutral vocabulary: *Pilot concept*, *Proposed research mandate*, *In development*, *Active pilot*, *Completed* (Build Pack provisional vocabulary, extended by one value required by the mandate letter). Only the first two are used in V1.
- People page shows the planned governance functions as a structured list, not portraits, until people are confirmed.
- Institutional network shows UASG as text lockup, not a logo wall.
- Work with us uses four collaboration routes as a ruled list, not pricing cards.
