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
    await this.page.goto(`${this.config.baseUrl}${path}`, {
      waitUntil: "domcontentloaded",
    });
  }

  protected async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
