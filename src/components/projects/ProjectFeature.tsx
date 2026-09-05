import type { Locale } from "@/lib/i18n";
import { href } from "@/lib/paths";
import type { Project } from "@/content/types";
import { t } from "@/content/messages";
import { SectionHeading } from "@/components/editorial/SectionHeading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Chain } from "@/components/systems/Chain";
import { ProjectMeta } from "./ProjectMeta";

/** Editorial large-format featured project with metadata and its value chain. */
export function ProjectFeature({ project, locale, label, chainTitle }: { project: Project; locale: Locale; label: string; chainTitle: string }) {
  const m = t(locale);
  const url = href(locale, "projects", project.slug);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <SectionHeading label={`${label} · ${m.statuses[project.status]}`} heading={project.title[locale]} id="featured-heading" />
        <p className="mt-6 max-w-2xl text-lead text-ink-2">{project.standfirst[locale]}</p>
        <p className="mt-5 max-w-2xl text-body text-ink-2">{project.summary[locale]}</p>
        <ProjectMeta project={project} locale={locale} className="mt-8 max-w-2xl" />
        <p className="mt-4 max-w-2xl text-meta text-ink-3">{project.statusNote[locale]}</p>
        <div className="mt-8">
          <ArrowLink href={url}>{m.toProject}</ArrowLink>
        </div>
      </div>
      <div className="lg:col-span-5 lg:pt-1">
        {project.scope?.chain ? (
          <>
            <Chain items={project.scope.chain[locale]} frameLabel={chainTitle} direction="vertical" numbered />
            <p className="mt-3 text-meta text-ink-3">{project.scope.intro[locale]}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
