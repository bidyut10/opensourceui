import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkEmberBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkEmberBackground = forwardRef<
  HTMLDivElement,
  DarkEmberBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-ember-background"
      className={cn("relative isolate overflow-hidden bg-[#100C0A]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,#1A1210_0%,#100C0A_48%,#080605_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-2xl"
      >
        <div className="absolute bottom-[6%] -left-[8%] h-[64%] w-[64%] rounded-full bg-[#F59E0B] opacity-20 blur-3xl" />
        <div className="absolute bottom-[12%] left-[32%] h-[52%] w-[52%] rounded-full bg-[#FB923C] opacity-16 blur-3xl" />
        <div className="absolute top-[18%] -right-[6%] h-[58%] w-[58%] rounded-full bg-[#F43F5E] opacity-14 blur-3xl" />
        <div className="absolute top-[4%] left-[14%] h-[44%] w-[44%] rounded-full bg-[#FBBF24] opacity-12 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.035]"
      />

      {children}
    </div>
  );
});

DarkEmberBackground.displayName = "DarkEmberBackground";

export { DarkEmberBackground };
