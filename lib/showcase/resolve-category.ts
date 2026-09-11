type ShowcaseCategoryLike = Readonly<{
  category: string;
}>;

// Category URLs are matched case-insensitively — clocks, Clocks, and CLOCKS all resolve.
export function resolveShowcaseCategory<T extends ShowcaseCategoryLike>(
  categories: readonly T[],
  param: string,
): T | undefined {
  const normalized = param.trim().toLowerCase();
  if (!normalized) return undefined;

  return categories.find(
    (group) => group.category.toLowerCase() === normalized,
  );
}
