/*
  Warnings:

  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fotherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `motherName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nationalID` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userID]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CEO', 'BRANCH_MANAGER', 'LOAN_OFFICER');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_employeeId_fkey";

-- DropIndex
DROP INDEX "users_employeeId_key";

-- DropIndex
DROP INDEX "users_nationalID_key";

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "userID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "employeeId",
DROP COLUMN "fotherName",
DROP COLUMN "motherName",
DROP COLUMN "name",
DROP COLUMN "nationalID",
DROP COLUMN "phone",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'BRANCH_MANAGER',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE UNIQUE INDEX "employees_userID_key" ON "employees"("userID");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
