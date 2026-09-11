import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CoralGlowBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CoralGlowBackground = forwardRef<
  HTMLDivElement,
  CoralGlowBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="coral-glow-background"
      className={cn("relative isolate overflow-hidden bg-[#FFFBF9]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-[#FFFBF9]" />

        <div className="absolute top-[6%] -left-[8%] h-[68%] w-[62%] rounded-full bg-[#FDA4AF] opacity-75 blur-3xl" />

        <div className="absolute top-[18%] right-[-6%] h-[58%] w-[58%] rounded-full bg-[#FDBA74] opacity-70 blur-3xl" />

        <div className="absolute bottom-[-24%] left-[30%] h-[64%] w-[64%] rounded-full bg-[#FB7185] opacity-60 blur-3xl" />

        <div className="absolute right-[14%] bottom-[8%] h-[52%] w-[52%] rounded-full bg-[#FDE68A] opacity-65 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

CoralGlowBackground.displayName = "CoralGlowBackground";

export { CoralGlowBackground };
