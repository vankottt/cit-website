import type { Locale } from "./i18n";
import type { RouteKey } from "./paths";

/** Homepage section ids in document order, for scroll spy. */
export const homeSpySectionIds = [
  "about",
  "pillars",
  "network",
  "methodology",
  "news",
  "insights",
  "featured-project",
  "people",
  "work-with-us",
] as const;

export type HomeSpySectionId = (typeof homeSpySectionIds)[number];

/** Hash target when the primary nav is used on the homepage. */
export const homeNavHash: Record<Exclude<RouteKey, "home" | "privacy">, HomeSpySectionId> = {
  about: "about",
  methodology: "methodology",
  projects: "featured-project",
  insights: "insights",
  news: "news",
  people: "people",
  "work-with-us": "work-with-us",
};

const sectionToNav: Record<HomeSpySectionId, Exclude<RouteKey, "home" | "privacy">> = {
  about: "about",
  pillars: "about",
  network: "about",
  methodology: "methodology",
  "featured-project": "projects",
  insights: "insights",
  news: "news",
  people: "people",
  "work-with-us": "work-with-us",
};

export function isHomePath(pathname: string): boolean {
  return /^\/(bg|en)\/?$/.test(pathname);
}

export function navKeyForHomeSection(sectionId: string): Exclude<RouteKey, "home" | "privacy"> | null {
  return sectionToNav[sectionId as HomeSpySectionId] ?? null;
}

export function homeHashHref(locale: Locale, key: RouteKey): string | null {
  if (key === "home" || key === "privacy") return null;
  return `/${locale}#${homeNavHash[key]}`;
}

/** Marks the current section from the pathname (e.g. /bg/projects/x → Projects). */
export function isActivePath(pathname: string, linkHref: string): boolean {
  return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
}
