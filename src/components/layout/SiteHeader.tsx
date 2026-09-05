import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { primaryNav } from "@/content/site";
import { t } from "@/content/messages";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { DesktopNav } from "./DesktopNav";

export function SiteHeader({ locale }: { locale: Locale }) {
  const m = t(locale);
  const links = primaryNav.map((item) => ({
    href: href(locale, item.key),
    label: item.label[locale],
    emphasis: item.key === "work-with-us",
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper [--header-h:4.5rem]">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo locale={locale} />
        <DesktopNav links={links} label={m.primaryNav} />
        <div className="flex items-center gap-4">
          <LanguageSwitcher current={locale} label={m.language} className="hidden lg:flex" />
          <MobileMenu locale={locale} links={links} labels={{ open: m.openMenu, close: m.closeMenu, menu: m.menu, language: m.language }} />
        </div>
      </Container>
    </header>
  );
}
