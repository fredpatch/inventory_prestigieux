/*
  Warnings:

  - A unique constraint covering the columns `[user]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "totalMarginPerUnit" DOUBLE PRECISION,
ADD COLUMN     "user" INTEGER NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'BOISSON_FROIDE',
ALTER COLUMN "margin" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Personal_Info" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "profile_img" TEXT NOT NULL,
    "user" INTEGER NOT NULL,

    CONSTRAINT "Personal_Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'agent',
    "google_auth" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_Info_user_key" ON "Personal_Info"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Personal_Info_email_username_key" ON "Personal_Info"("email", "username");

-- CreateIndex
CREATE UNIQUE INDEX "Product_user_key" ON "Product"("user");

-- AddForeignKey
ALTER TABLE "Personal_Info" ADD CONSTRAINT "Personal_Info_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
