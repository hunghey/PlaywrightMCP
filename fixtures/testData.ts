/**
 * Test Data Utilities for API Testing
 * 
 * This file provides centralized test data and utilities
 * for generating dynamic test data using Faker.js
 */

import { faker } from '@faker-js/faker';
import { CreateAccountRequest, LoginRequest, SearchProductRequest } from '../utils/apiTypes';

// =============================================================================
// Static Test Data
// =============================================================================

/**
 * Valid credentials for login testing
 * Note: This is a test account that should exist on the server
 */
export const validLoginCredentials: LoginRequest = {
  email: 'Betsy_OKeefe@yahoo.com',
  password: 'K4cgz3XL51TQ',
};

/**
 * Invalid credentials for negative testing
 */
export const invalidLoginCredentials: LoginRequest = {
  email: 'Betsy_OKeefe@yahoo.com',
  password: 'WrongPassword123',
};

/**
 * Search terms for data-driven product search testing
 */
export const searchTerms: string[] = [
  'top',
  'tshirt',
  'jean',
  'dress',
  'saree',
  'jeans',
  'shirt',
];

// =============================================================================
// Dynamic Test Data Generators
// =============================================================================

/**
 * Generates a unique email address for testing
 * @returns A unique email string
 */
export function generateUniqueEmail(): string {
  const timestamp = Date.now();
  const randomString = faker.string.alphanumeric(8);
  return `testuser_${timestamp}_${randomString}@test.com`;
}

/**
 * Generates a random password that meets common requirements
 * @returns A random password string
 */
export function generatePassword(): string {
  return faker.internet.password({ length: 12, memorable: false, pattern: /[A-Za-z0-9!@#$%]/ });
}

/**
 * Generates a random mobile number
 * @returns A random mobile number string
 */
export function generateMobileNumber(): string {
  return faker.string.numeric(10);
}

/**
 * Generates complete user account data for registration
 * @param overrides - Optional fields to override default generated values
 * @returns CreateAccountRequest object with generated data
 */
export function generateUserAccountData(
  overrides?: Partial<CreateAccountRequest>
): CreateAccountRequest {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthYear = faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).getFullYear();
  
  return {
    name: `${firstName} ${lastName}`,
    email: generateUniqueEmail(),
    password: generatePassword(),
    title: faker.helpers.arrayElement(['Mr', 'Mrs', 'Miss'] as const),
    birth_date: faker.number.int({ min: 1, max: 28 }).toString(),
    birth_month: faker.number.int({ min: 1, max: 12 }).toString(),
    birth_year: birthYear.toString(),
    firstname: firstName,
    lastname: lastName,
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: faker.location.country(),
    zipcode: faker.location.zipCode(),
    state: faker.location.state(),
    city: faker.location.city(),
    mobile_number: generateMobileNumber(),
    ...overrides,
  };
}

/**
 * Generates multiple user account datasets for data-driven testing
 * @param count - Number of datasets to generate
 * @returns Array of CreateAccountRequest objects
 */
export function generateMultipleUserAccounts(count: number): CreateAccountRequest[] {
  return Array.from({ length: count }, () => generateUserAccountData());
}

/**
 * Generates search product request data
 * @param searchTerm - The search term to use
 * @returns SearchProductRequest object
 */
export function generateSearchProductData(searchTerm: string): SearchProductRequest {
  return {
    search_product: searchTerm,
  };
}

// =============================================================================
// Test Data for Specific Scenarios
// =============================================================================

/**
 * Dataset for missing parameter scenarios
 */
export const missingParameterData = {
  loginWithoutEmail: {
    password: 'SomePassword123',
  },
  loginWithoutPassword: {
    email: 'test@example.com',
  },
  emptySearchProduct: {},
};

/**
 * Dataset for boundary value testing
 */
export const boundaryValueData = {
  maxLengthEmail: `${'a'.repeat(50)}@${'b'.repeat(50)}.com`,
  minLengthPassword: 'P@ss1',
  maxLengthPassword: 'P@ss' + 'w'.repeat(100),
  specialCharactersInSearch: '!@#$%^&*()',
  numericSearch: '12345',
  emptyStringSearch: '',
};

/**
 * Expected response codes for validation
 */
export const expectedResponseCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
};

/**
 * Expected response messages for validation
 */
export const expectedResponseMessages = {
  USER_EXISTS: 'User exists!',
  USER_NOT_FOUND: 'User not found!',
  USER_CREATED: 'User created!',
  ACCOUNT_DELETED: 'Account deleted!',
  USER_UPDATED: 'User updated!',
  METHOD_NOT_SUPPORTED: 'This request method is not supported.',
  BAD_REQUEST_SEARCH: 'Bad request, search_product parameter is missing in POST request.',
  BAD_REQUEST_LOGIN: 'Bad request, email or password parameter is missing in POST request.',
};
