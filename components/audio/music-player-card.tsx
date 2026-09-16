"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import Image from "next/image";

import { cn } from "@/lib/cn";

import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

export type MusicPlayerCardProps = Readonly<
  {
    coverImage?: string;
    title?: string;
    artist?: string;
    album?: string;
    currentTime?: string;
    duration?: string;
    progress?: number;
    defaultPlaying?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Music Player component — styled with Tailwind CSS.
export const MusicPlayerCard = forwardRef<HTMLDivElement, MusicPlayerCardProps>(
  (
    {
      className,
      coverImage = "/background5.webp",
      title = "Midnight Dreams",
      artist = "The Weekend",
      album = "After Hours",
      currentTime = "1:24",
      duration = "3:42",
      progress = 42,
      defaultPlaying = true,
      ...props
    },
    ref,
  ) => {
    const [playing, setPlaying] = useState(defaultPlaying);

    return (
      <div
        ref={ref}
        data-slot="music-player-card"
        className={cn(
          "w-72 overflow-hidden rounded-2xl bg-neutral-950 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Cover */}
        <div data-slot="music-player-card-cover" className="relative h-36">
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="288px"
            className="object-cover opacity-80"
          />

          <div
            data-slot="music-player-card-overlay"
            className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/40 to-transparent"
          />
        </div>

        <div
          data-slot="music-player-card-content"
          className="relative -mt-6 p-4"
        >
          {/* Track Info */}
          <div data-slot="music-player-card-info">
            <h3 className="text-sm font-semibold text-white">{title}</h3>

            <p className="text-[11px] text-neutral-500">
              {artist} · {album}
            </p>
          </div>

          {/* Progress */}
          <div data-slot="music-player-card-progress" className="mt-4">
            <div className="h-1 overflow-hidden rounded-full bg-neutral-800">
              <div
                className="relative h-full rounded-full bg-emerald-500"
                style={{
                  width: `${Math.min(Math.max(progress, 0), 100)}%`,
                }}
              >
                <div className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow" />
              </div>
            </div>

            <div className="mt-1 flex justify-between">
              <span className="font-mono text-[9px] text-neutral-600">
                {currentTime}
              </span>

              <span className="font-mono text-[9px] text-neutral-600">
                {duration}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div
            data-slot="music-player-card-controls"
            className="mt-3 flex items-center justify-center gap-5"
          >
            <button
              type="button"
              aria-label="Previous track"
              className="cursor-pointer text-lg text-neutral-500 transition-[color,scale] duration-150 hover:text-white active:scale-[0.95]"
            >
              <SkipBack size={14} />
            </button>

            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((prev) => !prev)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition-transform ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 active:scale-[0.97] hover:active:scale-100"
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
              className="cursor-pointer text-lg text-neutral-500 transition-[color,scale] duration-150 hover:text-white active:scale-[0.95]"
            >
              <SkipForward size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  },
);

MusicPlayerCard.displayName = "MusicPlayerCard";
