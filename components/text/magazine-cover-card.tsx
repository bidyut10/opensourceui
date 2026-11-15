"use client";

import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

export type MagazineCoverCardProps = Readonly<
  {
    badge?: string;
    issue?: string;
    category?: string;
    title?: string;
    subtitle?: string;
    author?: string;
    readTime?: string;
    image?: string;
    imageAlt?: string;
    arrowIcon?: ReactNode;
    onClick?: () => void;
  } & ComponentPropsWithoutRef<"button">
>;

// Production-ready Magazine Cover component — styled with Tailwind CSS.
export const MagazineCoverCard = forwardRef<
  HTMLButtonElement,
  MagazineCoverCardProps
>(
  (
    {
      className,
      badge = "Featured",
      issue = "Issue #24",
      category = "Design",
      title = "The Art of Minimal Interfaces",
      subtitle = "Minimal Interfaces",
      author = "Bidyut Kundu",
      readTime = "8 min read",
      image = "/background1.webp",
      imageAlt = "Magazine cover",
      arrowIcon,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        data-slot="magazine-cover-card"
        onClick={onClick}
        className={cn(
          "group relative h-96 w-72 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99]",
          className,
        )}
        {...props}
      >
        {/* Cover image */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="288px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full border border-white/20 bg-white/15 px-2.5 pt-1 pb-0.5 text-[10px] font-medium tracking-widest text-white uppercase backdrop-blur-md">
            {badge}
          </span>
        </div>

        <div className="absolute right-0 bottom-0 left-0 p-5">
          <p className="mb-2 font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase">
            {issue} · {category}
          </p>

          <h3 className="mb-3 text-xl leading-tight font-light tracking-tight text-white">
            {title.split(" ").slice(0, -2).join(" ")}
            <br />
            <span className="font-semibold">{subtitle}</span>
          </h3>

          <div className="flex items-center justify-between">
            <p className="text-xs text-white/50">
              By {author} · {readTime}
            </p>

            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-neutral-900">
              {arrowIcon ?? <ArrowRight size={14} />}
            </div>
          </div>
        </div>
      </button>
    );
  },
);

MagazineCoverCard.displayName = "MagazineCoverCard";
