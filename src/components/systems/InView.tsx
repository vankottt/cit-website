"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Marks its subtree `js-ready` after mount and `is-in-view` when it enters
 * the viewport. Pair with `.draw-path` / `.loop-segment` in globals.css so
 * no-JS and reduced-motion still see the finished drawing.
 */
export function InView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, ready, visible } = useInView();
  return (
    <div ref={ref} className={cn(ready && "js-ready", visible && "is-in-view", className)}>
      {children}
    </div>
  );
}

export function useInView<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    setReady(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, ready, visible };
}
