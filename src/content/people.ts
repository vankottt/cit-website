import type { Person } from "./types";

/**
 * Confirmed people with confirmed CIT roles. None have been confirmed for
 * publication yet, so the production list is empty by design.
 *
 * Development fixtures (for exercising the people components) are only
 * included when CIT_DEV_FIXTURES=1 is set at build time and are never part
 * of the public content.
 */
const confirmedPeople: Person[] = [];

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

export const devFixturesEnabled = process.env.CIT_DEV_FIXTURES === "1" && process.env.NODE_ENV !== "production";

export const people: Person[] = devFixturesEnabled ? [...confirmedPeople, ...devFixtures] : confirmedPeople;

export function getPerson(slug: string): Person | undefined {
  return people.find((p) => p.slug === slug);
}
