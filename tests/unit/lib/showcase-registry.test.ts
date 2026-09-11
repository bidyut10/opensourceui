import { describe, expect, it } from "vitest";

import { getAllShowcaseSlugs, getShowcaseEntry } from "@/lib/showcase/showcase";

describe("showcase registry", () => {
  it("has unique slugs and resolvable entries", () => {
    const slugs = getAllShowcaseSlugs();
    expect(slugs.length).toBeGreaterThan(200);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const slug of slugs) {
      const entry = getShowcaseEntry(slug);
      expect(entry, slug).toBeDefined();
      expect(entry?.file.startsWith("components/")).toBe(true);
      expect(entry?.preview).toBeTruthy();
    }
  });

  it("keeps featured demos available", () => {
    for (const slug of [
      "phone",
      "laptop",
      "slide-to-confirm-button",
      "hold-to-delete-button",
      "login-form",
    ]) {
      expect(getShowcaseEntry(slug)?.slug).toBe(slug);
    }
  });
});
