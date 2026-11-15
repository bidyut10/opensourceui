import { forwardRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";

function RoughFilters() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="hd-rough" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.045}
            numOctaves={2}
            seed={4}
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale={2.6}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="hd-rough-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.035}
            numOctaves={2}
            seed={11}
            result="n2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n2"
            scale={1.5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

function WavyDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2,6 Q5.5,3 9,6 T17,6 T25,6 T33,6 T41,6 T49,6 T57,6 T65,6 T73,6 T81,6 T89,6 T97,6 T105,6 T113,6 T121,6 T129,6 T137,6"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function CircleDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 64"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M40,40 C20,23 53,7 102,5 C153,3 207,11 211,29 C215,47 167,60 109,60
           C59,60 15,53 19,35 C21,27 27,22 37,20"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough)"
      />
      <path
        d="M43,37 C28,25 58,9 105,7 C151,6 199,14 206,29 C212,45 167,57 110,58"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function HighlightDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 170 26"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4,17 C2,11 5,7 12,6 C45,2 95,2 138,4 C152,5 164,7 166,13
           C167,18 163,21 155,22 C112,24 60,24 16,22 C8,21.5 4,20 4,17 Z"
        fill="currentColor"
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function UnderlineDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 10"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3,6 C40,3 100,3 137,5"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function LineDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <span
      aria-hidden="true"
      className={cn("block rounded-full bg-current", className)}
    />
  );
}

function DottedUnderlineDecoration({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-[radial-gradient(circle,currentColor_1.5px,transparent_1.5px)]",
        "bg-size-[0.5em_100%] bg-position-[0_100%] bg-repeat-x",
        className,
      )}
    />
  );
}

function DoubleUnderlineDecoration({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 16"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3,5 C40,2 100,2 137,4"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
      <path
        d="M5,12 C42,9 98,10 135,11"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
        opacity={0.75}
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function StrikethroughDecoration({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 10"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3,5 C40,7 100,3 137,5"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function CrossOutDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 40"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4,32 C40,10 96,30 136,8"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough)"
      />
      <path
        d="M6,10 C44,30 92,12 134,30"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function ArrowUnderlineDecoration({
  className,
}: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 150 18"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3,7 C45,3 105,4 140,8"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
      <path
        d="M132,3 L142,8 L131,13"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hd-rough-soft)"
      />
    </svg>
  );
}

function BracketDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 60"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M18,6 C9,7 6,12 6,30 C6,48 9,53 18,54"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough)"
      />
      <path
        d="M142,6 C151,7 154,12 154,30 C154,48 151,53 142,54"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        fill="none"
        filter="url(#hd-rough)"
      />
    </svg>
  );
}

function BoxDecoration({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 64"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M12,10 C60,6 140,6 188,10 C193,26 193,40 188,54
           C140,58 60,58 12,54 C7,40 7,26 12,10 Z"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hd-rough)"
      />
    </svg>
  );
}

const annotationStyles = {
  wavy: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: WavyDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.4em] left-[-2%] h-[0.7em] w-[104%]",
    defaultColor: "text-purple-300",
  },
  circle: {
    wrapper: "relative inline-block px-1 whitespace-nowrap",
    Decoration: CircleDecoration,
    decorationClassName:
      "pointer-events-none absolute inset-[-0.6em_-0.55em] h-[calc(100%+1.2em)] w-[calc(100%+1.1em)]",
    defaultColor: "text-cyan-200",
  },
  highlight: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: HighlightDecoration,
    decorationClassName:
      "pointer-events-none absolute inset-x-[-4%] bottom-[-0.08em] z-0 h-[1.15em] w-[108%]",
    defaultColor: "text-yellow-300/60",
  },
  underline: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: UnderlineDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.32em] left-[-1%] h-[0.5em] w-[102%]",
    defaultColor: "text-purple-400",
  },
  line: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: LineDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.18em] left-[-1%] block h-[2px] w-[102%]",
    defaultColor: "text-neutral-500",
  },
  dottedUnderline: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: DottedUnderlineDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.35em] left-[-1%] block h-[0.55em] w-[102%]",
    defaultColor: "text-neutral-400",
  },
  doubleUnderline: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: DoubleUnderlineDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.5em] left-[-1%] h-[0.7em] w-[102%]",
    defaultColor: "text-emerald-400",
  },
  strikethrough: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: StrikethroughDecoration,
    decorationClassName:
      "pointer-events-none absolute top-1/2 left-[-1%] h-[0.5em] w-[102%] -translate-y-1/2",
    defaultColor: "text-red-400",
  },
  crossOut: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: CrossOutDecoration,
    decorationClassName:
      "pointer-events-none absolute top-1/2 left-[-2%] h-[1.4em] w-[104%] -translate-y-1/2",
    defaultColor: "text-red-400",
  },
  arrow: {
    wrapper: "relative inline-block whitespace-nowrap",
    Decoration: ArrowUnderlineDecoration,
    decorationClassName:
      "pointer-events-none absolute bottom-[-0.45em] left-[-1%] h-[0.8em] w-[106%]",
    defaultColor: "text-blue-400",
  },
  bracket: {
    wrapper: "relative inline-block px-[0.35em] whitespace-nowrap",
    Decoration: BracketDecoration,
    decorationClassName:
      "pointer-events-none absolute inset-y-[-0.25em] left-[-0.15em] h-[calc(100%+0.5em)] w-[calc(100%+0.3em)]",
    defaultColor: "text-neutral-500",
  },
  box: {
    wrapper: "relative inline-block px-[0.4em] whitespace-nowrap",
    Decoration: BoxDecoration,
    decorationClassName:
      "pointer-events-none absolute inset-[-0.4em_-0.4em] h-[calc(100%+0.8em)] w-[calc(100%+0.8em)]",
    defaultColor: "text-orange-400",
  },
} as const;

type AnnotationVariant = keyof typeof annotationStyles;

type AnnotatedTextProps = Readonly<{
  children: ReactNode;
  variant?: AnnotationVariant;
  color?: string;
  className?: string;
}>;

export const AnnotatedText = forwardRef<HTMLSpanElement, AnnotatedTextProps>(
  ({ children, variant = "wavy", color, className }, ref) => {
    // Fall back to the default style if an unknown variant slips through at runtime.
    const resolvedVariant: AnnotationVariant =
      variant in annotationStyles ? variant : "wavy";
    const style = annotationStyles[resolvedVariant];
    const Decoration = style.Decoration;
    const decorationClass = cn(
      style.decorationClassName,
      color ?? style.defaultColor,
    );

    // Variants whose decoration sits behind the text (avoids covering glyphs).
    const isBehindText = resolvedVariant === "highlight";

    if (isBehindText) {
      return (
        <>
          <RoughFilters />
          <span ref={ref} className={cn(style.wrapper, className)}>
            <span className="relative z-10 font-normal text-neutral-950">
              {children}
            </span>
            <Decoration className={cn(decorationClass, "z-0")} />
          </span>
        </>
      );
    }

    return (
      <>
        <RoughFilters />
        <span
          ref={ref}
          className={cn(
            style.wrapper,
            "font-normal text-neutral-950",
            className,
          )}
        >
          {children}
          <Decoration className={decorationClass} />
        </span>
      </>
    );
  },
);

AnnotatedText.displayName = "AnnotatedText";
