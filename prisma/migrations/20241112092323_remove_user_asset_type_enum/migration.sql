/*
  Warnings:

  - You are about to drop the column `type` on the `UserAsset` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAsset" DROP COLUMN "type";

-- DropEnum
DROP TYPE "UserAssetType";
