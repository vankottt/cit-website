import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { pageMetadata } from "@/lib/metadata";
import { insightsPage as c } from "@/content/pages";
import { t } from "@/content/messages";
import { getInsight, insights } from "@/content/insights";
import { getProject } from "@/content/projects";
import { Container } from "@/components/layout/Container";
import { Blocks } from "@/components/editorial/Blocks";
import { ArrowLink } from "@/components/ui/ArrowLink";

type Params = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.map((i) => ({ locale, slug: i.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({ locale, key: "insights", slug, title: insight.title[locale], description: insight.summary[locale], type: "article" });
}

export default async function InsightDetailPage({ params }: Params) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const insight = getInsight(slug);
  if (!insight) notFound();
  const m = t(locale);
  const related = (insight.relatedProjects ?? []).map(getProject).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const others = insights.filter((i) => i.slug !== insight.slug);

  return (
    <article>
      <header className="bg-paper">
        <Container className="pt-12 pb-10 md:pt-16 md:pb-12">
          <nav aria-label={m.breadcrumb} className="label">
            <Link href={href(locale, "insights")} className="hover:text-ink">
              {c.meta.title[locale]}
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-ink-2">{m.conceptNote}</span>
          </nav>
          <div className="mt-6 lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h1 className="text-h1 text-pretty text-ink">{insight.title[locale]}</h1>
              <p className="mt-6 max-w-[62ch] text-lead text-ink-2">{insight.summary[locale]}</p>
            </div>
          </div>
        </Container>
      </header>

      <Container className="pb-section">
        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-3" aria-label={m.conceptNote}>
            <dl className="text-small">
              <div className="border-b border-line pb-3">
                <dt className="label">{m.type}</dt>
                <dd className="mt-1 text-ink">{m.conceptNote}</dd>
              </div>
              <div className="border-b border-line py-3">
                <dt className="label">{m.status}</dt>
                <dd className="mt-1 flex items-center gap-2 text-ink">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
                  {m.workingConcept}
                </dd>
              </div>
              <div className="border-b border-line py-3">
                <dt className="label">{m.topics}</dt>
                <dd className="mt-1 text-ink">
                  <ul className="space-y-1">
                    {insight.topics[locale].map((tp) => (
                      <li key={tp}>{tp}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="border-b border-line py-3">
                <dt className="label">{m.source}</dt>
                <dd className="mt-1 text-ink-2">{insight.source[locale]}</dd>
              </div>
            </dl>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <Blocks blocks={insight.body[locale]} className="max-w-[68ch]" />
            {related.length ? (
              <div className="mt-12 border-t border-line pt-6">
                <p className="label mb-3">{m.relatedProjects}</p>
                <ul className="space-y-3">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <ArrowLink href={href(locale, "projects", p.slug)}>{p.title[locale]}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {others.length ? (
              <div className="mt-10 border-t border-line pt-6">
                <p className="label mb-3">{m.allInsights}</p>
                <ul className="space-y-3">
                  {others.map((i) => (
                    <li key={i.slug}>
                      <ArrowLink href={href(locale, "insights", i.slug)}>{i.title[locale]}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </article>
  );
}
