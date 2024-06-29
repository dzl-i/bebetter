import { setProfilePicture } from "../helper/profileHelper";

export async function updateProfilePicture(userId: string, profilePicture: string) {
  setProfilePicture(userId, profilePicture)

  return;
}