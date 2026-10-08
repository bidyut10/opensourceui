"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Github } from "@/icons/brands/github";
import { Star } from "lucide-react";

export type GitHubRepoCardProps = Readonly<
  {
    owner?: string;
    name?: string;
    description?: string;
    language?: string;
    languageColor?: string;
    stars?: number;
    forks?: number;
    onStar?: (starred: boolean) => void;
  } & ComponentPropsWithoutRef<"div">
>;

// Production-ready Git Hub Repo component — styled with Tailwind CSS.
export const GitHubRepoCard = forwardRef<HTMLDivElement, GitHubRepoCardProps>(
  (
    {
      className,
      owner = "bidyut-kundu",
      name = "opensourceui",
      description = "270+ production-ready Next.js UI components. Copy, paste, ship.",
      language = "TypeScript",
      languageColor = "bg-blue-500",
      stars = 1284,
      forks = 142,
      onStar,
      ...props
    },
    ref,
  ) => {
    const [starred, setStarred] = useState(false);
    const [count, setCount] = useState(stars);

    const toggleStar = () => {
      const next = !starred;
      setStarred(next);
      setCount(next ? count + 1 : count - 1);
      onStar?.(next);
    };

    return (
      <div
        ref={ref}
        data-slot="github-repo-card"
        className={cn(
          "w-72 rounded-xl border border-neutral-100 bg-white p-4 font-sans shadow-lg",
          className,
        )}
        {...props}
      >
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <Github size={16} className="shrink-0 text-neutral-800" />
            <span className="truncate text-[13px] text-neutral-600">
              <span className="font-semibold text-neutral-900">{owner}</span>
              <span className="text-neutral-400"> / </span>
              <span className="font-semibold text-neutral-900">{name}</span>
            </span>
          </div>
          <span className="shrink-0 rounded-full border border-neutral-200 px-2 py-0.5 text-[9px] font-medium text-neutral-500">
            Public
          </span>
        </div>

        <p className="mb-3 text-[12px] leading-relaxed text-neutral-600">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <span className={cn("h-2.5 w-2.5 rounded-full", languageColor)} />
              {language}
            </span>
            <span>{forks} forks</span>
          </div>

          <button
            type="button"
            onClick={toggleStar}
            aria-pressed={starred}
            data-slot="github-repo-card-star"
            className={cn(
              "flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-[color,background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:transition-[color,background-color]",
              starred
                ? "bg-amber-50 text-amber-700"
                : "bg-neutral-50 text-neutral-700",
            )}
          >
            <Star
              size={12}
              className={starred ? "fill-amber-500 text-amber-500" : ""}
            />
            {count.toLocaleString()}
          </button>
        </div>
      </div>
    );
  },
);

GitHubRepoCard.displayName = "GitHubRepoCard";
