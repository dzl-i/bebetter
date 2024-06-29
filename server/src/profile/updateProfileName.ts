import { setProfileName } from "../helper/profileHelper";

export async function updateProfileName(userId: string, name: string) {
  setProfileName(userId, name)
}