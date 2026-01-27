import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";
import { NavbarComponent } from "./components/NavbarComponent";

export class DashboardPage extends BasePage {
  readonly navbar: NavbarComponent;
  private readonly loggedInAsText: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.navbar = new NavbarComponent(page);
    this.loggedInAsText = page.getByText(/Logged in as /);
  }

  async verifyLoggedInAs(username: string): Promise<void> {
    await expect(this.loggedInAsText).toContainText(username);
  }

  async clickDeleteAccount(): Promise<void> {
    await this.navbar.clickDeleteAccount();
  }

  async logout(): Promise<void> {
    await this.navbar.clickLogout();
  }
}
