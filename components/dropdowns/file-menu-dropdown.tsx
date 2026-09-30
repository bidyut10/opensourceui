"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ComponentType,
} from "react";

import { cn } from "@/lib/cn";

import { Edit, Copy, Pin, Folder, Trash } from "lucide-react";

type IconComponent = ComponentType<
  Readonly<{ size?: number; className?: string }>
>;

export type ContextMenuItem = Readonly<{
  id: string;
  label?: string;
  icon?: IconComponent;
  kbd?: string;
  danger?: boolean;
  separator?: boolean;
}>;

export type FileMenuDropdownProps = Readonly<
  {
    cardTitle?: string;
    cardHint?: string;
    triggerAriaLabel?: string;
    menuAriaLabel?: string;
    items?: readonly ContextMenuItem[];
    onItemClick?: (item: ContextMenuItem) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultItems: readonly ContextMenuItem[] = [
  { id: "edit", label: "Edit", icon: Edit, kbd: "ctrl + E" },
  { id: "duplicate", label: "Duplicate", icon: Copy, kbd: "ctrl + D" },
  { id: "pin", label: "Pin to top", icon: Pin },
  { id: "move", label: "Move to folder", icon: Folder },
  { id: "separator-delete", separator: true },
  { id: "delete", label: "Delete", icon: Trash, danger: true, kbd: "⌫" },
];

type ContextMenuItemRowProps = Readonly<{
  item: ContextMenuItem;
  onSelect: (item: ContextMenuItem) => void;
}>;

function ContextMenuItemRow({ item, onSelect }: ContextMenuItemRowProps) {
  if (item.separator) {
    return <hr className="mx-1 my-1 h-px border-0 bg-neutral-100" />;
  }

  const Icon = item.icon;

  return (
    <button
      type="button"
      role="menuitem"
      aria-label={item.label}
      onClick={() => onSelect(item)}
      className={cn(
        "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-[12px] font-medium transition-colors",
        item.danger
          ? "text-red-500 hover:bg-red-50"
          : "text-neutral-700 hover:bg-neutral-50",
      )}
    >
      <div className="flex items-center gap-2">
        {Icon ? (
          <Icon
            size={12}
            className={item.danger ? "text-red-400" : "text-neutral-400"}
          />
        ) : null}
        {item.label}
      </div>
      {item.kbd ? (
        <kbd className="font-mono text-[9px] text-neutral-400">{item.kbd}</kbd>
      ) : null}
    </button>
  );
}

// Production-ready Context Menu component — styled with Tailwind CSS.
export const FileMenuDropdown = forwardRef<
  HTMLDivElement,
  FileMenuDropdownProps
>(
  (
    {
      cardTitle = "Card Component",
      cardHint = "Right-click or tap",
      triggerAriaLabel = "Open context menu",
      menuAriaLabel = "Context menu",
      items = defaultItems,
      onItemClick,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const close = (event: MouseEvent) => {
        if (!innerRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", close);
      return () => document.removeEventListener("mousedown", close);
    }, []);

    useEffect(() => {
      const onEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onEscape);
      return () => document.removeEventListener("keydown", onEscape);
    }, []);

    const handleItemSelect = (item: ContextMenuItem) => {
      setOpen(false);
      onItemClick?.(item);
    };

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
      <div
        ref={ref}
        data-slot="context-menu-dropdown"
        className={cn("relative inline-block font-sans", className)}
        {...props}
      >
        <div ref={innerRef}>
          <button
            type="button"
            aria-label={triggerAriaLabel}
            aria-expanded={open}
            aria-haspopup="menu"
            onContextMenu={(event) => {
              event.preventDefault();
              setOpen(true);
            }}
            onClick={toggleOpen}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleOpen();
              }
            }}
            className="flex flex-col items-center justify-center transition-[scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] select-none active:scale-[0.97]"
          >
            <div className="mb-2 flex h-24 w-24 cursor-pointer items-center justify-center rounded-3xl bg-cyan-200">
              <Folder size={48} className="text-white" fill="white" />
            </div>
            <p className="text-[10px] font-medium text-neutral-700">
              {cardTitle}
            </p>
            <p className="mt-1 text-[10px] text-neutral-200">{cardHint}</p>
          </button>

          {open ? (
            <div
              role="menu"
              aria-label={menuAriaLabel}
              className="absolute top-1/2 left-1/2 z-100 w-48 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-100 bg-white p-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity starting:scale-95 starting:opacity-0"
            >
              {items.map((item) => (
                <ContextMenuItemRow
                  key={item.id}
                  item={item}
                  onSelect={handleItemSelect}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

FileMenuDropdown.displayName = "FileMenuDropdown";
