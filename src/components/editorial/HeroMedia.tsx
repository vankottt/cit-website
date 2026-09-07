"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Homepage overlay: muted looping local video, poster under reduced motion
 * or when paused. The public clip is a grayscale encode; the original in
 * `Video/` stays in colour. CSS grayscale on the poster is a fallback.
 * Insight YouTube embeds stay in YoutubeEmbed.
 */
export function HeroMedia({
  src,
  mobileSrc,
  posterSrc,
  posterAlt,
  pauseLabel,
  playLabel,
}: {
  src: string;
  mobileSrc?: string;
  posterSrc: string;
  posterAlt: string;
  pauseLabel: string;
  playLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const playing = !reducedMotion && !userPaused;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      void video.play().catch(() => {
        setUserPaused(true);
      });
    } else {
      video.pause();
    }
  }, [playing]);

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
            muted
            loop
            playsInline
            preload="none"
            poster={posterSrc}
            aria-hidden="true"
          >
            {mobileSrc ? <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" /> : null}
            <source src={src} type="video/mp4" />
          </video>
        ) : null}
      </div>
      {reducedMotion ? null : (
        <button
          type="button"
          className="absolute top-4 right-[var(--spacing-gutter)] z-20 inline-flex min-h-12 items-center gap-2 border border-on-dark/40 bg-marine/70 px-4 font-sans text-small text-on-dark transition-colors duration-150 hover:border-on-dark hover:bg-marine"
          onClick={() => setUserPaused((value) => !value)}
          aria-pressed={!playing}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
          <span>{playing ? pauseLabel : playLabel}</span>
        </button>
      )}
    </div>
  );
}
