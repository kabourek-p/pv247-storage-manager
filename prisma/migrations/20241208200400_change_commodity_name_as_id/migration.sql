/*
  Warnings:

  - The primary key for the `Commodity` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Commodity` table. All the data in the column will be lost.
  - The primary key for the `WeightToLenghtRatio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name]` on the table `Commodity` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrderElement" DROP CONSTRAINT "OrderElement_commodityId_fkey";

-- DropForeignKey
ALTER TABLE "Restock" DROP CONSTRAINT "Restock_commodityId_fkey";

-- DropForeignKey
ALTER TABLE "WeightToLenghtRatio" DROP CONSTRAINT "WeightToLenghtRatio_commodityId_fkey";

-- AlterTable
ALTER TABLE "Commodity" DROP CONSTRAINT "Commodity_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Commodity_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "OrderElement" ALTER COLUMN "commodityId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Restock" ALTER COLUMN "commodityId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "WeightToLenghtRatio" DROP CONSTRAINT "WeightToLenghtRatio_pkey",
ALTER COLUMN "commodityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "WeightToLenghtRatio_pkey" PRIMARY KEY ("commodityId");

-- CreateIndex
CREATE UNIQUE INDEX "Commodity_name_key" ON "Commodity"("name");

-- AddForeignKey
ALTER TABLE "WeightToLenghtRatio" ADD CONSTRAINT "WeightToLenghtRatio_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restock" ADD CONSTRAINT "Restock_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderElement" ADD CONSTRAINT "OrderElement_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
