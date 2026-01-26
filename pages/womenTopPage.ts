import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class WomenTopsPage extends BasePage {
  readonly firstProduct: Locator;

  constructor(page: Page) {
    super(page);
    this.firstProduct = page.locator("//div[contains(@class,'products')]//li[1]//a[@class='product-item-link']");
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();
  }
}
