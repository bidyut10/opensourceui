import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface HalftonePopBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const HalftonePopBackground = forwardRef<
  HTMLDivElement,
  HalftonePopBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="halftone-pop-background"
      className={cn("relative isolate overflow-hidden bg-[#FFF9F2]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#FFF9F2_0%,#FFF4E8_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[12%] -right-[10%] -z-10 h-[72%] w-[72%] [background-image:radial-gradient(circle,#FB7185_1.2px,transparent_1.2px)] [background-size:7px_7px] opacity-35"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[14%] -left-[8%] -z-10 h-[68%] w-[68%] [background-image:radial-gradient(circle,#2DD4BF_1.2px,transparent_1.2px)] [background-size:9px_9px] opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[32%] left-[38%] -z-10 h-[48%] w-[48%] [background-image:radial-gradient(circle,#F59E0B_1px,transparent_1px)] [background-size:5px_5px] opacity-22"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_62%,rgba(255,249,242,0.85)_100%)]"
      />

      {children}
    </div>
  );
});

HalftonePopBackground.displayName = "HalftonePopBackground";

export { HalftonePopBackground };
