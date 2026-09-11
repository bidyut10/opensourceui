import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SandDriftBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const SandDriftBackground = forwardRef<
  HTMLDivElement,
  SandDriftBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="sand-drift-background"
      className={cn("relative isolate overflow-hidden bg-[#F4EDE4]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FAF4EC_0%,#F0E4D6_52%,#E8D8C8_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -bottom-[28%] -left-[12%] h-[62%] w-[88%] rounded-[100%] bg-[#E8C9A8] opacity-70 blur-sm" />
        <div className="absolute -bottom-[22%] left-[18%] h-[48%] w-[72%] rounded-[100%] bg-[#DDB892] opacity-55 blur-sm" />
        <div className="absolute -right-[8%] -bottom-[18%] h-[54%] w-[64%] rounded-[100%] bg-[#C9A882] opacity-45 blur-sm" />
        <div className="absolute top-[8%] right-[12%] h-[34%] w-[42%] rounded-[100%] bg-[#F5E6D3] opacity-80 blur-md" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#8B7355_1px,transparent_1px)] [background-size:3px_3px] opacity-[0.05]"
      />

      {children}
    </div>
  );
});

SandDriftBackground.displayName = "SandDriftBackground";

export { SandDriftBackground };
