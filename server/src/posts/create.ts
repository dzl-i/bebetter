import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postCreate(userId: string, description: string, steps: number) {
  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Create the post
  const post = await prisma.post.create({
    data: {
      description: description,
      steps: steps,
      author: {
        connect: { id: userId }
      }
    }
  });

  return post;
}
