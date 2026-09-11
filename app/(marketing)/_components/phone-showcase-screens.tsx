"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Cloud,
  Moon,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sun,
} from "lucide-react";

import { AppleHelloLoader } from "@/components/loaders/apple-hello-loader";
import { cn } from "@/lib/cn";

const MEMORY_SETS = [
  {
    id: "kyoto",
    place: "Kyoto",
    date: "Mar 12",
    hero: "/background5.webp",
    thumbs: ["/background1.webp", "/background4.webp"] as const,
  },
  {
    id: "osaka",
    place: "Osaka",
    date: "Apr 03",
    hero: "/background1.webp",
    thumbs: ["/background5.webp", "/background4.webp"] as const,
  },
  {
    id: "tokyo",
    place: "Tokyo",
    date: "May 18",
    hero: "/background4.webp",
    thumbs: ["/background1.webp", "/background5.webp"] as const,
  },
] as const;

const WEATHER_THEMES = [
  {
    id: "morning",
    bg: "bg-linear-to-b from-amber-200 via-orange-300 to-rose-300",
    period: "Morning",
    temp: "18",
    condition: "Clear skies",
    high: "22°",
    low: "15°",
    type: "sunrise" as const,
    hourly: [
      { id: "now", label: "Now", temp: "18°" },
      { id: "10am", label: "10AM", temp: "20°" },
      { id: "12pm", label: "12PM", temp: "22°" },
    ],
  },
  {
    id: "day",
    bg: "bg-linear-to-b from-sky-300 via-sky-500 to-sky-700",
    period: "Afternoon",
    temp: "24",
    condition: "Partly cloudy",
    high: "26°",
    low: "19°",
    type: "day" as const,
    hourly: [
      { id: "now", label: "Now", temp: "24°" },
      { id: "2pm", label: "2PM", temp: "27°" },
      { id: "4pm", label: "4PM", temp: "25°" },
    ],
  },
  {
    id: "night",
    bg: "bg-linear-to-b from-slate-700 via-slate-800 to-slate-950",
    period: "Night",
    temp: "14",
    condition: "Clear night",
    high: "16°",
    low: "12°",
    type: "night" as const,
    hourly: [
      { id: "now", label: "Now", temp: "14°" },
      { id: "10pm", label: "10PM", temp: "12°" },
      { id: "12am", label: "12AM", temp: "11°" },
    ],
  },
] as const;

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

export function HelloPhoneScreen() {
  return <AppleHelloLoader fill />;
}

export function LibraryPhoneScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = globalThis.setInterval(() => {
      setIndex((current) => (current + 1) % MEMORY_SETS.length);
    }, 4200);

    return () => globalThis.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-neutral-950 font-sans text-white">
      {MEMORY_SETS.map((item, itemIndex) => (
        <div
          key={item.id}
          aria-hidden={itemIndex !== index}
          className={cn(
            "absolute inset-0 flex flex-col px-3 pt-11 pb-3 transition-opacity duration-700 ease-out motion-reduce:transition-none",
            itemIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-wide text-white/45 uppercase">
                Memories
              </p>
              <h2 className="mt-0.5 font-serif text-[1.35rem] leading-tight">
                {item.place}
              </h2>
            </div>
            <p className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/70 tabular-nums">
              {item.date}
            </p>
          </div>

          <div className="relative mt-3.5 aspect-4/5 w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/30">
            <Image
              src={item.hero}
              alt=""
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent px-3 py-3">
              <p className="font-serif text-sm leading-tight">{item.place}</p>
              <p className="mt-0.5 text-[10px] text-white/65">{item.date}</p>
            </div>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            {item.thumbs.map((thumb) => (
              <div
                key={`${item.id}-${thumb}`}
                className="relative aspect-5/4 overflow-hidden rounded-xl border border-white/10"
              >
                <Image
                  src={thumb}
                  alt=""
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-auto flex justify-center gap-1.5 pt-2">
            {MEMORY_SETS.map((dot, dotIndex) => (
              <span
                key={dot.id}
                aria-hidden
                className={cn(
                  "h-1 rounded-full transition-all duration-300 motion-reduce:transition-none",
                  dotIndex === index ? "w-4 bg-white" : "w-1 bg-white/30",
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WeatherPhoneScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const interval = globalThis.setInterval(() => {
      setIndex((current) => (current + 1) % WEATHER_THEMES.length);
    }, 4500);

    return () => globalThis.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden font-sans text-white">
      {WEATHER_THEMES.map((item, itemIndex) => (
        <div
          key={item.id}
          aria-hidden={itemIndex !== index}
          className={cn(
            "absolute inset-0 flex flex-col px-3 pt-10 pb-3 transition-opacity duration-1000 ease-out motion-reduce:transition-none",
            item.bg,
            itemIndex === index ? "opacity-100" : "opacity-0",
          )}
        >
          <div className="mt-4 flex flex-col items-center text-center">
            <div className="flex h-14 items-center justify-center">
              {item.type === "night" ? (
                <Moon
                  size={44}
                  strokeWidth={1.25}
                  className="text-amber-100"
                  aria-hidden
                />
              ) : item.type === "day" ? (
                <div className="relative size-14">
                  <Sun
                    size={40}
                    strokeWidth={1.25}
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-amber-100"
                    aria-hidden
                  />
                  <Cloud
                    size={30}
                    strokeWidth={1.25}
                    className="absolute right-0 bottom-0 text-white/90"
                    aria-hidden
                  />
                </div>
              ) : (
                <Sun
                  size={44}
                  strokeWidth={1.25}
                  className="text-orange-50"
                  aria-hidden
                />
              )}
            </div>

            <p className="mt-1 font-serif text-[4.5rem] leading-none tracking-tight tabular-nums">
              {item.temp}
              <span className="align-top text-3xl font-light">°</span>
            </p>
            <p className="mt-1 text-sm font-medium text-white/90">
              {item.condition}
            </p>
            <p className="mt-1 text-[11px] text-white/60">
              H:{item.high} · L:{item.low}
            </p>
          </div>

          <div className="mt-auto rounded-2xl bg-white/18 px-2.5 py-2.5 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-1.5">
              {item.hourly.map((hour) => (
                <div
                  key={`${item.id}-${hour.id}`}
                  className={cn(
                    "flex flex-col items-center rounded-xl px-1 py-2",
                    hour.id === "now" ? "bg-white/28" : "bg-white/10",
                  )}
                >
                  <span className="text-[9px] font-medium text-white/80">
                    {hour.label}
                  </span>
                  {item.type === "night" ? (
                    <Moon
                      size={14}
                      strokeWidth={1.75}
                      className="my-1.5 text-amber-100"
                      aria-hidden
                    />
                  ) : (
                    <Sun
                      size={14}
                      strokeWidth={1.75}
                      className="my-1.5 text-amber-100"
                      aria-hidden
                    />
                  )}
                  <span className="text-[10px] font-semibold tabular-nums">
                    {hour.temp}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2.5 flex justify-center gap-1.5">
            {WEATHER_THEMES.map((dot, dotIndex) => (
              <span
                key={`${item.id}-${dot.id}`}
                aria-hidden
                className={cn(
                  "h-1 rounded-full transition-all duration-300 motion-reduce:transition-none",
                  dotIndex === index ? "w-4 bg-white/90" : "w-1 bg-white/35",
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function NowPlayingPhoneScreen() {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(34);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (reducedMotion || !playing) return;

    const timer = globalThis.setInterval(() => {
      setProgress((current) => (current >= 96 ? 18 : current + 1));
    }, 140);

    return () => globalThis.clearInterval(timer);
  }, [playing, reducedMotion]);

  return (
    <div className="absolute inset-0 flex flex-col bg-black px-4 pt-11 pb-5 font-sans text-white">
      <p className="text-center text-[10px] font-medium tracking-wide text-white/50 uppercase">
        Now playing
      </p>

      <div className="relative mx-auto mt-5 aspect-square w-[68%] overflow-hidden rounded-2xl border border-white/10 shadow-lg shadow-black/40">
        <Image
          src="/background5.webp"
          alt=""
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>

      <div className="mt-5 text-center">
        <p className="font-serif text-lg leading-tight text-white">
          Slow Mornings
        </p>
        <p className="mt-1 text-[11px] text-white/50">Opensource UI</p>
      </div>

      <div className="mt-5 px-1">
        <div className="h-0.5 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-white transition-[width] duration-150 ease-linear motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[9px] text-white/40 tabular-nums">
          <span>1:12</span>
          <span>3:48</span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-center gap-5 pt-4">
        <button
          type="button"
          aria-label="Previous track"
          className="text-white/50 transition-colors hover:text-white"
        >
          <SkipBack size={18} strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((current) => !current)}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white text-black transition-transform active:scale-95"
        >
          {playing ? (
            <Pause size={18} fill="currentColor" strokeWidth={0} />
          ) : (
            <Play
              size={18}
              fill="currentColor"
              strokeWidth={0}
              className="ml-0.5"
            />
          )}
        </button>
        <button
          type="button"
          aria-label="Next track"
          className="text-white/50 transition-colors hover:text-white"
        >
          <SkipForward size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
