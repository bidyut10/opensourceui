"use client";

import posthog from "posthog-js";

let initialized = false;

function getPostHogKey() {
  return process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() ?? "";
}

function resolvePostHogHost() {
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();

  // /ingest reverse proxy is optional and often breaks on static hosting (404s).
  // Fall back to PostHog's direct API so analytics keep working.
  if (!host || host === "/ingest") {
    return "https://us.i.posthog.com";
  }

  return host;
}

function getPostHogUiHost() {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_UI_HOST?.trim() || "https://us.posthog.com"
  );
}

export function isPostHogEnabled() {
  return Boolean(getPostHogKey());
}

/** Initialize PostHog once in the browser. No-op when the key is missing. */
export function initPostHog() {
  if (typeof window === "undefined" || initialized || !isPostHogEnabled()) {
    return;
  }

  posthog.init(getPostHogKey(), {
    api_host: resolvePostHogHost(),
    ui_host: getPostHogUiHost(),
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_pageleave: true,
    capture_exceptions: true,
    persistence: "localStorage+cookie",
  });

  initialized = true;
}

function ensurePostHog() {
  if (!initialized) initPostHog();
  return initialized;
}

export function capturePostHogException(error: unknown) {
  if (!ensurePostHog()) return;
  posthog.captureException(error);
}

export function identifyPostHogVisitor(visitorId: string) {
  if (!ensurePostHog()) return;
  posthog.identify(visitorId);
}

export function capturePostHogPageView(path: string) {
  if (!ensurePostHog()) return;

  posthog.capture("$pageview", {
    $current_url: `${window.location.origin}${path}`,
    path,
  });
}

export function capturePostHogComponentClick(path: string, slug: string) {
  if (!ensurePostHog()) return;

  posthog.capture("component_click", {
    path,
    slug,
    component_slug: slug,
  });
}
