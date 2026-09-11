import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface InkWashBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const InkWashBackground = forwardRef<HTMLDivElement, InkWashBackgroundProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="ink-wash-background"
        className={cn(
          "relative isolate overflow-hidden bg-[#FAFAF8]",
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#FFFFFF_0%,#FAFAF8_55%,#F5F5F2_100%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 -z-10 blur-2xl"
        >
          <div className="absolute top-[6%] left-[8%] h-[48%] w-[56%] rounded-[42%_58%_64%_36%] bg-[#A8A29E] opacity-18" />
          <div className="absolute top-[28%] right-[6%] h-[42%] w-[50%] rounded-[58%_42%_38%_62%] bg-[#78716C] opacity-14" />
          <div className="absolute bottom-[4%] left-[24%] h-[46%] w-[54%] rounded-[36%_64%_58%_42%] bg-[#57534E] opacity-12" />
          <div className="absolute right-[22%] bottom-[18%] h-[32%] w-[38%] rounded-[64%_36%_42%_58%] bg-[#A8A29E] opacity-16" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#292524_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.025]"
        />

        {children}
      </div>
    );
  },
);

InkWashBackground.displayName = "InkWashBackground";

export { InkWashBackground };
