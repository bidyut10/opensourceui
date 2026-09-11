"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight, MoveRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

import { useForwardWheelToDocsMain } from "@/app/_shared/scroll/docs-scroll";

export function DocsSidebarFooter() {
  const footerRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();
  const { author } = siteConfig;

  useForwardWheelToDocsMain(footerRef);

  return (
    <div
      ref={footerRef}
      className="shrink-0 border-t border-neutral-100 px-5 py-4"
    >
      <p className="font-sans text-xs leading-relaxed text-neutral-500">
        {siteConfig.license.shortNote}{" "}
        <a
          href={siteConfig.license.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
        >
          {siteConfig.license.name}
        </a>
        . By{" "}
        <a
          href={author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-900 hover:decoration-neutral-500"
        >
          {author.name}
        </a>
        .
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          href={siteConfig.sponsorship.path}
          className="group inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2 py-1.5 font-sans text-xs whitespace-nowrap text-neutral-800 shadow-sm transition-colors hover:border-neutral-100 hover:bg-neutral-50"
        >
          See plans
          <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
            <ChevronRight
              size={12}
              strokeWidth={3}
              className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
            />
            <MoveRight
              size={12}
              strokeWidth={2.5}
              className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
            />
          </span>
        </Link>

        <Link
          href="/contact"
          className="group inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-800 px-2 py-1.5 font-sans text-xs whitespace-nowrap text-neutral-100 transition-colors hover:border-neutral-900 hover:bg-neutral-900"
        >
          <span className="ease-smooth inline-flex shrink-0 origin-[70%_90%] transition-transform duration-500 group-hover:-rotate-12">
            <Image
              src="/waving-hand.png"
              alt=""
              width={512}
              height={512}
              quality={100}
              className="size-3.5"
            />
          </span>
          Contact us
        </Link>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-xs text-neutral-400">
        <span>
          © {year} {siteConfig.displayName}
        </span>
      </div>
    </div>
  );
}
