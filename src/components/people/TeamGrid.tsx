import type { Locale } from "@/lib/i18n";
import type { Person } from "@/content/types";
import { t } from "@/content/messages";
import { linkedInHref } from "@/content/people";
import { cn } from "@/lib/cn";
import { LinkedInIcon } from "@/components/ui/Icons";
import { PersonPortrait, PersonPortraitVacant } from "./PersonPortrait";

/** Uncarded portrait grid — cutout, optional LinkedIn, confirmed role only. */
export function TeamGrid({
  people,
  locale,
  className,
  upcomingCount = 0,
}: {
  people: Person[];
  locale: Locale;
  className?: string;
  upcomingCount?: number;
}) {
  const m = t(locale);
  if (!people.length && upcomingCount < 1) return null;
  const upcoming = Array.from({ length: upcomingCount }, (_, i) => i);

  return (
    <ul className={cn("grid grid-cols-3 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-12", className)}>
      {people.map((person) => {
        const linkedIn = linkedInHref(person);
        const name = person.name[locale];
        return (
          <li key={person.slug} className="person-tile w-full max-w-[14.5rem] text-center">
            {person.portrait ? (
              <PersonPortrait src={person.portrait.src} alt={name} />
            ) : (
              <PersonPortraitVacant />
            )}
            {linkedIn ? (
              <a
                href={linkedIn}
                rel="noopener noreferrer"
                target="_blank"
                aria-label={`${m.linkedInProfile}: ${name}`}
                className="group mt-4 inline-flex flex-col items-center no-underline outline-offset-4 focus-visible:outline-2 focus-visible:outline-amber"
              >
                <span className="min-h-[2.7em] font-serif text-h4 text-pretty text-ink transition-colors duration-150 motion-reduce:transition-none group-hover:text-marine group-focus-visible:text-marine">
                  {name}
                </span>
                <span className="mt-1 inline-flex min-h-11 min-w-11 items-center justify-center text-ink-2 transition-colors duration-150 motion-reduce:transition-none group-hover:text-marine group-focus-visible:text-marine">
                  <LinkedInIcon size={15} />
                </span>
              </a>
            ) : (
              <p className="mt-4 min-h-[2.7em] font-serif text-h4 text-pretty text-ink">{name}</p>
            )}
            {person.role ? <p className="mt-1 text-small text-ink-2">{person.role[locale]}</p> : null}
            {person.affiliation ? <p className="mt-0.5 text-small text-ink-3">{person.affiliation[locale]}</p> : null}
          </li>
        );
      })}
      {upcoming.map((i) => (
        <li key={`upcoming-${i}`} className="max-w-[11rem] text-center">
          <PersonPortraitVacant />
          <p className="mt-4 text-small text-pretty text-ink-3">{m.teamUpcoming}</p>
        </li>
      ))}
    </ul>
  );
}
