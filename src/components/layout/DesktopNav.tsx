"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export interface NavLink {
  href: string;
  label: string;
  emphasis?: boolean;
}

/** Marks the current section from the pathname (e.g. /bg/projects/x → Projects). */
export function isActivePath(pathname: string, linkHref: string): boolean {
  return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
}

export function DesktopNav({ links, label }: { links: NavLink[]; label: string }) {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {links.map((l) => {
          const active = isActivePath(pathname, l.href);
          return (
            <li key={l.href}>
              {l.emphasis ? (
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-ctrl border px-3.5 font-sans text-small font-medium transition-colors duration-150",
                    active ? "border-marine bg-marine text-on-dark" : "border-ink text-ink hover:border-marine hover:text-marine",
                  )}
                >
                  {l.label}
                </Link>
              ) : (
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
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
