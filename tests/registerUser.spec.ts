import { test, expect } from "@playwright/test";
import { automationExerciseConfig } from "../config/environment";
import { HomePage } from "../pages/HomePage";
import { SignupPage } from "../pages/SignupPage";
import { AccountInfoPage } from "../pages/AccountInfoPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { DashboardPage } from "../pages/DashboardPage";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";
import { generateUserData } from "../utils/testDataGenerator";
import { saveUserToCSV, getUser } from "../utils/csvUtils";

test.describe("User Registration E2E Tests", () => {
  test("should successfully register a new user and delete account", async ({ page }) => {
    // Get user data from CSV or generate new data if none available
    let userData;
    try {
      userData = getUser();
      console.log("User consumed from CSV:", userData);
    } catch (error) {
      // If no users available in CSV, generate new user data
      console.log("No available users in CSV, generating new user data");
      const generatedData = generateUserData();
      userData = {
        name: generatedData.name,
        email: generatedData.email,
        password: generatedData.password
      };
      // Save the new user to CSV with empty status
      await saveUserToCSV(userData.name, userData.email, userData.password);
      console.log("Generated and saved new user data:", userData);
    }

    // Initialize Page Objects
    const homePage = new HomePage(page, automationExerciseConfig);
    const signupPage = new SignupPage(page, automationExerciseConfig);
    const accountInfoPage = new AccountInfoPage(page, automationExerciseConfig);
    const accountCreatedPage = new AccountCreatedPage(page, automationExerciseConfig);
    const dashboardPage = new DashboardPage(page, automationExerciseConfig);
    const deleteAccountPage = new DeleteAccountPage(page, automationExerciseConfig);

    // Step 1: Navigate to the homepage and verify the title
    await homePage.navigateToHome();
    await homePage.verifyTitle();

    // Step 2: Click on 'Signup / Login' button
    await homePage.clickSignupLogin();

    // Step 3: Verify 'New User Signup!' is visible
    await signupPage.verifyNewUserSignupVisible();

    // Step 4: Enter name and email (from CSV or generated)
    await signupPage.fillSignupForm(userData.name, userData.email);

    // Step 5: Click 'Signup' button
    await signupPage.clickSignup();

    // Step 6: Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await accountInfoPage.verifyEnterAccountInfoVisible();

    // Step 7: Fill in the "Enter Account Information" form
    // Need to add additional fields for account creation
    const fullUserData = {
      ...userData,
      ...generateUserData() // Generate additional fields like address, DOB, etc.
    };
    await accountInfoPage.fillAccountInformation(fullUserData);

    // Step 8: Fill in the "Address Information" form
    await accountInfoPage.fillAddressInformation(fullUserData);

    // Step 9: Click 'Create Account' and verify success message
    await accountInfoPage.clickCreateAccount();
    await accountCreatedPage.verifyAccountCreated();

    // Step 10: Click 'Continue' (handle Google Ad iframe/popup if it appears)
    await accountCreatedPage.clickContinue();

    // Step 11: Verify 'Logged in as [Username]' is visible
    await dashboardPage.verifyLoggedInAs(userData.name);

    // Step 12: Click 'Delete Account' and verify deletion
    await dashboardPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();

    // Step 13: Click 'Continue'
    await deleteAccountPage.clickContinue();
  });
});
