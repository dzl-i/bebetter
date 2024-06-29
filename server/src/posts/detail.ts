import { getUserById } from "../helper/userHelper";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function postDetails(postId: string) {
  // Get details about the post
  const post = await prisma.post.findUnique({
    where: {
      id: postId
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
        comments: {
            select: {
                id: true,
                comment: true,
                timeCreated: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        profilePicture: true,
                    }
                }
            }
        },
        reacts: true
    }
  });

  return post;
}
