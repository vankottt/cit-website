import type { Insight } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import type { MediaRecord } from "@/lib/cms/types";

/** Resolved card/hero media. Absence is a valid state — never invent a photograph. */
export type NewsCardMedia = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

/** Previous/next controls are only useful when more than one item can overflow. */
export function carouselNavVisible(count: number): boolean {
  return count > 1;
}

/**
 * Card/hero image from the media library only.
 * Does not attach campus atmosphere photos or YouTube thumbnails as filler.
 */
export function resolveNewsMedia(insight: Insight, media: MediaRecord[], locale: Locale): NewsCardMedia | null {
  if (!insight.heroMediaId) return null;
  const record = media.find((item) => item.id === insight.heroMediaId);
  if (!record?.publicUrl) return null;
  const alt = (locale === "bg" ? record.altBg : record.altEn).trim();
  return {
    src: record.publicUrl,
    alt: alt || insight.title[locale],
    width: record.width,
    height: record.height,
  };
}

export function newsMediaMap(insights: Insight[], media: MediaRecord[], locale: Locale): Record<string, NewsCardMedia | null> {
  return Object.fromEntries(insights.map((insight) => [insight.slug, resolveNewsMedia(insight, media, locale)]));
}
