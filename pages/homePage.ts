import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";
import { MenuComponent } from "./components/MenuComponents";

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly closeAlertButton: Locator;
  private readonly currentLanguage: Locator;
  private readonly currentCountry: Locator;
  readonly menu: MenuComponent;
  
  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    this.menu = new MenuComponent(page);
    this.searchInput = page.getByPlaceholder("Search");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.closeAlertButton = page.getByRole('button', { name: 'Close' }).or(page.locator('.close-alert'));
    this.currentLanguage = page.locator('//li[contains(@class, "language")]//div[@id="navbarDropdowntwo"]//span[1]');
    this.currentCountry = page.locator('//li[contains(@class, "country")]//div[@id="navbarDropdownone"]//span[1]');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
    await this.waitForPageLoad();
  }

  async closeRegionAlertIfPresent() {
    try {
      const alert = await this.page.waitForSelector('//div[contains(text(),"currently browsing")]', {
        state: 'visible',
        timeout: 10000, 
      });

      if (alert) {
        await this.closeAlertButton.click();
        await this.waitForPageLoad();
      }
    } catch (error) {
      // If timeout occurs, alert is not present
      console.log('Region alert not found within 10 seconds');
    }
  }

  async getCurrentLanguage(): Promise<string> {
    return (await this.currentLanguage.innerText()).trim();
  }

  async getCurrentCountry(): Promise<string> {
    return (await this.currentCountry.innerText()).trim();
  }

  async verifyCountryAndLanguage(expectedCountry: string, expectedLanguage: string) {
    const currentCountry = await this.getCurrentCountry();
    const currentLanguage = await this.getCurrentLanguage();
    
    expect(currentCountry, `Country should be ${expectedCountry}`).toBe(expectedCountry);
    expect(currentLanguage, `Language should be ${expectedLanguage}`).toBe(expectedLanguage);
  }
}
