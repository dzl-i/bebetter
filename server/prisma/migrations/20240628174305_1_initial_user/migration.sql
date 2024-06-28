/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "remainingLoginAttempts" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "token" TEXT NOT NULL;
