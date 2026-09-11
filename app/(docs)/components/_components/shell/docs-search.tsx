"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Command, Search } from "lucide-react";

import {
  getHydratedSearchParam,
  useHydratedSearchParams,
} from "@/app/_shared/navigation/use-hydrated-search-params";

function getComponentsSearchPath(pathname: string) {
  return pathname.startsWith("/components") ? "/components" : pathname;
}

function getSearchShortcutLabel() {
  if (typeof navigator === "undefined") return "Control K";

  const platform = navigator.platform.toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();
  const isApple =
    platform.includes("mac") ||
    platform.includes("iphone") ||
    platform.includes("ipad") ||
    userAgent.includes("mac os");

  return isApple ? "Command K" : "Control K";
}

function subscribeShortcutLabel() {
  return () => {};
}

export function DocsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useHydratedSearchParams();
  const urlQuery = getHydratedSearchParam(searchParams, "q") ?? "";

  const inputRef = useRef<HTMLInputElement>(null);
  const isFocusedRef = useRef(false);
  const committedRef = useRef(urlQuery);
  const [value, setValue] = useState("");
  const shortcutLabel = useSyncExternalStore(
    subscribeShortcutLabel,
    getSearchShortcutLabel,
    () => "Control K",
  );
  const isApple = shortcutLabel === "Command K";
  const [, startTransition] = useTransition();

  const applySearch = useCallback(
    (next: string) => {
      const trimmed = next.trim();
      if (trimmed === committedRef.current.trim()) return;

      committedRef.current = trimmed;

      const params = new URLSearchParams(searchParams?.toString() ?? "");

      if (trimmed) {
        params.set("q", trimmed);
        params.delete("category");
      } else {
        params.delete("q");
      }

      const nextQuery = params.toString();
      const base = getComponentsSearchPath(pathname);
      const href = nextQuery ? `${base}?${nextQuery}` : base;

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  // Sync URL → input for back/forward and external links, never while the field is focused.
  useEffect(() => {
    committedRef.current = urlQuery;
    if (!isFocusedRef.current) {
      setValue(urlQuery);
    }
  }, [urlQuery]);

  // Debounce typing before updating the URL so keystrokes stay local and fast.
  useEffect(() => {
    const timer = globalThis.setTimeout(() => {
      applySearch(value);
    }, 300);

    return () => globalThis.clearTimeout(timer);
  }, [value, applySearch]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // Exactly one of Cmd or Ctrl, and nothing else held, so Ctrl+Shift+K and
      // Ctrl+Alt+K stay free for the browser and the OS.
      const searchChord =
        event.metaKey !== event.ctrlKey && !event.shiftKey && !event.altKey;

      if (searchChord && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
        return;
      }

      if (
        event.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        event.preventDefault();
        setValue("");
        applySearch("");
        inputRef.current?.blur();
      }
    }

    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [applySearch]);

  return (
    <label className="relative block w-full md:max-w-sm">
      <span className="sr-only">Search components</span>
      <Search
        size={14}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-rose-500"
        aria-hidden
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => {
          isFocusedRef.current = true;
        }}
        onBlur={() => {
          isFocusedRef.current = false;
        }}
        placeholder="Search components…"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="w-full rounded-lg border border-neutral-100 bg-neutral-50/50 py-1.5 pr-3 pl-8 font-sans text-sm text-neutral-800 transition-colors outline-none placeholder:text-neutral-400 focus:border-rose-200 focus:bg-white md:pr-16"
      />
      <kbd
        aria-label={shortcutLabel}
        suppressHydrationWarning
        className="pointer-events-none absolute top-1/2 right-2.5 hidden -translate-y-1/2 items-center gap-0.5 rounded border border-neutral-100 bg-white px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 md:inline-flex"
      >
        {isApple ? (
          <Command size={10} aria-hidden className="text-neutral-400" />
        ) : (
          <span aria-hidden>Ctrl</span>
        )}
        <span> + K</span>
      </kbd>
    </label>
  );
}
