"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Command } from "lucide-react";

export type TerminalLogLine = {
  type: "cmd" | "out" | "ok" | "err";
  text: string;
};

export type TerminalLogCardProps = Readonly<
  {
    title?: string;
    prompt?: string;
    lines?: TerminalLogLine[];
    status?: string;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultLines: TerminalLogLine[] = [
  { type: "cmd", text: "npx appui add metric-card" },
  { type: "out", text: "Resolving dependencies..." },
  { type: "ok", text: "✓ Copied MetricCard.tsx" },
  { type: "ok", text: "✓ Updated tailwind.config" },
  { type: "out", text: "Done in 1.8s" },
];

const lineColors: Record<TerminalLogLine["type"], string> = {
  cmd: "text-emerald-400",
  out: "text-neutral-500",
  ok: "text-sky-400",
  err: "text-rose-400",
};

// Production-ready Terminal Log component — styled with Tailwind CSS.
export const TerminalLogCard = forwardRef<HTMLDivElement, TerminalLogCardProps>(
  (
    {
      className,
      title = "appui — zsh",
      prompt = "~",
      lines = defaultLines,
      status = "ready",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="terminal-log-card"
      className={cn(
        "w-sm overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0d0d] font-mono text-[11px] shadow-2xl shadow-black/40 md:max-w-xs",
        className,
      )}
      {...props}
    >
      <div
        data-slot="terminal-log-card-header"
        className="flex items-center gap-2 border-b border-neutral-800 px-3 py-2"
      >
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="flex-1 truncate text-center text-[10px] text-neutral-600">
          {title}
        </span>
        <Command size={10} className="text-neutral-700" />
      </div>

      <div
        data-slot="terminal-log-card-body"
        className="space-y-1 px-3 py-3 leading-relaxed"
      >
        {lines.map((line) => (
          <p
            key={`${line.type}-${line.text}`}
            data-slot="terminal-log-card-line"
            className={cn("break-all", lineColors[line.type])}
          >
            {line.type === "cmd" && (
              <span className="text-neutral-600">{prompt} </span>
            )}
            {line.text}
          </p>
        ))}
        <p className="text-neutral-600">
          <span className="text-emerald-500">{prompt}</span>
          <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-emerald-400" />
        </p>
      </div>

      <div
        data-slot="terminal-log-card-footer"
        className="border-t border-neutral-800/80 px-3 py-1.5 text-[9px] text-neutral-600"
      >
        {status}
      </div>
    </div>
  ),
);

TerminalLogCard.displayName = "TerminalLogCard";
