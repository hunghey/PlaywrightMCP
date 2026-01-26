import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

export class ProductListPage extends BasePage {

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
  }

  productCard = (name: string) =>
    this.page.locator(`//h3[contains(@class, "product-title") and contains(., '${name}')]`);

  // Function click vào product
  async navigateToProductDetails(productName: string) {
    await this.productCard(productName).click();
  }

  // async waitForProductLoad(productName: string): Promise<void> {
  //   await expect(
  //     this.page.locator(this.productCard(productName))
  //   ).toBeVisible({ timeout: 30000 });
  // }
}
