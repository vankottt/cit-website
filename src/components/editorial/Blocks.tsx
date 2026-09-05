import { Fragment } from "react";
import { cn } from "@/lib/cn";

/**
 * Renders lightweight content blocks: lines starting with "## " become h2,
 * consecutive "- " lines become a list, anything else is a paragraph.
 */
export function Blocks({ blocks, className }: { blocks: readonly string[]; className?: string }) {
  const out: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) {
      out.push(
        <ul key={`ul-${out.length}`}>
          {list.map((li) => (
            <li key={li}>{li}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  blocks.forEach((b, i) => {
    if (b.startsWith("- ")) {
      list.push(b.slice(2));
      return;
    }
    flush();
    if (b.startsWith("## ")) out.push(<h2 key={`h-${i}`}>{b.slice(3)}</h2>);
    else out.push(<p key={`p-${i}`}>{b}</p>);
  });
  flush();
  return <div className={cn("prose-cit", className)}>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</div>;
}

/** Plain list of paragraphs. */
export function Paragraphs({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <div className={cn("space-y-5 text-body text-ink-2", className)}>
      {items.map((p) => (
        <p key={p.slice(0, 32)}>{p}</p>
      ))}
    </div>
  );
}

/** Ruled bullet list used across detail pages. */
export function RuledList({ items, className, columns = 1 }: { items: readonly string[]; className?: string; columns?: 1 | 2 }) {
  return (
    <ul className={cn("border-t border-line", columns === 2 && "md:grid md:grid-cols-2 md:gap-x-8", className)}>
      {items.map((it) => (
        <li key={it} className="flex gap-3 border-b border-line py-3 text-small text-ink-2">
          <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-line-strong" />
          {it}
        </li>
      ))}
    </ul>
  );
}
