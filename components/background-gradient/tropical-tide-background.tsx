import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface TropicalTideBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const TropicalTideBackground = forwardRef<
  HTMLDivElement,
  TropicalTideBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="tropical-tide-background"
      className={cn("relative isolate overflow-hidden bg-[#FEFFFE]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-[#FEFFFE]" />

        <div className="absolute bottom-[10%] -left-[16%] h-[74%] w-[74%] rounded-full bg-[#2DD4BF] opacity-72 blur-3xl" />

        <div className="absolute top-[-10%] left-[32%] h-[60%] w-[60%] rounded-full bg-[#BEF264] opacity-75 blur-3xl" />

        <div className="absolute top-[22%] -right-[14%] h-[68%] w-[68%] rounded-full bg-[#38BDF8] opacity-65 blur-3xl" />

        <div className="absolute right-[6%] bottom-[-26%] h-[62%] w-[62%] rounded-full bg-[#34D399] opacity-60 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

TropicalTideBackground.displayName = "TropicalTideBackground";

export { TropicalTideBackground };
