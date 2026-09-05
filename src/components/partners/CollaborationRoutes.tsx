import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import { collaborationRoutes } from "@/content/collaboration";
import { ArrowRight } from "@/components/ui/Icons";

/** Four entry points as a ruled list (homepage preview). */
export function CollaborationRoutesPreview({ locale }: { locale: Locale }) {
  return (
    <ol className="grid border-t border-line md:grid-cols-2">
      {collaborationRoutes.map((r, i) => (
        <li key={r.slug} className={i % 2 === 0 ? "border-b border-line md:border-r" : "border-b border-line"}>
          <Link href={`${href(locale, "work-with-us")}#${r.slug}`} className="group flex h-full flex-col justify-between gap-6 p-6 md:p-8">
            <div>
              <p className="label">{r.code}</p>
              <h3 className="mt-3 text-h3 text-ink transition-colors duration-150 group-hover:text-marine">{r.audience[locale]}</h3>
              <p className="mt-3 text-small text-ink-3">{r.audienceExamples[locale].slice(0, 3).join(" · ")}</p>
            </div>
            <ul className="space-y-1.5 text-small text-ink-2">
              {r.modes[locale].slice(0, 3).map((mode) => (
                <li key={mode} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-line-strong" />
                  {mode}
                </li>
              ))}
            </ul>
            <ArrowRight className="text-ink-3 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-marine" size={18} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
