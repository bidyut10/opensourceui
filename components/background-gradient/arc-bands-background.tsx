import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface ArcBandsBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const ArcBandsBackground = forwardRef<HTMLDivElement, ArcBandsBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="arc-bands-background"
        className={cn(
          "relative isolate overflow-hidden bg-[#FFFCF7]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFCF7_0%,#FFF8F0_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[28%] left-1/2 -z-10 h-[92%] w-[150%] -translate-x-1/2 rounded-[100%] [background:radial-gradient(ellipse_120%_88%_at_50%_100%,rgba(56,189,248,0.52)_0%,rgba(45,212,191,0.44)_18%,rgba(245,158,11,0.38)_40%,rgba(244,63,94,0.30)_62%,rgba(255,252,247,0)_82%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[22%] left-1/2 -z-10 h-[78%] w-[128%] -translate-x-1/2 rounded-[100%] blur-2xl [background:radial-gradient(ellipse_110%_80%_at_50%_100%,rgba(56,189,248,0.28)_0%,rgba(45,212,191,0.24)_22%,rgba(251,191,36,0.20)_46%,rgba(251,113,133,0.16)_68%,transparent_86%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[18%] left-1/2 -z-10 h-[64%] w-[108%] -translate-x-1/2 rounded-[100%] blur-3xl [background:radial-gradient(ellipse_100%_72%_at_50%_100%,rgba(255,255,255,0.55)_0%,rgba(255,252,247,0.18)_38%,transparent_72%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
        />

        {children}
      </div>
    );
  },
);

ArcBandsBackground.displayName = "ArcBandsBackground";

export { ArcBandsBackground };
