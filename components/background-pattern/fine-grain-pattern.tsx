import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface FineGrainPatternProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const FineGrainPattern = forwardRef<HTMLDivElement, FineGrainPatternProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="fine-grain-pattern"
        className={cn(
          "relative isolate overflow-hidden bg-[#FAFAFA]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle,#d4d4d4_1px,transparent_1px)] [background-size:3px_3px] opacity-55"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle,#e5e5e5_1px,transparent_1px)] [background-size:5px_5px] opacity-40"
        />

        {children}
      </div>
    );
  },
);

FineGrainPattern.displayName = "FineGrainPattern";

export { FineGrainPattern };
