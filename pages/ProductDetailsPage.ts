import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

export interface AddToCartOptions {
  quantity?: number;
  size?: string;
  color?: string;
  waitForSuccess?: boolean;
}

export class ProductDetailsPage extends BasePage {
  // Product Information
  private readonly productTitle: Locator;
  private readonly productPrice: Locator;
  // Options
  private readonly sizeOptions: Locator;
  private readonly colorOptions: Locator;
  private readonly quantityInput: Locator;
  private readonly quantityInStock: Locator;
  // Buttons
  private readonly addToCartButton: Locator;
  private readonly buyNowButton: Locator;
  // Messages
  private readonly successSymbol: Locator;
  private readonly successMessage: Locator;
  private readonly errorMessage: Locator;
  private readonly continueButton: Locator;
  // Cart Related
  private readonly cartCounter: Locator;
  // Loading
  private readonly loader: Locator;

  constructor(page: Page, config: SiteConfig) {
    super(page, config);
    // Product Information
    this.productTitle = page.locator('//p[contains(@class, "brand-name") and contains(@itemprop, "brand")]');
    this.productPrice = page.locator("//span[@itemprop='price']");

    // Options
    this.sizeOptions = page.locator("//div[@id='sizeSelect-content']//label");
    this.colorOptions = page.locator("//div[@id='colorSelect-content']//label");
    this.quantityInput = page.locator("//div[@class='quantity-input']//input");
    this.quantityInStock = page.locator(
      "//div[@id='availability_sec']//span[@id='availability-status']"
    );

    // Buttons
    this.addToCartButton = page.locator("#product-addtocart-button");
    this.buyNowButton = page.locator("#buy-now");

    // Messages
    this.successSymbol = page.locator(
      "//div[contains(@class,'addition-successful')]"
    );
    this.successMessage = page.locator("[//span[@id='add-to-cart-badge']");
    this.errorMessage = page.locator(
      "//div[contains(@class,'addition-error')]"
    );
    this.continueButton = page.getByRole("button", {
      name: "Continue Shopping",
    });
    // Cart Related
    this.cartCounter = page.locator(".cart_count");

    // Loading
    this.loader = page.locator("span.span_spinner");
  }

  async getProductTitle(productName: string) {
    try {
      

      // const brandText = await frame
      //   .locator('//a[contains(@class,"brand")][2]')  // Dùng XPath bạn đã test
      //   .textContent();
        await expect(this.productTitle).toBeVisible({ timeout: 10000 });
        const actualTitle = await this.productTitle.innerText();
        
        // So sánh tiêu đề không phân biệt hoa thường và bỏ qua khoảng trắng thừa
        const normalizedActual = actualTitle.toLowerCase().trim();
        const normalizedExpected = productName.toLowerCase().trim();
        
        // Kiểm tra xem tiêu đề thực tế có chứa tên sản phẩm mong đợi
        if (!normalizedActual.includes(normalizedExpected)) {
            throw new Error(`Product title mismatch. Expected: "${productName}", Actual: "${actualTitle}"`);
        }
        
        return actualTitle;
    } catch (error) {
        console.error('Error verifying product title:', error);
        throw error;
    }
  }

  async selectSize(size: string): Promise<void> {
    // const sizeSelector = this.sizeOptions.replace("{size}", size);
    // const sizeOption = this.page.locator(sizeSelector);
    // await expect(sizeOption).toBeVisible();
    // await sizeOption.click();
  }

  async setQuantity(quantity: number): Promise<void> {
    await this.quantityInput.clear();
    await this.quantityInput.fill(quantity.toString());
  }

  async getCartCount(): Promise<number> {
    const countText = await this.cartCounter.textContent();
    return parseInt(countText || "0");
  }

  async addToCart(options: AddToCartOptions = {}): Promise<boolean> {
    // Set quantity if provided
    if (options.quantity && options.quantity > 1) {
      await this.setQuantity(options.quantity);
    }

    // Select size if provided
    if (options.size) {
      await this.selectSize(options.size);
    }

    // Get initial cart count for verification
    const initialCount = await this.getCartCount();

    // Click add to cart button
    await expect(this.addToCartButton).toBeEnabled();
    await this.addToCartButton.click();

    // Wait for loader to disappear
    await this.loader.waitFor({ state: "hidden", timeout: 30000 });

    // Verify cart counter increased
    const newCount = await this.getCartCount();
    const quantityAdded = options.quantity || 1;
    return newCount === initialCount + quantityAdded;
  }

  async verifyAddToCartSuccess(): Promise<void> {
    // Verify success message is visible
    await expect(this.successMessage).toBeVisible({ timeout: 10000 });

    // Verify error message is not visible
    await expect(this.errorMessage).not.toBeVisible();
  }

  async waitForPageLoad(): Promise<void> {
    // Wait for essential elements
    await expect(this.productTitle).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();

    // Wait for loader to disappear
    await this.loader.waitFor({ state: "hidden", timeout: 30000 });
  }

  async getProductInfo(page: Page, productName: string) {
    try {
      // const frame = page.locator('iframe').filter({
      //   has: page.locator('div.head-content')
      // });

      // // Đợi phần tử trong iframe
      // await frame.locator('div.head-content h1.title').waitFor({
      //   state: 'attached',
      //   timeout: 15000
      // });

      // await expect(this.productTitle).toBeVisible({ timeout: 10000 });
      // Get and verify product title

      // const n = await this.productTitle.count();
      // console.log('Product title count =', n);
      // for (let i = 0; i < n; i++) {
      //   const el = this.productTitle.nth(i);
      //   console.log(i,
      //     'visible=', await el.isVisible(),
      //     'text=', (await el.innerText()).trim(),
      //   );
      // }

      const actualTitle = (await this.productTitle.innerText());
      expect(actualTitle.toLowerCase()).toContain(productName.toLowerCase());

      // Get price with proper formatting
      const priceText = (await this.productPrice.textContent()) || "";

      // Get stock status
        const stockStatus = await this.quantityInStock.innerText();
      return {
        title: actualTitle.trim(),
        price: priceText.trim(),
        stockStatus,
        isInStock: await this.addToCartButton.isEnabled(),
      };
    } catch (error) {
      console.error("Error getting product info:", error);
      throw new Error(`Failed to get product info: ${error}`);
      }
    }
  }
