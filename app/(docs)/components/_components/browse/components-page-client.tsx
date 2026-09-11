"use client";

import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  getHydratedSearchParam,
  useHydratedSearchParams,
} from "@/app/_shared/navigation/use-hydrated-search-params";
import { getCategoryPath } from "@/lib/showcase/category-slug";
import { resolveShowcaseCategory } from "@/lib/showcase/resolve-category";
import type { ShowcaseCategoryGroup } from "@/lib/showcase/showcase";
import { JsonLd } from "@/lib/seo/json-ld";
import { getComponentsItemListJsonLd } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/site";

import { DocsToc } from "../shell/docs-toc";
import { ComponentsBrowseAll } from "./components-browse-all";
import { ComponentsSearchResults } from "./components-search-results";

type ComponentsPageClientProps = Readonly<{
  categories: ShowcaseCategoryGroup[];
  totalCount: number;
}>;

function ComponentsPageContent({
  categories,
  totalCount,
}: ComponentsPageClientProps) {
  const router = useRouter();
  const searchParams = useHydratedSearchParams();
  const categoryParam =
    getHydratedSearchParam(searchParams, "category") ?? undefined;
  const searchQuery = getHydratedSearchParam(searchParams, "q")?.trim() ?? "";
  const isSearching = searchQuery.length > 0;

  useEffect(() => {
    if (!categoryParam || isSearching) return;

    const group = resolveShowcaseCategory(categories, categoryParam);
    if (!group) return;

    router.replace(getCategoryPath(group.category));
  }, [categories, categoryParam, isSearching, router]);

  const listJsonLd = isSearching
    ? null
    : getComponentsItemListJsonLd(
        categories.flatMap((group) => group.items),
        "All React UI Components",
        `${siteConfig.url}/components`,
      );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      {listJsonLd ? <JsonLd data={listJsonLd} /> : null}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main
          id="main-content"
          data-docs-scroll
          className="scrollbar-hover data-docs-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
        >
          {isSearching ? (
            <ComponentsSearchResults query={searchQuery} />
          ) : (
            <ComponentsBrowseAll
              categories={categories}
              totalCount={totalCount}
            />
          )}
        </main>

        <DocsToc
          items={
            isSearching
              ? [
                  {
                    id: "overview",
                    label: "Search",
                    description: `Results for “${searchQuery}”`,
                  },
                  {
                    id: "components",
                    label: "Components",
                    description: "Filtered matches",
                  },
                ]
              : [
                  {
                    id: "overview",
                    label: "Overview",
                    description: "Open source library intro",
                  },
                  {
                    id: "components",
                    label: "Components",
                    description: `${totalCount} available to open`,
                  },
                ]
          }
        />
      </div>
    </div>
  );
}

function ComponentsPageFallback({
  categories,
  totalCount,
}: ComponentsPageClientProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main
          id="main-content"
          data-docs-scroll
          className="scrollbar-hover data-docs-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
        >
          <ComponentsBrowseAll
            categories={categories}
            totalCount={totalCount}
          />
        </main>

        <DocsToc
          items={[
            {
              id: "overview",
              label: "Overview",
              description: "Open source library intro",
            },
            {
              id: "components",
              label: "Components",
              description: `${totalCount} available to open`,
            },
          ]}
        />
      </div>
    </div>
  );
}

export function ComponentsPageClient({
  categories,
  totalCount,
}: ComponentsPageClientProps) {
  return (
    <Suspense
      fallback={
        <ComponentsPageFallback
          categories={categories}
          totalCount={totalCount}
        />
      }
    >
      <ComponentsPageContent categories={categories} totalCount={totalCount} />
    </Suspense>
  );
}
