import type { MetadataRoute } from "next";
import { locales, localeLabels } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/paths";
import { siteUrl } from "@/lib/site-url";
import { insights as seedInsights } from "@/content/insights";
import { projects as seedProjects } from "@/content/projects";
import { listPublishedInsights, listPublishedNews, listPublishedProjects } from "@/lib/cms/repository";

const staticRoutes: Array<{ key: RouteKey; priority: number }> = [
  { key: "home", priority: 1 },
  { key: "about", priority: 0.8 },
  { key: "methodology", priority: 0.9 },
  { key: "projects", priority: 0.8 },
  { key: "insights", priority: 0.6 },
  { key: "news", priority: 0.6 },
  { key: "people", priority: 0.5 },
  { key: "work-with-us", priority: 0.8 },
  { key: "privacy", priority: 0.3 },
];

function entry(key: RouteKey, priority: number, slug?: string): MetadataRoute.Sitemap {
  const base = siteUrl();
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[localeLabels[loc].htmlLang] = `${base}${href(loc, key, slug)}`;
  languages["x-default"] = `${base}${href("bg", key, slug)}`;
  return locales.map((loc) => ({
    url: `${base}${href(loc, key, slug)}`,
    changeFrequency: "monthly",
    priority,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = (await listPublishedProjects().catch(() => seedProjects)) ?? seedProjects;
  const insights = (await listPublishedInsights().catch(() => seedInsights)) ?? seedInsights;
  const news = (await listPublishedNews().catch(() => [])) ?? [];
  return [
    ...staticRoutes.flatMap((r) => entry(r.key, r.priority)),
    ...projects.flatMap((p) => entry("projects", 0.7, p.slug)),
    ...insights.flatMap((i) => entry("insights", 0.5, i.slug)),
    ...news.flatMap((i) => entry("news", 0.5, i.slug)),
  ];
}
