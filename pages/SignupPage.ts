import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

export class SignupPage extends BasePage {
  private readonly newUserSignupHeading: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly signupButton: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.newUserSignupHeading = page.getByRole("heading", { name: "New User Signup!" });
    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole("button", { name: "Signup" });
  }

  async verifyNewUserSignupVisible(): Promise<void> {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async clickSignup(): Promise<void> {
    await this.signupButton.click();
  }
}
