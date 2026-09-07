import { isDevFixturesEnabled } from "./dev-fixtures";
import type { Person } from "./types";

/**
 * People confirmed for a public profile. Roles stay omitted until they are
 * formally confirmed. Academic/professional titles in `name` are supplied
 * with the portrait, not invented CIT appointments. Public portraits are
 * grayscale cutouts over a geometric plate; colour belongs to the plate.
 */
const confirmedPeople: Person[] = [
  {
    slug: "b-tsankov",
    name: { bg: "доц. д-р инж. Борис Цанков", en: "Assoc. Prof. Dr. Eng. Boris Tsankov" },
    expertise: { bg: [], en: [] },
    bio: { bg: [], en: [] },
    portrait: {
      src: "/images/team/b-tsankov-portrait-v2.png",
      width: 1254,
      height: 1254,
    },
  },
  {
    slug: "georgi-vassilev",
    name: { bg: "Георги Василев", en: "Georgi Vassilev" },
    expertise: { bg: [], en: [] },
    bio: { bg: [], en: [] },
    portrait: {
      src: "/images/team/georgi-vassilev-portrait-v2.png",
      width: 1254,
      height: 1254,
    },
  },
  {
    slug: "ivan-todorov",
    name: { bg: "инж. Иван Тодоров", en: "Eng. Ivan Todorov" },
    expertise: { bg: [], en: [] },
    bio: { bg: [], en: [] },
    portrait: {
      src: "/images/team/ivan-todorov-portrait-v2.png",
      width: 1254,
      height: 1254,
    },
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/ivan-todorov-30152428/" }],
  },
];

const devFixtures: Person[] = [
  {
    slug: "dev-fixture-researcher",
    name: { bg: "[Фикстура] Име Фамилия", en: "[Fixture] First Last" },
    role: { bg: "[Фикстура] Роля за разработка", en: "[Fixture] Development role" },
    affiliation: { bg: "[Фикстура] Институция", en: "[Fixture] Institution" },
    expertise: { bg: ["Системно инженерство", "Статистика"], en: ["Systems engineering", "Statistics"] },
    bio: {
      bg: ["Това е фикстура за разработка. Не представлява реално лице и не се показва в производствената версия."],
      en: ["This is a development fixture. It does not represent a real person and is never rendered in production."],
    },
  },
];

export const devFixturesEnabled = isDevFixturesEnabled();

export const people: Person[] = devFixturesEnabled ? [...confirmedPeople, ...devFixtures] : confirmedPeople;

/** Empty portrait slots after the named team. Not people records. */
export const teamUpcomingCount = 1;

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}

/** Attach seed portrait and verified links when the CMS record has the same slug. */
export function withSeedPortrait(person: Person): Person {
  const seed = people.find((p) => p.slug === person.slug);
  if (!seed) return person;
  return {
    ...person,
    portrait: person.portrait ?? seed.portrait,
    links: person.links?.length ? person.links : seed.links,
  };
}

export function linkedInHref(person: Person): string | undefined {
  for (const link of person.links ?? []) {
    try {
      const host = new URL(link.url).hostname.replace(/^www\./i, "").toLowerCase();
      if (host === "linkedin.com" || host.endsWith(".linkedin.com")) return link.url;
    } catch {
      /* skip malformed URLs */
    }
  }
  return undefined;
}

export function publicTeamList(fromCms: Person[]): Person[] {
  if (fromCms.length) {
    const bySlug = new Map(fromCms.map((p) => [p.slug, withSeedPortrait(p)]));
    const ordered = people.map((seed) => bySlug.get(seed.slug)).filter((p): p is Person => Boolean(p));
    const extras = fromCms.filter((p) => !people.some((seed) => seed.slug === p.slug)).map(withSeedPortrait);
    return [...ordered, ...extras];
  }
  return people;
}
