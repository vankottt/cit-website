import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { insightsPage as c } from "@/content/pages";
import { t } from "@/content/messages";
import { insights } from "@/content/insights";
import { getInsightForPublic, listPublishedInsights, listPublishedProjects } from "@/lib/cms/repository";
import { insightRouteKey } from "@/lib/insight-channel";
import { InsightArticle } from "@/components/editorial/InsightArticle";

type Params = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.filter((i) => i.type !== "news").map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const insight = await getInsightForPublic(slug);
  if (!insight || insight.type === "news") return {};
  return pageMetadata({ locale, key: "insights", slug, title: insight.title[locale], description: insight.summary[locale], type: "article" });
}

export default async function InsightDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const insight = await getInsightForPublic(slug);
  if (!insight) notFound();
  if (insight.type === "news") redirect(href(locale, "news", slug));
  const m = t(locale);
  const [publishedInsights, publishedProjects] = await Promise.all([listPublishedInsights(), listPublishedProjects()]);
  const related = (insight.relatedProjects ?? []).map((relatedSlug) => publishedProjects.find((p) => p.slug === relatedSlug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = publishedInsights.filter((i) => i.slug !== insight.slug);

  return (
    <InsightArticle
      insight={insight}
      locale={locale}
      listingTitle={c.meta.title[locale]}
      listingKey={insightRouteKey(insight.type)}
      typeLabel={m.conceptNote}
      statusLabel={m.workingConcept}
      othersHeading={m.allInsights}
      others={others}
      relatedProjects={related}
    />
  );
}
