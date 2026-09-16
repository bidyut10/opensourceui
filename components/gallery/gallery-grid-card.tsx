import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import { Sun } from "lucide-react";

export type GalleryGridCardProps = Readonly<
  {
    title?: string;
    subtitle?: string;
    count?: string | number;
    images?: string[];
    overlayText?: string;
    icon?: ReactNode;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Gallery Grid component — styled with Tailwind CSS.
export const GalleryGridCard = forwardRef<HTMLDivElement, GalleryGridCardProps>(
  (
    {
      className,
      title = "Summer Collection",
      subtitle = "Jun 2026",
      count = "24 photos",
      images = ["/background5.webp", "/background1.webp", "/wallpaper-11.png"],
      overlayText = "+21",
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="gallery-grid-card"
        className={cn(
          "w-72 overflow-hidden rounded-2xl border border-neutral-100 bg-white font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-3 pb-2">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>

            <p className="text-[10px] text-neutral-400">
              {count} · {subtitle}
            </p>
          </div>

          {icon ?? <Sun className="text-neutral-500" size={16} />}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1 px-3 pb-3">
          {/* Main large image */}
          <div className="relative col-span-2 row-span-2 aspect-square overflow-hidden rounded-xl">
            <Image
              src={images[0]}
              alt={title}
              fill
              sizes="288px"
              className="object-cover transition-transform duration-200 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
            />
          </div>

          {/* Small image 1 */}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={images[1]}
              alt={title}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          {/* Small image 2 with overlay */}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            <Image
              src={images[2]}
              alt={title}
              fill
              sizes="96px"
              className="object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-xs font-semibold text-white">
                {overlayText}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

GalleryGridCard.displayName = "GalleryGridCard";
