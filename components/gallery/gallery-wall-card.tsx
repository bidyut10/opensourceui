"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

export type GalleryWallCardProps = Readonly<
  {
    imageSrc?: string;
    imageAlt?: string;
    artist?: string;
    title?: string;
    year?: string;
    gallery?: string;
  } & ComponentPropsWithoutRef<"div">
>;

export const GalleryWallCard = forwardRef<HTMLDivElement, GalleryWallCardProps>(
  (
    {
      className,
      imageSrc = "/background5.webp",
      imageAlt = "Artwork preview",
      artist = "Elena Marchetti",
      title = "Winter Light Study",
      year = "2019",
      gallery = "Studio 14 Gallery",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="gallery-wall-card"
        className={cn("w-72 font-sans", className)}
        {...props}
      >
        <div className="rounded-sm border border-neutral-200 bg-white p-3 shadow-[0_16px_34px_rgba(15,23,42,0.12)]">
          <div className="border border-neutral-100 bg-[#f7f4ef] p-3">
            <div className="relative aspect-4/5 overflow-hidden bg-neutral-200">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-4 px-1">
            <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
              {gallery}
            </p>
            <p className="mt-1 font-serif text-sm text-neutral-800 italic">
              {title}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 text-xs text-neutral-500">
              <span>{artist}</span>
              <span>{year}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GalleryWallCard.displayName = "GalleryWallCard";
