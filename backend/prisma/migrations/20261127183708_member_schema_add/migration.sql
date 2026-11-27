-- CreateTable
CREATE TABLE "Member" (
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

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberID_key" ON "Member"("memberID");

-- CreateIndex
CREATE UNIQUE INDEX "Member_NationlID_key" ON "Member"("NationlID");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
