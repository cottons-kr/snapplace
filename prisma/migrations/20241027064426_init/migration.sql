-- CreateTable
CREATE TABLE "Account" (
    "uuid" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "History" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "locationName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Like" (
    "uuid" TEXT NOT NULL,
    "historyUUID" TEXT NOT NULL,
    "accountUUID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Image" (
    "uuid" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "_Friendship" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountToHistory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_HistoryToImage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_nickname_key" ON "Account"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Like_historyUUID_key" ON "Like"("historyUUID");

-- CreateIndex
CREATE UNIQUE INDEX "_Friendship_AB_unique" ON "_Friendship"("A", "B");

-- CreateIndex
CREATE INDEX "_Friendship_B_index" ON "_Friendship"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToHistory_AB_unique" ON "_AccountToHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToHistory_B_index" ON "_AccountToHistory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_HistoryToImage_AB_unique" ON "_HistoryToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoryToImage_B_index" ON "_HistoryToImage"("B");

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_historyUUID_fkey" FOREIGN KEY ("historyUUID") REFERENCES "History"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_accountUUID_fkey" FOREIGN KEY ("accountUUID") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friendship" ADD CONSTRAINT "_Friendship_B_fkey" FOREIGN KEY ("B") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToHistory" ADD CONSTRAINT "_AccountToHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToHistory" ADD CONSTRAINT "_AccountToHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "History"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToImage" ADD CONSTRAINT "_HistoryToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "History"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HistoryToImage" ADD CONSTRAINT "_HistoryToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
