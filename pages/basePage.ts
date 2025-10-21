import { Page } from "@playwright/test";
import { SiteConfig } from "../config/environment";

export class BasePage {
  readonly page: Page;
  protected readonly config: SiteConfig;

  constructor(page: Page, siteConfig: SiteConfig) {
    this.page = page;
    this.config = siteConfig;
  }

  async goto(path: string = "") {
    await this.page.goto(`${this.config.baseUrl}${path}`);
  }

  protected async waitForPageLoad() {
    await this.page.waitForLoadState("networkidle");
  }
}
