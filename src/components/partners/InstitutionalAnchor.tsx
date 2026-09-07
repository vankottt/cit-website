import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { campusPhotos } from "@/content/media";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { CampusFigure } from "@/components/editorial/CampusFigure";

/**
 * Homepage institutional statement: UASG only, no planned-partner rows.
 * Atmosphere photograph stays captioned as temporary UASG imagery.
 */
export function InstitutionalAnchor({
  locale,
  label,
  heading,
  headingId,
  lead,
}: {
  locale: Locale;
  label: string;
  heading: string;
  headingId: string;
  lead: string;
}) {
  const photo = campusPhotos.hall;

  return (
    <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <SectionHeading label={label} heading={heading} id={headingId} lead={lead} />
        <p className="mt-8 font-serif text-h3 text-ink">{site.anchorShort[locale]}</p>
        <p className="mt-2 max-w-[34ch] text-small text-ink-2">{site.anchor[locale]}</p>
      </div>
      <div className="lg:col-span-7">
        <CampusFigure
          photo="hall"
          locale={locale}
          sizes="(min-width: 1024px) 640px, 92vw"
          ratio="aspect-[16/10]"
          imageClassName="img-mono object-[84%_center]"
        />
        <p className="mt-3 max-w-[62ch] text-meta text-ink-3">{photo.caption[locale]}</p>
      </div>
    </div>
  );
}
