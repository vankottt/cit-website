import type { Locale } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";
import { site } from "@/content/site";

/**
 * Organization structured data with confirmed fields only:
 * name, alternate name, description, URL, parent organization (UASG).
 * No address, telephone, email, logo claims or founding date.
 * Rendered as script text (with "<" escaped) as recommended by the Next.js docs.
 */
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ResearchOrganization",
    name: site.name[locale],
    alternateName: [site.short[locale], site.name[locale === "bg" ? "en" : "bg"]],
    description: site.description[locale],
    url: `${siteUrl()}/${locale}`,
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: site.anchor[locale],
      alternateName: site.anchorShort[locale],
    },
  };
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json">{json}</script>;
}
