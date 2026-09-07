import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { newsPage as c } from "@/content/pages";
import { t } from "@/content/messages";
import { getInsightForPublic, listPublishedNews, listPublishedProjects, loadAllRecords } from "@/lib/cms/repository";
import { InsightArticle } from "@/components/editorial/InsightArticle";
import { resolveNewsMedia } from "@/lib/news-presentation";

type Params = { params: Promise<{ locale: string; slug: string }> };

/** Preview cookies and CMS reads must run per request. */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const article = await getInsightForPublic(slug);
  if (!article || article.type !== "news") return {};
  return pageMetadata({ locale, key: "news", slug, title: article.title[locale], description: article.summary[locale], type: "article" });
}

export default async function NewsDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const article = await getInsightForPublic(slug);
  if (!article) notFound();
  if (article.type !== "news") redirect(href(locale, "insights", slug));
  const m = t(locale);
  const [publishedNews, publishedProjects, { media }] = await Promise.all([
    listPublishedNews(),
    listPublishedProjects(),
    loadAllRecords(),
  ]);
  const related = (article.relatedProjects ?? []).map((relatedSlug) => publishedProjects.find((p) => p.slug === relatedSlug)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = publishedNews.filter((i) => i.slug !== article.slug);
  const hero = resolveNewsMedia(article, media, locale);

  return (
    <InsightArticle
      insight={article}
      locale={locale}
      listingTitle={c.meta.title[locale]}
      listingKey="news"
      typeLabel={m.newsItem}
      statusLabel={m.newsUpdate}
      othersHeading={m.allNews}
      others={others}
      relatedProjects={related}
      hero={hero}
      media={media}
    />
  );
}
