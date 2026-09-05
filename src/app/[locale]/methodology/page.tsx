import type { Metadata } from "next";
import Link from "next/link";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { methodologyPage as c, home } from "@/content/pages";
import { t } from "@/content/messages";
import { methodologyName, stages, validationLoop } from "@/content/methodology";
import { projects } from "@/content/projects";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { Paragraphs, RuledList } from "@/components/editorial/Blocks";
import { SystemLoop } from "@/components/systems/SystemLoop";
import { SystemAnatomy } from "@/components/systems/SystemAnatomy";
import { MethodologyLoop } from "@/components/systems/MethodologyLoop";
import { Chain } from "@/components/systems/Chain";
import { StatusLabel } from "@/components/projects/ProjectMeta";
import { ArrowRight } from "@/components/ui/Icons";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "methodology", title: c.meta.title[locale], description: c.meta.description[locale] });
}

export default async function MethodologyPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const m = t(locale);
  const s = c.sections;

  return (
    <>
      <PageHeader
        label={`${m.methodology} · ${methodologyName.acronym}`}
        heading={c.heading[locale]}
        lead={c.lead[locale]}
        aside={
          <dl className="border-t border-line text-small">
            <div className="border-b border-line py-3">
              <dt className="label">{m.theoreticalFramework}</dt>
              <dd className="mt-1 text-ink">{methodologyName.programme[locale]}</dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="label">{m.operationalMethodology}</dt>
              <dd className="mt-1 text-ink">
                {methodologyName.acronym} — {methodologyName.full[locale]}
              </dd>
            </div>
            <div className="border-b border-line py-3">
              <dt className="label">{m.stages}</dt>
              <dd className="mt-1 text-ink">{stages.length}</dd>
            </div>
          </dl>
        }
      />

      <Section id="premise" labelledBy="premise-heading" size="sm">
        <SectionHeading label={s.premise.label[locale]} heading={s.premise.heading[locale]} id="premise-heading" align="split">
          <Paragraphs items={s.premiseBody[locale]} />
        </SectionHeading>
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <SystemLoop locale={locale} title={home.hero.diagramTitle[locale]} desc={home.hero.diagramCaption[locale]} caption={home.hero.diagramCaption[locale]} />
          </div>
        </div>
      </Section>

      <Section id="anatomy" tone="tint" labelledBy="anatomy-heading">
        <SectionHeading label={s.anatomy.label[locale]} heading={s.anatomy.heading[locale]} id="anatomy-heading" lead={s.anatomyBody[locale]} align="split" />
        <SystemAnatomy
          locale={locale}
          heading={home.systemIdea.tableHeading[locale]}
          componentsCol={home.systemIdea.componentsCol[locale]}
          failuresCol={home.systemIdea.failuresCol[locale]}
          className="mt-12"
        />
      </Section>

      <Section id="stages" tone="dark" labelledBy="stages-heading">
        <SectionHeading tone="on-dark" label={s.stages.label[locale]} heading={s.stages.heading[locale]} id="stages-heading" lead={s.stagesBody[locale]} align="split" />
        <div className="mt-14">
          <MethodologyLoop
            stages={stages.map((st) => ({ code: st.code, short: st.short[locale], title: st.title[locale], body: st.body[locale] }))}
            tone="on-dark"
            mobile="none"
            labels={{ stage: m.stage, loopNote: m.loopCloses }}
          />
        </div>
      </Section>

      {/* Full stage reference */}
      <Section id="stage-reference" labelledBy="stage-reference-heading" size="sm">
        <h2 id="stage-reference-heading" className="sr-only">
          {s.stages.heading[locale]}
        </h2>
        <ol className="divide-y divide-line border-b border-line">
          {stages.map((st) => (
            <li key={st.code} id={`stage-${st.code}`} className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-3">
                <p className="label">
                  {m.stage} {st.code}
                </p>
                <h3 className="mt-2 text-h3 text-ink">{st.title[locale]}</h3>
              </div>
              <div className="md:col-span-8 md:col-start-5">
                <p className="text-body text-ink-2">{st.body[locale]}</p>
                {st.items ? <RuledList items={st.items[locale]} className="mt-5" columns={2} /> : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="ai" tone="tint" labelledBy="ai-heading">
        <SectionHeading label={s.ai.label[locale]} heading={s.ai.heading[locale]} id="ai-heading" align="split">
          <Paragraphs items={s.aiBody[locale]} />
        </SectionHeading>
      </Section>

      <Section id="validation" labelledBy="validation-heading">
        <SectionHeading label={s.validation.label[locale]} heading={s.validation.heading[locale]} id="validation-heading" lead={s.validationBody[locale]} align="split" />
        <div className="mt-12 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-6">
            <Chain items={validationLoop[locale]} numbered loopLabel={m.adaptNote} />
          </div>
        </div>
      </Section>

      <Section id="related" tone="tint" labelledBy="related-heading" size="sm">
        <SectionHeading label={s.related.label[locale]} heading={s.related.heading[locale]} id="related-heading" />
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {projects.map((p) => (
            <li key={p.slug} className="group">
              <Link href={href(locale, "projects", p.slug)} className="grid gap-3 py-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <StatusLabel status={p.status} locale={locale} />
                </div>
                <div className="md:col-span-8">
                  <h3 className="text-h4 font-serif text-ink transition-colors duration-150 group-hover:text-marine">{p.title[locale]}</h3>
                  <p className="mt-2 text-small text-ink-2">{p.standfirst[locale]}</p>
                </div>
                <div className="hidden md:col-span-1 md:flex md:justify-end md:pt-1">
                  <ArrowRight className="text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-marine" size={18} />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
