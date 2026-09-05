"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isActivePath, type NavLink } from "./DesktopNav";

export function MobileMenu({
  locale,
  links,
  labels,
}: {
  locale: Locale;
  links: NavLink[];
  labels: { open: string; close: string; menu: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes; lock body scroll while open; move focus into the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-ctrl text-ink transition-colors duration-150 hover:bg-paper-2"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto bg-paper",
          open && "motion-safe:animate-[menu-in_180ms_var(--ease-out-soft)]",
        )}
      >
        <nav aria-label={labels.menu} className="container-site pt-4 pb-10">
          <ul className="divide-y divide-line border-b border-line">
            {links.map((l, i) => {
              const active = isActivePath(pathname ?? "", l.href);
              return (
              <li key={l.href}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-4 font-serif text-[1.5rem] leading-tight tracking-[-0.01em] text-ink transition-colors duration-150 hover:text-marine",
                    l.emphasis && "font-medium",
                  )}
                >
                  {l.label}
                  <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", active ? "bg-amber" : "bg-transparent")} />
                </Link>
              </li>
              );
            })}
          </ul>
          <div
            className="mt-8 flex items-center justify-between"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) setOpen(false);
            }}
          >
            <span className="label">{labels.language}</span>
            <LanguageSwitcher current={locale} label={labels.language} />
          </div>
        </nav>
      </div>
    </div>
  );
}
