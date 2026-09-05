import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { workPage as c } from "@/content/pages";
import { site } from "@/content/site";
import { t } from "@/content/messages";
import { collaborationRoutes, transformationPath } from "@/content/collaboration";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { RuledList } from "@/components/editorial/Blocks";
import { Chain } from "@/components/systems/Chain";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "work-with-us", title: c.meta.title[locale], description: c.meta.description[locale] });
}

export default async function WorkWithUsPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const f = c.routeFields;
  const m = t(locale);

  return (
    <>
      <PageHeader label={c.meta.title[locale]} heading={c.heading[locale]} lead={c.lead[locale]} />

      <Section id="routes" labelledBy="routes-heading" size="sm">
        <SectionHeading label={c.routes.label[locale]} heading={c.routes.heading[locale]} id="routes-heading" />
        <ol className="mt-12">
          {collaborationRoutes.map((r) => (
            <li key={r.slug} id={r.slug} className="grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <p className="label">{r.code}</p>
                <h3 className="mt-2 text-h2 text-ink">{r.audience[locale]}</h3>
                <p className="label mt-6 mb-2">{f.audience[locale]}</p>
                <ul className="space-y-1 text-small text-ink-2">
                  {r.audienceExamples[locale].map((ex) => (
                    <li key={ex}>{ex}</li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-8 lg:col-span-8 md:grid-cols-2">
                <div>
                  <p className="label mb-2">{f.problems[locale]}</p>
                  <RuledList items={r.problems[locale]} />
                </div>
                <div>
                  <p className="label mb-2">{f.modes[locale]}</p>
                  <RuledList items={r.modes[locale]} />
                </div>
                <div>
                  <p className="label mb-2">{f.partnerBrings[locale]}</p>
                  <RuledList items={r.partnerBrings[locale]} />
                </div>
                <div>
                  <p className="label mb-2">{f.citBrings[locale]}</p>
                  <RuledList items={r.citBrings[locale]} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="path" tone="tint" labelledBy="path-heading">
        <SectionHeading label={c.path.label[locale]} heading={c.path.heading[locale]} id="path-heading" lead={c.pathBody[locale]} align="split" />
        <div className="mt-12">
          <Chain items={transformationPath[locale]} numbered />
        </div>
      </Section>

      <Section id="principles" labelledBy="principles-heading" size="sm">
        <SectionHeading label={c.independence.label[locale]} heading={c.independence.heading[locale]} id="principles-heading" align="split">
          <p className="text-body text-ink-2">{c.independenceBody[locale]}</p>
        </SectionHeading>
      </Section>

      <Section id="contact" tone="dark" labelledBy="contact-heading" size="sm">
        <SectionHeading tone="on-dark" label={c.contact.label[locale]} heading={c.contact.heading[locale]} id="contact-heading" align="split">
          <p className="text-body text-on-dark-muted">{site.contactNote[locale]}</p>
          <dl className="mt-6 text-small">
            <dt className="label-dark">{m.institutionalAnchor}</dt>
            <dd className="mt-1 text-on-dark">{site.anchor[locale]}</dd>
          </dl>
        </SectionHeading>
      </Section>
    </>
  );
}
