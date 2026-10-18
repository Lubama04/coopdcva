import { expect, test } from "@playwright/test";

test("carte filière de l'accueil → section de la filière", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator('a[href="/filieres#karite"]').first().click();
  await expect(page).toHaveURL(/\/filieres#karite$/);
  await expect(page.locator("#karite h2")).toBeInViewport();
});

test("lien direct /filieres#spiruline", async ({ page }) => {
  await page.goto("/filieres#spiruline", { waitUntil: "load" });
  await expect(page.locator("#spiruline h2")).toBeInViewport();
});
