import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

export class DeleteAccountPage extends BasePage {
  private readonly accountDeletedHeading: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.accountDeletedHeading = page.getByText("Account Deleted!");
    this.continueButton = page.getByRole("link", { name: "Continue" });
  }

  async verifyAccountDeleted(): Promise<void> {
    await expect(this.accountDeletedHeading).toBeVisible();
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }
}
