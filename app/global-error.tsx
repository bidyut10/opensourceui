"use client";

import Link from "next/link";
import { useEffect } from "react";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

/** Root crash boundary — same minimal layout with inline styles. */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          color: "#171717",
          background: "#fff",
        }}
      >
        <main
          id="main-content"
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1.5rem",
            boxSizing: "border-box",
          }}
        >
          <div style={{ width: "100%", maxWidth: "36rem" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "ui-monospace, monospace",
                fontSize: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#a3a3a3",
              }}
            >
              Error
            </p>
            <h1
              style={{
                margin: "0.75rem 0 0",
                fontFamily:
                  "ui-serif, Georgia, Cambria, Times New Roman, serif",
                fontSize: "1.875rem",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "#171717",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                margin: "0.5rem 0 0",
                maxWidth: "28rem",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                color: "#737373",
              }}
            >
              This page hit a snag. Try again, or go home.
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <button
                type="button"
                onClick={reset}
                style={{
                  padding: 0,
                  border: 0,
                  background: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#171717",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "#d4d4d4",
                  cursor: "pointer",
                }}
              >
                Try again
              </button>
              <Link
                href="/"
                style={{
                  fontSize: "0.875rem",
                  color: "#737373",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "#e5e5e5",
                }}
              >
                Home
              </Link>
            </div>
          </div>
        </main>

        <div aria-hidden="true" style={{ width: "100%", marginTop: "auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- global-error cannot rely on next/image */}
          <img
            src="/footer.webp"
            alt=""
            width={4134}
            height={1479}
            loading="eager"
            fetchPriority="high"
            draggable={false}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      </body>
    </html>
  );
}
