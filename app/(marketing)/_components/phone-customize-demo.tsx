"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card";
import { cn } from "@/lib/cn";
import { HighlightedPartialLine } from "@/lib/showcase/highlight-code";
import { BOX_PATTERN } from "@/lib/shared";

const CODE = `import { PhoneMockupCard } from "@/components/mockups/phone-mockup-card";
import Image from "next/image";

<PhoneMockupCard variant="orange">
  <Image
    src="/background4.webp"
    alt=""
    fill
    className="object-cover"
  />
</PhoneMockupCard>`;

const CODE_LINES = CODE.split("\n");
const CHAR_MS = 22;
const PAUSE_MS = 450;
const PREVIEW_MS = 3200;
const LOOP_MS = 600;

type Phase = "code" | "preview";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function getTypedLines(typedLength: number) {
  const typed = CODE.slice(0, typedLength);
  const typedLines = typed.split("\n");
  const activeIndex = typedLines.length - 1;

  return CODE_LINES.map((fullLine, index) => ({
    number: index + 1,
    visibleText: index < typedLines.length ? (typedLines[index] ?? "") : "",
    isActive: index === activeIndex,
    started: index < typedLines.length,
  }));
}

function CodeEditor({
  typedLength,
  visible,
  typing,
}: Readonly<{
  typedLength: number;
  visible: boolean;
  typing: boolean;
}>) {
  const lines = getTypedLines(typedLength);
  const progress = CODE.length > 0 ? typedLength / CODE.length : 0;

  return (
    <div
      className={cn(
        "ease-smooth relative flex w-full flex-col overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-[opacity,transform] duration-700 motion-reduce:transition-none",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-3 scale-[0.97] opacity-0",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,#262626_0%,#2f2f2f_45%,#262626_100%)] bg-size-[220%_220%] motion-safe:animate-[code-panel-shift_12s_ease-in-out_infinite]"
      />

      <div className="relative flex shrink-0 items-center gap-2.5 border-b border-neutral-700/80 px-3.5 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-neutral-600" />
          <span className="size-2 rounded-full bg-neutral-600" />
          <span className="size-2 rounded-full bg-neutral-600" />
        </div>
        <p className="min-w-0 flex-1 truncate font-mono text-[10px] text-neutral-400 md:text-[11px]">
          phone-demo.tsx
        </p>
        <span className="font-mono text-[9px] text-neutral-500 tabular-nums">
          {Math.round(progress * 100)}%
        </span>
      </div>

      <div className="relative overflow-x-auto px-2 py-2.5 font-mono text-[10px] leading-[1.65] md:text-[11px] md:leading-[1.7]">
        {lines.map((line) => (
          <div
            key={line.number}
            className={cn(
              "grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-2 rounded-md px-1 transition-colors duration-200",
              line.isActive && typing && "bg-neutral-700/40",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "pt-px text-right tabular-nums select-none",
                line.isActive && typing
                  ? "text-neutral-300"
                  : line.started
                    ? "text-neutral-500"
                    : "text-neutral-700",
              )}
            >
              {line.number}
            </span>
            <pre className="min-w-0 wrap-break-word whitespace-pre-wrap">
              <code>
                {line.started ? (
                  <HighlightedPartialLine
                    text={line.visibleText}
                    lineNumber={line.number}
                    tone="dual"
                  />
                ) : (
                  <span className="text-neutral-700">&nbsp;</span>
                )}
                {line.isActive && typing ? (
                  <span
                    className="ml-px inline-block h-3.5 w-0.5 translate-y-px bg-neutral-200 motion-safe:animate-[caret-blink_1s_steps(1)_infinite]"
                    aria-hidden
                  />
                ) : null}
              </code>
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhoneCustomizeDemo() {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("code");
  const [typedLength, setTypedLength] = useState(0);
  const [editorVisible, setEditorVisible] = useState(true);

  const typing = typedLength < CODE.length;

  useEffect(() => {
    if (reducedMotion) {
      const timer = globalThis.setTimeout(() => {
        setPhase("preview");
        setTypedLength(CODE.length);
        setEditorVisible(false);
      }, 0);
      return () => globalThis.clearTimeout(timer);
    }

    const resetTimer = globalThis.setTimeout(() => {
      setPhase("code");
      setTypedLength(0);
      setEditorVisible(false);
    }, 0);
    const openTimer = globalThis.setTimeout(() => setEditorVisible(true), 120);
    return () => {
      globalThis.clearTimeout(resetTimer);
      globalThis.clearTimeout(openTimer);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "code") return;

    if (typedLength >= CODE.length) {
      const reveal = globalThis.setTimeout(() => {
        setEditorVisible(false);
        globalThis.setTimeout(() => setPhase("preview"), PAUSE_MS);
      }, PAUSE_MS);
      return () => globalThis.clearTimeout(reveal);
    }

    const timer = globalThis.setTimeout(() => {
      setTypedLength((current) => current + 1);
    }, CHAR_MS);

    return () => globalThis.clearTimeout(timer);
  }, [phase, typedLength, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase !== "preview") return;

    const restart = globalThis.setTimeout(() => {
      setPhase("code");
      setTypedLength(0);
      setEditorVisible(false);
      globalThis.setTimeout(() => setEditorVisible(true), LOOP_MS);
    }, PREVIEW_MS);

    return () => globalThis.clearTimeout(restart);
  }, [phase, reducedMotion]);

  return (
    <div
      className="pointer-events-none mt-16 w-full overflow-hidden rounded-2xl border border-neutral-100"
      style={BOX_PATTERN}
      aria-hidden
    >
      <div className="relative flex min-h-168 w-full items-center justify-center px-4 py-10 md:px-8">
        <div className="relative w-full max-w-104">
          {!reducedMotion ? (
            <div
              className={cn(
                "ease-smooth flex w-full items-center justify-center transition-[opacity,transform] duration-700 motion-reduce:transition-none",
                phase === "code"
                  ? "relative z-10 translate-y-0 opacity-100"
                  : "pointer-events-none absolute inset-0 z-0 -translate-y-2 scale-[0.98] opacity-0",
              )}
              aria-hidden={phase !== "code"}
            >
              <CodeEditor
                typedLength={typedLength}
                visible={editorVisible}
                typing={typing}
              />
            </div>
          ) : null}

          <div
            className={cn(
              "ease-smooth flex items-center justify-center transition-[opacity,transform] duration-700 motion-reduce:transition-none",
              phase === "preview"
                ? "relative z-10 translate-y-0 scale-100 opacity-100"
                : "pointer-events-none absolute inset-0 z-0 translate-y-2 scale-[0.96] opacity-0",
            )}
            aria-hidden={phase !== "preview"}
          >
            <div className="origin-center scale-[0.88] md:scale-95">
              <PhoneMockupCard variant="orange">
                <div className="relative h-full w-full">
                  <Image
                    src="/background6.webp"
                    alt=""
                    fill
                    sizes="256px"
                    className="object-cover"
                  />
                </div>
              </PhoneMockupCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
