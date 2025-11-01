import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductListPage } from '../pages/productListPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { getCurrentSiteConfig } from '../config/environment';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

interface SiteConfigData {
  country: string;
  language: string;
  email: string;
  password: string;
}

// Read test data
const testData = parse(
  fs.readFileSync(path.join(__dirname, "../testData/userData.csv")),
  {
    columns: true,
    skip_empty_lines: true,
  }
) as SiteConfigData[];

test.describe("Add to Cart Flow", () => {
  test("should navigate through categories and add bed pillow to cart", async ({page}) => {
    const config = getCurrentSiteConfig();
    // Get test data for current region
    const userData = testData.find(
      (data) => data.country.toLowerCase() === config.country.toLowerCase()
    );

    const homePage = new HomePage(page, config);
    const categoryPage = new ProductListPage(page, config);
    const productDetails = new ProductDetailsPage(page, config);

    // Navigate to the site
    await page.goto(config.baseUrl);

    // Close region alert if present
    await homePage.closeRegionAlertIfPresent();

    // Verify default language and country
    // await homePage.verifyCountryAndLanguage(
    //   userData!.country,
    //   userData!.language
    // );

    // Navigate through categories
    await homePage.menu.openMenu("categories");
    // await page.locator('.wsmenucontainer #explore-category').click();
    await homePage.menu.selectSubCategory("Home & Kitchen", "Home Decor", "Home Clocks", "Home Wall Clocks");

    // Optional: verify URL contains the correct category path
    await expect(page).toHaveURL(/.*home-wall-clocks/);

    await categoryPage.navigateToProductDetails('6.5" Large Digital Wall Clock with BT Sync, RGB Lights with 11 Scenes Mode Remote ...');

    const productInfo = await productDetails.getProductInfo(page,'6.5" Large Digital Wall Clock with BT Sync, RGB Lights with 11 Scenes Mode Remote ...');

    // if (productInfo.isInStock) {
    //   await productDetails.addToCart({
    //     size: 'King',
    //     quantity: 1
    //   });
    // };
  });
});
