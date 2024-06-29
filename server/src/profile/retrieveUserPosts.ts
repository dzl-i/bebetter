import { getUserPosts } from "../helper/profileHelper";

export async function retrieveUserPosts(userId: string) {
  return getUserPosts(userId);
}