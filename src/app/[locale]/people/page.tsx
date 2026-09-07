import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { peoplePage as c } from "@/content/pages";
import { disciplines } from "@/content/methodology";
import { publicTeamList, teamUpcomingCount } from "@/content/people";
import { listPublicPeople } from "@/lib/cms/repository";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { GovernanceList } from "@/components/people/GovernanceList";
import { TeamGrid } from "@/components/people/TeamGrid";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  return pageMetadata({ locale, key: "people", title: c.meta.title[locale], description: c.meta.description[locale] });
}

export default async function PeoplePage({ params }: Params) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const publishedPeople = await listPublicPeople();
  const list = publicTeamList(publishedPeople);

  return (
    <>
      <PageHeader label={c.meta.title[locale]} heading={c.heading[locale]} lead={c.lead[locale]} />

      <Section id="team" labelledBy="team-heading" size="sm">
        <SectionHeading label={c.team.label[locale]} heading={c.team.heading[locale]} id="team-heading" align="split">
          {list.length === 0 ? <p className="border-l-2 border-amber pl-4 text-body text-ink-2">{c.teamEmpty[locale]}</p> : null}
        </SectionHeading>
        {list.length > 0 || teamUpcomingCount ? (
          <TeamGrid people={list} locale={locale} upcomingCount={teamUpcomingCount} className="mt-12" />
        ) : null}
      </Section>

      <Section id="structure" labelledBy="structure-heading" size="sm">
        <SectionHeading label={c.structure.label[locale]} heading={c.structure.heading[locale]} id="structure-heading" lead={c.structureNote[locale]} align="split" />
        <GovernanceList locale={locale} className="mt-12" />
        <p className="mt-6 max-w-3xl text-small text-ink-3">{c.teamsNote[locale]}</p>
      </Section>

      <Section id="disciplines" tone="tint" labelledBy="disciplines-heading" size="sm">
        <SectionHeading label={c.disciplines.label[locale]} heading={c.disciplines.heading[locale]} id="disciplines-heading" align="split">
          <ol className="grid gap-x-8 sm:grid-cols-2">
            {disciplines[locale].map((d, i) => (
              <li key={d} className="flex gap-3 border-b border-line py-3 text-body text-ink">
                <span className="label mt-1.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ol>
        </SectionHeading>
      </Section>
    </>
  );
}
