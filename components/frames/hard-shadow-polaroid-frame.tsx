import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const MEDIA_SLOT =
  "[&_img]:block [&_img]:size-full [&_img]:object-cover [&_video]:block [&_video]:size-full [&_video]:object-cover [&_iframe]:block [&_iframe]:size-full [&_iframe]:border-0";

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

export type HardShadowPolaroidFrameProps = Readonly<
  {
    children?: ReactNode;
    caption?: string;
    width?: string | number;
    mediaClassName?: string;
    skeleton?: boolean;
    shadowOffset?: number;
  } & ComponentPropsWithoutRef<"div">
>;

export const HardShadowPolaroidFrame = forwardRef<
  HTMLDivElement,
  HardShadowPolaroidFrameProps
>(
  (
    {
      className,
      children,
      caption,
      width,
      mediaClassName,
      skeleton = false,
      shadowOffset = 10,
      style,
      ...props
    },
    ref,
  ) => {
    const frameStyle: CSSProperties = {
      ...(width !== undefined ? { width: toCssSize(width) } : undefined),
      ...style,
    };

    const shadowStyle: CSSProperties = {
      boxShadow: `${shadowOffset}px ${shadowOffset}px 0 0 #171717`,
    };

    return (
      <div
        ref={ref}
        data-slot="hard-shadow-polaroid-frame"
        className={cn(
          "font-sans",
          width === undefined && "w-64 max-w-full",
          className,
        )}
        style={frameStyle}
        {...props}
      >
        <div
          style={{
            paddingRight: shadowOffset + 2,
            paddingBottom: shadowOffset + 2,
          }}
        >
          <div
            className="border border-neutral-900 bg-white"
            style={shadowStyle}
          >
            <div className="px-3.5 pt-3.5">
              <div
                className={cn(
                  "relative overflow-hidden border border-neutral-900 bg-neutral-50",
                  mediaClassName ?? "aspect-3/4",
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

            {caption ? (
              <p className="px-3.5 pt-4 pb-9 text-center font-mono text-[13px] tracking-wide text-neutral-900">
                {caption}
              </p>
            ) : (
              <div aria-hidden className="pb-9" />
            )}
          </div>
        </div>
      </div>
    );
  },
);

HardShadowPolaroidFrame.displayName = "HardShadowPolaroidFrame";
