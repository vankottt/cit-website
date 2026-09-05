import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { home } from "@/content/pages";
import { t } from "@/content/messages";

/**
 * Institutional network with confirmed relationships only: the UASG anchor
 * as a text lockup plus the planned agreement and council as status rows.
 * No logo wall; nothing implied beyond the sources.
 */
export function InstitutionalNetwork({ locale }: { locale: Locale }) {
  const m = t(locale);
  const c = home.network;
  return (
    <div className="border border-line">
      <div className="grid md:grid-cols-12">
        <div className="border-b border-line p-6 md:col-span-7 md:border-r md:border-b-0 md:p-8">
          <p className="label">{m.institutionalAnchor}</p>
          <p className="mt-4 font-serif text-h3 text-ink">{site.anchor[locale]}</p>
          <p className="mt-2 font-mono text-meta uppercase tracking-[0.06em] text-ink-3">{site.anchorShort[locale]}</p>
        </div>
        <dl className="divide-y divide-line md:col-span-5">
          <div className="flex items-start justify-between gap-6 p-6 md:p-8">
            <dt className="text-small font-medium text-ink">{c.agreementLabel[locale]}</dt>
            <dd className="label shrink-0 text-right">{c.agreementStatus[locale]}</dd>
          </div>
          <div className="flex items-start justify-between gap-6 p-6 md:p-8">
            <dt className="text-small font-medium text-ink">{c.councilLabel[locale]}</dt>
            <dd className="label shrink-0 text-right">{c.councilStatus[locale]}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
