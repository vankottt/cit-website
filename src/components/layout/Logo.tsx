import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import markColor from "../../../public/brand/cit-mark.png";
import markWhite from "../../../public/brand/cit-mark-white.png";

/** Supplied CIT mark from Logo/Logo.jpg — colour on paper, light knockout on marine. */
export function Mark({ className, size = 40, tone = "ink" }: { className?: string; size?: number; tone?: "ink" | "on-dark" }) {
  return (
    <Image
      src={tone === "ink" ? markColor : markWhite}
      alt=""
      width={size}
      height={size}
      priority
      className={cn("shrink-0 select-none object-contain", className)}
      sizes={`${size * 2}px`}
    />
  );
}

export function Logo({
  locale,
  tone = "ink",
  className,
  markSize = 40,
  layout = "compact",
}: {
  locale: Locale;
  tone?: "ink" | "on-dark";
  className?: string;
  markSize?: number;
  layout?: "compact" | "lockup";
}) {
  const dark = tone === "on-dark";
  const [line1, line2] = site.nameLines[locale];
  const lockup = layout === "lockup";

  return (
    <Link
      href={href(locale, "home")}
      aria-label={`${site.name[locale]}, ${site.anchorShort[locale]}`}
      className={cn("group inline-flex min-w-0 items-center no-underline", dark ? "text-on-dark" : "text-ink", lockup ? "gap-3.5" : "gap-3", className)}
    >
      <Mark tone={tone} size={markSize} />
      {lockup ? <span className={cn("w-px shrink-0 self-stretch", dark ? "bg-on-dark/25" : "bg-ink/20")} aria-hidden="true" /> : null}
      <span className="flex min-w-0 flex-col leading-none">
        {lockup ? (
          <span className="font-serif text-[1.125rem] font-semibold tracking-[-0.015em] sm:text-[1.25rem]" aria-hidden="true">
            <span className="block leading-[1.15] whitespace-nowrap">{line1}</span>
            <span className="block leading-[1.15] whitespace-nowrap">{line2}</span>
          </span>
        ) : (
          <span className="font-serif text-[1.25rem] font-medium tracking-[-0.01em] sm:text-[1.375rem]">{site.name[locale]}</span>
        )}
        {lockup ? (
          <span className={cn("mt-1.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.14em]", dark ? "text-on-dark-muted" : "text-ink-3")} aria-hidden="true">
            {site.anchorShort[locale]}
          </span>
        ) : (
          <span className={cn("mt-2 font-mono text-[0.8125rem] uppercase tracking-[0.06em]", dark ? "text-on-dark-muted" : "text-ink-3")}>
            {site.anchorShort[locale]}
          </span>
        )}
      </span>
    </Link>
  );
}
