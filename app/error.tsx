"use client";

import Link from "next/link";
import { useEffect } from "react";

import {
  StatusPageShell,
  statusLinkClassName,
  statusMutedLinkClassName,
} from "@/app/_shared/status-page-shell";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="flex min-h-full flex-1 flex-col">
      <StatusPageShell
        mark="Error"
        title="Something went wrong"
        description="This page hit a snag. Try again, or head somewhere that works."
        actions={
          <>
            <button
              type="button"
              onClick={reset}
              className={statusLinkClassName}
            >
              Try again
            </button>
            <Link href="/components" className={statusLinkClassName}>
              Browse components
            </Link>
            <Link href="/" className={statusMutedLinkClassName}>
              Home
            </Link>
          </>
        }
      />
    </main>
  );
}
