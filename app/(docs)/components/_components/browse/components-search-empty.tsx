import Link from "next/link";
import type { ReactNode } from "react";

import { getCategoryPath } from "@/lib/showcase/category-slug";
import { getShowcaseEntry } from "@/lib/showcase/showcase";
import { cn } from "@/lib/cn";

const FEATURED = [
  {
    slug: "phone",
    scale: 0.28,
    // Tall left cell — spans both rows on md, both on mobile beside first stack
    cell: "row-span-2",
  },
  {
    slug: "laptop",
    scale: 0.22,
    // Wide top — two columns on md
    cell: "md:col-span-2",
  },
  {
    slug: "apple-watch",
    scale: 0.4,
    cell: "",
  },
  {
    slug: "ipad",
    scale: 0.22,
    cell: "",
  },
  {
    slug: "analog-clock-minimal",
    scale: 0.5,
    cell: "",
  },
  {
    slug: "slide-to-confirm-button",
    scale: 0.52,
    // Full-width footer on mobile; fills last md cell
    cell: "col-span-2 md:col-span-1",
  },
] as const;

const TRY_CATEGORIES = ["Mockups", "Buttons", "Widgets", "Forms"] as const;

function DemoStage({
  scale,
  children,
}: Readonly<{
  scale: number;
  children: ReactNode;
}>) {
  return (
    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-neutral-50">
      <div className="pointer-events-none flex size-0 items-center justify-center">
        <div
          className="origin-center select-none"
          style={{ transform: `scale(${scale})` }}
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function ComponentsSearchEmpty() {
  const featured = FEATURED.map((item) => {
    const entry = getShowcaseEntry(item.slug);
    if (!entry) return null;
    return { ...item, entry };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="min-w-0" role="status">
      <p className="font-mono text-[10px] tracking-[0.14em] text-neutral-400 uppercase">
        Popular demos
      </p>

      {/*
        Bento fills every cell:
        mobile 2-col → phone tall | laptop, watch; then ipad | clock; slide full width
        md 4-col × 2-row → phone tall | laptop wide | watch / phone | ipad | clock | slide
      */}
      <ul
        className={cn(
          "mt-3 grid grid-cols-2 gap-3",
          "auto-rows-[10.5rem]",
          "md:auto-rows-[12.5rem] md:grid-cols-4",
        )}
      >
        {featured.map(({ entry, scale, cell }) => (
          <li key={entry.slug} className={cn("min-w-0", cell)}>
            <Link
              href={`/components/${entry.slug}`}
              className={cn(
                "group flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white",
                "transition-colors hover:border-neutral-300",
              )}
            >
              <DemoStage scale={scale}>{entry.preview}</DemoStage>
              <div className="shrink-0 border-t border-neutral-100 px-3 py-2">
                <p className="truncate font-sans text-xs font-semibold text-neutral-900 group-hover:text-neutral-700">
                  {entry.title}
                </p>
                <p className="mt-0.5 truncate font-sans text-[11px] text-neutral-500">
                  {entry.category}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 border-t border-neutral-100 pt-6 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Suggested categories">
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
            {TRY_CATEGORIES.map((category, index) => (
              <li key={category} className="inline-flex items-center">
                {index > 0 ? (
                  <span className="mx-1.5 text-neutral-300" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link
                  href={getCategoryPath(category)}
                  className="font-sans text-sm text-neutral-600 underline decoration-transparent underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-300"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/components"
          className="font-sans text-sm font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-500"
        >
          Browse all components
        </Link>
      </div>
    </div>
  );
}
