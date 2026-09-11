import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type FilmStripCardProps = Readonly<
  {
    frames?: string[];
    label?: string;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultFrames = [
  "/wallpaper-2.png",
  "/background1.webp",
  "/wallpaper-11.png",
  "/background5.webp",
];

const LEFT_SPROCKET_HOLES = [
  "left-sprocket-1",
  "left-sprocket-2",
  "left-sprocket-3",
  "left-sprocket-4",
  "left-sprocket-5",
  "left-sprocket-6",
  "left-sprocket-7",
  "left-sprocket-8",
] as const;

const RIGHT_SPROCKET_HOLES = [
  "right-sprocket-1",
  "right-sprocket-2",
  "right-sprocket-3",
  "right-sprocket-4",
  "right-sprocket-5",
  "right-sprocket-6",
  "right-sprocket-7",
  "right-sprocket-8",
] as const;

// Production-ready Film Strip component — styled with Tailwind CSS.
export const FilmStripCard = forwardRef<HTMLDivElement, FilmStripCardProps>(
  (
    {
      className,
      frames = defaultFrames,
      label = "Roll 24 · Kodak Portra",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="film-strip-card"
      className={cn("w-sm font-mono", className)}
      {...props}
    >
      <p className="mb-2 text-center text-[9px] tracking-widest text-neutral-400 uppercase">
        {label}
      </p>
      <div className="relative rounded-sm bg-neutral-900 px-2 py-3 shadow-lg">
        <div className="absolute top-0 bottom-0 left-0 flex w-3 flex-col justify-evenly">
          {LEFT_SPROCKET_HOLES.map((holeId) => (
            <div
              key={holeId}
              className="mx-auto h-2 w-1.5 rounded-sm bg-neutral-700"
            />
          ))}
        </div>
        <div className="absolute top-0 right-0 bottom-0 flex w-3 flex-col justify-evenly">
          {RIGHT_SPROCKET_HOLES.map((holeId) => (
            <div
              key={holeId}
              className="mx-auto h-2 w-1.5 rounded-sm bg-neutral-700"
            />
          ))}
        </div>
        <div className="mx-4 flex gap-1 overflow-hidden">
          {frames.map((src, frameNumber) => (
            <div
              key={src}
              className="relative h-20 w-16 shrink-0 overflow-hidden border-2 border-neutral-800 md:h-24 md:w-20"
            >
              <Image
                src={src}
                alt={`Frame ${frameNumber + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
              <span className="absolute bottom-0.5 left-0.5 bg-black/60 px-1 text-[7px] text-white">
                {String(frameNumber + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
);

FilmStripCard.displayName = "FilmStripCard";
