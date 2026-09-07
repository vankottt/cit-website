import { describe, expect, it } from "vitest";
import { primaryNav } from "../src/content/site";
import { homeHashHref, homeSpySectionIds, isHomePath, navKeyForHomeSection } from "../src/lib/home-nav";
import { isActivePath } from "../src/lib/home-nav";

describe("home path", () => {
  it("treats locale roots as the landing page", () => {
    expect(isHomePath("/bg")).toBe(true);
    expect(isHomePath("/en")).toBe(true);
    expect(isHomePath("/en/")).toBe(true);
    expect(isHomePath("/bg/methodology")).toBe(false);
    expect(isHomePath("/bg/projects/x")).toBe(false);
  });
});

describe("homepage section map", () => {
  it("keeps primary nav in the confirmed public order", () => {
    expect(primaryNav.map((item) => item.key)).toEqual([
      "about",
      "methodology",
      "news",
      "insights",
      "projects",
      "people",
      "work-with-us",
    ]);
  });

  it("maps landing blocks onto primary nav keys", () => {
    expect(navKeyForHomeSection("about")).toBe("about");
    expect(navKeyForHomeSection("pillars")).toBe("about");
    expect(navKeyForHomeSection("network")).toBe("about");
    expect(navKeyForHomeSection("featured-project")).toBe("projects");
    expect(navKeyForHomeSection("people")).toBe("people");
    expect(navKeyForHomeSection("insights")).toBe(null);
    expect(navKeyForHomeSection("missing")).toBe(null);
  });

  it("keeps spy ids in homepage document order", () => {
    expect([...homeSpySectionIds]).toEqual([
      "about",
      "pillars",
      "network",
      "methodology",
      "featured-project",
      "news",
      "people",
      "work-with-us",
    ]);
  });

  it("builds in-page hashes for the landing nav", () => {
    expect(homeHashHref("bg", "methodology")).toBe("/bg#methodology");
    expect(homeHashHref("en", "projects")).toBe("/en#featured-project");
    expect(homeHashHref("en", "news")).toBe("/en#news");
    expect(homeHashHref("bg", "insights")).toBe(null);
    expect(homeHashHref("bg", "privacy")).toBe(null);
  });
});

describe("path-based current item", () => {
  it("marks a section from nested paths", () => {
    expect(isActivePath("/bg/projects/pilot", "/bg/projects")).toBe(true);
    expect(isActivePath("/bg/methodology", "/bg/projects")).toBe(false);
  });
});
