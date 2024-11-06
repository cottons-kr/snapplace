/*
  Warnings:

  - Added the required column `ownerUUID` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "ownerUUID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_ownerUUID_fkey" FOREIGN KEY ("ownerUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
