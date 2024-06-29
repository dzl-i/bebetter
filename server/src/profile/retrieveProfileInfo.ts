import { getProfileInfo } from "../helper/profileHelper";

export async function retrieveProfileInfo(userId: string) {
  return getProfileInfo(userId);
}