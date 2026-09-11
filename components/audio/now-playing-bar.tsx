"use client";

import { forwardRef, type ComponentPropsWithoutRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/cn";

import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export type NowPlayingBarProps = Readonly<
  {
    title?: string;
    artist?: string;
    progress?: number;
    artwork?: string;
    defaultPlaying?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Now Playing component — styled with Tailwind CSS.
export const NowPlayingBar = forwardRef<HTMLDivElement, NowPlayingBarProps>(
  (
    {
      className,
      title = "Midnight Dreams",
      artist = "The Weekend",
      progress = 60,
      artwork = "/background1.webp",
      defaultPlaying = true,
      ...props
    },
    ref,
  ) => {
    const [playing, setPlaying] = useState(defaultPlaying);

    return (
      <div
        ref={ref}
        data-slot="now-playing-bar"
        className={cn(
          "flex w-80 items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-950 px-3 py-3 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div
          data-slot="now-playing-bar-artwork"
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg"
        >
          <Image
            src={artwork}
            alt={title}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div data-slot="now-playing-bar-info" className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white">{title}</p>

          <p className="truncate text-[10px] text-neutral-500">{artist}</p>
        </div>

        <div
          data-slot="now-playing-bar-controls"
          className="flex items-center gap-2"
        >
          <button
            type="button"
            aria-label="Previous track"
            className="cursor-pointer text-sm text-neutral-500 transition-colors hover:text-white"
          >
            <SkipBack size={14} />
          </button>

          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying(!playing)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-xs text-neutral-900 transition-transform hover:scale-105"
          >
            {playing ? (
              <Pause size={14} fill="black" />
            ) : (
              <Play size={14} fill="black" />
            )}
          </button>

          <button
            type="button"
            aria-label="Next track"
            className="cursor-pointer text-sm text-neutral-500 transition-colors hover:text-white"
          >
            <SkipForward size={14} />
          </button>
        </div>

        <div
          data-slot="now-playing-bar-progress"
          className="hidden h-1 w-16 overflow-hidden rounded-full bg-neutral-800 md:block"
        >
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{
              width: `${Math.min(Math.max(progress, 0), 100)}%`,
            }}
          />
        </div>
      </div>
    );
  },
);

NowPlayingBar.displayName = "NowPlayingBar";
