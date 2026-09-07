import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages";
import { t } from "@/content/messages";
import { featuredProject } from "@/content/projects";
import { publicTeamList, teamUpcomingCount, joinSlotCount } from "@/content/people";
import { loadAllRecords } from "@/lib/cms/repository";
import { isPublished, personIsPublic } from "@/lib/cms/truth";
import { recordToInsight, recordToPerson, recordToProject } from "@/lib/cms/serialize";
import { newsMediaMap } from "@/lib/news-presentation";
import { latestNewsForHomepage } from "@/lib/news-order";
import { pillars, stages, methodologyName } from "@/content/methodology";
import { Hero } from "@/components/editorial/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { SystemLoop } from "@/components/systems/SystemLoop";
import { MethodologyLoop } from "@/components/systems/MethodologyLoop";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { InstitutionalAnchor } from "@/components/partners/InstitutionalAnchor";
import { HeroMedia } from "@/components/editorial/HeroMedia";
import { TeamGrid } from "@/components/people/TeamGrid";
import { CollaborationRoutesPreview } from "@/components/partners/CollaborationRoutes";
import { NewsCarousel } from "@/components/editorial/NewsCarousel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { heroVideo } from "@/content/media";

type Params = { params: Promise<{ locale: string }> };

export const dynamic = "force-dynamic";

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
  const { projects: projectRecords, insights: insightRecords, settings, people: personRecords, media } = await loadAllRecords();
  const publishedProjects = projectRecords.filter((p) => isPublished(p.publicationState)).map(recordToProject);
  const publishedNews = latestNewsForHomepage(
    insightRecords
      .filter((i) => isPublished(i.publicationState))
      .map(recordToInsight)
      .filter((i) => i.type === "news"),
  );
  const featured = publishedProjects.find((p) => p.slug === settings.data.featuredProjectSlug) ?? publishedProjects.find((p) => p.featured) ?? featuredProject;
  const team = publicTeamList(personRecords.filter(personIsPublic).map(recordToPerson));
  const newsMedia = newsMediaMap(publishedNews, media, locale);

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
            mobileSrc={heroVideo.mobileSrc}
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

      <Section id="pillars" tone="tint" labelledBy="pillars-heading" size="sm">
        <SectionHeading label={c.pillars.label[locale]} heading={c.pillars.heading[locale]} id="pillars-heading" lead={c.pillars.body[locale]} align="split" />
        <ol className="mt-10 grid border-t border-line md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.slug} className="border-b border-line py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <p className="label">{p.code}</p>
              <h3 className="mt-2 text-h3 text-ink">{p.title[locale]}</h3>
              <p className="mt-2 text-small text-ink-2">{p.short[locale]}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="network" labelledBy="network-heading">
        <InstitutionalAnchor
          locale={locale}
          label={c.network.label[locale]}
          heading={c.network.heading[locale]}
          headingId="network-heading"
          lead={c.network.body[locale][0]}
        />
      </Section>

      <Section id="methodology" tone="dark" labelledBy="methodology-heading">
        <SectionHeading
          tone="on-dark"
          label={`${c.methodology.label[locale]} · ${methodologyName.acronym}`}
          heading={c.methodology.heading[locale]}
          id="methodology-heading"
          lead={c.methodology.body[locale]}
          align="split"
        />
        <div className="mt-12">
          <MethodologyLoop
            stages={stages.map((s) => ({ code: s.code, short: s.short[locale], title: s.title[locale], body: s.body[locale] }))}
            tone="on-dark"
            mobile="compact"
            labels={{ stage: m.stage, loopNote: m.loopCloses, structure: m.stageStructure, loop: m.stageLoop }}
          />
        </div>
        <div className="mt-10">
          <ButtonLink href={href(locale, "methodology")} variant="on-dark">
            {m.toMethodology}
          </ButtonLink>
        </div>
      </Section>

      <Section id="featured-project" labelledBy="featured-heading">
        <ProjectFeature project={featured} locale={locale} label={c.featured.label[locale]} chainTitle={c.featured.chainTitle[locale]} />
      </Section>

      <Section id="news" tone="tint" labelledBy="news-heading">
        <SectionHeading label={c.news.label[locale]} id="news-heading" />
        {publishedNews.length ? <NewsCarousel insights={publishedNews} locale={locale} media={newsMedia} className="mt-10" /> : null}
        <div className="mt-8">
          <ArrowLink href={href(locale, "news")}>{m.allNews}</ArrowLink>
        </div>
      </Section>

      <Section id="people" labelledBy="people-heading">
        <SectionHeading label={c.people.label[locale]} id="people-heading" />
        {team.length || teamUpcomingCount ? (
          <TeamGrid people={team} locale={locale} upcomingCount={joinSlotCount(team)} className="mt-12" />
        ) : null}
        <div className="mt-8">
          <ArrowLink href={href(locale, "people")}>{m.toPeople}</ArrowLink>
        </div>
      </Section>

      <Section id="work-with-us" tone="tint" labelledBy="work-heading" size="sm">
        <SectionHeading label={c.work.label[locale]} heading={c.work.heading[locale]} id="work-heading" lead={c.work.body[locale]} align="split" />
        <div className="mt-10">
          <CollaborationRoutesPreview locale={locale} />
        </div>
        <div className="mt-8">
          <ButtonLink href={href(locale, "work-with-us")}>{m.toWorkWithUs}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
