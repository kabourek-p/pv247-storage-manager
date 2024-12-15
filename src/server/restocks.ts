'use server';

import { type RestockFormSchema } from '@/components/form/restocks/restock-form';

import prisma from '../lib/prisma';
import {RestockData} from "@/server/orders";

export const getRestocks = async (authorId: string | null) =>
	prisma.restock.findMany({
		include: {
			author: true,
			commodity: true
		},
		where: authorId ? { authorId } : undefined
	});

export const createRestock = async (restock: RestockFormSchema) =>
	prisma.restock.createMany({
		data: {
			commodityId: restock.commodity,
			quantity: restock.quantity,
			unitPrice: restock.unitPrice,
			supplierName: restock.supplierName ?? undefined,
			invoiceNumber: restock.invoiceNumber ?? undefined,
			authorId: restock.authorId
		}
	});

export const getRestockData = async (commodity: string) =>
	prisma.$queryRaw<
		RestockData[]
	>`SELECT r.id, r.date, r."invoiceNumber", r.quantity, r."unitPrice", SUM(sd."quantity") AS taken, c.name
									FROM "Restock" AS r LEFT JOIN "StockDispatch" AS sd
									ON sd."restockId" = r."id"
									LEFT JOIN "Commodity" AS c
									ON c."name" = r."commodityId"
									WHERE c."name" = ${commodity}
									GROUP BY r."id", c.name
									HAVING SUM(sd."quantity") IS NULL OR SUM(sd."quantity") < r."quantity"
									ORDER BY r."date"`;
