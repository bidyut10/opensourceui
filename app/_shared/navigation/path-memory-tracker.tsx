"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { rememberPath } from "@/lib/navigation/path-memory";

/** Tracks internal navigations so secondary pages can offer a contextual back link. */
export function PathMemoryTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    rememberPath(pathname, searchParams.toString());
  }, [pathname, searchParams]);

  return null;
}
