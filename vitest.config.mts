import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup/vitest.setup.ts"],
    include: ["tests/unit/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "out", ".wrangler"],
    css: false,
  },
  resolve: {
    alias: {
      "@": root,
    },
  },
});
