import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

export type HeroLayout = "split" | "stacked";

/**
 * Editorial hero.
 *  - "split":   statement + lead + actions left (7), system drawing right (5).
 *  - "stacked": statement across the container, then lead + actions (6) beside the drawing (6).
 * Both stack statement → lead → actions → drawing on mobile.
 */
export function Hero({
  headline,
  lead,
  primary,
  secondary,
  visual,
  layout = "split",
}: {
  headline: string;
  lead: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  visual?: ReactNode;
  layout?: HeroLayout;
}) {
  const actions = (
    <div className="mt-9 flex flex-wrap gap-3">
      <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
      {secondary ? (
        <ButtonLink href={secondary.href} variant="secondary" arrow={false}>
          {secondary.label}
        </ButtonLink>
      ) : null}
    </div>
  );

  if (layout === "stacked") {
    return (
      <section className="bg-paper">
        <Container className="pt-14 pb-12 md:pt-20 md:pb-14 lg:pt-20 lg:pb-16">
          <h1 className="text-hero max-w-[24ch] text-pretty text-ink lg:max-w-[30ch]">{headline}</h1>
          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 lg:pr-8">
              <p className="max-w-[58ch] text-lead text-ink-2">{lead}</p>
              {actions}
            </div>
            {visual ? <div className="lg:col-span-6 lg:-mt-2">{visual}</div> : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-paper">
      <Container className="grid gap-12 pt-14 pb-16 md:pt-20 md:pb-20 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-24">
        <div className={cn("lg:col-span-7 lg:pr-6")}>
          <h1 className="text-hero max-w-[26ch] text-pretty text-ink">{headline}</h1>
          <p className="mt-7 max-w-[58ch] text-lead text-ink-2">{lead}</p>
          {actions}
        </div>
        {visual ? <div className="lg:col-span-5 lg:self-center">{visual}</div> : null}
      </Container>
    </section>
  );
}
