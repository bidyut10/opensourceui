import { notFound } from "next/navigation";

import { getShowcaseByCategory } from "@/lib/showcase/showcase";
import {
  getCategoryGroupBySlug,
  getCategoryPath,
  getCategorySlug,
} from "@/lib/showcase/category-slug";
import {
  createPageMetadata,
  getCategorySeoDescription,
  getCategorySeoKeywords,
  getCategorySeoTitle,
  getComponentsItemListJsonLd,
  JsonLd,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Props } from "@/types/types";

import { ComponentsCategoryView } from "../../_components/browse/components-category-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return getShowcaseByCategory().map((group) => ({
    slug: getCategorySlug(group.category),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categories = getShowcaseByCategory();
  const group = getCategoryGroupBySlug(categories, slug);
  if (!group) return {};

  return createPageMetadata({
    title: getCategorySeoTitle(group.category),
    description: getCategorySeoDescription(group.category, group.items.length),
    path: getCategoryPath(group.category),
    keywords: getCategorySeoKeywords(group.category),
  });
}

export default async function ComponentsCategoryPage({
  params,
}: Readonly<Props>) {
  const { slug } = await params;
  const categories = getShowcaseByCategory();
  const group = getCategoryGroupBySlug(categories, slug);
  if (!group) notFound();

  const listJsonLd = getComponentsItemListJsonLd(
    group.items,
    `${group.category} React Components`,
    `${siteConfig.url}${getCategoryPath(group.category)}`,
  );

  return (
    <>
      <JsonLd data={listJsonLd} />
      <ComponentsCategoryView
        categories={categories}
        category={group.category}
      />
    </>
  );
}
