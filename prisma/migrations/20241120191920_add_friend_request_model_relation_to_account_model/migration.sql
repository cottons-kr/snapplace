-- CreateEnum
CREATE TYPE "FriendRequestStatus" AS ENUM ('READY', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "FriendRequest" (
    "uuid" TEXT NOT NULL,
    "requestFrom" TEXT NOT NULL,
    "requestTo" TEXT NOT NULL,
    "status" "FriendRequestStatus" NOT NULL DEFAULT 'READY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_requestFrom_key" ON "FriendRequest"("requestFrom");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_requestTo_key" ON "FriendRequest"("requestTo");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_requestFrom_fkey" FOREIGN KEY ("requestFrom") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_requestTo_fkey" FOREIGN KEY ("requestTo") REFERENCES "Account"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
