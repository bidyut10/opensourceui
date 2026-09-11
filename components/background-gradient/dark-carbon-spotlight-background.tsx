import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkCarbonSpotlightBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkCarbonSpotlightBackground = forwardRef<
  HTMLDivElement,
  DarkCarbonSpotlightBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-carbon-spotlight-background"
      className={cn("relative isolate overflow-hidden bg-[#0C0C0C]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,#1C1C1C_0%,#121212_36%,#0C0C0C_68%,#050505_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14)_0%,transparent_46%)] opacity-50"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.55)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

DarkCarbonSpotlightBackground.displayName = "DarkCarbonSpotlightBackground";

export { DarkCarbonSpotlightBackground };
