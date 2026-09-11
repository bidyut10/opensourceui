import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkMidnightMeshBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkMidnightMeshBackground = forwardRef<
  HTMLDivElement,
  DarkMidnightMeshBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-midnight-mesh-background"
      className={cn("relative isolate overflow-hidden bg-[#0A0D10]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(145deg,#101418_0%,#0A0D10_52%,#06080A_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.14]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:7px_7px] opacity-[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
      >
        <div className="absolute -top-[16%] -left-[10%] h-[54%] w-[54%] rounded-full bg-[#2DD4BF] opacity-16" />
        <div className="absolute top-[8%] -right-[12%] h-[48%] w-[48%] rounded-full bg-[#38BDF8] opacity-14" />
        <div className="absolute -bottom-[18%] left-[20%] h-[50%] w-[50%] rounded-full bg-[#34D399] opacity-12" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:6px_6px] opacity-[0.04]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_54%,rgba(0,0,0,0.42)_100%)]"
      />

      {children}
    </div>
  );
});

DarkMidnightMeshBackground.displayName = "DarkMidnightMeshBackground";

export { DarkMidnightMeshBackground };
