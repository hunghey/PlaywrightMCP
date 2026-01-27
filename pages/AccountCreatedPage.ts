import { Page, expect, Locator, FrameLocator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";
import { UI_TEXT, BUTTON_TEXT, TIMEOUTS } from "../config/constants";

/**
 * AccountCreatedPage - Page Object for account creation confirmation page
 * Handles verification of account creation and ad popup management
 */
export class AccountCreatedPage extends BasePage {
  private readonly accountCreatedHeading: Locator;
  private readonly continueButton: Locator;
  private readonly adFrame: FrameLocator;
  private readonly closeAdButton: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.accountCreatedHeading = page.getByText(UI_TEXT.ACCOUNT_CREATED);
    this.continueButton = page.getByRole("link", { name: BUTTON_TEXT.CONTINUE });
    this.adFrame = page.frameLocator('iframe[id*="aswift"]').first();
    this.closeAdButton = this.adFrame.locator('div[aria-label="Close ad"]').first();
  }

  /**
   * Verify the "Account Created!" heading is visible
   */
  async verifyAccountCreated(): Promise<void> {
    await expect(this.accountCreatedHeading).toBeVisible();
  }

  /**
   * Click the Continue button, handling potential ad popups
   */
  async clickContinue(): Promise<void> {
    try {
      // Wait a bit for any popups to appear
      await this.page.waitForTimeout(2000);
      
      // Try to close any ad iframe if it exists
      if (await this.closeAdButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await this.closeAdButton.click();
      }
    } catch (error) {
      // If no ad appears or error occurs, continue normally
      console.log("No ad iframe detected or already closed");
    }

    await this.continueButton.click();
  }
}
