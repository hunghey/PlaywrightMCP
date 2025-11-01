import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    private page: Page;
    private readonly productTitle: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartConfirmation: Locator;
    private readonly cartCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.product-title');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.cartConfirmation = page.locator('.cart-confirmation');
        this.cartCount = page.locator('.cart-count');
    }

    async selectSize(size: string) {
        await this.page.getByRole('radio', { name: size, exact: true }).click();
    }

    async addToCart() {
        await this.addToCartButton.click();
        await expect(this.cartConfirmation).toBeVisible();
    }

    async getCartCount(): Promise<number> {
        const count = await this.cartCount.textContent();
        return parseInt(count || '0');
    }

    async verifyCartConfirmation(expectedSize: string, expectedType: string) {
        const confirmationText = await this.cartConfirmation.textContent();
        expect(confirmationText).toContain(expectedSize);
        expect(confirmationText).toContain(expectedType);
    }
}