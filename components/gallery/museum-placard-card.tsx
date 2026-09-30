"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type MuseumPlacardCardProps = Readonly<
  {
    artist?: string;
    title?: string;
    year?: string;
    medium?: string;
    dimensions?: string;
    catalogRef?: string;
    curatorNote?: string;
    acquisition?: string;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Museum Placard component — styled with Tailwind CSS.
export const MuseumPlacardCard = forwardRef<
  HTMLDivElement,
  MuseumPlacardCardProps
>(
  (
    {
      className,
      artist = "Elena Marchetti",
      title = "Still Life with Winter Light",
      year = "2019",
      medium = "Oil on linen",
      dimensions = "61 × 76 cm",
      catalogRef = "INV.2024.118",
      curatorNote = "Marchetti layers translucent glazes to suspend domestic objects between memory and observation.",
      acquisition = "Gift of the Hartwell Foundation, 2024",
      ...props
    },
    ref,
  ) => {
    const [flipped, setFlipped] = useState(false);

    return (
      <div
        ref={ref}
        data-slot="museum-placard-card"
        className={cn("mx-auto w-72 font-sans perspective-[1000px]", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          aria-pressed={flipped}
          aria-label={flipped ? "Show artwork label" : "Show curator note"}
          className="group relative h-52 w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        >
          <div
            className={cn(
              "relative h-52 w-full transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] [transform-style:preserve-3d] motion-reduce:transition-none",
              flipped && "[transform:rotateY(180deg)]",
            )}
          >
            <div className="absolute inset-0 rounded-sm border border-neutral-200 bg-[#faf8f5] px-5 py-4 shadow-sm [backface-visibility:hidden]">
              <p className="font-mono text-[9px] tracking-[0.22em] text-neutral-400 uppercase">
                {catalogRef}
              </p>
              <p className="mt-3 text-sm font-medium text-neutral-800">
                {artist}
              </p>
              <p className="mt-1 font-serif text-base leading-snug text-neutral-700 italic">
                {title}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{year}</p>

              <div className="mt-4 space-y-1 border-t border-neutral-200 pt-3">
                <p className="text-[11px] text-neutral-600">{medium}</p>
                <p className="text-[11px] text-neutral-500">{dimensions}</p>
              </div>

              <p className="absolute right-4 bottom-3 font-mono text-[8px] tracking-wider text-neutral-400 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                Tap for note
              </p>
            </div>

            <div className="absolute inset-0 [transform:rotateY(180deg)] rounded-sm border border-slate-300 bg-[#e8edf3] px-5 py-4 shadow-sm [backface-visibility:hidden]">
              <p className="font-mono text-[9px] tracking-[0.22em] text-slate-500 uppercase">
                Curator note
              </p>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-700">
                {curatorNote}
              </p>
              <p className="mt-4 border-t border-slate-300/80 pt-3 text-[10px] leading-relaxed text-slate-600">
                {acquisition}
              </p>
              <p className="absolute right-4 bottom-3 font-mono text-[8px] tracking-wider text-slate-400 uppercase">
                Tap to return
              </p>
            </div>
          </div>
        </button>
      </div>
    );
  },
);

MuseumPlacardCard.displayName = "MuseumPlacardCard";
