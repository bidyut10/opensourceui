"use client";

import Link from "next/link";
import { useEffect } from "react";

import { AnnotatedText } from "@/components/underlines/annotated-text";
import { ChevronRight, MoveRight } from "lucide-react";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 selection:bg-neutral-800 selection:text-white md:px-0"
    >
      <div className="w-full max-w-xl text-left">
        <h1 className="flex flex-wrap items-baseline gap-x-3 font-serif text-neutral-900">
          <span className="text-5xl md:text-6xl">Error</span>
          <span className="text-2xl md:text-3xl"> || Something went wrong</span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          This page hit an unexpected{" "}
          <AnnotatedText variant="wavy" color="text-cyan-200">
            snag
          </AnnotatedText>
          . Try again, or head back to browse components.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center rounded-md border border-neutral-800 bg-neutral-800 px-4 py-2 text-sm font-light text-white transition-colors hover:bg-neutral-900"
          >
            Try again
          </button>
          <Link
            href="/components"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-500"
          >
            Browse components
            <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
              <ChevronRight
                size={12}
                strokeWidth={3}
                className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
              />
              <MoveRight
                size={12}
                strokeWidth={2.5}
                className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
              />
            </span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-400"
          >
            Home
            <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
              <ChevronRight
                size={12}
                strokeWidth={3}
                className="ease-smooth transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
              />
              <MoveRight
                size={12}
                strokeWidth={2.5}
                className="ease-smooth absolute -translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
              />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
