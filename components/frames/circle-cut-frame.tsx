import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const MEDIA_SLOT =
  "[&_img]:block [&_img]:size-full [&_img]:object-cover [&_video]:block [&_video]:size-full [&_video]:object-cover [&_iframe]:block [&_iframe]:size-full [&_iframe]:border-0";

const FRAME_COLOR = "#ffffff";

function toCssSize(value: string | number) {
  return typeof value === "number" ? `${value}px` : value;
}

function edgeCutStyle(
  edge: "top" | "bottom" | "left" | "right",
  color: string,
): CSSProperties {
  if (edge === "top") {
    return {
      background: `radial-gradient(circle at 8px 0, transparent 6px, ${color} 6px)`,
      backgroundSize: "16px 8px",
    };
  }

  if (edge === "bottom") {
    return {
      background: `radial-gradient(circle at 8px 8px, transparent 6px, ${color} 6px)`,
      backgroundSize: "16px 8px",
    };
  }

  if (edge === "left") {
    return {
      background: `radial-gradient(circle at 0 8px, transparent 6px, ${color} 6px)`,
      backgroundSize: "8px 16px",
    };
  }

  return {
    background: `radial-gradient(circle at 8px 8px, transparent 6px, ${color} 6px)`,
    backgroundSize: "8px 16px",
  };
}

function MediaSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-50">
      <div className="absolute inset-0 bg-neutral-100/50 motion-safe:animate-pulse" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          aria-hidden
          className="size-14 text-neutral-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="4" y="8" width="40" height="32" rx="2" />
          <circle cx="16" cy="18" r="3" fill="currentColor" stroke="none" />
          <path
            d="M8 34l10-9 7 6 6-5 9 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function MediaPlaceholder() {
  return (
    <div className="flex size-full items-center justify-center bg-neutral-100">
      <svg
        viewBox="0 0 20 20"
        aria-hidden
        className="size-5 text-neutral-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
        <circle cx="7" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
        <path
          d="M5.5 14l3.5-3 2.5 2 2-1.5 3 2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export type CircleCutFrameProps = Readonly<
  {
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    mediaClassName?: string;
    skeleton?: boolean;
    frameColor?: string;
  } & ComponentPropsWithoutRef<"div">
>;

export const CircleCutFrame = forwardRef<HTMLDivElement, CircleCutFrameProps>(
  (
    {
      className,
      children,
      width,
      height,
      mediaClassName,
      skeleton = false,
      frameColor = FRAME_COLOR,
      style,
      ...props
    },
    ref,
  ) => {
    const hasFixedWidth = width !== undefined;
    const hasFixedHeight = height !== undefined;
    const hasFixedSize = hasFixedWidth && hasFixedHeight;

    const frameStyle: CSSProperties = {
      ...(hasFixedWidth ? { width: toCssSize(width) } : undefined),
      ...(hasFixedHeight ? { height: toCssSize(height) } : undefined),
      ...style,
    };

    return (
      <div
        ref={ref}
        data-slot="circle-cut-frame"
        className={cn(
          "font-sans",
          !hasFixedWidth && "w-64 max-w-full",
          className,
        )}
        style={frameStyle}
        {...props}
      >
        <div
          className={cn(
            "relative flex flex-col p-4 shadow-md",
            hasFixedHeight && "h-full min-h-0",
          )}
          style={{ backgroundColor: frameColor }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-2 right-0 left-0 h-2"
            style={edgeCutStyle("top", frameColor)}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-0 -bottom-2 left-0 h-2"
            style={edgeCutStyle("bottom", frameColor)}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 -left-2 w-2"
            style={edgeCutStyle("left", frameColor)}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 -right-2 bottom-0 w-2"
            style={edgeCutStyle("right", frameColor)}
          />

          <div
            className={cn(
              "relative min-h-0 overflow-hidden bg-white",
              hasFixedSize || hasFixedHeight
                ? "flex-1"
                : (mediaClassName ?? "aspect-square"),
            )}
          >
            <div className={cn("absolute inset-0", MEDIA_SLOT)}>
              {skeleton ? (
                <MediaSkeleton />
              ) : (
                (children ?? <MediaPlaceholder />)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

CircleCutFrame.displayName = "CircleCutFrame";
