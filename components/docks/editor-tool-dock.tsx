"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import {
  AudioLines,
  Folder,
  MousePointer2,
  PenLine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

export type EditorToolItem = Readonly<{
  id: string;
  label: string;
  icon?: LucideIcon;
}>;

export type EditorToolDockProps = Readonly<
  {
    tools?: readonly EditorToolItem[];
    activeId?: string;
    showAllTools?: boolean;
    allToolsLabel?: string;
    onSelect?: (id: string) => void;
    onAllTools?: () => void;
  } & ComponentPropsWithoutRef<"nav">
>;

const DEFAULT_TOOLS: readonly EditorToolItem[] = [
  { id: "select", label: "Select", icon: MousePointer2 },
  { id: "draw", label: "Draw", icon: PenLine },
  { id: "generate", label: "Generate", icon: Sparkles },
  { id: "audio", label: "Audio", icon: AudioLines },
];

// Editor tool dock — vertical frosted tool strip aligned with MacDock styling.
export const EditorToolDock = forwardRef<HTMLElement, EditorToolDockProps>(
  (
    {
      className,
      tools = DEFAULT_TOOLS,
      activeId: activeIdProp,
      showAllTools = true,
      allToolsLabel = "All tools",
      onSelect,
      onAllTools,
      ...props
    },
    ref,
  ) => {
    const [activeId, setActiveId] = useState(
      activeIdProp ?? tools[0]?.id ?? "select",
    );
    const currentId = activeIdProp ?? activeId;

    return (
      <nav
        ref={ref}
        data-slot="editor-tool-dock"
        aria-label="Editor tools"
        className={cn(
          "inline-flex flex-col items-center gap-2.5 rounded-2xl border border-neutral-50 bg-white/50 p-2.5 font-sans shadow-xl shadow-black/10 backdrop-blur-md",
          className,
        )}
        {...props}
      >
        {tools.map((tool) => {
          const Icon = tool.icon ?? MousePointer2;
          const active = tool.id === currentId;

          return (
            <button
              key={tool.id}
              type="button"
              aria-label={tool.label}
              aria-pressed={active}
              title={tool.label}
              onClick={() => {
                setActiveId(tool.id);
                onSelect?.(tool.id);
              }}
              className={cn(
                "ease-smooth flex size-11 items-center justify-center rounded-lg shadow-xs shadow-neutral-100 transition-[background-color,color,transform] duration-300 will-change-transform",
                active
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-50 text-neutral-600 hover:scale-110 hover:text-neutral-900",
              )}
            >
              <Icon size={17} aria-hidden strokeWidth={1.75} />
            </button>
          );
        })}

        {showAllTools ? (
          <button
            type="button"
            aria-label={allToolsLabel}
            onClick={onAllTools}
            className="ease-smooth flex size-11 items-center justify-center rounded-lg bg-rose-200 text-white shadow-xs transition-transform duration-300 hover:scale-110"
          >
            <Folder size={16} aria-hidden fill="currentColor" />
          </button>
        ) : null}
      </nav>
    );
  },
);

EditorToolDock.displayName = "EditorToolDock";
