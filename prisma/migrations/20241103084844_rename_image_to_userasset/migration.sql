/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HistoryToImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HistoryToImage" DROP CONSTRAINT "_HistoryToImage_A_fkey";

-- DropForeignKey
ALTER TABLE "_HistoryToImage" DROP CONSTRAINT "_HistoryToImage_B_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "_HistoryToImage";

-- CreateTable
CREATE TABLE "UserAsset" (
    "uuid" TEXT NOT NULL,
    "ownerUUID" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "brightness" INTEGER NOT NULL DEFAULT 0,
    "contrast" INTEGER NOT NULL DEFAULT 0,
    "brightnessContrast" INTEGER NOT NULL DEFAULT 0,
    "saturation" INTEGER NOT NULL DEFAULT 0,
    "temperature" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAsset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_HistoryToUserAsset" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAsset_ownerUUID_key" ON "UserAsset"("ownerUUID");

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToUserAsset_AB_unique" ON "_HistoryToUserAsset"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToUserAsset_B_index" ON "_HistoryToUserAsset"("B");

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_ownerUUID_fkey" FOREIGN KEY ("ownerUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToUserAsset" ADD CONSTRAINT "_HistoryToUserAsset_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToUserAsset" ADD CONSTRAINT "_HistoryToUserAsset_B_fkey" FOREIGN KEY ("B") REFERENCES "UserAsset"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
