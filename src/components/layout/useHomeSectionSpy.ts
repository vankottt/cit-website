"use client";

import { useEffect, useState } from "react";
import { homeSpySectionIds, navKeyForHomeSection } from "@/lib/home-nav";
import type { RouteKey } from "@/lib/paths";

/**
 * Which primary-nav item matches the homepage section under the sticky header.
 * Disabled off the landing page so inner routes keep path-based current state.
 */
export function useHomeSectionSpy(enabled: boolean): Exclude<RouteKey, "home" | "privacy"> | null {
  const [active, setActive] = useState<Exclude<RouteKey, "home" | "privacy"> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }

    const read = () => {
      // Opening the overlay menu locks body scroll and can shift scrollY; freeze the current item.
      if (document.body.style.overflow === "hidden") return;
      const header = document.querySelector("header");
      const headerH = header?.getBoundingClientRect().height ?? 88;
      const pad = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      // Must sit at/below hash-scroll alignment, otherwise the previous item stays current.
      const line = Math.max(headerH, pad) + 8;
      let sectionId: string | null = null;
      for (const id of homeSpySectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) sectionId = id;
      }
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      const lastId = homeSpySectionIds[homeSpySectionIds.length - 1];
      if (atBottom && lastId) sectionId = lastId;
      setActive(sectionId ? navKeyForHomeSection(sectionId) : null);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const ro = new ResizeObserver(onScroll);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      ro.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return active;
}

export function scrollToHomeHash(href: string): boolean {
  const id = href.split("#")[1];
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", href);
  return true;
}
