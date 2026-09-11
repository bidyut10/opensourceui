import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface LinenWeaveBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const LinenWeaveBackground = forwardRef<
  HTMLDivElement,
  LinenWeaveBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="linen-weave-background"
      className={cn("relative isolate overflow-hidden bg-[#F7F3ED]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FAF6F0_0%,#F3EDE4_48%,#EFE8DE_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:repeating-linear-gradient(45deg,rgba(120,98,72,0.08)_0px,rgba(120,98,72,0.08)_1px,transparent_1px,transparent_6px),repeating-linear-gradient(-45deg,rgba(120,98,72,0.06)_0px,rgba(120,98,72,0.06)_1px,transparent_1px,transparent_6px)] opacity-60"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,transparent_58%,rgba(120,98,72,0.08)_100%)]"
      />

      {children}
    </div>
  );
});

LinenWeaveBackground.displayName = "LinenWeaveBackground";

export { LinenWeaveBackground };
