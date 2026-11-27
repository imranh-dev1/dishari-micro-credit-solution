/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "members" (
    "id" SERIAL NOT NULL,
    "memberID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gurdianName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "NationlID" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_memberID_key" ON "members"("memberID");

-- CreateIndex
CREATE UNIQUE INDEX "members_NationlID_key" ON "members"("NationlID");

-- CreateIndex
CREATE UNIQUE INDEX "members_email_key" ON "members"("email");
