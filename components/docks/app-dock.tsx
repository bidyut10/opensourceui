"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import {
  Home,
  LayoutGrid,
  Search,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

export type AppDockItem = Readonly<{
  id: string;
  label: string;
  icon?: LucideIcon;
}>;

export type AppDockProps = Readonly<
  {
    items?: readonly AppDockItem[];
    activeId?: string;
    showLabels?: boolean;
    onSelect?: (id: string) => void;
  } & ComponentPropsWithoutRef<"div">
>;

const DEFAULT_ITEMS: readonly AppDockItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "search", label: "Search", icon: Search },
  { id: "apps", label: "Apps", icon: LayoutGrid },
  { id: "profile", label: "Profile", icon: UserRound },
];

// App dock — bottom launcher matching MacDock frosted tray + hover motion.
export const AppDock = forwardRef<HTMLDivElement, AppDockProps>(
  (
    {
      className,
      items = DEFAULT_ITEMS,
      activeId: activeIdProp,
      showLabels = false,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const [activeId, setActiveId] = useState(
      activeIdProp ?? items[0]?.id ?? "",
    );
    const currentId = activeIdProp ?? activeId;

    return (
      <div
        ref={ref}
        data-slot="app-dock"
        className={cn("relative overflow-visible pt-10 font-sans", className)}
        {...props}
      >
        <nav
          aria-label="App dock"
          className="mx-auto inline-flex items-end gap-2.5 rounded-2xl border border-neutral-50/20 bg-white/10 p-3 shadow-xl shadow-black/10 backdrop-blur-md"
        >
          {items.map((item) => {
            const Icon = item.icon ?? Home;
            const active = item.id === currentId;

            return (
              <button
                key={item.id}
                type="button"
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  setActiveId(item.id);
                  onSelect?.(item.id);
                }}
                className="group relative flex flex-col items-center outline-none"
              >
                <span className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-md bg-rose-200 px-2 py-0.5 text-[10px] font-medium whitespace-nowrap text-neutral-800 opacity-0 shadow-sm transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-opacity">
                  {item.label}
                </span>

                <span
                  className={cn(
                    "flex size-11 origin-bottom cursor-pointer items-center justify-center rounded-lg shadow-md transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-2 group-hover:scale-125 group-focus-visible:-translate-y-2 group-focus-visible:scale-125",
                    active
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-50 text-neutral-700",
                  )}
                >
                  <Icon size={18} aria-hidden strokeWidth={1.75} />
                </span>

                {showLabels ? (
                  <span className="mt-1 text-[10px] font-medium text-neutral-500">
                    {item.label}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
    );
  },
);

AppDock.displayName = "AppDock";
