"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  useForwardWheelToDocsMain,
  usePanelWheelScroll,
} from "@/app/_shared/scroll/docs-scroll";
import { AnnotatedText } from "@/components/underlines/annotated-text";
import { cn } from "@/lib/cn";

import { DocsSponsorCard } from "./docs-sponsor-card";

export type DocsTocItem = Readonly<{
  id: string;
  label: string;
  description?: string;
  nested?: boolean;
}>;

type DocsTocProps = Readonly<{
  items: DocsTocItem[];
  title?: string;
  className?: string;
}>;

function getScrollContainer() {
  return document.querySelector<HTMLElement>("[data-docs-scroll]");
}

function scrollToSection(id: string) {
  const container = getScrollContainer();
  const target = document.getElementById(id);
  if (!container || !target) return;

  const offset =
    target.getBoundingClientRect().top -
    container.getBoundingClientRect().top +
    container.scrollTop -
    28;

  container.scrollTo({ top: offset, behavior: "smooth" });
}

function getActiveSection(sectionIds: string[]) {
  const container = getScrollContainer();
  if (!container) return sectionIds[0] ?? "";

  const threshold = container.getBoundingClientRect().top + 80;
  let activeId = sectionIds[0] ?? "";

  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (!element) continue;

    if (element.getBoundingClientRect().top <= threshold) {
      activeId = id;
    }
  }

  return activeId;
}

export function DocsToc({
  items,
  title = "On this page",
  className,
}: DocsTocProps) {
  const sectionIds = useMemo(
    () => items.filter((item) => !item.nested).map((item) => item.id),
    [items],
  );
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const lockedIdRef = useRef<string | null>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sponsorRef = useRef<HTMLDivElement>(null);

  usePanelWheelScroll(panelRef);
  useForwardWheelToDocsMain(sponsorRef);

  useEffect(() => {
    const container = getScrollContainer();
    if (!container || sectionIds.length === 0) return;

    const syncActiveSection = () => {
      if (lockedIdRef.current) return;
      setActiveId(getActiveSection(sectionIds));
    };

    const onScroll = () => {
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }

      scrollEndTimerRef.current = setTimeout(() => {
        lockedIdRef.current = null;
        setActiveId(getActiveSection(sectionIds));
      }, 120);

      if (lockedIdRef.current) return;

      requestAnimationFrame(syncActiveSection);
    };

    syncActiveSection();
    container.addEventListener("scroll", onScroll, { passive: true });
    globalThis.addEventListener("resize", syncActiveSection);

    return () => {
      container.removeEventListener("scroll", onScroll);
      globalThis.removeEventListener("resize", syncActiveSection);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [sectionIds]);

  useEffect(() => {
    const hash = globalThis.location.hash.slice(1);
    if (!hash || !sectionIds.includes(hash)) return;

    lockedIdRef.current = hash;
    requestAnimationFrame(() => setActiveId(hash));
    scrollToSection(hash);
    globalThis.history.replaceState(
      null,
      "",
      globalThis.location.pathname + globalThis.location.search,
    );
  }, [sectionIds]);

  if (items.length === 0) return null;

  const titleWords = title.split(" ");
  const titleLead = titleWords.slice(0, -1).join(" ");
  const titleAccent = titleWords.at(-1) ?? title;

  return (
    <aside
      aria-label="Table of contents"
      className={cn(
        "hidden h-full max-h-full min-h-0 w-80 shrink-0 flex-col overflow-hidden border-l border-neutral-200 bg-white xl:flex",
        className,
      )}
    >
      <div
        ref={panelRef}
        className="scrollbar-hover data-docs-panel-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-6 py-8"
      >
        <div className="mb-6">
          {titleLead ? (
            <p className="font-mono text-[10px] tracking-[0.14em] text-neutral-400 uppercase">
              {titleLead}
            </p>
          ) : null}
          <p className="mt-1 font-serif text-xl text-neutral-900">
            <AnnotatedText variant="wavy" color="text-amber-300">
              {titleAccent}
            </AnnotatedText>
          </p>
          <p className="mt-2 font-sans text-xs leading-relaxed text-neutral-400">
            Jump to a section on this page.
          </p>
        </div>

        <ul className="relative space-y-0.5 border-l border-neutral-100">
          {items.map((item) => {
            if (item.nested) {
              return (
                <li key={item.id} className="pl-5">
                  <span className="block py-0.5 font-mono text-[11px] leading-snug text-neutral-400">
                    {item.label}
                  </span>
                </li>
              );
            }

            const isActive = activeId === item.id;

            return (
              <li key={item.id} className="relative">
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute top-1 bottom-1 left-0 w-0.5 -translate-x-px rounded-full bg-neutral-900"
                  />
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    lockedIdRef.current = item.id;
                    setActiveId(item.id);
                    scrollToSection(item.id);
                  }}
                  className={cn(
                    "w-full py-1.5 pr-2 pl-3 text-left",
                    isActive
                      ? "text-neutral-900"
                      : "text-neutral-500 hover:text-neutral-800",
                  )}
                >
                  <span
                    className={cn(
                      "block font-sans text-[13px] leading-snug",
                      isActive ? "font-medium" : "font-normal",
                    )}
                  >
                    {item.label}
                  </span>
                  {item.description ? (
                    <span
                      className={cn(
                        "mt-0.5 block font-sans text-[11px] leading-snug",
                        isActive ? "text-neutral-500" : "text-neutral-400",
                      )}
                    >
                      {item.description}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div ref={sponsorRef}>
        <DocsSponsorCard />
      </div>
    </aside>
  );
}
