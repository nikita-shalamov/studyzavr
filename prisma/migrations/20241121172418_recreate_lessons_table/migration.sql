/*
  Warnings:

  - Changed the type of `lessonDate` on the `Lessons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "lessonDate",
ADD COLUMN     "lessonDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Lessons_tutorId_studentId_lessonDate_key" ON "Lessons"("tutorId", "studentId", "lessonDate");
