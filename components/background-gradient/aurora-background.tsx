import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const AuroraBackground = forwardRef<HTMLDivElement, AuroraBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="aurora-background"
        className={cn(
          "relative isolate overflow-hidden bg-[#FFFEFB]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
        >
          <div className="absolute inset-0 bg-[#FFFEFB]" />

          <div className="absolute -top-[20%] -left-[10%] h-[70%] w-[70%] rounded-full bg-[#E9FF95] opacity-80 blur-3xl" />

          <div className="absolute top-[10%] -right-[10%] h-[65%] w-[65%] rounded-full bg-[#59E39C] opacity-70 blur-3xl" />

          <div className="absolute bottom-[-30%] left-[20%] h-[70%] w-[70%] rounded-full bg-[#1EC9D8] opacity-65 blur-3xl" />

          <div className="absolute right-[10%] bottom-[-20%] h-[60%] w-[60%] rounded-full bg-[#2874F0] opacity-55 blur-3xl" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#000_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.035]"
        />

        {children}
      </div>
    );
  },
);

AuroraBackground.displayName = "AuroraBackground";

export { AuroraBackground };
