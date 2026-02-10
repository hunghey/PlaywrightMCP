import { test as base } from "@playwright/test";
import { automationExerciseConfig } from "../../config/environment";
import { HomePage } from "../../pages/HomePage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountInfoPage } from "../../pages/AccountInfoPage";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";

type PomFixtures = {
  homePage: HomePage;
  signupPage: SignupPage;
  accountInfoPage: AccountInfoPage;
  accountCreatedPage: AccountCreatedPage;
  dashboardPage: DashboardPage;
  deleteAccountPage: DeleteAccountPage;
};

export const test = base.extend<PomFixtures>({
  context: async ({ context }, use) => {
    await context.route("**/*", (route) => {
      const url = route.request().url();
      if (
        url.includes("googleads") ||
        url.includes("doubleclick") ||
        url.includes("googlesyndication")
      ) {
        return route.abort();
      }

      return route.continue();
    });

    await use(context);
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page, automationExerciseConfig));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page, automationExerciseConfig));
  },
  accountInfoPage: async ({ page }, use) => {
    await use(new AccountInfoPage(page, automationExerciseConfig));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page, automationExerciseConfig));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page, automationExerciseConfig));
  },
  deleteAccountPage: async ({ page }, use) => {
    await use(new DeleteAccountPage(page, automationExerciseConfig));
  },
});

export { expect } from "@playwright/test";
