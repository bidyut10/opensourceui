"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";

import type { ShowcaseNavCategoryGroup } from "@/lib/showcase";
import { useLockDocsPageScroll } from "@/app/_shared/scroll/docs-scroll";

import { DocsHeader } from "./docs-header";
import { DocsShellProvider } from "./docs-shell-context";
import { DocsSidebar } from "./docs-sidebar";

type DocsShellClientProps = Readonly<{
  categories: ShowcaseNavCategoryGroup[];
  children: ReactNode;
}>;

function DocsSidebarFallback() {
  return (
    <aside className="hidden w-80 shrink-0 border-r border-neutral-100 bg-white md:flex" />
  );
}

export function DocsShellClient({
  categories,
  children,
}: DocsShellClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useLockDocsPageScroll();

  useEffect(() => {
    if (!isSidebarOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
      }
    }

    globalThis.addEventListener("keydown", onKeyDown);
    return () => globalThis.removeEventListener("keydown", onKeyDown);
  }, [isSidebarOpen]);

  const shellValue = {
    isSidebarOpen,
    toggleSidebar: () => setIsSidebarOpen((open) => !open),
    closeSidebar: () => setIsSidebarOpen(false),
  };

  return (
    <DocsShellProvider value={shellValue}>
      <div className="flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-white selection:bg-neutral-800 selection:text-white">
        <DocsHeader />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Suspense fallback={<DocsSidebarFallback />}>
            <DocsSidebar categories={categories} />
          </Suspense>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </DocsShellProvider>
  );
}
