-- CreateEnum
CREATE TYPE "ProcessingType" AS ENUM ('SQUARE', 'BEND', 'STRAIGHT');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('KG', 'MM', 'PIECE');

-- CreateTable
CREATE TABLE "Commodity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,

    CONSTRAINT "Commodity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeightToLenghtRatio" (
    "commodityId" INTEGER NOT NULL,
    "weightPerMilimeter" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "WeightToLenghtRatio_pkey" PRIMARY KEY ("commodityId")
);

-- CreateTable
CREATE TABLE "Restock" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commodityId" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "supllierName" TEXT,
    "invoiceNumber" TEXT,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Restock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "note" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderElement" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "commodityId" INTEGER NOT NULL,
    "processingNote" TEXT,
    "processingType" "ProcessingType" NOT NULL,
    "unitLength" DECIMAL(65,30) NOT NULL,
    "numberOfUnits" DECIMAL(65,30) NOT NULL,
    "unitPrice" DECIMAL(65,30) NOT NULL,
    "ticketNumber" TEXT,

    CONSTRAINT "OrderElement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "invoiceNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("invoiceNumber")
);

-- CreateTable
CREATE TABLE "StockDispatch" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "orderElementId" INTEGER NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "restockId" INTEGER NOT NULL,

    CONSTRAINT "StockDispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_orderId_key" ON "Invoice"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "WeightToLenghtRatio" ADD CONSTRAINT "WeightToLenghtRatio_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restock" ADD CONSTRAINT "Restock_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restock" ADD CONSTRAINT "Restock_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderElement" ADD CONSTRAINT "OrderElement_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderElement" ADD CONSTRAINT "OrderElement_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "Commodity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockDispatch" ADD CONSTRAINT "StockDispatch_orderElementId_fkey" FOREIGN KEY ("orderElementId") REFERENCES "OrderElement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockDispatch" ADD CONSTRAINT "StockDispatch_restockId_fkey" FOREIGN KEY ("restockId") REFERENCES "Restock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
