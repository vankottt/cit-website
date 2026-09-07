import {
  CMS_DEV_FIXTURE_WRITE_BLOCK,
  DEV_NEWS_FIXTURE_INSIGHT_ID_PREFIX,
  devNewsFixtures,
  isDevNewsFixtureInsightId,
  isDevNewsFixtureMediaId,
  isDevNewsFixtureSlug,
} from "@/content/dev-news-fixtures";
import { devNewsFixturePhotos } from "@/content/media";
import { insightToRecord } from "./serialize";
import type { InsightRecord, MediaRecord } from "./types";

const FIXTURE_TIMESTAMP = "2026-09-07T00:00:00.000Z";

const FIXTURE_USAGE =
  "Public demonstration editorial asset. Fictional example for the News UI. Does not depict CIT activity. Never import into the production CMS.";

export function cmsDevFixtureWriteBlock(): { ok: false; error: string } {
  return { ok: false, error: CMS_DEV_FIXTURE_WRITE_BLOCK };
}

export function isBlockedDevFixtureInsight(record: { id?: string; slug?: string }): boolean {
  return Boolean((record.slug && isDevNewsFixtureSlug(record.slug)) || (record.id && isDevNewsFixtureInsightId(record.id)));
}

export function isBlockedDevFixtureMedia(id: string): boolean {
  return isDevNewsFixtureMediaId(id);
}

export function devNewsFixtureInsightRecords(): InsightRecord[] {
  return devNewsFixtures.map((insight) => {
    const record = insightToRecord(insight);
    return {
      ...record,
      id: `${DEV_NEWS_FIXTURE_INSIGHT_ID_PREFIX}${insight.slug}`,
      createdAt: FIXTURE_TIMESTAMP,
      updatedAt: FIXTURE_TIMESTAMP,
      publishedAt: FIXTURE_TIMESTAMP,
      createdBy: "dev-fixture",
      updatedBy: "dev-fixture",
    };
  });
}

export function devNewsFixtureMediaRecords(): MediaRecord[] {
  return Object.values(devNewsFixturePhotos).map((photo) => ({
    id: photo.id,
    publicUrl: photo.src,
    title: `Development fixture: ${photo.src.split("/").pop()}`,
    altBg: photo.alt.bg,
    altEn: photo.alt.en,
    captionBg: photo.caption.bg,
    captionEn: photo.caption.en,
    source: "Generated development fixture. Not a CIT photograph.",
    usageNote: FIXTURE_USAGE,
    copyrightNote: "Generated demonstration image. Not a CIT photograph.",
    temporary: true,
    replacementRequired: true,
    mimeType: photo.mimeType,
    byteSize: photo.byteSize,
    width: photo.width,
    height: photo.height,
    createdAt: FIXTURE_TIMESTAMP,
    updatedAt: FIXTURE_TIMESTAMP,
    createdBy: "dev-fixture",
    updatedBy: "dev-fixture",
  }));
}

export function applyDevNewsFixtures<T extends { insights: InsightRecord[]; media: MediaRecord[] }>(
  data: T,
  enabled = true,
): T {
  const insights = data.insights.filter((item) => !isDevNewsFixtureInsightId(item.id));
  const media = data.media.filter((item) => !isDevNewsFixtureMediaId(item.id));
  if (!enabled) {
    if (insights.length === data.insights.length && media.length === data.media.length) return data;
    return { ...data, insights, media };
  }

  const insightSlugs = new Set(insights.map((item) => item.slug));
  const mediaIds = new Set(media.map((item) => item.id));
  return {
    ...data,
    insights: [...insights, ...devNewsFixtureInsightRecords().filter((item) => !insightSlugs.has(item.slug))],
    media: [...media, ...devNewsFixtureMediaRecords().filter((item) => !mediaIds.has(item.id))],
  };
}
