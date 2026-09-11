import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkTealDepthBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkTealDepthBackground = forwardRef<
  HTMLDivElement,
  DarkTealDepthBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-teal-depth-background"
      className={cn("relative isolate overflow-hidden bg-[#061014]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(160deg,#0A1820_0%,#061014_45%,#030A0D_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
      >
        <div className="absolute top-[4%] -left-[10%] h-[66%] w-[66%] rounded-full bg-[#0D9488] opacity-22" />
        <div className="absolute top-[20%] -right-[12%] h-[58%] w-[58%] rounded-full bg-[#0891B2] opacity-18" />
        <div className="absolute bottom-[-20%] left-[20%] h-[62%] w-[62%] rounded-full bg-[#14B8A6] opacity-14" />
        <div className="absolute right-[6%] bottom-[2%] h-[48%] w-[48%] rounded-full bg-[#22D3EE] opacity-12" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_80%_20%,rgba(45,212,191,0.08)_0%,transparent_42%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.035]"
      />

      {children}
    </div>
  );
});

DarkTealDepthBackground.displayName = "DarkTealDepthBackground";

export { DarkTealDepthBackground };
