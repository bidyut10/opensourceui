import Link from "next/link";

import { cn } from "@/lib/cn";

type SkipToContentProps = Readonly<{
  className?: string;
}>;

/** Visually hidden until focused — first focusable control in the document. */
export function SkipToContent({ className }: SkipToContentProps) {
  return (
    <Link
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100]",
        "focus:rounded-md focus:border focus:border-neutral-800 focus:bg-white",
        "focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900",
        "focus:outline-none",
        className,
      )}
    >
      Skip to content
    </Link>
  );
}
