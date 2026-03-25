/*
  Warnings:

  - You are about to alter the column `token` on the `token` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `type` column on the `token` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TypeToken" AS ENUM ('ACCESS', 'REFRESH');

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "token" SET DATA TYPE VARCHAR(255),
DROP COLUMN "type",
ADD COLUMN     "type" "TypeToken" NOT NULL DEFAULT 'ACCESS';

-- DropEnum
DROP TYPE "Role";
