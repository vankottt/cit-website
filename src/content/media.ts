import type { L } from "@/lib/i18n";

/**
 * Temporary UASG photography for V1 atmosphere only.
 * These assets do not depict CIT staff, laboratories, projects or results.
 * Replace before a final public launch — see docs/TEMP_IMAGE_SOURCES.md.
 */
export const campusPhotos = {
  facade: {
    src: "/images/temporary-uacg/campus-facade.jpg",
    width: 980,
    height: 663,
    alt: {
      bg: "Фасада на Университета по архитектура, строителство и геодезия в София, с името на университета над входа.",
      en: "Facade of the University of Architecture, Civil Engineering and Geodesy in Sofia, with the university name above the entrance.",
    } satisfies L,
    caption: {
      bg: "Кампусът на УАСГ, София. Временна снимка от официалния сайт на университета; не изобразява дейност на Центъра. За замяна преди окончателно публично пускане.",
      en: "UASG campus, Sofia. Temporary photograph from the university's official site; it does not depict Center activity. Replace before final public launch.",
    } satisfies L,
  },
  hall: {
    src: "/images/temporary-uacg/campus-hall.jpg",
    width: 999,
    height: 663,
    alt: {
      bg: "Коридор в УАСГ с изложбени табла на Хидротехническия факултет.",
      en: "A corridor at UASG with exhibition boards of the Faculty of Hydraulic Engineering.",
    } satisfies L,
    caption: {
      bg: "Интериор в УАСГ. Атмосферна снимка от официалния сайт на университета; не изобразява лаборатория, екип или проект на Центъра. За замяна преди окончателно публично пускане.",
      en: "Interior at UASG. Atmospheric photograph from the university's official site; it does not depict a Center laboratory, team or project. Replace before final public launch.",
    } satisfies L,
  },
} as const;

export type CampusPhotoId = keyof typeof campusPhotos;

/**
 * Infographic supplied for the confirmed UASG construction-game news article.
 * Credits on the graphic: idea and concept Dr Eng. Stanislav Darachev, © 2025.
 * It does not depict CIT laboratory, team or project activity.
 */
export const constructionGameInfographic = {
  id: "media-bulgarian-construction-game",
  src: "/images/news/bulgarian-construction-game.jpg",
  width: 1024,
  height: 571,
  byteSize: 179977,
  mimeType: "image/jpeg",
  alt: {
    bg: "Инфографика на „Българска строителна игра“: роли на инвеститори, строители и строителен надзор в симулация на общински строителен процес.",
    en: "Infographic of the Bulgarian Construction Game: roles of investors, builders and construction supervision in a simulated municipal construction process.",
  } satisfies L,
  caption: {
    bg: "Инфографика към „Българска строителна игра“. Идея и концепция: д-р инж. Станислав Дарачев, © 2025. Не изобразява дейност или резултат на Центъра.",
    en: "Infographic for the Bulgarian Construction Game. Idea and concept: Dr Eng. Stanislav Darachev, © 2025. Does not depict Center activity or results.",
  } satisfies L,
} as const;

/**
 * Generated demonstration photographs for public News samples.
 * They do not depict CIT staff, fieldwork, teaching, sites or results.
 * Never seed into CMS.
 */
export const DEV_NEWS_FIXTURE_MEDIA_ID_PREFIX = "media-dev-fixture-";

export const devNewsFixturePhotos = {
  coastalWaterSampling: {
    id: `${DEV_NEWS_FIXTURE_MEDIA_ID_PREFIX}coastal-water-sampling`,
    src: "/images/dev-fixtures/coastal_water_sampling_fieldwork.png",
    width: 1024,
    height: 768,
    byteSize: 1083905,
    mimeType: "image/png",
    alt: {
      bg: "Демонстрационно изображение: човек измерва показатели на крайбрежна вода с портативен уред. Генерирана фикстура; не изобразява дейност на Центъра.",
      en: "Demonstration image: a person measuring coastal water with a handheld instrument. Generated fixture; it does not depict Center activity.",
    } satisfies L,
    caption: {
      bg: "Генерирана демонстрационна фотография за изпитване на новинарския интерфейс. Не е снимка на Центъра.",
      en: "Generated demonstration photograph for News UI testing. Not a Center photograph.",
    } satisfies L,
  },
  coastalResilienceClassroom: {
    id: `${DEV_NEWS_FIXTURE_MEDIA_ID_PREFIX}coastal-resilience-classroom`,
    src: "/images/dev-fixtures/coastal_resilience_classroom_presentation.png",
    width: 1024,
    height: 768,
    byteSize: 990346,
    mimeType: "image/png",
    alt: {
      bg: "Демонстрационно изображение: преподавател показва карта на крайбрежна устойчивост пред аудитория. Генерирана фикстура; не изобразява обучение на Центъра.",
      en: "Demonstration image: an instructor presenting a coastal-resilience map to a class. Generated fixture; it does not depict Center teaching.",
    } satisfies L,
    caption: {
      bg: "Генерирана демонстрационна фотография за изпитване на новинарския интерфейс. Не е снимка на Центъра.",
      en: "Generated demonstration photograph for News UI testing. Not a Center photograph.",
    } satisfies L,
  },
  goldenHourVineyard: {
    id: `${DEV_NEWS_FIXTURE_MEDIA_ID_PREFIX}golden-hour-vineyard`,
    src: "/images/dev-fixtures/golden_hour_vineyard_terrace.png",
    width: 1024,
    height: 768,
    byteSize: 1258876,
    mimeType: "image/png",
    alt: {
      bg: "Демонстрационно изображение: чаша вино и лозе при залез. Генерирана фикстура; не изобразява обект или резултат на Центъра.",
      en: "Demonstration image: a glass of wine and a vineyard at sunset. Generated fixture; it does not depict a Center site or result.",
    } satisfies L,
    caption: {
      bg: "Генерирана демонстрационна фотография за изпитване на новинарския интерфейс. Не е снимка на Центъра.",
      en: "Generated demonstration photograph for News UI testing. Not a Center photograph.",
    } satisfies L,
  },
} as const;

export type DevNewsFixturePhotoId = keyof typeof devNewsFixturePhotos;

/** Locale-paired diagrams for Insights analyses. Ids end in `-bg` / `-en`. */
export const ANALYSIS_MEDIA_ID_PREFIX = "media-analysis-";

function analysisPhoto(
  slug: string,
  locale: "bg" | "en",
  file: string,
  byteSize: number,
  alt: L,
  caption: L,
) {
  return {
    id: `${ANALYSIS_MEDIA_ID_PREFIX}${slug}-${locale}`,
    src: `/images/insights/${file}`,
    width: 1024,
    height: 571,
    byteSize,
    mimeType: "image/jpeg",
    alt,
    caption,
  } as const;
}

export const analysisInsightPhotos = {
  feedbackLoopBg: analysisPhoto(
    "closed-feedback-loop",
    "bg",
    "closed-feedback-loop-bg.jpg",
    50275,
    {
      bg: "Диаграма на затворен цикъл: стимул, откриване, реакция и обратна връзка.",
      en: "Diagram of a closed loop: stimulus, detection, response and feedback, labelled in Bulgarian.",
    },
    {
      bg: "Графика 1. Затворен цикъл на обратна връзка. Редакционна диаграма, не е измерим резултат на Центъра.",
      en: "Graphic 1. Closed feedback loop. Editorial diagram; not a measured Center result.",
    },
  ),
  feedbackLoopEn: analysisPhoto(
    "closed-feedback-loop",
    "en",
    "closed-feedback-loop-en.jpg",
    72164,
    {
      bg: "Диаграма на кръгов цикъл на обратна връзка: stimulus, detection, response, feedback.",
      en: "Circular feedback loop diagram: stimulus, detection, response and feedback.",
    },
    {
      bg: "Графика 1. Затворен цикъл на обратна връзка (английска версия). Редакционна диаграма, не е измерим резултат на Центъра.",
      en: "Graphic 1. Closed feedback loop. Editorial diagram; not a measured Center result.",
    },
  ),
  hierarchyNetworkBg: analysisPhoto(
    "hierarchy-network",
    "bg",
    "hierarchy-network-bg.jpg",
    83445,
    {
      bg: "Сравнение между йерархия на четири нива и мрежова система от възли.",
      en: "Comparison of a four-level hierarchy and a networked node system, labelled in Bulgarian.",
    },
    {
      bg: "Графика 2. Йерархия и мрежова структура. Редакционна диаграма, не е организационна схема на Центъра.",
      en: "Graphic 2. Hierarchy versus network structure. Editorial diagram; not an org chart of the Center.",
    },
  ),
  hierarchyNetworkEn: analysisPhoto(
    "hierarchy-network",
    "en",
    "hierarchy-network-en.jpg",
    49363,
    {
      bg: "Сравнение между проста пирамида и свързана мрежова решетка.",
      en: "Comparison of a simple pyramid and a connected network grid.",
    },
    {
      bg: "Графика 2. Йерархия и мрежова структура (английска версия). Редакционна диаграма, не е организационна схема на Центъра.",
      en: "Graphic 2. Hierarchy versus network structure. Editorial diagram; not an org chart of the Center.",
    },
  ),
  decisionTreeBg: analysisPhoto(
    "algorithmic-decision-tree",
    "bg",
    "algorithmic-decision-tree-bg.jpg",
    39540,
    {
      bg: "Алгоритмично дърво: начало, решение, опция А и опция Б с крайни състояния.",
      en: "Algorithmic decision tree in Bulgarian: start, decision, option A and option B with end states.",
    },
    {
      bg: "Графика 3. Алгоритмично дърво на решенията. Редакционна диаграма, не е работеща информационна система на Центъра.",
      en: "Graphic 3. Algorithmic decision tree. Editorial diagram; not a live Center information system.",
    },
  ),
  decisionTreeEn: analysisPhoto(
    "algorithmic-decision-tree",
    "en",
    "algorithmic-decision-tree-en.jpg",
    35419,
    {
      bg: "Алгоритмично дърво: START, DECISION, OPTION A, OPTION B и стъпки.",
      en: "Algorithmic decision tree: start, decision, option A, option B and subsequent steps.",
    },
    {
      bg: "Графика 3. Алгоритмично дърво на решенията (английска версия). Редакционна диаграма, не е работеща информационна система на Центъра.",
      en: "Graphic 3. Algorithmic decision tree. Editorial diagram; not a live Center information system.",
    },
  ),
} as const;

export type AnalysisInsightPhotoId = keyof typeof analysisInsightPhotos;

/**
 * Homepage overlay clip. Source file: `Video/202609062306.mp4` (colour, 3 min).
 * Production web loop is the full grayscale H.264 encode at the source frame rate:
 * - `/videos/hero.mp4` — 1920×1080, ~57 MiB, ~30 fps, 3:00
 * - `/videos/hero-mobile.mp4` — 960×540, ~19 MiB, ~30 fps, 3:00
 * Poster is a frame from that encode. The footage shows transport
 * infrastructure; it is not presented as CIT laboratory, team or project activity.
 * The clip is preloaded (`preload="auto"`); the poster is still the first paint.
 */
export const heroVideo = {
  src: "/videos/hero.mp4",
  mobileSrc: "/videos/hero-mobile.mp4",
  poster: {
    src: "/images/hero/poster.jpg",
    width: 1920,
    height: 1080,
    alt: {
      bg: "Въздушен кадър на автомагистрален мост над долина в мъгла.",
      en: "Aerial view of a highway bridge over a fog-filled valley.",
    } satisfies L,
  },
} as const;
