import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages";
import { t } from "@/content/messages";
import { featuredProject } from "@/content/projects";
import { insights } from "@/content/insights";
import { publicTeamList, teamUpcomingCount } from "@/content/people";
import { loadAllRecords } from "@/lib/cms/repository";
import { isPublished, personIsPublic } from "@/lib/cms/truth";
import { recordToInsight, recordToPerson, recordToProject } from "@/lib/cms/serialize";
import { pillars, stages, methodologyName } from "@/content/methodology";
import { Hero } from "@/components/editorial/Hero";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { SystemLoop } from "@/components/systems/SystemLoop";
import { MethodologyLoop } from "@/components/systems/MethodologyLoop";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { InsightList } from "@/components/editorial/InsightList";
import { InstitutionalNetwork } from "@/components/partners/InstitutionalNetwork";
import { NetworkAnchorPlate } from "@/components/partners/NetworkAnchorPlate";
import { HeroMedia } from "@/components/editorial/HeroMedia";
import { GovernanceList } from "@/components/people/GovernanceList";
import { TeamGrid } from "@/components/people/TeamGrid";
import { CollaborationRoutesPreview } from "@/components/partners/CollaborationRoutes";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { heroVideo } from "@/content/media";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return {
    ...pageMetadata({ locale, key: "home", title: home.meta.title[locale], description: home.meta.description[locale] }),
    title: { absolute: home.meta.title[locale] },
  };
}

export default async function HomePage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const m = t(locale);
  const c = home;
  const { projects: projectRecords, insights: insightRecords, settings, people: personRecords } = await loadAllRecords();
  const publishedProjects = projectRecords.filter((p) => isPublished(p.publicationState)).map(recordToProject);
  const publishedInsights = insightRecords.filter((i) => isPublished(i.publicationState)).map(recordToInsight);
  const publishedConceptNotes = publishedInsights.filter((i) => i.type !== "news");
  const publishedNews = publishedInsights.filter((i) => i.type === "news");
  const featured = publishedProjects.find((p) => p.slug === settings.data.featuredProjectSlug) ?? publishedProjects.find((p) => p.featured) ?? featuredProject;
  const insightList = settings.data.featuredInsightSlugs?.length
    ? settings.data.featuredInsightSlugs
        .map((slug) => publishedConceptNotes.find((i) => i.slug === slug) ?? insights.find((i) => i.slug === slug))
        .filter((i): i is NonNullable<typeof i> => Boolean(i && i.type !== "news"))
    : publishedConceptNotes.length
      ? publishedConceptNotes
      : insights;
  const team = publicTeamList(personRecords.filter(personIsPublic).map(recordToPerson));

  return (
    <>
      <Hero
        layout="overlay"
        headline={c.hero.headline[locale]}
        lead={c.hero.lead[locale]}
        primary={{ href: href(locale, "methodology"), label: c.hero.primary[locale] }}
        secondary={{ href: href(locale, "work-with-us"), label: c.hero.secondary[locale] }}
        visual={
          <HeroMedia
            src={heroVideo.src}
            posterSrc={heroVideo.poster.src}
            posterAlt={heroVideo.poster.alt[locale]}
            pauseLabel={m.heroVideoPause}
            playLabel={m.heroVideoPlay}
          />
        }
      />

      <Section id="about" labelledBy="system-model-heading">
        <SectionHeading label={c.systemIdea.label[locale]} heading={c.systemIdea.heading[locale]} id="system-model-heading" lead={c.systemIdea.body[locale][0]} align="split" />
        <div className="mt-12">
          <SystemLoop locale={locale} title={c.hero.diagramTitle[locale]} desc={c.hero.diagramCaption[locale]} />
        </div>
        <div className="mt-8">
          <ArrowLink href={href(locale, "methodology")}>{m.toMethodology}</ArrowLink>
        </div>
      </Section>

      <Section id="pillars" tone="tint" labelledBy="pillars-heading">
        <SectionHeading label={c.pillars.label[locale]} heading={c.pillars.heading[locale]} id="pillars-heading" lead={c.pillars.body[locale]} align="split" />
        <ol className="mt-12 grid gap-8 border-t border-line md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.slug} className="border-b border-line py-8 md:border-b-0">
              <p className="label">{p.code}</p>
              <h3 className="mt-3 text-h3 text-ink">{p.title[locale]}</h3>
              <p className="mt-3 text-small text-ink-2">{p.short[locale]}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <ArrowLink href={href(locale, "about")}>{m.toAbout}</ArrowLink>
        </div>
      </Section>

      <section id="network" aria-labelledby="network-heading">
        <NetworkAnchorPlate
          locale={locale}
          label={c.network.label[locale]}
          heading={c.network.heading[locale]}
          headingId="network-heading"
          lead={c.network.body[locale][0]}
        />
        <div className="bg-paper">
          <Container className="py-8 md:py-10">
            <InstitutionalNetwork locale={locale} variant="status" />
          </Container>
        </div>
      </section>

      <Section id="methodology" tone="dark" labelledBy="methodology-heading">
        <SectionHeading
          tone="on-dark"
          label={`${c.methodology.label[locale]} · ${methodologyName.acronym}`}
          heading={c.methodology.heading[locale]}
          id="methodology-heading"
          lead={c.methodology.body[locale]}
          align="split"
        />
        <div className="mt-14">
          <MethodologyLoop
            stages={stages.map((s) => ({ code: s.code, short: s.short[locale], title: s.title[locale], body: s.body[locale] }))}
            tone="on-dark"
            labels={{ stage: m.stage, loopNote: m.loopCloses }}
          />
        </div>
        <div className="mt-12">
          <ButtonLink href={href(locale, "methodology")} variant="on-dark">
            {m.toMethodology}
          </ButtonLink>
        </div>
      </Section>

      <Section id="news" labelledBy="news-heading">
        <SectionHeading label={c.news.label[locale]} heading={c.news.heading[locale]} id="news-heading" lead={c.news.body[locale]} align="split" />
        {publishedNews.length ? <InsightList insights={publishedNews} locale={locale} className="mt-12" channel="news" /> : null}
        <div className="mt-8">
          <ArrowLink href={href(locale, "news")}>{m.allNews}</ArrowLink>
        </div>
      </Section>

      <Section id="insights" tone="tint" labelledBy="insights-heading">
        <SectionHeading label={c.insights.label[locale]} heading={c.insights.heading[locale]} id="insights-heading" lead={c.insights.body[locale]} align="split" />
        <InsightList insights={insightList} locale={locale} className="mt-12" />
        <div className="mt-8">
          <ArrowLink href={href(locale, "insights")}>{m.allInsights}</ArrowLink>
        </div>
      </Section>

      <Section id="featured-project" labelledBy="featured-heading">
        <ProjectFeature project={featured} locale={locale} label={c.featured.label[locale]} chainTitle={c.featured.chainTitle[locale]} />
      </Section>

      <Section id="people" tone="tint" labelledBy="people-heading">
        <SectionHeading label={c.people.label[locale]} heading={c.people.heading[locale]} id="people-heading" />
        {team.length || teamUpcomingCount ? (
          <TeamGrid people={team} locale={locale} upcomingCount={teamUpcomingCount} className="mt-12" />
        ) : null}
        <div className="mt-12">
          <p className="label mb-3">{c.people.structureTitle[locale]}</p>
          <GovernanceList locale={locale} compact />
        </div>
        <div className="mt-8">
          <ArrowLink href={href(locale, "people")}>{m.toPeople}</ArrowLink>
        </div>
      </Section>

      <Section id="work-with-us" labelledBy="work-heading">
        <SectionHeading label={c.work.label[locale]} heading={c.work.heading[locale]} id="work-heading" lead={c.work.body[locale]} align="split" />
        <div className="mt-12">
          <CollaborationRoutesPreview locale={locale} />
        </div>
        <div className="mt-10">
          <ButtonLink href={href(locale, "work-with-us")}>{m.toWorkWithUs}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
