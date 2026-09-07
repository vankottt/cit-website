import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/paths";
import type { Insight, Project } from "@/content/types";
import { t } from "@/content/messages";
import { insightRouteKey } from "@/lib/insight-channel";
import { Container } from "@/components/layout/Container";
import { Blocks } from "@/components/editorial/Blocks";
import { ArrowLink } from "@/components/ui/ArrowLink";

export function InsightArticle({
  insight,
  locale,
  listingTitle,
  listingKey,
  typeLabel,
  statusLabel,
  othersHeading,
  others,
  relatedProjects,
}: {
  insight: Insight;
  locale: Locale;
  listingTitle: string;
  listingKey: Extract<RouteKey, "insights" | "news">;
  typeLabel: string;
  statusLabel?: string;
  othersHeading: string;
  others: Insight[];
  relatedProjects: Project[];
}) {
  const m = t(locale);
  const topics = insight.topics[locale].filter(Boolean);
  const source = insight.source[locale].trim();

  return (
    <article>
      <header className="bg-paper">
        <Container className="pt-12 pb-10 md:pt-16 md:pb-12">
          <nav aria-label={m.breadcrumb} className="label">
            <Link href={href(locale, listingKey)} className="hover:text-ink">
              {listingTitle}
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span className="text-ink-2">{typeLabel}</span>
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
          <aside className="lg:col-span-3" aria-label={typeLabel}>
            <dl className="text-small">
              <div className="border-b border-line pb-3">
                <dt className="label">{m.type}</dt>
                <dd className="mt-1 text-ink">{typeLabel}</dd>
              </div>
              {statusLabel ? (
                <div className="border-b border-line py-3">
                  <dt className="label">{m.status}</dt>
                  <dd className="mt-1 flex items-center gap-2 text-ink">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-amber" />
                    {statusLabel}
                  </dd>
                </div>
              ) : null}
              {topics.length ? (
                <div className="border-b border-line py-3">
                  <dt className="label">{m.topics}</dt>
                  <dd className="mt-1 text-ink">
                    <ul className="space-y-1">
                      {topics.map((tp) => (
                        <li key={tp}>{tp}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {source ? (
                <div className="border-b border-line py-3">
                  <dt className="label">{m.source}</dt>
                  <dd className="mt-1 text-ink-2">{source}</dd>
                </div>
              ) : null}
            </dl>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <Blocks blocks={insight.body[locale]} locale={locale} className="max-w-[68ch]" />
            {relatedProjects.length ? (
              <div className="mt-12 border-t border-line pt-6">
                <p className="label mb-3">{m.relatedProjects}</p>
                <ul className="space-y-3">
                  {relatedProjects.map((p) => (
                    <li key={p.slug}>
                      <ArrowLink href={href(locale, "projects", p.slug)}>{p.title[locale]}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {others.length ? (
              <div className="mt-10 border-t border-line pt-6">
                <p className="label mb-3">{othersHeading}</p>
                <ul className="space-y-3">
                  {others.map((i) => (
                    <li key={i.slug}>
                      <ArrowLink href={href(locale, insightRouteKey(i.type), i.slug)}>{i.title[locale]}</ArrowLink>
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
