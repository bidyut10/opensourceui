"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";

const ACTIVITY_RINGS = [
  {
    r: 26,
    c: 163,
    fill: "121 163",
    color: "text-rose-500",
    track: "text-rose-500/15",
    draw: "motion-safe:animate-[watch-ring-draw-outer_1.1s_ease-out_forwards]",
  },
  {
    r: 19,
    c: 119,
    fill: "74 119",
    color: "text-emerald-400",
    track: "text-emerald-400/15",
    draw: "motion-safe:animate-[watch-ring-draw-middle_1.1s_ease-out_0.15s_forwards]",
  },
  {
    r: 12,
    c: 75,
    fill: "66 75",
    color: "text-cyan-400",
    track: "text-cyan-400/15",
    draw: "motion-safe:animate-[watch-ring-draw-inner_1.1s_ease-out_0.3s_forwards]",
  },
] as const;

const FACES = ["clock", "activity", "brand"] as const;

const FACE_DURATIONS_MS: Record<(typeof FACES)[number], number> = {
  clock: 5000,
  activity: 3200,
  brand: 2800,
};

const WATCH_TICKS = Array.from({ length: 12 }, (_, index) => {
  const angle = (index * 30 * Math.PI) / 180;
  const inner = 42;
  const outer = index % 3 === 0 ? 46 : 44;
  const format = (value: number) => value.toFixed(2);

  return {
    index,
    major: index % 3 === 0,
    x1: format(50 + inner * Math.sin(angle)),
    y1: format(50 - inner * Math.cos(angle)),
    x2: format(50 + outer * Math.sin(angle)),
    y2: format(50 - outer * Math.cos(angle)),
  };
});

function formatAngle(angle: number) {
  return angle.toFixed(2);
}

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

function WatchAnalogFace({ active }: { active: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const tick = () => {
      setNow(Date.now());
      frame = globalThis.requestAnimationFrame(tick);
    };

    frame = globalThis.requestAnimationFrame(tick);
    return () => globalThis.cancelAnimationFrame(frame);
  }, [active]);

  const date = !active || now === null ? null : new Date(now);
  const hours = date ? date.getHours() % 12 : 0;
  const minutes = date ? date.getMinutes() : 0;
  const seconds = date ? date.getSeconds() + date.getMilliseconds() / 1000 : 0;
  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <svg viewBox="0 0 100 100" className="size-[86%]" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          className="text-white/10"
        />
        {WATCH_TICKS.map((tick) => (
          <line
            key={tick.index}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke="currentColor"
            strokeWidth={tick.major ? 1 : 0.5}
            className="text-white/35"
            strokeLinecap="round"
          />
        ))}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="34"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="text-white"
          transform={`rotate(${formatAngle(hourAngle)} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="text-white/90"
          transform={`rotate(${formatAngle(minuteAngle)} 50 50)`}
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          className="text-rose-400"
          transform={`rotate(${formatAngle(secondAngle)} 50 50)`}
        />
        <circle cx="50" cy="50" r="1.6" className="fill-white" />
      </svg>
    </div>
  );
}

function WatchActivityFace({ active }: { active: boolean }) {
  const reducedMotion = usePrefersReducedMotion();
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (!active) return;

    const frame = globalThis.requestAnimationFrame(() => setDraw(true));
    return () => globalThis.cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black font-sans text-white">
      <div className="size-[78%]">
        <svg viewBox="0 0 64 64" className="size-full -rotate-90">
          {ACTIVITY_RINGS.map((ring) => (
            <g key={ring.r}>
              <circle
                cx="32"
                cy="32"
                r={ring.r}
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className={ring.track}
              />
              <circle
                cx="32"
                cy="32"
                r={ring.r}
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray={
                  reducedMotion && active ? ring.fill : `0 ${ring.c}`
                }
                strokeLinecap="round"
                className={cn(
                  ring.color,
                  active && draw && !reducedMotion && ring.draw,
                )}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function WatchBrandFace({ active }: { active: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black px-4 text-center text-white">
      <div
        className={cn(
          "mb-2 h-px w-6 bg-cyan-400/60",
          active &&
            "motion-safe:animate-[watch-brand-line_0.55s_ease-out_both]",
        )}
      />
      <p
        className={cn(
          "font-serif text-[10px] leading-none tracking-tight",
          active &&
            "motion-safe:animate-[watch-brand-line_0.65s_ease-out_0.12s_both]",
        )}
      >
        Opensource
      </p>
      <p
        className={cn(
          "mt-1 font-sans text-[7px] font-medium tracking-[0.22em] text-white/50 uppercase",
          active &&
            "motion-safe:animate-[watch-brand-line_0.65s_ease-out_0.28s_both]",
        )}
      >
        UI
      </p>
    </div>
  );
}

const FACE_COMPONENTS = {
  clock: WatchAnalogFace,
  activity: WatchActivityFace,
  brand: WatchBrandFace,
} as const;

export function WatchShowcaseScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const timeout = globalThis.setTimeout(() => {
      setIndex((current) => (current + 1) % FACES.length);
    }, FACE_DURATIONS_MS[FACES[index]]);

    return () => globalThis.clearTimeout(timeout);
  }, [index, reducedMotion]);

  const activeIndex = reducedMotion ? 0 : index;

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {FACES.map((faceId, faceIndex) => {
        const Face = FACE_COMPONENTS[faceId];
        const isActive = faceIndex === activeIndex;

        return (
          <div
            key={faceId}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0",
              isActive
                ? "ease-smooth z-10 opacity-100 transition-opacity duration-300 motion-reduce:transition-none"
                : "pointer-events-none z-0 opacity-0",
            )}
          >
            <Face active={isActive} />
          </div>
        );
      })}
    </div>
  );
}
