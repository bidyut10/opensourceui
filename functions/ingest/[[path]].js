/**
 * Proxies PostHog /ingest/* → PostHog US.
 *
 * IMPORTANT: This is a Cloudflare Pages Function. The production deploy for
 * this repo is Workers + static assets (wrangler.toml), so this file is NOT
 * used there. PostHog falls back to https://us.i.posthog.com instead
 * (see lib/analytics/client/posthog.ts). Keep this only if you switch to Pages.
 */
export async function onRequest(context) {
  const request = context.request;

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const url = new URL(request.url);
  const ingestPrefix = "/ingest/";

  if (!url.pathname.startsWith(ingestPrefix)) {
    return new Response("Not found", { status: 404 });
  }

  const path = url.pathname.slice(ingestPrefix.length);
  const targetOrigin = path.startsWith("static/")
    ? "https://us-assets.i.posthog.com"
    : "https://us.i.posthog.com";

  const targetUrl = new URL(`${targetOrigin}/${path}`);
  targetUrl.search = url.search;

  const headers = new Headers(request.headers);
  headers.set("Host", targetUrl.host);

  const init = {
    method: request.method,
    headers,
    redirect: "follow",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const response = await fetch(targetUrl.toString(), init);
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}
