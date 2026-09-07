# CIT WEBSITE — INFORMATION ARCHITECTURE

## Primary navigation
- About
- Methodology
- News
- Insights
- Projects
- Team (route remains `/people`)
- Work with us
- BG / EN

Confirmed 2026-09-06: this order is shared by the header, footer, mobile menu and homepage section sequence in both locales. Work with us remains the collaboration CTA at the end of the strip.

## Principle
Keep V1 navigation compact, research-oriented and understandable to non-academic visitors. Do not create top-level items merely because content may exist later. **News** is a publishing channel for confirmed articles (text and video), including UASG materials republished with source.

## Homepage sequence
1. Header — brand, navigation, language switch, collaboration CTA.
2. Hero — one clear proposition, short support copy, maximum two actions.
3. About cluster — system idea, three integrated pillars (Education / Academic Research / Applied Science), then institutional & research network (confirmed relationships only). Network stays in this cluster so scroll-spy does not jump back to About later on the page.
4. Methodology preview — Define → Map → Analyse → Redesign → Implement → Measure → Adapt. This is a website simplification and must not be presented as formally fixed ASAESIS stage naming unless confirmed.
5. News preview — confirmed articles with text and video; honest empty state when none are published.
6. Insights preview — concept notes only; no empty categories.
7. Featured applied project — strongest confirmed pilot/project, with clear status.
8. Team preview — confirmed roles only; development placeholders must not ship as real people.
9. Work with us — routes for public institutions, universities/researchers, business/industry and funding/innovation partners.
10. Footer — institutional anchor, real contact and legal/privacy links.

## V1 sitemap
/
/about
/methodology
/projects
/projects/[slug]
/insights
/insights/[slug]
/news
/news/[slug]
/people
/people/[slug]
/work-with-us

Bulgarian and English must use one consistent internationalization strategy rather than two manually diverging page trees.

## Page templates

## About
- Mission and institutional context.
- Why the Center exists.
- Three pillars and their integrated operating model.
- Governance/structure only to the extent confirmed.
- Partners/network only when confirmed.

## Methodology
- Designed-systems premise.
- System components: goals, actors, roles, rules, decision points, information flows, incentives, feedback and outcomes.
- Mapping and process logic.
- Failure and bottleneck analysis.
- Target architecture and redesign.
- Implementation, measurement and adaptation.
- Role of AI, data and digital systems.
- Related projects and outputs.

## Project detail
- Title.
- Status / type / domain.
- System problem and context.
- Methodology.
- Data and evidence.
- System architecture or map.
- Failure hypotheses/findings.
- Intervention or prototype.
- Results versus expected outcomes — clearly distinguished.
- Team, partners and outputs.
- Related insights.

## Insights
Concept notes on the working framework. Public type: `concept-note`. They are not research publications.

## News
Confirmed articles and recordings, including UASG materials republished with source (whole-line YouTube URL in the same body model as Insights). Public type: `news`. Distinct from Insights. Named companies and municipalities in a UASG news item are not CIT partners.

## Team
Emphasize expertise and contribution rather than hierarchy. The public label is Team (Екип); the route remains `/people`. Person pages may include confirmed role, affiliation, expertise, short bio, projects, publications/insights and verified profile/contact links.

## Work with us
This is a collaboration-routing page, not a generic contact page. Potential modes include applied research, research collaboration, pilot/demonstrator, technology transfer, professional education and funded consortium work — but publish only modes the Center can genuinely support.

## Progressive disclosure
Homepage = clarity and orientation.
Landing pages = explanation and discovery.
Detail pages = evidence, methodology and depth.
Do not put the complete theoretical framework on the homepage.
