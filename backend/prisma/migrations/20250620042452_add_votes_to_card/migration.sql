/*
  Warnings:

  - You are about to drop the column `likes` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "likes",
ADD COLUMN     "votes" INTEGER NOT NULL DEFAULT 0;
