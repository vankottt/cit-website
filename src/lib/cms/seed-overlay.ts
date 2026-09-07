import { seedStore } from "./serialize";
import type { InsightRecord, MediaRecord } from "./types";

/**
 * Versioned TypeScript seed is the public baseline. A connected CMS overrides
 * by slug; slugs that were never imported (and empty hero ids on seed slugs)
 * are filled here so production Supabase does not silently drop confirmed seed.
 */
export function missingSeedContent(data: { insights: InsightRecord[]; media: MediaRecord[] }): {
  insights: InsightRecord[];
  media: MediaRecord[];
} {
  const seeded = seedStore();
  const insightSlugs = new Set(data.insights.map((item) => item.slug));
  const mediaIds = new Set(data.media.map((item) => item.id));
  return {
    insights: seeded.insights.filter((item) => !insightSlugs.has(item.slug)),
    media: seeded.media.filter((item) => !mediaIds.has(item.id)),
  };
}

export function applyMissingSeedContent<T extends { insights: InsightRecord[]; media: MediaRecord[] }>(data: T): T {
  const seeded = seedStore();
  const extras = missingSeedContent(data);
  const seedBySlug = new Map(seeded.insights.map((item) => [item.slug, item]));
  const insights = data.insights.map((record) => {
    const seed = seedBySlug.get(record.slug);
    if (!seed?.heroMediaId || record.heroMediaId) return record;
    return { ...record, heroMediaId: seed.heroMediaId };
  });
  return {
    ...data,
    insights: extras.insights.length ? [...insights, ...extras.insights] : insights,
    media: extras.media.length ? [...data.media, ...extras.media] : data.media,
  };
}
