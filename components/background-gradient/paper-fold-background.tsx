import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface PaperFoldBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const PaperFoldBackground = forwardRef<
  HTMLDivElement,
  PaperFoldBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="paper-fold-background"
      className={cn("relative isolate overflow-hidden bg-[#F8F6F1]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(160deg,#FCFBF8_0%,#F3F0E8_48%,#ECE7DD_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(128deg,transparent_42%,rgba(120,113,108,0.10)_49.5%,rgba(255,255,255,0.55)_50.5%,transparent_58%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:32px_32px] opacity-50"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.65)_0%,transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_78%_82%,rgba(120,113,108,0.08)_0%,transparent_48%)]"
      />

      {children}
    </div>
  );
});

PaperFoldBackground.displayName = "PaperFoldBackground";

export { PaperFoldBackground };
