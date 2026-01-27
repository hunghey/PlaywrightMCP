import { Page } from "@playwright/test";
import { SiteConfig } from "../config/environment";

export class BasePage {
  readonly page: Page;
  protected readonly config: SiteConfig;

  constructor(page: Page, siteConfig: SiteConfig) {
    this.page = page;
    this.config = siteConfig;
  }

  /**
   * Navigate to a specific path on the base URL
   * @param path - Path to append to base URL (default: empty string for home page)
   */
  async goto(path: string = ""): Promise<void> {
    await this.page.route('**/*', route => {
    const url = route.request().url();
    if (url.includes('googleads') || 
        url.includes('doubleclick') || 
        url.includes('googlesyndication')) {
      return route.abort(); // Hủy tải quảng cáo
    }
    return route.continue(); // Cho phép các request khác
    });
    
    try {
      await this.page.goto(`${this.config.baseUrl}${path}`, {
        waitUntil: "networkidle",
      });
      console.log(`✓ Navigated to: ${this.config.baseUrl}${path}`);
    } catch (error) {
      console.error(`✗ Failed to navigate to: ${this.config.baseUrl}${path}`, error);
      throw error;
    }
  }

  protected async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
