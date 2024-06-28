import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUserById(id: string) {
  return await prisma.user.findFirst({
    where: {
      id: id
    }
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email: email
    }
  });
}

export async function getUserByUsername(username: string) {
  return await prisma.user.findFirst({
    where: {
      username: username
    }
  });
}