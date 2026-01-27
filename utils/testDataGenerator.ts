import { faker } from "@faker-js/faker";

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();

export interface GeneratedUserData {
  name: string;
  email: string;
  password: string;
}

export interface GeneratedDetailsInforData {
  gender: string;
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

export function generateUserData(): GeneratedUserData {
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
  };
}

export function generateDetailsInforData(): GeneratedDetailsInforData {
  return {
    gender: faker.person.gender(),
    firstName: firstName,
    lastName: lastName,
    address: faker.location.streetAddress(),
    country: "United States",
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
    dateOfBirth: {
      day: faker.number.int({ min: 1, max: 28 }).toString(),
      month: faker.number.int({ min: 1, max: 12 }).toString(),
      year: faker.number.int({ min: 1950, max: 2000 }).toString()
    }
  };
}
