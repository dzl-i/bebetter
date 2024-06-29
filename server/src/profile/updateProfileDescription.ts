import { setProfileDescription } from "../helper/profileHelper";

export async function updateProfileDescription(userId: string, description: string) {
  setProfileDescription(userId, description)

  return;
}