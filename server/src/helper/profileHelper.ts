import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function setProfilePicture(id: string, profilePicture: string) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      profilePicture: profilePicture,
    },
  });
}

export async function setProfileDescription(id: string, description: string) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      description: description,
    },
  });
}

export async function getUserPosts(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      posts: true,
    },
  });
}

export async function getProfileInfo(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      profilePicture: true,
      username: true,
      name: true,
      description: true,
      averageSteps: true,
      recentSteps: true,
    },
  });
}

export async function setProfileName(id: string, name: string) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
  });
}