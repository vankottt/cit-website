"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface LoopStage {
  code: string;
  short: string;
  title: string;
  body: string;
}

/**
 * Ten stages as a closed loop. Desktop: two rows of five (01–05 left→right,
 * 06–10 right→left) joined on the right, with a dashed amber return on the
 * left; stages are buttons revealing their description. Mobile: a numbered
 * rail listing every stage with its description (no interaction required).
 */
export function MethodologyLoop({
  stages,
  tone = "on-dark",
  labels,
  defaultActive = 0,
  mobile = "rail",
}: {
  stages: LoopStage[];
  tone?: "ink" | "on-dark";
  labels: { stage: string; loopNote: string };
  defaultActive?: number;
  /** "rail" lists all stages below md; "none" when the page already lists them. */
  mobile?: "rail" | "none";
}) {
  const [active, setActive] = useState(defaultActive);
  const panelId = useId();
  const dark = tone === "on-dark";
  const top = stages.slice(0, 5);
  const bottom = stages.slice(5, 10);
  const current = stages[active] ?? stages[0]!;

  const lineColor = dark ? "bg-on-dark/35" : "bg-line-strong";
  const arrowColor = dark ? "text-on-dark/60" : "text-ink-3";

  const centers = [10, 30, 50, 70, 90]; // % positions of the five circles

  const circleClass = (i: number) =>
    cn(
      "flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[0.75rem] tracking-[0.04em] transition-colors duration-150",
      i === active
        ? "border-amber bg-amber text-marine"
        : dark
          ? "border-on-dark/50 bg-marine text-on-dark group-hover:border-on-dark"
          : "border-ink bg-paper text-ink group-hover:border-marine",
    );

  const labelClass = (i: number) =>
    cn(
      "text-[0.8125rem] leading-[1.3] font-medium transition-colors duration-150",
      i === active ? (dark ? "text-on-dark" : "text-ink") : dark ? "text-on-dark-muted group-hover:text-on-dark" : "text-ink-2 group-hover:text-ink",
    );

  return (
    <div>
      {/* Desktop loop */}
      <div className="hidden md:block">
        {/* Row 1: labels above, circles at the bottom edge */}
        <div className="relative">
          <div className={cn("absolute bottom-5 h-px", lineColor)} style={{ left: "10%", right: "10%" }} aria-hidden="true" />
          <div className="grid grid-cols-5 gap-x-4" role="group" aria-label={labels.stage}>
            {top.map((s, i) => (
              <button
                key={s.code}
                type="button"
                aria-pressed={i === active}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                className="group relative flex flex-col items-center justify-end text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
              >
                <span className={cn("mb-3 max-w-[11rem]", labelClass(i))}>{s.short}</span>
                <span className={circleClass(i)}>{s.code}</span>
              </button>
            ))}
          </div>
          {/* arrowheads positioned before circles 02–05 */}
          {centers.slice(1).map((c) => (
            <svg
              key={`a-${c}`}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              aria-hidden="true"
              className={cn("absolute bottom-[16px]", arrowColor)}
              style={{ left: `calc(${c}% - 20px - 9px)` }}
            >
              <path d="M0 0.5 7.5 4 0 7.5Z" fill="currentColor" />
            </svg>
          ))}
        </div>

        {/* Connectors between rows */}
        <div className="relative h-14" aria-hidden="true">
          {/* right: down */}
          <div className={cn("absolute -top-5 -bottom-5 w-px", lineColor)} style={{ left: "90%" }} />
          <svg width="8" height="8" viewBox="0 0 8 8" className={cn("absolute -bottom-[12px]", arrowColor)} style={{ left: "calc(90% - 3.5px)", transform: "rotate(90deg)" }}>
            <path d="M0 0.5 7.5 4 0 7.5Z" fill="currentColor" />
          </svg>
          {/* left: return, dashed amber */}
          <div
            className="absolute -top-5 -bottom-5 w-px"
            style={{
              left: "10%",
              backgroundImage: "linear-gradient(to bottom, var(--color-amber) 55%, transparent 55%)",
              backgroundSize: "1px 7px",
            }}
          />
          <svg width="8" height="8" viewBox="0 0 8 8" className="absolute -top-[12px] text-amber" style={{ left: "calc(10% - 3.5px)", transform: "rotate(-90deg)" }}>
            <path d="M0 0.5 7.5 4 0 7.5Z" fill="currentColor" />
          </svg>
          <span
            className={cn("absolute top-1/2 -translate-y-1/2 font-mono text-[0.6875rem] uppercase tracking-[0.06em]", dark ? "text-on-dark-muted" : "text-ink-3")}
            style={{ left: "calc(10% + 14px)" }}
          >
            {labels.loopNote}
          </span>
        </div>

        {/* Row 2: circles at the top edge, labels below; visual order right→left */}
        <div className="relative">
          <div className={cn("absolute top-5 h-px", lineColor)} style={{ left: "10%", right: "10%" }} aria-hidden="true" />
          <div className="grid grid-cols-5 gap-x-4" dir="rtl" role="group" aria-label={labels.stage}>
            {bottom.map((s, j) => {
              const i = j + 5;
              return (
                <button
                  key={s.code}
                  type="button"
                  dir="ltr"
                  aria-pressed={i === active}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className="group relative flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
                >
                  <span className={circleClass(i)}>{s.code}</span>
                  <span className={cn("mt-3 max-w-[11rem]", labelClass(i))}>{s.short}</span>
                </button>
              );
            })}
          </div>
          {/* arrowheads pointing left, before circles 07–10 (at 70%, 50%, 30%, 10%) */}
          {centers.slice(0, 4).map((c) => (
            <svg
              key={`b-${c}`}
              width="8"
              height="8"
              viewBox="0 0 8 8"
              aria-hidden="true"
              className={cn("absolute top-[16px]", arrowColor)}
              style={{ left: `calc(${c}% + 20px + 1px)`, transform: "rotate(180deg)" }}
            >
              <path d="M0 0.5 7.5 4 0 7.5Z" fill="currentColor" />
            </svg>
          ))}
        </div>

        {/* Detail panel */}
        <div
          id={panelId}
          role="region"
          aria-live="polite"
          className={cn("mt-10 grid gap-4 border-t pt-6 md:grid-cols-12", dark ? "border-on-dark/20" : "border-line")}
        >
          <p className={cn("md:col-span-3", dark ? "label-dark" : "label")}>
            {labels.stage} {current.code}
          </p>
          <div className="md:col-span-9">
            <h3 className={cn("font-serif text-h3", dark ? "text-on-dark" : "text-ink")}>{current.title}</h3>
            <p className={cn("mt-2 max-w-2xl text-body", dark ? "text-on-dark-muted" : "text-ink-2")}>{current.body}</p>
          </div>
        </div>
      </div>

      {/* Mobile rail */}
      {mobile === "rail" ? (
      <ol className={cn("md:hidden ml-3.5 border-l", dark ? "border-on-dark/30" : "border-line-strong")}>
        {stages.map((s, i) => (
          <li key={s.code} className="relative pb-6 pl-8 last:pb-0">
            <span
              className={cn(
                "absolute -left-[13px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full border font-mono text-[0.6875rem]",
                i === stages.length - 1 ? "border-amber bg-amber text-marine" : dark ? "border-on-dark/50 bg-marine text-on-dark" : "border-ink bg-paper text-ink",
              )}
            >
              {s.code}
            </span>
            <h3 className={cn("text-h4 font-serif", dark ? "text-on-dark" : "text-ink")}>{s.title}</h3>
            <p className={cn("mt-1.5 text-small", dark ? "text-on-dark-muted" : "text-ink-2")}>{s.body}</p>
          </li>
        ))}
        <li className={cn("pl-8 pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.06em]", dark ? "text-on-dark-muted" : "text-ink-3")}>↺ {labels.loopNote}</li>
      </ol>
      ) : (
        <p className={cn("md:hidden font-mono text-[0.6875rem] uppercase tracking-[0.06em]", dark ? "text-on-dark-muted" : "text-ink-3")}>
          {stages.map((s) => s.code).join(" → ")} ↺
        </p>
      )}
    </div>
  );
}
