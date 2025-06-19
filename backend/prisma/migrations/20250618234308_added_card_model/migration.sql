-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Card" (
    "card_id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "gif" TEXT,
    "author" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "board_id" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("card_id")
);
