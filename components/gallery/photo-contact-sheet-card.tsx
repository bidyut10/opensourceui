import Image from "next/image";
import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

export type ContactSheetFrame = {
  src: string;
  number: string;
};

export type PhotoContactSheetCardProps = Readonly<
  {
    rollLabel?: string;
    frames?: ContactSheetFrame[];
  } & ComponentPropsWithoutRef<"div">
>;

const defaultFrames: ContactSheetFrame[] = [
  { src: "/background5.webp", number: "01" },
  { src: "/background1.webp", number: "03" },
  { src: "/wallpaper-11.png", number: "04" },
  { src: "/wallpaper-2.png", number: "02" },
];

// Production-ready Photo Contact Sheet component — styled with Tailwind CSS.
export const PhotoContactSheetCard = forwardRef<
  HTMLDivElement,
  PhotoContactSheetCardProps
>(
  (
    {
      className,
      rollLabel = "Contact sheet — Roll 12A",
      frames = defaultFrames,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="photo-contact-sheet-card"
      className={cn("w-xs bg-neutral-100 p-3 font-mono", className)}
      {...props}
    >
      <p className="mb-2 text-[9px] tracking-wider text-neutral-500 uppercase">
        {rollLabel}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {frames.map((frame) => (
          <div
            key={frame.number}
            className="group relative aspect-4/5 overflow-hidden border border-neutral-300 bg-white"
          >
            <Image
              src={frame.src}
              alt={`Frame ${frame.number}`}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
            <span className="absolute top-1 left-1 bg-white/90 px-1 py-px text-[8px] font-bold text-neutral-800">
              {frame.number}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
);

PhotoContactSheetCard.displayName = "PhotoContactSheetCard";
