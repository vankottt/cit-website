import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/paths";
import type { Insight } from "@/content/types";
import { t } from "@/content/messages";
import { cn } from "@/lib/cn";
import { ArrowRight } from "@/components/ui/Icons";
import type { NewsCardMedia } from "@/lib/news-presentation";
import { NewsCard } from "./NewsCard";

/** Ruled list of concept notes, or News cards when `channel="news"`. */
export function InsightList({
  insights,
  locale,
  headingLevel = 3,
  className,
  channel = "insights",
  media,
}: {
  insights: Insight[];
  locale: Locale;
  headingLevel?: 2 | 3;
  className?: string;
  channel?: Extract<RouteKey, "insights" | "news">;
  media?: Record<string, NewsCardMedia | null>;
}) {
  const m = t(locale);
  const H = headingLevel === 2 ? "h2" : "h3";

  if (channel === "news") {
    return (
      <ol className={cn("grid gap-10", className)}>
        {insights.map((n) => (
          <li key={n.slug}>
            <NewsCard insight={n} locale={locale} media={media?.[n.slug]} headingLevel={headingLevel} variant="row" />
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("divide-y divide-line border-y border-line", className)}>
      {insights.map((n) => (
        <li key={n.slug} className="group">
          <Link href={href(locale, channel, n.slug)} className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <p className="label">{m.conceptNote}</p>
              <p className="mt-2 text-meta text-ink-3">{m.workingConcept}</p>
            </div>
            <div className="md:col-span-8">
              <H className="text-h3 text-ink transition-colors duration-150 group-hover:text-marine">{n.title[locale]}</H>
              <p className="mt-3 max-w-2xl text-body text-ink-2">{n.summary[locale]}</p>
            </div>
            <div className="hidden md:col-span-1 md:flex md:justify-end md:pt-2">
              <ArrowRight className="text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-marine" size={18} />
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
