import { describe, expect, it } from "vitest";
import { insights, getInsight } from "../src/content/insights";
import {
  CMS_DEV_FIXTURE_WRITE_BLOCK,
  DEV_NEWS_FIXTURE_SLUGS,
  DEV_NEWS_FIXTURE_SOURCE,
  devNewsFixtures,
} from "../src/content/dev-news-fixtures";
import { isDevFixturesEnabled } from "../src/content/dev-fixtures";
import { devNewsFixturePhotos } from "../src/content/media";
import {
  applyDevNewsFixtures,
  cmsDevFixtureWriteBlock,
  devNewsFixtureInsightRecords,
  isBlockedDevFixtureInsight,
  isBlockedDevFixtureMedia,
} from "../src/lib/cms/dev-news-overlay";
import { recordToInsight, seedMedia, seedStore } from "../src/lib/cms/serialize";
import { resolveNewsMedia } from "../src/lib/news-presentation";
import { sortNewsNewestFirst } from "../src/lib/news-order";

const UASG_SLUG = "kogato-praktikata-vleze-v-universiteta";

function emptyBundle() {
  return { insights: [] as ReturnType<typeof seedStore>["insights"], media: [] as ReturnType<typeof seedStore>["media"] };
}

describe("demo news fixtures", () => {
  it("keeps confirmed seed news limited to the UASG article", () => {
    expect(insights.filter((item) => item.type === "news").map((item) => item.slug)).toEqual([UASG_SLUG]);
    expect(getInsight(UASG_SLUG)?.source.en).toContain("uacg.bg");
    for (const slug of DEV_NEWS_FIXTURE_SLUGS) {
      expect(insights.some((item) => item.slug === slug)).toBe(false);
      expect(getInsight(slug)).toBeUndefined();
    }
  });

  it("does not put fixture records into the CMS seed import", () => {
    const seeded = seedStore();
    for (const slug of DEV_NEWS_FIXTURE_SLUGS) {
      expect(seeded.insights.some((item) => item.slug === slug)).toBe(false);
    }
    expect(seeded.insights.some((item) => item.id.startsWith("insight-dev-fixture-"))).toBe(false);
    expect(seeded.media.some((item) => item.id.startsWith("media-dev-fixture-"))).toBe(false);
    expect(seedMedia().map((item) => item.id)).toEqual(["media-campus-facade", "media-campus-hall"]);
  });

  it("marks every demo article internally and never invents authors or source URLs", () => {
    expect(devNewsFixtures).toHaveLength(3);
    expect(devNewsFixtures.map((item) => item.slug)).toEqual([...DEV_NEWS_FIXTURE_SLUGS]);
    for (const article of devNewsFixtures) {
      expect(article.devFixture).toBe(true);
      expect(article.type).toBe("news");
      expect(article.author).toBeUndefined();
      expect(article.relatedProjects ?? []).toEqual([]);
      expect(article.source.bg).toBe(DEV_NEWS_FIXTURE_SOURCE.bg);
      expect(article.source.en).toBe(DEV_NEWS_FIXTURE_SOURCE.en);
      expect(article.source.bg).not.toMatch(/https?:\/\//i);
      expect(article.source.en).not.toMatch(/https?:\/\//i);
      expect(article.heroMediaId).toMatch(/^media-dev-fixture-/);
    }
    expect(devNewsFixtures[0]?.date).toBe("2026-03-12");
    expect(devNewsFixtures[1]?.date).toBe("2026-02-28");
    expect(devNewsFixtures[2]?.date).toBe("2026-02-15");
    expect(devNewsFixtures[0]?.title).toEqual({
      bg: "Данни за по-устойчиво Черноморие",
      en: "Data for a More Resilient Black Sea",
    });
    expect(devNewsFixtures[1]?.title).toEqual({
      bg: "От аудиторията към реалните системи",
      en: "From the Classroom to Real-World Systems",
    });
    expect(devNewsFixtures[2]?.title).toEqual({
      bg: "Вино, туризъм и регионална стойност",
      en: "Wine, Tourism and Regional Value",
    });
  });

  it("overlays demo news on the public site by default, including production", () => {
    expect(applyDevNewsFixtures(emptyBundle()).insights.map((item) => item.slug)).toEqual([...DEV_NEWS_FIXTURE_SLUGS]);
    expect(isDevFixturesEnabled({ CIT_DEV_FIXTURES: "1", NODE_ENV: "production" })).toBe(false);
    expect(applyDevNewsFixtures(emptyBundle(), false)).toEqual(emptyBundle());
  });

  it("overlays demo news and media in memory without replacing the UASG article", () => {
    const seeded = seedStore();
    const overlaid = applyDevNewsFixtures(seeded);
    const news = sortNewsNewestFirst(
      overlaid.insights.filter((item) => item.type === "news").map(recordToInsight),
    );
    expect(news.map((item) => item.slug)).toEqual([
      "data-for-a-more-resilient-black-sea",
      "from-classroom-to-real-world-systems",
      "wine-tourism-and-regional-value",
      UASG_SLUG,
    ]);
    const uasg = overlaid.insights.find((item) => item.slug === UASG_SLUG);
    const original = seeded.insights.find((item) => item.slug === UASG_SLUG);
    expect(uasg).toEqual(original);
    expect(uasg?.heroMediaId).toBeUndefined();

    const blackSea = news.find((item) => item.slug === "data-for-a-more-resilient-black-sea");
    const resolved = resolveNewsMedia(blackSea!, overlaid.media, "en");
    expect(resolved?.src).toBe(devNewsFixturePhotos.coastalWaterSampling.src);
    expect(resolved?.alt).toContain("Generated fixture");
    expect(resolveNewsMedia(recordToInsight(uasg!), overlaid.media, "bg")).toBeNull();
  });

  it("does not override a real CMS record that already uses a fixture slug", () => {
    const seeded = seedStore();
    const existing = {
      ...devNewsFixtureInsightRecords()[0]!,
      id: "insight-real-collision",
      titleEn: "Existing CMS record",
      createdBy: "editor",
    };
    const overlaid = applyDevNewsFixtures({ ...seeded, insights: [...seeded.insights, existing] }, true);
    const matches = overlaid.insights.filter((item) => item.slug === existing.slug);
    expect(matches).toHaveLength(1);
    expect(matches[0]?.id).toBe("insight-real-collision");
    expect(matches[0]?.titleEn).toBe("Existing CMS record");
  });

  it("strips leaked fixture ids when the flag is off", () => {
    const seeded = seedStore();
    const leaked = applyDevNewsFixtures(seeded, true);
    const cleaned = applyDevNewsFixtures(leaked, false);
    expect(cleaned.insights.some((item) => item.id.startsWith("insight-dev-fixture-"))).toBe(false);
    expect(cleaned.media.some((item) => item.id.startsWith("media-dev-fixture-"))).toBe(false);
    expect(cleaned.insights.map((item) => item.slug)).toEqual(seeded.insights.map((item) => item.slug));
  });

  it("blocks CMS writes for fixture records", () => {
    expect(cmsDevFixtureWriteBlock()).toEqual({ ok: false, error: CMS_DEV_FIXTURE_WRITE_BLOCK });
    expect(isBlockedDevFixtureInsight({ id: "insight-dev-fixture-data-for-a-more-resilient-black-sea" })).toBe(true);
    expect(isBlockedDevFixtureInsight({ slug: "wine-tourism-and-regional-value" })).toBe(true);
    expect(isBlockedDevFixtureInsight({ slug: UASG_SLUG, id: "insight-kogato-praktikata-vleze-v-universiteta" })).toBe(false);
    expect(isBlockedDevFixtureMedia(devNewsFixturePhotos.goldenHourVineyard.id)).toBe(true);
    expect(isBlockedDevFixtureMedia("media-campus-facade")).toBe(false);
  });
});
