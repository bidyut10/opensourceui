import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkAuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkAuroraBackground = forwardRef<
  HTMLDivElement,
  DarkAuroraBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-aurora-background"
      className={cn("relative isolate overflow-hidden bg-[#0A0C0F]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#12151A_0%,#0A0C0F_55%,#06080A_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-[#0A0C0F]" />

        <div className="absolute -top-[18%] -left-[12%] h-[68%] w-[68%] rounded-full bg-[#2DD4BF] opacity-22 blur-3xl" />

        <div className="absolute top-[8%] -right-[10%] h-[62%] w-[62%] rounded-full bg-[#22D3EE] opacity-18 blur-3xl" />

        <div className="absolute bottom-[-28%] left-[18%] h-[70%] w-[70%] rounded-full bg-[#34D399] opacity-16 blur-3xl" />

        <div className="absolute right-[8%] bottom-[-16%] h-[56%] w-[56%] rounded-full bg-[#38BDF8] opacity-14 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#FFFFFF_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.04]"
      />

      {children}
    </div>
  );
});

DarkAuroraBackground.displayName = "DarkAuroraBackground";

export { DarkAuroraBackground };
