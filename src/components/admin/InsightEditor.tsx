import type { InsightRecord } from "@/lib/cms/types";
import { previewInsightAction, publishInsightAction, saveInsightAction } from "@/app/admin/actions";

export function InsightEditor({ insight, notice, saved }: { insight?: InsightRecord; notice?: string; saved?: boolean }) {
  return (
    <>
      {notice ? <p role="alert">{notice}</p> : null}
      {saved ? <p className="admin-muted">Saved as draft (not published).</p> : null}
      <form action={saveInsightAction} className="admin-form admin-card">
        <input type="hidden" name="id" value={insight?.id ?? ""} />
        <label>
          Slug
          <input name="slug" required defaultValue={insight?.slug} />
        </label>
        <label>
          Type
          <select name="type" defaultValue={insight?.type === "news" ? "news" : "concept-note"}>
            <option value="concept-note">Concept note (Insights)</option>
            <option value="news">News article</option>
          </select>
        </label>
        <label>
          Title BG / EN
          <input name="titleBg" defaultValue={insight?.titleBg} />
          <input name="titleEn" defaultValue={insight?.titleEn} />
        </label>
        <label>
          Summary BG
          <textarea name="summaryBg" defaultValue={insight?.summaryBg} />
        </label>
        <label>
          Summary EN
          <textarea name="summaryEn" defaultValue={insight?.summaryEn} />
        </label>
        <label>
          Body BG (one block per line; ## heading; YouTube URL on its own line)
          <textarea name="bodyBg" defaultValue={(insight?.bodyBg ?? []).join("\n")} />
        </label>
        <label>
          Body EN (same: paste the YouTube URL alone on a line in both locales)
          <textarea name="bodyEn" defaultValue={(insight?.bodyEn ?? []).join("\n")} />
        </label>
        <label>
          Topics BG / EN
          <textarea name="topicsBg" defaultValue={(insight?.topicsBg ?? []).join("\n")} />
          <textarea name="topicsEn" defaultValue={(insight?.topicsEn ?? []).join("\n")} />
        </label>
        <label>
          Related projects
          <textarea name="relatedProjects" defaultValue={(insight?.relatedProjectSlugs ?? []).join("\n")} />
        </label>
        <label>
          SEO description BG / EN
          <textarea name="seoDescriptionBg" defaultValue={insight?.seo.descriptionBg} />
          <textarea name="seoDescriptionEn" defaultValue={insight?.seo.descriptionEn} />
        </label>
        <button className="admin-btn">Save draft</button>
      </form>
      {insight ? (
        <div className="admin-actions" style={{ marginTop: "1rem" }}>
          <form action={publishInsightAction}>
            <input type="hidden" name="slug" value={insight.slug} />
            <input type="hidden" name="state" value="review" />
            <button className="admin-btn secondary">Submit for review</button>
          </form>
          <form action={publishInsightAction}>
            <input type="hidden" name="slug" value={insight.slug} />
            <input type="hidden" name="state" value="published" />
            <button className="admin-btn">Publish</button>
          </form>
          <form action={previewInsightAction}>
            <input type="hidden" name="slug" value={insight.slug} />
            <input type="hidden" name="locale" value="en" />
            <button className="admin-btn secondary">Preview EN</button>
          </form>
          <form action={previewInsightAction}>
            <input type="hidden" name="slug" value={insight.slug} />
            <input type="hidden" name="locale" value="bg" />
            <button className="admin-btn secondary">Preview BG</button>
          </form>
        </div>
      ) : null}
    </>
  );
}
