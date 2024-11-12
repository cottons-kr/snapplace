-- CreateEnum
CREATE TYPE "UserAssetType" AS ENUM ('IMAGE', 'VIDEO', 'FOUR_CUT');

-- AlterTable
ALTER TABLE "UserAsset" ADD COLUMN     "type" "UserAssetType" NOT NULL DEFAULT 'IMAGE';
