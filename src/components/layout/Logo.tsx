import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import markColor from "../../../public/brand/cit-mark.png";
import markWhite from "../../../public/brand/cit-mark-white.png";

/** The supplied CIT mark (Logo/Logo.jpg), background-removed; white knockout on dark surfaces. */
export function Mark({ className, size = 40, tone = "ink" }: { className?: string; size?: number; tone?: "ink" | "on-dark" }) {
  return (
    <Image
      src={tone === "ink" ? markColor : markWhite}
      alt=""
      width={size}
      height={size}
      priority
      className={cn("shrink-0 select-none", className)}
      sizes={`${size * 2}px`}
    />
  );
}

export function Logo({ locale, tone = "ink", className }: { locale: Locale; tone?: "ink" | "on-dark"; className?: string }) {
  const dark = tone === "on-dark";
  return (
    <Link
      href={href(locale, "home")}
      className={cn("group inline-flex items-center gap-3 no-underline", dark ? "text-on-dark" : "text-ink", className)}
      aria-label={`${site.name[locale]} — ${site.anchorShort[locale]}`}
    >
      <Mark tone={tone} size={40} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.05rem] font-medium tracking-[-0.005em] sm:text-[1.125rem]">{site.name[locale]}</span>
        <span className={cn("mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em]", dark ? "text-on-dark-muted" : "text-ink-3")}>
          {site.anchorShort[locale]}
        </span>
      </span>
    </Link>
  );
}
