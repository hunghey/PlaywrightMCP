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

  async selectSubCategory(...menuLevels: string[]) {
    for (let i = 0; i < menuLevels.length; i++) {
      const level = menuLevels[i];

      // Giả sử mỗi item có text trùng tên menu
      const locator = this.page.locator(`//a[text()="${level}"]`);

      // Hover các cấp trừ cấp cuối
      if (i < menuLevels.length - 1) {
        await locator.hover();
        await this.page.waitForTimeout(300); // chờ menu con hiển thị
      } else {
        // Click cấp cuối
        await locator.click();
      }
    }
  }
}
