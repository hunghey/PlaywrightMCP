/**
 * Constants file for storing hardcoded strings, error messages, and UI text
 * This centralizes all string values to improve maintainability and reduce duplication
 */

// Page Titles
export const PAGE_TITLES = {
  HOME_PAGE: "Automation Exercise",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  SIGNUP_EMAIL_EXISTS: "Email Address already exist!",
  LOGIN_INVALID_CREDENTIALS: "Your email or password is incorrect!",
} as const;

// UI Text
export const UI_TEXT = {
  NEW_USER_SIGNUP: "New User Signup!",
  ENTER_ACCOUNT_INFO: "Enter Account Information",
  ACCOUNT_CREATED: "Account Created!",
  ACCOUNT_DELETED: "Account Deleted!",
  LOGGED_IN_AS: "Logged in as",
} as const;

// Button/Link Text
export const BUTTON_TEXT = {
  SIGNUP: "Signup",
  LOGIN: "Login",
  CREATE_ACCOUNT: "Create Account",
  CONTINUE: "Continue",
  DELETE_ACCOUNT: "Delete Account",
  LOGOUT: "Logout",
  SIGNUP_LOGIN: "Signup / Login",
} as const;

// Form Labels
export const FORM_LABELS = {
  NAME: "Name",
  NEWSLETTER: "Sign up for our newsletter!",
  SPECIAL_OFFERS: "Receive special offers from our partners!",
} as const;

// Gender Options
export const GENDER_OPTIONS = {
  MR: "Mr.",
  MRS: "Mrs.",
} as const;

// Test Data Constants
export const TEST_DATA = {
  DEFAULT_COMPANY: "Test Company",
  DEFAULT_ADDRESS_2: "Apt 123",
  INVALID_PASSWORD: "WrongPassword123!",
} as const;

// Selector Data Attributes
export const DATA_QA_ATTRIBUTES = {
  SIGNUP_EMAIL: "signup-email",
  LOGIN_EMAIL: "login-email",
  LOGIN_PASSWORD: "login-password",
  PASSWORD: "password",
  DAYS: "days",
  MONTHS: "months",
  YEARS: "years",
  FIRST_NAME: "first_name",
  LAST_NAME: "last_name",
  COMPANY: "company",
  ADDRESS: "address",
  ADDRESS_2: "address2",
  COUNTRY: "country",
  STATE: "state",
  CITY: "city",
  ZIPCODE: "zipcode",
  MOBILE_NUMBER: "mobile_number",
} as const;

// Timeout Values (in milliseconds)
export const TIMEOUTS = {
  DEFAULT: 30000,
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 60000,
  AD_POPUP: 2000,
} as const;
