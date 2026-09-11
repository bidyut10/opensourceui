import Link from "next/link";

import { AnnotatedText } from "@/components/underlines/annotated-text";
import { ChevronRight, MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen w-full flex-col items-center justify-center px-4 selection:bg-neutral-800 selection:text-white md:px-0"
    >
      <div className="w-full max-w-xl text-left">
        <h1 className="flex flex-wrap items-baseline gap-x-3 font-serif text-neutral-900">
          <span className="text-5xl md:text-6xl">404</span>
          <span className="text-2xl md:text-3xl"> || Page not found</span>
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
          The link may be{" "}
          <AnnotatedText variant="wavy" color="text-cyan-200">
            broken,
          </AnnotatedText>{" "}
          or this page moved. Either way, there&apos;s nothing here to copy.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-start gap-4">
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
