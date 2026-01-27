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

test.describe.configure({ mode: 'serial' });

test.describe("User Authentication & Management Tests", () => {
  let homePage: HomePage;
  let signupPage: SignupPage;
  let accountInfoPage: AccountInfoPage;
  let accountCreatedPage: AccountCreatedPage;
  let dashboardPage: DashboardPage;
  let deleteAccountPage: DeleteAccountPage;
  let page: Page;
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
      password: generatedData.password,
      firstName: generatedData.firstName,
      lastName: generatedData.lastName,
    };
  }
  let fullUserData = {
    ...userData,
    ...generateDetailsInforData()
  };
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    homePage = new HomePage(page, automationExerciseConfig);
    signupPage = new SignupPage(page, automationExerciseConfig);
    accountInfoPage = new AccountInfoPage(page, automationExerciseConfig);
    accountCreatedPage = new AccountCreatedPage(page, automationExerciseConfig);
    dashboardPage = new DashboardPage(page, automationExerciseConfig);
    deleteAccountPage = new DeleteAccountPage(page, automationExerciseConfig);
  
    // Save to CSV for future use
    await saveUserToCSV(userData.name, userData.email, userData.password);
  });

  //. Cleanup sau khi chạy xong hết
  test.afterAll(async () => {
      await page.close();
  });
  
  // TC1: Register User (Updated with Logout)
  test("TC1: Should successfully register a new user, verify account, and logout", async () => {
    await homePage.navigateToHome();
    await homePage.verifyTitle();
    await homePage.clickSignupLogin();
    await signupPage.verifyNewUserSignupVisible();
    await signupPage.fillSignupForm(userData.name, userData.email);
    await signupPage.clickSignup();

    await accountInfoPage.verifyEnterAccountInfoVisible();

    await accountInfoPage.fillAccountInformation(fullUserData);
    await accountInfoPage.fillAddressInformation(fullUserData);
    await accountInfoPage.clickCreateAccount();

    await accountCreatedPage.verifyAccountCreated();
    await accountCreatedPage.clickContinue();

    await dashboardPage.verifyLoggedInAs(userData.name);
    
    // New Step: Logout
    await dashboardPage.logout();
    await signupPage.verifyNewUserSignupVisible(); // Verify we are back on home/login page
  });

  // TC2: Register User with Existing Email (Negative Test)
  test("TC2: Should show error when registering with an existing email", async () => {

    await signupPage.verifyNewUserSignupVisible();
    await signupPage.fillSignupForm(userData.name, userData.email);
    await signupPage.clickSignup();

    await signupPage.verifySignupError("Email Address already exist!");
  });

  // TC3: Login with Invalid Credentials (Negative Test)
  test("TC3: Should show error when logging in with invalid credentials", async () => {
    
    await signupPage.fillLoginForm(userData.email, "WrongPassword123!");
    await signupPage.clickLogin();
    
    await signupPage.verifyLoginError("Your email or password is incorrect!");
  });

  // TC4: Login with Valid User & Delete Account (E2E Flow)
  test("TC4: Should successfully login and delete account", async () => {
    // Test Action
    await homePage.clickSignupLogin();
    await signupPage.fillLoginForm(userData.email, userData.password);
    await signupPage.clickLogin();
    
    await dashboardPage.verifyLoggedInAs(userData.name);
    
    await dashboardPage.clickDeleteAccount();
    await deleteAccountPage.verifyAccountDeleted();
    await deleteAccountPage.clickContinue();
    
    await homePage.verifyTitle();
  });
});
