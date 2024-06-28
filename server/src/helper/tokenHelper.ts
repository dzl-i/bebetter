import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import crypto from "crypto";

import { getHash } from "./util";

const prisma = new PrismaClient();

export async function generateToken(id: string) {
  // Create the token based on the user's id and/or a random uuid
  const token: string = jwt.sign({ uuid: crypto.randomUUID(), userId: id }, process.env.JWT_SECRET as string, {
    expiresIn: "90d"
  });

  return {
    token: token,
  };
}
