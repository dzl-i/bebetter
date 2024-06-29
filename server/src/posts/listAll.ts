import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postListAll(userId: string) {
  if (userId === "") {
    return await prisma.post.findMany({
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
  };

  const author = await getUserById(userId);
  if (author === null) throw { status: 400, message: "User not found." };

  // Find all posts except for the one by the user
  const posts = await prisma.post.findMany({
    where: {
      authorId: {
        not: userId
      }
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
