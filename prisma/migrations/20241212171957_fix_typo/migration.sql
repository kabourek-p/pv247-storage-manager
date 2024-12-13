/*
  Warnings:

  - You are about to drop the column `supllierName` on the `Restock` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restock" DROP COLUMN "supllierName",
ADD COLUMN     "supplierName" TEXT;
