import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postDetails(postId: string) {
  // Get details about the post
  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  return post;
}
