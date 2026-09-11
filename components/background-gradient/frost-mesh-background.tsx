import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface FrostMeshBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const FrostMeshBackground = forwardRef<
  HTMLDivElement,
  FrostMeshBackgroundProps
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="frost-mesh-background"
      className={cn("relative isolate overflow-hidden bg-[#FAFCFD]", className)}
      {...props}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#FAFCFD_0%,#F2F8FA_50%,#EAF4F6_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.22)_1px,transparent_1px)] [background-size:20px_20px] opacity-50"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] [background-size:4px_4px] opacity-30"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-2xl"
      >
        <div className="absolute -top-[18%] -left-[12%] h-[52%] w-[52%] rounded-full bg-[#A5F3FC] opacity-35" />
        <div className="absolute top-[10%] -right-[14%] h-[48%] w-[48%] rounded-full bg-[#6EE7B7] opacity-28" />
        <div className="absolute -bottom-[20%] left-[24%] h-[46%] w-[46%] rounded-full bg-[#99F6E4] opacity-22" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_center,#0F172A_1px,transparent_1px)] [background-size:6px_6px] opacity-[0.03]"
      />

      {children}
    </div>
  );
});

FrostMeshBackground.displayName = "FrostMeshBackground";

export { FrostMeshBackground };
