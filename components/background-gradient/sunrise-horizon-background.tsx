import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SunriseHorizonBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const SunriseHorizonBackground = forwardRef<
  HTMLDivElement,
  SunriseHorizonBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sunrise-horizon-background"
      className={cn("relative isolate overflow-hidden bg-[#FFF8F3]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFF8F3_0%,#FFE8D8_42%,#FFD9C8_68%,#C8E8EE_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 blur-2xl"
      >
        <div className="absolute bottom-[8%] -left-[15%] h-[55%] w-[70%] rounded-[100%] bg-[#FFB38A] opacity-55" />
        <div className="absolute bottom-[12%] left-[28%] h-[42%] w-[48%] rounded-[100%] bg-[#FF8F6B] opacity-45" />
        <div className="absolute -right-[10%] bottom-[6%] h-[50%] w-[58%] rounded-[100%] bg-[#7DD3C7] opacity-40" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[22%] left-1/2 -z-10 h-28 w-28 -translate-x-1/2 rounded-full bg-[#FFF1DC] opacity-90 blur-md"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.04]"
      />

      {children}
    </div>
  );
});

SunriseHorizonBackground.displayName = "SunriseHorizonBackground";

export { SunriseHorizonBackground };
