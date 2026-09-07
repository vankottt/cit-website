import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { campusPhotos } from "@/content/media";
import { Container } from "@/components/layout/Container";

/**
 * Homepage network band: full-width marine plate (same section join as
 * Methodology), original UASG hall photograph, “old high-tech” grayscale,
 * scrim from the right so copy stays on the marine side. The copy column is
 * only as wide as the BG/EN heading on one line.
 */
export function NetworkAnchorPlate({
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
    <figure className="relative isolate overflow-hidden bg-marine text-on-dark">
      <div className="absolute inset-0">
        <Image
          src={photo.src}
          alt={photo.alt[locale]}
          fill
          sizes="100vw"
          className="network-anchor-photo object-cover object-[84%_center]"
        />
        <div className="network-anchor-grain" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-marine via-marine/88 to-marine/40 md:bg-gradient-to-l md:from-marine md:from-[42%] md:via-marine/78 md:to-marine/20"
        aria-hidden="true"
      />
      <Container className="relative z-10 pb-section pt-[calc(var(--spacing-section)+2.5rem)]">
        <div className="w-full max-w-[42rem] md:ml-auto">
          <p className="label-dark">{label}</p>
          <h2 id={headingId} className="mt-4 text-h2 text-on-dark hyphens-none max-md:text-pretty md:whitespace-nowrap">
            {heading}
          </h2>
          <p className="mt-5 max-w-[46ch] text-lead text-on-dark-muted">{lead}</p>
          <div className="mt-8 h-px w-10 bg-on-dark/30" aria-hidden="true" />
          <p className="mt-5 font-serif text-h3 text-on-dark">{site.anchorShort[locale]}</p>
          <p className="mt-2 max-w-[22ch] text-small text-on-dark-muted">{site.anchor[locale]}</p>
        </div>
      </Container>
    </figure>
  );
}
