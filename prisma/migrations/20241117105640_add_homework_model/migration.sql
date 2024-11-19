/*
  Warnings:

  - You are about to drop the column `files` on the `Homework` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Homework" DROP COLUMN "files",
ADD COLUMN     "fileNames" TEXT[],
ADD COLUMN     "fileRandomNames" TEXT[];
