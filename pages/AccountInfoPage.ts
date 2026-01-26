import { Page, expect, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

interface UserData {
  password: string;
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
}

export class AccountInfoPage extends BasePage {
  private readonly enterAccountInfoHeading: Locator;
  private readonly genderMrRadio: Locator;
  private readonly genderMrsRadio: Locator;
  private readonly passwordInput: Locator;
  private readonly dayOfBirthSelect: Locator;
  private readonly monthOfBirthSelect: Locator;
  private readonly yearOfBirthSelect: Locator;
  private readonly newsletterCheckbox: Locator;
  private readonly specialOffersCheckbox: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly companyInput: Locator;
  private readonly addressInput: Locator;
  private readonly address2Input: Locator;
  private readonly countrySelect: Locator;
  private readonly stateInput: Locator;
  private readonly cityInput: Locator;
  private readonly zipcodeInput: Locator;
  private readonly mobileNumberInput: Locator;
  private readonly createAccountButton: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);
    
    // Account Information locators
    this.enterAccountInfoHeading = page.getByText("Enter Account Information");
    this.genderMrRadio = page.getByRole("radio", { name: "Mr." });
    this.genderMrsRadio = page.getByRole("radio", { name: "Mrs." });
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.dayOfBirthSelect = page.locator('select[data-qa="days"]');
    this.monthOfBirthSelect = page.locator('select[data-qa="months"]');
    this.yearOfBirthSelect = page.locator('select[data-qa="years"]');
    this.newsletterCheckbox = page.getByRole("checkbox", { name: "Sign up for our newsletter!" });
    this.specialOffersCheckbox = page.getByRole("checkbox", { name: "Receive special offers from our partners!" });
    
    // Address Information locators
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.getByRole("button", { name: "Create Account" });
  }

  async verifyEnterAccountInfoVisible(): Promise<void> {
    await expect(this.enterAccountInfoHeading).toBeVisible();
  }

  async fillAccountInformation(userData: UserData): Promise<void> {
    await this.genderMrRadio.check();
    await this.passwordInput.fill(userData.password);
    await this.dayOfBirthSelect.selectOption(userData.dateOfBirth.day);
    await this.monthOfBirthSelect.selectOption(userData.dateOfBirth.month);
    await this.yearOfBirthSelect.selectOption(userData.dateOfBirth.year);
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
  }

  async fillAddressInformation(userData: UserData): Promise<void> {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.companyInput.fill("Test Company");
    await this.addressInput.fill(userData.address);
    await this.address2Input.fill("Apt 123");
    await this.countrySelect.selectOption(userData.country);
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipcode);
    await this.mobileNumberInput.fill(userData.mobileNumber);
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountButton.click();
  }
}
