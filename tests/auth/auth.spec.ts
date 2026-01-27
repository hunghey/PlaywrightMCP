import { test, expect, Page } from "@playwright/test";
import { automationExerciseConfig } from "../../config/environment";
import { HomePage } from "../../pages/HomePage";
import { SignupPage } from "../../pages/SignupPage";
import { AccountInfoPage } from "../../pages/AccountInfoPage";
import { AccountCreatedPage } from "../../pages/AccountCreatedPage";
import { DashboardPage } from "../../pages/DashboardPage";
import { DeleteAccountPage } from "../../pages/DeleteAccountPage";
import { generateUserData, generateDetailsInforData } from "../../utils/testDataGenerator";
import { saveUserToCSV, getUser } from "../../utils/csvUtils";
import { ERROR_MESSAGES, TEST_DATA, PAGE_TITLES } from "../../config/constants";

/**
 * User Authentication & Management Test Suite
 * Tests user registration, login, logout, and account deletion flows
 * 
 * Test execution mode: Serial (tests run sequentially to maintain state)
 */
test.describe.configure({ mode: "serial" });

test.describe("User Authentication & Management Tests", () => {
  // Page Object instances
  let homePage: HomePage;
  let signupPage: SignupPage;
  let accountInfoPage: AccountInfoPage;
  let accountCreatedPage: AccountCreatedPage;
  let dashboardPage: DashboardPage;
  let deleteAccountPage: DeleteAccountPage;
  let page: Page;

  // Test data
  let userCredentials: {
    name: string;
    email: string;
    password: string;
  };
  let fullUserData: {
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
    dateOfBirth: {
      day: string;
      month: string;
      year: string;
    };
  };

  /**
   * Setup: Initialize page objects and prepare test data
   * Attempts to reuse existing user from CSV, otherwise generates new user data
   */
  test.beforeAll(async ({ browser }) => {

    page = await browser.newPage();

    // Initialize all page objects
    homePage = new HomePage(page, automationExerciseConfig);
    signupPage = new SignupPage(page, automationExerciseConfig);
    accountInfoPage = new AccountInfoPage(page, automationExerciseConfig);
    accountCreatedPage = new AccountCreatedPage(page, automationExerciseConfig);
    dashboardPage = new DashboardPage(page, automationExerciseConfig);
    deleteAccountPage = new DeleteAccountPage(page, automationExerciseConfig);

    // Get or generate user credentials
    try {
      userCredentials = getUser();
      console.log("✓ User credentials retrieved from CSV:", userCredentials.email);
    } catch (error) {
      // If no users available in CSV, generate new user data
      console.log("⚠ No available users in CSV, generating new user data");
      const generatedData = generateUserData();
      userCredentials = {
        name: generatedData.name,
        email: generatedData.email,
        password: generatedData.password,
      };
    }

    // Combine user credentials with additional details
    fullUserData = {
      ...userCredentials,
      ...generateDetailsInforData(),
    };

    // Save user credentials to CSV for future test runs
    await saveUserToCSV(
      userCredentials.name,
      userCredentials.email,
      userCredentials.password
    );
  });

  /**
   * Cleanup: Close browser page after all tests complete
   */
  test.afterAll(async () => {
    await page.close();
  });

  /**
   * Helper method: Complete user registration flow
   * Navigates through signup, account info, and address information forms
   */
  async function completeUserRegistration(): Promise<void> {
    await homePage.navigateToHome();
    await homePage.verifyTitle();
    await homePage.clickSignupLogin();
    await signupPage.verifyNewUserSignupVisible();
    await signupPage.fillSignupForm(userCredentials.name, userCredentials.email);
    await signupPage.clickSignup();
    await accountInfoPage.verifyEnterAccountInfoVisible();
    await accountInfoPage.fillAccountInformation(fullUserData);
    await accountInfoPage.fillAddressInformation(fullUserData);
    await accountInfoPage.clickCreateAccount();
    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();
  }

  /**
   * TC1: Register User (Positive Test)
   * Verifies complete user registration flow including account creation and logout
   */
  test("TC1: Should successfully register a new user, verify account, and logout", async () => {
    // Complete registration flow
    await completeUserRegistration();

    // Verify successful login after registration
    await dashboardPage.verifyLoggedInAs(userCredentials.name);

    // Verify logout functionality
    await dashboardPage.logout();
    await signupPage.verifyNewUserSignupVisible(); // Verify we are back on home/login page
  });

  /**
   * TC2: Register User with Existing Email (Negative Test)
   * Verifies that attempting to register with an existing email shows appropriate error
   */
  test("TC2: Should show error when registering with an existing email", async () => {
    // Navigate to signup page
    await signupPage.verifyNewUserSignupVisible();

    // Attempt to register with existing email
    await signupPage.fillSignupForm(userCredentials.name, userCredentials.email);
    await signupPage.clickSignup();

    // Verify error message is displayed
    await signupPage.verifySignupError(ERROR_MESSAGES.SIGNUP_EMAIL_EXISTS);
  });

  /**
   * TC3: Login with Invalid Credentials (Negative Test)
   * Verifies that login with incorrect password shows appropriate error
   */
  test("TC3: Should show error when logging in with invalid credentials", async () => {
    // Attempt login with invalid password
    await signupPage.fillLoginForm(userCredentials.email, TEST_DATA.INVALID_PASSWORD);
    await signupPage.clickLogin();

    // Verify error message is displayed
    await signupPage.verifyLoginError(ERROR_MESSAGES.LOGIN_INVALID_CREDENTIALS);
  });

  /**
   * TC4: Login with Valid User & Delete Account (E2E Flow)
   * Verifies complete login flow and account deletion
   */
  test("TC4: Should successfully login and delete account", async () => {
    // Test Action
    await homePage.clickSignupLogin();
    await signupPage.fillLoginForm(userCredentials.email, userCredentials.password);
    await signupPage.clickLogin();

    await dashboardPage.verifyLoggedInAs(userCredentials.name);

    await dashboardPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();

    // Verify we are back on home page
    await homePage.verifyTitle();
  });
});
