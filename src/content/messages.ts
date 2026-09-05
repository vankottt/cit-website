import type { Locale } from "@/lib/i18n";

import type { ProjectStatus } from "./types";

/** UI strings shared by components. Page copy lives in src/content/pages. */
export interface Messages {
  skipToContent: string;
  menu: string;
  openMenu: string;
  closeMenu: string;
  primaryNav: string;
  footerNav: string;
  language: string;
  switchTo: string;
  home: string;
  readMore: string;
  viewAll: string;
  allProjects: string;
  allInsights: string;
  toProject: string;
  toMethodology: string;
  toPeople: string;
  toWorkWithUs: string;
  toAbout: string;
  status: string;
  type: string;
  domain: string;
  methodology: string;
  stage: string;
  stages: string;
  source: string;
  topics: string;
  relatedProjects: string;
  relatedInsights: string;
  conceptNote: string;
  workingConcept: string;
  diagramFallback: string;
  onThisPage: string;
  institutionalAnchor: string;
  notFoundTitle: string;
  notFoundBody: string;
  backHome: string;
  copyright: string;
  statuses: Record<ProjectStatus, string>;
}

const messages: Record<Locale, Messages> = {
  bg: {
    skipToContent: "Към съдържанието",
    menu: "Меню",
    openMenu: "Отвори менюто",
    closeMenu: "Затвори менюто",
    primaryNav: "Основна навигация",
    footerNav: "Навигация в долния колонтитул",
    language: "Език",
    switchTo: "Switch to English",
    home: "Начало",
    readMore: "Прочетете",
    viewAll: "Всички",
    allProjects: "Всички проекти",
    allInsights: "Всички анализи",
    toProject: "Към проекта",
    toMethodology: "Пълната методология",
    toPeople: "Структура и екип",
    toWorkWithUs: "Пътища за сътрудничество",
    toAbout: "За центъра",
    status: "Статус",
    type: "Тип",
    domain: "Област",
    methodology: "Методология",
    stage: "Етап",
    stages: "Етапи",
    source: "Източник",
    topics: "Теми",
    relatedProjects: "Свързани проекти",
    relatedInsights: "Свързани анализи",
    conceptNote: "Концептуална бележка",
    workingConcept: "Работна концепция",
    diagramFallback: "Текстово описание на диаграмата",
    onThisPage: "На тази страница",
    institutionalAnchor: "Институционална основа",
    notFoundTitle: "Страницата не е намерена",
    notFoundBody: "Търсената страница не съществува или е преместена.",
    backHome: "Към началната страница",
    copyright: "Всички права запазени",
    statuses: {
      "pilot-concept": "Пилотна концепция",
      "proposed-mandate": "Предложен изследователски мандат",
      "in-development": "В разработка",
      "active-pilot": "Активен пилот",
      completed: "Завършен",
    },
  },
  en: {
    skipToContent: "Skip to content",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryNav: "Primary navigation",
    footerNav: "Footer navigation",
    language: "Language",
    switchTo: "Превключи на български",
    home: "Home",
    readMore: "Read",
    viewAll: "View all",
    allProjects: "All projects",
    allInsights: "All insights",
    toProject: "View the project",
    toMethodology: "The full methodology",
    toPeople: "Structure and team",
    toWorkWithUs: "Routes for collaboration",
    toAbout: "About the Center",
    status: "Status",
    type: "Type",
    domain: "Domain",
    methodology: "Methodology",
    stage: "Stage",
    stages: "Stages",
    source: "Source",
    topics: "Topics",
    relatedProjects: "Related projects",
    relatedInsights: "Related insights",
    conceptNote: "Concept note",
    workingConcept: "Working concept",
    diagramFallback: "Text description of the diagram",
    onThisPage: "On this page",
    institutionalAnchor: "Institutional anchor",
    notFoundTitle: "Page not found",
    notFoundBody: "The page you requested does not exist or has been moved.",
    backHome: "Back to the homepage",
    copyright: "All rights reserved",
    statuses: {
      "pilot-concept": "Pilot concept",
      "proposed-mandate": "Proposed research mandate",
      "in-development": "In development",
      "active-pilot": "Active pilot",
      completed: "Completed",
    },
  },
};

export function t(locale: Locale): Messages {
  return messages[locale];
}
