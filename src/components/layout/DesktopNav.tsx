"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { RouteKey } from "@/lib/paths";
import { homeHashHref, isActivePath } from "@/lib/home-nav";
import { cn } from "@/lib/cn";
import { scrollToHomeHash } from "./useHomeSectionSpy";

export interface NavLink {
  href: string;
  label: string;
  emphasis?: boolean;
  navKey: RouteKey;
}

export function DesktopNav({
  locale,
  links,
  label,
  pathname,
  onHome,
  spyKey,
}: {
  locale: Locale;
  links: NavLink[];
  label: string;
  pathname: string;
  onHome: boolean;
  spyKey: RouteKey | null;
}) {
  return (
    <nav aria-label={label} className="hidden xl:block">
      <ul className="flex items-center gap-5 2xl:gap-7">
        {links.map((l) => {
          const hashHref = onHome ? homeHashHref(locale, l.navKey) : null;
          const href = hashHref ?? l.href;
          const active = onHome ? spyKey === l.navKey : isActivePath(pathname, l.href);
          return (
            <li key={l.navKey}>
              {l.emphasis ? (
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (hashHref && scrollToHomeHash(hashHref)) e.preventDefault();
                  }}
                  className={cn(
                    "inline-flex h-9 items-center rounded-ctrl border px-3.5 font-sans text-small font-medium transition-colors duration-150",
                    active ? "border-marine bg-marine text-on-dark" : "border-ink text-ink hover:border-marine hover:text-marine",
                  )}
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => {
                    if (hashHref && scrollToHomeHash(hashHref)) e.preventDefault();
                  }}
                  className={cn(
                    "relative py-2 font-sans text-small font-medium transition-colors duration-150 hover:text-ink",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-200 after:ease-out-soft hover:after:scale-x-100",
                    active ? "text-ink after:scale-x-100" : "text-ink-2",
                  )}
                >
                  {l.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
