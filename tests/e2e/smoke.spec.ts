import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("static site smoke", () => {
  test("homepage loads with brand signal", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/opensource ui/i);
    await expect(
      page.getByRole("link", { name: "Browse Components", exact: true }),
    ).toBeVisible();
    await expect(page.locator("#main-content")).toBeAttached();
  });

  test("components catalog loads", async ({ page }) => {
    await page.goto("/components");
    await expect(
      page.getByRole("heading", { name: /available components/i }),
    ).toBeVisible();
    await expect(page.locator("body")).toContainText(/button|mockup|widget/i);
  });

  test("component detail page loads", async ({ page }) => {
    await page.goto("/components/phone");
    await expect(page).toHaveURL(/\/components\/phone/);
    await expect(page.locator("body")).toContainText(/iphone|phone|mockup/i);
  });

  test("category page loads", async ({ page }) => {
    await page.goto("/components/category/mockups");
    await expect(page).toHaveURL(/\/components\/category\/mockups/);
    await expect(page.locator("body")).toContainText(/mockup/i);
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(
      page.getByRole("heading", { name: /^contact$/i }),
    ).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: /^about$/i })).toBeVisible();
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(
      page.getByRole("heading", { name: /privacy policy/i }),
    ).toBeVisible();
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(
      page.getByRole("heading", { name: /terms of use/i }),
    ).toBeVisible();
  });

  test("unknown route shows 404", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText("404", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /page not found/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /browse components/i }),
    ).toBeVisible();
  });

  test("homepage has no serious a11y violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });

  test("components index has no serious a11y violations", async ({ page }) => {
    await page.goto("/components");
    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
