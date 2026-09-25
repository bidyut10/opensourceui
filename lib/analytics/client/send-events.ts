"use client";

import {
  capturePostHogComponentClick,
  capturePostHogPageView,
  identifyPostHogVisitor,
  initPostHog,
} from "./posthog";

const VISITOR_KEY = "oui_vid";
const PAGEVIEW_DEBOUNCE_MS = 800;

function randomId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 11)}`;
}

function isLocalStorageAvailable(): boolean {
  return typeof localStorage !== "undefined" && localStorage !== null;
}

export function getVisitorId(): string {
  if (!isLocalStorageAvailable()) return randomId();
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = randomId();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

let lastPageViewPath = "";
let lastPageViewAt = 0;

export function trackPageView(path: string): void {
  const now = Date.now();
  if (
    path === lastPageViewPath &&
    now - lastPageViewAt < PAGEVIEW_DEBOUNCE_MS
  ) {
    return;
  }

  lastPageViewPath = path;
  lastPageViewAt = now;

  const visitorId = getVisitorId();
  initPostHog();
  identifyPostHogVisitor(visitorId);
  capturePostHogPageView(path);
}

export function trackComponentClick(path: string, slug: string): void {
  initPostHog();
  capturePostHogComponentClick(path, slug);
}
