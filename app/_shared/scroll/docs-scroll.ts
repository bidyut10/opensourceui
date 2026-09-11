"use client";

import { useEffect, type RefObject } from "react";

/** Forward wheel events to the main docs column (for non-scrollable footer areas). */
export function useForwardWheelToDocsMain(
  containerRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (event: WheelEvent) => {
      const main = document.querySelector<HTMLElement>("[data-docs-scroll]");
      if (!main) return;

      event.preventDefault();
      main.scrollTop += event.deltaY;
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => container.removeEventListener("wheel", onWheel);
  }, [containerRef]);
}

/** Manual wheel scroll for side panels while the page body is locked. */
export function usePanelWheelScroll(panelRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const onWheel = (event: WheelEvent) => {
      const maxScroll = panel.scrollHeight - panel.clientHeight;
      if (maxScroll <= 0) return;

      const nextScroll = Math.min(
        maxScroll,
        Math.max(0, panel.scrollTop + event.deltaY),
      );

      if (nextScroll === panel.scrollTop) return;

      panel.scrollTop = nextScroll;
      event.preventDefault();
      event.stopPropagation();
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    return () => panel.removeEventListener("wheel", onWheel);
  }, [panelRef]);
}

/** Keep the docs shell fixed to the viewport — only inner panels may scroll. */
export function useLockDocsPageScroll() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, []);
}
