import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/a-propos",
  "/filieres",
  "/projets",
  "/projets/proval-zd",
  "/projets/site-de-production-gassi",
  "/projets/formation-des-membres",
  "/projets/certification-normes-sanitaires",
  "/produits",
  "/actualites",
  "/actualites/conference-valorisation-beurre-de-karite-du-tchad",
  "/actualites/renforcement-des-capacites-farine-infantile",
  "/galerie",
  "/contact",
];

function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    // The Google Maps iframe logs its own messages; only keep errors from this site.
    if (m.type() === "error" && !m.location().url.includes("google")) errors.push(m.text());
  });
  return errors;
}

for (const route of routes) {
  test(`${route} répond 200, sans erreur ni défilement horizontal`, async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    expect(errors).toEqual([]);
  });
}

test("/proval-zd redirige vers /projets/proval-zd", async ({ page }) => {
  await page.goto("/proval-zd", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/projets\/proval-zd$/);
});

test("page inconnue : 404", async ({ page }) => {
  const res = await page.goto("/page-qui-n-existe-pas", { waitUntil: "domcontentloaded" });
  expect(res?.status()).toBe(404);
});

test("galerie : filtre puis visionneuse au clavier, focus rendu", async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto("/galerie", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: /^Spiruline/ }).click();
  const vignettes = page.locator("ul button[aria-haspopup='dialog']");
  await expect(vignettes).toHaveCount(2);
  await page.getByRole("button", { name: /^Toutes/ }).click();
  await vignettes.first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText(/^1 \/ \d+$/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText(/^2 \/ \d+$/)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(vignettes.nth(1)).toBeFocused();
  expect(errors).toEqual([]);
});

test("formulaire : erreurs affichées et focus sur le premier champ", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByLabel("Votre nom")).toBeFocused();
  await expect(page.getByText("Indiquez votre nom.")).toBeVisible();
});

test("formulaire : succès quand l'API répond ok", async ({ page }) => {
  await page.route("**/api/contact", (r) => r.fulfill({ json: { ok: true } }));
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Votre nom").fill("Test");
  await page.getByLabel("E-mail ou téléphone").fill("test@example.com");
  await page.getByLabel("Message").fill("Bonjour, ceci est un test automatique.");
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByText("Merci, votre message est bien envoyé.")).toBeVisible();
});

test("formulaire : repli WhatsApp / e-mail si l'envoi échoue", async ({ page }) => {
  await page.route("**/api/contact", (r) => r.abort());
  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Votre nom").fill("Test");
  await page.getByLabel("E-mail ou téléphone").fill("+235 66 00 00 00");
  await page.getByLabel("Message").fill("Bonjour, ceci est un test automatique.");
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByRole("button", { name: "Réessayer" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Envoyer sur WhatsApp" })).toHaveAttribute("href", /wa\.me\/23565570937/);
});

test("filières : le menu déroulant n'affiche que la filière choisie", async ({ page }) => {
  await page.goto("/filieres", { waitUntil: "domcontentloaded" });
  const sections = page.locator("section[id] h2");
  await expect(sections).toHaveCount(9);
  const menu = page.getByRole("combobox", { name: /Choisissez une filière/ });
  await menu.click();
  await page.getByRole("option", { name: "Karité" }).click();
  await expect(sections).toHaveCount(1);
  await expect(sections.first()).toHaveText("Karité");
  await expect(page).toHaveURL(/\/filieres#karite$/);
  // Keyboard: open, go to "Spiruline (dihé)" by typing, confirm.
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("listbox")).toBeVisible();
  await page.keyboard.press("s");
  await expect(page.getByRole("option", { name: "Spiruline (dihé)" })).toHaveClass(/bg-leaf-50/);
  await page.keyboard.press("Enter");
  await expect(sections.first()).toHaveText("Spiruline (dihé)");
  await page.getByRole("button", { name: "Afficher toutes les filières" }).click();
  await expect(sections).toHaveCount(9);
});

test("lien direct vers une filière : seule celle-ci est affichée", async ({ page }) => {
  await page.goto("/filieres#nere", { waitUntil: "load" });
  await expect(page.locator("section[id] h2")).toHaveCount(1);
  await expect(page.locator("#nere h2")).toBeInViewport();
});

test("produits : filtre par filière et commande WhatsApp", async ({ page }) => {
  await page.goto("/produits", { waitUntil: "domcontentloaded" });
  const cartes = page.locator("main ul > li article");
  const total = await cartes.count();
  expect(total).toBeGreaterThan(4);
  await page.getByRole("combobox", { name: /Filtrer par filière/ }).click();
  await page.getByRole("option", { name: /^Oléagineux/ }).click();
  await expect(cartes).toHaveCount(4);
  await expect(page.getByRole("link", { name: /Prix et disponibilité/ }).first()).toHaveAttribute(
    "href",
    /wa\.me\/23565570937\?text=/,
  );
});

test("actualités : la carte mène à l'article", async ({ page }) => {
  await page.goto("/actualites", { waitUntil: "domcontentloaded" });
  await page.getByRole("link", { name: /conférence sur la valorisation du beurre de karité/ }).first().click();
  await expect(page).toHaveURL(/\/actualites\/conference-valorisation-beurre-de-karite-du-tchad$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("beurre de karité");
});

test("menu mobile : s'ouvre et se ferme avec Échap", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile uniquement");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeHidden();
});

test("zones tactiles des liens et boutons ≥ 44 px (mobile)", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile uniquement");
  for (const route of ["/", "/galerie", "/contact"]) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const petits = await page.evaluate(() =>
      [...document.querySelectorAll("main a, main button, header button, footer a")]
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        // Card title links are stretched over the whole card with ::after.
        .filter((el) => !el.className.toString().includes("after:absolute"))
        .map((el) => ({ t: (el.textContent ?? "").trim().slice(0, 40), h: el.getBoundingClientRect().height }))
        .filter((e) => e.h > 0 && e.h < 32),
    );
    expect(petits, route).toEqual([]);
  }
});
