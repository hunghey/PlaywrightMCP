import {
  GeneratedDetailsInforData,
  GeneratedUserData,
  generateDetailsInforData,
  generateUserData,
} from "../../utils/testDataGenerator";

export type FullUserData = GeneratedUserData & GeneratedDetailsInforData;

export function buildUserData(): FullUserData {
  const credentials = generateUserData();
  const details = generateDetailsInforData();
  const [firstName, ...rest] = credentials.name.split(" ");

  return {
    ...credentials,
    ...details,
    firstName,
    lastName: rest.join(" ") || details.lastName,
  };
}
