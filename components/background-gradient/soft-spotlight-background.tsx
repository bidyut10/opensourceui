import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SoftSpotlightBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const SoftSpotlightBackground = forwardRef<
  HTMLDivElement,
  SoftSpotlightBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="soft-spotlight-background"
      className={cn("relative isolate overflow-hidden bg-[#E8E6E1]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_18%,#FFFFFF_0%,#F7F6F3_38%,#E8E6E1_72%,#D6D3CE_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.9)_0%,transparent_52%)] opacity-40"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_48%,rgba(41,37,36,0.12)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.02]"
      />

      {children}
    </div>
  );
});

SoftSpotlightBackground.displayName = "SoftSpotlightBackground";

export { SoftSpotlightBackground };
