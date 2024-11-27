/*
  Warnings:

  - You are about to drop the column `wasAttended` on the `Lessons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "wasAttended",
ADD COLUMN     "lessonWas" BOOLEAN NOT NULL DEFAULT false;
