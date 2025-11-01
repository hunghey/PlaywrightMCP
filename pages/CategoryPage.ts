import { Page, Locator } from "@playwright/test";

export class MenuComponent {
  readonly page: Page;
  private readonly categoryMenu: Locator;
  private readonly exploreMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryMenu = page.locator(".wsmenucontainer #explore-category");
    this.exploreMenu = page.locator(".wsmenucontainer #explore-category");
  }

  async openMenu(menuType: "categories" | "explore") {
    if (menuType === "categories") {
      await this.categoryMenu.click();
    } else {
      await this.exploreMenu.click();
    }
  }

}
