import { forwardRef, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

import { Command } from "lucide-react";

export type KeyboardShortcut = {
  keys: string[];
  label: string;
};

export type KeyboardShortcutsCardProps = Readonly<
  {
    title?: string;
    shortcuts?: KeyboardShortcut[];
    hint?: string;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultShortcuts: KeyboardShortcut[] = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["⌘", "S"], label: "Save changes" },
  { keys: ["⌘", "Z"], label: "Undo last action" },
  { keys: ["⌘", "⇧", "P"], label: "Quick actions" },
  { keys: ["Esc"], label: "Close panel" },
];

// Production-ready Keyboard Shortcuts component — styled with Tailwind CSS.
export const KeyboardShortcutsCard = forwardRef<
  HTMLDivElement,
  KeyboardShortcutsCardProps
>(
  (
    {
      className,
      title = "Shortcuts",
      shortcuts = defaultShortcuts,
      hint = "Press ⌘K anywhere",
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      data-slot="keyboard-shortcuts-card"
      className={cn(
        "w-xs rounded-2xl border border-neutral-100 bg-white p-4 font-sans shadow-lg md:p-5",
        className,
      )}
      {...props}
    >
      <div
        data-slot="keyboard-shortcuts-card-header"
        className="mb-4 flex items-center gap-2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white">
          <Command size={14} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-900">{title}</h4>
          <p className="text-[11px] text-neutral-400">{hint}</p>
        </div>
      </div>

      <div data-slot="keyboard-shortcuts-card-list" className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div
            key={shortcut.label}
            data-slot="keyboard-shortcuts-card-item"
            className="flex items-center justify-between gap-3 rounded-xl bg-neutral-50 px-3 py-2"
          >
            <span className="min-w-0 truncate text-[13px] text-neutral-700">
              {shortcut.label}
            </span>
            <div className="flex shrink-0 gap-1">
              {shortcut.keys.map((key) => (
                <kbd
                  key={key}
                  className="flex h-6 min-w-6 items-center justify-center rounded-md border border-neutral-100 bg-white px-1.5 font-mono text-[10px] font-medium text-neutral-600 shadow-sm"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
);

KeyboardShortcutsCard.displayName = "KeyboardShortcutsCard";
