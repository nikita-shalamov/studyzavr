-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_tutorId_studentId_fkey" FOREIGN KEY ("tutorId", "studentId") REFERENCES "TutorStudent"("tutorId", "studentId") ON DELETE RESTRICT ON UPDATE CASCADE;
