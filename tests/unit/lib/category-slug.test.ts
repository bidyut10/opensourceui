import { describe, expect, it } from "vitest";

import {
  categoryNameFromSlug,
  getCategoryPath,
  getCategorySlug,
} from "@/lib/showcase/category-slug";

describe("category-slug", () => {
  it("lowercases the first letter for slugs", () => {
    expect(getCategorySlug("Mockups")).toBe("mockups");
    expect(getCategorySlug("Buttons")).toBe("buttons");
  });

  it("uppercases the first letter from slugs", () => {
    expect(categoryNameFromSlug("mockups")).toBe("Mockups");
    expect(categoryNameFromSlug("buttons")).toBe("Buttons");
  });

  it("builds category paths", () => {
    expect(getCategoryPath("Mockups")).toBe("/components/category/mockups");
  });

  it("handles empty input", () => {
    expect(getCategorySlug("")).toBe("");
    expect(categoryNameFromSlug("")).toBe("");
  });
});
