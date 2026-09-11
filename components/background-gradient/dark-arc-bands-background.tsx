import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkArcBandsBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkArcBandsBackground = forwardRef<
  HTMLDivElement,
  DarkArcBandsBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-arc-bands-background"
      className={cn("relative isolate overflow-hidden bg-[#0A0B0E]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#101218_0%,#0A0B0E_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[28%] left-1/2 -z-10 h-[92%] w-[150%] -translate-x-1/2 rounded-[100%] [background:radial-gradient(ellipse_120%_88%_at_50%_100%,rgba(56,189,248,0.34)_0%,rgba(45,212,191,0.28)_18%,rgba(245,158,11,0.22)_40%,rgba(244,63,94,0.18)_62%,rgba(10,11,14,0)_82%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[22%] left-1/2 -z-10 h-[78%] w-[128%] -translate-x-1/2 rounded-[100%] blur-2xl [background:radial-gradient(ellipse_110%_80%_at_50%_100%,rgba(56,189,248,0.18)_0%,rgba(45,212,191,0.15)_22%,rgba(251,191,36,0.12)_46%,rgba(251,113,133,0.10)_68%,transparent_86%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[18%] left-1/2 -z-10 h-[58%] w-[104%] -translate-x-1/2 rounded-[100%] blur-3xl [background:radial-gradient(ellipse_100%_70%_at_50%_100%,rgba(255,255,255,0.08)_0%,transparent_68%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.04]"
      />

      {children}
    </div>
  );
});

DarkArcBandsBackground.displayName = "DarkArcBandsBackground";

export { DarkArcBandsBackground };
