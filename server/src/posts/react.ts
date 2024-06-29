import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postReact(userId: string, postId: string, reactName: string) {
  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Try to find an existing react with the same name for this post
  const existingReact = await prisma.react.findFirst({
    where: {
      postId: postId,
      name: reactName
    }
  });

  if (existingReact) {
    // If the react exists, increment its count
    const updatedReact = await prisma.react.update({
      where: { id: existingReact.id },
      data: { count: { increment: 1 } }
    });

    return updatedReact;
  } else {
    // If the react does not exist, create a new one
    const newReact = await prisma.react.create({
      data: {
        name: reactName,
        count: 1,
        post: {
          connect: { id: postId }
        }
      }
    });

    return newReact;
  }
}
