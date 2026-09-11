import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface LineGridPatternProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const LineGridPattern = forwardRef<HTMLDivElement, LineGridPatternProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="line-grid-pattern"
        className={cn(
          "relative isolate overflow-hidden bg-[#f7f7f7]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(168deg,#fefefe_0%,#f4f4f4_52%,#fafafa_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:repeating-linear-gradient(to_bottom,transparent_0,transparent_21px,rgba(0,0,0,0.07)_21px,rgba(0,0,0,0.07)_22px)] [background-size:100%_22px]"
        />

        {children}
      </div>
    );
  },
);

LineGridPattern.displayName = "LineGridPattern";

export { LineGridPattern };
