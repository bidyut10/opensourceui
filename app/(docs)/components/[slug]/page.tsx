import { notFound } from "next/navigation";
import Link from "next/link";

import { CopyCodeBlock, SetupGuide, SaveScrollLink } from "@/lib/docs";
import { AnnotatedText } from "@/components/underlines/annotated-text";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import {
  getShowcaseEntry,
  getAllShowcaseSlugs,
  getShowcasePreviewBackdrop,
  isFlushPreviewBackgroundShowcaseFile,
  isFormShowcaseFile,
  isFullBleedShowcaseFile,
  isInputShowcaseFile,
  readShowcaseSource,
} from "@/lib/showcase";
import { getCategoryPath } from "@/lib/showcase/category-slug";
import { JsonLd, createComponentMetadata, getComponentJsonLd } from "@/lib/seo";
import type { Props } from "@/types/types";

import { DocsPreviewStage } from "../_components/detail";
import { DocsToc } from "../_components/shell";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllShowcaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = getShowcaseEntry(slug);
  if (!entry) return {};

  return createComponentMetadata(entry);
}

export default async function ComponentDetailPage({ params }: Readonly<Props>) {
  const { slug } = await params;
  const entry = getShowcaseEntry(slug);
  if (!entry) notFound();

  const allSlugs = getAllShowcaseSlugs();
  const currentIndex = allSlugs.indexOf(slug);
  const previousEntry =
    currentIndex > 0 ? getShowcaseEntry(allSlugs[currentIndex - 1]) : null;
  const nextEntry =
    currentIndex >= 0 && currentIndex < allSlugs.length - 1
      ? getShowcaseEntry(allSlugs[currentIndex + 1])
      : null;
  const categoryHref = getCategoryPath(entry.category);

  const { cnSource, componentSource } = await readShowcaseSource(entry.file);

  const tocItems = [
    {
      id: "overview",
      label: "Overview",
      description: "What it does & how to use it",
    },
    {
      id: "preview",
      label: "Preview",
      description: "Live component demo",
    },
    {
      id: "setup",
      label: "Setup",
      description: "Install steps & source code",
    },
    { id: "cn", label: "lib/cn.ts", nested: true },
    { id: "code", label: entry.file, nested: true },
  ] as const;

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <JsonLd data={getComponentJsonLd(entry)} />
      <main
        id="main-content"
        data-docs-scroll
        className="scrollbar-hover data-docs-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
      >
        <article className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-10">
          <nav aria-label="Breadcrumb" className="sr-only">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/components">Components</Link>
              </li>
              <li>
                <Link href={categoryHref}>{entry.category}</Link>
              </li>
              <li>{entry.title}</li>
            </ol>
          </nav>

          <div id="overview" className="scroll-mt-8">
            <div className="mb-5 flex flex-col items-start gap-3">
              <SaveScrollLink
                href={categoryHref}
                className="group inline-flex items-center gap-1.5 font-sans text-sm text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-700 hover:decoration-neutral-400"
              >
                <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
                  <ChevronLeft
                    size={12}
                    strokeWidth={3}
                    className="ease-smooth transition-[opacity,transform] duration-500 group-hover:-translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
                  />
                  <MoveLeft
                    size={12}
                    strokeWidth={2.5}
                    className="ease-smooth absolute translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                  />
                </span>
                Back to {entry.category}
              </SaveScrollLink>

              <Link
                href="/components"
                className="font-mono text-[11px] tracking-[0.14em] text-neutral-400 uppercase"
              >
                Components / {entry.category}
              </Link>
            </div>

            <header className="mt-3">
              <h1 className="font-serif text-3xl text-neutral-900">
                {entry.title}
              </h1>
              <p className="sr-only">
                Free {entry.category} React component — {entry.exportName}. MIT
                licensed, copy-paste ready for Next.js and Tailwind CSS.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
                {entry.description}
              </p>
            </header>
          </div>

          <section id="preview" className="mt-10 scroll-mt-8 md:mt-12">
            <h2 className="font-serif text-xl text-neutral-900">
              <AnnotatedText variant="wavy" color="text-rose-200">
                Preview
              </AnnotatedText>
            </h2>
            <div className="mt-5">
              <DocsPreviewStage
                variant={
                  isFormShowcaseFile(entry.file)
                    ? "form"
                    : isInputShowcaseFile(entry.file)
                      ? "input"
                      : "default"
                }
                fullBleed={isFullBleedShowcaseFile(entry.file)}
                flushPreview={isFlushPreviewBackgroundShowcaseFile(entry.file)}
                backdropImage={getShowcasePreviewBackdrop(entry.file)}
              >
                {entry.preview}
              </DocsPreviewStage>
            </div>
          </section>

          <section id="setup" className="mt-10 scroll-mt-8 space-y-5 md:mt-12">
            <div>
              <h2 className="font-serif text-xl text-neutral-900">
                <AnnotatedText variant="doubleUnderline">Setup</AnnotatedText>
              </h2>
            </div>

            <SetupGuide
              componentFile={entry.file}
              exportName={entry.exportName}
              usage={entry.usage}
            />

            <div id="cn" className="scroll-mt-8">
              <CopyCodeBlock
                filename="lib/cn.ts"
                code={cnSource.trim()}
                hint="clsx + tailwind-merge"
              />
            </div>

            <div id="code" className="scroll-mt-8">
              <CopyCodeBlock
                filename={entry.file}
                code={componentSource.trim()}
                hint="icons + images"
              />
            </div>
          </section>

          <nav
            aria-label="Component navigation"
            className="mt-12 border-t border-neutral-200 pt-8"
          >
            <div className="flex items-center justify-between gap-4">
              {previousEntry ? (
                <SaveScrollLink
                  href={`/components/${previousEntry.slug}`}
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-400"
                >
                  <span className="relative inline-flex size-3 shrink-0 items-center justify-center">
                    <ChevronLeft
                      size={12}
                      strokeWidth={3}
                      className="ease-smooth transition-[opacity,transform] duration-500 group-hover:-translate-x-0.5 group-hover:scale-95 group-hover:opacity-0"
                    />
                    <MoveLeft
                      size={12}
                      strokeWidth={2.5}
                      className="ease-smooth absolute translate-x-0.5 scale-95 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:scale-100 group-hover:opacity-100"
                    />
                  </span>
                  Previous
                </SaveScrollLink>
              ) : (
                <span />
              )}

              {nextEntry ? (
                <SaveScrollLink
                  href={`/components/${nextEntry.slug}`}
                  className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 underline decoration-neutral-200 underline-offset-4 transition-colors hover:text-neutral-900 hover:decoration-neutral-400"
                >
                  Next
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
                </SaveScrollLink>
              ) : null}
            </div>
          </nav>
        </article>
      </main>

      <DocsToc items={[...tocItems]} />
    </div>
  );
}
