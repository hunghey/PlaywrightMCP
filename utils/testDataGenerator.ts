import { faker } from "@faker-js/faker";

export interface GeneratedUserData {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface GeneratedDetailsInforData {
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
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    firstName: firstName,
    lastName: lastName,
  };
}

export function generateDetailsInforData(): GeneratedDetailsInforData {
  return {
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
