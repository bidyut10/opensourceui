import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface TerrazzoFragmentBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const TerrazzoFragmentBackground = forwardRef<
  HTMLDivElement,
  TerrazzoFragmentBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="terrazzo-fragment-background"
      className={cn("relative isolate overflow-hidden bg-[#F3F0EA]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FAF8F4_0%,#EEE8DF_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[12%] left-[8%] h-10 w-16 rotate-[-18deg] rounded-md bg-[#D9C4A9] opacity-80" />
        <div className="absolute top-[18%] left-[34%] h-8 w-8 rotate-[24deg] rounded-full bg-[#F43F5E] opacity-35" />
        <div className="absolute top-[10%] right-[18%] h-12 w-20 rotate-[12deg] rounded-lg bg-[#99F6E4] opacity-55" />
        <div className="absolute top-[42%] left-[14%] h-14 w-10 rotate-[36deg] rounded-md bg-[#A8A29E] opacity-55" />
        <div className="absolute top-[36%] right-[12%] h-16 w-12 rotate-[-28deg] rounded-lg bg-[#FCD34D] opacity-45" />
        <div className="absolute bottom-[28%] left-[42%] h-9 w-14 rotate-[-8deg] rounded-md bg-[#2DD4BF] opacity-40" />
        <div className="absolute bottom-[18%] left-[10%] h-12 w-9 rotate-[42deg] rounded-lg bg-[#D6D3D1] opacity-70" />
        <div className="absolute right-[24%] bottom-[14%] h-10 w-16 rotate-[-14deg] rounded-md bg-[#FB923C] opacity-40" />
        <div className="absolute right-[8%] bottom-[34%] h-8 w-8 rotate-[16deg] rounded-full bg-[#78716C] opacity-45" />
        <div className="absolute top-[58%] left-[58%] h-11 w-7 rotate-[30deg] rounded-md bg-[#5EEAD4] opacity-35" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#57534E_1px,transparent_1px)] [background-size:4px_4px] opacity-[0.04]"
      />

      {children}
    </div>
  );
});

TerrazzoFragmentBackground.displayName = "TerrazzoFragmentBackground";

export { TerrazzoFragmentBackground };
