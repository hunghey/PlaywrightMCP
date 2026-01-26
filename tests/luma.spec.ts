import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { WomenTopsPage } from "../pages/WomenTopPage";

test("Navigate to Women > Tops", async ({ page }) => {
  const homePage = new HomePage(page);
  const womenTopsPage = new WomenTopsPage(page);

  await homePage.goto("https://demo.hyva.io/");
  await homePage.transitWommenTops();
  // Check the page title
  await expect(page).toHaveTitle(/Tops/);
   // Add the first product to cart
  await womenTopsPage.addFirstProductToCart();

});