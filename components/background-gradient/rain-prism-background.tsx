import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface RainPrismBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const RainPrismBackground = forwardRef<
  HTMLDivElement,
  RainPrismBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="rain-prism-background"
      className={cn("relative isolate overflow-hidden bg-[#E9EEF2]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#F4F7FA_0%,#DDE6EE_58%,#C8D5E0_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:repeating-linear-gradient(108deg,rgba(255,255,255,0.55)_0px,rgba(255,255,255,0.55)_1px,transparent_1px,transparent_14px)] opacity-25"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:repeating-linear-gradient(102deg,rgba(148,163,184,0.35)_0px,rgba(148,163,184,0.35)_1px,transparent_1px,transparent_9px)] opacity-20"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(90deg,transparent_0%,rgba(45,212,191,0.16)_24%,rgba(251,113,133,0.14)_52%,rgba(56,189,248,0.16)_78%,transparent_100%)] opacity-35"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#334155_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.05]"
      />

      {children}
    </div>
  );
});

RainPrismBackground.displayName = "RainPrismBackground";

export { RainPrismBackground };
