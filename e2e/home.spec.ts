import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByRole("heading", { name: "React Best Practices Template" }),
	).toBeVisible();
});

test("shows welcome content", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
});
