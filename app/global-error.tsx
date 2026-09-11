"use client";

import Link from "next/link";
import { useEffect } from "react";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

/**
 * Root-layout crash boundary. Must define its own <html>/<body>.
 * Keep styles inline — CSS modules / Tailwind may not load here.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#171717",
          background: "#fff",
        }}
      >
        <main id="main-content" style={{ maxWidth: "36rem", width: "100%" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
            Something went wrong
          </h1>
          <p
            style={{ marginTop: "0.75rem", color: "#737373", lineHeight: 1.5 }}
          >
            The site hit an unexpected error. You can try again or go home.
          </p>
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                border: "1px solid #262626",
                background: "#262626",
                color: "#fff",
                borderRadius: "0.375rem",
                padding: "0.5rem 1rem",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                alignSelf: "center",
                fontSize: "0.875rem",
                color: "#525252",
              }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
