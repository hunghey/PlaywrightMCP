import { Page, Locator } from "@playwright/test";

export class NavbarComponent {
  readonly page: Page;
  private readonly homeLink: Locator;
  private readonly productsLink: Locator;
  private readonly cartLink: Locator;
  private readonly signupLoginLink: Locator;
  private readonly testCasesLink: Locator;
  private readonly apiTestingLink: Locator;
  private readonly videoTutorialsLink: Locator;
  private readonly contactUsLink: Locator;
  private readonly deleteAccountLink: Locator;
  private readonly logoutLink: Locator;
  private readonly loggedInAsText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByRole("link", { name: " Home" });
    this.productsLink = page.getByRole("link", { name: " Products" });
    this.cartLink = page.getByRole("link", { name: " Cart" });
    this.signupLoginLink = page.getByRole("link", { name: "Signup / Login" });
    this.testCasesLink = page.getByRole("link", { name: " Test Cases" });
    this.apiTestingLink = page.getByRole("link", { name: " API Testing" });
    this.videoTutorialsLink = page.getByRole("link", { name: " Video Tutorials" });
    this.contactUsLink = page.getByRole("link", { name: " Contact us" });
    this.deleteAccountLink = page.getByRole("link", { name: "Delete Account" });
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.loggedInAsText = page.locator("a:has-text('Logged in as')");
  }

  async clickHome(): Promise<void> {
    await this.homeLink.click();
  }

  async clickProducts(): Promise<void> {
    await this.productsLink.click();
  }

  async clickCart(): Promise<void> {
    await this.cartLink.click();
  }

  async clickSignupLogin(): Promise<void> {
    await this.signupLoginLink.click();
  }

  async clickTestCases(): Promise<void> {
    await this.testCasesLink.click();
  }

  async clickAPITesting(): Promise<void> {
    await this.apiTestingLink.click();
  }

  async clickVideoTutorials(): Promise<void> {
    await this.videoTutorialsLink.click();
  }

  async clickContactUs(): Promise<void> {
    await this.contactUsLink.click();
  }

  async clickDeleteAccount(): Promise<void> {
    await this.deleteAccountLink.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutLink.click();
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.loggedInAsText.textContent();
    return text?.replace("Logged in as ", "") || "";
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.loggedInAsText.isVisible();
  }
}
