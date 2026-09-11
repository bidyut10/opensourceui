import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const DEFAULT_NOTE_COLOR = "#d4f84c";
const HANDWRITING_FONT =
  '"Segoe Script", "Bradley Hand", "Snell Roundhand", "Apple Chalkboard", cursive';

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
      <div className="size-10 rounded-md border border-neutral-200 bg-white text-neutral-300">
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className="m-auto mt-2.5 size-5"
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
    </div>
  );
}

function NoteSkeleton() {
  return (
    <div className="flex h-full flex-col justify-between px-2.5 pt-11 pb-2.5">
      <div className="mx-auto h-1 w-10 rounded-full bg-neutral-900/12 motion-safe:animate-pulse" />
      <div className="space-y-1.5">
        <div className="mx-auto h-1.5 w-18 rounded-full bg-neutral-900/16 motion-safe:animate-pulse" />
        <div className="mx-auto h-1.5 w-16 rounded-full bg-neutral-900/12 motion-safe:animate-pulse" />
        <div className="mx-auto h-1.5 w-14 rounded-full bg-neutral-900/10 motion-safe:animate-pulse" />
      </div>
      <div className="mx-auto h-1 w-11 rounded-full bg-neutral-900/12 motion-safe:animate-pulse" />
    </div>
  );
}

function PaperClip({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 56"
      aria-hidden
      className={cn("pointer-events-none h-14 w-6 overflow-visible", className)}
      fill="none"
    >
      <path
        d="M17 5.25C17 2.35 14.65 0 11.75 0C7.85 0 5 3.15 5 7.5V43.5C5 47.15 7.85 50 11.25 50C14.65 50 17 47.15 17 43.5V17.25C17 14.65 15.2 12.75 13 12.75C11.2 12.75 9.75 14.1 9.75 16V37.5"
        stroke="#262626"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export type StickyNotePolaroidFrameProps = Readonly<
  {
    children?: ReactNode;
    noteHeader?: string;
    noteBody?: string;
    noteFooter?: string;
    noteColor?: string;
    noteRotation?: number;
    width?: string | number;
    mediaClassName?: string;
    skeleton?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

export const StickyNotePolaroidFrame = forwardRef<
  HTMLDivElement,
  StickyNotePolaroidFrameProps
>(
  (
    {
      className,
      children,
      noteHeader,
      noteBody,
      noteFooter,
      noteColor = DEFAULT_NOTE_COLOR,
      noteRotation = 3,
      width,
      mediaClassName,
      skeleton = false,
      style,
      ...props
    },
    ref,
  ) => {
    const frameStyle: CSSProperties = {
      ...(width !== undefined ? { width: toCssSize(width) } : undefined),
      ...style,
    };

    const showNote = skeleton || Boolean(noteHeader || noteBody || noteFooter);

    const hasNoteText = Boolean(noteHeader || noteBody || noteFooter);
    const showNoteSkeleton = skeleton && !hasNoteText;

    return (
      <div
        ref={ref}
        data-slot="sticky-note-polaroid-frame"
        className={cn(
          "font-sans",
          width === undefined && "w-70 max-w-full",
          className,
        )}
        style={frameStyle}
        {...props}
      >
        <div className="relative overflow-visible bg-white px-3.5 pt-3.5 pb-14 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_10px_24px_rgba(15,23,42,0.12),0_22px_48px_-6px_rgba(15,23,42,0.1)]">
          <div
            className={cn(
              "relative overflow-hidden bg-neutral-100",
              mediaClassName ?? "aspect-4/5",
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

          {showNote ? (
            <div
              className="absolute top-2.5 right-0 z-10 w-[40%]"
              style={{
                transform: `rotate(${noteRotation}deg)`,
                transformOrigin: "top right",
              }}
            >
              <PaperClip className="absolute -top-3 left-[72%] z-30 -translate-x-1/2" />

              <div
                className="relative aspect-square overflow-hidden shadow-[1px_4px_12px_rgba(15,23,42,0.16)]"
                style={{ backgroundColor: noteColor }}
              >
                {showNoteSkeleton ? (
                  <NoteSkeleton />
                ) : (
                  <div className="flex h-full min-h-0 flex-col justify-between px-2 pt-11 pb-2 text-center text-neutral-900">
                    {noteHeader ? (
                      <p className="truncate text-[7px] leading-none lowercase">
                        {noteHeader}
                      </p>
                    ) : null}

                    {noteBody ? (
                      <p
                        className="line-clamp-5 flex-1 px-0.5 text-[10px] leading-[1.18] font-medium"
                        style={{ fontFamily: HANDWRITING_FONT }}
                      >
                        {noteBody}
                      </p>
                    ) : (
                      <span aria-hidden className="flex-1" />
                    )}

                    {noteFooter ? (
                      <p className="truncate text-[7px] leading-tight lowercase">
                        {noteFooter}
                      </p>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

StickyNotePolaroidFrame.displayName = "StickyNotePolaroidFrame";
