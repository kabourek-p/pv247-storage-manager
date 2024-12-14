'use server';

import { type RestockFormSchema } from '@/components/form/restocks/restock-form';

import prisma from '../lib/prisma';

export const getRestocks = async () =>
	prisma.order.findMany({
		include: {
			author: true
		}
	});

export const createRestock = async (restock: RestockFormSchema) => {
	const users = await prisma.user.findMany();

	return prisma.restock.createMany({
		data: {
			commodityId: restock.commodity,
			quantity: restock.quantity,
			unitPrice: restock.unitPrice,
			supplierName: restock.supplierName ?? undefined,
			invoiceNumber: restock.invoiceNumber ?? undefined,
			authorId: users[users.length - 1].id
		}
	});
};
