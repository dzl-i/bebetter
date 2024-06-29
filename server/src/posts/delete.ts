import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postDelete(userId: string, postId: string) {
  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Check if the post is owned by the user
  const owner = await prisma.post.findUnique({
    where: {
      id: postId
    },
    select: {
      author: true
    }
  });
  if (owner === null) throw { status: 400, message: "User not found." };
  if (owner.author.id !== userId) throw { status: 400, message: "Post is not created by the user." };

  // Delete the post
  const post = await prisma.post.delete({
    where: {
      id: postId
    }
  });

  return post;
}
