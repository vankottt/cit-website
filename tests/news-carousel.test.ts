import { describe, expect, it } from "vitest";
import { insights } from "../src/content/insights";
import { carouselNavVisible, resolveNewsMedia } from "../src/lib/news-presentation";
import { seedMedia } from "../src/lib/cms/serialize";

describe("news carousel presentation", () => {
  it("hides controls when a single item cannot be browsed", () => {
    expect(carouselNavVisible(0)).toBe(false);
    expect(carouselNavVisible(1)).toBe(false);
    expect(carouselNavVisible(2)).toBe(true);
  });

  it("does not invent card photography for the confirmed UASG article", () => {
    const article = insights.find((i) => i.slug === "kogato-praktikata-vleze-v-universiteta");
    expect(article).toBeDefined();
    expect(resolveNewsMedia(article!, seedMedia(), "bg")).toBeNull();
    expect(resolveNewsMedia(article!, seedMedia(), "en")).toBeNull();
  });

  it("resolves library media when a heroMediaId is present", () => {
    const article = insights.find((i) => i.type === "news");
    expect(article).toBeDefined();
    const withMedia = { ...article!, heroMediaId: "media-campus-facade" };
    const resolved = resolveNewsMedia(withMedia, seedMedia(), "en");
    expect(resolved?.src).toBe("/images/temporary-uacg/campus-facade.jpg");
    expect(resolved?.alt).toContain("University of Architecture");
  });
});
