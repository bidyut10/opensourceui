import type { ShowcaseCategoryGroup } from "@/lib/showcase/showcase";
import { resolveShowcaseCategory } from "@/lib/showcase/resolve-category";

import { DocsToc } from "../shell/docs-toc";
import { ComponentsCatalog } from "./components-catalog";

type ComponentsCategoryViewProps = Readonly<{
  categories: ShowcaseCategoryGroup[];
  category: string;
}>;

export function ComponentsCategoryView({
  categories,
  category,
}: ComponentsCategoryViewProps) {
  const activeGroup = resolveShowcaseCategory(categories, category);

  if (!activeGroup) return null;

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <main
          id="main-content"
          data-docs-scroll
          className="scrollbar-hover data-docs-scroll min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
        >
          <ComponentsCatalog
            categories={categories}
            category={activeGroup.category}
          />
        </main>

        <DocsToc
          items={[
            {
              id: "overview",
              label: "Overview",
              description: "Category intro & usage",
            },
            {
              id: "components",
              label: "Components",
              description: `${activeGroup.items.length} in this category`,
            },
          ]}
        />
      </div>
    </div>
  );
}
