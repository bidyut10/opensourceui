"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

export type AlbumPhoto = {
  id: string;
  place: string;
  date: string;
  src: string;
};

export type PhotoAlbumCardProps = Readonly<
  {
    photos?: AlbumPhoto[];
    onSlideChange?: (index: number, photo: AlbumPhoto) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultPhotos: AlbumPhoto[] = [
  { id: "1", place: "Kyoto", date: "Mar 12", src: "/background5.webp" },
  { id: "2", place: "Osaka", date: "Apr 03", src: "/background1.webp" },
  { id: "3", place: "Hokkaido", date: "Jan 28", src: "/wallpaper-2.png" },
  { id: "4", place: "Tokyo", date: "Jun 14", src: "/wallpaper-11.png" },
];

// Production-ready Photo Album component — styled with Tailwind CSS.
export const PhotoAlbumCard = forwardRef<HTMLDivElement, PhotoAlbumCardProps>(
  ({ className, photos = defaultPhotos, onSlideChange, ...props }, ref) => {
    const [index, setIndex] = useState(0);
    const total = photos.length;

    const select = (next: number) => {
      setIndex(next);
      onSlideChange?.(next, photos[next]);
    };

    const prev = () => select((index - 1 + total) % total);
    const next = () => select((index + 1) % total);

    const current = photos[index];

    return (
      <div
        ref={ref}
        data-slot="photo-album-card"
        className={cn(
          "w-80 overflow-hidden rounded-2xl border border-neutral-100 bg-white font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div className="relative aspect-square bg-neutral-100">
          {photos.map((photo, i) => (
            <Image
              key={photo.id}
              src={photo.src}
              alt={photo.place}
              fill
              priority={i === 0}
              className={cn(
                "object-cover transition-opacity duration-300 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
              sizes="320px"
            />
          ))}

          <button
            type="button"
            aria-label="Previous photo"
            onClick={prev}
            className="absolute inset-y-0 left-0 z-10 w-1/3 cursor-pointer"
          />
          <button
            type="button"
            aria-label="Next photo"
            onClick={next}
            className="absolute inset-y-0 right-0 z-10 w-1/3 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-neutral-100 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">
              {current.place}
            </p>
            <p className="text-xs text-neutral-400">{current.date}</p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            {photos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                aria-label={`Show ${photo.place}`}
                aria-pressed={i === index}
                onClick={() => select(i)}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-200 ease-[cubic-bezier(0.77,0,0.175,1)]",
                  i === index ? "w-5 bg-neutral-900" : "w-1.5 bg-neutral-300",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

PhotoAlbumCard.displayName = "PhotoAlbumCard";
