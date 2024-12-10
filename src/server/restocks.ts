'use server';
import { $Enums } from '@prisma/client';

import generateRandomString from '@/server/utils';
import { type RestockFormSchema } from '@/components/restocks/restock-form';

import prisma from '../lib/prisma';

import ProcessingType = $Enums.ProcessingType;

export const getRestocks = async () =>
	prisma.order.findMany({
		include: {
			author: true
		}
	});

export const createRandomRestock = async () => {
	const users = await prisma.user.findMany();
	return prisma.order.create({
		data: {
			authorId: users.length,
			note: generateRandomString(10)
		}
	});
};

export const createRestock = async (restock: RestockFormSchema) => {
	const users = await prisma.user.findMany();

	return prisma.restock.createMany({
		data: restock.restocks.map(o => ({
			commodityId: o.commodity,
			quantity: o.quantity,
			unitPrice: o.unitPrice,
			supplierName: o.supplierName ?? undefined,
			invoiceNumber: o.invoiceNumber ?? undefined,
			authorId: users[users.length - 1].id,
			date: new Date(),
		  }))
	});
};
