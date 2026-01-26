import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";

test("Navigate to Women > Tops using POM", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto("https://demo.hyva.io/");
  const womenTopsPage = await homePage.transitWommenTops();
  // Check the page title
  await expect(page).toHaveTitle(/Tops/);
   // Add the first product to cart
  await womenTopsPage.addFirstProductToCart();

});