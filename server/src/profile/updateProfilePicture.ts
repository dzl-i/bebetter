import { setProfilePicture } from "../helper/profileHelper";

export async function updateProfilePicture(userId: string, profilePicture: string) {
  // Error Handling

  // TODO: Check whether user is signed in, if needed
  // if (! await checkSignedIn()) throw { status: 400, message: "Please sign in to continue." };

  setProfilePicture(userId, profilePicture)

  return;
}