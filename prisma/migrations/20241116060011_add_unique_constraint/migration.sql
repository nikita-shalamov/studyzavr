/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber,profileTypeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_profileTypeId_key" ON "User"("phoneNumber", "profileTypeId");