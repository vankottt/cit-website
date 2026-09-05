import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { home } from "@/content/pages";
import { t } from "@/content/messages";
import { featuredProject } from "@/content/projects";
import { insights } from "@/content/insights";
import { pillars, integratedModel, stages, methodologyName } from "@/content/methodology";
import { Hero } from "@/components/editorial/Hero";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { SystemLoop } from "@/components/systems/SystemLoop";
import { SystemAnatomy } from "@/components/systems/SystemAnatomy";
import { PillarsCycle } from "@/components/systems/PillarsCycle";
import { MethodologyLoop } from "@/components/systems/MethodologyLoop";
import { ProjectFeature } from "@/components/projects/ProjectFeature";
import { InsightList } from "@/components/editorial/InsightList";
import { InstitutionalNetwork } from "@/components/partners/InstitutionalNetwork";
import { GovernanceList } from "@/components/people/GovernanceList";
import { CollaborationRoutesPreview } from "@/components/partners/CollaborationRoutes";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";

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

  return (
    <>
      <Hero
        layout="stacked"
        headline={c.hero.headline[locale]}
        lead={c.hero.lead[locale]}
        primary={{ href: href(locale, "methodology"), label: c.hero.primary[locale] }}
        secondary={{ href: href(locale, "work-with-us"), label: c.hero.secondary[locale] }}
        visual={
          <SystemLoop
            locale={locale}
            title={c.hero.diagramTitle[locale]}
            desc={c.hero.diagramCaption[locale]}
            caption={c.hero.diagramCaption[locale]}
          />
        }
      />

      {/* System idea / Why CIT */}
      <Section id="system-idea" labelledBy="system-idea-heading">
        <SectionHeading label={c.systemIdea.label[locale]} heading={c.systemIdea.heading[locale]} id="system-idea-heading" align="split">
          <div className="space-y-5 text-body text-ink-2">
            {c.systemIdea.body[locale].map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </SectionHeading>
        <SystemAnatomy
          locale={locale}
          heading={c.systemIdea.tableHeading[locale]}
          componentsCol={c.systemIdea.componentsCol[locale]}
          failuresCol={c.systemIdea.failuresCol[locale]}
          className="mt-14"
        />
      </Section>

      {/* Integrated pillars */}
      <Section id="pillars" tone="tint" labelledBy="pillars-heading">
        <SectionHeading label={c.pillars.label[locale]} heading={c.pillars.heading[locale]} id="pillars-heading" lead={c.pillars.body[locale]} align="split" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <PillarsCycle locale={locale} title={c.pillars.diagramTitle[locale]} desc={integratedModel[locale].join(" ")} />
          </div>
          <div className="lg:col-span-7">
            <ol className="divide-y divide-line border-y border-line">
              {pillars.map((p) => (
                <li key={p.slug} className="grid gap-3 py-6 md:grid-cols-12 md:gap-6">
                  <div className="md:col-span-4">
                    <p className="label">{p.code}</p>
                    <h3 className="mt-2 text-h3 text-ink">{p.title[locale]}</h3>
                    <p className="mt-2 text-small text-amber-ink">{p.short[locale]}</p>
                  </div>
                  <p className="text-body text-ink-2 md:col-span-8">{p.purpose[locale]}</p>
                </li>
              ))}
            </ol>
            <ol className="mt-8 grid gap-2.5 text-small text-ink-2 sm:grid-cols-2">
              {integratedModel[locale].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="label mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <ArrowLink href={href(locale, "about")}>{m.toAbout}</ArrowLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Methodology — the single dark band */}
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
            labels={{ stage: m.stage, loopNote: locale === "bg" ? "Цикълът се затваря" : "The loop closes" }}
          />
        </div>
        <div className="mt-12">
          <ButtonLink href={href(locale, "methodology")} variant="on-dark">
            {m.toMethodology}
          </ButtonLink>
        </div>
      </Section>

      {/* Featured project */}
      <Section id="featured-project" labelledBy="featured-heading">
        <ProjectFeature project={featuredProject} locale={locale} label={c.featured.label[locale]} chainTitle={c.featured.chainTitle[locale]} />
      </Section>

      {/* Insights */}
      <Section id="insights" tone="tint" labelledBy="insights-heading">
        <SectionHeading label={c.insights.label[locale]} heading={c.insights.heading[locale]} id="insights-heading" lead={c.insights.body[locale]} align="split" />
        <InsightList insights={insights} locale={locale} className="mt-12" />
        <div className="mt-8">
          <ArrowLink href={href(locale, "insights")}>{m.allInsights}</ArrowLink>
        </div>
      </Section>

      {/* Institutional network */}
      <Section id="network" labelledBy="network-heading">
        <SectionHeading label={c.network.label[locale]} heading={c.network.heading[locale]} id="network-heading" align="split">
          <div className="space-y-5 text-body text-ink-2">
            {c.network.body[locale].map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </SectionHeading>
        <div className="mt-12">
          <InstitutionalNetwork locale={locale} />
        </div>
      </Section>

      {/* People preview */}
      <Section id="people" tone="tint" labelledBy="people-heading">
        <SectionHeading label={c.people.label[locale]} heading={c.people.heading[locale]} id="people-heading" lead={c.people.body[locale]} align="split" />
        <div className="mt-12">
          <p className="label mb-3">{c.people.structureTitle[locale]}</p>
          <GovernanceList locale={locale} compact />
        </div>
        <div className="mt-8">
          <ArrowLink href={href(locale, "people")}>{m.toPeople}</ArrowLink>
        </div>
      </Section>

      {/* Work with us */}
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
