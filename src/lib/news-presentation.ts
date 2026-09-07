import { ANALYSIS_MEDIA_ID_PREFIX, constructionGameInfographic } from "@/content/media";
import type { Insight } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import type { MediaRecord } from "@/lib/cms/types";

/** Resolved card/hero media. Absence is a valid state — never invent a photograph. */
export type NewsCardMedia = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  contain?: boolean;
};

/** Previous/next controls are only useful when more than one item can overflow. */
export function carouselNavVisible(count: number): boolean {
  return count > 1;
}

function localizedMediaId(id: string, locale: Locale): string {
  if (id.endsWith("-bg") || id.endsWith("-en")) return `${id.slice(0, -3)}-${locale}`;
  return id;
}

export function mediaPairMatches(heroMediaId: string | undefined, mediaId: string): boolean {
  if (!heroMediaId) return false;
  if (heroMediaId === mediaId) return true;
  if ((heroMediaId.endsWith("-bg") || heroMediaId.endsWith("-en")) && (mediaId.endsWith("-bg") || mediaId.endsWith("-en"))) {
    return heroMediaId.slice(0, -3) === mediaId.slice(0, -3);
  }
  return false;
}

/**
 * Card/hero image from the media library only.
 * Does not attach campus atmosphere photos or YouTube thumbnails as filler.
 * Diagram pairs ending in `-bg` / `-en` resolve to the active locale when both exist.
 */
export function resolveNewsMedia(insight: Insight, media: MediaRecord[], locale: Locale): NewsCardMedia | null {
  if (!insight.heroMediaId) return null;
  const preferredId = localizedMediaId(insight.heroMediaId, locale);
  const record = media.find((item) => item.id === preferredId) ?? media.find((item) => item.id === insight.heroMediaId);
  if (!record?.publicUrl) return null;
  const alt = (locale === "bg" ? record.altBg : record.altEn).trim();
  const caption = (locale === "bg" ? record.captionBg : record.captionEn)?.trim();
  return {
    src: record.publicUrl,
    alt: alt || insight.title[locale],
    width: record.width,
    height: record.height,
    caption: caption || undefined,
    contain: record.id.startsWith(ANALYSIS_MEDIA_ID_PREFIX) || record.id === constructionGameInfographic.id,
  };
}

export function newsMediaMap(insights: Insight[], media: MediaRecord[], locale: Locale): Record<string, NewsCardMedia | null> {
  return Object.fromEntries(insights.map((insight) => [insight.slug, resolveNewsMedia(insight, media, locale)]));
}
