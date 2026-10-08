"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  cloneElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";

import { cn } from "@/lib/cn";

import { Share2, Link, Check } from "lucide-react";
import { Twitter } from "@/icons/brands/twitter";
import { Linkedin } from "@/icons/brands/linkedin";
import { Github } from "@/icons/brands/github";
import { Discord } from "@/icons/brands/discord";

export type ShareMenuItem = Readonly<{
  id: string;
  label?: string;
  icon?: ReactElement;
  separator?: boolean;
}>;

export type ShareMenuDropdownProps = Readonly<
  {
    buttonLabel?: string;
    triggerAriaLabel?: string;
    menuAriaLabel?: string;
    items?: readonly ShareMenuItem[];
    onItemClick?: (item: ShareMenuItem) => void;
    copied?: boolean;
  } & ComponentPropsWithoutRef<"div">
>;

const defaultItems: readonly ShareMenuItem[] = [
  { id: "twitter", label: "X", icon: <Twitter /> },
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin /> },
  { id: "github", label: "GitHub", icon: <Github /> },
  { id: "discord", label: "Discord", icon: <Discord /> },
  { id: "separator-copy", separator: true },
  { id: "copy-link", label: "Copy link", icon: <Link /> },
];

const socialItems = (items: readonly ShareMenuItem[]) =>
  items.filter((item) => !item.separator && item.id !== "copy-link");

const copyItem = (items: readonly ShareMenuItem[]) =>
  items.find((item) => item.id === "copy-link");

// Share menu — square trigger, horizontal icon rail panel.
export const ShareMenuDropdown = forwardRef<
  HTMLDivElement,
  ShareMenuDropdownProps
>(
  (
    {
      buttonLabel = "Share",
      triggerAriaLabel = "Open share menu",
      menuAriaLabel = "Share options",
      items = defaultItems,
      onItemClick,
      copied = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    const socials = socialItems(items);
    const copy = copyItem(items);

    useEffect(() => {
      const closeOnOutside = (event: globalThis.MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };

      document.addEventListener("mousedown", closeOnOutside);
      document.addEventListener("keydown", closeOnEscape);
      return () => {
        document.removeEventListener("mousedown", closeOnOutside);
        document.removeEventListener("keydown", closeOnEscape);
      };
    }, []);

    const handleItemSelect = (item: ShareMenuItem) => {
      if (item.id !== "copy-link") {
        setOpen(false);
      }
      onItemClick?.(item);
    };

    const toggleOpen = () => setOpen((prev) => !prev);

    return (
      <div
        ref={ref}
        data-slot="share-menu-dropdown"
        className={cn("relative inline-block font-sans", className)}
        {...props}
      >
        <div ref={rootRef} className="relative">
          <button
            type="button"
            aria-label={triggerAriaLabel}
            aria-expanded={open}
            aria-haspopup="menu"
            aria-controls={open ? menuId : undefined}
            onClick={toggleOpen}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleOpen();
              }
            }}
            className={cn(
              "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg border bg-white transition-[border-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100",
              open
                ? "border-neutral-200"
                : "border-neutral-100 hover:border-neutral-200",
            )}
          >
            <Share2 size={16} strokeWidth={2} className="text-neutral-500" />
          </button>

          {open ? (
            <div
              id={menuId}
              role="menu"
              aria-label={menuAriaLabel}
              className="absolute top-[calc(100%+8px)] left-0 z-100 w-56 origin-top-left rounded-xl border border-neutral-100 bg-white p-3 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity starting:scale-95 starting:opacity-0"
            >
              <p className="mb-2.5 text-[10px] font-medium tracking-wide text-neutral-400 uppercase">
                {buttonLabel}
              </p>

              <div className="flex justify-between gap-1">
                {socials.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    aria-label={`Share on ${item.label}`}
                    onClick={() => handleItemSelect(item)}
                    className="flex flex-1 cursor-pointer flex-col items-center gap-1.5 rounded-lg py-2 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 active:scale-[0.97] motion-reduce:active:scale-100"
                  >
                    <span className="text-neutral-700">
                      {cloneElement(
                        item.icon as ReactElement<{ size?: number }>,
                        { size: 16 },
                      )}
                    </span>
                    <span className="text-[9px] font-medium text-neutral-500">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {copy ? (
                <button
                  type="button"
                  role="menuitem"
                  aria-label={copied ? "Link copied" : copy.label}
                  onClick={() => handleItemSelect(copy)}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-neutral-100 py-2 text-[11px] font-medium text-neutral-700 transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-neutral-50 active:scale-[0.97] motion-reduce:active:scale-100"
                >
                  {copied ? (
                    <Check size={13} strokeWidth={2} />
                  ) : (
                    <Link size={13} strokeWidth={2} />
                  )}
                  {copied ? "Copied" : copy.label}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);

ShareMenuDropdown.displayName = "ShareMenuDropdown";
