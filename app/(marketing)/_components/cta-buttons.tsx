import Image from "next/image";
import Link from "next/link";

import { ChevronRight, MoveRight } from "lucide-react";

import { siteConfig } from "@/lib/site";

export function CtaButtons() {
  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row">
      <Link
        href="/components"
        className="group flex cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-900 bg-neutral-800 px-4 py-2 text-base font-light text-white shadow-sm transition-all duration-300 hover:shadow-xl"
      >
        Browse Components
        <span className="relative inline-flex size-3.5 shrink-0 items-center justify-center">
          <ChevronRight
            size={14}
            strokeWidth={3}
            className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
          />
          <MoveRight
            size={14}
            strokeWidth={2.5}
            className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
          />
        </span>
      </Link>

      <Link
        href={siteConfig.sponsorship.path}
        className="group flex w-full items-center justify-center gap-2 rounded-md border border-neutral-100/80 bg-white px-4 py-2 text-base text-neutral-800 shadow-sm transition-all duration-300 hover:border-neutral-100 hover:shadow-md md:w-auto"
      >
        <span className="ease-smooth inline-flex origin-[70%_90%] transition-transform duration-500 group-hover:-rotate-12">
          <Image
            src="/waving-hand.png"
            alt=""
            width={512}
            height={512}
            quality={100}
            className="size-4.5"
          />
        </span>
        Become a sponsor
      </Link>
    </div>
  );
}
