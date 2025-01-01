-- DropIndex
DROP INDEX "Product_user_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "blocked" BOOLEAN NOT NULL DEFAULT false;
