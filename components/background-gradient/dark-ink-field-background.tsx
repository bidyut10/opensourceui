import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface DarkInkFieldBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const DarkInkFieldBackground = forwardRef<
  HTMLDivElement,
  DarkInkFieldBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dark-ink-field-background"
      className={cn("relative isolate overflow-hidden bg-[#0B0B0B]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#141414_0%,#0B0B0B_52%,#050505_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 blur-2xl"
      >
        <div className="absolute top-[10%] left-[10%] h-[46%] w-[52%] rounded-[42%_58%_64%_36%] bg-[#525252] opacity-16" />
        <div className="absolute top-[30%] right-[8%] h-[40%] w-[48%] rounded-[58%_42%_38%_62%] bg-[#404040] opacity-12" />
        <div className="absolute bottom-[6%] left-[28%] h-[44%] w-[50%] rounded-[36%_64%_58%_42%] bg-[#737373] opacity-10" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

DarkInkFieldBackground.displayName = "DarkInkFieldBackground";

export { DarkInkFieldBackground };
