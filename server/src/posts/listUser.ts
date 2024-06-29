import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postListUser(userId: string) {
  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Find all posts by the user
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          profilePicture: true
        }
      },
      comments: true,
      reacts: true
    },
    orderBy: {
      timeCreated: 'desc'
    }
  });

  return posts;
}
