import { setProfileDescription } from "../helper/profileHelper";

export async function updateProfileDescription(userId: string, description: string) {
  // Error Handling
  
  // TODO: Check whether user is signed in, if needed
  // if (! await checkSignedIn()) throw { status: 400, message: "Please sign in to continue." };

  setProfileDescription(userId, description)

  return;
}