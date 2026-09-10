"use client";

import Link from "next/link";

import { siteConfig } from "@/lib/site";

type SponsorPlaceholderRowProps = Readonly<{
  name: string;
  description: string;
  shortDescription?: string;
  domain: string;
}>;

export function SponsorPlaceholderRow({
  name,
  description,
  shortDescription,
  domain,
}: SponsorPlaceholderRowProps) {
  const mobileDescription = shortDescription ?? description;

  return (
    <li className="min-w-0">
      <Link
        href={siteConfig.sponsorship.path}
        className="group flex min-w-0 w-full items-center gap-2.5 py-0.5 max-[499px]:gap-2"
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-dashed border-neutral-300">
          <span className="font-sans text-[10px] text-neutral-400">+</span>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3 max-[499px]:gap-2">
          <p className="hidden min-w-0 flex-1 truncate font-sans text-sm leading-snug min-[500px]:block">
            <span className="font-semibold text-neutral-400 group-hover:text-neutral-600">
              {name}
            </span>
            <span className="text-neutral-300"> / </span>
            <span className="text-neutral-400 group-hover:text-neutral-500">
              {description}
            </span>
          </p>

          <div className="flex min-w-0 flex-1 items-baseline overflow-hidden min-[500px]:hidden">
            <span className="shrink-0 font-sans text-xs leading-snug font-semibold text-neutral-400 group-hover:text-neutral-600">
              {name}
            </span>
            <span className="shrink-0 px-1 font-sans text-xs text-neutral-300">
              /
            </span>
            <span className="min-w-0 truncate font-sans text-xs leading-snug text-neutral-400 group-hover:text-neutral-500">
              {mobileDescription}
            </span>
          </div>

          <span className="shrink-0 font-mono text-sm text-neutral-300 group-hover:text-neutral-400 max-[499px]:text-[11px]">
            {domain}
          </span>
        </div>
      </Link>
    </li>
  );
}
