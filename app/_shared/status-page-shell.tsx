import type { ReactNode } from "react";

import { FooterSkyline } from "@/app/(marketing)/_components/footer-skyline";

type StatusPageShellProps = Readonly<{
  mark: string;
  title: string;
  description: string;
  actions: ReactNode;
}>;

/** Minimal status page — short copy in the middle, skyline below. */
export function StatusPageShell({
  mark,
  title,
  description,
  actions,
}: StatusPageShellProps) {
  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-hidden bg-white selection:bg-neutral-800 selection:text-white">
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16 md:px-4">
        <div className="w-full max-w-xl">
          <p className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
            {mark}
          </p>
          <h1 className="mt-3 font-serif text-3xl tracking-tight text-pretty text-neutral-900">
            {title}
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed tracking-tight text-pretty text-neutral-500">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
        </div>
      </div>

      <FooterSkyline className="mt-auto" priority />
    </div>
  );
}

export const statusLinkClassName =
  "text-sm font-medium tracking-tight text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-500";

export const statusMutedLinkClassName =
  "text-sm tracking-tight text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-400";
