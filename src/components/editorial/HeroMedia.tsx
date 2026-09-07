"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";

/**
 * Homepage overlay: muted looping local video, poster under reduced motion
 * or when paused. The public clip is a grayscale encode; the original in
 * `Video/` stays in colour. CSS grayscale on the poster is a fallback.
 * Insight YouTube embeds stay in YoutubeEmbed.
 */
export function HeroMedia({
  src,
  posterSrc,
  posterAlt,
  pauseLabel,
  playLabel,
}: {
  src: string;
  posterSrc: string;
  posterAlt: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const reduce = media.matches;
      setReducedMotion(reduce);
      setPlaying(!reduce);
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && !reducedMotion) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, reducedMotion]);

  const showVideo = !reducedMotion;

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          priority
          sizes="100vw"
          className="hero-media-tone object-cover"
          aria-hidden={showVideo && playing}
        />
        {showVideo ? (
          <video
            ref={videoRef}
            className={cn("hero-video-cover", !playing && "invisible")}
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        ) : null}
      </div>
      {reducedMotion ? null : (
        <button
          type="button"
          className="absolute top-4 right-[var(--spacing-gutter)] z-20 inline-flex min-h-12 items-center justify-center gap-2 border border-on-dark/40 bg-marine/70 px-4 font-sans text-small text-on-dark transition-colors duration-150 hover:border-on-dark hover:bg-marine"
          onClick={() => setPlaying((value) => !value)}
          aria-pressed={!playing}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span>{playing ? pauseLabel : playLabel}</span>
        </button>
      )}
    </div>
  );
}
