import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/paths";
import { primaryNav } from "@/content/site";
import { t } from "@/content/messages";
import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader({ locale, activeKey }: { locale: Locale; activeKey?: RouteKey }) {
  const m = t(locale);
  const links = primaryNav.map((item) => ({
    href: href(locale, item.key),
    label: item.label[locale],
    emphasis: item.key === "work-with-us",
    active: item.key === activeKey,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[2px] [--header-h:4.5rem]">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo locale={locale} />

        <nav aria-label={m.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                {l.emphasis ? (
                  <Link
                    href={l.href}
                    aria-current={l.active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-ctrl border px-3.5 font-sans text-small font-medium transition-colors duration-150",
                      l.active ? "border-marine bg-marine text-on-dark" : "border-ink text-ink hover:border-marine hover:text-marine",
                    )}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <Link
                    href={l.href}
                    aria-current={l.active ? "page" : undefined}
                    className={cn(
                      "relative py-2 font-sans text-small font-medium transition-colors duration-150 hover:text-ink",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-amber after:transition-transform after:duration-200 after:ease-out-soft hover:after:scale-x-100",
                      l.active ? "text-ink after:scale-x-100" : "text-ink-2",
                    )}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher current={locale} label={m.language} className="hidden lg:flex" />
          <MobileMenu
            locale={locale}
            links={links}
            labels={{ open: m.openMenu, close: m.closeMenu, menu: m.menu, language: m.language }}
          />
        </div>
      </Container>
    </header>
  );
}
