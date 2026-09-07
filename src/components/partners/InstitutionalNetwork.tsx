import type { Locale } from "@/lib/i18n";
import { site } from "@/content/site";
import { home } from "@/content/pages";
import { t } from "@/content/messages";

/**
 * Institutional network with confirmed relationships only: the UASG anchor
 * as a text lockup plus the planned agreement and council as status rows.
 * No logo wall; nothing implied beyond the sources.
 *
 * `panel` — lockup + status (About).
 * `status` — hairline rows only; the homepage plate already carries the UASG name.
 */
export function InstitutionalNetwork({
  locale,
  variant = "panel",
}: {
  locale: Locale;
  variant?: "panel" | "status";
}) {
  const m = t(locale);
  const c = home.network;
  const status = (
    <dl className={variant === "status" ? "grid gap-6 sm:grid-cols-2" : "divide-y divide-line md:col-span-5"}>
      <div
        className={
          variant === "status"
            ? "flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            : "flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:p-8"
        }
      >
        <dt className="text-small font-medium text-ink">{c.agreementLabel[locale]}</dt>
        <dd className="label sm:text-right">{c.agreementStatus[locale]}</dd>
      </div>
      <div
        className={
          variant === "status"
            ? "flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            : "flex flex-col gap-2 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6 md:p-8"
        }
      >
        <dt className="text-small font-medium text-ink">{c.councilLabel[locale]}</dt>
        <dd className="label sm:text-right">{c.councilStatus[locale]}</dd>
      </div>
    </dl>
  );

  if (variant === "status") {
    return <div className="border-t border-line pt-6">{status}</div>;
  }

  return (
    <div className="border border-line">
      <div className="grid md:grid-cols-12">
        <div className="border-b border-line p-6 md:col-span-7 md:border-r md:border-b-0 md:p-8">
          <p className="label">{m.institutionalAnchor}</p>
          <p className="mt-4 font-serif text-h3 text-ink">{site.anchor[locale]}</p>
          <p className="mt-2 font-mono text-meta uppercase tracking-[0.06em] text-ink-3">{site.anchorShort[locale]}</p>
        </div>
        {status}
      </div>
    </div>
  );
}
