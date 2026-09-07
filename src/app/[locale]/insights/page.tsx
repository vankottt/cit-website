import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { insightsPage as c } from "@/content/pages";
import { listPublishedInsights } from "@/lib/cms/repository";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Container } from "@/components/layout/Container";
import { InsightList } from "@/components/editorial/InsightList";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "insights", title: c.meta.title[locale], description: c.meta.description[locale] });
}

export default async function InsightsPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const insights = await listPublishedInsights();
  return (
    <>
      <PageHeader label={c.meta.title[locale]} heading={c.heading[locale]} lead={c.lead[locale]} />
      <Container className="pb-section">
        <InsightList insights={insights} locale={locale} headingLevel={2} />
      </Container>
    </>
  );
}
