import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

export class SignupPage extends BasePage {
  private readonly newUserSignupHeading: Locator;
  private readonly nameInput: Locator;
  private readonly emailSingUpInput: Locator;
  private readonly signupButton: Locator;
  private readonly signInButton: Locator;

  private readonly emailSingInInput: Locator;
  private readonly passwordSingInInput: Locator;

  private readonly signupError: Locator;
  private readonly loginError: Locator;


  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.newUserSignupHeading = page.getByRole("heading", { name: "New User Signup!" });
    this.nameInput = page.getByPlaceholder("Name");
    this.emailSingUpInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole("button", { name: "Signup" });
    this.signInButton = page.getByRole("button", { name: "Login" });
    this.emailSingInInput = page.locator('input[data-qa="login-email"]');
    this.passwordSingInInput = page.locator('input[data-qa="login-password"]');
    this.signupError = page.locator('.signup-form p');
    this.loginError = page.locator('.login-form p');
  }

  async verifyNewUserSignupVisible(): Promise<void> {
    await expect(this.newUserSignupHeading).toBeVisible();
  }

  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.nameInput.clear();
    await this.nameInput.fill(name);
    await this.emailSingUpInput.clear();
    await this.emailSingUpInput.fill(email);
  }

  async clickSignup(): Promise<void> {
    await this.signupButton.click();
  }

  async fillLoginForm(email: string, pass: string): Promise<void> {
    await this.emailSingInInput.clear();
    await this.emailSingInInput.fill(email);
    await this.passwordSingInInput.clear();
    await this.passwordSingInInput.fill(pass);
  }

  async clickLogin(): Promise<void> {
    await this.signInButton.click();
  
  }

  async verifySignupError(message: string): Promise<void> {
    await expect(this.signupError).toContainText(message);
  }

  async verifyLoginError(message: string): Promise<void> {
    await expect(this.loginError).toContainText(message);
  }
}
