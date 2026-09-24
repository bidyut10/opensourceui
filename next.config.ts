import { withPostHogConfig } from "@posthog/nextjs-config";
import { withSentryConfig } from "@sentry/nextjs/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  devIndicators: false,

  images: {
    unoptimized: true,
    qualities: [75, 100],
  },

  skipTrailingSlashRedirect: true,
};

// Dev-only PostHog proxy (/ingest). Production: Vercel uses vercel.json rewrites;
// Cloudflare Workers use direct PostHog API (see lib/analytics/client/posthog.ts).
if (process.env.NODE_ENV === "development") {
  nextConfig.rewrites = async () => [
    {
      source: "/ingest/static/:path*",
      destination: "https://us-assets.i.posthog.com/static/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://us.i.posthog.com/:path*",
    },
  ];
}

const sentryConfig = withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "open-source-ui",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // No tunnelRoute — this project uses `output: "export"` (static). A /monitoring
  // rewrite needs a server; the browser talks to ingest.us.sentry.io directly (see CSP).

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});

const postHogApiKey = process.env.POSTHOG_API_KEY;
const postHogProjectId = process.env.POSTHOG_PROJECT_ID;

if (process.env.NODE_ENV === "development") {
  if (!postHogApiKey) {
    console.error(
      "POSTHOG_API_KEY variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_API_KEY is configured",
    );
  }
  if (!postHogProjectId) {
    console.error(
      "POSTHOG_PROJECT_ID variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once POSTHOG_PROJECT_ID is configured",
    );
  }
}

const configuredNextConfig =
  postHogApiKey && postHogProjectId
    ? withPostHogConfig(sentryConfig, {
        personalApiKey: postHogApiKey,
        projectId: postHogProjectId,
        host: process.env.POSTHOG_HOST,
        sourcemaps: {
          enabled: true,
          deleteAfterUpload: true,
        },
      })
    : sentryConfig;

export default configuredNextConfig;
