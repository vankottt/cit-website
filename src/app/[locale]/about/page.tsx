import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { about, home } from "@/content/pages";
import { t } from "@/content/messages";
import { pillars, integratedModel, roadmap } from "@/content/methodology";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Paragraphs, RuledList } from "@/components/editorial/Blocks";
import { PillarsCycle } from "@/components/systems/PillarsCycle";
import { GovernanceList } from "@/components/people/GovernanceList";
import { InstitutionalNetwork } from "@/components/partners/InstitutionalNetwork";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "about", title: about.meta.title[locale], description: about.meta.description[locale] });
}

export default async function AboutPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const m = t(locale);
  const s = about.sections;

  return (
    <>
      <PageHeader label={about.meta.title[locale]} heading={about.heading[locale]} lead={about.lead[locale]} />

      <Section id="mission" labelledBy="mission-heading" size="sm">
        <SectionHeading label={s.mission.label[locale]} heading={s.mission.heading[locale]} id="mission-heading" align="split">
          <Paragraphs items={s.missionBody[locale]} />
        </SectionHeading>
      </Section>

      <Section id="pillars" tone="tint" labelledBy="about-pillars-heading">
        <SectionHeading label={s.pillars.label[locale]} heading={s.pillars.heading[locale]} id="about-pillars-heading" lead={s.pillarsIntro[locale]} align="split" />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <PillarsCycle locale={locale} title={home.pillars.diagramTitle[locale]} desc={integratedModel[locale].join(" ")} compact />
            <ol className="mt-6 space-y-2.5 text-small text-ink-2">
              {integratedModel[locale].map((st, i) => (
                <li key={st} className="flex gap-3">
                  <span className="label mt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{st}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <ol className="divide-y divide-line border-y border-line">
              {pillars.map((p) => (
                <li key={p.slug} className="py-8">
                  <div className="flex items-baseline gap-3">
                    <span className="label">{p.code}</span>
                    <h3 className="text-h3 text-ink">{p.title[locale]}</h3>
                  </div>
                  <p className="mt-4 max-w-3xl text-body text-ink-2">{p.purpose[locale]}</p>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="label mb-2">{s.activitiesLabel[locale]}</p>
                      <RuledList items={p.activities[locale]} />
                    </div>
                    <div>
                      <p className="label mb-2">{s.expectedLabel[locale]}</p>
                      <RuledList items={p.expected[locale]} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section id="structure" labelledBy="structure-heading">
        <SectionHeading label={s.structure.label[locale]} heading={s.structure.heading[locale]} id="structure-heading" lead={s.structureIntro[locale]} align="split" />
        <GovernanceList locale={locale} className="mt-12" />
        <div className="mt-8">
          <ArrowLink href={href(locale, "people")}>{m.toPeople}</ArrowLink>
        </div>
      </Section>

      <Section id="context" tone="tint" labelledBy="context-heading">
        <SectionHeading label={s.context.label[locale]} heading={s.context.heading[locale]} id="context-heading" align="split">
          <Paragraphs items={s.contextBody[locale]} />
        </SectionHeading>
        <div className="mt-12">
          <InstitutionalNetwork locale={locale} />
        </div>
      </Section>

      <Section id="roadmap" labelledBy="roadmap-heading">
        <SectionHeading label={s.roadmap.label[locale]} heading={s.roadmap.heading[locale]} id="roadmap-heading" lead={s.roadmapNote[locale]} align="split" />
        <ol className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {roadmap.map((y) => (
            <li key={y.code}>
              <p className="label">{y.code}</p>
              <h3 className="mt-2 text-h3 text-ink">{y.title[locale]}</h3>
              <RuledList items={y.items[locale]} className="mt-5" />
            </li>
          ))}
        </ol>
      </Section>

      <Section id="vision" tone="dark" labelledBy="vision-heading">
        <SectionHeading tone="on-dark" label={s.vision.label[locale]} heading={s.vision.heading[locale]} id="vision-heading" align="split">
          <div className="space-y-5 text-body text-on-dark-muted">
            {s.visionBody[locale].map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </SectionHeading>
      </Section>
    </>
  );
}
