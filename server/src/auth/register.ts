import validator from 'validator';

import { checkEmailExists, checkUsernameExists } from '../helper/authHelper';
import { generateToken } from '../helper/tokenHelper';
import { getHash } from '../helper/util';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function authRegister(name: string, email: string, password: string, username: string) {
  // Error Handling
  if (name.length < 1) throw { status: 400, message: "Name cannot be empty." };
  if (!validator.isEmail(email)) throw { status: 400, message: "Invalid email address." };
  if (await checkEmailExists(email)) throw { status: 400, message: "Email address is already being used by another user." };
  if (await checkUsernameExists(username)) throw { status: 400, message: "Username is already being used by another user." };

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: name,
      username: username,
      email: email,
      password: getHash(password),
    }
  });

  // Generate the token
  const { token } = await generateToken(user.id);

  // Update the user's token
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      token: token
    }
  })

  return {
    token: token,
    userId: user.id,
    userName: user.name,
    userUsername: user.username
  };
}