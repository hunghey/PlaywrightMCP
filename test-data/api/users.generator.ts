/**
 * User Data Generators
 *
 * Dynamic user data generation utilities using Faker.js
 */

import { faker } from "@faker-js/faker";
import { CreateAccountRequest } from "../../utils/apiTypes";

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
  return faker.internet.password({
    length: 12,
    memorable: false,
    pattern: /[A-Za-z0-9!@#$%]/,
  });
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
  overrides?: Partial<CreateAccountRequest>,
): CreateAccountRequest {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthYear = faker.date
    .birthdate({ min: 18, max: 65, mode: "age" })
    .getFullYear();

  return {
    name: `${firstName} ${lastName}`,
    email: generateUniqueEmail(),
    password: generatePassword(),
    title: faker.helpers.arrayElement(["Mr", "Mrs", "Miss"] as const),
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
export function generateMultipleUserAccounts(
  count: number,
): CreateAccountRequest[] {
  return Array.from({ length: count }, () => generateUserAccountData());
}
