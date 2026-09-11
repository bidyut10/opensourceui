import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CherryPetalBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const CherryPetalBackground = forwardRef<
  HTMLDivElement,
  CherryPetalBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="cherry-petal-background"
      className={cn("relative isolate overflow-hidden bg-[#FFF7F8]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,#FFE8EC_0%,#FFF7F8_48%,#FFF1F3_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[8%] left-[10%] h-10 w-14 rotate-[-24deg] rounded-[100%_100%_20%_100%] bg-[#FDA4AF] opacity-55 blur-[0.5px]" />
        <div className="absolute top-[16%] right-[14%] h-8 w-11 rotate-[18deg] rounded-[100%_100%_20%_100%] bg-[#FB7185] opacity-45 blur-[0.5px]" />
        <div className="absolute top-[34%] left-[28%] h-9 w-12 rotate-[32deg] rounded-[100%_100%_20%_100%] bg-[#FECDD3] opacity-60 blur-[0.5px]" />
        <div className="absolute top-[28%] right-[30%] h-7 w-10 rotate-[-12deg] rounded-[100%_100%_20%_100%] bg-[#F43F5E] opacity-30 blur-[0.5px]" />
        <div className="absolute bottom-[30%] left-[16%] h-8 w-11 rotate-[8deg] rounded-[100%_100%_20%_100%] bg-[#FDA4AF] opacity-40 blur-[0.5px]" />
        <div className="absolute right-[10%] bottom-[22%] h-10 w-14 rotate-[-30deg] rounded-[100%_100%_20%_100%] bg-[#FB7185] opacity-50 blur-[0.5px]" />
        <div className="absolute bottom-[12%] left-[48%] h-7 w-9 rotate-[22deg] rounded-[100%_100%_20%_100%] bg-[#FECDD3] opacity-55 blur-[0.5px]" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#9F1239_1px,transparent_1px)] [background-size:6px_6px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

CherryPetalBackground.displayName = "CherryPetalBackground";

export { CherryPetalBackground };
