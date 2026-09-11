import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface HoneyEmberBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const HoneyEmberBackground = forwardRef<
  HTMLDivElement,
  HoneyEmberBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="honey-ember-background"
      className={cn("relative isolate overflow-hidden bg-[#FFFDF7]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-[#FFFDF7]" />

        <div className="absolute -top-[14%] -left-[6%] h-[70%] w-[70%] rounded-full bg-[#FBBF24] opacity-78 blur-3xl" />

        <div className="absolute top-[8%] right-[-8%] h-[62%] w-[62%] rounded-full bg-[#F59E0B] opacity-70 blur-3xl" />

        <div className="absolute bottom-[-22%] left-[12%] h-[66%] w-[66%] rounded-full bg-[#FB923C] opacity-58 blur-3xl" />

        <div className="absolute right-[20%] bottom-[-10%] h-[56%] w-[56%] rounded-full bg-[#FECACA] opacity-68 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#78350F_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.034]"
      />

      {children}
    </div>
  );
});

HoneyEmberBackground.displayName = "HoneyEmberBackground";

export { HoneyEmberBackground };
