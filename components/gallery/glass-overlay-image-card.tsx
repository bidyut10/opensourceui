"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import { Heart, Share, MapPin, ArrowRight } from "lucide-react";

export type GlassOverlayImageCardProps = Readonly<
  {
    image?: string;
    imageAlt?: string;
    location?: string;
    title?: string;
    savedLabel?: string;
    savedCount?: string | number;
    avatars?: string[];
    exploreLabel?: string;
    onLike?: () => void;
    onShare?: () => void;
    onExplore?: () => void;
    likeIcon?: ReactNode;
    shareIcon?: ReactNode;
    locationIcon?: ReactNode;
    arrowIcon?: ReactNode;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Glass Overlay Image component — styled with Tailwind CSS.
export const GlassOverlayImageCard = forwardRef<
  HTMLDivElement,
  GlassOverlayImageCardProps
>(
  (
    {
      className,
      image = "/background5.webp",
      imageAlt = "Scenic landscape",
      location = "Bishnupur, West Bengal",
      title = "Where the river meets the mangrove forest",
      savedLabel = "+12 saved",
      savedCount,
      avatars = ["JD", "BK", "AS"],
      exploreLabel = "Explore",
      likeIcon,
      shareIcon,
      locationIcon,
      arrowIcon,
      onLike,
      onShare,
      onExplore,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="glass-overlay-image-card"
        className={cn(
          "group relative h-80 w-72 overflow-hidden rounded-3xl shadow-lg",
          className,
        )}
        {...props}
      >
        {/* Background image */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="288px"
          className="object-cover transition-transform duration-700 group-hover:scale-110 motion-reduce:group-hover:scale-100"
        />

        {/* Top actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            type="button"
            aria-label="Like"
            onClick={onLike}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-[background-color,scale] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.97] motion-reduce:transition-[background-color]"
          >
            {likeIcon ?? <Heart size={14} />}
          </button>

          <button
            type="button"
            aria-label="Share"
            onClick={onShare}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition-[background-color,scale] ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/30 active:scale-[0.97] motion-reduce:transition-[background-color]"
          >
            {shareIcon ?? <Share size={14} />}
          </button>
        </div>

        {/* Glass content */}
        <div className="absolute right-3 bottom-3 left-3">
          <div className="rounded-2xl border border-white/25 bg-white/15 p-4 backdrop-blur-xl">
            {/* Location */}
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] text-white/70">
              {locationIcon ?? <MapPin size={10} />}
              <span>{location}</span>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-sm leading-snug font-semibold text-white">
              {title}
            </h3>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex -space-x-2.5">
                  {avatars.map((initial) => (
                    <div
                      key={initial}
                      className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/20 bg-neutral-600 text-[9px] font-semibold text-white backdrop-blur-sm"
                      style={{ zIndex: 10 - avatars.indexOf(initial) }}
                    >
                      {initial}
                    </div>
                  ))}
                </div>

                <span className="ml-3 text-[10px] text-white/60">
                  {typeof savedCount === "number"
                    ? `${savedCount} saved`
                    : savedLabel}
                </span>
              </div>

              <button
                type="button"
                aria-label="Explore"
                onClick={onExplore}
                className="flex items-center gap-1 font-mono text-[10px] tracking-wider text-white/50 uppercase transition-colors hover:text-white/80"
              >
                {exploreLabel}
                {arrowIcon ?? (
                  <ArrowRight size={10} className="relative -top-px" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GlassOverlayImageCard.displayName = "GlassOverlayImageCard";
