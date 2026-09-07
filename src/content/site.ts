import type { L } from "@/lib/i18n";
import type { RouteKey } from "@/lib/paths";

export const site = {
  name: {
    bg: "Център за интелигентни технологии",
    en: "Center for Intelligent Technologies",
  } satisfies L,
  /** Two-line header lockup; `name` stays the single-line form for metadata. */
  nameLines: {
    bg: ["Център за", "интелигентни технологии"],
    en: ["Center for", "Intelligent Technologies"],
  } satisfies { bg: readonly [string, string]; en: readonly [string, string] },
  short: { bg: "ЦИТ", en: "CIT" } satisfies L,
  descriptor: {
    bg: "Лаборатория за архитектура и инженеринг на социално-институционални системи",
    en: "Laboratory for the architecture and engineering of social-institutional systems",
  } satisfies L,
  anchor: {
    bg: "Университет по архитектура, строителство и геодезия",
    en: "University of Architecture, Civil Engineering and Geodesy",
  } satisfies L,
  anchorShort: { bg: "УАСГ", en: "UASG" } satisfies L,
  description: {
    bg: "Интердисциплинарна платформа за образование, академични изследвания и приложна наука в областта на архитектурата, инженеринга и непрекъснатото адаптиране на социално-институционалните системи. Институционална основа: УАСГ.",
    en: "An interdisciplinary platform for education, academic research and applied science on the architecture, engineering and continuous adaptation of social-institutional systems. Institutionally anchored at UASG.",
  } satisfies L,
  /** Confirmed contact channels: none yet. Rendered as a neutral note. */
  contactNote: {
    bg: "Официалните канали за контакт ще бъдат публикувани след завършване на институционалното учредяване на Центъра.",
    en: "Official contact channels will be published once the Center's institutional establishment is complete.",
  } satisfies L,
};

export interface NavItem {
  key: RouteKey;
  label: L;
}

export const primaryNav: NavItem[] = [
  { key: "about", label: { bg: "За центъра", en: "About" } },
  { key: "methodology", label: { bg: "Методология", en: "Methodology" } },
  { key: "projects", label: { bg: "Проекти", en: "Projects" } },
  { key: "news", label: { bg: "Новини", en: "News" } },
  { key: "insights", label: { bg: "Анализи", en: "Insights" } },
  { key: "people", label: { bg: "Екип", en: "Team" } },
  { key: "work-with-us", label: { bg: "Сътрудничество", en: "Work with us" } },
];

export const footerNav: NavItem[] = [...primaryNav, { key: "privacy", label: { bg: "Поверителност", en: "Privacy" } }];
