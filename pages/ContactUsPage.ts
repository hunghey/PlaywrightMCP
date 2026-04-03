import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SiteConfig } from "../config/environment";

/**
 * ContactUsPage - Page Object for Contact Us form
 * URL: /contact_us
 *
 * Covers:
 * - Fill and submit contact form
 * - Upload file attachment
 * - Handle browser confirmation dialog
 * - Verify success/error messages
 */
export class ContactUsPage extends BasePage {
  // ─── Locators ───────────────────────────────────────────────
  private readonly getInTouchHeading: Locator;
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly subjectInput: Locator;
  private readonly messageTextarea: Locator;
  private readonly uploadFileInput: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;
  private readonly homeButton: Locator;

  constructor(page: Page, siteConfig: SiteConfig) {
    super(page, siteConfig);

    this.getInTouchHeading = page.getByRole("heading", {
      name: "Get In Touch",
    });
    this.nameInput = page.getByPlaceholder("Name");
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.getByPlaceholder("Subject");
    this.messageTextarea = page.getByPlaceholder("Your Message Here");
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.successMessage = page.locator(".status.alert.alert-success");
    this.homeButton = page.getByRole("link", { name: " Home" }).first();
  }

  // ─── Element Visibility Checks ──────────────────────────────

  /**
   * Verify all form elements are visible and ready for interaction
   */
  async verifyFormElementsVisible(): Promise<void> {
    await expect(this.nameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.subjectInput).toBeVisible();
    await expect(this.messageTextarea).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
    console.log("✓ All form elements are visible and enabled");
  }

  // ─── Navigation ─────────────────────────────────────────────

  /**
   * Navigate to Contact Us page
   */
  async navigateToContactUs(): Promise<void> {
    await this.goto("/contact_us");
    await this.waitForPageLoad();
  }

  // ─── Verifications ──────────────────────────────────────────

  /**
   * Verify "Get In Touch" heading is visible
   */
  async verifyGetInTouchVisible(): Promise<void> {
    await expect(this.getInTouchHeading).toBeVisible();
    console.log('✓ "Get In Touch" heading is visible');
  }

  /**
   * Verify success message after form submission
   */
  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText(
      "Success! Your details have been submitted successfully.",
    );
    console.log("✓ Success message is displayed");
  }

  // ─── Actions ────────────────────────────────────────────────

  /**
   * Fill all fields of the contact form
   * @param name - Sender's name
   * @param email - Sender's email
   * @param subject - Message subject
   * @param message - Message body
   */
  async fillContactForm(
    name: string,
    email: string,
    subject: string,
    message: string,
  ): Promise<void> {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.subjectInput.fill(subject);
    await this.messageTextarea.fill(message);
    console.log(`✓ Filled contact form for: ${name} (${email})`);
  }

  /**
   * Upload a file attachment
   * @param filePath - Absolute or relative path to the file
   */
  async uploadFile(filePath: string): Promise<void> {
    await this.uploadFileInput.setInputFiles(filePath);
    console.log(`✓ Uploaded file: ${filePath}`);
  }

  /**
   * Click Submit button and auto-accept the browser confirmation dialog
   * The site shows a JS confirm() popup: "Press OK to proceed"
   */
  async clickSubmitAndAcceptDialog(): Promise<void> {
    // Register dialog handler that will auto-accept
    this.page.on("dialog", async (dialog) => {
      console.log(`Dialog detected: ${dialog.message()}`);
      await dialog.accept();
      console.log("✓ Accepted browser confirmation dialog");
    });

    // Click submit button
    await this.submitButton.click();

    // Give some time for form submission to process
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Click Home button to return to home page after submission
   */
  async clickHome(): Promise<void> {
    await this.homeButton.click();
  }
}
