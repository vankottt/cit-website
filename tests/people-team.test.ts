import { describe, expect, it } from "vitest";
import { people, publicTeamList, teamUpcomingCount, joinSlotCount, linkedInHref } from "../src/content/people";

describe("public team", () => {
  it("lists Boris, then Georgi Vassilev, then Ivan Todorov", () => {
    expect(people.map((p) => p.slug)).toEqual(["b-tsankov", "georgi-vassilev", "ivan-todorov"]);
    expect(people[2]?.portrait?.src).toBe("/images/team/ivan-todorov-portrait-v2.png");
    expect(people[2]?.name.bg).toBe("инж. Иван Тодоров");
    expect(people[2]?.name.en).toBe("Eng. Ivan Todorov");
    expect(people[2]?.role).toBeUndefined();
  });

  it("keeps seed order when CMS returns the same people shuffled", () => {
    const shuffled = [people[2]!, people[0]!, people[1]!];
    expect(publicTeamList(shuffled).map((p) => p.slug)).toEqual(["b-tsankov", "georgi-vassilev", "ivan-todorov"]);
  });

  it("reserves a single quiet slot for profiles still to be announced", () => {
    expect(teamUpcomingCount).toBe(1);
    expect(joinSlotCount(people)).toBe(1);
    expect(
      joinSlotCount([...people, { slug: "dev-fixture-researcher", name: { bg: "", en: "" }, expertise: { bg: [], en: [] }, bio: { bg: [], en: [] } }]),
    ).toBe(0);
  });

  it("exposes a LinkedIn URL only when it is confirmed", () => {
    expect(linkedInHref(people[0]!)).toBeUndefined();
    expect(linkedInHref(people[1]!)).toBeUndefined();
    expect(linkedInHref(people[2]!)).toBe("https://www.linkedin.com/in/ivan-todorov-30152428/");
  });
});
