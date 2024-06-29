import { getUserPosts } from "../helper/profileHelper";

export async function retrieveUserPosts(userId: string) {
  // Error Handling

  return getUserPosts(userId);
}