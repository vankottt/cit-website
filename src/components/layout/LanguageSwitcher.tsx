"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale, localeLabels } from "@/lib/i18n";
import { switchLocalePath } from "@/lib/paths";
import { cn } from "@/lib/cn";

/**
 * BG / EN switch preserving the current route. Renders both locales so the
 * active one is visible; the inactive one is a link with hreflang/lang.
 */
export function LanguageSwitcher({
  current,
  tone = "ink",
  label,
  className,
}: {
  current: Locale;
  tone?: "ink" | "on-dark";
  label: string;
  className?: string;
}) {
  const pathname = usePathname() || `/${current}`;
  const dark = tone === "on-dark";

  return (
    <nav aria-label={label} className={cn("flex items-center font-mono text-[0.75rem] uppercase tracking-[0.06em]", className)}>
      {locales.map((loc, i) => {
        const active = loc === current;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden="true" className={cn("mx-2 h-3 w-px", dark ? "bg-on-dark/30" : "bg-line-strong")} />
            ) : null}
            {active ? (
              <span aria-current="true" lang={localeLabels[loc].htmlLang} className={cn("font-medium", dark ? "text-on-dark" : "text-ink")}>
                {localeLabels[loc].short}
                <span className="sr-only"> — {localeLabels[loc].long}</span>
              </span>
            ) : (
              <Link
                href={switchLocalePath(pathname, loc)}
                hrefLang={localeLabels[loc].htmlLang}
                lang={localeLabels[loc].htmlLang}
                className={cn(
                  "transition-colors duration-150",
                  dark ? "text-on-dark-muted hover:text-on-dark" : "text-ink-3 hover:text-ink",
                )}
              >
                {localeLabels[loc].short}
                <span className="sr-only"> — {localeLabels[loc].long}</span>
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
