import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { newsPage as c } from "@/content/pages";
import { loadAllRecords } from "@/lib/cms/repository";
import { isPublished } from "@/lib/cms/truth";
import { recordToInsight } from "@/lib/cms/serialize";
import { newsMediaMap } from "@/lib/news-presentation";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Container } from "@/components/layout/Container";
import { InsightList } from "@/components/editorial/InsightList";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "news", title: c.meta.title[locale], description: c.meta.description[locale] });
}

export default async function NewsPage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const { insights: insightRecords, media } = await loadAllRecords();
  const news = insightRecords
    .filter((i) => isPublished(i.publicationState))
    .map(recordToInsight)
    .filter((i) => i.type === "news");
  const mediaMap = newsMediaMap(news, media, locale);
  return (
    <>
      <PageHeader label={c.meta.title[locale]} heading={c.heading[locale]} lead={c.lead[locale]} />
      <Container className="pb-section">
        {news.length ? (
          <InsightList insights={news} locale={locale} headingLevel={2} channel="news" media={mediaMap} />
        ) : (
          <p className="max-w-[62ch] border-l-2 border-amber pl-4 text-body text-ink-2">{c.empty[locale]}</p>
        )}
      </Container>
    </>
  );
}
