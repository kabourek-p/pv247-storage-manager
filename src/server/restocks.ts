'use server';

import { type RestockFormSchema } from '@/components/form/restocks/restock-form';

import prisma from '../lib/prisma';

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
