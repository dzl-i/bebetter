import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postComment(userId: string, postId: string, comment: string) {
  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Create the comment
  const userComment = await prisma.comment.create({
    data: {
      comment: comment,
      user: {
        connect: { id: userId }
      },
      post: {
        connect: { id: postId }
      }
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePicture: true
        }
      }
    }
  });

  return userComment;
}
