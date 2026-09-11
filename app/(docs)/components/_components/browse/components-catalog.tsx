import {
  getShowcasePreviewBackdrop,
  isFlushPreviewBackgroundShowcaseFile,
  isFormShowcaseFile,
  isFullBleedShowcaseFile,
  isInputShowcaseFile,
  shouldShowShowcaseItemNewBadge,
  type ShowcaseCategoryGroup,
} from "@/lib/showcase/showcase";
import { resolveShowcaseCategory } from "@/lib/showcase/resolve-category";
import { AnnotatedText } from "@/components/underlines/annotated-text";

import { ComponentPreviewCard } from "./component-preview-card";
import { ShowcaseNewBadge } from "../shared/showcase-new-badge";
import Link from "next/link";

type ComponentsCatalogProps = Readonly<{
  categories: ShowcaseCategoryGroup[];
  category: string;
}>;

export function ComponentsCatalog({
  categories,
  category,
}: ComponentsCatalogProps) {
  const activeGroup =
    resolveShowcaseCategory(categories, category) ?? categories[0];

  if (!activeGroup) return null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:px-8 md:py-10">
      <div id="overview" className="scroll-mt-8">
        <Link
          href="/components"
          className="font-mono text-[11px] tracking-[0.14em] text-neutral-400 uppercase"
        >
          Components / Docs
        </Link>

        <h1 className="mt-3 font-serif text-3xl text-neutral-900">
          {activeGroup.category}
          {activeGroup.isCategoryNew ? (
            <ShowcaseNewBadge className="ml-2 align-middle" />
          ) : null}
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-500">
          {activeGroup.items.length}{" "}
          {activeGroup.items.length === 1 ? "component" : "components"} you can{" "}
          <AnnotatedText variant="highlight" color="text-yellow-100">
            copy and paste
          </AnnotatedText>{" "}
          into your React or Next.js project. Each includes setup steps, source
          code, and a live preview.
        </p>
      </div>

      <div id="components" className="mt-10 scroll-mt-8">
        <h2 className="mb-2 font-serif text-xl text-neutral-900">
          <AnnotatedText variant="underline" color="text-cyan-200">
            Components
          </AnnotatedText>
        </h2>
        <p className="mb-6 font-sans text-sm text-neutral-400">
          {activeGroup.items.length} ready to copy — open any card for full
          setup and source.
        </p>
        <div className="grid grid-cols-1 gap-6">
          {activeGroup.items.map((item) => (
            <ComponentPreviewCard
              key={item.slug}
              slug={item.slug}
              title={item.title}
              category={activeGroup.category}
              description={item.description}
              preview={item.preview}
              isNew={shouldShowShowcaseItemNewBadge(
                item,
                activeGroup.isCategoryNew,
              )}
              variant={
                isFormShowcaseFile(item.file)
                  ? "form"
                  : isInputShowcaseFile(item.file)
                    ? "input"
                    : "default"
              }
              fullBleed={isFullBleedShowcaseFile(item.file)}
              flushPreview={isFlushPreviewBackgroundShowcaseFile(item.file)}
              backdropImage={getShowcasePreviewBackdrop(item.file)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
