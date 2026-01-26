import { test, expect } from "@playwright/test";
import { GithubLoginPage } from "../pages/githubLoginPage";
import { GithubRegisterPage } from "../pages/githubRegisterPage";

test.describe("GitHub Authentication Tests", () => {
  test("GitHub login shows error with invalid password", async ({ page }) => {
    const loginPage = new GithubLoginPage(page);
    await loginPage.goto();
    await loginPage.login("your-username", "wrong-password");
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test("GitHub register page shows error for invalid email", async ({ page }) => {
    const registerPage = new GithubRegisterPage(page);
    await registerPage.goto();
    await registerPage.register(
      "testuser12345",
      "invalid-email",
      "TestPassword123!"
    );
  // Example: check for an error message about invalid email
    await expect(page.getByText(/email.*invalid/i)).toBeVisible();
  });

});
