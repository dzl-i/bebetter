import { getProfileInfo } from "../helper/profileHelper";

export async function retrieveProfileInfo(userId: string) {
  // Error Handling

  return getProfileInfo(userId);
}