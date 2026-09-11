import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface MintLagoonBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const MintLagoonBackground = forwardRef<
  HTMLDivElement,
  MintLagoonBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="mint-lagoon-background"
      className={cn("relative isolate overflow-hidden bg-[#F8FFFE]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl"
      >
        <div className="absolute inset-0 bg-[#F8FFFE]" />

        <div className="absolute top-[-18%] left-[22%] h-[72%] w-[72%] rounded-full bg-[#6EE7B7] opacity-75 blur-3xl" />

        <div className="absolute top-[12%] -right-[12%] h-[60%] w-[60%] rounded-full bg-[#2DD4BF] opacity-68 blur-3xl" />

        <div className="absolute bottom-[-28%] left-[-8%] h-[68%] w-[68%] rounded-full bg-[#22D3EE] opacity-62 blur-3xl" />

        <div className="absolute right-[18%] bottom-[4%] h-[54%] w-[54%] rounded-full bg-[#A7F3D0] opacity-72 blur-3xl" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#0F766E_1px,transparent_1px)] [background-size:5px_5px] opacity-[0.028]"
      />

      {children}
    </div>
  );
});

MintLagoonBackground.displayName = "MintLagoonBackground";

export { MintLagoonBackground };
