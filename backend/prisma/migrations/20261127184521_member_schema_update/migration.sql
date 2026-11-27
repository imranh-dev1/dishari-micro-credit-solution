/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `NationlID` on the `members` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nationalID]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nationalID` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "members_NationlID_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "members" DROP CONSTRAINT "members_pkey",
DROP COLUMN "NationlID",
ADD COLUMN     "nationalID" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "members_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "members_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "members_nationalID_key" ON "members"("nationalID");
