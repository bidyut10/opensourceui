import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkRoseNoirBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkRoseNoirBackground = forwardRef<
  HTMLDivElement,
  DarkRoseNoirBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-rose-noir-background"
      className={cn("relative isolate overflow-hidden bg-[#0E0A0B]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,#181014_0%,#0E0A0B_50%,#080608_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-3xl"
      >
        <div className="absolute top-[12%] -left-[6%] h-[58%] w-[58%] rounded-full bg-[#FB7185] opacity-14" />
        <div className="absolute top-[-8%] right-[10%] h-[52%] w-[52%] rounded-full bg-[#F43F5E] opacity-12" />
        <div className="absolute bottom-[-14%] left-[36%] h-[54%] w-[54%] rounded-full bg-[#FDA4AF] opacity-10" />
        <div className="absolute right-[14%] bottom-[10%] h-[40%] w-[40%] rounded-full bg-[#BE123C] opacity-12" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_58%,rgba(0,0,0,0.4)_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

DarkRoseNoirBackground.displayName = "DarkRoseNoirBackground";

export { DarkRoseNoirBackground };
