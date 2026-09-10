import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const DEFAULT_LINE_COLOR = "#171717";
const DEFAULT_HANDLE_COLOR = "#171717";
const PLUS_STROKE = 2;

function resolveFrameColors({
  color,
  lineColor,
  handleColor,
}: Readonly<{
  color?: string;
  lineColor?: string;
  handleColor?: string;
}>) {
  const shared = color ?? DEFAULT_LINE_COLOR;

  return {
    line: lineColor ?? shared,
    handle: handleColor ?? color ?? DEFAULT_HANDLE_COLOR,
  };
}

const MEDIA_SLOT =
  "[&_img]:block [&_img]:size-full [&_img]:object-cover [&_video]:block [&_video]:size-full [&_video]:object-cover [&_iframe]:block [&_iframe]:size-full [&_iframe]:border-0";

const FRAME_INSET = "top-2 right-2 bottom-2 left-2";
const FRAME_EDGE_X = "inset-x-0";
const FRAME_EDGE_Y = "inset-y-0";

function toCssSize(value: string | number) {
  return typeof value === "number" ? `${value}px` : value;
}

function MediaSkeleton() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-100">
      <div className="absolute inset-0 bg-neutral-200/45 motion-safe:animate-pulse" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          aria-hidden
          className="size-14 text-neutral-300"
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

function MediaIcon({
  children,
  label,
}: Readonly<{ children: ReactNode; label: string }>) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex size-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500">
        {children}
      </div>
      <span className="font-mono text-[9px] text-neutral-400">{label}</span>
    </div>
  );
}

function MediaPlaceholder() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-neutral-50 p-4">
      <div className="flex items-center gap-4">
        <MediaIcon label="image">
          <svg viewBox="0 0 20 20" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
            <circle cx="7" cy="8.5" r="1.25" fill="currentColor" stroke="none" />
            <path d="M5.5 14l3.5-3 2.5 2 2-1.5 3 2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </MediaIcon>

        <MediaIcon label="video">
          <svg viewBox="0 0 20 20" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2.5" y="5" width="10" height="10" rx="1.5" />
            <path d="M12.5 8.5l4.5-2.5v8l-4.5-2.5z" strokeLinejoin="round" />
          </svg>
        </MediaIcon>

        <MediaIcon label="media">
          <svg viewBox="0 0 20 20" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="14" height="14" rx="2" />
            <path d="M7 10h6M10 7v6" strokeLinecap="round" />
          </svg>
        </MediaIcon>
      </div>

      <p className="font-sans text-[11px] text-neutral-500">
        Pass image, video, or media as children
      </p>
    </div>
  );
}

type CornerPlusProps = Readonly<{
  handleColor: string;
  className?: string;
}>;

function CornerPlus({ className, handleColor }: CornerPlusProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-20 size-4 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-full overflow-visible"
        fill="none"
        shapeRendering="crispEdges"
      >
        <path
          d="M8 0v16M0 8h16"
          stroke={handleColor}
          strokeLinecap="butt"
          strokeWidth={PLUS_STROKE}
        />
      </svg>
    </span>
  );
}

type FrameEdgeProps = Readonly<{
  lineColor: string;
  className?: string;
}>;

function FrameEdge({ className, lineColor }: FrameEdgeProps) {
  return (
    <span
      aria-hidden
      style={{ borderColor: lineColor }}
      className={cn("pointer-events-none absolute z-10", className)}
    />
  );
}

export type TransformPlusFrameProps = Readonly<
  {
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    color?: string;
    lineColor?: string;
    handleColor?: string;
    mediaClassName?: string;
    label?: string;
    skeleton?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

export const TransformPlusFrame = forwardRef<
  HTMLDivElement,
  TransformPlusFrameProps
>(
  (
    {
      className,
      children,
      width,
      height,
      color,
      lineColor,
      handleColor,
      mediaClassName,
      label,
      skeleton = false,
      style,
      ...props
    },
    ref,
  ) => {
    const hasFixedHeight = height !== undefined;
    const colors = resolveFrameColors({ color, lineColor, handleColor });

    const frameStyle: CSSProperties = {
      ...(width !== undefined ? { width: toCssSize(width) } : undefined),
      ...(height !== undefined ? { height: toCssSize(height) } : undefined),
      ...style,
    };

    return (
      <div
        ref={ref}
        data-slot="transform-plus-frame"
        className={cn(
          "font-sans",
          width === undefined && "w-full max-w-xl",
          className,
        )}
        style={frameStyle}
        {...props}
      >
        <div className={cn("relative p-2", hasFixedHeight && "h-full")}>
          <div
            className={cn(
              "relative z-0 min-h-0 overflow-hidden bg-neutral-50",
              hasFixedHeight ? "h-full" : (mediaClassName ?? "aspect-video"),
            )}
          >
            <div className={cn("absolute inset-0", MEDIA_SLOT)}>
              {skeleton ? (
                <MediaSkeleton />
              ) : (
                children ?? <MediaPlaceholder />
              )}
            </div>
          </div>

          <FrameEdge
            lineColor={colors.line}
            className={cn(FRAME_INSET, FRAME_EDGE_X, "border-t")}
          />
          <FrameEdge
            lineColor={colors.line}
            className={cn(FRAME_INSET, FRAME_EDGE_Y, "border-r")}
          />
          <FrameEdge
            lineColor={colors.line}
            className={cn(FRAME_INSET, FRAME_EDGE_X, "border-b")}
          />
          <FrameEdge
            lineColor={colors.line}
            className={cn(FRAME_INSET, FRAME_EDGE_Y, "border-l")}
          />

          <CornerPlus
            handleColor={colors.handle}
            className="top-2 left-2"
          />
          <CornerPlus
            handleColor={colors.handle}
            className="top-2 right-2 translate-x-1/2"
          />
          <CornerPlus
            handleColor={colors.handle}
            className="bottom-2 left-2 translate-y-1/2"
          />
          <CornerPlus
            handleColor={colors.handle}
            className="right-2 bottom-2 translate-x-1/2 translate-y-1/2"
          />
        </div>

        {label ? (
          <p className="mt-2 text-center font-mono text-[10px] tracking-[0.16em] text-neutral-400 uppercase">
            {label}
          </p>
        ) : null}
      </div>
    );
  },
);

TransformPlusFrame.displayName = "TransformPlusFrame";
