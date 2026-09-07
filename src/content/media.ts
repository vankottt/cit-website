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

/**
 * Homepage overlay clip. Source file: `Video/202609062306.mp4` (colour, 3 min).
 * Production web loop is a 15s grayscale H.264 excerpt:
 * - `/videos/hero.mp4` — 1920×1080, ~2.3 MiB
 * - `/videos/hero-mobile.mp4` — 960×540, ~0.5 MiB
 * Poster is a frame from that encode. The footage shows transport
 * infrastructure; it is not presented as CIT laboratory, team or project activity.
 * Video is not preloaded; the poster is the first paint.
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
